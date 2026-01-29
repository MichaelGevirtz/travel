import { orchestrateContentGeneration, OrchestratorOutput } from "../lib/services/agents/contentOrchestrator";
import { allDestinations } from "../lib/constants/destinations";
import dbConnect from "../lib/db/mongodb";
import { PageModel } from "../lib/db/models/Page";
import fs from "fs";
import path from "path";

// Destinations to skip (already have articles)
const SKIP_DESTINATIONS = ["hanoi"];

// Map destination type from constants to schema type
const mapDestinationType = (type: string): "city" | "region" | "beach" | "mountain" => {
  const typeMap: Record<string, "city" | "region" | "beach" | "mountain"> = {
    city: "city",
    region: "region",
    beach: "beach",
    mountain: "mountain",
  };
  return typeMap[type] || "city";
};

// Main function
async function generateAllArticles() {
  console.log("\n🚀 ============================================");
  console.log("🚀 BATCH ARTICLE GENERATION");
  console.log("🚀 ============================================\n");

  // Connect to database
  console.log("📦 Connecting to database...");
  await dbConnect();
  console.log("✅ Database connected\n");

  // Get destinations to process
  const destinationsToProcess = allDestinations.filter(
    (dest) => !SKIP_DESTINATIONS.includes(dest.slug)
  );

  console.log(`📝 Found ${destinationsToProcess.length} destinations to process`);
  console.log(`⏭️  Skipping: ${SKIP_DESTINATIONS.join(", ")}\n`);

  // Get all available articles for internal linking
  const existingArticles = await PageModel.find(
    { status: { $in: ["published", "draft"] } },
    { slug: 1, title: 1, destinationType: 1, region: 1 }
  ).lean();

  const availableArticles = existingArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    destinationType: article.destinationType,
    region: article.region,
  }));

  console.log(`🔗 Found ${availableArticles.length} existing articles for internal linking\n`);

  // Results tracking
  const results: {
    slug: string;
    status: "approved" | "draft" | "error" | "skipped";
    score?: number;
    seoScore?: number;
    iterations?: number;
    error?: string;
  }[] = [];

  // Process each destination
  for (let i = 0; i < destinationsToProcess.length; i++) {
    const dest = destinationsToProcess[i];
    const progress = `[${i + 1}/${destinationsToProcess.length}]`;

    console.log(`\n${"=".repeat(60)}`);
    console.log(`${progress} Processing: ${dest.name} (${dest.slug})`);
    console.log(`${"=".repeat(60)}`);

    // Check if article already exists
    const existingArticle = await PageModel.findOne({ slug: dest.slug });
    if (existingArticle) {
      console.log(`⏭️  Article already exists for ${dest.slug}, skipping...`);
      results.push({ slug: dest.slug, status: "skipped" });
      continue;
    }

    try {
      // Generate topic string
      const topic = `${dest.name} Travel Guide 2025 - Complete guide to visiting ${dest.name}, Vietnam`;

      // Call orchestrator
      const output: OrchestratorOutput = await orchestrateContentGeneration({
        topic,
        destinationType: mapDestinationType(dest.type || "city"),
        region: dest.region as "north" | "central" | "south",
        availableArticles,
      });

      if (output.success && output.article) {
        // Save to database
        const pageData = {
          slug: output.article.slug,
          title: output.article.title,
          excerpt: output.article.excerpt,
          content: output.article.content,
          metaTitle: output.article.metaTitle,
          metaDescription: output.article.metaDescription,
          keywords: output.article.keywords,
          canonicalUrl: output.article.canonicalUrl,
          ogImage: output.article.ogImage || `/images/destinations/${dest.slug}.jpg`,
          status: output.status === "approved" ? "published" : "draft",
          publishedAt: output.status === "approved" ? new Date() : undefined,
          author: output.article.author,
          destinationType: output.article.destinationType || undefined,
          region: output.article.region || undefined,
          geo: output.article.geo,
          contentMeta: {
            readingTime: output.article.contentMeta.readingTime,
            wordCount: output.article.contentMeta.wordCount,
            imageCount: 0,
            internalLinks: output.article.contentMeta.internalLinks,
            externalLinks: output.article.contentMeta.externalLinks,
          },
          agentWorkflow: {
            generatedBy: "agent" as const,
            agentIterations: output.iterations,
            agentFinalScore: output.finalReview?.overallScore || 0,
            agentEditHistory: output.editHistory.map((h) => ({
              iteration: h.iteration,
              editorDecision: h.editorDecision,
              editorScore: h.editorScore,
              editorSummary: h.editorSummary,
              issues: h.issues,
              requiredChanges: h.requiredChanges,
              timestamp: h.timestamp,
            })),
            factsToVerify: output.article.factsToVerify?.map((f) => ({
              ...f,
              verified: false,
            })) || [],
            generatedAt: new Date(),
          },
        };

        await PageModel.create(pageData);
        console.log(`✅ Saved article to database: ${output.article.slug}`);

        // Also save markdown to file for reference
        const outputDir = path.join(process.cwd(), "scripts", "generated-articles");
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(
          path.join(outputDir, `${dest.slug}.md`),
          output.article.content
        );
        console.log(`📄 Saved markdown to: scripts/generated-articles/${dest.slug}.md`);

        results.push({
          slug: dest.slug,
          status: output.status,
          score: output.finalReview?.overallScore,
          seoScore: output.finalSEO?.score,
          iterations: output.iterations,
        });

        // Add to available articles for next iterations
        availableArticles.push({
          slug: output.article.slug,
          title: output.article.title,
          destinationType: output.article.destinationType || undefined,
          region: output.article.region || undefined,
        });
      } else {
        console.error(`❌ Failed to generate article for ${dest.slug}`);
        results.push({
          slug: dest.slug,
          status: "error",
          error: output.errorMessage,
        });
      }
    } catch (error) {
      console.error(`❌ Error processing ${dest.slug}:`, error);
      results.push({
        slug: dest.slug,
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
    }

    // Small delay between API calls to avoid rate limiting
    if (i < destinationsToProcess.length - 1) {
      console.log("\n⏳ Waiting 2 seconds before next article...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Print summary
  console.log("\n\n🏁 ============================================");
  console.log("🏁 BATCH GENERATION COMPLETE");
  console.log("🏁 ============================================\n");

  const approved = results.filter((r) => r.status === "approved").length;
  const draft = results.filter((r) => r.status === "draft").length;
  const errors = results.filter((r) => r.status === "error").length;
  const skipped = results.filter((r) => r.status === "skipped").length;

  console.log(`✅ Approved: ${approved}`);
  console.log(`📝 Draft: ${draft}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`📊 Total: ${results.length}\n`);

  console.log("Details:");
  console.log("-".repeat(80));
  results.forEach((r) => {
    const scoreInfo = r.score ? `Editor: ${r.score}/100, SEO: ${r.seoScore}/100` : "";
    const iterInfo = r.iterations ? `(${r.iterations} iterations)` : "";
    const errorInfo = r.error ? `Error: ${r.error.substring(0, 50)}...` : "";
    console.log(
      `${r.status.toUpperCase().padEnd(10)} ${r.slug.padEnd(25)} ${scoreInfo} ${iterInfo} ${errorInfo}`
    );
  });

  // Save results to file
  const resultsPath = path.join(process.cwd(), "scripts", "generation-results.json");
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${resultsPath}`);

  process.exit(0);
}

// Run
generateAllArticles().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { allDestinations } from "../lib/constants/destinations";
import { destinationContent } from "../lib/constants/destination-content";
import { orchestrateDestinationContent } from "../lib/services/agents/contentOrchestrator";
import type { DestinationContent } from "../types";

// Parse command line arguments
const args = process.argv.slice(2);
const slugArg = args.find((arg) => arg.startsWith("--slug="))?.split("=")[1];
const allFlag = args.includes("--all");
const pendingFlag = args.includes("--pending");

// Helper to update the destination-content.ts file
const updateContentFile = (slug: string, content: DestinationContent) => {
  const filePath = path.join(process.cwd(), "lib", "constants", "destination-content.ts");
  let fileContent = fs.readFileSync(filePath, "utf-8");

  // Find the destination entry and replace it
  const entryRegex = new RegExp(
    `"${slug}":\\s*\\{[^}]*status:[^}]*overview:[^}]*\\[[^\\]]*\\][^}]*thingsToDo:[^}]*\\[[^\\]]*\\][^}]*gettingAround:[^}]*\\{[^}]*\\}[^}]*faqs:[^}]*\\[[^\\]]*\\][^}]*\\}`,
    "s"
  );

  // Format the new content
  const newEntry = `"${slug}": {
    status: "${content.status}",
    overview: [
${content.overview.map((p) => `      "${p.replace(/"/g, '\\"')}",`).join("\n")}
    ],
    thingsToDo: [
${content.thingsToDo.map((t) => `      "${t.replace(/"/g, '\\"')}",`).join("\n")}
    ],
    gettingAround: {
      byAir: "${content.gettingAround.byAir.replace(/"/g, '\\"')}",
      byTrain: "${content.gettingAround.byTrain.replace(/"/g, '\\"')}",
      local: "${content.gettingAround.local.replace(/"/g, '\\"')}",
    },
    faqs: [
${content.faqs
  .map(
    (faq) =>
      `      {\n        question: "${faq.question.replace(/"/g, '\\"')}",\n        answer: "${faq.answer.replace(/"/g, '\\"')}",\n      },`
  )
  .join("\n")}
    ],
  }`;

  // Check if the destination exists in the file
  if (entryRegex.test(fileContent)) {
    fileContent = fileContent.replace(entryRegex, newEntry);
  } else {
    console.warn(`⚠️  Could not find entry for ${slug} in destination-content.ts`);
    console.warn(`⚠️  You may need to add it manually`);
    return false;
  }

  fs.writeFileSync(filePath, fileContent, "utf-8");
  return true;
};

// Generate content for a single destination
const generateForDestination = async (slug: string): Promise<boolean> => {
  const destination = allDestinations.find((d) => d.slug === slug);
  if (!destination) {
    console.error(`❌ Destination not found: ${slug}`);
    return false;
  }

  console.log(`\n🚀 Generating content for: ${destination.name} (${slug})`);

  const result = await orchestrateDestinationContent({ destination });

  if (result.success && result.content) {
    console.log(`✅ Content generated successfully`);

    // Update the file
    const updated = updateContentFile(slug, result.content);
    if (updated) {
      console.log(`📝 Updated destination-content.ts`);
    }
    return true;
  } else {
    console.error(`❌ Failed: ${result.errorMessage}`);
    return false;
  }
};

// Main function
const main = async () => {
  console.log("🌏 Vietnam Destination Content Generator");
  console.log("========================================\n");

  // Check for API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌ ANTHROPIC_API_KEY not found in environment");
    process.exit(1);
  }

  let destinationsToProcess: string[] = [];

  if (slugArg) {
    // Single destination
    destinationsToProcess = [slugArg];
  } else if (pendingFlag) {
    // Only destinations with status "placeholder"
    destinationsToProcess = allDestinations
      .filter((d) => {
        const content = destinationContent[d.slug];
        return !content || content.status === "placeholder";
      })
      .map((d) => d.slug);
    console.log(`📋 Found ${destinationsToProcess.length} destinations with placeholder status`);
  } else if (allFlag) {
    // All destinations
    destinationsToProcess = allDestinations.map((d) => d.slug);
    console.log(`📋 Processing all ${destinationsToProcess.length} destinations`);
  } else {
    console.log("Usage:");
    console.log("  --slug=<slug>  Generate for single destination");
    console.log("  --all          Generate for all destinations");
    console.log("  --pending      Generate only for placeholder destinations");
    process.exit(0);
  }

  // Process destinations
  let successCount = 0;
  let failCount = 0;
  const totalTokens = { input: 0, output: 0 };

  for (let i = 0; i < destinationsToProcess.length; i++) {
    const slug = destinationsToProcess[i];
    console.log(`\n[${i + 1}/${destinationsToProcess.length}] Processing: ${slug}`);

    const success = await generateForDestination(slug);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Add delay between requests to avoid rate limiting
    if (i < destinationsToProcess.length - 1) {
      console.log("⏳ Waiting 2 seconds before next request...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log("\n========================================");
  console.log("📊 Generation Summary");
  console.log("========================================");
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📝 Total processed: ${destinationsToProcess.length}`);
  console.log("========================================\n");

  if (failCount > 0) {
    process.exit(1);
  }
};

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

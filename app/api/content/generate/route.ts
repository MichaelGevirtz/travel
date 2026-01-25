import { NextRequest, NextResponse } from "next/server";
import { orchestrateContentGeneration } from "@/lib/services/agents/contentOrchestrator";
import { PageModel } from "@/lib/db/models/Page";
import dbConnect from "@/lib/db/mongodb";

export const maxDuration = 300; // 5 minutes for long-running agent tasks

interface GenerateRequest {
  topic: string;
  destinationType?: "city" | "region" | "beach" | "mountain";
  region?: "north" | "central" | "south";
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: GenerateRequest = await request.json();

    // Validate required fields
    if (!body.topic || typeof body.topic !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'topic' field" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Fetch available articles for internal linking
    const availableArticles = await PageModel.find(
      { status: "published" },
      "slug title destinationType region"
    )
      .limit(50)
      .lean();

    // Format articles for orchestrator
    const formattedArticles = availableArticles.map(article => ({
      slug: article.slug,
      title: article.title,
      destinationType: article.destinationType,
      region: article.region,
    }));

    console.log(`\n🤖 Starting content generation for: "${body.topic}"`);
    console.log(`Available articles for linking: ${formattedArticles.length}`);

    // Run orchestrator
    const result = await orchestrateContentGeneration({
      topic: body.topic,
      destinationType: body.destinationType,
      region: body.region,
      availableArticles: formattedArticles,
    });

    // Check if generation was successful
    if (!result.success || !result.article) {
      return NextResponse.json(
        {
          error: "Failed to generate article",
          message: result.errorMessage || "Unknown error",
          iterations: result.iterations,
          editHistory: result.editHistory,
        },
        { status: 500 }
      );
    }

    // Prepare page data for database
    // Ensure metaDescription is within MongoDB's 160 character limit
    const metaDescription = result.article.metaDescription.length > 160
      ? result.article.metaDescription.substring(0, 157) + '...'
      : result.article.metaDescription;

    console.log(`📝 [API] Preparing to save article to database`);
    console.log(`📝 [API] Title: ${result.article.title}`);
    console.log(`📝 [API] Slug: ${result.article.slug}`);
    console.log(`📝 [API] Status: ${result.status}`);
    console.log(`📝 [API] MetaDescription length: ${metaDescription.length} chars (truncated from ${result.article.metaDescription.length})`);

    const pageData = {
      // Basic fields
      slug: result.article.slug,
      title: result.article.title,
      excerpt: result.article.excerpt,
      content: result.article.content,

      // SEO fields
      metaTitle: result.article.metaTitle,
      metaDescription: metaDescription,
      keywords: result.article.keywords,
      canonicalUrl: result.article.canonicalUrl,
      ogImage: result.article.ogImage,

      // Status (draft if rejected 3 times, otherwise draft pending manual approval)
      status: result.status === "approved" ? "draft" : "draft",
      author: result.article.author,

      // Category
      destinationType: result.article.destinationType,
      region: result.article.region,

      // Content metadata
      contentMeta: {
        readingTime: result.article.contentMeta.readingTime,
        wordCount: result.article.contentMeta.wordCount,
        imageCount: result.article.imageSuggestions.length,
        internalLinks: result.article.contentMeta.internalLinks,
        externalLinks: result.article.contentMeta.externalLinks,
      },

      // Agent workflow tracking
      agentWorkflow: {
        generatedBy: "agent",
        agentIterations: result.iterations,
        agentFinalScore: result.finalReview?.overallScore || 0,
        agentEditHistory: result.editHistory,
        factsToVerify: result.article.factsToVerify.map(fact => ({
          claim: fact.claim,
          location: fact.location,
          priority: fact.priority,
          verified: false,
        })),
        generatedAt: new Date(),
      },

      // Initialize empty arrays for fields not yet populated
      analytics: {
        views: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        avgTimeOnPage: 0,
      },
      searchConsole: {
        impressions: 0,
        clicks: 0,
        averagePosition: 0,
        ctr: 0,
        topQueries: [],
      },
      affiliateLinks: [],
    };

    // Check if page with this slug already exists
    console.log(`📝 [API] Checking for existing page with slug: ${result.article.slug}`);
    const existingPage = await PageModel.findOne({ slug: result.article.slug });

    let savedPage;
    if (existingPage) {
      console.log(`📝 [API] Found existing page, updating...`);
      // Update existing page
      savedPage = await PageModel.findOneAndUpdate(
        { slug: result.article.slug },
        { $set: pageData },
        { new: true }
      );
      console.log(`✅ [API] Updated existing page: ${savedPage?._id}`);
    } else {
      console.log(`📝 [API] No existing page found, creating new...`);
      // Create new page
      savedPage = await PageModel.create(pageData);
      console.log(`✅ [API] Created new page: ${savedPage._id}`);
    }

    console.log(`\n🎉 ============================================`);
    console.log(`🎉 ARTICLE SAVED SUCCESSFULLY!`);
    console.log(`🎉 ID: ${savedPage._id}`);
    console.log(`🎉 Title: ${savedPage.title}`);
    console.log(`🎉 Status: ${savedPage.status}`);
    console.log(`🎉 Word Count: ${savedPage.contentMeta.wordCount}`);
    console.log(`🎉 Score: ${result.finalReview?.overallScore}/100`);
    console.log(`🎉 Iterations: ${result.iterations}`);
    console.log(`🎉 ============================================\n`);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        status: result.status,
        message:
          result.status === "approved"
            ? `Article approved after ${result.iterations} iteration(s) and saved as draft`
            : `Article saved as draft after ${result.iterations} iteration(s) (needs manual review)`,
        page: {
          id: savedPage?._id,
          slug: savedPage?.slug,
          title: savedPage?.title,
          status: savedPage?.status,
          wordCount: savedPage?.contentMeta.wordCount,
          iterations: result.iterations,
          finalScore: result.finalReview?.overallScore,
        },
        editHistory: result.editHistory,
        imageSuggestions: result.article.imageSuggestions,
        factsToVerify: result.article.factsToVerify,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in content generation API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

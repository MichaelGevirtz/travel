/* eslint-disable @typescript-eslint/no-explicit-any */
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

// Types
export interface WriterInput {
  topic: string;
  destinationType?: "city" | "region" | "beach" | "mountain";
  region?: "north" | "central" | "south";
  availableArticles: Array<{
    slug: string;
    title: string;
    destinationType?: string;
    region?: string;
  }>;
}

export interface ImageSuggestion {
  placement: string;
  description: string;
  altText: string;
  priority: "high" | "medium" | "low";
}

export interface FactToVerify {
  claim: string;
  location: string;
  priority: "high" | "medium" | "low";
}

export interface NearbyDestination {
  slug: string;
  name: string;
  distance: number;
  travelTime: string;
  direction: string;
}

export interface WriterGeo {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  nearestAirport?: {
    name: string;
    code: string;
    distance: string;
  };
  distanceFromHanoi?: string;
  distanceFromHCMC?: string;
  nearbyDestinations: NearbyDestination[];
}

export interface WriterOutput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  author: string;
  destinationType: string | null;
  region: string | null;
  geo?: WriterGeo;
  contentMeta: {
    wordCount: number;
    readingTime: number;
    internalLinks: string[];
    externalLinks: string[];
  };
  imageSuggestions: ImageSuggestion[];
  factsToVerify: FactToVerify[];
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Load the writer agent prompt
const loadPrompt = (): string => {
  const promptPath = path.join(process.cwd(), ".claude", "agents", "writer-agent.md");
  return fs.readFileSync(promptPath, "utf-8");
};

// Calculate word count
const calculateWordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (wordCount: number): number => {
  return Math.ceil(wordCount / 200);
};

// Extract internal links from markdown content
const extractInternalLinks = (content: string): string[] => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: string[] = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[2];
    // Only include internal links (starting with / or relative paths)
    if (url.startsWith("/vietnam/") || url.startsWith("vietnam/")) {
      links.push(url.startsWith("/") ? url : `/${url}`);
    }
  }

  return Array.from(new Set(links)); // Remove duplicates
};

// Strip markdown code blocks from JSON response
const stripMarkdownCodeBlocks = (text: string): string => {
  // Remove ```json ... ``` or ``` ... ``` blocks
  const codeBlockRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/;
  const match = text.trim().match(codeBlockRegex);

  if (match) {
    console.log("📝 [Writer] Stripped markdown code blocks from response");
    return match[1].trim();
  }

  return text.trim();
};

// Validate writer output
const validateOutput = (output: any): WriterOutput => {
  // Basic validation
  if (!output.slug || typeof output.slug !== "string") {
    throw new Error("Invalid output: missing or invalid slug");
  }
  if (!output.title || typeof output.title !== "string") {
    throw new Error("Invalid output: missing or invalid title");
  }
  if (!output.content || typeof output.content !== "string") {
    throw new Error("Invalid output: missing or invalid content");
  }

  // Calculate content metadata
  const wordCount = calculateWordCount(output.content);
  const readingTime = calculateReadingTime(wordCount);
  const internalLinks = extractInternalLinks(output.content);

  // Return validated and enhanced output
  return {
    ...output,
    contentMeta: {
      wordCount,
      readingTime,
      internalLinks,
      externalLinks: output.contentMeta?.externalLinks || [],
    },
  };
};

// Main function to generate article
export const generateArticle = async (input: WriterInput): Promise<WriterOutput> => {
  try {
    console.log("\n📝 [Writer] Starting article generation");
    console.log(`📝 [Writer] Topic: "${input.topic}"`);
    console.log(`📝 [Writer] Destination Type: ${input.destinationType || "Not specified"}`);
    console.log(`📝 [Writer] Region: ${input.region || "Not specified"}`);
    console.log(`📝 [Writer] Available articles for linking: ${input.availableArticles.length}`);

    // Load the writer prompt
    console.log("📝 [Writer] Loading writer agent prompt...");
    const systemPrompt = loadPrompt();
    console.log(`📝 [Writer] Loaded prompt (${systemPrompt.length} characters)`);

    // Format available articles for the prompt
    const availableArticlesText = input.availableArticles
      .map(article =>
        `- ${article.title} (/${article.slug}) - ${article.region || "N/A"} - ${article.destinationType || "N/A"}`
      )
      .join("\n");

    // Create user message with input data
    const userMessage = `Generate a travel article with the following specifications:

**Topic:** ${input.topic}
**Destination Type:** ${input.destinationType || "Not specified"}
**Region:** ${input.region || "Not specified"}

**Available Articles for Internal Linking:**
${availableArticlesText || "None available"}

Please generate the article and return ONLY the JSON object as specified in the Output Schema.`;

    console.log("📝 [Writer] Calling Anthropic API...");
    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 16000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    console.log("📝 [Writer] Received response from Anthropic API");
    console.log(`📝 [Writer] Stop reason: ${response.stop_reason}`);
    console.log(`📝 [Writer] Usage - Input tokens: ${response.usage.input_tokens}, Output tokens: ${response.usage.output_tokens}`);

    // Extract text from response
    const textContent = response.content.find(block => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      console.error("❌ [Writer] No text content in API response");
      throw new Error("No text content in API response");
    }

    console.log(`📝 [Writer] Extracted text content (${textContent.text.length} characters)`);
    console.log(`📝 [Writer] First 200 chars of response: ${textContent.text.substring(0, 200)}...`);

    // Strip markdown code blocks if present
    const cleanedText = stripMarkdownCodeBlocks(textContent.text);
    console.log(`📝 [Writer] Cleaned text (${cleanedText.length} characters)`);

    // Parse JSON response
    console.log("📝 [Writer] Parsing JSON response...");
    let rawOutput;
    try {
      rawOutput = JSON.parse(cleanedText);
      console.log("✅ [Writer] Successfully parsed JSON");
    } catch (parseError) {
      console.error("❌ [Writer] JSON parsing failed");
      console.error("❌ [Writer] First 500 chars of text to parse:", cleanedText.substring(0, 500));
      throw parseError;
    }

    // Validate and enhance output
    console.log("📝 [Writer] Validating output structure...");
    const validatedOutput = validateOutput(rawOutput);
    console.log(`✅ [Writer] Validation complete - Word count: ${validatedOutput.contentMeta.wordCount}`);
    console.log(`✅ [Writer] Internal links: ${validatedOutput.contentMeta.internalLinks.length}`);
    console.log(`✅ [Writer] Image suggestions: ${validatedOutput.imageSuggestions?.length || 0}`);
    console.log(`✅ [Writer] Facts to verify: ${validatedOutput.factsToVerify?.length || 0}`);

    return validatedOutput;
  } catch (error) {
    console.error("❌ [Writer] Error generating article:", error);
    if (error instanceof Error) {
      console.error("❌ [Writer] Error message:", error.message);
      console.error("❌ [Writer] Error stack:", error.stack);
    }
    throw new Error(`Failed to generate article: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Export for testing
export const _internal = {
  calculateWordCount,
  calculateReadingTime,
  extractInternalLinks,
  validateOutput,
};

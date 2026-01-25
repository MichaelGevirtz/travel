import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import type { WriterOutput } from "./writerAgent";

// Types
export interface EditorIssue {
  category: "structure" | "word_count" | "banned_phrases" | "internal_links" | "voice_tone" | "content_quality" | "seo" | "images_facts";
  severity: "critical" | "major" | "minor";
  description: string;
  location: string;
  suggestion: string;
  example: string | null;
}

export interface EditorOutput {
  decision: "approve" | "reject";
  overallScore: number;
  summary: string;
  strengths: string[];
  issues: EditorIssue[];
  requiredChanges: string[];
  recommendations: string[];
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Load the editor agent prompt
const loadPrompt = (): string => {
  const promptPath = path.join(process.cwd(), ".claude", "agents", "editor-agent.md");
  return fs.readFileSync(promptPath, "utf-8");
};

// Strip markdown code blocks from JSON response
const stripMarkdownCodeBlocks = (text: string): string => {
  // Remove ```json ... ``` or ``` ... ``` blocks
  const codeBlockRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/;
  const match = text.trim().match(codeBlockRegex);

  if (match) {
    console.log("✍️ [Editor] Stripped markdown code blocks from response");
    return match[1].trim();
  }

  return text.trim();
};

// Validate editor output
const validateOutput = (output: any): EditorOutput => {
  // Basic validation
  if (!output.decision || !["approve", "reject"].includes(output.decision)) {
    throw new Error("Invalid output: missing or invalid decision");
  }
  if (typeof output.overallScore !== "number" || output.overallScore < 0 || output.overallScore > 100) {
    throw new Error("Invalid output: overallScore must be between 0 and 100");
  }
  if (!output.summary || typeof output.summary !== "string") {
    throw new Error("Invalid output: missing or invalid summary");
  }

  // Ensure arrays exist
  return {
    decision: output.decision,
    overallScore: output.overallScore,
    summary: output.summary,
    strengths: Array.isArray(output.strengths) ? output.strengths : [],
    issues: Array.isArray(output.issues) ? output.issues : [],
    requiredChanges: Array.isArray(output.requiredChanges) ? output.requiredChanges : [],
    recommendations: Array.isArray(output.recommendations) ? output.recommendations : [],
  };
};

// Main function to review article
export const reviewArticle = async (article: WriterOutput): Promise<EditorOutput> => {
  try {
    console.log("\n✍️ [Editor] Starting article review");
    console.log(`✍️ [Editor] Article title: "${article.title}"`);
    console.log(`✍️ [Editor] Word count: ${article.contentMeta.wordCount}`);
    console.log(`✍️ [Editor] Internal links: ${article.contentMeta.internalLinks.length}`);

    // Load the editor prompt
    console.log("✍️ [Editor] Loading editor agent prompt...");
    const systemPrompt = loadPrompt();
    console.log(`✍️ [Editor] Loaded prompt (${systemPrompt.length} characters)`);

    // Create user message with article data
    const userMessage = `Please review the following article:

**Article Metadata:**
- Title: ${article.title}
- Word Count: ${article.contentMeta.wordCount}
- Internal Links: ${article.contentMeta.internalLinks.length}
- Image Suggestions: ${article.imageSuggestions.length}
- Facts to Verify: ${article.factsToVerify.length}

**Article Content:**
${article.content}

**Meta Information:**
- Meta Title: ${article.metaTitle} (${article.metaTitle.length} chars)
- Meta Description: ${article.metaDescription} (${article.metaDescription.length} chars)
- Keywords: ${article.keywords.join(", ")}

**Internal Links:**
${article.contentMeta.internalLinks.join("\n")}

Please review this article according to the editorial standards and return ONLY the JSON object as specified in the Output Schema.`;

    console.log("✍️ [Editor] Calling Anthropic API...");
    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 8000,
      temperature: 0.3, // Lower temperature for more consistent editorial decisions
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    console.log("✍️ [Editor] Received response from Anthropic API");
    console.log(`✍️ [Editor] Stop reason: ${response.stop_reason}`);
    console.log(`✍️ [Editor] Usage - Input tokens: ${response.usage.input_tokens}, Output tokens: ${response.usage.output_tokens}`);

    // Extract text from response
    const textContent = response.content.find(block => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      console.error("❌ [Editor] No text content in API response");
      throw new Error("No text content in API response");
    }

    console.log(`✍️ [Editor] Extracted text content (${textContent.text.length} characters)`);
    console.log(`✍️ [Editor] First 200 chars of response: ${textContent.text.substring(0, 200)}...`);

    // Strip markdown code blocks if present
    const cleanedText = stripMarkdownCodeBlocks(textContent.text);
    console.log(`✍️ [Editor] Cleaned text (${cleanedText.length} characters)`);

    // Parse JSON response
    console.log("✍️ [Editor] Parsing JSON response...");
    let rawOutput;
    try {
      rawOutput = JSON.parse(cleanedText);
      console.log("✅ [Editor] Successfully parsed JSON");
    } catch (parseError) {
      console.error("❌ [Editor] JSON parsing failed");
      console.error("❌ [Editor] First 500 chars of text to parse:", cleanedText.substring(0, 500));
      throw parseError;
    }

    // Validate output
    console.log("✍️ [Editor] Validating output structure...");
    const validatedOutput = validateOutput(rawOutput);
    console.log(`✅ [Editor] Validation complete`);
    console.log(`✅ [Editor] Decision: ${validatedOutput.decision.toUpperCase()}`);
    console.log(`✅ [Editor] Overall score: ${validatedOutput.overallScore}/100`);
    console.log(`✅ [Editor] Issues found: ${validatedOutput.issues.length}`);
    console.log(`✅ [Editor] Required changes: ${validatedOutput.requiredChanges.length}`);

    return validatedOutput;
  } catch (error) {
    console.error("❌ [Editor] Error reviewing article:", error);
    if (error instanceof Error) {
      console.error("❌ [Editor] Error message:", error.message);
      console.error("❌ [Editor] Error stack:", error.stack);
    }
    throw new Error(`Failed to review article: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Export for testing
export const _internal = {
  validateOutput,
};

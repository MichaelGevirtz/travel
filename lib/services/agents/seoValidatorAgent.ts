/* eslint-disable @typescript-eslint/no-explicit-any */
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import type { WriterOutput } from "./writerAgent";

// Types
export interface SEOIssue {
  check: string;
  status: "passed" | "failed" | "warning";
  priority: "critical" | "high" | "medium" | "low";
  current: string;
  required: string;
  location: string;
  fix: string;
}

export interface SEOScoreBreakdown {
  titleMeta: number;
  contentQuality: number;
  structure: number;
  links: number;
  technical: number;
}

export interface SEOValidatorOutput {
  passed: boolean;
  score: number;
  grade: string;
  breakdown: SEOScoreBreakdown;
  summary: {
    checksRun: number;
    passed: number;
    failed: number;
    warnings: number;
  };
  issues: SEOIssue[];
  warnings: SEOIssue[];
  recommendations: string[];
  schemaRequired: {
    article: boolean;
    breadcrumb: boolean;
    faq: boolean;
    howTo: boolean;
  };
}

// Passing threshold - articles with score >= 60 pass
const PASSING_SCORE = 60;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Load the SEO validator agent prompt
const loadPrompt = (): string => {
  const promptPath = path.join(process.cwd(), ".claude", "agents", "seo-validator-agent.md");
  return fs.readFileSync(promptPath, "utf-8");
};

// Load SEO knowledge files
const loadKnowledge = (): string => {
  const knowledgePath = path.join(process.cwd(), ".claude", "knowledge");
  const files = [
    "seo-fundamentals.md",
    "seo-article-checklist.md",
    "seo-schema-markup.md",
    "seo-travel-keywords.md",
  ];

  let knowledge = "";
  for (const file of files) {
    try {
      const filePath = path.join(knowledgePath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      knowledge += `\n\n--- ${file} ---\n\n${content}`;
    } catch {
      console.warn(`⚠️ [SEO] Could not load knowledge file: ${file}`);
    }
  }
  return knowledge;
};

// Strip markdown code blocks from JSON response
const stripMarkdownCodeBlocks = (text: string): string => {
  const codeBlockRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/;
  const match = text.trim().match(codeBlockRegex);

  if (match) {
    console.log("🔍 [SEO] Stripped markdown code blocks from response");
    return match[1].trim();
  }

  return text.trim();
};

// Calculate grade from score
const getGrade = (score: number): string => {
  if (score >= 90) return "A";
  if (score >= 80) return "B+";
  if (score >= 70) return "B";
  if (score >= 60) return "C+";
  if (score >= 50) return "C";
  if (score >= 40) return "D";
  return "F";
};

// Validate SEO validator output
const validateOutput = (output: any): SEOValidatorOutput => {
  // Basic validation
  if (typeof output.score !== "number" || output.score < 0 || output.score > 100) {
    throw new Error("Invalid output: score must be between 0 and 100");
  }

  const score = output.score;
  const passed = score >= PASSING_SCORE;

  // Ensure all required fields exist with defaults
  return {
    passed,
    score,
    grade: output.grade || getGrade(score),
    breakdown: {
      titleMeta: output.breakdown?.titleMeta ?? 0,
      contentQuality: output.breakdown?.contentQuality ?? 0,
      structure: output.breakdown?.structure ?? 0,
      links: output.breakdown?.links ?? 0,
      technical: output.breakdown?.technical ?? 0,
    },
    summary: {
      checksRun: output.summary?.checksRun ?? 0,
      passed: output.summary?.passed ?? 0,
      failed: output.summary?.failed ?? 0,
      warnings: output.summary?.warnings ?? 0,
    },
    issues: Array.isArray(output.issues) ? output.issues : [],
    warnings: Array.isArray(output.warnings) ? output.warnings : [],
    recommendations: Array.isArray(output.recommendations) ? output.recommendations : [],
    schemaRequired: {
      article: output.schemaRequired?.article ?? true,
      breadcrumb: output.schemaRequired?.breadcrumb ?? true,
      faq: output.schemaRequired?.faq ?? false,
      howTo: output.schemaRequired?.howTo ?? false,
    },
  };
};

// Main function to validate article SEO
export const validateSEO = async (article: WriterOutput): Promise<SEOValidatorOutput> => {
  try {
    console.log("\n🔍 [SEO] Starting SEO validation");
    console.log(`🔍 [SEO] Article: "${article.title}"`);
    console.log(`🔍 [SEO] Meta title: ${article.metaTitle.length} chars`);
    console.log(`🔍 [SEO] Meta description: ${article.metaDescription.length} chars`);
    console.log(`🔍 [SEO] Word count: ${article.contentMeta.wordCount}`);

    // Load the SEO validator prompt and knowledge
    console.log("🔍 [SEO] Loading SEO validator agent prompt...");
    const systemPrompt = loadPrompt();
    console.log(`🔍 [SEO] Loaded prompt (${systemPrompt.length} characters)`);

    console.log("🔍 [SEO] Loading SEO knowledge files...");
    const knowledge = loadKnowledge();
    console.log(`🔍 [SEO] Loaded knowledge (${knowledge.length} characters)`);

    // Combine prompt with knowledge
    const fullSystemPrompt = `${systemPrompt}\n\n# SEO Knowledge Base\n${knowledge}`;

    // Extract headings from content for analysis
    const headings = article.content.match(/^#{1,3}\s+.+$/gm) || [];
    const h1Count = headings.filter(h => h.startsWith("# ") && !h.startsWith("## ")).length;
    const h2Count = headings.filter(h => h.startsWith("## ")).length;
    const h3Count = headings.filter(h => h.startsWith("### ")).length;

    // Check for FAQ section
    const hasFAQSection = /##\s*(FAQ|Frequently Asked Questions)/i.test(article.content);

    // Create user message with article data
    const userMessage = `Please validate the following article for SEO compliance:

**Article Metadata:**
- Slug: ${article.slug}
- Title: ${article.title}
- Word Count: ${article.contentMeta.wordCount}
- Reading Time: ${article.contentMeta.readingTime} min
- Internal Links: ${article.contentMeta.internalLinks.length}
- External Links: ${article.contentMeta.externalLinks.length}

**SEO Elements:**
- Meta Title: "${article.metaTitle}" (${article.metaTitle.length} chars)
- Meta Description: "${article.metaDescription}" (${article.metaDescription.length} chars)
- Keywords: ${article.keywords.join(", ")}
- Canonical URL: ${article.canonicalUrl}

**Heading Analysis:**
- H1 count: ${h1Count}
- H2 count: ${h2Count}
- H3 count: ${h3Count}
- Has FAQ section: ${hasFAQSection}

**Headings Found:**
${headings.join("\n")}

**First 500 characters of content:**
${article.content.substring(0, 500)}

**Internal Links:**
${article.contentMeta.internalLinks.join("\n") || "None"}

**Full Content:**
${article.content}

---

**IMPORTANT:** The passing score threshold is ${PASSING_SCORE}. Articles with score >= ${PASSING_SCORE} should have passed: true.

Please validate this article against all SEO criteria and return ONLY the JSON object as specified in the Output Schema.`;

    console.log("🔍 [SEO] Calling Anthropic API...");
    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 8000,
      temperature: 0.2, // Low temperature for consistent validation
      system: fullSystemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    console.log("🔍 [SEO] Received response from Anthropic API");
    console.log(`🔍 [SEO] Stop reason: ${response.stop_reason}`);
    console.log(`🔍 [SEO] Usage - Input: ${response.usage.input_tokens}, Output: ${response.usage.output_tokens}`);

    // Extract text from response
    const textContent = response.content.find(block => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      console.error("❌ [SEO] No text content in API response");
      throw new Error("No text content in API response");
    }

    console.log(`🔍 [SEO] Extracted text content (${textContent.text.length} characters)`);

    // Strip markdown code blocks if present
    const cleanedText = stripMarkdownCodeBlocks(textContent.text);

    // Parse JSON response
    console.log("🔍 [SEO] Parsing JSON response...");
    let rawOutput;
    try {
      rawOutput = JSON.parse(cleanedText);
      console.log("✅ [SEO] Successfully parsed JSON");
    } catch (parseError) {
      console.error("❌ [SEO] JSON parsing failed");
      console.error("❌ [SEO] First 500 chars:", cleanedText.substring(0, 500));
      throw parseError;
    }

    // Validate output
    console.log("🔍 [SEO] Validating output structure...");
    const validatedOutput = validateOutput(rawOutput);

    console.log(`✅ [SEO] Validation complete`);
    console.log(`✅ [SEO] Score: ${validatedOutput.score}/100 (Grade: ${validatedOutput.grade})`);
    console.log(`✅ [SEO] Passed: ${validatedOutput.passed ? "YES" : "NO"} (threshold: ${PASSING_SCORE})`);
    console.log(`✅ [SEO] Issues: ${validatedOutput.issues.length}, Warnings: ${validatedOutput.warnings.length}`);

    return validatedOutput;
  } catch (error) {
    console.error("❌ [SEO] Error validating article:", error);
    if (error instanceof Error) {
      console.error("❌ [SEO] Error message:", error.message);
    }
    throw new Error(`Failed to validate SEO: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Export constants and internals for testing
export const THRESHOLD = PASSING_SCORE;

export const _internal = {
  validateOutput,
  getGrade,
  loadKnowledge,
};

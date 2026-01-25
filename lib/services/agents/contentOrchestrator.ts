import { generateArticle, WriterInput, WriterOutput } from "./writerAgent";
import { reviewArticle, EditorOutput } from "./editorAgent";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

// Types
export interface OrchestratorInput {
  topic: string;
  destinationType?: "city" | "region" | "beach" | "mountain";
  region?: "north" | "central" | "south";
  availableArticles?: Array<{
    slug: string;
    title: string;
    destinationType?: string;
    region?: string;
  }>;
}

export interface EditHistory {
  iteration: number;
  editorDecision: "approve" | "reject";
  editorScore: number;
  editorSummary: string;
  issues: any[];
  requiredChanges: string[];
  timestamp: Date;
}

export interface OrchestratorOutput {
  success: boolean;
  status: "approved" | "draft" | "error";
  article: WriterOutput | null;
  finalReview: EditorOutput | null;
  iterations: number;
  editHistory: EditHistory[];
  errorMessage?: string;
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Load writer prompt for revision context
const loadWriterPrompt = (): string => {
  const promptPath = path.join(process.cwd(), ".claude", "agents", "writer-agent.md");
  return fs.readFileSync(promptPath, "utf-8");
};

// Strip markdown code blocks from JSON response
const stripMarkdownCodeBlocks = (text: string): string => {
  // Remove ```json ... ``` or ``` ... ``` blocks
  const codeBlockRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/;
  const match = text.trim().match(codeBlockRegex);

  if (match) {
    console.log("🔄 [Orchestrator] Stripped markdown code blocks from revision response");
    return match[1].trim();
  }

  return text.trim();
};

// Generate revised article based on editor feedback
const generateRevision = async (
  originalInput: WriterInput,
  originalArticle: WriterOutput,
  editorFeedback: EditorOutput,
  iteration: number
): Promise<WriterOutput> => {
  try {
    console.log(`\n🔄 [Orchestrator] Starting revision ${iteration}`);
    console.log(`🔄 [Orchestrator] Editor score: ${editorFeedback.overallScore}/100`);
    console.log(`🔄 [Orchestrator] Issues to address: ${editorFeedback.issues.length}`);
    console.log(`🔄 [Orchestrator] Required changes: ${editorFeedback.requiredChanges.length}`);

    const systemPrompt = loadWriterPrompt();

    // Format the feedback for the writer
    const feedbackText = `
**EDITOR FEEDBACK (Iteration ${iteration}):**

**Decision:** REJECTED
**Overall Score:** ${editorFeedback.overallScore}/100

**Summary:**
${editorFeedback.summary}

**Strengths:**
${editorFeedback.strengths.map((s, i) => `${i + 1}. ${s}`).join("\n")}

**Issues Found:**
${editorFeedback.issues.map((issue, i) => `
${i + 1}. [${issue.severity.toUpperCase()}] ${issue.category}
   - Problem: ${issue.description}
   - Location: ${issue.location}
   - Fix: ${issue.suggestion}
   ${issue.example ? `- Example: ${issue.example}` : ""}
`).join("\n")}

**REQUIRED CHANGES (Must address ALL of these):**
${editorFeedback.requiredChanges.map((change, i) => `${i + 1}. ${change}`).join("\n")}

${editorFeedback.recommendations.length > 0 ? `
**Recommendations (Optional):**
${editorFeedback.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join("\n")}
` : ""}
`;

    // Format available articles for the prompt
    const availableArticlesText = originalInput.availableArticles
      .map(article =>
        `- ${article.title} (/${article.slug}) - ${article.region || "N/A"} - ${article.destinationType || "N/A"}`
      )
      .join("\n");

    const userMessage = `You previously wrote an article that was REJECTED by the editor. Please revise the article to address ALL the required changes.

**Original Topic:** ${originalInput.topic}
**Destination Type:** ${originalInput.destinationType || "Not specified"}
**Region:** ${originalInput.region || "Not specified"}

**Available Articles for Internal Linking:**
${availableArticlesText || "None available"}

${feedbackText}

**Your Previous Article Content:**
${originalArticle.content}

---

Please revise the article to address ALL the required changes listed above. Focus especially on ${editorFeedback.issues.filter(i => i.severity === "critical").length > 0 ? "CRITICAL issues" : "the major issues"}.

Return ONLY the complete revised JSON object as specified in the Output Schema (same format as before).`;

    console.log("🔄 [Orchestrator] Calling Anthropic API for revision...");
    // Call Anthropic API for revision
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

    console.log("🔄 [Orchestrator] Received revision response");
    console.log(`🔄 [Orchestrator] Stop reason: ${response.stop_reason}`);
    console.log(`🔄 [Orchestrator] Usage - Input tokens: ${response.usage.input_tokens}, Output tokens: ${response.usage.output_tokens}`);

    // Extract text from response
    const textContent = response.content.find(block => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      console.error("❌ [Orchestrator] No text content in revision response");
      throw new Error("No text content in API response");
    }

    console.log(`🔄 [Orchestrator] Extracted text content (${textContent.text.length} characters)`);

    // Strip markdown code blocks if present
    const cleanedText = stripMarkdownCodeBlocks(textContent.text);
    console.log(`🔄 [Orchestrator] Cleaned text (${cleanedText.length} characters)`);

    // Parse JSON response
    console.log("🔄 [Orchestrator] Parsing JSON revision...");
    let rawOutput;
    try {
      rawOutput = JSON.parse(cleanedText);
      console.log("✅ [Orchestrator] Successfully parsed revision JSON");
    } catch (parseError) {
      console.error("❌ [Orchestrator] Revision JSON parsing failed");
      console.error("❌ [Orchestrator] First 500 chars:", cleanedText.substring(0, 500));
      throw parseError;
    }

    // Use the same validation as writer agent
    console.log("🔄 [Orchestrator] Validating revision output...");
    const { validateOutput } = require("./writerAgent")._internal;
    const validatedOutput = validateOutput(rawOutput);
    console.log(`✅ [Orchestrator] Revision validated - ${validatedOutput.contentMeta.wordCount} words`);

    return validatedOutput;
  } catch (error) {
    console.error("❌ [Orchestrator] Error generating revision:", error);
    if (error instanceof Error) {
      console.error("❌ [Orchestrator] Error message:", error.message);
    }
    throw new Error(`Failed to generate revision: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Main orchestrator function
export const orchestrateContentGeneration = async (
  input: OrchestratorInput
): Promise<OrchestratorOutput> => {
  const MAX_ITERATIONS = 3;
  const editHistory: EditHistory[] = [];
  let currentArticle: WriterOutput | null = null;
  let currentReview: EditorOutput | null = null;

  console.log("\n🤖 ============================================");
  console.log(`🤖 Starting content generation for: "${input.topic}"`);
  console.log(`🤖 Destination Type: ${input.destinationType || "Not specified"}`);
  console.log(`🤖 Region: ${input.region || "Not specified"}`);
  console.log(`🤖 Available articles for linking: ${input.availableArticles?.length || 0}`);
  console.log("🤖 ============================================\n");

  try {
    // Prepare writer input
    const writerInput: WriterInput = {
      topic: input.topic,
      destinationType: input.destinationType,
      region: input.region,
      availableArticles: input.availableArticles || [],
    };

    // Iteration loop (max 3 attempts)
    for (let iteration = 1; iteration <= MAX_ITERATIONS; iteration++) {
      console.log(`\n=== Iteration ${iteration}/${MAX_ITERATIONS} ===`);

      // Step 1: Generate article (or revision)
      if (iteration === 1) {
        console.log("Writer: Generating initial article...");
        currentArticle = await generateArticle(writerInput);
      } else if (currentArticle && currentReview) {
        console.log(`Writer: Generating revision based on editor feedback...`);
        currentArticle = await generateRevision(
          writerInput,
          currentArticle,
          currentReview,
          iteration
        );
      }

      if (!currentArticle) {
        throw new Error("Failed to generate article");
      }

      console.log(`✓ Article generated: ${currentArticle.contentMeta.wordCount} words, ${currentArticle.contentMeta.internalLinks.length} internal links`);

      // Step 2: Review article
      console.log("Editor: Reviewing article...");
      currentReview = await reviewArticle(currentArticle);

      // Add to edit history
      editHistory.push({
        iteration,
        editorDecision: currentReview.decision,
        editorScore: currentReview.overallScore,
        editorSummary: currentReview.summary,
        issues: currentReview.issues,
        requiredChanges: currentReview.requiredChanges,
        timestamp: new Date(),
      });

      console.log(`✓ Editor review complete: ${currentReview.decision.toUpperCase()} (score: ${currentReview.overallScore}/100)`);

      // Step 3: Check decision
      if (currentReview.decision === "approve") {
        console.log(`\n✅ ============================================`);
        console.log(`✅ Article APPROVED on iteration ${iteration}`);
        console.log(`✅ Final score: ${currentReview.overallScore}/100`);
        console.log(`✅ Word count: ${currentArticle.contentMeta.wordCount}`);
        console.log(`✅ Internal links: ${currentArticle.contentMeta.internalLinks.length}`);
        console.log(`✅ ============================================\n`);
        return {
          success: true,
          status: "approved",
          article: currentArticle,
          finalReview: currentReview,
          iterations: iteration,
          editHistory,
        };
      } else {
        console.log(`\n❌ Article REJECTED on iteration ${iteration}`);
        console.log(`❌ Score: ${currentReview.overallScore}/100`);
        console.log(`❌ Issues found: ${currentReview.issues.length} (${currentReview.issues.filter(i => i.severity === "critical").length} critical)`);
        console.log(`❌ Required changes: ${currentReview.requiredChanges.length}`);

        // Check if we've reached max iterations
        if (iteration === MAX_ITERATIONS) {
          console.log(`\n⚠️  ============================================`);
          console.log(`⚠️  Max iterations (${MAX_ITERATIONS}) reached. Saving as DRAFT.`);
          console.log(`⚠️  Final score: ${currentReview.overallScore}/100`);
          console.log(`⚠️  This article requires manual review.`);
          console.log(`⚠️  ============================================\n`);
          return {
            success: true,
            status: "draft",
            article: currentArticle,
            finalReview: currentReview,
            iterations: iteration,
            editHistory,
          };
        } else {
          console.log(`\n🔄 Proceeding to iteration ${iteration + 1}...`);
        }
      }
    }

    // This should never be reached, but just in case
    console.log(`\n⚠️  Loop completed without decision. Saving as DRAFT.`);
    return {
      success: true,
      status: "draft",
      article: currentArticle,
      finalReview: currentReview,
      iterations: MAX_ITERATIONS,
      editHistory,
    };
  } catch (error) {
    console.error("\n❌ ============================================");
    console.error("❌ ERROR DURING CONTENT GENERATION");
    console.error("❌ ============================================");
    console.error("❌ Error:", error);
    if (error instanceof Error) {
      console.error("❌ Message:", error.message);
      console.error("❌ Stack:", error.stack);
    }
    console.error("❌ ============================================\n");
    return {
      success: false,
      status: "error",
      article: currentArticle,
      finalReview: currentReview,
      iterations: editHistory.length,
      editHistory,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
};

// Export for testing
export const _internal = {
  generateRevision,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import type { DestinationContent, DestinationCardData } from "@/types";

export interface DestinationContentInput {
  destination: DestinationCardData;
}

export interface DestinationContentOutput extends DestinationContent {
  // Additional metadata for orchestration
  _meta?: {
    generatedAt: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
  };
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Load the destination content writer prompt
const loadPrompt = (): string => {
  const promptPath = path.join(
    process.cwd(),
    ".claude",
    "agents",
    "destination-content-writer.md"
  );
  return fs.readFileSync(promptPath, "utf-8");
};

// Strip markdown code blocks from JSON response
const stripMarkdownCodeBlocks = (text: string): string => {
  const codeBlockRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/;
  const match = text.trim().match(codeBlockRegex);

  if (match) {
    console.log(
      "📝 [DestinationWriter] Stripped markdown code blocks from response"
    );
    return match[1].trim();
  }

  return text.trim();
};

// Validate destination content output
const validateOutput = (output: any): DestinationContent => {
  // Validate status
  if (!output.status || !["placeholder", "draft", "published"].includes(output.status)) {
    throw new Error("Invalid output: missing or invalid status");
  }

  // Validate overview
  if (!Array.isArray(output.overview) || output.overview.length !== 2) {
    throw new Error("Invalid output: overview must be an array of exactly 2 paragraphs");
  }

  // Validate thingsToDo
  if (!Array.isArray(output.thingsToDo) || output.thingsToDo.length !== 6) {
    throw new Error("Invalid output: thingsToDo must be an array of exactly 6 items");
  }

  // Validate gettingAround
  if (!output.gettingAround || typeof output.gettingAround !== "object") {
    throw new Error("Invalid output: missing gettingAround object");
  }
  if (!output.gettingAround.byAir || !output.gettingAround.byTrain || !output.gettingAround.local) {
    throw new Error("Invalid output: gettingAround must have byAir, byTrain, and local");
  }

  // Validate faqs
  if (!Array.isArray(output.faqs) || output.faqs.length !== 4) {
    throw new Error("Invalid output: faqs must be an array of exactly 4 items");
  }
  for (const faq of output.faqs) {
    if (!faq.question || !faq.answer) {
      throw new Error("Invalid output: each FAQ must have question and answer");
    }
  }

  return output as DestinationContent;
};

// Main function to generate destination content
export const generateDestinationContent = async (
  input: DestinationContentInput
): Promise<DestinationContentOutput> => {
  try {
    const { destination } = input;

    console.log("\n📝 [DestinationWriter] Starting content generation");
    console.log(`📝 [DestinationWriter] Destination: ${destination.name} (${destination.slug})`);
    console.log(`📝 [DestinationWriter] Type: ${destination.type}, Region: ${destination.region}`);

    // Load the prompt
    const systemPrompt = loadPrompt();
    console.log(`📝 [DestinationWriter] Loaded prompt (${systemPrompt.length} characters)`);

    // Create user message with destination data
    const userMessage = `Generate unique content for this Vietnam destination:

**Destination:** ${destination.name}
**Slug:** ${destination.slug}
**Region:** ${destination.region} Vietnam
**Type:** ${destination.type}
**Description:** ${destination.description}
**Highlights:**
${destination.highlights.map((h) => `- ${h.type}: ${h.text}`).join("\n")}

Return ONLY the JSON object as specified in the Output Format. No explanation, no markdown.`;

    console.log("📝 [DestinationWriter] Calling Anthropic API...");

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    console.log("📝 [DestinationWriter] Received response");
    console.log(`📝 [DestinationWriter] Stop reason: ${response.stop_reason}`);
    console.log(
      `📝 [DestinationWriter] Usage - Input: ${response.usage.input_tokens}, Output: ${response.usage.output_tokens}`
    );

    // Extract text from response
    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in API response");
    }

    // Strip markdown code blocks if present
    const cleanedText = stripMarkdownCodeBlocks(textContent.text);

    // Parse JSON response
    console.log("📝 [DestinationWriter] Parsing JSON response...");
    let rawOutput;
    try {
      rawOutput = JSON.parse(cleanedText);
      console.log("✅ [DestinationWriter] Successfully parsed JSON");
    } catch (parseError) {
      console.error("❌ [DestinationWriter] JSON parsing failed");
      console.error("❌ [DestinationWriter] First 500 chars:", cleanedText.substring(0, 500));
      throw parseError;
    }

    // Validate output
    console.log("📝 [DestinationWriter] Validating output structure...");
    const validatedOutput = validateOutput(rawOutput);
    console.log("✅ [DestinationWriter] Validation complete");

    return {
      ...validatedOutput,
      _meta: {
        generatedAt: new Date().toISOString(),
        model: "claude-sonnet-4-5-20250929",
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    };
  } catch (error) {
    console.error("❌ [DestinationWriter] Error generating content:", error);
    throw new Error(
      `Failed to generate destination content: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

// Export for testing
export const _internal = {
  validateOutput,
  stripMarkdownCodeBlocks,
};

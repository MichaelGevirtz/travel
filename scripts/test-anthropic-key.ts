import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function testAnthropicKey() {
  console.log("Testing Anthropic API Key...\n");

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY not found in .env.local");
    process.exit(1);
  }

  console.log(`✓ API Key found: ${apiKey.substring(0, 20)}...`);

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    console.log("\nSending test message to Claude...");

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 50,
      messages: [
        {
          role: "user",
          content: "Say 'API key is working!' and nothing else.",
        },
      ],
    });

    const response = message.content[0];
    if (response.type === "text") {
      console.log("\n✅ SUCCESS! API Key is working correctly.\n");
      console.log(`Claude's response: "${response.text}"\n`);
      console.log("You can now use the content generation system!");
    }
  } catch (error: any) {
    console.error("\n❌ FAILED! API Key test failed.\n");
    if (error.status === 401) {
      console.error("Error: Invalid API key. Please check your key in .env.local");
    } else if (error.status === 429) {
      console.error("Error: Rate limit exceeded or insufficient credits.");
    } else {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
}

testAnthropicKey();

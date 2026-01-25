import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

import { connectDB } from '../lib/db/mongodb';
import { Page } from '../lib/db/models/Page';

async function getHanoiArticle() {
  try {
    await connectDB();

    const article = await Page.findOne({
      slug: "hanoi-travel-guide-2025",
    }).lean();

    if (!article) {
      console.log("Article not found");
      process.exit(1);
    }

    console.log("=== ARTICLE FOUND ===");
    console.log("Title:", article.title);
    console.log("Word Count:", article.wordCount || 'N/A');
    console.log("Status:", article.status);
    console.log("\n=== CONTENT ===\n");
    console.log(article.content);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

getHanoiArticle();

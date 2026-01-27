// Script to insert a single article into the database
// Usage: tsx --env-file=.env.local scripts/insert-article.ts <json-file>

import dbConnect from "../lib/db/mongodb";
import { PageModel } from "../lib/db/models/Page";
import fs from "fs";
import path from "path";

async function insertArticle() {
  const jsonFile = process.argv[2];

  if (!jsonFile) {
    console.error("Usage: tsx --env-file=.env.local scripts/insert-article.ts <json-file>");
    process.exit(1);
  }

  const filePath = path.resolve(jsonFile);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`📖 Reading article from: ${filePath}`);
  const articleData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log("📦 Connecting to database...");
  await dbConnect();
  console.log("✅ Database connected");

  // Check if article already exists
  const existing = await PageModel.findOne({ slug: articleData.slug });
  if (existing) {
    console.log(`⚠️  Article with slug "${articleData.slug}" already exists. Updating...`);
    await PageModel.updateOne({ slug: articleData.slug }, articleData);
    console.log(`✅ Updated article: ${articleData.title}`);
  } else {
    await PageModel.create(articleData);
    console.log(`✅ Created article: ${articleData.title}`);
  }

  process.exit(0);
}

insertArticle().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

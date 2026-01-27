import dbConnect from "../lib/db/mongodb";
import { PageModel } from "../lib/db/models/Page";

async function updateArticleYear() {
  const oldYear = "2025";
  const newYear = "2026";

  console.log(`📅 Updating articles from ${oldYear} to ${newYear}...`);
  console.log("📦 Connecting to database...");

  await dbConnect();
  console.log("✅ Database connected");

  // Find all articles
  const articles = await PageModel.find({});
  console.log(`📄 Found ${articles.length} articles to process`);

  let updatedCount = 0;

  for (const article of articles) {
    const updates: Record<string, string> = {};
    let hasChanges = false;

    // Update title
    if (article.title && article.title.includes(oldYear)) {
      updates.title = article.title.replace(new RegExp(oldYear, "g"), newYear);
      hasChanges = true;
    }

    // Update content
    if (article.content && article.content.includes(oldYear)) {
      updates.content = article.content.replace(new RegExp(oldYear, "g"), newYear);
      hasChanges = true;
    }

    // Update metaTitle
    if (article.metaTitle && article.metaTitle.includes(oldYear)) {
      updates.metaTitle = article.metaTitle.replace(new RegExp(oldYear, "g"), newYear);
      hasChanges = true;
    }

    // Update metaDescription
    if (article.metaDescription && article.metaDescription.includes(oldYear)) {
      updates.metaDescription = article.metaDescription.replace(new RegExp(oldYear, "g"), newYear);
      hasChanges = true;
    }

    // Update excerpt
    if (article.excerpt && article.excerpt.includes(oldYear)) {
      updates.excerpt = article.excerpt.replace(new RegExp(oldYear, "g"), newYear);
      hasChanges = true;
    }

    if (hasChanges) {
      await PageModel.updateOne({ _id: article._id }, { $set: updates });
      console.log(`  ✅ Updated: ${article.slug}`);
      updatedCount++;
    }
  }

  console.log(`\n🎉 Done! Updated ${updatedCount} articles from ${oldYear} to ${newYear}`);
  process.exit(0);
}

updateArticleYear().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const PageSchema = new mongoose.Schema({
  slug: String,
  title: String,
  content: String,
  status: String,
  wordCount: Number,
  updatedAt: Date,
}, { strict: false });

const Page = mongoose.model('Page', PageSchema);

async function updateArticle() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Read the fixed content
    const fixedContent = fs.readFileSync(
      path.join(__dirname, 'hanoi-article-fixed.md'),
      'utf8'
    );

    // Count words (rough estimate)
    const wordCount = fixedContent.split(/\s+/).length;

    console.log('Updating article...');
    console.log('New word count:', wordCount);

    // Update the article
    const result = await Page.updateOne(
      { slug: 'hanoi-travel-guide-2025' },
      {
        $set: {
          content: fixedContent,
          wordCount: wordCount,
          updatedAt: new Date(),
        }
      }
    );

    if (result.modifiedCount === 0) {
      console.error('Article not updated. Check if slug exists.');
      process.exit(1);
    }

    console.log('✅ Article updated successfully!');
    console.log('Modified:', result.modifiedCount, 'document(s)');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

updateArticle();

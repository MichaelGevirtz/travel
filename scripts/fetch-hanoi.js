require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  slug: String,
  title: String,
  content: String,
  status: String,
  wordCount: Number,
}, { strict: false });

const Page = mongoose.model('Page', PageSchema);

async function fetchArticle() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const article = await Page.findOne({ slug: 'hanoi-travel-guide-2025' }).lean();

    if (!article) {
      console.error('Article not found');
      process.exit(1);
    }

    console.log('=== ARTICLE FOUND ===');
    console.log('Title:', article.title);
    console.log('Word Count:', article.wordCount || 'N/A');
    console.log('Status:', article.status);
    console.log('\n=== CONTENT ===\n');
    console.log(article.content);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

fetchArticle();

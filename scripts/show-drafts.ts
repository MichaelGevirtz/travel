import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

import { connectDB } from '../lib/db/mongodb';
import { Page } from '../lib/db/models/Page';

async function showDrafts() {
  try {
    await connectDB();

    const drafts = await Page.find({ generatedBy: 'agent' }).sort({ createdAt: -1 });

    console.log('\n📄 AI-Generated Articles in MongoDB:\n');
    console.log('='.repeat(80));

    if (drafts.length === 0) {
      console.log('\nNo articles found yet.');
    } else {
      drafts.forEach((draft, i) => {
        console.log(`\n[${i + 1}] ${draft.title}`);
        console.log(`    ID: ${draft._id}`);
        console.log(`    Slug: ${draft.slug}`);
        console.log(`    Status: ${draft.status}`);
        console.log(`    Word Count: ${draft.wordCount || 'N/A'}`);
        console.log(`    Agent Score: ${draft.agentScore || 'N/A'}/100`);
        console.log(`    Iterations: ${draft.iterations || 'N/A'}`);
        console.log(`    Created: ${draft.createdAt?.toLocaleString() || 'N/A'}`);
        console.log(`    Updated: ${draft.updatedAt?.toLocaleString() || 'N/A'}`);
        console.log('-'.repeat(80));
      });

      console.log(`\n📊 Total articles: ${drafts.length}`);

      // Status breakdown
      const statusCounts = drafts.reduce((acc: any, draft) => {
        acc[draft.status] = (acc[draft.status] || 0) + 1;
        return acc;
      }, {});

      console.log('\n📈 Status Breakdown:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`    ${status}: ${count}`);
      });
    }

    console.log('\n' + '='.repeat(80) + '\n');
    process.exit(0);
  } catch (error) {
    console.error('Error fetching drafts:', error);
    process.exit(1);
  }
}

showDrafts();

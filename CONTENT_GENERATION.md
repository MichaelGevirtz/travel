# Content Generation System

## Overview

This project includes an AI-powered content generation system that automatically creates, reviews, and iterates on travel articles for the Vietnam travel website.

## Architecture

The system consists of three main components:

### 1. **Writer Agent**
- Generates comprehensive travel articles (2,500-3,200 words)
- Follows strict content structure (9 required H2 sections)
- Includes practical information (prices, timeframes, specific recommendations)
- Adds internal links to other articles
- Suggests images and flags facts that need verification

**Location:** `.claude/agents/writer-agent.md` (prompt) + `lib/services/agents/writerAgent.ts` (service)

### 2. **Editor Agent**
- Reviews articles for quality, structure, and completeness
- Checks for banned phrases (travel writing clichés)
- Validates word count, internal links, SEO elements
- Provides actionable feedback with specific locations
- Approves or rejects with detailed reasoning

**Location:** `.claude/agents/editor-agent.md` (prompt) + `lib/services/agents/editorAgent.ts` (service)

### 3. **Content Orchestrator**
- Coordinates the Writer-Editor loop
- Allows up to 3 iterations for revisions
- If rejected 3 times, saves as draft for manual review
- If approved, saves as draft pending manual publication
- Tracks edit history and agent metrics

**Location:** `lib/services/agents/contentOrchestrator.ts`

## Workflow

```
1. User requests article generation (topic + optional filters)
   ↓
2. Writer Agent generates initial article
   ↓
3. Editor Agent reviews article
   ↓
4. Decision:
   - APPROVED → Save as draft (manual publish)
   - REJECTED → Writer revises based on feedback
                ↓
                Back to step 2 (max 3 iterations)
   ↓
5. After 3 rejections → Save as draft for human review
```

## Usage

### Prerequisites

1. Set up environment variable:
```bash
# Add to .env.local
ANTHROPIC_API_KEY=your_api_key_here
```

2. Ensure MongoDB is connected:
```bash
MONGODB_URI=your_mongodb_connection_string
```

### Generate an Article

#### Via API (Recommended)

```bash
curl -X POST http://localhost:3000/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Complete guide to visiting Hanoi",
    "destinationType": "city",
    "region": "north"
  }'
```

**Request Body:**
```typescript
{
  topic: string;              // Required: Article topic
  destinationType?: string;   // Optional: "city" | "region" | "beach" | "mountain"
  region?: string;            // Optional: "north" | "central" | "south"
}
```

**Response:**
```json
{
  "success": true,
  "status": "approved" | "draft",
  "message": "Article approved after 2 iteration(s) and saved as draft",
  "page": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "slug": "hanoi-travel-guide",
    "title": "Complete Guide to Visiting Hanoi",
    "status": "draft",
    "wordCount": 2847,
    "iterations": 2,
    "finalScore": 87
  },
  "editHistory": [...],
  "imageSuggestions": [...],
  "factsToVerify": [...]
}
```

#### Via Admin UI

1. Navigate to `/admin/content`
2. Click "Generate New Article" button
3. Fill in the form with topic and filters
4. Wait for generation to complete (2-5 minutes)
5. Review the generated article
6. Approve, reject, or publish

### Review and Approve Articles

1. Go to `/admin/content`
2. See list of pending articles
3. Click "Review" to see full content
4. Check:
   - Content quality and accuracy
   - Facts to verify list
   - Agent score and iterations
   - Word count and structure
5. Actions:
   - **Publish**: Make article live immediately
   - **Approve**: Keep as draft for later publishing
   - **Reject**: Archive the article

### List Articles

```bash
# Get all agent-generated articles
GET /api/content/list?generatedBy=agent

# Filter by status
GET /api/content/list?status=draft&generatedBy=agent

# Pagination
GET /api/content/list?limit=20&offset=40
```

## Content Standards

### Required Structure

Every article must have these 9 H2 sections:

1. **Introduction** (150-200 words)
2. **Quick Facts** (bullet list)
3. **Why Visit [Destination]** (300-400 words)
4. **Top Attractions** (400-500 words)
5. **Where to Stay** (300-400 words)
6. **Food and Dining** (300-400 words)
7. **Getting Around** (250-300 words)
8. **Budget Guide** (300-400 words)
9. **Practical Tips** (300-400 words)

### Quality Requirements

- **Word Count:** 2,500-3,200 words (min 2,300, max 3,400)
- **Internal Links:** 5-10 links to other articles
- **Voice:** Casual, conversational, simple English
- **Specificity:** Exact prices (USD), timeframes, distances
- **No banned phrases:** "hidden gem", "breathtaking", "must-see", etc.
- **SEO:** Proper meta title (50-60 chars), meta description (150-160 chars)
- **Images:** 8-12 suggestions with placement and alt text
- **Facts:** 5-10 verifiable claims flagged for fact-checking

## Database Schema

Agent-generated articles are stored in the `pages` collection with additional fields:

```typescript
{
  // Standard page fields
  slug: string;
  title: string;
  content: string;
  status: "draft" | "published" | "archived";

  // Agent workflow tracking (optional)
  agentWorkflow?: {
    generatedBy: "agent" | "manual";
    agentIterations: number;           // How many writer-editor loops
    agentFinalScore: number;           // Editor's final score (0-100)
    agentEditHistory: Array<{
      iteration: number;
      editorDecision: "approve" | "reject";
      editorScore: number;
      editorSummary: string;
      issues: Array<EditorIssue>;
      requiredChanges: string[];
      timestamp: Date;
    }>;
    factsToVerify: Array<{
      claim: string;
      location: string;
      priority: "high" | "medium" | "low";
      verified: boolean;
      verifiedAt?: Date;
      verifiedBy?: string;
    }>;
    generatedAt: Date;
  }
}
```

## API Routes

### POST `/api/content/generate`
Generate a new article using the Writer-Editor system.

**Duration:** 2-5 minutes (max 5 minutes)

**Request:**
```json
{
  "topic": "Complete guide to Phu Quoc island",
  "destinationType": "beach",
  "region": "south"
}
```

**Response:** See "Generate an Article" section above.

---

### POST `/api/content/approve`
Approve, reject, or publish an article.

**Request:**
```json
{
  "pageId": "65f1a2b3c4d5e6f7g8h9i0j1",
  "action": "approve" | "reject" | "publish",
  "notes": "Optional admin notes"
}
```

**Response:**
```json
{
  "success": true,
  "action": "publish",
  "message": "Article published successfully!",
  "page": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "slug": "phu-quoc-travel-guide",
    "title": "Complete Guide to Phu Quoc Island",
    "status": "published",
    "publishedAt": "2025-01-22T10:30:00Z"
  }
}
```

---

### GET `/api/content/approve?id={pageId}`
Retrieve a specific article for review.

**Response:**
```json
{
  "success": true,
  "page": { /* Full page object */ }
}
```

---

### GET `/api/content/list`
List articles with optional filters.

**Query Parameters:**
- `status`: Filter by status (draft/published/archived)
- `generatedBy`: Filter by source (agent/manual)
- `limit`: Number of results (default: 50)
- `offset`: Skip N results (default: 0)

**Response:**
```json
{
  "success": true,
  "articles": [ /* Array of page objects */ ],
  "pagination": {
    "total": 42,
    "limit": 50,
    "offset": 0,
    "hasMore": false
  }
}
```

## Monitoring and Analytics

Each article tracks:

1. **Agent Performance**
   - Number of iterations needed
   - Final editor score
   - Edit history with issues found

2. **Content Metrics**
   - Word count
   - Reading time (calculated)
   - Internal link count
   - Image count

3. **Fact Verification**
   - List of claims needing verification
   - Verification status and timestamp
   - Verifier name

4. **Standard Analytics** (once published)
   - Page views
   - Bounce rate
   - Time on page
   - Affiliate link performance

## Configuration

### Writer Agent Customization

Edit `.claude/agents/writer-agent.md` to customize:

- Voice and tone guidelines
- Content structure requirements
- Banned phrases list
- SEO requirements
- Output format

### Editor Agent Customization

Edit `.claude/agents/editor-agent.md` to customize:

- Review criteria
- Scoring thresholds
- Decision rules (approve vs. reject)
- Feedback format

### Orchestrator Settings

Edit `lib/services/agents/contentOrchestrator.ts` to adjust:

- `MAX_ITERATIONS` (default: 3)
- Model selection (default: claude-sonnet-4-5-20250929)
- Temperature settings
- Max tokens
- Timeout duration

## Troubleshooting

### Generation Takes Too Long

- Check API route has `maxDuration = 300` (5 minutes)
- Verify Anthropic API is responding
- Check orchestrator logs in browser console

### Articles Always Rejected

- Review editor standards in `.claude/agents/editor-agent.md`
- Check if banned phrases list is too strict
- Verify word count targets are reasonable
- Review edit history to see common issues

### Database Errors

- Ensure MongoDB is connected
- Check MONGODB_URI in .env.local
- Verify Page model schema is up to date
- Check for validation errors in logs

### Missing Internal Links

- Ensure there are published articles in database
- Check that articles have proper slug/title/region fields
- Verify writer agent is receiving availableArticles list

## Best Practices

1. **Review All Articles**: Even if approved by editor, always do a manual review before publishing

2. **Verify Facts**: Check all items in `factsToVerify` list before publishing

3. **Monitor Performance**: Track how many iterations articles typically need

4. **Update Prompts**: Refine agent prompts based on common issues

5. **Add Images**: The agent suggests images but doesn't create them - add real images before publishing

6. **Test Internal Links**: Verify all internal links work before publishing

7. **SEO Check**: Validate meta title, description, and keywords

8. **Budget Updates**: Prices change - review budget sections quarterly

## Future Enhancements

Potential improvements to consider:

- [ ] Image generation integration
- [ ] Automated fact verification via web search
- [ ] SEO score calculation
- [ ] Readability analysis
- [ ] Automatic affiliate link insertion
- [ ] Multi-language support
- [ ] Scheduled publishing
- [ ] A/B testing different introductions
- [ ] Automatic social media post generation
- [ ] Email notification when articles are ready

## Support

For issues or questions:

1. Check the logs in browser console and server logs
2. Review the agent prompts in `.claude/agents/`
3. Test the API endpoints directly with curl
4. Check MongoDB for data consistency

## License

This content generation system is part of the Vietnam Travel project.

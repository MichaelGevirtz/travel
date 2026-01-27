# Content Agent Orchestration System

This document describes the multi-agent system used to generate, review, and validate travel articles for the Vietnam Travel website.

## Overview

The content generation pipeline uses a **three-agent architecture** that mimics a professional editorial workflow:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CONTENT ORCHESTRATOR                             │
│                 (lib/services/agents/contentOrchestrator.ts)        │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐     │
│   │              │    │              │    │                  │     │
│   │   WRITER     │───▶│   EDITOR     │───▶│  SEO VALIDATOR   │     │
│   │   AGENT      │    │   AGENT      │    │     AGENT        │     │
│   │              │    │              │    │                  │     │
│   └──────────────┘    └──────────────┘    └──────────────────┘     │
│          │                   │                    │                 │
│          │                   │                    │                 │
│          │            ┌──────┴──────┐      ┌──────┴──────┐         │
│          │            │             │      │             │         │
│          │            ▼             ▼      ▼             ▼         │
│          │       APPROVE       REJECT   PASS         FAIL          │
│          │            │             │      │             │         │
│          │            └─────┬───────┘      └─────┬───────┘         │
│          │                  │                    │                 │
│          │                  ▼                    ▼                 │
│          │         ┌────────────────────────────────┐              │
│          │         │   DECISION LOGIC              │              │
│          │         │   • Both PASS → APPROVED      │              │
│          │         │   • Any FAIL → REVISE         │              │
│          │         │   • Max 3 iterations → DRAFT  │              │
│          │         └────────────────────────────────┘              │
│          │                        │                                │
│          ◀────────────────────────┘                                │
│       (Feedback loop for revisions)                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Agent Descriptions

### 1. Writer Agent

**Location:** `.claude/agents/writer-agent.md`

**Purpose:** Generates high-quality travel content following SEO best practices and design system guidelines.

**Key Responsibilities:**
- Creates comprehensive travel guides (1,500-5,000 words)
- Follows a strict 9-section H2 structure
- Applies UX/design system principles for scannability
- Includes SEO-optimized meta tags, keywords, and internal links
- Generates image suggestions and facts to verify
- Uses casual, conversational tone (no travel clichés)

**Required Article Structure:**
1. Introduction (150-200 words)
2. Quick Facts (bullet list)
3. Why Visit [Destination] (300-400 words)
4. Top Attractions (400-500 words)
5. Where to Stay (300-400 words)
6. Food and Dining (300-400 words)
7. Getting Around (250-300 words)
8. Budget Guide (300-400 words)
9. Practical Tips (300-400 words)

**Output Schema:**
```typescript
interface WriterOutput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;           // Markdown format
  metaTitle: string;         // 50-60 chars
  metaDescription: string;   // 150-160 chars
  keywords: string[];        // 10-15 keywords
  canonicalUrl: string;
  ogImage: string;
  author: string;
  destinationType: "city" | "region" | "beach" | "mountain";
  region: "north" | "central" | "south";
  geo: {
    coordinates: { latitude: number; longitude: number };
    nearestAirport: { name: string; code: string; distance: string };
    nearbyDestinations: Array<{...}>;
  };
  contentMeta: {
    wordCount: number;
    readingTime: number;
    internalLinks: string[];
  };
  imageSuggestions: Array<{...}>;
  factsToVerify: Array<{...}>;
}
```

### 2. Editor Agent

**Location:** `.claude/agents/editor-agent.md`

**Purpose:** Reviews articles against quality standards and decides whether to approve or reject.

**Key Responsibilities:**
- Validates all 9 required H2 sections are present
- Checks word count (1,400-5,200 range)
- Scans for banned phrases (travel clichés)
- Validates internal linking (minimum 4 links)
- Reviews voice, tone, and content quality
- Checks UX/design system compliance
- Provides actionable feedback for revisions

**Decision Criteria:**

| Criteria | Approve | Reject |
|----------|---------|--------|
| Structure | All 9 sections present | Missing sections |
| Word Count | 1,400-5,200 words | Outside range |
| Banned Phrases | < 3 instances | 3+ instances |
| Internal Links | 4+ links | Fewer than 4 |
| SEO Elements | Valid lengths | Invalid |
| Image Suggestions | 6+ suggestions | Fewer than 6 |

**Output Schema:**
```typescript
interface EditorOutput {
  decision: "approve" | "reject";
  overallScore: number;        // 0-100
  summary: string;
  strengths: string[];
  issues: Array<{
    category: string;
    severity: "critical" | "major" | "minor";
    description: string;
    location: string;
    suggestion: string;
  }>;
  requiredChanges: string[];
  recommendations: string[];
}
```

### 3. SEO Validator Agent

**Location:** `.claude/agents/seo-validator-agent.md`

**Purpose:** Validates articles against SEO best practices before publishing.

**Key Responsibilities:**
- Validates meta title (50-60 chars) and description (150-160 chars)
- Checks heading structure (single H1, proper hierarchy)
- Validates keyword usage and placement
- Verifies internal linking requirements
- Checks geographic SEO data
- Recommends appropriate schema markup
- Calculates SEO score with detailed breakdown

**Score Calculation:**

| Category | Weight | Max Points |
|----------|--------|------------|
| Title & Meta | 20% | 20 |
| Content Quality | 30% | 30 |
| Structure | 20% | 20 |
| Links | 15% | 15 |
| Technical | 15% | 15 |

**Score Thresholds:**

| Score | Grade | Status |
|-------|-------|--------|
| 90-100 | A | Pass - Excellent |
| 80-89 | B+ | Pass - Very Good |
| 70-79 | B | Pass - Good |
| 60-69 | C+ | Pass - Acceptable |
| 50-59 | C | Fail - Needs improvement |
| Below 50 | D/F | Fail - Significant revision |

**Passing Score:** 60+

## Orchestration Flow

**Location:** `lib/services/agents/contentOrchestrator.ts`

### Flow Steps

1. **Initialize** - Prepare writer input with topic, destination type, region, and available articles for internal linking

2. **Generate Article** (Writer Agent)
   - First iteration: Generate initial article
   - Subsequent iterations: Generate revision based on feedback

3. **Review Article** (Editor Agent)
   - Evaluate against quality standards
   - Return approve/reject with score and feedback

4. **Validate SEO** (SEO Validator Agent)
   - Check SEO compliance
   - Return pass/fail with score and issues

5. **Decision Logic**
   - **APPROVED**: Editor approves AND SEO passes → Save as "published"
   - **NEEDS REVISION**: Either agent rejects → Loop back to step 2
   - **MAX ITERATIONS**: After 3 attempts → Save as "draft"

### Iteration Limits

- **Maximum Iterations:** 3
- Articles that don't pass after 3 iterations are saved as "draft" for manual review

### Feedback Loop

When an article is rejected, the orchestrator:
1. Collects editor feedback (issues, required changes)
2. Collects SEO feedback (issues, recommendations)
3. Passes combined feedback to Writer Agent
4. Writer generates revised article addressing all issues
5. Process repeats until approved or max iterations reached

## Running the Batch Generation Script

**Location:** `scripts/generate-all-articles.ts`

### Usage

```bash
npx ts-node scripts/generate-all-articles.ts
```

### What It Does

1. Connects to MongoDB database
2. Loads all destinations from `lib/constants/destinations.ts`
3. Skips destinations that already have articles
4. For each remaining destination:
   - Calls the content orchestrator
   - Saves approved articles as "published"
   - Saves draft articles as "draft"
   - Saves markdown backup to `scripts/generated-articles/`
5. Outputs summary with scores and iteration counts

### Configuration

```typescript
// Skip specific destinations
const SKIP_DESTINATIONS = ["hanoi"];

// Rate limiting delay between articles
await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds
```

### Output Files

- **Database:** Articles saved to MongoDB `pages` collection
- **Markdown:** `scripts/generated-articles/{slug}.md`
- **Results:** `scripts/generation-results.json`

## Database Schema

Articles are stored with complete workflow metadata:

```typescript
interface PageDocument {
  // Core content
  slug: string;
  title: string;
  content: string;
  excerpt: string;

  // SEO fields
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;

  // Classification
  destinationType: "city" | "region" | "beach" | "mountain";
  region: "north" | "central" | "south";
  status: "published" | "draft";

  // Geographic data
  geo: {
    coordinates: { latitude: number; longitude: number };
    nearestAirport: { name: string; code: string; distance: string };
    distanceFromHanoi: string;
    distanceFromHCMC: string;
    nearbyDestinations: Array<{...}>;
  };

  // Agent workflow tracking
  agentWorkflow: {
    generatedBy: "agent" | "human";
    agentIterations: number;
    agentFinalScore: number;
    agentEditHistory: Array<{
      iteration: number;
      editorDecision: "approve" | "reject";
      editorScore: number;
      editorSummary: string;
      issues: Array<{...}>;
      requiredChanges: string[];
      timestamp: Date;
    }>;
    factsToVerify: Array<{
      claim: string;
      location: string;
      priority: string;
      verified: boolean;
    }>;
    generatedAt: Date;
  };
}
```

## Knowledge Base

The agents reference knowledge files for consistent behavior:

**SEO Knowledge:**
- `.claude/knowledge/seo-fundamentals.md` - Core SEO principles
- `.claude/knowledge/seo-article-checklist.md` - Validation checklist
- `.claude/knowledge/seo-travel-keywords.md` - Keyword strategies
- `.claude/knowledge/seo-geo-optimization.md` - Geographic SEO
- `.claude/knowledge/seo-schema-markup.md` - Structured data

**Design System:**
- References principles from `.claude/design-system/` for UX compliance

## Monitoring and Debugging

### Console Output

The orchestrator provides detailed logging:

```
🤖 Starting content generation for: "Hanoi Travel Guide"
🤖 Destination Type: city
🤖 Region: north

=== Iteration 1/3 ===
Writer: Generating initial article...
✓ Article generated: 2847 words, 7 internal links
Editor: Reviewing article...
SEO Validator: Validating article SEO...
✓ Editor review complete: APPROVE (score: 92/100)
✓ SEO validation complete: PASSED (score: 88/100)

✅ Article APPROVED on iteration 1
```

### Edit History

Every article tracks its revision history:

```json
{
  "agentEditHistory": [
    {
      "iteration": 1,
      "editorDecision": "reject",
      "editorScore": 65,
      "editorSummary": "Missing required sections",
      "issues": [...],
      "requiredChanges": [...]
    },
    {
      "iteration": 2,
      "editorDecision": "approve",
      "editorScore": 88,
      "editorSummary": "Article meets quality standards"
    }
  ]
}
```

## Adding New Agents

To add a new agent to the pipeline:

1. Create agent prompt: `.claude/agents/{agent-name}-agent.md`
2. Create agent service: `lib/services/agents/{agentName}Agent.ts`
3. Define input/output interfaces
4. Integrate into `contentOrchestrator.ts`
5. Update decision logic as needed

## Best Practices

1. **Always run full pipeline** - Don't skip agents for quality assurance
2. **Review drafts manually** - Articles saved as draft need human attention
3. **Monitor iteration counts** - High iterations may indicate agent prompt issues
4. **Verify facts** - Use `factsToVerify` list for human fact-checking
5. **Track SEO scores** - Monitor trends to identify systematic issues

## Troubleshooting

### Common Issues

**Article stuck in revision loop:**
- Check if editor feedback is actionable
- Review banned phrases list
- Verify word count requirements

**Low SEO scores:**
- Check meta title/description lengths
- Verify keyword placement
- Ensure internal links are present

**JSON parsing errors:**
- The orchestrator strips markdown code blocks
- Check for malformed JSON in agent responses
- Review API response stop reasons

### Debug Mode

For detailed debugging, the orchestrator logs:
- Token usage (input/output)
- Stop reasons
- Response character counts
- Parse success/failure

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

This project uses **Vitest** and **React Testing Library** for comprehensive test coverage.

### Quick Start

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run only unit tests
npm run test:unit

# Run only component tests
npm run test:component
```

### Test Structure

- **Unit Tests**: `tests/unit/` - Testing utilities, helpers, and business logic
- **Component Tests**: `tests/component/` - Testing React components
- **Coverage Goals**: 80% statements, 75% branches, 80% functions

### Automated Test Generation

Use the test agent to automatically generate tests:

```
"Generate tests for components/home/Hero.tsx"
"Generate tests for lib/utils/format.ts"
```

📖 **For detailed testing documentation, see [TESTING_GUIDE.md](./TESTING_GUIDE.md)**

## AI Content Generation

This project uses an **AI agent orchestration system** to generate high-quality travel articles with built-in quality control.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CONTENT GENERATION FLOW                       │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────┐         ┌──────────────┐         ┌──────────────┐
    │  User    │         │   Writer     │         │   Editor     │
    │  Input   │────────▶│   Agent      │────────▶│   Agent      │
    │          │         │              │         │              │
    └──────────┘         └──────────────┘         └──────────────┘
         │                      │                        │
         │                      │                        ▼
         │                      │               ┌──────────────┐
         │                      │               │   Decision   │
         │                      │               │              │
         │                      │               │ ┌──────────┐ │
         │                      │               │ │ APPROVE  │ │
         │                      │               │ └────┬─────┘ │
         │                      │               │      │       │
         │                      │               │ ┌────▼─────┐ │
         │                      │               │ │ REJECT   │ │
         │                      │               │ └──────────┘ │
         │                      │               └──────────────┘
         │                      │                        │
         │                      │◀───────────────────────┘
         │                      │     (feedback loop)
         │                      │
         │                      ▼
         │              ┌──────────────┐
         │              │   MongoDB    │
         │              │   Storage    │
         └─────────────▶│              │
                        └──────────────┘
```

### Agent Roles

#### Writer Agent
Generates travel articles following strict content guidelines:
- **9 required H2 sections** (Introduction, Quick Facts, Why Visit, Top Attractions, etc.)
- **UX-compliant formatting** (2-4 sentence paragraphs, H3 subheadings every 200-300 words)
- **No banned phrases** (avoids clichés like "hidden gem", "breathtaking")
- **Specific data** (prices with years, exact distances, practical tips)

#### Editor Agent
Reviews articles and decides whether to approve or reject:
- **Validates structure** (all 9 sections present and correctly ordered)
- **Checks word count** (1,400-5,200 words)
- **Scans for banned phrases**
- **Verifies UX compliance** (scannability, bold usage, list lengths)
- **Returns score 0-100** with detailed feedback

### Decision Flow

```
                    ┌─────────────────┐
                    │  Editor Review  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  All criteria   │
                    │     met?        │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
       ┌──────▼──────┐               ┌──────▼──────┐
       │    YES      │               │     NO      │
       │   APPROVE   │               │   REJECT    │
       │  Score: 80+ │               │  Score: <80 │
       └──────┬──────┘               └──────┬──────┘
              │                             │
              ▼                             ▼
       ┌─────────────┐               ┌─────────────┐
       │  Publish    │               │  Return     │
       │  Article    │               │  Feedback   │
       └─────────────┘               └──────┬──────┘
                                            │
                                            ▼
                                     ┌─────────────┐
                                     │  Writer     │
                                     │  Revises    │
                                     └──────┬──────┘
                                            │
                                            └──────▶ (retry)
```

### Agent Configuration Files

| File | Purpose |
|------|---------|
| [`.claude/agents/writer-agent.md`](.claude/agents/writer-agent.md) | Writer agent instructions and content guidelines |
| [`.claude/agents/editor-agent.md`](.claude/agents/editor-agent.md) | Editor agent review criteria and scoring |

### UX Design System Knowledge Base

The agents follow a comprehensive UX design system based on industry best practices:

| Document | Key Principles |
|----------|----------------|
| [Don't Make Me Think](.claude/design-system/don_make_me_think.md) | Scannability, short paragraphs, clear hierarchy |
| [Refactoring UI](.claude/design-system/refactoring_ui_travel_sites.md) | Visual emphasis, spacing, typography |
| [Laws of UX](.claude/design-system/laws_of_ux_travel_affiliate_guide.md) | Miller's Law (5-7 items), Serial Position Effect |
| [Conversion Optimization](.claude/design-system/conversion_optimization_travel_affiliate.md) | Trust signals, CTAs, ethical practices |
| [Travel Site Patterns](.claude/design-system/travel_site_patterns.md) | Best practices from top travel sites |
| [LLM Discovery](.claude/design-system/llm_discovery_travel_sites.md) | SEO for AI/LLM discoverability |

📖 **Full knowledge base:** [`.claude/design-system/`](.claude/design-system/)

### Content Quality Rules

**Paragraph Length:**
- Maximum 2-4 sentences per paragraph
- No dense text blocks

**Subheadings:**
- H3 every 200-300 words
- Descriptive, not vague

**Data Specificity:**
- Include year: "As of 2025, daily costs average $30-50"
- Exact prices, distances, timeframes

**Lists:**
- Maximum 5-7 items (Miller's Law)
- Categorize longer lists

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

### Production
- **URL**: https://vietnam-insider.com
- **Platform**: Vercel
- **Auto-deploy**: Pushes to `master` branch trigger automatic deployments

### Environment Variables (Vercel)
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NEXT_PUBLIC_SITE_URL` | `https://vietnam-insider.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID |
| `REVALIDATION_SECRET` | Secret for on-demand revalidation |

### Infrastructure Setup
1. **Vercel**: Connected to `MichaelGevirtz/travel` GitHub repo
2. **MongoDB Atlas**: Network access set to `0.0.0.0/0` (required for Vercel's dynamic IPs)
3. **Cloudflare**: DNS with A record pointing to `216.198.79.1`, SSL mode "Full"

### Deployment Workflow
```bash
git add .
git commit -m "Your changes"
git push origin master
# Vercel automatically builds and deploys
```

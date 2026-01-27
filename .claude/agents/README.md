# Claude Agents

This folder contains prompt definitions for the AI agents used in the Vietnam Travel content pipeline.

## Content Generation Agents

These agents work together to create, review, and validate travel articles:

| Agent | File | Purpose |
|-------|------|---------|
| **Writer** | [writer-agent.md](writer-agent.md) | Generates comprehensive travel guides |
| **Editor** | [editor-agent.md](editor-agent.md) | Reviews articles for quality and compliance |
| **SEO Validator** | [seo-validator-agent.md](seo-validator-agent.md) | Validates SEO best practices |

### How They Work Together

```
Writer Agent → Editor Agent → SEO Validator Agent
     │              │                │
     │              │                │
     ▼              ▼                ▼
  Generate      Approve/         Pass/Fail
  Content       Reject           SEO Check
     │              │                │
     └──────────────┴────────────────┘
                    │
                    ▼
            Feedback Loop
         (max 3 iterations)
```

**Full Documentation:** See [Agent Orchestration Documentation](../docs/agent-orchestration.md)

## Testing Agent

| Agent | File | Purpose |
|-------|------|---------|
| **Test Generator** | [test-agent.md](test-agent.md) | Generates comprehensive test suites |

## Running Content Generation

### Batch Generation

```bash
npx ts-node scripts/generate-all-articles.ts
```

## Agent Services

```
lib/services/agents/
├── writerAgent.ts         # Writer agent service
├── editorAgent.ts         # Editor agent service
├── seoValidatorAgent.ts   # SEO validator service
└── contentOrchestrator.ts # Pipeline orchestrator
```

## Related Documentation

- [Agent Orchestration](../docs/agent-orchestration.md) - Complete orchestration documentation
- [Testing Knowledge Base](../knowledge/README.md) - Testing documentation

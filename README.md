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

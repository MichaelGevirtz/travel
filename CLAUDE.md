# Project Guidelines for Claude Code

## Link Validation Rules

When adding or modifying links in this project, follow these rules to prevent broken links:

### Adding a New Route
- Add static routes to `staticRoutes` array in `lib/constants/routes.ts`
- For dynamic routes, ensure the pattern is covered in `dynamicRoutePatterns`

### Adding a New Guide
- Add the slug to `guideSlugs` array in `lib/constants/routes.ts`
- Add the guide page to `app/vietnam/guides/[slug]/` or as a static page

### Adding a New Destination
- Add the destination object to `allDestinations` in `lib/constants/destinations.ts`
- Include all required fields: slug, name, description, image, imageAlt, region, type, highlights

### Adding a New Itinerary
- Add the slug to `itinerarySlugs` array in `lib/constants/routes.ts`

### Adding Components with Links
- Add test coverage in `tests/integration/broken-links.test.ts` for any new component that contains links
- Import the link data and validate against `isValidRoute()` and `hasActualContent()`

### Before Committing
- Run `npm test` to verify all link validation tests pass
- Any broken link will cause test failures

## Project Structure

- Route registry: `lib/constants/routes.ts`
- Destinations data: `lib/constants/destinations.ts`
- Navigation links: `lib/constants/navigation.ts`
- Link validation tests: `tests/unit/link-validation.test.ts`
- Integration link tests: `tests/integration/broken-links.test.ts`

## Data Fetching & Caching

Use `force-cache` for content that rarely changes and refreshes on deploy:

### Cache Options
| Option | Use When | Example |
|--------|----------|---------|
| `force-cache` | Content changes only on deploy | Destinations, guides, itineraries |
| `no-store` | Real-time data needed | User-specific content, live prices |
| `revalidate: N` | Content updates periodically | Blog posts (revalidate: 3600) |

### Current Implementation
- Destination articles: `force-cache` in `app/vietnam/destinations/[slug]/page.tsx:76`
- Cache clears automatically on each deployment

## Deployment

### Auto-Deploy Pipeline
- Production deploys automatically when pushing to `master` branch
- Vercel builds and deploys the site at https://vietnam-insider.com
- Cache clears on each deployment

### Adding Environment Variables
- Add to Vercel Dashboard → Settings → Environment Variables
- For local development, add to `.env.local`
- Never commit secrets to the repository

### After Deployment Changes
- Verify the site loads at https://vietnam-insider.com
- Check MongoDB connection by visiting `/api/destinations`
- Monitor Vercel deployment logs for errors

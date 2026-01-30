# Analytics (GA4) Documentation

## Overview

This project uses Google Analytics 4 (gtag.js) for tracking. The implementation is in:
- `components/GoogleAnalytics.tsx` - Loads gtag.js
- `components/AnalyticsEvents.tsx` - Custom event tracking

## Custom Events

| Event | Trigger | Payload |
|-------|---------|---------|
| `scroll_75` | User scrolls ≥75% of page (once per page) | `page_path` |
| `cta_click` | Click on `data-cta="primary"` element | `cta_text`, `page_path` |
| `outbound_click` | Click on external link (not mailto/tel) | `link_url`, `page_path` |

## CTA Click Tracking

### When to Add `data-cta="primary"`

**ADD to conversion-intent buttons:**
- Hero CTAs ("Explore Destinations", "Plan Your Trip")
- Newsletter subscribe button
- Booking/affiliate buttons
- "Get Started", "Book Now", "Sign Up" buttons
- Any click that signals user intent toward a business goal

**DO NOT add to:**
- Navigation menu links
- "Read more" / "See all" links
- Pagination, filters, sort controls
- Modal close/cancel buttons
- Back buttons, breadcrumbs
- Social share buttons

### Rule of Thumb
> If the click answers "Is this user interested in converting?" → add `data-cta="primary"`

### Implementation

```tsx
// Correct - conversion intent
<Link href="/vietnam/itineraries" data-cta="primary">
  Plan Your Trip
</Link>

<Button data-cta="primary" onClick={handleSubscribe}>
  Subscribe
</Button>

// Incorrect - not conversion intent
<Link href="/vietnam/destinations" data-cta="primary">  // ❌ nav link
  Destinations
</Link>
```

### Currently Tagged CTAs

| Component | CTA Text | File |
|-----------|----------|------|
| Hero | "Explore Destinations" | `components/home/Hero.tsx` |
| Hero | "View Sample Itineraries" | `components/home/Hero.tsx` |
| Newsletter | "Subscribe" | `components/common/Newsletter.tsx` |
| Navigation | "Plan Your Trip" (desktop) | `components/layout/Navigation.tsx` |
| Navigation | "Plan Your Trip" (mobile) | `components/layout/Navigation.tsx` |

## Verification

### GA4 Realtime
1. Open GA4 → Reports → Realtime
2. Open your site in another tab
3. Perform actions and watch events appear

### Debug Mode
Add `?debug=1` to URL or use [GA Debugger Chrome extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)

## Adding New Events

If you need to add a new custom event:

1. Add the event handler in `components/AnalyticsEvents.tsx`
2. Follow existing patterns (useEffect, cleanup, guard against undefined gtag)
3. Document the event in this file
4. Test in GA4 Realtime before deploying

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (e.g., `G-XXXXXXXXXX`) |

Default fallback: `G-5S4QMG046G`

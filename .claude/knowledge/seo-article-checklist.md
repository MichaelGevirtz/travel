# SEO Article Checklist

> Use this checklist to validate articles before publishing. Every item marked as **Required** must pass.

## Title Tag

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Length: 50-60 characters | |
| **Required** | Contains primary keyword | |
| **Required** | Keyword appears in first half of title | |
| **Required** | Unique (not used by other pages) | |
| Recommended | Includes destination name | |
| Recommended | Compelling for clicks (not just keyword-stuffed) | |

**Good Examples:**
- "Hanoi Travel Guide 2025: Where to Stay, Eat & Explore" (54 chars)
- "Best Time to Visit Vietnam: Month-by-Month Weather Guide" (56 chars)
- "Phu Quoc Island: Beaches, Food & Budget Tips for 2025" (53 chars)

**Bad Examples:**
- "Vietnam" (too short, no value)
- "The Ultimate Complete Comprehensive Guide to Visiting Hanoi Vietnam" (too long, keyword-stuffed)
- "Page 1" (meaningless)

---

## Meta Description

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Length: 150-160 characters | |
| **Required** | Contains primary keyword naturally | |
| **Required** | Includes call-to-action or value proposition | |
| **Required** | Unique (not used by other pages) | |
| Recommended | Includes secondary keyword | |
| Recommended | Creates curiosity or urgency | |

**Good Examples:**
- "Planning a trip to Hanoi? Our 2025 guide covers the best neighborhoods, street food spots, and budget tips. Plus insider advice on avoiding tourist traps." (156 chars)
- "Discover the best time to visit Vietnam with our month-by-month breakdown. Weather, crowds, prices, and festivals - everything you need to plan your trip." (156 chars)

**Bad Examples:**
- "Click here to learn about Hanoi." (too short, weak CTA)
- "Hanoi Vietnam travel guide best things to do in Hanoi where to stay in Hanoi" (keyword stuffing)

---

## Heading Structure

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Single H1 tag on page | |
| **Required** | H1 contains primary keyword | |
| **Required** | H1 matches/similar to title tag | |
| **Required** | Logical hierarchy (H1 → H2 → H3) | |
| **Required** | No skipped heading levels | |
| **Required** | 3-7 H2 sections per article | |
| Recommended | H2s contain secondary keywords | |
| Recommended | H3s every 200-300 words within H2 sections | |

**Correct Hierarchy:**
```
H1: Hanoi Travel Guide 2025
  H2: Quick Facts
  H2: Why Visit Hanoi
    H3: Best for First-Time Visitors
    H3: Best for Food Lovers
  H2: Top Attractions
    H3: Hoan Kiem Lake
    H3: Temple of Literature
```

**Incorrect (skipped level):**
```
H1: Hanoi Travel Guide
  H3: Quick Facts    ← Wrong! Skipped H2
```

---

## Content Quality

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Primary keyword in first 100 words | |
| **Required** | Word count: 1,500+ for guides, 800+ for blog posts | |
| **Required** | Original content (not copied/scraped) | |
| **Required** | Factually accurate information | |
| **Required** | Prices include year: "As of 2025..." | |
| **Required** | No banned phrases (hidden gem, breathtaking, etc.) | |
| Recommended | Keyword density 1-2% (natural usage) | |
| Recommended | Uses synonyms and related terms | |
| Recommended | Readability: Grade 8 or lower (Flesch-Kincaid) | |
| Recommended | Short paragraphs (2-4 sentences max) | |

---

## Internal Linking

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Minimum 3 internal links per article | |
| **Required** | Descriptive anchor text (not "click here") | |
| **Required** | Links to related, relevant content | |
| Recommended | 5-10 internal links for long-form guides | |
| Recommended | Links to both same-region and different-type destinations | |
| Recommended | Links placed contextually (not forced) | |

**Good Anchor Text:**
- "check out our [Hoi An travel guide](/vietnam/destinations/hoi-an)"
- "read more about [Vietnamese street food](/vietnam/blog/street-food-guide)"

**Bad Anchor Text:**
- "[click here](/vietnam/destinations/hoi-an) to learn more"
- "for more info, [see this page](/vietnam/blog/street-food-guide)"

---

## Images

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | All images have alt text | |
| **Required** | Alt text is descriptive (60-80 chars) | |
| **Required** | Hero image present | |
| Recommended | Alt text includes keyword where natural | |
| Recommended | 8-12 images for long-form guides | |
| Recommended | Images optimized for web (WebP format, compressed) | |
| Recommended | Lazy loading enabled for below-fold images | |

**Good Alt Text:**
- "Street food vendor selling banh mi in Hanoi Old Quarter"
- "Sunset view over Ha Long Bay with limestone karsts"

**Bad Alt Text:**
- "image1.jpg"
- "photo"
- "hanoi vietnam travel hanoi street food hanoi" (keyword stuffing)

---

## URL Structure

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Lowercase only | |
| **Required** | Hyphens between words (not underscores) | |
| **Required** | Contains primary keyword | |
| **Required** | Descriptive and readable | |
| Recommended | Under 75 characters | |
| Recommended | No stop words (the, a, an, of) unless necessary | |
| Recommended | Matches site hierarchy | |

**Good URLs:**
- `/vietnam/destinations/hanoi-travel-guide`
- `/vietnam/blog/best-time-visit-vietnam`
- `/vietnam/destinations/phu-quoc-beaches`

**Bad URLs:**
- `/vietnam/destinations/page123`
- `/vietnam/The_Ultimate_Guide_To_Hanoi_Vietnam_2025`
- `/p?id=456&cat=destinations`

---

## Schema Markup

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Article or BlogPosting schema present | |
| **Required** | Headline property set | |
| **Required** | datePublished property set | |
| **Required** | Author property set | |
| Recommended | BreadcrumbList schema present | |
| Recommended | FAQPage schema if FAQ section exists | |
| Recommended | Image property with multiple sizes | |
| Recommended | dateModified property set | |

---

## FAQ Section (for Featured Snippets)

| Check | Requirement | Status |
|-------|-------------|--------|
| Recommended | 3-5 FAQ questions per article | |
| Recommended | Questions match actual search queries | |
| Recommended | Answers are concise (40-60 words) | |
| Recommended | Answer appears immediately after question | |
| Recommended | FAQPage schema markup applied | |

**Good FAQ Format:**
```markdown
## Frequently Asked Questions

### How much does a trip to Hanoi cost per day?

Budget travelers can expect to spend $25-35 per day in Hanoi,
covering accommodation, food, and local transport. Mid-range
travelers should budget $50-80 per day for private rooms and
sit-down restaurants.
```

---

---

## Geo SEO Checklist

### Geographic Data

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Coordinates (lat/lng) present | |
| **Required** | Region specified (north/central/south) | |
| **Required** | Location mentioned in first paragraph | |
| Recommended | Nearest airport with distance | |
| Recommended | Distance from Hanoi | |
| Recommended | Distance from Ho Chi Minh City | |
| Recommended | 3-5 nearby destinations | |

### Quick Facts Section

Must include geographic context:
```markdown
- **Location:** [Area], [Region], Vietnam
- **Coordinates:** [XX.XXXX°N, XXX.XXXX°E]
- **Region:** [North/Central/South] Vietnam
- **Nearest Airport:** [Name] ([Code]) - [Distance]
```

### Getting Around Section

| Check | Requirement | Status |
|-------|-------------|--------|
| **Required** | Transport options listed | |
| **Required** | Travel times included | |
| Recommended | Distance from airports | |
| Recommended | Links to nearby destinations | |

### Nearby Destinations

| Check | Requirement | Status |
|-------|-------------|--------|
| Recommended | 3-5 nearby destinations mentioned | |
| Recommended | Distances in kilometers | |
| Recommended | Travel times by common transport | |
| Recommended | Direction indicated | |

---

## Publishing Checklist

Before publishing, verify:

- [ ] Title tag: 50-60 chars, contains keyword
- [ ] Meta description: 150-160 chars, compelling
- [ ] Single H1 with keyword
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Primary keyword in first 100 words
- [ ] 3+ internal links with descriptive anchor text
- [ ] All images have descriptive alt text
- [ ] URL is clean and contains keyword
- [ ] Article/BlogPosting schema present
- [ ] Publication date set
- [ ] FAQ section with schema (if applicable)
- [ ] Content is original and valuable
- [ ] Prices include current year
- [ ] No banned phrases used

---

## SEO Score Calculation

Calculate a score (0-100) based on:

| Category | Weight | Criteria |
|----------|--------|----------|
| Title & Meta | 20% | Length, keyword presence, uniqueness |
| Content Quality | 30% | Word count, keyword usage, readability |
| Structure | 20% | Heading hierarchy, paragraphs, lists |
| Links | 15% | Internal links, anchor text quality |
| Technical | 15% | URL, images, schema markup |

**Passing Score:** 60+

**Thresholds:**
- 90-100: Excellent - ready to publish
- 80-89: Very good - ready to publish
- 70-79: Good - ready to publish
- 60-69: Acceptable - can publish with notes
- 50-59: Needs work - address issues before publishing
- Below 50: Significant issues - requires revision

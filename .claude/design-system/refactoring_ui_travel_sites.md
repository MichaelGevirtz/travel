# Refactoring UI – Practical Design Guide for Travel & Content Websites

_A comprehensive, implementation-focused summary of **Refactoring UI** by Adam Wathan & Steve Schoger, adapted specifically for travel, content, and affiliate websites._

This guide is written for:
- Founders and builders without formal design training
- Developers designing their own UIs
- Content-heavy travel and affiliate sites

It focuses on **what to do**, **why it works**, and **how to apply it immediately**.

---

## How to Use This Guide

Use this document as:
- A **design playbook** when starting a new travel site
- A **refactoring checklist** for existing pages
- A **shared language** between developers, designers, and content writers

Each principle includes:
- Explanation
- Visual before/after description
- Travel-specific application
- Common mistakes
- Practical checklist

---

# 1. STARTING FROM SCRATCH

## Design in Grayscale First

### Explanation

Color is emotionally powerful but **dangerously distracting**.

When you design with color too early:
- You hide hierarchy problems
- You confuse emphasis with decoration
- You mistake contrast for clarity

Grayscale forces you to:
- Use spacing
- Use typography
- Use layout

If a design works in grayscale, it will work in color.

### Before / After (Visual Description)

**Before:**
- Hero with blue sky background
- White text looks fine
- CTA stands out only because it’s orange

**After (Grayscale):**
- Hero still readable
- Headline clearly dominant
- CTA visible due to size and weight, not color

### Travel Website Application

Design first without:
- Destination imagery
- Brand colors

Focus on:
- Headline size hierarchy
- Card spacing
- CTA prominence

Example:
- Hotel comparison cards must still be distinguishable without color tags

### Common Mistakes
- Using color to fix weak layout
- Designing directly in brand palette

### Checklist
- [ ] Does hierarchy work without color?
- [ ] Is the primary action obvious in grayscale?

---

## Don’t Design Too Much Upfront

### Explanation

Over-designing early leads to:
- Rigid systems
- Wrong assumptions
- Wasted effort

UI should evolve **with content and real use cases**.

### Travel Website Application

Instead of designing:
- Every destination page
- Every card variation

Start with:
- One destination page
- One hotel card
- One article layout

Let patterns emerge.

### Common Mistakes
- Designing full design systems before content exists

### Checklist
- [ ] Are patterns reused instead of invented?

---

## Detail Comes Later

### Explanation

Early polish hides structural problems.

Good design order:
1. Layout
2. Spacing
3. Typography
4. Color
5. Visual flair

### Travel Website Application

Don’t add:
- Icons
- Gradients
- Decorative maps

Until layout and content flow are solid.

### Checklist
- [ ] Is structure solid without decoration?

---

## Choose a Personality (Travel Context)

### Explanation

Every interface has a personality — intentional or not.

For travel sites, ideal traits are:
- Inspiring
- Trustworthy
- Practical

### How to Express Personality

- Typography choice
- Spacing generosity
- Color restraint
- Image treatment

### Common Mistakes
- Mixing playful visuals with serious booking actions

### Checklist
- [ ] Does visual tone match travel intent?

---

# 2. HIERARCHY IS EVERYTHING

## Size Isn’t Everything

### Explanation

Hierarchy comes from **contrast**, not just font size.

Contrast tools:
- Weight
- Color
- Spacing
- Position

### Travel Example

Hotel card:
- Hotel name: medium size, bold
- Price: same size, stronger contrast

### Mistakes
- Huge headings everywhere

### Checklist
- [ ] Is importance clear without extreme sizes?

---

## Use Font Weight Effectively

### Explanation

Weight changes are often more elegant than size changes.

### Travel Application

Use bold for:
- Prices
- Ratings
- Key benefits

Avoid bold for:
- Paragraphs

### Checklist
- [ ] Is bold used sparingly?

---

## Don’t Use Grey Text on Colored Backgrounds

### Explanation

Grey on color kills contrast and readability.

### Travel Application

Overlay text on images:
- Use white or near-white
- Add dark overlay

### Checklist
- [ ] Is contrast sufficient on images?

---

## Emphasize by De-emphasizing

### Explanation

The easiest way to highlight something is to quiet everything else.

### Travel Example

Make the “Best Value Hotel” pop by muting other cards.

### Checklist
- [ ] Is secondary info visually quieter?

---

## Labels Are Secondary

### Explanation

Users care about values, not labels.

### Travel Example

Instead of:
- “Price:” $120

Do:
- $120 / night

### Checklist
- [ ] Are labels visually secondary?

---

## Separate Visual Hierarchy from Document Hierarchy

### Explanation

HTML structure ≠ visual structure.

### Travel Application

An H2 might look smaller than body text if less important.

### Checklist
- [ ] Does visual importance match user intent?

---

# 3. LAYOUT AND SPACING

## Start with Too Much White Space

### Explanation

Crowded designs feel cheap and stressful.

Whitespace:
- Improves scannability
- Increases perceived quality

### Travel Application

Generous spacing between:
- Hotel cards
- Sections

### Checklist
- [ ] Can sections breathe?

---

## Establish a Spacing System (8px)

### Explanation

Consistent spacing creates harmony.

Use multiples of:
- 4px or 8px

### Checklist
- [ ] Is spacing consistent?

---

## Dense UI ≠ Better

### Explanation

More information ≠ better usability.

### Travel Application

Show:
- Top 3 benefits
Hide:
- Minor details behind toggles

### Checklist
- [ ] Is information progressive?

---

## Spacing and Sizing Systems

### Explanation

Reuse spacing values instead of inventing new ones.

### Checklist
- [ ] Are spacing tokens reused?

---

## Grids Are Overrated

### Explanation

Rigid grids limit flexibility.

### Travel Application

Allow:
- Variable card heights
- Content-driven layout

### Checklist
- [ ] Does layout adapt to content?

---

# 4. DESIGNING TEXT

## Line Length

### Explanation

Ideal line length:
- 45–75 characters

### Travel Application

Long travel guides:
- Narrow content column

### Checklist
- [ ] Is line length readable?

---

## Line Height

### Explanation

More line height for smaller text.

### Checklist
- [ ] Is text comfortable to read?

---

## Not Every Link Needs Color

### Explanation

Too many colored links create noise.

### Travel Application

Use color for:
- Primary actions

Underline inline links instead.

### Checklist
- [ ] Are links distinguishable but calm?

---

## Align with Readability in Mind

### Explanation

Left alignment is safest for content.

### Checklist
- [ ] Is text aligned for reading?

---

## Letter Spacing for All Caps

### Explanation

All caps need extra spacing.

### Checklist
- [ ] Is letter spacing adjusted?

---

# 5. WORKING WITH COLOR

## Ditch Hex for HSL

### Explanation

HSL is intuitive:
- Hue
- Saturation
- Lightness

### Travel Application

Easily create lighter/darker variants.

### Checklist
- [ ] Are colors defined in scales?

---

## You Need More Colors Than You Think

### Explanation

One blue isn’t enough.

Define:
- 8–10 shades per color

### Checklist
- [ ] Are shade ramps defined?

---

## Don’t Let Lightness Kill Saturation

### Explanation

Light colors often look washed out.

### Checklist
- [ ] Is saturation preserved?

---

## Greys Don’t Have to Be Grey

### Explanation

Tint greys with blue or brown.

### Travel Application

Warmer greys feel more inviting.

### Checklist
- [ ] Are greys tinted?

---

## Accessible Doesn’t Mean Ugly

### Explanation

Contrast can be beautiful.

### Checklist
- [ ] Does contrast meet accessibility needs?

---

# 6. CREATING DEPTH

## Shadows vs Borders

### Explanation

Shadows imply elevation.

### Travel Application

Cards should float, not box.

### Checklist
- [ ] Are shadows subtle and consistent?

---

## Overlap Elements

### Explanation

Overlap creates visual interest.

### Travel Application

Hero images overlapping content cards.

### Checklist
- [ ] Is overlap intentional?

---

## Multiple Shadows

### Explanation

Layered shadows feel natural.

### Checklist
- [ ] Are shadows realistic?

---

# 7. WORKING WITH IMAGES

## Control Background Images

### Explanation

Images must serve text.

### Travel Application

Use overlays and cropping.

### Checklist
- [ ] Is text always readable?

---

## Scaling Text to Fit

### Explanation

Text must adapt to image complexity.

### Checklist
- [ ] Is text scaled appropriately?

---

# 8. FINISHING TOUCHES

## Supercharge Defaults

### Explanation

Browser defaults are bland.

### Checklist
- [ ] Are defaults customized?

---

## Add Color with Accent Borders

### Explanation

Small color touches go far.

### Checklist
- [ ] Are accents subtle?

---

## Decorate Backgrounds

### Explanation

Subtle textures add richness.

### Checklist
- [ ] Are decorations restrained?

---

## Don’t Overlook Empty States

### Explanation

Empty states are teaching moments.

### Travel Application

“No results” should guide next steps.

### Checklist
- [ ] Are empty states helpful?

---

## Final Thought

Great UI isn’t about creativity — it’s about clarity, restraint, and empathy.

Refactoring UI teaches you to **see** design problems and fix them systematically.

Apply these principles consistently, and your travel/content website will:
- Feel trustworthy
- Convert better
- Scale gracefully

---

_End of guide._


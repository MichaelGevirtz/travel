# Laws of UX – Practical Reference Guide for Travel & Affiliate Websites

_A comprehensive, implementation‑focused guide based on **Laws of UX** by Jon Yablonski, rewritten and applied specifically to travel, content, and affiliate websites._

This is not a theory summary.
It is a **design + product decision reference** you can use while building, reviewing, or refactoring travel sites.

---

## How to Use This Guide

Use this document as:
- A **UX decision framework** when designing pages
- A **review checklist** before launch
- A **shared language** between product, design, and engineering

For **each law** you’ll find:
- Definition
- Psychological basis
- Travel/affiliate application
- Concrete examples
- Mobile considerations
- Common violations
- Actionable checklist

---

# 1. AESTHETIC–USABILITY EFFECT

## Definition

Users perceive aesthetically pleasing interfaces as **easier to use**, even when they are not.

## Psychological Basis

Humans associate beauty with:
- Quality
- Trustworthiness
- Competence

This creates **cognitive forgiveness** — users tolerate minor usability issues if the interface feels polished.

## Why It Matters for Travel Websites

Travel decisions involve:
- Money
- Risk
- Emotion

If a site looks cheap or outdated, users subconsciously assume:
- Poor recommendations
- Scammy affiliate intent

## How to Apply

- High‑quality destination imagery
- Generous spacing
- Calm color palette
- Clean typography

### Example

**Good:**
- Large hero image
- Simple headline
- Clear CTA

**Bad:**
- Stock photos
- Cluttered layout
- Multiple competing banners

## Mobile Considerations

- Visual polish matters even more on mobile
- Avoid dense layouts

## Common Violations

- Overloading pages with ads
- Inconsistent visuals across pages

## Checklist
- [ ] Does the site feel trustworthy at first glance?
- [ ] Is visual clutter minimized?

---

# 2. DOHERTY THRESHOLD

## Definition

Productivity soars when systems respond within **400 milliseconds**.

## Psychological Basis

Fast feedback maintains:
- Flow
- Engagement
- Sense of control

Delays break trust.

## Travel Website Application

Critical interactions:
- Search
- Filtering
- Date selection
- Image loading

## Performance Tactics

- Lazy‑load images
- Use skeleton loaders
- Optimize hero images
- Preload critical assets

## Mobile Considerations

- Mobile networks are slower
- Optimize for worst‑case conditions

## Common Violations

- Heavy sliders
- Uncompressed images

## Checklist
- [ ] Do interactions feel instant?
- [ ] Is loading feedback visible?

---

# 3. FITTS’S LAW

## Definition

The time to acquire a target depends on:
- Distance
- Size

## Psychological Basis

Larger, closer targets are easier to hit.

## Travel Website Application

- Primary CTA buttons should be large
- Important actions placed near thumb zones

## Mobile Tap Targets

- Minimum 48×48px
- Adequate spacing between actions

## CTA Placement

- Sticky bottom CTAs
- Prominent booking buttons

## Common Violations

- Small text links
- CTAs too close together

## Checklist
- [ ] Are CTAs easy to tap?
- [ ] Are important actions close to the user’s thumb?

---

# 4. HICK’S LAW

## Definition

Decision time increases with the number of choices.

## Psychological Basis

Too many options cause:
- Decision paralysis
- Anxiety

## Travel Website Application

- Limit top navigation to ~7 items
- Progressive filters
- Smart defaults

## Filter & Search Design

- Show common filters first
- Hide advanced options

## Mobile Considerations

- Collapsible menus
- Step‑by‑step choices

## Common Violations

- Mega menus with dozens of links
- Overloaded filter panels

## Checklist
- [ ] Are choices limited at each step?
- [ ] Is complexity revealed gradually?

---

# 5. JAKOB’S LAW

## Definition

Users prefer interfaces that work like ones they already know.

## Psychological Basis

Familiarity reduces cognitive load.

## Travel Website Application

Follow conventions:
- Logo → homepage
- Filters on the left
- Booking CTA on the right

## When to Break Conventions

Only if:
- There is clear benefit
- The new pattern is obvious

## Common Violations

- Creative navigation labels
- Non‑standard layouts

## Checklist
- [ ] Does the site behave as users expect?

---

# 6. LAW OF COMMON REGION

## Definition

Elements within a boundary are perceived as related.

## Travel Website Application

- Destination cards
- Hotel info blocks
- Pricing sections

## Examples

Cards with subtle backgrounds clearly group content.

## Mobile Considerations

- Use cards to separate sections

## Common Violations

- Relying only on proximity without visual grouping

## Checklist
- [ ] Are related items visually grouped?

---

# 7. LAW OF PRÄGNANZ

## Definition

People perceive complex visuals in the simplest form possible.

## Psychological Basis

The brain prefers clarity and simplicity.

## Travel Website Application

- Simple icons
- Clear layouts
- Avoid decorative clutter

## Common Violations

- Overdesigned icons
- Too many visual styles

## Checklist
- [ ] Is the design visually simple?

---

# 8. LAW OF PROXIMITY

## Definition

Objects close together are perceived as related.

## Travel Website Application

- Group hotel details
- Keep form labels close to inputs

## Mobile Considerations

Spacing is more critical on small screens.

## Common Violations

- Excessive spacing breaking relationships

## Checklist
- [ ] Are related items close together?

---

# 9. LAW OF SIMILARITY

## Definition

Elements that look similar are perceived as related.

## Travel Website Application

- Consistent card designs
- Uniform CTA styles

## Common Violations

- Multiple button styles

## Checklist
- [ ] Are patterns consistent?

---

# 10. MILLER’S LAW

## Definition

Working memory holds about **7±2 items**.

## Travel Website Application

- Chunk content
- Limit lists
- Group features

## Common Violations

- Long unstructured lists

## Checklist
- [ ] Is information chunked?

---

# 11. OCCAM’S RAZOR

## Definition

The simplest solution is usually best.

## Travel Website Application

- Avoid feature creep
- Solve the core user problem first

## Checklist
- [ ] Is each feature necessary?

---

# 12. PARETO PRINCIPLE (80/20)

## Definition

80% of results come from 20% of features.

## Travel Website Application

- Focus on top destinations
- Highlight key CTAs

## Checklist
- [ ] Are high‑impact features prioritized?

---

# 13. PARKINSON’S LAW

## Definition

Work expands to fill available time.

## Travel Website Application

- Set constraints
- Limit scope intentionally

## Checklist
- [ ] Are constraints clearly defined?

---

# 14. PEAK‑END RULE

## Definition

People judge experiences by the peak and the end.

## Travel Website Application

- Delightful confirmation states
- Clear success feedback

## Checklist
- [ ] Are key moments memorable?

---

# 15. POSTEL’S LAW

## Definition

Be liberal in what you accept, strict in what you produce.

## Travel Website Application

- Flexible form inputs
- Friendly validation messages

## Checklist
- [ ] Are forms forgiving?

---

# 16. SERIAL POSITION EFFECT

## Definition

People remember the first and last items best.

## Travel Website Application

- Place important links first or last

## Checklist
- [ ] Are key items positioned strategically?

---

# 17. TESLER’S LAW

## Definition

Every system has inherent complexity.

## Travel Website Application

- Hide complexity from users

## Checklist
- [ ] Is complexity managed internally?

---

# 18. VON RESTORFF EFFECT

## Definition

Distinct items are more likely to be remembered.

## Travel Website Application

- Highlight primary CTAs

## Checklist
- [ ] Does the main action stand out?

---

# 19. ZEIGARNIK EFFECT

## Definition

People remember incomplete tasks better than completed ones.

## Travel Website Application

- Progress indicators
- Save search states

## Checklist
- [ ] Is progress visible?

---

## Final Note

These laws are **tools, not rules**.

Applied together, they help travel and affiliate websites:
- Feel intuitive
- Build trust
- Increase conversions

Use them intentionally, not mechanically.

---

_End of reference guide._


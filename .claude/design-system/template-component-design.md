# Component Design Request Template

Use this template when requesting a new component design.

## Component Context
- **Component Name:** [e.g., DestinationCard, HotelWidget, Newsletter]
- **Purpose:** [What this component does]
- **User Goal:** [What user wants to accomplish]
- **Business Goal:** [What we want to achieve]
- **Usage:** [Where it appears on site]

## Requirements
- **Content:** [What content does it display]
- **Interactions:** [Clicks, hovers, etc.]
- **States:** [Default, hover, active, loading, error]
- **Responsive:** [Mobile, tablet, desktop considerations]
- **Accessibility:** [WCAG requirements]
- **Performance:** [Any constraints]

## Design Process
1. Consult design principles from project files
2. Consider relevant UX laws:
   - Fitts's Law (if clickable)
   - Miller's Law (if showing multiple items)
   - Von Restorff Effect (if needs emphasis)
   - Jakob's Law (user expectations)

3. Think about:
   - Visual hierarchy (size, weight, color)
   - White space (Refactoring UI)
   - Clarity (Don't Make Me Think)
   - Conversion optimization
   - Mobile usability

## Output Required
For each option (2-3):
- Component structure description
- Design principles applied
- Why it works for our audience
- Pros and cons
- Code implementation (React + Tailwind)
- Mobile and desktop views
- Accessibility features

## Success Criteria
- [ ] Follows design system principles
- [ ] Mobile-friendly (tested)
- [ ] Fast rendering
- [ ] Accessible (keyboard, screen readers)
- [ ] Conversion-optimized
- [ ] Clear design rationale documented
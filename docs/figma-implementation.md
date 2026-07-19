# Figma implementation plan

The Figma reference should be treated as a design source of truth for layout, spacing, and interaction patterns.

## Implementation rules

- Use design tokens before hard-coded values.
- Extract reusable components for buttons, cards, inputs, badges, and modals.
- Define a screen-by-screen mapping from the PRD user journeys to the design frames.
- Keep mobile-first layouts and ensure the same component library supports web and mobile surfaces.

## Initial screen set

- Auth / onboarding
- Home / medicine discovery
- Product detail
- Cart
- Checkout with prescription upload
- Order confirmation
- Pharmacy dashboard
- Rider delivery view

## Suggested delivery sequence

1. Build the base shell and navigation.
2. Implement the patient journey with visual consistency.
3. Add the pharmacy and rider views with the same design language.
4. Connect API contracts once the backend endpoints are ready.

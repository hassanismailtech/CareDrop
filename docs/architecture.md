# CareDrop architecture blueprint

## Recommended architecture choice

Use a hybrid approach:

- Frontend: Feature-Sliced Design (FSD) for the web and mobile product surfaces, with shared domain modules and a small design-system layer.
- Backend: Layered architecture with controllers, services, repositories, and infrastructure adapters so the business rules stay clear and testable.

This balances long-term maintainability with the speed needed for the MVP.

## Monorepo structure

- apps/web: patient-facing web shell for pharmacy/admin experience
- apps/mobile: React Native/Expo client for patients and riders
- services/api: NestJS-style API service with auth, orders, pharmacies, payments, and notifications
- packages/ui: shared design tokens and reusable UI components

## Frontend stack

- React + TypeScript for web portals
- React Native + Expo for the patient and rider mobile apps
- Tailwind CSS for fast UI delivery
- Zustand or React Query for state management and server state

## Backend stack

- Node.js + NestJS + TypeScript
- PostgreSQL for transactional records
- Redis for queueing and location/session caching
- S3 for prescription uploads
- Paystack/Flutterwave, Google Maps, Twilio/Termii integrations

## Figma implementation approach

1. Create a shared token layer for colors, spacing, radius, and typography.
2. Map the primary user flows into a small set of reusable screens:
   - onboarding/auth
   - medicine discovery
   - cart and checkout
   - prescription upload
   - pharmacy review
   - delivery tracking
3. Build the UI using atomic components first, then compose them into page-level features.

## MVP delivery order

1. Foundation: layout, routing, auth shell
2. Core commerce flow: search, catalogue, cart, checkout
3. Prescription and pharmacy workflow
4. Rider and admin experience
5. Notifications and payment finalisation

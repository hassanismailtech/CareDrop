# CareDrop

CareDrop is an on-demand, mobile-first medicine delivery platform operating in Nigeria. It bridges the gap between patients and licensed pharmacies by enabling users to seamlessly search for authentic medications, compare prices, upload prescriptions, and receive secure, fast doorstep delivery.

## Current scaffold

This workspace now includes a lightweight monorepo scaffold for:

- a web application under apps/web
- a backend service under services/api
- shared product documentation under docs

## Quick start

1. Install dependencies
   - npm install
2. Start the web app
   - npm --workspace apps/web run dev
3. Start the API
   - npm --workspace services/api run dev

## Architecture direction

- Use Feature-Sliced Design for frontend organisation.
- Use a layered backend structure for domain services and integrations.
- Follow the Figma reference as the source of truth for UI implementation.

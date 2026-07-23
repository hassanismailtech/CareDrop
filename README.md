# CareDrop

[![Status: MVP](https://img.shields.io/badge/status-MVP-yellow)](https://github.com)
[![Stack: React/Node/Prisma](https://img.shields.io/badge/stack-React%20%7C%20Node%20%7C%20Prisma-blue)](https://github.com)

CareDrop is a mobile-first digital pharmacy and medicine delivery platform for Nigeria. It helps patients discover authentic medicines, compare prices, upload prescriptions, and receive doorstep delivery from licensed pharmacies in a safer and faster way.

## Product Vision (The Pitch)

### The problem

Patients often waste time visiting multiple pharmacies to find specific medicines, while counterfeit drugs and fragmented prescription workflows create avoidable health risk. Delivery access is also limited by traffic, distance, and weak digital coordination.

### The solution

CareDrop connects patients, pharmacies, and delivery partners in a single platform so users can search for medicines, verify availability, upload prescriptions, and place orders with confidence.

### Target audience

- Patients who need reliable access to essential medication quickly
- Pharmacists who want to grow their reach and digitise operations
- Delivery partners who want structured, trackable assignments

## Product Requirements (The PRD)

### Core user stories

- As a patient, I want to search for medicines and compare prices so that I can make an informed purchase.
- As a patient, I want to upload a prescription during checkout so that I can buy restricted medication safely and legally.
- As a pharmacist, I want to review orders and approve or reject them so that I can verify stock and prescription validity.
- As a rider, I want to receive delivery assignments and route information so that I can complete fulfilment efficiently.

### Functional highlights

- Authentication and role-based access for patients, pharmacies, riders, and admins
- Search and discovery for medicine availability and pricing
- Cart, checkout, and payment flow
- Prescription upload and pharmacist verification workflow
- Delivery tracking and order status updates

### Out of scope for MVP

- Telemedicine consultations
- Insurance integrations
- AI health assistant features
- Recurring subscription-based medication orders
- Laboratory booking and international delivery

### Success metrics

- Average order fulfilment time under 90 minutes
- Prescription verification time under 10 minutes
- Delivery success rate above 98%
- Low crash rate and fast API response times for a reliable customer experience

## Technical Documentation

### Architecture overview

CareDrop is organised as a scalable monorepo with a web client, backend service, shared documentation, and future shared packages for common UI and domain logic.

### Recommended repository structure

```text
caredrop/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   ├── features/
│       │   ├── pages/
│       │   ├── shared/
│       │   └── widgets/
├── services/
│   └── api/
│       ├── src/
│       │   ├── controllers/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── utils/
│       │   └── middlewares/
├── packages/
│   └── ui/
├── infra/
├── docs/
├── README.md
└── package.json
```

### Architectural logic

- apps/ contains user-facing products and portals
- services/ contains backend APIs and business logic
- packages/ is reserved for reusable code such as shared UI primitives or domain helpers
- infra/ is where deployment, infrastructure, and environment automation should live as the platform grows
- docs/ stores product, architecture, and delivery documentation for cross-functional alignment

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL for local development

### Installation

```bash
npm install
```

### Environment variables

Create a local environment file based on the template below before running the API.

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/caredrop
JWT_SECRET=replace-me
PORT=4000
NODE_ENV=development
VITE_API_URL=http://localhost:4000
```

## Operations

### Run the web app

```bash
npm run dev:web
```

### Run the API

```bash
npm run dev:api
```

### Build the project

```bash
npm run build:web
npm run build:api
```

## Contributing Guidelines

1. Create a feature branch from main.
2. Keep changes focused and documented.
3. Add or update tests when changing business logic.
4. Open a pull request with a clear summary of the change and its impact.

## Security & Vulnerability Audit

### Files that should never be committed

The following should remain local-only and never be checked into version control:

- .env files
- private keys and certificates such as *.pem or *.key
- local database dumps or seed files containing real data
- credentials embedded in source files or config files

### Secret management guidance

- Store secrets in environment variables or a managed secret store
- Rotate keys and tokens regularly
- Use separate development, staging, and production values
- Keep .env.example as a safe template without real values

### Current repository posture

The repository already includes a basic ignore setup, but it should be expanded to cover build artifacts, editor files, and local secrets to reduce accidental exposure.

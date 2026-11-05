# AI-Powered Enterprise E-Commerce Platform

This repository is the first vertical slice of a larger commerce platform: a
Next.js storefront reads a validated product catalog from a NestJS API backed by
PostgreSQL and Prisma. The workspace uses pnpm and Turborepo.

## Requirements

- Node.js 20.11 or later
- pnpm 12.8.1
- Docker Compose v2

## Local setup

Run from the repository root:

```powershell
pnpm install
Copy-Item .env.example .env
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env.local
docker compose up -d db
pnpm db:migrate
pnpm db:seed
pnpm dev
```

`docker compose up` also starts the database in the foreground; use a second
terminal for the remaining commands if you choose that form instead of
`docker compose up -d db`. The sample credentials in `.env.example` are for
local development only. The `.env` files created from these examples are
ignored by Git; do not put real credentials in the examples or commit local
environment files.

The storefront is available at <http://localhost:3000>. The API listens on
<http://localhost:3001>. Interactive OpenAPI docs are at
<http://localhost:3001/api/docs>, and the JSON document is at
<http://localhost:3001/api/openapi.json>.

## Catalog API

- `GET /api/v1/products?limit=20&cursor=<product-uuid>` returns an active
  product page and `pageInfo` with the next cursor.
- `GET /api/v1/products/<product-uuid>` returns an active product.
- Invalid input and API errors use RFC 7807 Problem Details with the
  `application/problem+json` media type.

The seed command inserts non-sensitive demo products and can be run again
without duplicating products.

## Checks

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check
pnpm build
```

The API unit and HTTP integration tests mock Prisma, so they do not require a
running database. Migrations and seeding do require PostgreSQL.

## Workspace

- `apps/web` — Next.js App Router storefront
- `apps/api` — NestJS commerce API and Prisma catalog
- `packages/types` — shared Zod schemas and TypeScript types

Authentication, payments, AI services, and admin functionality are outside this
initial milestone.

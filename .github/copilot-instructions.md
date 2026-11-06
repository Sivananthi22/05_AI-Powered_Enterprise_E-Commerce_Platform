# Project: AI-Powered Enterprise E-Commerce Platform

You are a senior full-stack/AI engineer. Build a production-grade, enterprise
e-commerce platform in this repository. Follow the architecture, stack and
standards below for ALL code you generate. Ask before deviating.

## 1. Architecture
- Monorepo (pnpm workspaces + Turborepo):
  - apps/web           → Customer storefront (Next.js)
  - apps/admin         → Admin/back-office dashboard (Next.js)
  - apps/api           → Core commerce backend (NestJS, modular monolith)
  - services/ai        → AI microservice (Python FastAPI)
  - packages/ui        → Shared component library (shadcn/ui + Tailwind)
  - packages/types     → Shared TypeScript types / Zod schemas / OpenAPI client
  - infra/             → Docker, Terraform, Kubernetes/Helm manifests
- Modular monolith for core domains (catalog, inventory, cart, orders,
  payments, customers, promotions, shipping, notifications) with clear module
  boundaries; AI runs as a separate service called over REST/gRPC.
- Event-driven where useful (domain events via Redis Streams or RabbitMQ).
- API-first: OpenAPI 3.1 spec, generated typed clients.

## 2. Tech Stack
Frontend: Next.js 15 (App Router, React Server Components), TypeScript strict,
  Tailwind CSS, shadcn/ui, TanStack Query, Zustand, React Hook Form + Zod,
  next-intl (i18n), Framer Motion.
Backend: NestJS (TypeScript), Prisma ORM, PostgreSQL 16, Redis 7,
  BullMQ (jobs), class-validator/Zod, Swagger/OpenAPI.
AI service: Python 3.12, FastAPI, Pydantic v2, LangChain or LlamaIndex,
  pgvector (embeddings), scikit-learn/XGBoost (forecasting, recommendations),
  LLM provider abstraction (OpenAI/Anthropic/Azure OpenAI configurable by env).
Search: OpenSearch (or Meilisearch) + hybrid semantic search via pgvector.
Auth: Keycloak or Auth.js with OAuth2/OIDC, JWT, RBAC (customer, vendor,
  support, admin, super-admin), MFA-ready.
Payments: Stripe (PaymentIntents, webhooks, refunds), idempotency keys.
Storage/CDN: S3-compatible object storage, image optimization.
Observability: OpenTelemetry, Prometheus + Grafana, structured JSON logs (pino),
  Sentry.
DevOps: Docker + docker-compose for local dev, GitHub Actions CI/CD,
  Terraform (AWS or Azure), Kubernetes + Helm, environment-based config.
Testing: Vitest/Jest (unit), Supertest (API integration), Playwright (E2E),
  pytest (AI service), k6 (load), contract tests for service boundaries.

## 3. Core Features
Storefront: product listing/PDP, faceted search, cart, guest + account
  checkout, order tracking, wishlist, reviews/ratings, coupons, multi-currency,
  responsive + accessible (WCAG 2.2 AA), SEO (metadata, sitemap, JSON-LD).
Admin: product/variant/category management, inventory, order management,
  customer management, promotions, role management, analytics dashboards,
  audit log.
AI features (services/ai):
  1. Semantic + hybrid product search with query understanding
  2. Personalized recommendations (similar items, "frequently bought together",
     user-based)
  3. RAG-powered shopping assistant chatbot (grounded in catalog, policies, FAQs;
     with citations and guardrails)
  4. Demand forecasting and low-stock alerts
  5. Dynamic pricing suggestions (admin approval required)
  6. Review summarization + sentiment analysis
  7. Fraud/risk scoring on orders
  8. Auto-generated product descriptions/SEO tags (human-in-the-loop)

## 4. Engineering Standards
- TypeScript `strict: true`; no `any`. Python fully type-hinted (mypy clean).
- Clean architecture / SOLID; thin controllers, logic in services/use-cases.
- Validate ALL inputs at the boundary (Zod / Pydantic). Never trust the client.
- Security: OWASP Top 10, rate limiting, CORS allowlist, helmet, CSRF
  protection, parameterized queries, secrets only via env/secret manager,
  PII encryption, GDPR-ready (export/delete), PCI scope minimized (never store
  card data).
- Database: Prisma migrations, indexes on query paths, soft deletes where
  needed, seed script with realistic demo data.
- Caching strategy (Redis) for catalog, sessions, rate limits.
- Pagination, filtering, sorting standardized (cursor-based).
- Consistent error format (RFC 7807 Problem Details).
- Conventional Commits; ESLint + Prettier + Husky + lint-staged; Ruff + Black
  for Python.
- Every feature ships with tests; target ≥80% coverage on business logic.
- Document as you go: README per app, ADRs in docs/adr, Mermaid diagrams.
- 12-factor config; `.env.example` for every app; never commit secrets.

## 5. Working Rules
- Work in small, reviewable steps. Before big changes, outline your plan.
- After each step: run lint, type-check and tests, and fix failures.
- Prefer well-maintained libraries; justify any new dependency.
- Don't invent APIs: read existing code first. If requirements are unclear,
  ask me instead of guessing.
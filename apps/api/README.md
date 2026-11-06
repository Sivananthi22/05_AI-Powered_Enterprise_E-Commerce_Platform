# Commerce API

The NestJS API exposes the public product catalog at `/api/v1/products`. It
uses PostgreSQL through Prisma, validates request parameters with
class-validator, documents endpoints with OpenAPI 3.1, and returns RFC 7807
Problem Details for API errors.

Copy `.env.example` to `.env`. From the repository root:

```powershell
docker compose up -d db
pnpm db:migrate
pnpm db:seed
pnpm dev
```

The Prisma client is generated before API development, build, type-check, and
test scripts. The API listens on port `3001` by default. Swagger UI is at
`/api/docs`; the OpenAPI JSON is at `/api/openapi.json`.

Run the API tests with `pnpm --filter @commerce/api test`; they use a mocked
Prisma service and do not require a database. Database migrations and seed data
do require PostgreSQL.

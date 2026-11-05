# Storefront

The Next.js 15 App Router storefront renders the public catalog from the NestJS
API. The root route lists products; `/products/<uuid>` displays a product detail
page. API responses are validated with the shared Zod schemas before rendering.

Copy `.env.example` to `.env.local` for local development. From the repository
root, run `pnpm dev` to start the storefront and API together. The storefront
uses `NEXT_PUBLIC_API_BASE_URL`, which defaults to
`http://localhost:3001/api/v1`.

Run the app tests with `pnpm --filter @commerce/web test`; the root `pnpm test`
command runs tests for the whole workspace.

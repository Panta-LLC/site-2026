# Panta Site Monorepo

This monorepo contains the website (Next.js + Tailwind), Sanity CMS Studio, optional MERN backend, shared UI design system, and tooling.

## Apps

- `apps/web`: Next.js app (App Router) with TailwindCSS, SEO, sitemap, analytics (Mixpanel), A/B testing (GrowthBook), feature flags, accessibility.
- `apps/studio`: Sanity v3 Studio with schemas for pages, sections, SEO, theme, flags, experiments.
- `apps/api`: Express.js + MongoDB placeholder service.

## Packages

- `packages/ui`: Design system components with Tailwind; Storybook stories.
- `packages/lib`: Shared utilities (Sanity client, analytics, flags, experiments).
- `packages/config`: Shared ESLint, Prettier, Tailwind configs.

## Quick Start

```bash
# macOS zsh
pnpm install
pnpm dev
```

Set env vars by copying `.env.example` to `.env.local` in each app:

- `apps/studio/.env.local`: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`
- `apps/web/.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_READ_TOKEN` (optional), `NEXT_PUBLIC_MIXPANEL_TOKEN`, `NEXT_PUBLIC_GROWTHBOOK_API_HOST`, `NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY`
- `apps/api/.env` (optional): `MONGODB_URI`

If `projectId`/`dataset` are missing, Studio will fail to start and Web will throw a clear configuration error.

## Scripts

- `pnpm dev` — run all apps in dev mode.
- `pnpm build` — build all packages/apps.
- `pnpm test` — run unit tests.
- `pnpm e2e` — run Playwright tests.
- `pnpm storybook` — run Storybook.

## Deployment

- GitHub Actions CI runs lint, typecheck, tests, and builds.
- Vercel deploys `apps/web` on push to `main`.
- Sanity Studio can be deployed via Sanity or hosted on Vercel as needed.

## Documentation

See `docs/TDD.md` for the technical design and rationale. See `apps/studio/README.md` for CMS management.

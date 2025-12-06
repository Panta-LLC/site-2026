# Technical Design Document (TDD)

## Architecture Overview

- Monorepo managed with pnpm + Turborepo.
- Next.js App Router for `apps/web` with TailwindCSS and shared UI components from `packages/ui`.
- Sanity v3 Studio in `apps/studio` with schemas for pages, sections, SEO, flags, experiments.
- Optional MERN backend `apps/api` (Express + MongoDB) for future features.
- Shared libraries in `packages/lib` for CMS client, analytics, experiments/flags.

## Key Decisions

- Sanity CMS chosen for flexible content modeling and live preview.
- TailwindCSS for rapid, consistent theming and utility-first styles.
- GrowthBook for A/B testing + feature flags to decouple deploys from releases.
- Mixpanel for analytics to track user behavior.
- Vercel for edge-ready hosting and easy CI/CD integration.

## SEO & Accessibility

- Metadata via Next.js `metadata`; sitemap `next-sitemap`.
- Semantic structure across components; contrast-aware tokens.
- Alt attributes on images and ARIA labels for interactive elements.

## Performance

- Next Image optimization, code splitting, ISR/SSG, CDN caching.

## Testing

- Jest + Testing Library for unit tests; Playwright for integration.
- Storybook for component development and visual regressions.

## Security & Maintainability

- Env variables for secrets; least privilege tokens.
- Shared config packages; typed utilities; linting/typechecking in CI.

## Future Enhancements

- Animations via Framer Motion; interactive elements with Radix.
- Additional experiments and flag governance in CMS.

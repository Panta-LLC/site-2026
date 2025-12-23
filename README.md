# Panta Site Monorepo

This monorepo contains the website (Next.js + Tailwind), Sanity CMS Studio, optional MERN backend, shared UI design system, and tooling.

## Apps

- `apps/web`: Next.js app (App Router) with TailwindCSS, SEO, sitemap, analytics (Mixpanel), A/B testing (GrowthBook), feature flags, accessibility.
  - Mixpanel: configure `NEXT_PUBLIC_MIXPANEL_TOKEN` in `apps/web/.env.local` to enable analytics.
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
- `apps/web/.env.local`: 
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_READ_TOKEN` (optional)
  - `NEXT_PUBLIC_MIXPANEL_TOKEN`, `NEXT_PUBLIC_GROWTHBOOK_API_HOST`, `NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY`
  - Email configuration (choose one):
    - **SMTP**: `SMTP_HOST`, `SMTP_PORT` (default: 587), `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` (true for 465), `SMTP_FROM_EMAIL`
    - **Gmail App Password**: `GMAIL_USER`, `GMAIL_APP_PASSWORD`
    - **Gmail OAuth2**: `GMAIL_USER`, `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`
  - `SCHEDULE_CALL_EMAIL` (recipient email, defaults to `NEXT_PUBLIC_CONTACT_EMAIL` or "hello@panta.com")
- `apps/api/.env` (optional): `MONGODB_URI`

If `projectId`/`dataset` are missing, Studio will fail to start and Web will throw a clear configuration error.

## Scripts

- `pnpm dev` — run all apps in dev mode.
- `pnpm build` — build all packages/apps.
- `pnpm test` — run unit tests.
- `pnpm e2e` — run Playwright tests.
- `pnpm storybook` — run Storybook.

## Mixpanel setup

- **Env var:** Set `NEXT_PUBLIC_MIXPANEL_TOKEN` in `apps/web/.env.local` (or in Vercel project settings) to enable Mixpanel tracking.
- **Security:** If any tokens were accidentally committed, rotate them immediately and remove committed files from history if necessary.
- **Local dev:** Keep local `.env*` files out of Git; `.gitignore` already contains `.env.local` and `**/.next/` patterns.

## Email setup (Schedule Call Form)

The schedule call form uses Nodemailer to send emails. Configure one of the following options in `apps/web/.env.local`:

### Option 1: SMTP (Recommended for production)
```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SMTP_SECURE=false  # true for port 465, false for 587
SMTP_FROM_EMAIL=noreply@example.com
SCHEDULE_CALL_EMAIL=recipient@example.com
```

### Option 2: Gmail App Password (Easy for testing)
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
SCHEDULE_CALL_EMAIL=recipient@example.com
```

To get a Gmail App Password:
1. Enable 2-Step Verification on your Google Account
2. Go to Google Account → Security → App passwords
3. Generate a new app password for "Mail"

### Option 3: Gmail OAuth2 (Most secure)
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_CLIENT_ID=your-client-id
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token
SCHEDULE_CALL_EMAIL=recipient@example.com
```

**Note:** If email is not configured, requests will be logged to the console in development mode.

## Running tests & Storybook

- Run unit tests (monorepo root): `pnpm -w -r test` — or run from a specific package, e.g. `pnpm --filter @panta/lib test`.
- Run Storybook for the UI package: from repo root: `pnpm --filter @panta/ui storybook` or `pnpm --filter web storybook` depending on workspace scripts.
- The repository includes a Storybook story `Analytics/TrackEvent` which demonstrates calling the shared `trackEvent` helper. In CI, mock `mixpanel-browser` to avoid network calls.

## Continuous Integration (GitHub Actions)

- A GitHub Actions workflow `ci.yml` is provided under `.github/workflows/`.
- The workflow runs on `pull_request` and on `push` to `main` and performs:
  - install dependencies via `pnpm`
  - run `lint`, `typecheck`, `test`, and `build` across the workspace
  - build Storybook for the UI package (artifact)
  - optionally deploy to Vercel when `VERCEL_TOKEN` is set in repository secrets.

Make sure to add the following repository secrets in GitHub for deploys (optional):

- `VERCEL_TOKEN` — your Vercel personal token (only required for the workflow deploy step).

## Pull Request Checklist

Use this checklist when opening a PR for the Mixpanel integration or related changes:

- [ ] Branch name follows convention (e.g. `feat/mixpanel-integration`).
- [ ] Code compiles and typechecks: `pnpm -w -r typecheck`.
- [ ] Lint passes: `pnpm -w -r lint`.
- [ ] Unit tests added/updated and pass: `pnpm -w -r test`.
- [ ] Storybook stories added/updated (if UI changes): `pnpm --filter @panta/ui storybook`.
- [ ] README/documentation updated for env vars and instructions.
- [ ] No secrets committed in the branch (run the security scan in this README).
- [ ] If sensitive tokens were ever committed, they have been rotated.
- [ ] Add a brief description of data tracked and privacy considerations (GDPR/CCPA) if applicable.

## Security scan

- To quickly search for likely committed secrets (file paths only):

```bash
cd site
git grep -n --untracked -E 'NEXT_PUBLIC_|SANITY_|MIXPANEL|sk[[:alnum:]]{20,}' || true
```

## Deployment

- GitHub Actions CI runs lint, typecheck, tests, and builds.
- Vercel deploys `apps/web` on push to `main`.
- Sanity Studio can be deployed via Sanity or hosted on Vercel as needed.

## Documentation

See `docs/TDD.md` for the technical design and rationale. See `apps/studio/README.md` for CMS management.

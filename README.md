# CV — Next.js

Personal CV site built with **Next.js 16**, **React**, **TypeScript**,
**Tailwind CSS v4**, **shadcn/ui**, and **Supabase** (build-time data fetch).
Static export to `out/` for GitHub Pages and Docker/nginx.

## Prerequisites

- Node.js ≥ 24.18.0 (see `.nvmrc`)
- [pnpm](https://pnpm.io/) 10.x
- [Docker](https://www.docker.com/) (for local Supabase)

## First-time setup

```bash
git clone https://github.com/95gabor/cv.git
cd cv
pnpm install
cp .env.example .env.local
pnpm exec supabase start
pnpm run db:seed
pnpm run dev
# → http://localhost:3000
```

## Common commands

| Command                                                  | Purpose                              |
| -------------------------------------------------------- | ------------------------------------ |
| `pnpm run dev`                                           | Dev server (Turbopack)               |
| `pnpm run build`                                         | Static export to `out/`              |
| `pnpm run generate`                                      | Alias for `build` (CI compatibility) |
| `pnpm run lint`                                          | ESLint                               |
| `pnpm run typecheck`                                     | TypeScript                           |
| `pnpm run test:e2e`                                      | Playwright functional tests          |
| `pnpm run db:start` / `db:stop` / `db:reset` / `db:seed` | Local Supabase                       |

## Quality gate (before PR)

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run build
```

Requires Supabase env vars (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` for
build; `SUPABASE_SECRET_KEY` for seed) — see `.env.example`.

## Docker (optional)

```bash
# Requires .env.local with SUPABASE_* and running Docker daemon
bash scripts/prepare-supabase-for-build.sh
docker compose up --build
# → http://localhost:8000
```

Uses the root `Dockerfile` (Next.js build inside Docker + nginx with gzip).

## Documentation

- [docs/README.md](./docs/README.md) — human docs index
- [docs/.ai/README.md](./docs/.ai/README.md) — agent entry point
- [AGENTS.md](./AGENTS.md) — agent roles and rules

## Stack

Next.js App Router · shadcn/ui · Supabase · static export · Playwright ·
Lighthouse · semantic-release

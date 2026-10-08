# CV — Next.js

Personal CV site built with **Next.js 16**, **React**, **TypeScript**,
**Tailwind CSS v4**, **shadcn/ui**, and committed **YAML** CV data. Static
export to `out/` for GitHub Pages and Docker/nginx.

## Prerequisites

- Node.js ≥ 24.21.0 (see `.nvmrc`)
- [pnpm](https://pnpm.io/) 12.x
- [Docker](https://www.docker.com/) (optional, for the production image)

## First-time setup

```bash
git clone https://github.com/95gabor/cv.git
cd cv
pnpm install
cp .env.example .env.local
pnpm run dev
# → http://localhost:3000
```

## Common commands

| Command              | Purpose                              |
| -------------------- | ------------------------------------ |
| `pnpm run dev`       | Dev server (Turbopack)               |
| `pnpm run build`     | Static export to `out/`              |
| `pnpm run generate`  | Alias for `build` (CI compatibility) |
| `pnpm run lint`      | ESLint                               |
| `pnpm run typecheck` | TypeScript                           |
| `pnpm run test:e2e`  | Playwright functional tests          |

## Quality gate (before PR)

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run build
```

CV data lives in `content/gabor-pichner.yaml` — edit it and rebuild.

## Docker (optional)

```bash
# Requires a running Docker daemon
docker compose up --build
# → http://localhost:8000
```

Uses the root `Dockerfile` (Next.js build inside Docker + nginx with gzip).

## Documentation

- [docs/README.md](./docs/README.md) — human docs index
- [docs/.ai/README.md](./docs/.ai/README.md) — agent entry point
- [AGENTS.md](./AGENTS.md) — agent roles and rules

## Stack

Next.js App Router · shadcn/ui · YAML content · static export · Playwright ·
Lighthouse · semantic-release

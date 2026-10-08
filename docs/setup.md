# Local development environment

> Agent workflow:
> [`.ai/workflows/local-setup.md`](./.ai/workflows/local-setup.md)

## Prerequisites

| Tool    | Version / notes                           |
| ------- | ----------------------------------------- |
| Node.js | ≥ 24.21.0 (`.nvmrc`: `24.21.0`)           |
| pnpm    | 12.x (`packageManager` in `package.json`) |
| Docker  | Optional, for the production image        |

```bash
nvm use    # if nvm is installed
node -v    # verify
pnpm -v
```

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

| Command                    | Purpose                             |
| -------------------------- | ----------------------------------- |
| `pnpm run dev`             | Dev server (Turbopack)              |
| `pnpm run build`           | Static export → `out/`              |
| `pnpm run generate`        | Alias for `build` (CI)              |
| `pnpm run lint`            | ESLint                              |
| `pnpm run typecheck`       | TypeScript                          |
| `pnpm run test:e2e`        | Playwright (builds + serves `out/`) |
| `pnpm run test:e2e:visual` | Percy visual regression             |

## Quality gate (before PR)

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run build
```

## Editing CV content

1. Edit `content/gabor-pichner.yaml`.
2. Refresh the dev server (restart `pnpm run dev` if it does not pick up the
   change).

Details: [content.md](./content.md)

## Docker (optional)

```bash
docker compose up --build
# → http://localhost:8000
```

Uses the root `Dockerfile` (Next.js build inside Docker + nginx). Requires
Docker running.

## Common issues

| Issue                 | Fix                                          |
| --------------------- | -------------------------------------------- |
| Node version mismatch | `nvm use` or Node ≥ 24.21                    |
| `Invalid CV profile`  | Check `content/<slug>.yaml` has all sections |
| Port 3000 in use      | Stop other `next dev` or use another port    |
| Percy fails locally   | Set `PERCY_TOKEN`                            |

## Setup checklist

- [ ] `node -v` ≥ 24.21.0
- [ ] `pnpm install` succeeds
- [ ] `pnpm run dev` → CV loads at `/` and `/hu`
- [ ] `pnpm run lint && pnpm run typecheck && pnpm run build` passes

# Local development environment

> Agent workflow:
> [`.ai/workflows/local-setup.md`](./.ai/workflows/local-setup.md)

## Prerequisites

| Tool    | Version / notes                           |
| ------- | ----------------------------------------- |
| Node.js | ≥ 24.18.0 (`.nvmrc`: `24.18.0`)           |
| pnpm    | 10.x (`packageManager` in `package.json`) |
| Docker  | For local Supabase (`supabase start`)     |

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
pnpm exec supabase start
pnpm run db:seed
pnpm run dev
# → http://localhost:3000
```

## Common commands

| Command                                                  | Purpose                             |
| -------------------------------------------------------- | ----------------------------------- |
| `pnpm run dev`                                           | Dev server (Turbopack)              |
| `pnpm run build`                                         | Static export → `out/`              |
| `pnpm run generate`                                      | Alias for `build` (CI)              |
| `pnpm run lint`                                          | ESLint                              |
| `pnpm run typecheck`                                     | TypeScript                          |
| `pnpm run test:e2e`                                      | Playwright (builds + serves `out/`) |
| `pnpm run test:e2e:visual`                               | Percy visual regression             |
| `pnpm run db:start` / `db:stop` / `db:reset` / `db:seed` | Local Supabase                      |
| `pnpm run db:types`                                      | Regenerate `lib/supabase/types.ts`  |

## Quality gate (before PR)

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run build
```

Requires Supabase running locally or valid env vars in `.env.local`.

## Editing CV content

1. Edit `content/gabor-pichner.yaml`.
2. Reseed: `pnpm run db:seed`.
3. Refresh dev server (or restart `pnpm run dev`).

Details: [content.md](./content.md)

## Docker (optional)

```bash
bash scripts/prepare-supabase-for-build.sh
docker compose up --build
# → http://localhost:8000
```

Uses the root `Dockerfile` (Next.js build inside Docker + nginx). Requires
`.env.local` with `SUPABASE_*` and Docker running.

## Common issues

| Issue                  | Fix                                                      |
| ---------------------- | -------------------------------------------------------- |
| Node version mismatch  | `nvm use` or Node ≥ 24.18                                |
| `Missing SUPABASE_URL` | Copy `.env.example` → `.env.local`; run `supabase start` |
| Empty CV / fetch error | `pnpm run db:seed` after `db:reset`                      |
| Port 3000 in use       | Stop other `next dev` or use another port                |
| Percy fails locally    | Set `PERCY_TOKEN`                                        |

## Setup checklist

- [ ] `node -v` ≥ 24.18.0
- [ ] `pnpm install` succeeds
- [ ] `supabase start` + `pnpm run db:seed`
- [ ] `pnpm run dev` → CV loads at `/` and `/hu`
- [ ] `pnpm run lint && pnpm run typecheck && pnpm run build` passes

# Local development environment

> Agent workflow:
> [`.ai/workflows/local-setup.md`](./.ai/workflows/local-setup.md)

## Prerequisites

| Tool    | Version / notes                  |
| ------- | -------------------------------- |
| Node.js | ≥ 24.18.0 (`.nvmrc`: `24.18.0`)  |
| npm     | Project uses `package-lock.json` |

```bash
nvm use    # if nvm is installed
node -v    # verify
```

## First-time setup

```bash
git clone https://github.com/95gabor/cv.git
cd cv
npm ci
npm run dev
# → http://localhost:3000
```

## Common commands

| Command                     | Purpose                                          |
| --------------------------- | ------------------------------------------------ |
| `npm run dev`               | Dev server with hot reload                       |
| `npm run build`             | Production build                                 |
| `npm run generate`          | Static site generation (`.output/public`)        |
| `npm run preview`           | Preview production build                         |
| `npm run lint` / `lint:fix` | ESLint                                           |
| `npm run typecheck`         | Vue/TS type checking                             |
| `npm run format`            | Prettier                                         |
| `npm run test:e2e`          | Playwright functional tests                      |
| `npm run test:e2e:ui`       | Playwright interactive UI                        |
| `npm run test:e2e:visual`   | Percy visual regression (requires token locally) |
| `npm run storybook`         | UI components in Storybook (`:6006`)             |
| `npm run commit`            | Commitizen (Conventional Commits)                |

## Quality gate (before PR)

```bash
npm ci
npm run lint
npm run typecheck
npm run generate
```

## Editing CV content

1. Edit `content/gabor-pichner.yaml` (or the CV file set in `config.ts`).
2. The dev server hot-reloads content automatically.
3. Details: [content.md](./content.md)

## Docker (optional)

```bash
docker compose up --build
# → http://localhost:8000
```

## Common issues

| Issue                                   | Fix                                                              |
| --------------------------------------- | ---------------------------------------------------------------- |
| Node version mismatch                   | `nvm use` or Node ≥ 24.18                                        |
| `Another Nuxt build is already running` | Stop the parallel build, or `NUXT_IGNORE_LOCK=1`                 |
| YAML validation error on build          | Check schema: `app/types/cv.ts`, example: `content/example.yaml` |
| Percy visual test fails locally         | `PERCY_TOKEN` env var required                                   |

## Setup checklist

- [ ] `node -v` ≥ 24.18.0
- [ ] `npm ci` succeeds
- [ ] `npm run dev` → page loads
- [ ] `npm run lint && npm run typecheck && npm run generate` passes

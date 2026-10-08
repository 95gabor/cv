# Workflow: local setup

Human guide: [`../../setup.md`](../../setup.md)

## Steps

```bash
cd /path/to/cv
nvm use                    # Node 24.21.0
pnpm install
cp .env.example .env.local
pnpm run dev               # http://localhost:3000
```

## Verify

| Check        | Expected                              |
| ------------ | ------------------------------------- |
| Dev server   | CV loads with header, sections, chips |
| `/hu`        | Hungarian UI + localized CV text      |
| Theme toggle | Light/dark switch persists            |
| Print button | Opens browser print dialog            |

## Quality gate (optional on setup)

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```

## Report back

- Node / pnpm versions
- Whether the dev server started
- Any errors from install or build

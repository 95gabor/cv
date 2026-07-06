# Workflow: local setup

Human guide: [`../../setup.md`](../../setup.md)

## Steps

```bash
cd /path/to/cv
nvm use                    # Node 24.18.0
npm ci
npm run dev                # http://localhost:3000
```

## Verify

| Check             | Expected                           |
| ----------------- | ---------------------------------- |
| Dev server        | Page loads with CV content         |
| No console errors | Clean browser console              |
| Language switch   | `/hu` shows Hungarian UI + content |

## Quality gate (optional on setup)

```bash
npm run lint
npm run typecheck
npm run generate
```

## Report back

- Node version used
- Whether dev server started
- Any errors from install or generate

# Workflow: run and verify

## Quality gate (default)

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run build
```

| Check     | Pass criteria                                        |
| --------- | ---------------------------------------------------- |
| Lint      | Exit 0                                               |
| Typecheck | Exit 0                                               |
| Build     | Static output in `out/`, sitemap + robots + llms.txt |

Requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (local Supabase or CI).

## E2E (when UI/routing changed)

```bash
pnpm run test:e2e
```

Playwright runs `scripts/prepare-static-site.sh` then serves `out/` on
port 4173.

## Visual regression (when layout/styles changed)

```bash
# Requires PERCY_TOKEN
pnpm run test:e2e:visual
```

## Report back to user

Include:

- Commands run
- Pass/fail per check
- Relevant error excerpt if failed

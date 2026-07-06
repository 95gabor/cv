# Workflow: release

Human reference: root `release.config.mjs`, `.github/workflows/release.yaml`,
`.github/workflows/publish.yaml`.

## Semantic release (manual)

```bash
pnpm run release
```

Requires `RELEASE_BOT_GITHUB_TOKEN` and semantic-release devDependencies.

Updates `CHANGELOG.md`, `package.json`, `pnpm-lock.yaml`, creates GitHub
release.

## Tag publish (`v*`)

Push a version tag to trigger `publish.yaml`:

1. **Supabase migrations** — `supabase-push-prod.sh` (`link` + `db push` on
   cloud)
2. **GitHub Pages** — `prepare-static-site-prod.sh` → upload `out/` (prod data)
3. **GHCR Docker** — `Dockerfile` build with prod `SUPABASE_*` secrets

Required for publish: **secret** `SUPABASE_DB_URL`; **variables**
`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`. Seed uses `SUPABASE_SECRET_KEY`
locally only.

Seed prod content **before** tagging if CV data changed (migrations do not
seed):

```bash
export SUPABASE_URL=https://<ref>.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=<service role>
pnpm run db:seed
git tag v3.x.x && git push origin v3.x.x
```

## Pre-release verify

```bash
pnpm run lint && pnpm run typecheck && pnpm run build
pnpm run test:e2e
```

Preview static output:

```bash
npx http-server out -p 4173
```

Preview Docker image (local Supabase):

```bash
bash scripts/prepare-supabase-for-build.sh
docker compose up --build
# → http://localhost:8000
```

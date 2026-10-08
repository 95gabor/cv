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

`publish.yaml` runs on every `v*` tag. **Do not push tags manually** — use the
Release workflow (see above); semantic-release creates the tag and GitHub
release, which triggers publish.

1. **GitHub Pages** — `pnpm run generate` → upload `out/`
2. **GHCR Docker** — `Dockerfile` build (CV data comes from committed YAML)

No CV data secrets are required. Commit YAML changes before running Release.

## Pre-release verify

```bash
pnpm run lint && pnpm run typecheck && pnpm run build
pnpm run test:e2e
```

Preview static output:

```bash
npx http-server out -p 4173
```

Preview Docker image:

```bash
docker compose up --build
# → http://localhost:8000
```

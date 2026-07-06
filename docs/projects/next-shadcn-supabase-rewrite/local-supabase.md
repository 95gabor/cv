# Local Supabase — self-hosted dev stack

## Decision

| Environment         | Supabase                                            | Purpose                                  |
| ------------------- | --------------------------------------------------- | ---------------------------------------- |
| **Local dev**       | **Self-hosted** via Supabase CLI (`supabase start`) | Schema, seed, editor dev, offline builds |
| **CI / production** | **Supabase Cloud** project                          | Build fetch, webhooks → GitHub deploy    |

Local stack runs in **Docker** on the developer machine — same Postgres + Auth +
Storage APIs as cloud, without hitting a remote project during day-to-day work.

Production self-hosting (own VPS/K8s) is **out of scope** for v1; cloud Supabase
for staging/prod.

## Architecture

```mermaid
flowchart TB
    subgraph local [Local machine]
        CLI[Supabase CLI]
        Docker[Docker Compose]
        CLI --> Docker
        Docker --> PG[(Postgres :54322)]
        Docker --> Studio[Studio :54323]
        Docker --> API[Kong API :54321]
        NextDev[pnpm dev / build]
        NextDev -->|SUPABASE_URL local| API
    end

    subgraph cloud [Supabase Cloud]
        CloudPG[(Postgres)]
        WH[Database Webhook]
    end

    subgraph ci [GitHub Actions]
        Build[pnpm run build]
        WH -->|repository_dispatch| Build
        Build -->|SUPABASE_URL cloud| CloudPG
    end
```

## Prerequisites

| Tool         | Notes                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------- |
| Docker       | Running daemon (Docker Desktop or colima)                                                     |
| Supabase CLI | `brew install supabase/tap/supabase` or [install guide](https://supabase.com/docs/guides/cli) |
| Node.js      | ≥ 24 (Next build)                                                                             |
| pnpm         | see project brief                                                                             |

## Repo layout

```
supabase/
├── config.toml          # CLI config (ports, auth, storage)
├── migrations/          # SQL migrations (schema)
├── seed.sql             # optional seed (or scripts/seed.ts)
└── .gitignore           # ignore .branches, temp — commit migrations + seed
```

`config.toml` and migrations are **version-controlled**. Local data is ephemeral
(`db reset`).

## Quick start

```bash
# once per machine
supabase login          # only needed for link/deploy to cloud

# in repo root (v2 branch)
supabase init           # if not already present
supabase start          # pulls images, starts stack

supabase status         # prints API URL, keys, Studio URL
```

Typical local URLs (default):

| Service  | URL                                                       |
| -------- | --------------------------------------------------------- |
| API      | `http://127.0.0.1:54321`                                  |
| Studio   | `http://127.0.0.1:54323`                                  |
| Postgres | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |

## Environment files

```bash
# .env.local (gitignored) — local self-hosted
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=<from supabase status>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
# CI / production — Supabase Cloud (GitHub Secrets)
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<cloud service role>
NEXT_PUBLIC_SITE_URL=https://95gabor.me
```

Never commit service role keys. Add `.env.local` to `.gitignore`.

### Example `package.json` scripts

```json
{
  "scripts": {
    "db:start": "supabase start",
    "db:stop": "supabase stop",
    "db:reset": "supabase db reset",
    "db:status": "supabase status",
    "db:types": "supabase gen types typescript --local > lib/supabase/types.ts"
  }
}
```

## Workflow

### Schema changes

```bash
supabase migration new create_cv_tables
# edit supabase/migrations/<timestamp>_create_cv_tables.sql
supabase db reset              # apply migrations + seed locally
pnpm run db:types              # regenerate TS types
```

### Seed from YAML

```bash
pnpm run db:seed               # custom script: content/gabor-pichner.yaml → SQL insert
supabase db reset              # or rely on seed.sql
```

### Next.js dev / build against local Supabase

```bash
supabase start
pnpm run dev                   # fetch uses .env.local → local API
pnpm run build                 # verify static build with local data
```

Build-time fetch is identical — only `SUPABASE_URL` and key change.

## Studio (local CMS preview)

Open **Studio** (`http://127.0.0.1:54323`) to browse/edit tables before the CV
Editor UI exists.

Useful for:

- Verifying seed data structure
- Manual content edits during development
- Testing RLS policies

## Webhooks — local vs cloud

|                           | Local self-hosted                          | Cloud              |
| ------------------------- | ------------------------------------------ | ------------------ |
| Database Webhook → GitHub | ❌ Not practical (localhost not reachable) | ✅ Production path |
| Rebuild after edit        | Manual: `pnpm run build` or push to cloud  | Auto via webhook   |

Local content changes do **not** trigger GitHub deploy. That is expected.

Optional: after editing locally, `supabase db push` or seed export to sync cloud
— document when staging project exists.

## Linking local to cloud (optional)

When a cloud project exists:

```bash
supabase link --project-ref <ref>
supabase db push             # push migrations to cloud
supabase db pull             # pull remote schema (careful)
```

Use **migrations in git** as source of truth; avoid `db pull` overwriting
intentional schema.

## Storage (local)

`supabase start` includes local Storage. Bucket `cv-assets` defined in migration
or Studio.

For dev, avatar paths can point to:

- `http://127.0.0.1:54321/storage/v1/object/public/cv-assets/...`, or
- `public/` static files until Storage upload is wired

## CI

GitHub Actions use **cloud** Supabase secrets only — not local stack.

Playwright / Lighthouse CI can use:

- Mocked fetch (fast), or
- Cloud staging read-only project, or
- Pre-seeded build without live Supabase (fixture JSON) — decide in Phase 5

## Troubleshooting

| Issue                  | Fix                                     |
| ---------------------- | --------------------------------------- |
| `supabase start` fails | Docker running? Port 54321–54323 free?  |
| Stale schema           | `supabase db reset`                     |
| Wrong API URL in build | Check `.env.local` vs `.env.production` |
| Types out of sync      | `pnpm run db:types` after migration     |

## Related

- [supabase-schema.md](./supabase-schema.md) — table design
- [deploy.md](./deploy.md) — cloud webhooks + GitHub Pages
- [phases.md](./phases.md) — Phase 2 tasks

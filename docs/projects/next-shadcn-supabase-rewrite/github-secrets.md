# GitHub Secrets — production Supabase + publish

Minimal setup for `publish.yaml` (`v*` tag). CI (`ci.yaml`) uses local Supabase
only — no cloud credentials.

## Setup: 3 repository secrets (works)

All three can live under
[Settings → Secrets → Actions](https://github.com/95gabor/cv/settings/secrets/actions):

| Name                       | Risk                       | Purpose              |
| -------------------------- | -------------------------- | -------------------- |
| `SUPABASE_DB_URL`          | **High** — direct Postgres | `db push` on release |
| `SUPABASE_URL`             | Low — public API URL       | Static build fetch   |
| `SUPABASE_PUBLISHABLE_KEY` | Low — RLS read only        | Static build fetch   |

`publish.yaml` reads URL and publishable key from **secrets first**, then falls
back to repository **variables** if you move them later.

**Optional:** `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` may be
[repository variables](https://github.com/95gabor/cv/settings/variables/actions)
instead of secrets — they are not sensitive. One secret (`SUPABASE_DB_URL`) is
enough for security; the other two as secrets is fine if you prefer one place to
configure.

**Not in GitHub:** `SUPABASE_SECRET_KEY` — seed writes only; keep in
`.env.local`.

---

## Why not 5 secrets?

| Old secret                 | Still needed?   | Replacement                                                               |
| -------------------------- | --------------- | ------------------------------------------------------------------------- |
| `SUPABASE_ACCESS_TOKEN`    | **No**          | Account-level token; replaced by `SUPABASE_DB_URL` for `db push --db-url` |
| `SUPABASE_PROJECT_REF`     | **No**          | Derivable from `SUPABASE_URL` if ever needed locally                      |
| `SUPABASE_DB_PASSWORD`     | **No**          | Embedded in `SUPABASE_DB_URL`                                             |
| `SUPABASE_URL`             | Yes             | Secret **or** variable (public URL)                                       |
| `SUPABASE_PUBLISHABLE_KEY` | Yes             | Secret **or** variable (RLS read)                                         |
| `SUPABASE_SECRET_KEY`      | Never in GitHub | Local seed only                                                           |

Publishable key and project URL are low-risk; variables are enough, but storing
them as secrets (all in one place) works the same in CI.

---

## Checklist

| #   | Name                       | Where              | Got it? |
| --- | -------------------------- | ------------------ | ------- |
| 1   | `SUPABASE_DB_URL`          | Secret             | ☐       |
| 2   | `SUPABASE_URL`             | Secret or variable | ☐       |
| 3   | `SUPABASE_PUBLISHABLE_KEY` | Secret or variable | ☐       |

Optional (other workflows):

| Name                       | Type   | Usage                         |
| -------------------------- | ------ | ----------------------------- |
| `PERCY_TOKEN`              | Secret | Visual regression (`ci.yaml`) |
| `RELEASE_BOT_GITHUB_TOKEN` | Secret | `release.yaml`                |

---

## Where to get each value

### `SUPABASE_DB_URL` (secret)

**What:** Direct Postgres connection URI for migrations.

**Where:**

1. [Supabase Dashboard](https://supabase.com/dashboard) → project → **Settings →
   Database**
2. **Connection string** → **URI** tab
3. Choose **Direct connection** (not pooler — safer for DDL / migrations)
4. Copy URI, replace `[YOUR-PASSWORD]` with your database password

Example shape:

```text
postgresql://postgres.[ref]:[password]@db.[ref].supabase.co:5432/postgres
```

Used only by `scripts/supabase-push-prod.sh` in CI. Never commit.

---

### `SUPABASE_URL` (secret or variable)

**What:** `https://<project-ref>.supabase.co`

**Where:** **Settings → API → Project URL**

---

### `SUPABASE_PUBLISHABLE_KEY` (secret or variable)

**What:** `sb_publishable_...` — read via RLS only.

**Where:** **Settings → API Keys → Publishable key**

If missing, click **Create new API keys** (legacy `anon` JWT still works locally
as fallback).

---

### Local seed only: `SUPABASE_SECRET_KEY`

**Where:** **Settings → API Keys → Secret keys**

For `pnpm run db:seed` — `.env.local` only.

---

## Local verify

```bash
# Migrate (same as CI)
export SUPABASE_DB_URL='postgresql://postgres.[ref]:[password]@db.[ref].supabase.co:5432/postgres'
pnpm exec supabase db push --db-url "$SUPABASE_DB_URL" --yes

# Seed + build
export SUPABASE_URL=https://<ref>.supabase.co
export SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
export SUPABASE_SECRET_KEY=sb_secret_...
pnpm run db:seed
pnpm run build
```

### Legacy local link (optional)

If you prefer `supabase link` without storing the full DB URL:

```bash
export SUPABASE_ACCESS_TOKEN=<account token>
export SUPABASE_PROJECT_REF=<ref>
export SUPABASE_DB_PASSWORD=<password>
bash scripts/supabase-push-prod.sh
```

---

## Release flow

```bash
# When YAML changed — seed prod first (local .env.local)
pnpm run db:seed

# Tag triggers: db push (secret) + build (variables) + deploy
git tag v3.x.x && git push origin v3.x.x
```

---

## Related

- [deploy.md](./deploy.md)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)

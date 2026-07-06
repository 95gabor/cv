#!/usr/bin/env bash
# Push migrations to production.
# Preferred (CI): SUPABASE_DB_URL — single direct Postgres URI, no CLI account token.
# Fallback (local): SUPABASE_ACCESS_TOKEN + SUPABASE_PROJECT_REF + SUPABASE_DB_PASSWORD
set -euo pipefail

if [[ -n "${SUPABASE_DB_URL:-}" ]]; then
  pnpm exec supabase db push --db-url "$SUPABASE_DB_URL" --yes
  exit 0
fi

: "${SUPABASE_ACCESS_TOKEN:?Set SUPABASE_DB_URL or SUPABASE_ACCESS_TOKEN}"
: "${SUPABASE_PROJECT_REF:?Set SUPABASE_DB_URL or SUPABASE_PROJECT_REF}"
: "${SUPABASE_DB_PASSWORD:?Set SUPABASE_DB_URL or SUPABASE_DB_PASSWORD}"

export SUPABASE_ACCESS_TOKEN

pnpm exec supabase link \
  --project-ref "$SUPABASE_PROJECT_REF" \
  --password "$SUPABASE_DB_PASSWORD" \
  --yes

pnpm exec supabase db push --linked --yes

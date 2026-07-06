#!/usr/bin/env bash
# Map `supabase status -o env` names to app env vars.
# Prefers new publishable/secret keys; falls back to legacy anon/service_role JWTs.
set -euo pipefail

eval "$(pnpm exec supabase status -o env)"

export SUPABASE_URL="${API_URL:?API_URL missing from supabase status}"
export SUPABASE_PUBLISHABLE_KEY="${PUBLISHABLE_KEY:-${ANON_KEY:-}}"
export SUPABASE_SECRET_KEY="${SECRET_KEY:-${SERVICE_ROLE_KEY:-}}"

if [[ -z "$SUPABASE_PUBLISHABLE_KEY" ]]; then
  echo "PUBLISHABLE_KEY or ANON_KEY missing from supabase status" >&2
  exit 1
fi

if [[ -z "$SUPABASE_SECRET_KEY" ]]; then
  echo "SECRET_KEY or SERVICE_ROLE_KEY missing from supabase status" >&2
  exit 1
fi

# Legacy aliases (seed/build fallbacks)
export SUPABASE_ANON_KEY="${ANON_KEY:-$SUPABASE_PUBLISHABLE_KEY}"
export SUPABASE_SERVICE_ROLE_KEY="${SERVICE_ROLE_KEY:-$SUPABASE_SECRET_KEY}"

if [[ "${GITHUB_ACTIONS:-}" == "true" ]]; then
  echo "::add-mask::${SUPABASE_PUBLISHABLE_KEY}"
  echo "::add-mask::${SUPABASE_SECRET_KEY}"
fi

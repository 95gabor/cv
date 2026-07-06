#!/usr/bin/env bash
# Write Supabase credentials to temp files for BuildKit secret mounts (no log leakage).
set -euo pipefail

if [[ -z "${SUPABASE_PUBLISHABLE_KEY:-}" ]]; then
  # shellcheck source=/dev/null
  source scripts/export-supabase-env.sh
fi

if [[ -n "${DOCKER_SUPABASE_URL:-}" ]]; then
  SUPABASE_URL="$DOCKER_SUPABASE_URL"
fi

: "${SUPABASE_URL:?SUPABASE_URL is required}"
: "${SUPABASE_PUBLISHABLE_KEY:?SUPABASE_PUBLISHABLE_KEY is required}"

if [[ "${GITHUB_ACTIONS:-}" == "true" ]]; then
  echo "::add-mask::${SUPABASE_PUBLISHABLE_KEY}"
  if [[ -n "${SUPABASE_SECRET_KEY:-}" ]]; then
    echo "::add-mask::${SUPABASE_SECRET_KEY}"
  fi
fi

secrets_dir="${RUNNER_TEMP:?RUNNER_TEMP is required}/docker-build-secrets"
mkdir -p "$secrets_dir"
chmod 700 "$secrets_dir"

printf '%s' "$SUPABASE_URL" >"$secrets_dir/supabase_url"
printf '%s' "$SUPABASE_PUBLISHABLE_KEY" >"$secrets_dir/supabase_publishable_key"
chmod 600 "$secrets_dir"/*

{
  echo "supabase_url_file=$secrets_dir/supabase_url"
  echo "supabase_publishable_key_file=$secrets_dir/supabase_publishable_key"
} >>"${GITHUB_OUTPUT:?GITHUB_OUTPUT is required}"

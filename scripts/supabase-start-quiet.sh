#!/usr/bin/env bash
# Start local Supabase without printing keys to stdout (CI log hygiene).
set -euo pipefail

log="$(mktemp)"
trap 'rm -f "$log"' EXIT

if ! pnpm exec supabase start -x imgproxy,logflare,vector,edge-runtime >"$log" 2>&1; then
  echo "supabase start failed" >&2
  sed -E 's/(sb_publishable_|sb_secret_)[^ |│]*/\1***/g' "$log" >&2
  exit 1
fi

#!/usr/bin/env bash
# CI (ci.yaml): start local Supabase, seed, then generate.
# Publish (publish.yaml): use scripts/prepare-static-site-prod.sh with prod secrets.
set -euo pipefail

if [[ "${CI:-}" == "true" ]]; then
  pnpm exec supabase start -x imgproxy,logflare,vector,edge-runtime

  # shellcheck source=/dev/null
  source scripts/export-supabase-env.sh

  pnpm run db:seed
fi

pnpm run generate

#!/usr/bin/env bash
set -euo pipefail

pnpm exec supabase start -x imgproxy,logflare,vector,edge-runtime

# shellcheck source=/dev/null
source scripts/export-supabase-env.sh

pnpm run db:seed

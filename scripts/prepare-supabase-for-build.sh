#!/usr/bin/env bash
set -euo pipefail

bash scripts/supabase-start-quiet.sh

# shellcheck source=/dev/null
source scripts/export-supabase-env.sh

pnpm run db:seed

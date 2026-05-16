#!/usr/bin/env bash
set -euo pipefail

if [ "${EVENT_NAME:-}" = "pull_request" ]; then
  echo "base_sha=${PR_BASE_SHA}" >> "$GITHUB_OUTPUT"
  echo "head_sha=${PR_HEAD_SHA}" >> "$GITHUB_OUTPUT"
  exit 0
fi

echo "base_sha=${BEFORE_SHA}" >> "$GITHUB_OUTPUT"
echo "head_sha=${CURRENT_SHA}" >> "$GITHUB_OUTPUT"

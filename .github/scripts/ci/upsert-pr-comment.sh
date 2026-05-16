#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "${COMMENT_BODY_FILE}" ]; then
  echo "Comment body file not found: ${COMMENT_BODY_FILE}" >&2
  exit 1
fi

existing_comment_id="$(
  gh api "repos/${GITHUB_REPOSITORY}/issues/${ISSUE_NUMBER}/comments?per_page=100" \
    --jq "[.[] | select(.user.login == \"github-actions[bot]\" and (.body | contains(\"${COMMENT_MARKER}\")))] | .[0].id // \"\""
)"

comment_body="$(<"${COMMENT_BODY_FILE}")"

if [ -n "${existing_comment_id}" ]; then
  gh api \
    --method PATCH \
    "repos/${GITHUB_REPOSITORY}/issues/comments/${existing_comment_id}" \
    -f body="${comment_body}" \
    >/dev/null
  exit 0
fi

gh api \
  --method POST \
  "repos/${GITHUB_REPOSITORY}/issues/${ISSUE_NUMBER}/comments" \
  -f body="${comment_body}" \
  >/dev/null

#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "${SCREENSHOT_FILE}" ]; then
  echo "Missing screenshot file: ${SCREENSHOT_FILE}" >&2
  exit 1
fi

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

worktree_dir="$(mktemp -d)"
cleanup() {
  if [ -n "${worktree_dir:-}" ] && [ -d "${worktree_dir}" ]; then
    git worktree remove "${worktree_dir}" --force >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

if git ls-remote --exit-code --heads origin "${TARGET_BRANCH}" >/dev/null 2>&1; then
  git fetch origin "${TARGET_BRANCH}:${TARGET_BRANCH}"
  git worktree add "${worktree_dir}" "${TARGET_BRANCH}"
else
  git worktree add -b "${TARGET_BRANCH}" "${worktree_dir}"
fi

target_path="pr-${PR_NUMBER}/cv-full-page.png"
mkdir -p "${worktree_dir}/pr-${PR_NUMBER}"
cp "${SCREENSHOT_FILE}" "${worktree_dir}/${target_path}"

cd "${worktree_dir}"
git add "${target_path}"
if git diff --cached --quiet; then
  echo "Screenshot unchanged; skipping commit."
else
  git commit -m "chore: update screenshot for PR #${PR_NUMBER}"
  max_attempts=3
  attempt=1
  while [ "${attempt}" -le "${max_attempts}" ]; do
    if git push origin "HEAD:${TARGET_BRANCH}"; then
      break
    fi

    if [ "${attempt}" -eq "${max_attempts}" ]; then
      echo "Failed to push screenshot branch after retries." >&2
      exit 1
    fi

    echo "Push failed; rebasing and retrying..."
    git fetch origin "${TARGET_BRANCH}"
    git pull --rebase origin "${TARGET_BRANCH}"
    attempt=$((attempt + 1))
  done
fi

echo "screenshot_url=https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${TARGET_BRANCH}/pr-${PR_NUMBER}/cv-full-page.png?run=${GITHUB_RUN_ID}" >> "$GITHUB_OUTPUT"

#!/usr/bin/env bash
set -euo pipefail

comment_body_file="${COMMENT_BODY_FILE:-pr-screenshot-comment.md}"

cat > "${comment_body_file}" <<EOF
<!-- pr-full-page-screenshot -->
### Latest full-page screenshot
![Full-page PR screenshot](${SCREENSHOT_URL})
EOF

#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

npm install

if [ -z "${COMPOSIO_API_KEY:-}" ]; then
  echo "Warning: COMPOSIO_API_KEY is not set. Configure it as an environment secret for this Claude Code on the web environment so Composio can authenticate." >&2
fi

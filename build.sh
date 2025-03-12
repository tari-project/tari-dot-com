#!/bin/bash
set -ex

set -a
if [ "$CF_PAGES_BRANCH" == "prod" ]; then
  source .env.prod
elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  source .env.staging
elif [ "$CF_PAGES_BRANCH" == "dev" ]; then
  source .env.dev
else
  # Convert any slashes in branch name to hyphens for URL compatibility
  BRANCH_URL=${CF_PAGES_BRANCH//\//-}
  export NEXT_PUBLIC_BASE_URL="https://$BRANCH_URL.tari-dot-com-2025.pages.dev"
  source .env.dev
fi
set +a

npx @cloudflare/next-on-pages@1

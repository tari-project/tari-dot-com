#!/bin/bash
set -ex

# Resolve the deploy branch across Cloudflare build environments:
# - CF_PAGES_BRANCH: set by Cloudflare Pages builds (legacy)
# - WORKERS_CI_BRANCH: set by Cloudflare Workers Builds
# - GIT_BRANCH / fallback to `git rev-parse`: local or generic CI
BRANCH="${CF_PAGES_BRANCH:-${WORKERS_CI_BRANCH:-${GIT_BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")}}}"

set -a
if [ "$BRANCH" == "prod" ]; then
  source .env.prod
elif [ "$BRANCH" == "staging" ]; then
  source .env.staging
elif [ "$BRANCH" == "dev" ]; then
  source .env.dev
else
  # Convert any slashes in branch name to hyphens for URL compatibility
  BRANCH_URL=${BRANCH//\//-}
  export NEXT_PUBLIC_BASE_URL="https://$BRANCH_URL.tari-dot-com-2025.pages.dev"
  source .env.dev
fi
set +a

npm run prebuild-all
npx opennextjs-cloudflare build

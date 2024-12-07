#!/usr/bin/env bash

echo "Copying wordlists ..."
find wordlist/ordle \
  -mindepth 1 \
  -maxdepth 1 \
  -type d \
  -exec cp -Rv {} public/ \; \
|| exit $?

npm ci
npm run build || exit $?

echo "ordle-app.no" > dist/CNAME
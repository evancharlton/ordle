#!/usr/bin/env zsh

echo "Copying wordlists ..."
find wordlist/ordle \
  -mindepth 1 \
  -maxdepth 1 \
  -type d \
  -exec cp -Rv {} public/ \; \
|| exit $?

npm run build || exit $?

echo "ordle-app.no" > dist/CNAME
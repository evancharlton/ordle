#!/usr/bin/env bash

echo "Copying wordlists ..."
find wordlist/ordle \
  -mindepth 1 \
  -maxdepth 1 \
  -type d \
  -exec cp -Rv {} public/ \; \
|| exit $?

rm -rf public/nb && cp -Rv public/nb-no public/nb
rm -rf public/nn && cp -Rv public/nn-no public/nn

npm ci
npm run build || exit $?

echo "ordle-app.no" > dist/CNAME
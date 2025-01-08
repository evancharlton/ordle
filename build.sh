#!/usr/bin/env bash

npm ci
npm run build || exit $?

echo "ordle-app.no" > dist/CNAME
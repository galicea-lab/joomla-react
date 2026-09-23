#!/usr/bin/env sh
# Buduje tailwind-base.css z src/styles/globals.css do templates/<nazwa>/assets/css/.
# Wywołanie: bash scripts/build-assets.sh [--watch]
set -e
cd "$(dirname "$0")/.."

NAME=$(./scripts/template-name.sh)
OUT="templates/$NAME/assets/css/tailwind-base.css"
TAILWIND="node_modules/.bin/tailwindcss"

mkdir -p "templates/$NAME/assets/css"

if [ "$1" = "--watch" ]; then
  exec "$TAILWIND" -i ./src/styles/globals.css -o "$OUT" --watch
else
  "$TAILWIND" -i ./src/styles/globals.css -o "$OUT" --minify
fi
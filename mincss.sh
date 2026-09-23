#!/usr/bin/env bash
# Minimalizacja CSS szablonu (wymaga podbicia wersji w templateDetails.xml — patrz all.sh)
set -euo pipefail
cd "$(dirname "$0")"

NAME=$(./scripts/template-name.sh)

cd "templates/$NAME"
esbuild template.css --minify --outfile=template.min.css
esbuild menu.css --minify --outfile=menu.min.css
esbuild footer.css --minify --outfile=footer.min.css
cd -
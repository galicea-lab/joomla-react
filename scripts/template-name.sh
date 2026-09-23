#!/usr/bin/env sh
# Jedyne źródło prawdy dla nazwy szablonu (templates/<nazwa>) — pole "name" w package.json.
# Użycie: NAME=$(./scripts/template-name.sh)
cd "$(dirname "$0")/.."
node -p "require('./package.json').name"
#!/usr/bin/env bash
# Pakuje szablon templates/<nazwa>/ do setup/<nazwa>.zip
set -euo pipefail
cd "$(dirname "$0")"

NAME=$(./scripts/template-name.sh)

cd "templates/$NAME"
zip -r "$NAME.zip" *
mv "$NAME.zip" ../../setup

echo "Plik instalacyjny: setup/$NAME.zip"
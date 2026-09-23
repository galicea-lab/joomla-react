#!/usr/bin/env bash
# Pełna pętla budowania szablonu:
#   ./all.sh [nowa_nazwa]
#
# 1) rename szablonu (opcjonalnie), 2) podbicie wersji, 3) build, 4) mincss, 5) zip
set -euo pipefail
cd "$(dirname "$0")"

if [ "${1:-}" ]; then
  ./new-template.sh "$1"
fi

NAME=$(./scripts/template-name.sh)

echo "=== [$NAME] podbicie wersji (patch) w templates/$NAME/templateDetails.xml ==="
./scripts/bump-version.sh

echo "=== [$NAME] build.sh ==="
./build.sh

echo "=== [$NAME] mincss.sh ==="
./mincss.sh

echo "=== [$NAME] setup.sh (zip) ==="
./setup.sh

echo
echo "Gotowe. Plik instalacyjny: setup/$NAME.zip"
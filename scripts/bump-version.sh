#!/usr/bin/env bash
# Podbija numer wersji (patch) w <version> pliku templates/<nazwa>/templateDetails.xml.
set -euo pipefail
cd "$(dirname "$0")/.."

NAME=$(./scripts/template-name.sh)
XML="templates/$NAME/templateDetails.xml"
[ -f "$XML" ] || { echo "Błąd: brak $XML"; exit 1; }

CUR=$(sed -n 's/.*<version>\([^<]*\)<\/version>.*/\1/p' "$XML")
NEWVER=$(printf '%s' "$CUR" | awk -F. '{
  if (NF >= 3) printf "%d.%d.%d", $1, $2, $3+1;
  else if (NF == 2) printf "%d.%d.1", $1, $2;
  else printf "%s.0.1", $1;
}')

sed -i "s|<version>$CUR</version>|<version>$NEWVER</version>|" "$XML"
echo "Wersja $CUR -> $NEWVER"
#!/usr/bin/env bash
# Zmienia nazwę szablonu w miejscu (rename + parametryzacja-ready).
#
#   ./new-template.sh <nowa_nazwa>
#
# Gdzie nazwa jest aktualna, tam brana jest z package.json (scripts/template-name.sh).
# Treść brandowa ("My oed Jarosławia", kontakt@myoed.org.pl, "OED - szablon witryny")
# jest zastępowana placeholderem [do uzupełnienia].
set -euo pipefail
cd "$(dirname "$0")"

NEW="${1:-}"
if [ -z "$NEW" ]; then
  echo "Użycie: $0 <nowa_nazwa>" >&2
  exit 1
fi
if ! printf '%s' "$NEW" | grep -Eq '^[a-z][a-z0-9-]*$'; then
  echo "Błąd: nazwa '$NEW' musi pasować do wzorca ^[a-z][a-z0-9-]*$ (małe litery/cyfry/myślnik)." >&2
  exit 1
fi

OLD=$(./scripts/template-name.sh)
[ -n "$OLD" ] || { echo "Błąd: nie udało się odczytać nazwy z package.json." >&2; exit 1; }

if [ "$NEW" = "$OLD" ]; then
  echo "OK: nazwa jest już '$NEW' — brak zmian."
  exit 0
fi
if [ -e "templates/$NEW" ]; then
  echo "Błąd: templates/$NEW już istnieje — usuń lub wybierz inną nazwę." >&2
  exit 1
fi

UPNEW=$(printf '%s' "$NEW" | tr '[:lower:]' '[:upper:]')
UPOLD=$(printf '%s' "$OLD" | tr '[:lower:]' '[:upper:]')

echo "1/6  Domykanie artefaktów (odnowienie clean build)..."
rm -R -f .next out "setup/$OLD.zip" "templates/$OLD/assets" "templates/$OLD/index.php"

echo "2/6  Rename katalogu: templates/$OLD -> templates/$NEW"
mv "templates/$OLD" "templates/$NEW"

echo "3/6  Rename plików językowych tpl_$OLD.* -> tpl_$NEW.*"
for lang in en-GB pl-PL; do
  for ext in ini sys.ini; do
    src="templates/$NEW/language/$lang/tpl_$OLD.$ext"
    dst="templates/$NEW/language/$lang/tpl_$NEW.$ext"
    if [ -f "$src" ]; then
      mv "$src" "$dst"
      echo "      $src -> $dst"
    fi
  done
done

echo "4/6  Podmiana nazwy w plikach technicznych..."
# package.json — nazwa wg której działają wszystkie skrypty
sed -i "s/\"name\": \"$OLD\"/\"name\": \"$NEW\"/" package.json

# templateDetails.xml — <name>, odnośniki językowe, treść brandowa
XML="templates/$NEW/templateDetails.xml"
sed -i \
  -e "s|<name>$OLD</name>|<name>$NEW</name>|" \
  -e "s|tpl_${OLD}|tpl_${NEW}|g" \
  -e "s|kontakt@myoed.org.pl|[do uzupełnienia]|" \
  "$XML"

# index.tmpl — komentarz nagłówkowy (brzmi aktualnie "Szablon $OLD")
sed -i "s|Szablon $OLD|Szablon $NEW|" "templates/$NEW/index.tmpl"

echo "5/6  Klucze językowe TPL_${UPNEW}* i placeholdery w plikach INI..."
for f in "templates/$NEW"/language/*/"tpl_$NEW".ini "templates/$NEW"/language/*/"tpl_$NEW".sys.ini; do
  [ -f "$f" ] || continue
  sed -i \
    -e "s|${UPOLD} - szablon witryny|[do uzupełnienia]|g" \
    -e "s|${UPOLD} - Template|[do uzupełnienia]|g" \
    -e "s|TPL_${UPOLD}_|TPL_${UPNEW}_|g" \
    -e "s|^${UPOLD}_|${UPNEW}_|" \
    -e "s|^${UPOLD}=|${UPNEW}=|" \
    "$f"
done

echo "6/6  Placeholdery treści brandowej w komponentach React..."
sed -i 's|My oed Jarosławia|[do uzupełnienia]|g' "src/components/Home.tsx"
sed -i 's|My oed|[do uzupełnienia]|g' "src/components/Navbar.tsx"

echo
echo "Gotowe. Nazwa szablonu: $OLD -> $NEW"
echo "Wartości do uzupełnienia (placeholder [do uzupełnienia]) znajdziesz w:"
echo "  - src/components/Home.tsx, src/components/Navbar.tsx"
echo "  - templates/$NEW/templateDetails.xml (Copyright_Text) i plikach language/*/*.ini"
echo "Następnie uruchom: ./all.sh  (build + wersja + mincss + zip)"
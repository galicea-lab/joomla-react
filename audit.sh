#!/bin/bash
# Wspolne wejscie do audytow projektu. Kazda opcja wywoluje odpowiedni audit*.sh.

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"/audit

declare -A LABELS=(
  [1]="package.json / depcheck (audit1.sh)"
  [2]="dostepne aktualizacje npm outdated (audit2upgr.sh)"
  [3]="podatnosci npm audit (audit2vol.sh)"
  [4]="npm fund / drzewo zaleznosci (audit3.sh)"
  [5]="zbedne pliki/exporty - knip (audit4.sh)"
)

declare -A SCRIPTS=(
  [1]="$DIR/audit1.sh"
  [2]="$DIR/audit2upgr.sh"
  [3]="$DIR/audit2vol.sh"
  [4]="$DIR/audit3.sh"
  [5]="$DIR/audit4.sh"
)

ORDER=(1 2 3 4 5)

run_check() {
  local key="$1"
  local script="${SCRIPTS[$key]}"
  if [ -z "$script" ]; then
    echo "Nieznana opcja: $key" >&2
    return 1
  fi
  echo
  echo "########## [$key] ${LABELS[$key]} ##########"
  bash "$script"
}

run_all() {
  for key in "${ORDER[@]}"; do
    run_check "$key"
  done
}

show_menu() {
  echo "Wybierz audyt (mozna podac kilka numerow oddzielonych spacja):"
  for key in "${ORDER[@]}"; do
    echo "  $key) ${LABELS[$key]}"
  done
  echo "  0) wszystko"
  echo "  q) wyjscie"
}

# Tryb nieinteraktywny: ./audit.sh 2 4   albo   ./audit.sh 0
if [ $# -ge 1 ]; then
  for arg in "$@"; do
    if [ "$arg" == "0" ] || [ "$arg" == "all" ]; then
      run_all
    else
      run_check "$arg"
    fi
  done
  exit 0
fi

show_menu
read -rp "> " -a choices

if [ "${#choices[@]}" -eq 0 ]; then
  exit 0
fi

for choice in "${choices[@]}"; do
  case "$choice" in
    q|Q) exit 0 ;;
    0) run_all ;;
    *) run_check "$choice" ;;
  esac
done

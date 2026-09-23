#!/usr/bin/env bash
# Instalacja do lokalnej instancji Joomla w dockerze (ścieżki hosta — do edycji).
set -euo pipefail
cd "$(dirname "$0")"

NAME=$(./scripts/template-name.sh)

# --- Ścieżki maszyny lokalnej (edytuj pod swoją konfigurację) ---
DOCKER_JOOMLA_TEMPLATES="/projekty/joomla/oed/docker/joomla/templates"
PROJECT_ROOT="$PWD"

cd "templates/$NAME"
./tmpl2php.py

cd "$DOCKER_JOOMLA_TEMPLATES"
sudo rm -R "$NAME"
sudo cp -p -R "$PROJECT_ROOT/templates/$NAME" .
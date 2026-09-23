#!/usr/bin/env bash
# Krok 1: budowa skompilowanego szablonu Next.js do templates/<nazwa>/
set -euo pipefail
cd "$(dirname "$0")"

NAME=$(./scripts/template-name.sh)

rm -R -f .next
TEMPLATE_NAME=$NAME yarn joomla:build:clean
cd "templates/$NAME"
./tmpl2php.py
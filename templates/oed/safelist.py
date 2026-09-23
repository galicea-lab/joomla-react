#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Analizuje index.php szablonu Joomla + Tailwind
i generuje gotową safelist do tailwind.config.js
"""

import re
import sys
from pathlib import Path

# -----------------------------
# Konfiguracja
# -----------------------------
FILE_PATH = Path("index.php")  # zmień jeśli plik jest gdzie indziej

# Wzorce do wyszukiwania klas (obsługuje class="..." i class='...')
CLASS_PATTERN = re.compile(r'class\s*=\s*["\']([^"\']*)["\']')

# Wzorce do wyciągania pojedynczych klas z ciągu (również w PHP echo)
SINGLE_CLASS_PATTERN = re.compile(r'\b([a-z][\w:\-]*)\b')

# Typowe prefiksy Joomla – jeśli się pojawią, zasugerujemy safelist całych grup
JOOMLA_PREFIXES = ['com-', 'mod-', 'page-', 'item-', 'category-', 'btn', 'alert-', 'form-', 'table-', 'breadcrumb']

def extract_classes_from_file(filepath):
    if not filepath.exists():
        print(f"Plik nie istnieje: {filepath}")
        sys.exit(1)

    content = filepath.read_text(encoding='utf-8')
    all_classes = set()

    # 1. Znajdź wszystkie atrybuty class="..."
    for match in CLASS_PATTERN.finditer(content):
        class_str = match.group(1)
        # Obsługa konknych składni: class="text-blue-600 <?php echo $var ?> md:flex"
        parts = re.split(r'\s+', class_str)
        for part in parts:
            # Rozbij po <?php ... ?> jeśli jest w środku
            clean_parts = re.split(r'<\?php.*?\?>', part)
            for cp in clean_parts:
                if cp.strip():
                    # Dodaj całe wyrażenie jeśli wygląda jak klasa Tailwind
                    if re.match(r'^[a-zA-Z][\w:\-]*$', cp.strip()):
                        all_classes.add(cp.strip())

        # Dodatkowe wyciągnięcie pojedyńczych klas (na wypadek echo("text-red-500"))
        for cls in SINGLE_CLASS_PATTERN.finditer(class_str):
            candidate = cls.group(1)
            if candidate and not candidate.startswith('<?') and candidate[0].isalpha():
                all_classes.add(candidate)

    return sorted(all_classes)

def detect_joomla_classes(classes):
    found = set()
    for cls in classes:
        for prefix in JOOMLA_PREFIXES:
            if cls.startswith(prefix):
                found.add(prefix.rstrip('-'))
                break
    return found

def generate_safelist(classes, joomla_prefixes):
    print("\nSafelist do wklejenia do tailwind.config.js\n")
    print("safelist: [")

    # 1. Pojedyncze klasy (jeśli ich dużo – lepiej grupować, ale na początek wszystkie)
    unique_classes = [c for c in classes if not any(c.startswith(p + '-') for p in joomla_prefixes)]
    for cls in unique_classes:
        print(f'    "{cls}",')

    # 2. Grupy Joomla – wzorce
    if joomla_prefixes:
        print("    // --- Grupy Joomla (zalecane) ---")
        for prefix in sorted(joomla_prefixes):
            print(f'    {{ pattern: /{prefix}-/ }},  // np. {prefix}-title, {prefix}__body itd.')

    # 3. Najczęściej używane stałe klasy Joomla
    print("    // --- Popularne klasy Joomla (dodaj jeśli używasz) ---")
    common = ['btn', 'btn-primary', 'btn-success', 'alert', 'alert-info', 'page-header', 'prose']
    for c in common:
        if c not in unique_classes:
            print(f'    // "{c}",')

    print("],")

if __name__ == "__main__":
    print(f"Analizuję plik: {FILE_PATH.resolve()}\n")
    classes = extract_classes_from_file(FILE_PATH)
    
    print(f"Znaleziono {len(classes)} unikalnych klas:\n")
    for c in classes:
        print(f"  • {c}")

    joomla_prefixes = detect_joomla_classes(classes)

    if joomla_prefixes:
        print(f"\nWykryto klasy Joomla z prefiksami: {', '.join(joomla_prefixes)}")

    generate_safelist(classes, joomla_prefixes)

    print("\nGotowe! Skopiuj sekcję `safelist` do tailwind.config.js")
    print("Po tym rebuilduj CSS – wszystkie klasy będą dostępne.")

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import os

def extract_parts(html_path):
    """
    Wczytuje plik index.html i wyodrębnia trzy części:
    - hdr: od pierwszego <link do </head>
    - content: od <body...> do ostatniego <script (bez tego <script)
    - script: cały ostatni blok <script> ... </script>
    """
    if not os.path.exists(html_path):
        raise FileNotFileFoundError(f"Nie znaleziono pliku: {html_path}")

    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. hdr: od pierwszego <link ... do </head> (włącznie)
    hdr_match = re.search(r'(<link.+?</head>)', html, re.DOTALL)
    if not hdr_match:
        raise ValueError("Nie znaleziono <link ... </head> w pliku HTML")
    hdr = hdr_match.group(1).strip()

    # 2. content: od <body ...> do bezpośrednio przed ostatnim <script
    # Najpierw znajdziemy początek body
    body_start_match = re.search(r'(<body[^>]*>)', html, re.IGNORECASE)
    if not body_start_match:
        raise ValueError("Nie znaleziono tagu <body>")
    body_start_pos = body_start_match.end()

    # Znajdziemy ostatni blok <script> ... </script>
    script_blocks = list(re.finditer(r'<script[^>]*>.*?</script>', html, re.DOTALL | re.IGNORECASE))
    if not script_blocks:
        raise ValueError("Nie znaleziono żadnego bloku <script> w pliku HTML")
    
    last_script = script_blocks[-1]
    script_start_pos = last_script.start()

    # Content to wszystko pomiędzy końcem <body...> a początkiem ostatniego <script>
    content = html[body_start_pos:script_start_pos].strip()

    # 3. script: cały ostatni blok <script>...</script>
    script = last_script.group(0).strip()

    return hdr, content, script


def process_template(template_path, output_path, hdr, content, script):
    """
    Wczytuje szablon index.tmpl i wstawia wyodrębnione części w odpowiednie miejsca
    """
    if not os.path.exists(template_path):
        raise FileNotFoundError(f"Nie znaleziono szablonu: {template_path}")

    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()

    # Zamieniamy znaczniki na wyodrębnione części
    result = template.replace('{{ next:hdr }}', hdr)
    result = result.replace('{{ next:content }}', content)
    result = result.replace('{{ next:script }}', script)

    # Dodatkowo naprawiamy ścieżki bezwzględne dla podkatalogów Joomla i obsługi języków.
    # Nazwa szablonu = nazwa bieżącego katalogu roboczego (skrypt działa po cd templates/<nazwa>)
    template_name = os.path.basename(os.path.abspath('.'))
    result = result.replace(
        f'/templates/{template_name}/',
        f'<?php echo $this->baseurl; ?>/templates/{template_name}/')

    # Zapisujemy wynik jako index.php
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(result)

    print(f"Plik {output_path} został wygenerowany pomyślnie!")


def main():
    html_file = "assets/next/index.html"
    template_file = "index.tmpl"
    output_file = "index.php"

    try:
        print(f"Wczytuję {html_file}...")
        hdr, content, script = extract_parts(html_file)

        print("Wyodrębniono hdr, content i script.")
        print(f"  • hdr: {len(hdr)} znaków")
        print(f"  • content: {len(content)} znaków")
        print(f"  • script: {len(script)} znaków")

        print(f"Przetwarzam szablon {template_file} → {output_file}")
        process_template(template_file, output_file, hdr, content, script)

    except Exception as e:
        print(f"Błąd: {e}")


if __name__ == "__main__":
    main()
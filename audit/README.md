 - react / react-dom 19.2.0 → 19.3.0 — minor, bezpieczne, aktualizuj śmiało.
  - eslint-config-next 16.0.7 → 16.3.6 — przypięte na sztywno, ale to ta sama linia co next (masz ^16.3.6). Podbij do wersji zgodnej z Next — bezpieczne, wręcz zalecane (rozjazd wersji
  configu i Next bywa źródłem fałszywych warningów lintera).
  - eslint 9.39.5 → 10.11.0 — major. ESLint 10 to głównie porządki wokół flat config i node engines — zwykle bezbolesne, ale przelicz npx eslint . po podbiciu i sprawdź changelog pod kątem
  usuniętych reguł.
  - lucide-react 0.556.0 → 1.47.0 — major (0.x→1.x), biblioteka ikon lubi zmieniać/usuwać nazwy ikon między wersjami. Sprawdź changelog/migration guide przed podbiciem, potem grep po użytych
  nazwach ikon.
  - typescript 5.9.3 → 7.0.2 — nie rób tego automatycznie. To przeskok przez wersję 6 (TS celowo pominął 6, żeby zrobić miejsce dla natywnego kompilatora "TS7/Corsa"). To nie jest zwykły
  major — inny silnik kompilacji. Traktuj osobno, testuj tsc --noEmit na branchu, nie łącz z resztą.
  - tailwindcss 3.4.19 → 4.3.3 — dokładnie to, o czym piszesz: v4 zmienia model configu (CSS-first, brak tailwind.config.js domyślnie, zmiany w PostCSS/pluginach, tailwindcss-animate może
  wymagać zamiennika). Nie robić tego "przy okazji" — to osobne zadanie migracyjne, najlepiej przez oficjalny npx @tailwindcss/upgrade.

  Reguła ogólna

  - Wanted != Current (minor/patch w ramach tego samego major) → auto-update bezpieczny, można to zautomatyzować bez czytania człowiekiem.
  - Current == Wanted, ale Latest ma wyższy major → wymaga świadomej decyzji: changelog, osobny branch, osobny test.

Automatyzacja

  Da się to podzielić automatycznie właśnie po tej różnicy Wanted vs Latest (czyli po numerze major). Praktyczne podejście:

  1. Bezpieczna część (minor/patch): npx npm-check-updates -u --target minor && npm install, uruchom build+lint, commit. To można wrzucić do CI/crona bez udziału człowieka.
  2. Major część: albo zostawić w npm outdated/ncu do ręcznego przeglądu jeden po drugim, albo podłączyć Renovate (lub Dependabot) z regułą: PR-y patch/minor auto-merge po zielonym CI, PR-y
  major — osobno, po jednym pakiecie, bez auto-merge, z linkiem do changelog w opisie PR-a.



audit.sh

Co robi audit2upgr:
  1. Uruchamia zwykłe npm outdated jak dotychczas (czytelna tabela).
  2. Dociąga npm outdated --json i przez node porównuje major wersji current vs latest.
  3. Dzieli listę na dwie sekcje i dla bezpiecznych generuje gotową komendę npm install pkg@latest ... do skopiowania.
  4. Dla ryzykownych tylko wypisuje listę do ręcznego sprawdzenia changelogów (celowo nie proponuję gotowej komendy — to ma wymuszać świadomą decyzję).

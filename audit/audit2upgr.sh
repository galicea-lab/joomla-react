echo "Czy upgrade"
npm outdated
echo

OUTDATED_JSON=$(npm outdated --json 2>/dev/null)

if [ -z "$OUTDATED_JSON" ] || [ "$OUTDATED_JSON" == "{}" ]; then
  echo "Wszystko aktualne."
  exit 0
fi

echo "$OUTDATED_JSON" | node -e '
const data = JSON.parse(require("fs").readFileSync(0, "utf8"));
const major = (v) => parseInt(String(v).split(".")[0], 10);

const safe = [];
const risky = [];

for (const [name, info] of Object.entries(data)) {
  const current = info.current;
  const wanted = info.wanted;
  const latest = info.latest;

  if (current === undefined || Number.isNaN(major(current)) || Number.isNaN(major(latest))) {
    risky.push({ name, current: current ?? "-", wanted, latest });
    continue;
  }

  if (major(current) === major(latest)) {
    safe.push({ name, current, wanted, latest });
  } else {
    risky.push({ name, current, wanted, latest });
  }
}

const row = (p) => `  ${p.name.padEnd(22)} ${String(p.current).padEnd(10)} -> ${p.latest}`;

console.log("=== BEZPIECZNE (minor/patch, ten sam major) ===");
if (safe.length === 0) console.log("  (brak)");
safe.forEach((p) => console.log(row(p)));

console.log("\n=== WYMAGAJA PRZEGLADU (zmiana major) ===");
if (risky.length === 0) console.log("  (brak)");
risky.forEach((p) => console.log(row(p)));

if (safe.length) {
  const cmd = safe.map((p) => `${p.name}@latest`).join(" ");
  console.log("\nAuto-update bezpiecznych pakietow:");
  console.log(`  npm install ${cmd}`);
}

if (risky.length) {
  console.log("\nPrzed podbiciem major sprawdz changelog / migration guide:");
  risky.forEach((p) => console.log(`  - ${p.name}: ${p.current} -> ${p.latest}`));
}
'

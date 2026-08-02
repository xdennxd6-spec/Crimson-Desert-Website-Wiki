// verify-weapons.mjs — Konsistenzpruefung der Waffendaten in index.html.
//
// Hintergrund: Die Anzahl der Abyss-Gear-Slots haengt in Crimson Desert an der
// Handhabungsklasse, nicht an der einzelnen Waffe. Belegt doppelt:
//   1. extern: "Two-handed weapons and ranged weapons get five Abyss Gear slots,
//      while one-handed weapons get three, and shields get two." Dagger sind ein
//      dokumentierter Sonderfall ohne Slots (Fextralife, King's Dagger).
//   2. intern: ueber die 418 bereits erfassten Waffen ist der Wert je Typ
//      eindeutig, z.B. Shield 2 (77/77), Halberd/Spear 5 (127/127),
//      Sword (1H) 3 (41/41), Dagger 0 (15/15).
//
// Wozu die Pruefung: Bei einer Datenlieferung von aussen (Recherche, LLM) sind
// gerade diese Werte anfaellig fuer plausibel klingende Erfindungen. Am
// 2026-08-01 lieferte eine LLM-Recherche fuer 13 Waffen einheitlich slots=3,
// darunter Firearms und Bows, die nachweislich 5 haben. Dieser Check haette das
// sofort gefangen.
//
// Aufruf: node scripts/verify-weapons.mjs   (Exit 1 bei Widerspruch)
//
// Der Check meldet NUR Widersprueche innerhalb eines Typs. Fehlende Werte (null)
// sind ausdruecklich in Ordnung: das Wiki kennzeichnet sie im UI als "nicht
// erfasst", was ehrlicher ist als ein geratener Wert.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

function extract(name) {
  const re = new RegExp("const " + name + "\\s*=\\s*(\\[|\\{)");
  const m = re.exec(html);
  if (!m) throw new Error("Datenstruktur nicht gefunden: " + name);
  let i = m.index + m[0].length - 1;
  const open = html[i], close = open === "[" ? "]" : "}";
  let d = 0, s = null, e = false;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (e) { e = false; continue; }
    if (c === "\\") { e = true; continue; }
    if (s) { if (c === s) s = null; continue; }
    if (c === '"' || c === "'" || c === "`") { s = c; continue; }
    if (c === open) d++;
    else if (c === close) { d--; if (d === 0) return eval("(" + html.slice(i, j + 1) + ")"); }
  }
  throw new Error("Klammern unbalanciert bei: " + name);
}

let fail = 0;
const ok = (c, m) => { console.log((c ? "  ok   " : "  FAIL ") + m); if (!c) fail++; };

const WEAPONS = extract("WEAPONS");
console.log(`\n[Waffen] ${WEAPONS.length} Eintraege`);

// Typen, bei denen bewusst gemischte Slot-Werte vorkommen duerfen, weil der Typ
// selbst Ein- und Zweihaender zusammenfasst. Nur diese sind von der
// Eindeutigkeitspruefung ausgenommen.
const GEMISCHT = new Set(["Blunt/Axe"]);

// Einzelne Waffen, die nachweislich von der Typregel abweichen. Jeder Eintrag
// braucht eine Quelle, sonst gehoert er hier nicht rein.
// - Electro-Mecha Longsword: 4 statt 5 Slots. Belegt durch Fextralife und
//   questlog ("two-handed weapons come equipped with x5 Abyss Core slots, though
//   the Electro-Mecha Longsword specifically has 4 slots available"), Stand
//   Patch 1.08. Die Schwesterwaffe Electro-Mecha Spear hat regulaer 5.
const AUSNAHMEN = new Map([
  ["Electro-Mecha Longsword", 4],
]);

const proTyp = {};
for (const w of WEAPONS) {
  const t = w.type || "(ohne Typ)";
  (proTyp[t] ||= { slots: {}, n: 0, ohne: 0 });
  proTyp[t].n++;
  if (w.slots == null) { proTyp[t].ohne++; continue; }
  // Belegte Einzelausnahmen zaehlen nicht gegen die Typregel, werden aber
  // geprueft: weicht der Wert vom dokumentierten ab, ist das ein echter Fehler.
  if (AUSNAHMEN.has(w.name)) {
    const soll = AUSNAHMEN.get(w.name);
    ok(w.slots === soll, `Ausnahme ${w.name}: slots=${w.slots} (dokumentiert ${soll})`);
    continue;
  }
  (proTyp[t].slots[w.slots] ||= []).push(w.name);
}

// 1. Slot-Wert je Typ eindeutig?
for (const [t, d] of Object.entries(proTyp)) {
  const werte = Object.keys(d.slots);
  if (werte.length <= 1) continue;
  if (GEMISCHT.has(t)) {
    console.log(`  info  ${t}: ${werte.join("/")} Slots (Typ mischt bekanntlich 1H und 2H, keine Pruefung)`);
    continue;
  }
  // Mehrheitswert bestimmen, Ausreisser benennen
  const sortiert = werte.sort((a, b) => d.slots[b].length - d.slots[a].length);
  const mehrheit = sortiert[0];
  const ausreisser = sortiert.slice(1).flatMap((v) => d.slots[v].map((n) => `${n} (slots=${v})`));
  ok(false, `${t}: uneinheitliche Slots, Mehrheit ${mehrheit} (${d.slots[mehrheit].length}x), abweichend: ${ausreisser.slice(0, 5).join(", ")}`);
}

// 2. Slot-Werte ausserhalb des dokumentierten Wertebereichs?
const ERLAUBT = new Set([0, 2, 3, 4, 5]);
const ungueltig = WEAPONS.filter((w) => w.slots != null && !ERLAUBT.has(w.slots));
ok(ungueltig.length === 0,
  `alle Slot-Werte im dokumentierten Bereich 0/2/3/4/5 (abweichend: ${ungueltig.length}${ungueltig.length ? " -> " + ungueltig.slice(0, 3).map((w) => `${w.name}=${w.slots}`).join(", ") : ""})`);

// 3. Crit-Werte im beobachteten Bereich? Der hoechste je belegte Wert ist 6.
// Deutlich hoehere Werte sind ein starkes Indiz fuer eine erfundene Angabe.
const critWerte = WEAPONS.filter((w) => w.crit != null).map((w) => w.crit);
const maxCrit = critWerte.length ? Math.max(...critWerte) : 0;
const critAusreisser = WEAPONS.filter((w) => w.crit != null && (w.crit < 0 || w.crit > 8));
ok(critAusreisser.length === 0,
  `Crit-Werte plausibel (Maximum ${maxCrit}, Ausreisser ueber 8: ${critAusreisser.length}${critAusreisser.length ? " -> " + critAusreisser.slice(0, 3).map((w) => `${w.name}=${w.crit}`).join(", ") : ""})`);

// 4. Doppelte Waffennamen wuerden Bild-Maps und Zaehlungen verfaelschen
const namen = WEAPONS.map((w) => w.name);
const doppelt = [...new Set(namen.filter((n, i) => namen.indexOf(n) !== i))];
ok(doppelt.length === 0, `keine doppelten Waffennamen (gefunden: ${doppelt.length}${doppelt.length ? " -> " + doppelt.slice(0, 3).join(", ") : ""})`);

// Abschliessende Lagemeldung zur Datenvollstaendigkeit (kein Fehler, nur Info)
const ohneCrit = WEAPONS.filter((w) => w.crit == null).length;
const ohneSlots = WEAPONS.filter((w) => w.slots == null).length;
console.log(`\n  info  nicht erfasst: crit ${ohneCrit}/${WEAPONS.length}, slots ${ohneSlots}/${WEAPONS.length}`);
console.log("  info  Slot-Regel: 2H und Ranged = 5, 1H = 3, Shield = 2, Dagger = 0");

console.log(`\n${fail === 0 ? "ALLE CHECKS GRUEN" : fail + " CHECK(S) FEHLGESCHLAGEN"}`);
process.exit(fail === 0 ? 0 : 1);

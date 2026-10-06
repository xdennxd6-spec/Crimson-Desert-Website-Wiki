// verify-weapons.mjs — Konsistenzpruefung der Waffendaten in index.html.
//
// Hintergrund: Die Anzahl der Abyss-Gear-Slots haengt in Crimson Desert an der
// Handhabungsklasse, nicht an der einzelnen Waffe. Belegt doppelt:
//   1. extern: "Two-handed weapons and ranged weapons get five Abyss Gear slots,
//      while one-handed weapons get three, and shields get two." Dagger sind ein
//      dokumentierter Sonderfall ohne Slots (Fextralife, King's Dagger).
//   2. intern: ueber die erfassten Waffen ist der Wert je Typ bis auf belegte
//      Einzelausnahmen (AUSNAHMEN unten) eindeutig, z.B. Shield 2, Halberd/Spear 5,
//      Sword (1H) 3, Dagger 0. Die aktuelle Verteilung je Typ gibt der Lauf am Ende
//      als info aus (aus den Daten abgeleitet, keine zweite Handpflege).
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
// Seit dem Split (23.08.2026) liegen die Daten-Konstanten in data/*.js;
// fuer extract() zaehlt index.html + alle Datendateien als EIN Quelltext.
const html = [
  fs.readFileSync(path.join(ROOT, "index.html"), "utf8"),
  ...fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js")).sort()
    .map(f => fs.readFileSync(path.join(ROOT, "data", f), "utf8")),
].join("\n");

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
//   Patch 1.08.
// - Acht weitere Zweihaender mit 4 Slots, belegt am 07.09.2026 ueber die questlog-tRPC-API
//   (database.getItem, itemSockets.maxSocketCount 4 mit genau 4 socketOpenCosts) und VULKK
//   (je vier Slot-Icons): die sechs Kuku-Speere, Electro-Mecha Spear und Soul Spear. Die
//   fruehere Annahme "Electro-Mecha Spear hat regulaer 5" ist damit widerlegt. Fextralife
//   taugt fuer Slots nicht als Quelle: die Seite druckt "x5" als Klassen-Boilerplate, auch
//   dort, wo 4 belegt ist. Belege: G:/Claude/Crimson-Wiki-Slots-Crit-2026-09-07/.
// - Tree Branch, Sturdy Tree Branch, Bamboo Stalk, Sturdy Bamboo Stalk, Drake Shield und
//   Runewalker Shield: trotz elf Verfeinerungsstufen item-spezifisch ohne Sockelsystem
//   (questlog-tRPC, itemSockets:null und socketCompatibilityHash:"0", 14.09.2026).
//   Item-IDs: 1003849, 1003850, 1003908, 1004108, 290021 und 1000201.
// - Lightning Greathammer (Typ Blunt/Axe, daher von der Typpruefung ausgenommen): nur
//   eine Stufe (levels=1), socketCompatibilityHash:"0", kein Sockelsystem (questlog,
//   Item-ID 1002741, 06.10.2026). Slots 0 ist damit der questlog-Stand, kein Datenloch.
const AUSNAHMEN = new Map([
  ["Electro-Mecha Longsword", 4],
  ["Electro-Mecha Spear", 4],
  ["Soul Spear", 4],
  ["Kuku Lightning Spear", 4],
  ["Kuku Flame Spear", 4],
  ["Kuku Bismuth Spear", 4],
  ["Kuku Propeller Spear", 4],
  ["Kuku Disruptor Spear", 4],
  ["Kuku Laser Cannon Spear", 4],
  ["Tree Branch", 0],
  ["Sturdy Tree Branch", 0],
  ["Bamboo Stalk", 0],
  ["Sturdy Bamboo Stalk", 0],
  ["Drake Shield", 0],
  ["Runewalker Shield", 0],
  ["Lightning Greathammer", 0],
]);

// Jede dokumentierte Ausnahme muss noch zu einer Waffe passen: Wurde eine Waffe
// umbenannt oder entfernt, laeuft ein verwaister Eintrag sonst unbemerkt mit und
// taeuscht eine Abdeckung vor.
{
  const vorhanden = new Set(WEAPONS.map((w) => w.name));
  const verwaist = [...AUSNAHMEN.keys()].filter((n) => !vorhanden.has(n));
  ok(verwaist.length === 0, `alle ${AUSNAHMEN.size} dokumentierten Slot-Ausnahmen betreffen noch vorhandene Waffen (verwaist: ${verwaist.join(", ") || "-"})`);
}

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

// Unabhaengiger questlog-Abzug vom 09.09.2026. Der alte Typ-/Bereichscheck
// fand 33 falsche ATK-Werte und 2 falsche DEF-Werte nicht, weil sie plausibel
// aussahen. Diese Referenz prueft die tatsaechliche Endstufe pro Item-ID.
// Nicht eindeutig zugeordnete Items bleiben ausserhalb dieses Gates.
const statReference = JSON.parse(fs.readFileSync(path.join(__dirname, "weapon-stats-reference.json"), "utf8"));
const weaponByName = new Map(WEAPONS.map(w => [w.name, w]));
const statErrors = [];
let atkChecked = 0, defChecked = 0;
for (const [name, expected] of Object.entries(statReference.items)) {
  const weapon = weaponByName.get(name);
  if (!weapon) { statErrors.push(`${name} (questlog ${expected.id}): Eintrag fehlt`); continue; }
  for (const field of ["atk", "def"]) {
    if (!(field in expected)) continue;
    if (field === "atk") atkChecked++; else defChecked++;
    const allowed = field === "atk" && expected.atkAlternatives ? expected.atkAlternatives : [expected[field]];
    if (!allowed.includes(weapon[field])) {
      statErrors.push(`${name} (questlog ${expected.id}): ${field}=${weapon[field] ?? "nicht erfasst"}, belegte Endstufe=${allowed.join("/")}`);
    }
  }
}
ok(statErrors.length === 0,
  `questlog-Endstufen: ${atkChecked} ATK und ${defChecked} DEF geprueft (Rhinard Cannon seit 03.10.2026 auf questlog-Endstufe 31); ${statErrors.length} Abweichungen${statErrors.length ? " -> " + statErrors.slice(0, 8).join("; ") : ""}`);

// Crit gegen questlog: statId 1000007 = Critical Rate, Stufe bei Refinement +0. 1000010 ist
// Attack Speed und zaehlt NICHT als Crit. Referenz: weapon-crit-reference.json (Abzug 03.10.2026).
// Schilde mit crit 0 ohne questlog-Feld sind eine dokumentierte Altkonvention (nur Info).
const critRef = JSON.parse(fs.readFileSync(path.join(__dirname, "weapon-crit-reference.json"), "utf8"));
const critErrors = [];
let critChecked = 0, schildKonvention = 0;
for (const [name, soll] of Object.entries(critRef.crit)) {
  const w = weaponByName.get(name);
  if (!w) continue;
  critChecked++;
  if (w.crit !== soll) critErrors.push(`${name}: crit=${w.crit ?? "null"}, questlog 1000007 = ${soll}`);
}
for (const name of critRef.noCritField) {
  const w = weaponByName.get(name);
  if (!w) continue;
  critChecked++;
  if (w.crit == null) continue;
  if (w.type === "Shield" && w.crit === 0) { schildKonvention++; continue; }
  critErrors.push(`${name}: crit=${w.crit}, questlog fuehrt kein Critical-Rate-Feld`);
}
ok(critErrors.length === 0,
  `Crit gegen questlog-Stat 1000007: ${critChecked} geprueft, ${critErrors.length} Abweichungen${critErrors.length ? " -> " + critErrors.slice(0, 8).join("; ") : ""}`);
if (schildKonvention) console.log(`  info  ${schildKonvention} Schilde mit crit 0, questlog ohne Critical-Rate-Feld (Altkonvention, siehe d01-Kommentar)`);

// Abschliessende Lagemeldung zur Datenvollstaendigkeit (kein Fehler, nur Info)
// crit_none:true markiert Waffen, bei denen questlog.gg (tRPC database.getItem, levels[0].stats)
// und gaming.tools KEIN Critical-Rate-Feld fuehren (Ernte 07.09.2026). Das ist kein
// Rueckstand, sondern der Spielstand; der Marker darf nur neben crit:null stehen.
const critNoneFalsch = WEAPONS.filter((w) => w.crit_none && w.crit != null);
ok(critNoneFalsch.length === 0,
  `crit_none nur bei crit:null (Verstoesse: ${critNoneFalsch.length}${critNoneFalsch.length ? " -> " + critNoneFalsch.slice(0, 3).map((w) => w.name).join(", ") : ""})`);
const ohneCrit = WEAPONS.filter((w) => w.crit == null && !w.crit_none).length;
const keinCrit = WEAPONS.filter((w) => w.crit == null && w.crit_none).length;
const ohneSlots = WEAPONS.filter((w) => w.slots == null).length;
console.log(`\n  info  nicht erfasst: crit ${ohneCrit}/${WEAPONS.length} (dazu ${keinCrit} ohne Crit-Stat laut questlog/gaming.tools), slots ${ohneSlots}/${WEAPONS.length}`);
console.log("  info  Slot-Regel: 2H und Ranged = 5, 1H = 3, Shield = 2, Dagger = 0; Kuku-/Electro-Mecha-/Soul-Speere = 4; nicht ausruestbare Items ohne Sockelsystem = 0");
// Verteilung je Typ aus den Daten (ohne die belegten Einzelausnahmen), damit die
// Regel oben nicht allein von Hand gepflegt wird. Knuckles/Gauntlets zeigen z.B. 0,
// weil dort nicht ausruestbare Items und Standard-Faeuste liegen (Notiz im Datensatz:
// kein Sockelsystem laut questlog), nicht weil Faeuste generell keine Slots haetten
// (Mining Knuckledrill hat 5).
for (const [t, d] of Object.entries(proTyp)) {
  const teile = Object.entries(d.slots).map(([v, n]) => `${v}=${n.length}x`);
  if (d.ohne) teile.push(`nicht erfasst=${d.ohne}x`);
  if (teile.length) console.log(`  info  Slots je Typ  ${t.padEnd(26)} ${teile.join(", ")}`);
}
console.log(`  info  ${AUSNAHMEN.size} Einzelausnahmen mit Beleg (siehe AUSNAHMEN); Schilde mit crit 0: Altkonvention, Entscheidung offen (WIKI-PLAN, Backlog Block 3)`);

console.log(`\n${fail === 0 ? "ALLE CHECKS GRUEN" : fail + " CHECK(S) FEHLGESCHLAGEN"}`);
process.exit(fail === 0 ? 0 : 1);

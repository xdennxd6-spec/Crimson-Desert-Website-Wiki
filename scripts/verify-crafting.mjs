// verify-crafting.mjs — validiert die CRAFTING/CORES-Datenstrukturen in index.html
// und kompiliert alle Inline-<script>-Bloecke auf Syntaxfehler (ohne jsdom).
//
// Aufruf: node scripts/verify-crafting.mjs
// Exit 1 bei harten Fehlern (kaputtes Array, fehlende Pflichtfelder, JS-SyntaxError).
//
// Reuse des balancierten-Klammern-eval aus gen-seo.mjs (Single Source of Truth = index.html).

import fs from "fs";
import path from "path";
import vm from "vm";
import { execSync } from "child_process";
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
// 21.11.2026 (Performance-Paket): Die App-Logik liegt ausgelagert in js/app-*.js. Fuer die
// Syntax- und Doppeldeklarations-Pruefung (3b/3f) und die Nachlade-Verweise (3c) zaehlt der
// App-Code jetzt mit — vorher war er Teil der Inline-Bloecke von index.html.
const APP_DIR = path.join(ROOT, "js");
// Fehlt der js/-Ordner (aelterer Checkout oder Rueckbau des Performance-Pakets), klar abbrechen
// statt mit rohem ENOENT/Stacktrace zu sterben. Der Erfolgsfall aendert sich nicht.
const appDateien = fs.existsSync(APP_DIR)
  ? fs.readdirSync(APP_DIR).filter(f => /^app-[A-Za-z0-9_-]+\.js$/.test(f)).sort()
    .map(f => ({ file: f, text: fs.readFileSync(path.join(APP_DIR, f), "utf8") }))
  : [];
const jsOrdnerFehlt = !fs.existsSync(APP_DIR);
// 21.11.2026: Dateien, die index.html mit type="module" laedt, teilen sich den globalen Scope NICHT
// mit den klassischen Skripten. Vor der Auslagerung hat 3a Inline-Module ausdruecklich uebersprungen
// (skippedModule) — dieses Verhalten wird hier fuer die App-Dateien fortgefuehrt: sie werden in 3b'
// und 3f nicht klassisch kompiliert, sondern sichtbar als Module gezaehlt.
const indexNur = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const appModule = new Set([...indexNur.matchAll(/<script\s+type="module"\s+src="js\/(app-[A-Za-z0-9_-]+\.js)/g)].map(m => m[1]));
const appKlassisch = appDateien.filter(a => !appModule.has(a.file));

let errors = 0;
const fail = (m) => { console.error("FEHLER: " + m); errors++; };
const ok = (m) => console.log("OK: " + m);
// Fehlt der js/-Ordner (aelterer Checkout oder Rueckbau des Performance-Pakets), klar melden statt
// mit rohem ENOENT/Stacktrace abzubrechen. Der Erfolgsfall aendert sich nicht.
if (jsOrdnerFehlt) fail("js/app-*.js fehlen: Ordner js/ nicht gefunden (Performance-Paket nicht eingespielt?)");

function extract(name) {
  const re = new RegExp("const " + name + "\\s*=\\s*(\\[|\\{)");
  const m = re.exec(html);
  if (!m) throw new Error("Datenstruktur nicht gefunden: " + name);
  let i = m.index + m[0].length - 1;
  const open = html[i], close = open === "[" ? "]" : "}";
  let depth = 0, inStr = null, esc = false;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (esc) { esc = false; continue; }
    if (c === "\\") { esc = true; continue; }
    if (inStr) { if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) return eval("(" + html.slice(i, j + 1) + ")"); }
  }
  throw new Error("Klammern unbalanciert bei: " + name);
}

// ── 1) CRAFTING ──────────────────────────────────────────────────────────────
let CRAFTING;
try { CRAFTING = extract("CRAFTING"); } catch (e) { fail("CRAFTING eval: " + e.message); }
if (Array.isArray(CRAFTING)) {
  ok(`CRAFTING ist Array mit ${CRAFTING.length} Eintraegen`);
  const byCat = {};
  const byStation = {};
  const names = new Set();
  const dups = [];
  const REQ = ["name", "cat", "station", "ingr"]; // source/effect/conf optional (Food-Rezepte ohne Fundort sind legitim)
  const CONF = new Set(["high", "medium", "low"]);
  CRAFTING.forEach((c, idx) => {
    byCat[c.cat] = (byCat[c.cat] || 0) + 1;
    byStation[c.station] = (byStation[c.station] || 0) + 1;
    for (const f of REQ) {
      if (c[f] == null || String(c[f]).trim() === "") fail(`Eintrag #${idx} "${c.name || "?"}" fehlt Pflichtfeld '${f}'`);
    }
    if (c.conf && !CONF.has(c.conf)) fail(`Eintrag "${c.name}" hat ungueltiges conf='${c.conf}'`);
    if (c.grade != null && (typeof c.grade !== "number" || c.grade < 0 || c.grade > 5)) fail(`Eintrag "${c.name}" hat ungueltiges grade='${c.grade}'`);
    if (names.has(c.name)) dups.push(c.name); else names.add(c.name);
  });
  console.log("  Kategorien:", JSON.stringify(byCat));
  console.log("  Stationen :", JSON.stringify(byStation));
  if (dups.length) fail(`Doppelte Rezept-Namen: ${[...new Set(dups)].join(", ")}`);
  else ok("Keine doppelten Rezept-Namen");
} else if (CRAFTING !== undefined) {
  fail("CRAFTING ist kein Array");
}

// ── 2) CORES (bleibt valide, evtl. angereichert) ──────────────────────────────
let CORES;
try { CORES = extract("CORES"); } catch (e) { fail("CORES eval: " + e.message); }
if (Array.isArray(CORES)) {
  ok(`CORES ist Array mit ${CORES.length} Eintraegen`);
  CORES.forEach((c, idx) => {
    if (!c.name) fail(`CORE #${idx} ohne name`);
  });
}

// ── 3) Alle Inline-<script>-Bloecke auf JS-Syntax pruefen (vm, ohne Ausfuehrung)
const scriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let sm, sidx = 0, compiled = 0, skippedModule = 0;
const inlineClassicCodes = []; // fuer das Vereinigungs-Kompilat in 3f
while ((sm = scriptRe.exec(html)) !== null) {
  const code = sm[1];
  sidx++;
  if (!code.trim()) continue;
  if (/type\s*=\s*["'](application\/(ld\+json|json)|text\/template)["']/i.test(sm[0])) continue;
  // ES-Module (import/export) koennen mit vm.Script nicht klassisch kompiliert werden -> separat zaehlen
  if (/type\s*=\s*["']module["']/i.test(sm[0])) { skippedModule++; continue; }
  inlineClassicCodes.push(code);
  try { new vm.Script(code, { filename: `inline-script-${sidx}.js` }); compiled++; }
  catch (e) { fail(`Inline-Script #${sidx} SyntaxError: ${e.message}`); }
}
ok(`${compiled} klassische Inline-Script-Bloecke ohne SyntaxError kompiliert (${skippedModule} type=module uebersprungen)`);

// ── 3b) Ausgelagerte Datendateien (data/*.js) auf JS-Syntax pruefen ──────────
let dataCompiled = 0;
for (const f of fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js")).sort()) {
  try { new vm.Script(fs.readFileSync(path.join(ROOT, "data", f), "utf8"), { filename: `data/${f}` }); dataCompiled++; }
  catch (e) { fail(`data/${f} SyntaxError: ${e.message}`); }
}
ok(`${dataCompiled} Datendateien (data/*.js) ohne SyntaxError kompiliert`);

// ── 3b') Ausgelagerte App-Dateien (js/app-*.js) auf JS-Syntax pruefen ────────
// Klassisch geladene App-Dateien werden per vm.Script kompiliert. Dateien mit type="module"
// (aktuell js/app-03-sync.js) ueberspringen wir wie 3a frueher die Inline-Module — ein spaeter
// hinzukommendes import/export oder Top-Level-Await dort waere kein Fehler.
let appCompiled = 0, appModul = 0;
for (const a of appKlassisch) {
  try { new vm.Script(a.text, { filename: `js/${a.file}` }); appCompiled++; }
  catch (e) { fail(`js/${a.file} SyntaxError: ${e.message}`); }
}
ok(`${appCompiled} klassische App-Dateien (js/app-*.js) ohne SyntaxError kompiliert`);
appModul = appDateien.length - appKlassisch.length;
if (appModul > 0) {
  ok(`${appModul} App-Datei(en) als type=module geladen (nicht klassisch kompiliert): ${[...appModule].sort().join(", ")}`);
}

// ── 3c) Tag-Abgleich: <script src="data/...">-Tags in index.html <-> data/*.js ──────
{
  const htmlOnly = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  // Weitere Attribute nach src erlaubt (seit 10/2026 fetchpriority="low", siehe Schnellstart in index.html).
  // Seit 10.11.2026 mit Pruefwert (?v=<Inhalts-Hash>, von gen-seo gesetzt); der zaehlt nicht zum Dateinamen.
  const tagRe = /<script\s+src="data\/([^"?]+)(?:\?v=[0-9a-f]+)?"[^>]*>\s*<\/script>/g;
  const tagFiles = new Set();
  let tm;
  while ((tm = tagRe.exec(htmlOnly)) !== null) tagFiles.add(tm[1]);
  const dirFiles = new Set(fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js")));
  const nurInHtml = [...tagFiles].filter(f => !dirFiles.has(f));
  // d14-beschaffung.js wird erst beim Öffnen des Fundort-Fensters nachgeladen (Größengrenze verify-seo, beschLaden().
  // 11.11.2026: d15-inseln.js und d15-inseln-app.js lädt inselnLaden() erst beim Öffnen der Seite Inseln.
  // 14.11.2026: d17-weltkarte.js und d17-weltkarte-app.js laedt weltkarteLaden() erst beim Oeffnen der Seite Karte.
  // 21.11.2026 (Performance-Paket): die drei Loader liegen ausgelagert in js/app-02-core.js — der
  // Nachlade-Verweis darf deshalb in index.html ODER in js/app-*.js stehen.
const NACHGELADEN = new Set(["d14-beschaffung.js", "d15-inseln.js", "d15-inseln-app.js", "d17-weltkarte.js", "d17-weltkarte-app.js"]);
  const appJoined = appDateien.map(a => a.text).join("\n");
  NACHGELADEN.forEach(f => { if (tagFiles.has(f)) fail(`data/${f} soll nachgeladen werden, steht aber als <script src> in index.html`); if (!htmlOnly.includes(`data/${f}`) && !appJoined.includes(`data/${f}`)) fail(`data/${f}: Nachlade-Verweis fehlt in index.html und js/app-*.js`); });
  const nurInDir = [...dirFiles].filter(f => !tagFiles.has(f) && !NACHGELADEN.has(f));
  nurInHtml.forEach(f => fail(`<script src="data/${f}"> in index.html, aber Datei fehlt in data/`));
  nurInDir.forEach(f => fail(`data/${f} existiert, aber index.html laedt sie nicht per <script src>`));
  if (!nurInHtml.length && !nurInDir.length) ok(`Tag-Abgleich: ${tagFiles.size} <script src="data/...">-Tags + ${NACHGELADEN.size} nachgeladen == ${dirFiles.size} Dateien in data/`);
}

// ── 3c') Tag-Abgleich: <script src="js/app-...">-Tags in index.html <-> js/app-*.js ──
// 21.11.2026 (Performance-Paket): dieselbe Konsistenz wie fuer data/*.js — eine App-Datei,
// die index.html laedt, muss existieren; eine App-Datei ohne <script src> waere tot.
{
  const htmlOnly = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const tagRe = /<script\s+(?:type="module"\s+)?src="js\/(app-[A-Za-z0-9_-]+\.js)(?:\?v=[0-9a-f]+)?"[^>]*>\s*<\/script>/g;
  const tagFiles = new Set();
  let tm;
  while ((tm = tagRe.exec(htmlOnly)) !== null) tagFiles.add(tm[1]);
  const dirFiles = new Set(appDateien.map(a => a.file));
  const nurInHtml = [...tagFiles].filter(f => !dirFiles.has(f));
  const nurInDir = [...dirFiles].filter(f => !tagFiles.has(f));
  nurInHtml.forEach(f => fail(`<script src="js/${f}"> in index.html, aber Datei fehlt in js/`));
  nurInDir.forEach(f => fail(`js/${f} existiert, aber index.html laedt sie nicht per <script src>`));
  if (!nurInHtml.length && !nurInDir.length) ok(`App-Tag-Abgleich: ${tagFiles.size} <script src="js/app-...">-Tags == ${dirFiles.size} Dateien in js/`);
}

// ── 3d) sw-Abgleich: dieselbe Menge gegen './data/...'-Eintraege in CORE_ASSETS (sw.js) ──
{
  const swSrc = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
  // Nur der CORE_ASSETS-Block zaehlt — ein './data/...' in einem Kommentar
  // wuerde sonst als Precache-Eintrag durchgehen.
  const coreBlock = swSrc.match(/const CORE_ASSETS\s*=\s*\[([\s\S]*?)\]/);
  if (!coreBlock) fail("sw.js: CORE_ASSETS-Block nicht gefunden");
  const swRe = /['"]\.\/data\/([^'"?]+)(?:\?v=[0-9a-f]+)?['"]/g;
  const swFiles = new Set();
  let wm;
  while (coreBlock && (wm = swRe.exec(coreBlock[1])) !== null) swFiles.add(wm[1]);
  const dirFiles2 = new Set(fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js")));
  const fehltInSw = [...dirFiles2].filter(f => !swFiles.has(f));
  const zuvielInSw = [...swFiles].filter(f => !dirFiles2.has(f));
  fehltInSw.forEach(f => fail(`data/${f} fehlt in sw.js CORE_ASSETS -- Offline-Cache waere unvollstaendig`));
  zuvielInSw.forEach(f => fail(`sw.js CORE_ASSETS verweist auf './data/${f}', das es nicht gibt`));
  if (!fehltInSw.length && !zuvielInSw.length) ok(`sw-Abgleich: ${swFiles.size} './data/...'-Eintraege in CORE_ASSETS == ${dirFiles2.size} Dateien in data/`);
}

// ── 3e) git-Abgleich: data/*.js und js/app-*.js muessen getrackt sein, sonst deployt ein Push ──
// eine halb tote bzw. WEISSE Live-Site (js/ ist ein neuer Ordner; fehlt er im Commit, liefert die
// Live-Seite 404 fuer die gesamte App-Logik). js/ selbst wird mit 'git ls-files js' abgedeckt.
{
  // 21.11.2026: die beiden Abfragen getrennt halten. Vorher lag alles in einem try/catch, dann haette
  // ein Fehlschlag von 'ls-files js' auch den data-Abgleich stumm uebersprungen.
  const gitLs = (pfad) => {
    try { return execSync(`git -C ${JSON.stringify(ROOT)} ls-files ${pfad}`, { encoding: "utf8" }); }
    catch (e) { return null; }
  };
  const gitData = gitLs("data/");
  const gitJs = gitLs("js");
  if (gitData === null) {
    ok("git-Abgleich uebersprungen (kein Git verfuegbar bzw. kein Repo -- z.B. im Netlify-Build)");
  } else {
    const tracked = new Set(gitData.split("\n").filter(Boolean).map(p => p.replace(/^data\//, "")));
    const dirFiles3 = fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js"));
    const untracked = dirFiles3.filter(f => !tracked.has(f));
    untracked.forEach(f => fail(`data/${f} ist nicht in git -- Push wuerde eine halb tote Live-Site deployen`));
    if (!untracked.length) ok(`git-Abgleich: alle ${dirFiles3.length} data/*.js-Dateien sind getrackt`);
    if (gitJs === null) {
      fail("js/app-*.js: 'git ls-files js' fehlgeschlagen -- Tracking der App-Dateien nicht pruefbar");
    } else {
      const trackedJs = new Set(gitJs.split("\n").filter(Boolean));
      const appDateien3 = fs.existsSync(APP_DIR)
        ? fs.readdirSync(APP_DIR).filter(f => /^app-[A-Za-z0-9_-]+\.js$/.test(f)).sort() : [];
      const untrackedJs = appDateien3.filter(f => !trackedJs.has(`js/${f}`));
      untrackedJs.forEach(f => fail(`js/${f} ist nicht in git -- Push wuerde eine weisse Live-Site deployen`));
      if (!untrackedJs.length) ok(`git-Abgleich: alle ${appDateien3.length} js/app-*.js-Dateien sind getrackt (git ls-files js, ${trackedJs.size} Dateien unter js/)`);
    }
  }
}

// ── 3f) Konkat-Kompilat: Datendateien + App-Dateien + klassische Inline-Bloecke als EIN vm.Script ──
// Faengt, was 3b) nicht sieht: const-Doppeldeklarationen ueber Dateigrenzen hinweg —
// zwischen data/*.js, js/app-*.js und den Inline-Skripten von index.html. Im Browser teilen
// sich alle klassischen Skripte einen globalen Scope; ein doppeltes const wirft dort
// beim zweiten Vorkommen, obwohl jeder Block fuer sich sauber kompiliert.
// (Fuer die Doppeldeklarations-Pruefung ist die Reihenfolge egal.)
{
  const dataDir = path.join(ROOT, "data");
  const orderedFiles = fs.readdirSync(dataDir).filter(f => f.endsWith(".js")).sort();
  const concat = orderedFiles.map(f => fs.readFileSync(path.join(dataDir, f), "utf8"))
    .concat(appKlassisch.map(a => a.text))
    .concat(inlineClassicCodes).join("\n");
  try {
    new vm.Script(concat, { filename: "data/*.js + js/app-*.js (klassisch) + inline-scripts (globaler Scope)" });
    ok(`Konkat-Kompilat: ${orderedFiles.length} Datendateien + ${appKlassisch.length} klassische App-Dateien + ${inlineClassicCodes.length} Inline-Bloecke als ein Script kompiliert (keine Doppeldeklaration im globalen Scope; type=module-App-Dateien teilen sich den Scope nicht und sind nicht enthalten)`);
  } catch (e) {
    fail(`Konkat-Kompilat SyntaxError im globalen Scope (z.B. doppelte const): ${e.message}`);
  }
}

// ── 3e) SECTIONS-count gegen die echte Datenmenge ────────────────────────────
// Die Sektionsuebersicht zeigt je Sektion ein count-Feld. Steht dort ein Wort ("Sets",
// "Liste"), ist das Absicht. Steht dort eine Zahl, ist es ein Zaehler -- und der driftet
// lautlos, wenn das Datenarray waechst. Am 23.08.2026 zeigte die Seite so 502 Waffen bei
// 500 Datensaetzen und 310 Rezepte bei 308.
{
  // Sektion -> Datenarray. Bewusst handgepflegt: nicht jede Sektion hat ein einzelnes
  // Array, und eine falsche Zuordnung waere schlimmer als keine. Sektionen mit Zahl-count
  // ohne Eintrag hier werden unten ausdruecklich gemeldet, damit die Luecke sichtbar bleibt.
  const ZUORDNUNG = {
    bosses: "BOSSES", weapons: "WEAPONS", crafting: "CRAFTING", armor: "ARMOR",
    mounts: "MOUNTS", npcs: "NPCS", trophies: "TROPHIES", patches: "PATCHES",
    "side-quests": "SIDE_QUESTS", bestiary: "BESTIARY",
  };
  let SECTIONS;
  try { SECTIONS = extract("SECTIONS"); } catch (e) { fail("SECTIONS eval: " + e.message); }
  if (Array.isArray(SECTIONS)) {
    let geprueft = 0, drift = 0;
    const ohneZuordnung = [];
    for (const s of SECTIONS) {
      if (!/^\d+$/.test(String(s.count))) continue; // Wort-count ist Absicht
      const arrName = ZUORDNUNG[s.id];
      if (!arrName) { ohneZuordnung.push(`${s.id} (count ${s.count})`); continue; }
      let arr;
      try { arr = extract(arrName); } catch { ohneZuordnung.push(`${s.id} -> ${arrName} nicht gefunden`); continue; }
      if (!Array.isArray(arr)) { ohneZuordnung.push(`${s.id} -> ${arrName} ist kein Array`); continue; }
      geprueft++;
      if (arr.length !== Number(s.count)) {
        drift++;
        fail(`SECTIONS-count '${s.id}' zeigt ${s.count}, ${arrName} hat ${arr.length} Eintraege`);
      }
    }
    if (!drift) ok(`SECTIONS-counts: ${geprueft} Zahl-Angaben stimmen mit ihren Datenarrays ueberein`);
    if (ohneZuordnung.length) {
      console.log("HINWEIS: Zahl-count ohne geprueftes Datenarray: " + ohneZuordnung.join(", "));
    }
  } else {
    fail("SECTIONS ist kein Array");
  }
}

// ── 4) Abyss-Core-Synthese-Guide-Block vorhanden? (gesetzt nach Integration) ──
if (html.includes('id="synth-guide"') || /Abyss-?Core-?Synthese|Special Synthesis/i.test(html)) {
  ok("Abyss-Core-Synthese-Block referenziert");
} else {
  console.log("HINWEIS: Synthese-Guide-Block noch nicht vorhanden (vor Integration normal)");
}

console.log(errors === 0 ? "\n==> ALLE CHECKS GRUEN" : `\n==> ${errors} FEHLER`);
process.exit(errors === 0 ? 0 : 1);

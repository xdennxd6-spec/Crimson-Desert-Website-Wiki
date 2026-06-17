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
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

let errors = 0;
const fail = (m) => { console.error("FEHLER: " + m); errors++; };
const ok = (m) => console.log("OK: " + m);

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
while ((sm = scriptRe.exec(html)) !== null) {
  const code = sm[1];
  sidx++;
  if (!code.trim()) continue;
  if (/type\s*=\s*["'](application\/(ld\+json|json)|text\/template)["']/i.test(sm[0])) continue;
  // ES-Module (import/export) koennen mit vm.Script nicht klassisch kompiliert werden -> separat zaehlen
  if (/type\s*=\s*["']module["']/i.test(sm[0])) { skippedModule++; continue; }
  try { new vm.Script(code, { filename: `inline-script-${sidx}.js` }); compiled++; }
  catch (e) { fail(`Inline-Script #${sidx} SyntaxError: ${e.message}`); }
}
ok(`${compiled} klassische Inline-Script-Bloecke ohne SyntaxError kompiliert (${skippedModule} type=module uebersprungen)`);

// ── 4) Abyss-Core-Synthese-Guide-Block vorhanden? (gesetzt nach Integration) ──
if (html.includes('id="synth-guide"') || /Abyss-?Core-?Synthese|Special Synthesis/i.test(html)) {
  ok("Abyss-Core-Synthese-Block referenziert");
} else {
  console.log("HINWEIS: Synthese-Guide-Block noch nicht vorhanden (vor Integration normal)");
}

console.log(errors === 0 ? "\n==> ALLE CHECKS GRUEN" : `\n==> ${errors} FEHLER`);
process.exit(errors === 0 ? 0 : 1);

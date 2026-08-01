import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

let fail = 0;
const ok = (c, m) => { console.log((c ? "  ok   " : "  FAIL ") + m); if (!c) fail++; };
// HTML-Entities zur realen Textlaenge decodieren (Google misst gerenderten Text)
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&[a-z]+;/g, "x");

// ── 1. Bild-Maps: absolute URLs + lokale Existenz ────────────────────────────
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
function extract(name) {
  const re = new RegExp("const " + name + "\\s*=\\s*(\\[|\\{)");
  const m = re.exec(html);
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
}
const B = extract("BOSS_IMGS"), W = extract("WEAPON_IMGS");
// Soll-Mengen dynamisch aus index.html ableiten (bleibt gueltig wenn Daten wachsen)
const N_BOSSES = extract("BOSSES").length;
const N_WEAPONS = extract("WEAPONS").length;
const N_TE = extract("TRUE_ENDING").length;
// NEU (8-Seiten-Erweiterung): Soll-Mengen fuer die 5 zusaetzlichen SEO-Seiten,
// ebenso dynamisch aus index.html abgeleitet statt fest verdrahtet. ENEMIES ist
// (anders als BOSSES/WEAPONS/TRUE_ENDING/ARMOR/CRAFTING/TROPHIES/SIDE_QUESTS)
// kein flaches Array, sondern ein Objekt aus Gruppen-Arrays (wild/kreaturen/
// fraktionen) — darum Summe aller Gruppenlaengen statt .length direkt, analog
// zu GROUPS.reduce(...) in parts/bestiarium.mjs, aber ohne die Gruppennamen
// fest zu verdrahten.
const N_ARMOR = extract("ARMOR").length;
const N_CRAFTING = extract("CRAFTING").length;
const N_TROPHIES = extract("TROPHIES").length;
const ENEMIES = extract("ENEMIES");
const N_ENEMIES = Object.values(ENEMIES).reduce((sum, arr) => sum + arr.length, 0);
const N_SIDE_QUESTS = extract("SIDE_QUESTS").length;
const allImgVals = [...Object.values(B), ...Object.values(W)];
const absUrls = allImgVals.filter((v) => /^https?:/i.test(v));
console.log(`\n[Bild-Maps] BOSS_IMGS=${Object.keys(B).length}, WEAPON_IMGS=${Object.keys(W).length}, absolute URLs=${absUrls.length}`);
const localImgs = allImgVals.filter((v) => !/^https?:/i.test(v));
const missingLocal = localImgs.filter((v) => !fs.existsSync(path.join(ROOT, v)));
ok(missingLocal.length === 0, `alle ${localImgs.length} lokalen Bildpfade existieren (fehlend: ${missingLocal.length})`);
missingLocal.slice(0, 8).forEach((v) => console.log("       FEHLT:", v));

// ── 2. Pro Seite: SEO-Grundgeruest ───────────────────────────────────────────
const pages = {
  "bosse.html": { expectArticles: N_BOSSES, sec: "/#sec-bosses" },
  "waffen.html": { expectRows: N_WEAPONS, sec: "/#sec-weapons" },
  "true-ending.html": { expectTe: N_TE, sec: "/#sec-checklists" },
  // NEU (8-Seiten-Erweiterung): die 5 zusaetzlichen SEO-Seiten. Jede bekommt
  // statt eines eigenen expectXxx-Felds ein generisches "count"-Feld
  // { regex, expected, label } — das ist der 1:1-Nachbau des COUNT_CHECK(ctx)-
  // Vertrags, den jedes Modul in parts/ selbst exportiert (Regex und Label
  // hier wortgleich aus dem jeweiligen Modul uebernommen, Soll-Menge kommt aus
  // den dynamischen N_*-Werten oben).
  "trophaeen.html": { sec: "/#sec-achievements", count: { regex: /<tr>\s*<td/g, expected: N_TROPHIES, label: "Trophäen-Zeilen" } },
  "ruestungen.html": { sec: "/#sec-armor", count: { regex: /<tr>\s*<td/g, expected: N_ARMOR, label: "Rüstungs-Zeilen" } },
  "crafting.html": { sec: "/#sec-crafting", count: { regex: /<tr>\s*<td/g, expected: N_CRAFTING, label: "Crafting-Zeilen" } },
  "bestiarium.html": { sec: "/#sec-bestiary", count: { regex: /<article class="card" id="enemy-/g, expected: N_ENEMIES, label: "Gegner-Karten" } },
  "side-quests.html": { sec: "/#sec-quests", count: { regex: /<tr id="sq-/g, expected: N_SIDE_QUESTS, label: "Nebenquest-Zeilen" } },
};
const titles = new Set(), descs = new Set();
const refImgPaths = new Set();

for (const [file, exp] of Object.entries(pages)) {
  const p = path.join(ROOT, file);
  ok(fs.existsSync(p), `${file} existiert`);
  const c = fs.readFileSync(p, "utf8");
  console.log(`\n[${file}]`);

  const h1 = (c.match(/<h1[ >]/g) || []).length;
  ok(h1 === 1, `genau ein <h1> (gefunden: ${h1})`);

  const title = decode((c.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
  ok(title.length > 10 && title.length <= 65, `Title-Laenge ${title.length} (10-65)`);
  ok(!titles.has(title), `Title eindeutig`); titles.add(title);

  const desc = decode((c.match(/<meta name="description" content="([\s\S]*?)">/) || [])[1] || "");
  ok(desc.length >= 70 && desc.length <= 175, `Meta-Description-Laenge ${desc.length} (70-175)`);
  ok(!descs.has(desc), `Description eindeutig`); descs.add(desc);

  ok(/<link rel="canonical" href="https:\/\/crimson-desert-wiki\.netlify\.app\//.test(c), "canonical gesetzt");
  ok(c.includes(`href="${exp.sec}"`), `Deep-Link in App (${exp.sec}) vorhanden`);

  // JSON-LD valide?
  const ld = [...c.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  ok(ld.length >= 1, `${ld.length} JSON-LD Block`);
  ld.forEach((m, i) => { try { JSON.parse(m[1]); ok(true, `JSON-LD #${i + 1} valide`); } catch (e) { ok(false, `JSON-LD #${i + 1} PARSE-FEHLER: ${e.message}`); } });

  // Inhalts-Counts
  if (exp.expectArticles) {
    const n = (c.match(/<article class="card"/g) || []).length;
    ok(n === exp.expectArticles, `${n} Boss-Artikel (Soll ${exp.expectArticles})`);
  }
  if (exp.expectRows) {
    const n = (c.match(/<tr>\s*<td>/g) || []).length; // nur Datenzeilen, nicht <thead><tr><th>
    ok(n === exp.expectRows, `${n} Waffen-Datenzeilen (Soll ${exp.expectRows})`);
  }
  if (exp.expectTe) {
    const n = (c.match(/<ul class="te">[\s\S]*?<\/ul>/g) || []).join("").match(/<li>/g)?.length || 0;
    ok(n === exp.expectTe, `${n} True-Ending-Punkte (Soll ${exp.expectTe})`);
  }
  // NEU (8-Seiten-Erweiterung): generischer Count-Check fuer die 5 neuen Seiten.
  if (exp.count) {
    const n = (c.match(exp.count.regex) || []).length;
    ok(n === exp.count.expected, `${n} ${exp.count.label} (Soll ${exp.count.expected})`);
  }

  // Alle referenzierten lokalen Bilder sammeln
  [...c.matchAll(/src="\/(cd_assets\/[^"]+)"/g)].forEach((m) => refImgPaths.add(m[1]));
  // Kaputtes /https:-Praefix (absolute URL faelschlich mit Slash)?
  ok(!/src="\/https?:/.test(c), "kein kaputtes /https:-Praefix bei Bildern");
}

// ── 3. Alle in den Seiten referenzierten Bilder existieren lokal ─────────────
console.log(`\n[Referenzierte Bilder] ${refImgPaths.size} eindeutige Pfade`);
const refMissing = [...refImgPaths].filter((v) => !fs.existsSync(path.join(ROOT, v)));
ok(refMissing.length === 0, `alle referenzierten Bilder existieren (fehlend: ${refMissing.length})`);
refMissing.slice(0, 8).forEach((v) => console.log("       FEHLT:", v));

// ── 4. sitemap.xml ───────────────────────────────────────────────────────────
const sm = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
// NEU (8-Seiten-Erweiterung): alle 8 Seiten-URLs statt 3 (plus Startseite),
// Reihenfolge wie im Kopf-Menue (siehe harness.mjs NAV).
["/", "/bosse", "/waffen", "/ruestungen", "/crafting", "/bestiarium", "/side-quests", "/trophaeen", "/true-ending"].forEach((u) =>
  ok(sm.includes(`<loc>https://crimson-desert-wiki.netlify.app${u}</loc>`), `sitemap enthaelt ${u}`));

console.log(`\n${fail === 0 ? "ALLE CHECKS BESTANDEN" : fail + " CHECK(S) FEHLGESCHLAGEN"}`);
process.exit(fail === 0 ? 0 : 1);

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
// NEU (26.08.2026): hauptquests.html und patch-notes.html. MAIN_QUESTS ist wie
// ENEMIES nicht flach, sondern nach Kapiteln gruppiert -- deshalb Summe der
// quests-Arrays statt .length, analog zu parts/hauptquests.mjs.
const MAIN_QUESTS = extract("MAIN_QUESTS");
const N_MAIN_QUESTS = MAIN_QUESTS.reduce((sum, c) => sum + c.quests.length, 0);
const PATCHES = extract("PATCHES");
const N_PATCHES = PATCHES.length;
// NEU (29.08.2026): fraktionen.html und npcs.html. FAC_DATA ist wie MAIN_QUESTS
// nach Ebenen gruppiert (Region -> Fraktion -> Quests), daher Summe aller
// quests-Arrays statt .length. NPCS ist wie ENEMIES ein Objekt aus
// Gruppen-Arrays (companions/allies/antagonists/merchants), daher Summe aller
// Gruppenlaengen. Beides bewusst hier neu gerechnet und NICHT aus ZAHLEN() der
// Module gezogen -- ein Fehler dort soll auffallen, nicht mitlaufen.
const FAC_DATA = extract("FAC_DATA");
const N_FAC_QUESTS = FAC_DATA.regions.reduce((sum, r) =>
  sum + r.factions.reduce((m, f) => m + f.quests.length, 0), 0);
const NPCS = extract("NPCS");
const N_NPCS = Object.values(NPCS).reduce((sum, arr) => sum + arr.length, 0);
// NEU (07.10.2026): zehn Themen-Seiten. Soll-Mengen auch hier bewusst selbst
// gerechnet statt aus ZAHLEN()/COUNT_CHECK() der Module uebernommen.
// RUINS_DATA steht in data/d08-ruins-data.js als "var", extract() sucht "const".
const extractVar = (name) => {
  const m = new RegExp("(?:var|let|const) " + name + "\\s*=\\s*([\\[{])").exec(html);
  if (!m) throw new Error("Datenstruktur nicht gefunden: " + name);
  const i = m.index + m[0].length - 1;
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
};
const KLIFF_BAEUME = [["Kliff", extract("KLIFF_STAMINA")], ["Kliff", extract("KLIFF_SPIRIT")], ["Kliff", extract("KLIFF_HEALTH")]];
const SKILL_BAEUME = [...KLIFF_BAEUME, ["Damiane", extract("DAMIANE_SKILLS")], ["Oongka", extract("OONGKA_SKILLS")]];
const WATCH_AND_LEARN = extract("WATCH_AND_LEARN");
const N_SKILLS = SKILL_BAEUME.reduce((n, [, b]) => n + b.length, 0);
const CORES = extract("CORES"), CORE_TIERS = extract("CORE_TIERS");
const CHAPTERS = extract("CHAPTERS");
const PUZZLES = extract("PUZZLES");
const RUINS_DATA = extractVar("RUINS_DATA");
const RUINEN = Object.values(RUINS_DATA).flat();
const SECRETS = Object.fromEntries(["SECRETS_EASTER_EGGS", "SECRETS_LOCATIONS", "SECRETS_MECHANICS",
  "SECRETS_HIDDEN_WEAPONS", "SECRETS_CRESSET_REGIONS", "SECRETS_TOOLS", "FRAGMENT_REGIONS", "CRESSET_REGIONS"]
  .map((n) => [n, extract(n)]));
const N_SECRETS = ["SECRETS_EASTER_EGGS", "SECRETS_LOCATIONS", "SECRETS_MECHANICS", "SECRETS_HIDDEN_WEAPONS",
  "SECRETS_CRESSET_REGIONS", "SECRETS_TOOLS", "FRAGMENT_REGIONS"].reduce((n, k) => n + SECRETS[k].length, 0);
const MOUNTS = extract("MOUNTS"), PETS = extract("PETS");
const WITCHES = extract("WITCHES"), WITCH_SYNTHESIS = extract("WITCH_SYNTHESIS");
const ACCESSORIES = extract("ACCESSORIES");
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
  "true-ending.html": { expectTe: N_TE, sec: "/#sec=quests" },
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
  "side-quests.html": { sec: "/#sec=quests&tab=sq", count: { regex: /<tr id="sq-/g, expected: N_SIDE_QUESTS, label: "Nebenquest-Zeilen" } },
  "hauptquests.html": { sec: "/#sec=quests&tab=mq", count: { regex: /<tr id="mq-/g, expected: N_MAIN_QUESTS, label: "Hauptquest-Zeilen" } },
  // Die Patch-Seite zaehlt Meta-Zeilen statt Karten: sie wickelt bewusst kein
  // <article> um einen Patch, damit die Seitensuche die Einzelpunkte (Stand
  // 06.10.2026: 844) findet und nicht die Patches (47; SEL nimmt den aeussersten Treffer). Begruendung
  // steht im Kopf von parts/patch-notes.mjs.
  "patch-notes.html": { sec: "/#sec-patches", count: { regex: /<p class="pmeta" id="patch-/g, expected: N_PATCHES, label: "Patch-Meta-Zeilen" } },
  // NEU (29.08.2026): Regex und Label wortgleich aus COUNT_CHECK(ctx) in
  // parts/fraktionen.mjs bzw. parts/npcs.mjs, "sec" aus deren DEEPLINK-Export.
  // Die Fraktionsseite zaehlt Quest-Zeilen, nicht Fraktionen: eine Huelle je
  // Fraktion wuerde die Seitensuche auf die Fraktion statt die Quest werfen.
  "fraktionen.html": { sec: "/#sec=quests&tab=fac", count: { regex: /<tr id="fr-/g, expected: N_FAC_QUESTS, label: "Fraktionsquest-Zeilen" } },
  "npcs.html": { sec: "/#sec-npcs", count: { regex: /<article class="card" id="npc-/g, expected: N_NPCS, label: "NPC-Karten" } },
  // NEU (07.10.2026): Regex und Label aus COUNT_CHECK der zehn Module.
  "skills.html": { sec: "/#sec-skills", count: { regex: /<tr id="(?:skill|wl)-/g, expected: N_SKILLS + WATCH_AND_LEARN.length, label: "Skill- und Watch-&-Learn-Zeilen" } },
  "hexen.html": { sec: "/#sec-witches", count: { regex: /<(?:article class="card hx-card"|tr) id="(?:hexe|synth)-/g, expected: WITCHES.length + WITCH_SYNTHESIS.length, label: "Hexen-Karten und Synthese-Zeilen" } },
  "abyss-cores.html": { sec: "/#sec-cores", count: { regex: /<tr id="core-/g, expected: CORES.length, label: "Core-Zeilen" } },
  "accessoires.html": { sec: "/#sec-accessories", count: { regex: /<article class="card" id="acc-/g, expected: ACCESSORIES.length, label: "Accessoire-Karten" } },
  "kapitel-guide.html": { sec: "/#sec-chapters", count: { regex: /<article class="card" id="kap-/g, expected: CHAPTERS.length, label: "Kapitel-Karten" } },
  "mounts.html": { sec: "/#sec-mounts", count: { regex: /<article class="card" id="mount-/g, expected: MOUNTS.length, label: "Mount-Karten" } },
  "pets.html": { sec: "/#sec-pets", count: { regex: /<tr id="pet-/g, expected: PETS.length, label: "Pet-Zeilen" } },
  "ruinen.html": { sec: "/#sec-ruins", count: { regex: /<article class="card" id="ruine-/g, expected: RUINEN.length, label: "Ruinen-Karten" } },
  "raetsel.html": { sec: "/#sec-puzzles", count: { regex: /<article class="card" id="raetsel-/g, expected: PUZZLES.length, label: "Rätsel-Karten" } },
  "geheimnisse.html": { sec: "/#sec-secrets", count: { regex: /<(?:article class="card"|tr) id="geh-/g, expected: N_SECRETS, label: "Geheimnis-Karten und -Zeilen" } },
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

  ok(/<link rel="canonical" href="https:\/\/crimson-desert-wiki\.com\//.test(c), "canonical gesetzt");
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

// ── 4. Zahlen in den redaktionellen Texten ───────────────────────────────────
// Der Anlass: ruestungen.html warb ab dem 14.08.2026 in Title, H1 und ItemList mit
// 337 Ruestungsteilen, waehrend Intro-Absatz und zwei FAQ-Antworten weiterhin 314
// nannten — sichtbar UND im FAQPage-JSON-LD. Dieser Check lief damals gruen durch,
// weil er die Fliesstexte gar nicht ansah. Er prueft jetzt beides:
//
//   (a) Quell-Lint: in scripts/seo-content/ duerfen Mengenangaben nur als
//       Platzhalter stehen ({{anzahl}} / {{verpassbar|wort}}). Eine fest
//       verdrahtete Zahl ist der Fehler selbst, unabhaengig davon, ob sie
//       gerade zufaellig stimmt.
//   (b) Ausgabe-Abgleich: jede Zahl in Intro und FAQ der erzeugten Seite muss
//       einer echten Datenmenge entsprechen. Die Soll-Werte leitet dieser
//       Pruefer BEWUSST selbst aus index.html ab statt ZAHLEN() der Module
//       aufzurufen — sonst wuerde er einen Fehler in ZAHLEN() mitmachen.
//
// Ausgeschriebene Zahlwoerter zaehlen mit ("fuenf verpassbare", "sechs Regionen"):
// genau so eine Angabe war falsch (SIDE_QUESTS hat fuenf Regionen, nicht sechs)
// und waere einem reinen Ziffern-Check entgangen. "ein/eine" bleibt aussen vor,
// das ist im Deutschen meist Artikel und nicht Menge.
const ZAHLWORT = { zwei: 2, drei: 3, vier: 4, "fünf": 5, sechs: 6, sieben: 7, acht: 8, neun: 9, zehn: 10, elf: 11, "zwölf": 12 };
const WORT_RE = new RegExp("\\b(" + Object.keys(ZAHLWORT).join("|") + ")\\b", "gi");
const SEO_DIR = path.join(ROOT, "scripts", "seo-content");
const ohnePlatzhalter = (t) => t.replace(/\{\{\w+(\|wort)?\}\}/g, " ");

// GRENZE DIESES CHECKS, damit sie niemand ueberschaetzt: Die Ausgabe-Pruefung (b)
// testet nur MENGENZUGEHOERIGKEIT, nicht den Bezug. Steht auf einer Seite "sechs
// Regionen", waehrend 6 dort als Anzahl verpassbarer Quests eine gueltige Zahl
// ist, rutscht die falsche Aussage durch. Genau so war es bei side-quests.html.
// Der Quell-Lint (a) ist deshalb der eigentliche Waechter — er verbietet fest
// verdrahtete Zahlen komplett, unabhaengig davon, ob sie gerade stimmen.
console.log("\n[Redaktionelle Texte] scripts/seo-content/");
// Seit 07.10.2026 zusaetzlich die Seitendateien seo-content/seiten/<slug>.json
// (Intro + FAQ je neuer Seite), gleiche Regeln.
const SEITEN_JSON = fs.existsSync(path.join(SEO_DIR, "seiten"))
  ? fs.readdirSync(path.join(SEO_DIR, "seiten")).filter((f) => f.endsWith(".json")).sort().map((f) => "seiten/" + f) : [];
for (const datei of ["intros.json", "faq.json", ...SEITEN_JSON]) {
  const pfad = path.join(SEO_DIR, datei);
  if (!fs.existsSync(pfad)) { ok(false, `${datei} existiert`); continue; }
  const rest = ohnePlatzhalter(fs.readFileSync(pfad, "utf8"));
  const ziffern = [...new Set((rest.match(/\d+/g) || []))];
  ok(ziffern.length === 0, `${datei}: keine fest verdrahtete Ziffer (gefunden: ${ziffern.join(", ") || "-"})`);
  const woerter = [...new Set((rest.match(WORT_RE) || []).map((w) => w.toLowerCase()))];
  ok(woerter.length === 0, `${datei}: keine ausgeschriebene Mengenangabe (gefunden: ${woerter.join(", ") || "-"})`);
}

// trophaeen.json faellt aus dem Voll-Lint heraus: die Freischalt-Anleitungen
// nennen legitim viele Spielzahlen (13 Konstellationen, 60 Geheimorte, 16
// Sanktume). Verboten sind dort nur die ABGELEITETEN Groessen — genau die
// driften. "Schalte alle 34 uebrigen Trophaeen frei" war TROPHIES.length-1 als
// Literal, und diese Datei lief bis 21.08.2026 an jeder Absicherung vorbei.
{
  const pfad = path.join(SEO_DIR, "trophaeen.json");
  if (fs.existsSync(pfad)) {
    const rest = ohnePlatzhalter(fs.readFileSync(pfad, "utf8"));
    const verboten = new Set([N_TROPHIES, N_TROPHIES - 1]);
    const treffer = [...new Set((rest.match(/\d+/g) || []).map(Number))].filter((n) => verboten.has(n));
    ok(treffer.length === 0, `trophaeen.json: keine abgeleitete Groesse als Literal (verboten: ${[...verboten].join(", ")}; gefunden: ${treffer.join(", ") || "-"})`);
  }
}

// Soll-Mengen je Seite, unabhaengig aus index.html abgeleitet.
const ARMOR = extract("ARMOR"), CRAFTING = extract("CRAFTING");
const TROPHIES = extract("TROPHIES"), SIDE_QUESTS = extract("SIDE_QUESTS");
const zaehl = (arr, f) => arr.filter(f).length;
// Gleiche Leer-Semantik wie has() in gen-seo.mjs, das parts/npcs.mjs fuer
// "NPC ohne Region" benutzt. Bewusst hier nachgebaut statt importiert: der
// Pruefer soll nicht denselben Helfer teilen wie der Erzeuger.
const belegt = (v) => v != null && String(v).trim() !== "" && String(v).trim() !== "–" && String(v).trim() !== "-";
const FAC_FACTIONS = FAC_DATA.regions.flatMap((r) => r.factions);
const FAC_QUESTS = FAC_FACTIONS.flatMap((f) => f.quests);
const NPCS_ALLE = Object.values(NPCS).flat();
const ERLAUBTE_ZAHLEN = {
  "ruestungen.html": [N_ARMOR, ...["Torso", "Kopf", "Hände", "Schuhe", "Mantel"].map((t) => zaehl(ARMOR, (a) => a.type === t))],
  "crafting.html": [N_CRAFTING, ...["Elixir", "Food", "Kuku-Gadget"].map((c) => zaehl(CRAFTING, (x) => x.cat === c)),
    new Set(CRAFTING.map((c) => c.station).filter(Boolean)).size,
    zaehl(CRAFTING, (c) => c.conf === "low" || c.conf === "medium")],
  "trophaeen.html": [N_TROPHIES, zaehl(TROPHIES, (t) => t.miss),
    ...["platinum", "gold", "silver", "bronze"].map((g) => zaehl(TROPHIES, (t) => t.grade === g))],
  "bestiarium.html": [N_ENEMIES, ...["wild", "kreaturen", "fraktionen"].map((k) => (ENEMIES[k] || []).length)],
  "side-quests.html": [N_SIDE_QUESTS, zaehl(SIDE_QUESTS, (q) => q.miss), new Set(SIDE_QUESTS.map((q) => q.region)).size],
  "hauptquests.html": [N_MAIN_QUESTS, MAIN_QUESTS.length,
    zaehl(MAIN_QUESTS.flatMap((c) => c.quests), (q) => q.miss),
    zaehl(MAIN_QUESTS.flatMap((c) => c.quests), (q) => q.conf === "medium"),
    zaehl(MAIN_QUESTS, (c) => c.boss)],
  "patch-notes.html": [N_PATCHES,
    PATCHES.reduce((n, p) => n + (p.features || []).length, 0),
    PATCHES.reduce((n, p) => n + (p.features || []).reduce((m, f) => m + f.items.length, 0), 0)],
  "fraktionen.html": [N_FAC_QUESTS, FAC_FACTIONS.length, FAC_DATA.regions.length,
    zaehl(FAC_FACTIONS, (f) => f.isNew),
    zaehl(FAC_QUESTS, (q) => q.conf === "medium" || q.conf === "low")],
  "npcs.html": [N_NPCS, NPCS.companions.length, NPCS.allies.length,
    NPCS.antagonists.length, NPCS.merchants.length,
    zaehl(NPCS_ALLE, (n) => !belegt(n.region)),
    zaehl(NPCS_ALLE, (n) => n.conf === "medium")],
  // NEU (07.10.2026)
  "skills.html": [new Set(SKILL_BAEUME.map(([c]) => c)).size,
    KLIFF_BAEUME.reduce((n, [, b]) => n + b.length, 0), ...SKILL_BAEUME.map(([, b]) => b.length),
    N_SKILLS, WATCH_AND_LEARN.length,
    new Set([...SKILL_BAEUME.flatMap(([, b]) => b.filter((s) => /MISSABLE|NICHT erlernbar/.test(s.prereq || "")).map((s) => s.name)),
      ...WATCH_AND_LEARN.filter((w) => w.miss).map((w) => w.skill)]).size],
  "abyss-cores.html": [CORES.length, ...["Weapon", "Armor", "Both"].map((s) => zaehl(CORES, (c) => c.slot === s)),
    zaehl(CORES, (c) => c.name.startsWith("Greater ")), zaehl(CORES, (c) => String(c.source).startsWith("Vorgesockelt in ")),
    Object.keys(CORE_TIERS).length],
  "kapitel-guide.html": [zaehl(CHAPTERS, (c) => typeof c.num === "number"), CHAPTERS.length, MAIN_QUESTS.length,
    zaehl(CHAPTERS, (c) => belegt(c.missable) && !/^\s*[—–-]/.test(c.missable))],
  "raetsel.html": [PUZZLES.length, ...[...new Set(PUZZLES.map((p) => p.cat))].map((k) => zaehl(PUZZLES, (p) => p.cat === k)),
    zaehl(PUZZLES, (p) => p.conf !== "high"),
    ((PUZZLES.find((p) => /Strongbox solving methods/.test(p.name)) || {}).detail || "").match(/\([a-d]\)/g)?.length || 0],
  "ruinen.html": [RUINEN.length, Object.keys(RUINS_DATA).length, zaehl(RUINEN, (r) => r.conf === "medium"),
    ...Object.values(RUINS_DATA).map((r) => r.length)],
  // 42 = Archive Entries der sechs Archive Records, in der App als questlog-Knowledge 1004713 bis 1004754 belegt.
  "geheimnisse.html": [SECRETS.CRESSET_REGIONS.reduce((n, r) => n + r.cap, 0), SECRETS.CRESSET_REGIONS.length,
    Math.max(...SECRETS.CRESSET_REGIONS.map((r) => r.cap)), Math.min(...SECRETS.CRESSET_REGIONS.map((r) => r.cap)),
    SECRETS.FRAGMENT_REGIONS.reduce((n, r) => n + r.cap, 0),
    ...["SECRETS_EASTER_EGGS", "SECRETS_LOCATIONS", "SECRETS_HIDDEN_WEAPONS", "SECRETS_MECHANICS", "SECRETS_TOOLS"].map((k) => SECRETS[k].length),
    1004754 - 1004713 + 1],
  "mounts.html": [MOUNTS.length, zaehl(MOUNTS, (m) => m.type.includes("Legendary")),
    zaehl(MOUNTS, (m) => /pferd/i.test(m.type) && !m.type.includes("Legendary")), zaehl(MOUNTS, (m) => m.type === "Drache"),
    zaehl(MOUNTS, (m) => m.type.includes("Sigil")), zaehl(MOUNTS, (m) => m.type.startsWith("Wildtier")),
    zaehl(MOUNTS, (m) => m.type.startsWith("Fahrzeug"))],
  "pets.html": [PETS.length, ...["cat", "dog", "critter"].map((t) => zaehl(PETS, (p) => p.type === t)),
    zaehl(PETS, (p) => p.type === "critter" && /^Vogel/.test(p.cat || "")),
    zaehl(PETS, (p) => p.type === "critter" && /^(Nager|Säugetier)/.test(p.cat || ""))],
  "hexen.html": [WITCHES.length, zaehl(WITCHES, (w) => (w.sanctums || []).length >= 3), WITCH_SYNTHESIS.length,
    zaehl(WITCH_SYNTHESIS, (s) => s.tier >= 1), zaehl(WITCH_SYNTHESIS, (s) => s.role === "effect-core"),
    zaehl(WITCH_SYNTHESIS, (s) => s.role === "witch-other" && /^Riding .* Amulet/.test(s.name)),
    zaehl(WITCH_SYNTHESIS, (s) => s.role !== "witch-other")],
  "accessoires.html": [ACCESSORIES.length, ...["Ring", "Necklace", "Earring"].map((t) => zaehl(ACCESSORIES, (a) => a.type === t)),
    zaehl(ACCESSORIES, (a) => /Unique/.test(a.effect || ""))],
};

for (const [datei, erlaubt] of Object.entries(ERLAUBTE_ZAHLEN)) {
  const c = fs.readFileSync(path.join(ROOT, datei), "utf8");
  const menge = new Set(erlaubt);
  // Intro-Absatz + alle sichtbaren FAQ-Antworten. Das FAQPage-JSON-LD wird aus
  // derselben Quelle gebaut und ist damit mitgeprueft.
  const stellen = [
    ...[...c.matchAll(/<p class="intro">([\s\S]*?)<\/p>/g)].map((m) => ["Intro", m[1]]),
    ...[...c.matchAll(/<details class="faq">([\s\S]*?)<\/details>/g)].map((m) => ["FAQ", m[1]]),
  ];
  const falsch = [];
  for (const [wo, roh] of stellen) {
    const text = decode(roh.replace(/<[^>]+>/g, " "));
    for (const z of text.match(/\d+/g) || []) if (!menge.has(Number(z))) falsch.push(`${wo}: "${z}"`);
    for (const w of text.match(WORT_RE) || []) if (!menge.has(ZAHLWORT[w.toLowerCase()])) falsch.push(`${wo}: "${w}"`);
  }
  ok(falsch.length === 0, `${datei}: alle Zahlen in Intro/FAQ decken sich mit den Daten [${erlaubt.join(",")}]`);
  falsch.slice(0, 8).forEach((f) => console.log("       ABWEICHUNG " + f));
}

// ── 4a. Startseite: Zahlen in Meta-Descriptions, JSON-LD und Roadmap-FAQ ─────
// index.html ist Handarbeit; die Meta-Description nennt "100 Bosse, 500 Waffen"
// als fest getippte Ziffern und driftet damit still, sobald BOSSES oder WEAPONS
// wachsen -- genau das ist an den erzeugten Seiten am 14.08.2026 passiert. Jede
// "<Zahl> <Substantiv>"-Angabe im <head> muss deshalb einer echten Datenmenge
// entsprechen; eine Mengenangabe mit unbekanntem Substantiv ist nicht pruefbar
// und faellt durch, statt unbemerkt zu driften. Die Roadmap-FAQ (div.rm-faq) nennt
// Patchstaende und Spielzahlen; dort wird nur geprueft, dass keine Datenmenge
// (Bosse, Waffen ...) mit falscher Zahl auftaucht.
{
  const start = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const kopf = start.slice(0, start.indexOf("</head>"));
  const SOLL_NOMEN = {
    bosse: N_BOSSES, bossen: N_BOSSES, waffen: N_WEAPONS, "rüstungen": N_ARMOR,
    rezepte: N_CRAFTING, gegner: N_ENEMIES, npcs: N_NPCS, nebenquests: N_SIDE_QUESTS,
    hauptquests: N_MAIN_QUESTS, "trophäen": N_TROPHIES, patches: N_PATCHES,
    fraktionsquests: N_FAC_QUESTS, fraktionen: FAC_FACTIONS.length,
  };
  const mengen = (text) => [...decode(text).matchAll(/(?<![\d.,])(\d{1,3}(?:\.\d{3})*|\d+)\s+([A-Za-zÄÖÜäöüß-]{3,})/g)]
    .map((m) => ({ n: Number(m[1].replace(/\./g, "")), nomen: m[2].toLowerCase(), roh: m[0] }));
  const stellen = [
    ...[...kopf.matchAll(/<meta (?:name|property)="((?:og:|twitter:)?description)" content="([^"]*)"/g)].map((m) => [`meta ${m[1]}`, m[2]]),
    ...[...kopf.matchAll(/"description"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => ["JSON-LD description", m[1]]),
  ];
  ok(stellen.some(([w]) => w === "meta description"), "index.html: <meta name=description> gefunden");
  const abweich = [], unbekannt = [];
  let geprueft = 0;
  for (const [wo, text] of stellen) {
    for (const g of mengen(text)) {
      if (!(g.nomen in SOLL_NOMEN)) { unbekannt.push(`${wo}: "${g.roh}"`); continue; }
      geprueft++;
      if (g.n !== SOLL_NOMEN[g.nomen]) abweich.push(`${wo}: "${g.roh}" (Daten: ${SOLL_NOMEN[g.nomen]})`);
    }
    for (const w of decode(text).match(WORT_RE) || []) unbekannt.push(`${wo}: Zahlwort "${w}"`);
  }
  ok(abweich.length === 0, `index.html: ${geprueft} Mengenangabe(n) in Meta-/JSON-LD-Description decken sich mit den Daten`);
  abweich.forEach((f) => console.log("       ABWEICHUNG " + f));
  ok(unbekannt.length === 0, `index.html: keine nicht abgleichbare Mengenangabe in Meta-/JSON-LD-Description (gefunden: ${unbekannt.join("; ") || "-"})`);

  const rmStart = start.indexOf('<div class="rm-faq"');
  if (rmStart >= 0) {
    let tiefe = 0, rmEnde = start.length;
    const re = /<(\/?)div\b/g; re.lastIndex = rmStart;
    for (let m; (m = re.exec(start));) { tiefe += m[1] ? -1 : 1; if (tiefe === 0) { rmEnde = m.index + 6; break; } }
    const faqText = start.slice(rmStart, rmEnde).replace(/<[^>]+>/g, " ");
    const falsch = mengen(faqText).filter((g) => g.nomen in SOLL_NOMEN && g.n !== SOLL_NOMEN[g.nomen]).map((g) => `"${g.roh}" (Daten: ${SOLL_NOMEN[g.nomen]})`);
    ok(falsch.length === 0, `index.html: Roadmap-FAQ nennt keine Datenmenge mit falscher Zahl (${falsch.join("; ") || "-"})`);
  }
}

// ── 4a-2. FAQ-Namenslisten gegen die Daten ───────────────────────────────────
// Die FAQ "Welche ... sind verpassbar?" zaehlt Namen auf (Trophaeen, Nebenquests).
// Zahlen sind per Platzhalter abgesichert, die Namen waren es nicht: wird eine
// Trophaee oder Nebenquest neu als verpassbar markiert, bliebe die Liste im Text
// stehen. Die Aufzaehlung (Text zwischen dem ersten ": " und dem ersten Satzende
// der Antwort) muss deshalb genau die miss:true-Eintraege nennen -- keinen fehlenden,
// keinen ueberzaehligen. Die Namen der Aufzaehlung stehen im Quelltext (faq.json),
// weil Fliesstext im Rest der Antwort (Herausforderungen wie "Into the Barrage")
// legitim weitere Namen nennt.
{
  const faqQuelle = JSON.parse(fs.readFileSync(path.join(SEO_DIR, "faq.json"), "utf8"));
  const wortGrenze = (text, name) => new RegExp("(?<![\\p{L}\\p{N}'’])" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u").test(text);
  const listen = [
    ["trophaeen", "Trophäen", TROPHIES.map((t) => [t.name, !!t.miss])],
    ["side-quests", "Nebenquests", SIDE_QUESTS.map((q) => [q.q, !!q.miss])],
  ];
  for (const [seite, label, eintraege] of listen) {
    const frage = (faqQuelle[seite] || []).find((f) => /verpassbar/i.test(f.frage) && /^welche/i.test(f.frage));
    if (!frage) { ok(false, `faq.json → ${seite}: FAQ "Welche ... verpassbar" gefunden`); continue; }
    const antwort = ohnePlatzhalter(frage.antwort);
    const i = antwort.indexOf(": ");
    const ende = i < 0 ? -1 : antwort.slice(i + 2).search(/\.(\s|$)/);
    const liste = i < 0 ? "" : antwort.slice(i + 2, ende < 0 ? undefined : i + 2 + ende);
    const soll = eintraege.filter(([, miss]) => miss).map(([n]) => n);
    const fehlt = soll.filter((n) => !wortGrenze(liste, n));
    const zuviel = eintraege.filter(([n, miss]) => !miss && wortGrenze(liste, n)).map(([n]) => n);
    ok(i >= 0 && fehlt.length === 0 && zuviel.length === 0,
      `faq.json → ${seite}: Aufzählung der verpassbaren ${label} deckt sich mit miss:true (${soll.length} Einträge; fehlt: ${fehlt.join(", ") || "-"}; zu viel: ${zuviel.join(", ") || "-"})`);
  }
}

// Einzelne Namen und Rangfolgen, die faq.json fest nennt (kein Platzhalter moeglich):
// Platin-Trophaee, Boss "am Ende der Kapitel-Sortierung", Region mit den meisten
// Fraktionsquests. Jede Aussage wird gegen die Daten gerechnet; kippt sie, wird
// der Text zum Fehler statt still falsch zu bleiben.
{
  const faqQuelle = JSON.parse(fs.readFileSync(path.join(SEO_DIR, "faq.json"), "utf8"));
  const alle = (seite) => (faqQuelle[seite] || []).map((f) => f.frage + " " + f.antwort).join("\n");
  const platin = TROPHIES.filter((t) => t.grade === "platinum").map((t) => t.name);
  ok(platin.length === 1 && alle("trophaeen").includes(`„${platin[0]}“`),
    `faq.json → trophaeen: nennt die Platin-Trophäe "${platin.join(", ")}" (Daten: ${platin.length} Platin)`);
  // Reihenfolge wie buildBosse() in gen-seo.mjs: Kapitel aufsteigend, dann Name (localeCompare).
  const storyBosse = extract("BOSSES").filter((b) => b.chapter != null)
    .sort((a, b) => a.chapter - b.chapter || a.name.localeCompare(b.name));
  const letzter = storyBosse[storyBosse.length - 1].name;
  ok(alle("bosse").includes(letzter + " an letzter Stelle"), `faq.json → bosse: letzter Story-Boss "${letzter}" stimmt mit der Kapitel-Sortierung überein`);
  const proRegion = FAC_DATA.regions.map((r) => [r.region, r.factions.reduce((n, f) => n + f.quests.length, 0)]).sort((a, b) => b[1] - a[1]);
  const spitze = proRegion[0][0];
  ok(alle("fraktionen").includes("Aktuell " + spitze + ":") && proRegion[0][1] > proRegion[1][1],
    `faq.json → fraktionen: Region mit den meisten Fraktionsquests ist ${spitze} (${proRegion[0][1]} gegen ${proRegion[1][0]} ${proRegion[1][1]})`);
}

// ── 4a-3. Anker (id) der Seiten: eindeutig, sauber geschlitzt, zu den Daten passend ──
// slug() in gen-seo.mjs macht aus Namen die Anker. Drei Fallen: (1) Umlaute
// koennen komponiert (ä) oder zerlegt (a + U+0308) im Datenbestand stehen --
// zerlegt wuerde "a" statt "ae" ergeben und den Anker still verschieben;
// (2) Apostrophe werden zu "-" ("Harry's" -> harry-s); (3) zwei Namen koennen auf
// denselben Slug fallen. Geprueft wird deshalb: Daten NFC, ids je Seite eindeutig
// und nur [a-z0-9-], jeder #a-/#-Sprunglink hat ein Ziel, und die ids der Karten bzw.
// Zeilen entsprechen einer hier unabhaengig gerechneten slug-Fassung der Namen.
{
  const slugUnabh = (t) => String(t).normalize("NFC").toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const nichtNfc = [];
  const laufe = (o, wo, d = 0) => {
    if (d > 7 || o == null) return;
    if (typeof o === "string") { if (o.normalize("NFC") !== o) nichtNfc.push(wo + ": " + o.slice(0, 30)); }
    else if (Array.isArray(o)) o.forEach((x) => laufe(x, wo, d + 1));
    else if (typeof o === "object") for (const [k, v] of Object.entries(o)) { laufe(k, wo + ".key", d + 1); laufe(v, wo, d + 1); }
  };
  [["BOSSES", extract("BOSSES")], ["ENEMIES", ENEMIES], ["NPCS", NPCS], ["SIDE_QUESTS", SIDE_QUESTS],
   ["FAC_DATA", FAC_DATA], ["MAIN_QUESTS", MAIN_QUESTS], ["PATCHES", PATCHES]].forEach(([n, d]) => laufe(d, n));
  ok(nichtNfc.length === 0, `Namen in den SEO-Daten sind NFC (zerlegte Umlaute würden Anker verschieben; gefunden: ${nichtNfc.length}${nichtNfc.length ? " -> " + nichtNfc.slice(0, 3).join("; ") : ""})`);

  const soll = {
    "bosse.html": extract("BOSSES").map((b) => "boss-" + slugUnabh(b.name)),
    "bestiarium.html": Object.values(ENEMIES).flat().map((e) => "enemy-" + slugUnabh(e.name)),
    "npcs.html": NPCS_ALLE.map((n) => "npc-" + slugUnabh(n.name)),
    "side-quests.html": SIDE_QUESTS.map((q) => "sq-" + slugUnabh(q.region) + "-" + slugUnabh(q.q)),
    "fraktionen.html": FAC_DATA.regions.flatMap((r) => r.factions.flatMap((f) => f.quests.map((q) =>
      "fr-" + slugUnabh(r.region) + "-" + slugUnabh(f.name) + "-" + slugUnabh(q.q)))),
    // NEU (07.10.2026). pets.html fehlt bewusst: doppelte Namen bekommen dort
    // einen Icon-Zusatz, das deckt die Zaehlung (COUNT_CHECK) ab.
    "skills.html": [...SKILL_BAEUME.flatMap(([c, b]) => b.map((s) => "skill-" + slugUnabh(c) + "-" + slugUnabh(s.name))),
      ...WATCH_AND_LEARN.map((w) => "wl-" + slugUnabh(w.skill))],
    "abyss-cores.html": CORES.map((c) => "core-" + slugUnabh(c.name)),
    "kapitel-guide.html": CHAPTERS.map((c) => "kap-" + slugUnabh(c.num)),
    "raetsel.html": PUZZLES.map((p) => "raetsel-" + slugUnabh(p.name)),
    "ruinen.html": RUINEN.map((r) => "ruine-" + slugUnabh(r.name)),
    "mounts.html": MOUNTS.map((m) => "mount-" + slugUnabh(m.name)),
    "accessoires.html": ACCESSORIES.map((a) => "acc-" + slugUnabh(a.name)),
    "hexen.html": [...WITCHES.map((w) => "hexe-" + slugUnabh(w.name)), ...WITCH_SYNTHESIS.map((s) => "synth-" + slugUnabh(s.name))],
    "geheimnisse.html": [...SECRETS.SECRETS_EASTER_EGGS.map((x) => "geh-ei-" + slugUnabh(x.name)),
      ...SECRETS.SECRETS_LOCATIONS.map((x) => "geh-ort-" + slugUnabh(x.name)),
      ...SECRETS.SECRETS_MECHANICS.map((x) => "geh-mech-" + slugUnabh(x.name)),
      ...SECRETS.SECRETS_HIDDEN_WEAPONS.map((x) => "geh-waffe-" + slugUnabh(x.name)),
      ...SECRETS.SECRETS_CRESSET_REGIONS.map((x) => "geh-cresset-" + slugUnabh(x.name)),
      ...SECRETS.SECRETS_TOOLS.map((x) => "geh-tool-" + slugUnabh(x.tool)),
      ...SECRETS.FRAGMENT_REGIONS.map((x) => "geh-fragment-" + slugUnabh(x.name))],
  };
  for (const datei of Object.keys(pages)) {
    const c = fs.readFileSync(path.join(ROOT, datei), "utf8");
    const ids = [...c.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]);
    const gesehen = new Set(), doppelt = new Set();
    ids.forEach((i) => (gesehen.has(i) ? doppelt.add(i) : gesehen.add(i)));
    const schlecht = ids.filter((i) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(i));
    const ohneZiel = [...c.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]).filter((h) => !gesehen.has(h));
    ok(doppelt.size === 0 && schlecht.length === 0 && ohneZiel.length === 0,
      `${datei}: ${ids.length} ids eindeutig und sauber, alle #-Sprunglinks mit Ziel (doppelt: ${doppelt.size}, unsauber: ${schlecht.length}, ohne Ziel: ${ohneZiel.length}${(doppelt.size + schlecht.length + ohneZiel.length) ? " -> " + [...doppelt, ...schlecht, ...ohneZiel].slice(0, 3).join(", ") : ""})`);
    if (soll[datei]) {
      const fehlend = soll[datei].filter((i) => !gesehen.has(i));
      ok(fehlend.length === 0, `${datei}: alle ${soll[datei].length} Datensatz-Anker entsprechen der unabhängig berechneten slug-Fassung (fehlend: ${fehlend.length}${fehlend.length ? " -> " + fehlend.slice(0, 3).join(", ") : ""})`);
    }
  }
}

// ── 4a-4. Typ-Abdeckung und Formatinfos ──────────────────────────────────────
// ARMOR.type: ruestungen.mjs gruppiert nach TYPE_ORDER; ein neuer type-Wert wuerde
// ohne Abschnitt gar nicht erscheinen (COUNT_CHECK bricht dann ab) und stuende nicht
// in der FAQ-Aufzaehlung der Teile. Neuer Typ -> hier bewusst nachziehen.
{
  const bekannt = new Set(["Torso", "Kopf", "Hände", "Schuhe", "Mantel"]);
  const neu = [...new Set(ARMOR.map((a) => a.type).filter((t) => !bekannt.has(t)))];
  ok(neu.length === 0, `ARMOR.type nur bekannte Werte (neu: ${neu.join(", ") || "-"}; bei neuem Wert faq.json "ruestungen" und ERLAUBTE_ZAHLEN nachziehen)`);
}
// Boss-Seite: "ueberwiegend Welt- und Fraktionsbosse" (FAQ) und die Ueberschrift der
// kapitellosen Bosse stuetzen sich auf bossType() der App. Die Funktion wird als Text
// aus index.html gelesen (nicht importiert) und auf die Daten angewandt.
{
  const bt = /function bossType\(b\)\{[\s\S]*?\n\}/.exec(fs.readFileSync(path.join(ROOT, "index.html"), "utf8"));
  ok(!!bt, "index.html: bossType() lesbar");
  if (bt) {
    const bossType = new Function(bt[0] + "; return bossType;")();
    const ohneKap = extract("BOSSES").filter((b) => b.chapter == null);
    const verteilung = {};
    ohneKap.forEach((b) => { const t = bossType(b); verteilung[t] = (verteilung[t] || 0) + 1; });
    const wf = (verteilung.World || 0) + (verteilung.Faction || 0);
    ok(wf * 2 > ohneKap.length, `Bosse ohne Kapitel: Welt- und Fraktionsbosse überwiegen weiterhin (${wf} von ${ohneKap.length}; Verteilung ${JSON.stringify(verteilung)})`);
    const kapStory = extract("BOSSES").filter((b) => b.chapter != null && bossType(b) !== "Story").length;
    ok(kapStory === 0, `Bosse mit Kapitel sind durchgehend Typ Story (Abweichler: ${kapStory})`);
  }
  // Format-Info: Bossnamen mit Komma (Format "Name, the Titel"). Nur Info, kein Fehler:
  // die Suche findet beide Formen ueber _foldBase, verglichen wird nur die Schreibweise.
  const mitKomma = extract("BOSSES").filter((b) => b.name.includes(","));
  console.log(`  info  Bossnamen mit Komma: ${mitKomma.length} (${mitKomma.slice(0, 4).map((b) => b.name).join("; ")}${mitKomma.length > 4 ? " ..." : ""}); Umbenennung nur mit BOSS_RENAMES-Migration`);
}

// ── 4b. Inline-Skripte und Seitenwerkzeuge ───────────────────────────────────
// Der Generator bettet das Suchskript als Template-Literal ein. Fehlt dort ein
// doppeltes Backslash, wird aus dem Whitespace-Regex ein Buchstaben-Regex oder
// aus einem Zeilenumbruch-Escape ein echter Umbruch im String -- die Seite laedt
// dann voellig normal, nur das Skript ist tot. Genau das ist beim Bau der
// Seitensuche passiert und blieb ohne Browsertest unsichtbar.
// Deshalb: jedes erzeugte Inline-Skript kompilieren, bevor es ausgeliefert wird.
const SEITEN_MIT_WERKZEUG = ["bosse", "waffen", "ruestungen", "crafting",
  "bestiarium", "side-quests", "trophaeen", "true-ending",
  "hauptquests", "patch-notes", "fraktionen", "npcs",
  "skills", "hexen", "abyss-cores", "accessoires", "kapitel-guide",
  "mounts", "pets", "ruinen", "raetsel", "geheimnisse"];
for (const s of SEITEN_MIT_WERKZEUG) {
  const t = fs.readFileSync(path.join(ROOT, s + ".html"), "utf8");

  const bloecke = [...t.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)];
  let syntaxFehler = null;
  for (const b of bloecke) {
    try { new Function(b[1]); } catch (e) { syntaxFehler = e.message; break; }
  }
  ok(bloecke.length > 0 && !syntaxFehler,
    `${s}.html: ${bloecke.length} Inline-Skript(e) kompilieren` + (syntaxFehler ? ` — ${syntaxFehler}` : ""));

  // Die Werkzeuge muessen im Markup stehen, sonst geht eine Seite ohne Suche
  // oder ohne Sprungziele live, ohne dass es jemand bemerkt.
  const h2 = [...t.matchAll(/<h2([^>]*)>/g)];
  const ohneId = h2.filter((m) => !/\sid="a-/.test(m[1])).length;
  const sprungziele = (t.match(/<a href="#a-/g) || []).length;
  ok(t.includes('id="pt-suche"'), `${s}.html: Suchfeld vorhanden`);
  ok(ohneId === 0, `${s}.html: alle ${h2.length} Abschnitte mit Sprung-id (ohne id: ${ohneId})`);
  ok(h2.length < 2 || sprungziele === h2.length,
    `${s}.html: ${sprungziele} Sprunglinks fuer ${h2.length} Abschnitte`);
}

// ── 4c. Bewegung (Lauf 09.10.2026, B5) ───────────────────────────────────────
// Jede Seite traegt den Kopf-Schnipsel (cd_motion) VOR dem ersten Paint, laedt
// Bewegungs-Libs nur same-origin aus /vendor/ (Dateien muessen im Repo liegen) und
// bindet kein Skript von einem fremden Host ein (kein CDN, DSGVO). Die bestehende
// Google-Fonts-Einbindung (<link>, kein Skript) ist davon bewusst nicht betroffen.
console.log("\n[Bewegung] Kopf-Schnipsel, /vendor/-Pfade, kein CDN");
for (const s of SEITEN_MIT_WERKZEUG) {
  const t = fs.readFileSync(path.join(ROOT, s + ".html"), "utf8");
  const kopf = t.slice(0, t.indexOf("</head>"));
  const sniep = /<script>[^<]*cd_motion[\s\S]*?<\/script>/.exec(kopf);
  ok(!!sniep && sniep[0].includes("cd-motion") && sniep[0].includes("cd-still") && sniep[0].includes("prefers-reduced-motion")
      && /[?&]motion/.test(sniep[0]) && kopf.indexOf(sniep[0]) < kopf.indexOf("<style>"),
    `${s}.html: Kopf-Schnipsel (cd_motion, ?motion, reduced-motion) steht im <head> vor dem <style>`);

  // Skript-Quellen: nur /vendor/<datei>.js, nie ein Host
  const srcs = [...t.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]);
  const fremd = srcs.filter((u) => !/^\/vendor\/[A-Za-z0-9._-]+\.js$/.test(u));
  // Inline-Skripte (ohne JSON-LD): kein Verweis auf einen Host (http(s):// oder //host)
  const inline = [...t.matchAll(/<script(?![^>]*application\/ld\+json)(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const hostRef = inline.flatMap((b) => b.match(/(?:https?:)?\/\/[A-Za-z0-9-]+\.[A-Za-z]{2,}/g) || []);
  ok(fremd.length === 0 && hostRef.length === 0,
    `${s}.html: kein Bewegungs-Skript von fremden Hosts (fremde src: ${fremd.join(", ") || "-"}; Host im Inline-Skript: ${hostRef.join(", ") || "-"})`);

  // Lib-Dateinamen im Loader (Literale "<name>-<x.y.z>.min.js") + Praefix /vendor/ muessen existieren
  const namen = [...new Set(inline.flatMap((b) => b.match(/[A-Za-z]+-\d+\.\d+\.\d+\.min\.js/g) || []))];
  const hatPraefix = inline.some((b) => b.includes("'/vendor/'+"));
  const fehlt = namen.filter((n) => !fs.existsSync(path.join(ROOT, "vendor", n)));
  ok(namen.length >= 3 && hatPraefix && fehlt.length === 0,
    `${s}.html: ${namen.length} Libs aus /vendor/ (${namen.join(", ")}), alle im Repo vorhanden (fehlend: ${fehlt.join(", ") || "-"})`);
}

// ── 5. sitemap.xml ───────────────────────────────────────────────────────────
const sm =fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
// Alle Seiten-URLs (nicht nur die drei alten), plus Startseite. Reihenfolge wie
// im Kopf-Menue von gen-seo.mjs (NAV); zuletzt am 29.08.2026 um /fraktionen und
// /npcs ergaenzt.
["/", "/bosse", "/bestiarium", "/waffen", "/ruestungen", "/crafting",
 "/hauptquests", "/fraktionen", "/side-quests", "/trophaeen", "/true-ending",
 "/npcs", "/patch-notes", "/skills", "/hexen", "/abyss-cores", "/accessoires",
 "/kapitel-guide", "/mounts", "/pets", "/ruinen", "/raetsel", "/geheimnisse"].forEach((u) =>
  ok(sm.includes(`<loc>https://crimson-desert-wiki.com${u}</loc>`), `sitemap enthaelt ${u}`));

// ── 6. Startseite verlinkt jede SEO-Seite ────────────────────────────────────
// Warum es diesen Check gibt: hauptquests.html und patch-notes.html gingen am
// 26.08.2026 live, wurden in index.html aber nie nachgetragen. Drei Tage lang
// meldete verify-seo "ALLE CHECKS BESTANDEN", waehrend zwei Landingpages von der
// Startseite aus unerreichbar waren -- fuer SEO-Seiten der teuerste stille Fehler.
// Kein Gate sah es, weil index.html hier nur Datenquelle fuer extract() war.
// index.html ist Handarbeit (siehe .claude/CLAUDE.md), der Generator kann die
// Links nicht selbst setzen; deshalb muss die Pruefung sie einfordern.
//
// NAV wird als Text aus gen-seo.mjs gelesen statt importiert: ein Import wuerde
// den Generator ausfuehren (Seiteneffekte, schreibt alle Seiten neu).
const genSrc = fs.readFileSync(path.join(__dirname, "gen-seo.mjs"), "utf8");
const navBlock = /const NAV = \[([\s\S]*?)\n\];/.exec(genSrc);
ok(!!navBlock, "gen-seo.mjs: NAV-Liste lesbar");
if (navBlock) {
  const navSlugs = [...navBlock[1].matchAll(/\["([a-z0-9-]+)",/g)].map((m) => m[1]);
  ok(navSlugs.length >= 8, `NAV enthaelt ${navSlugs.length} Seiten`);
  const startseite = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  // Die zwei Stellen einzeln pruefen: die noscript-Liste traegt die Seiten fuer
  // Crawler ohne JS, #guide-links ist die sichtbare Fusszeile. Eine allein reicht
  // nicht -- fehlt die Fusszeile, sieht ein echter Leser die Seite nie.
  // ALLE noscript-Bloecke zusammen, nicht nur den ersten: index.html traegt einen
  // Font-Fallback-noscript im <head> und erst danach den mit der Seitenliste.
  const noscript = [...startseite.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)]
    .map((m) => m[1]).join("\n");
  const guide = /<nav id="guide-links"[\s\S]*?<\/nav>/.exec(startseite);
  ok(noscript.length > 0, "index.html: noscript-Block gefunden");
  ok(!!guide, "index.html: Fusszeile #guide-links gefunden");
  for (const slug of navSlugs) {
    const href = `href="/${slug}"`;
    ok(noscript.includes(href), `index.html noscript verlinkt /${slug}`);
    ok(!!guide && guide[0].includes(href), `index.html #guide-links verlinkt /${slug}`);
  }
}

// ── 7. In-App-Deep-Links zeigen auf vorhandene Seiten (SECTIONS) ─────────────
// Seit dem Abyss-Split (09.10.2026) gibt es die App-Seite synthesis ("Abyss-Synthese"). Jede
// Seite darf nur auf Seiten-IDs verlinken, die es in SECTIONS gibt (Formen /#sec-<id> und
// /#sec=<id>); abyss-cores.html und hexen.html verweisen fuer die Synthese auf /#sec-synthesis.
console.log("\n[In-App-Deep-Links]");
{
  const SECTIONS = extract("SECTIONS");
  const secIds = new Set(SECTIONS.map((s) => s.id));
  ok(secIds.has("synthesis") && secIds.has("cores") && secIds.has("witches"), `SECTIONS (${SECTIONS.length} Seiten) enthaelt cores, synthesis und witches`);
  let geprueft = 0; const unbekannt = [];
  for (const file of Object.keys(pages)) {
    const c = fs.readFileSync(path.join(ROOT, file), "utf8");
    for (const m of c.matchAll(/href="\/#sec[-=]([a-z0-9]+)/g)) {
      geprueft++;
      if (!secIds.has(m[1])) unbekannt.push(`${file}: ${m[0]}"`);
    }
  }
  ok(unbekannt.length === 0, `${geprueft} In-App-Deep-Links zeigen auf Seiten aus SECTIONS (unbekannt: ${unbekannt.length})`);
  unbekannt.slice(0, 8).forEach((u) => console.log("       UNBEKANNT:", u));
  for (const file of ["abyss-cores.html", "hexen.html"]) {
    const c = fs.readFileSync(path.join(ROOT, file), "utf8");
    ok(c.includes('href="/#sec-synthesis"'), `${file} verlinkt die App-Seite Abyss-Synthese (/#sec-synthesis)`);
  }
}

console.log(`\n${fail === 0 ? "ALLE CHECKS BESTANDEN" : fail + " CHECK(S) FEHLGESCHLAGEN"}`);
process.exit(fail === 0 ? 0 : 1);

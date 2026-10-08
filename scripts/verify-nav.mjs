// verify-nav.mjs — Konsistenzpruefung der Navigation (Umbau 10/2026). Entwicklerdatei,
// wird nicht ausgeliefert; keine Abhaengigkeiten.
//
// Aufruf: node scripts/verify-nav.mjs     (Exit 1 bei Fehlern, Warnungen zaehlen nicht)
//
// Gegen den Vertrag aus dem Briefing (Abschnitt 4):
//   RESSORTS[i] = {id, label, short?, glyph, tag}
//   SECTIONS[i] = {id, res, name, en, desc, aka[], glyph, count, plate?, coord?}
// Pruefungen (alle werden durchlaufen, es bricht nie beim ersten Fehler ab):
//   a) Seiten-IDs <-> <section id="sec-..."> in index.html (beide Richtungen)
//   b) res existiert, keine leere Kategorie, IDs eindeutig
//   c) Pflichtfelder der Seiten und Kategorien
//   d) Soll-Abgleich gegen Briefing 3.1/3.2 (Tabelle unten)
//   e) <h2 class="sec-t"> enthaelt den Seitennamen
//   f) Verbotsliste sichtbarer Jargon-Woerter (index.html, data/*.js, SEO-Seiten) + Warnliste
//   g) NAV-Slugs von gen-seo.mjs, noscript und #guide-links verweisen auf vorhandene Dateien
//   h) NAV-Labels von gen-seo.mjs gegen VORGABEN-B Abschnitt 2, Linktexte in noscript/#guide-links
//
// Wie gesucht wird (f): Kommentare, <style>-Bloecke und JS-Code werden unsichtbar gemacht, nur
// HTML-Text/Attribute und der INHALT von JS-Strings/Template-Literalen bleiben stehen. Dafuer gibt
// es einen kleinen JS-Tokenizer (maskJs), der Strings, Template-Literale (samt ${...}) und
// Regex-Literale kennt, damit "https://" in einem String nicht als Kommentar zaehlt.
// Bezeichner (initRegistratur, openRessort, RESSORTS, bbCoord ...) liegen im Code und treffen nie.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

let errors = 0;
let warnings = 0;
const ok = (m) => console.log("ok     " + m);
const fail = (m) => { console.log("FEHLER " + m); errors++; };
const warn = (m) => { console.log("WARN   " + m); warnings++; };
const head = (m) => console.log("\n== " + m);

// ── Dateien lesen ────────────────────────────────────────────────────────────
const readSafe = (p) => { try { return fs.readFileSync(p, "utf8"); } catch { return null; } };
const INDEX_PATH = path.join(ROOT, "index.html");
const indexHtml = readSafe(INDEX_PATH) ?? "";
if (!indexHtml) fail("index.html nicht lesbar");
const DATA_DIR = path.join(ROOT, "data");
const dataFiles = fs.existsSync(DATA_DIR)
  ? fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".js")).sort().map((f) => ({ file: path.join(DATA_DIR, f), text: readSafe(path.join(DATA_DIR, f)) ?? "" }))
  : [];
const GEN_PATH = path.join(__dirname, "gen-seo.mjs");
const genSrc = readSafe(GEN_PATH) ?? "";

const lineOf = (text, idx) => { let n = 1; for (let i = 0; i < idx && i < text.length; i++) if (text.charCodeAt(i) === 10) n++; return n; };
const kontext = (text, idx, len) => text.slice(Math.max(0, idx - 28), idx + len + 28).replace(/\s+/g, " ").trim();

// ── Datenstrukturen laden (balancierte Klammern + eval, wie verify-crafting.mjs) ─
// Seit dem Split liegen die Konstanten in data/*.js; index.html + alle Datendateien zaehlen als EIN Text.
const allSrc = [indexHtml, ...dataFiles.map((d) => d.text)].join("\n");
function extract(name) {
  const re = new RegExp("const " + name + "\\s*=\\s*(\\[|\\{)");
  const m = re.exec(allSrc);
  if (!m) throw new Error("Datenstruktur nicht gefunden: " + name);
  let i = m.index + m[0].length - 1;
  const open = allSrc[i], close = open === "[" ? "]" : "}";
  let depth = 0, inStr = null, esc = false;
  for (let j = i; j < allSrc.length; j++) {
    const c = allSrc[j];
    if (esc) { esc = false; continue; }
    if (c === "\\") { esc = true; continue; }
    if (inStr) { if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) return eval("(" + allSrc.slice(i, j + 1) + ")"); }
  }
  throw new Error("Klammern unbalanciert bei: " + name);
}
let RESSORTS = null, SECTIONS = null;
try { RESSORTS = extract("RESSORTS"); } catch (e) { fail("RESSORTS laden: " + e.message); }
try { SECTIONS = extract("SECTIONS"); } catch (e) { fail("SECTIONS laden: " + e.message); }
if (RESSORTS && !Array.isArray(RESSORTS)) { fail("RESSORTS ist kein Array"); RESSORTS = null; }
if (SECTIONS && !Array.isArray(SECTIONS)) { fail("SECTIONS ist kein Array"); SECTIONS = null; }

// Fundstelle eines Eintrags (id:'xyz') im Quelltext fuer Datei:Zeile
function navLoc(kind, id) {
  const holder = [{ file: INDEX_PATH, text: indexHtml }, ...dataFiles].find((f) => new RegExp("const " + kind + "\\s*=").test(f.text));
  if (!holder) return "d04";
  const start = holder.text.search(new RegExp("const " + kind + "\\s*="));
  const m = new RegExp("\\bid\\s*:\\s*['\"]" + String(id).replace(/[^\w-]/g, "") + "['\"]").exec(holder.text.slice(start));
  return rel(holder.file) + ":" + lineOf(holder.text, start + (m ? m.index : 0));
}
const kindLoc = (kind) => {
  const holder = [{ file: INDEX_PATH, text: indexHtml }, ...dataFiles].find((f) => new RegExp("const " + kind + "\\s*=").test(f.text));
  return holder ? rel(holder.file) + ":" + lineOf(holder.text, holder.text.search(new RegExp("const " + kind + "\\s*="))) : "?";
};

// ── Tokenizer und Maskierung ─────────────────────────────────────────────────
// maskJs(src): gleich langer Text, in dem nur der INHALT von String-Literalen und Template-
// Text stehen bleibt; Code, Kommentare, Regex-Literale und Anfuehrungszeichen werden zu
// Leerzeichen (Zeilenumbrueche bleiben, damit Offsets und Zeilennummern stimmen).
const KEYWORDS_BEFORE_REGEX = new Set(["return", "typeof", "instanceof", "in", "of", "case", "delete", "void", "throw", "new", "else", "do", "yield", "await"]);
function maskJs(src) {
  const n = src.length;
  const out = new Array(n);
  for (let k = 0; k < n; k++) { const c = src.charCodeAt(k); out[k] = c === 10 || c === 13 ? src[k] : " "; }
  const keep = (k) => { out[k] = src[k]; };
  let i = 0, depth = 0;
  const tplStack = [];         // Klammertiefe, bei der eine ${...} begann
  let mode = "code";           // "code" | "tpl"
  let prevSig = "", prevWord = "";
  const isIdent = (c) => /[A-Za-z0-9_$]/.test(c) || c > "\u007f";
  while (i < n) {
    const c = src[i];
    if (mode === "tpl") {
      if (c === "\\") { keep(i); if (i + 1 < n) keep(i + 1); i += 2; continue; }
      if (c === "`") { mode = "code"; prevSig = '"'; prevWord = ""; i++; continue; }
      if (c === "$" && src[i + 1] === "{") { tplStack.push(depth); depth++; mode = "code"; prevSig = "{"; prevWord = ""; i += 2; continue; }
      keep(i); i++; continue;
    }
    // mode === "code"
    if (c === " " || c === "\t" || c === "\n" || c === "\r") { i++; continue; }
    if (c === "/" && src[i + 1] === "/") { while (i < n && src[i] !== "\n") i++; continue; }
    if (c === "/" && src[i + 1] === "*") { const e = src.indexOf("*/", i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === "'" || c === '"') {
      i++;
      while (i < n && src[i] !== c && src[i] !== "\n") { if (src[i] === "\\") { keep(i); i++; if (i < n) { keep(i); i++; } continue; } keep(i); i++; }
      i++; prevSig = '"'; prevWord = ""; continue;
    }
    if (c === "`") { mode = "tpl"; i++; continue; }
    if (c === "/") {
      const operandEnd = /[A-Za-z0-9_$"')\]]/.test(prevSig) && !(prevSig === "a" && KEYWORDS_BEFORE_REGEX.has(prevWord));
      if (!operandEnd) {
        // Regex-Literal ueberspringen (Klassen [...] beachten); Inhalt bleibt maskiert
        i++; let inCls = false;
        while (i < n && src[i] !== "\n") {
          const d = src[i];
          if (d === "\\") { i += 2; continue; }
          if (d === "[") inCls = true; else if (d === "]") inCls = false;
          else if (d === "/" && !inCls) break;
          i++;
        }
        i++; prevSig = ")"; prevWord = ""; continue;
      }
      prevSig = "/"; prevWord = ""; i++; continue;
    }
    if (c === "{") { depth++; prevSig = "{"; prevWord = ""; i++; continue; }
    if (c === "}") {
      depth--;
      if (tplStack.length && tplStack[tplStack.length - 1] === depth) { tplStack.pop(); mode = "tpl"; i++; continue; }
      prevSig = "}"; prevWord = ""; i++; continue;
    }
    if (isIdent(c)) {
      let j = i; while (j < n && isIdent(src[j])) j++;
      const w = src.slice(i, j);
      prevSig = /^[0-9]/.test(w) ? "0" : "a"; prevWord = w; i = j; continue;
    }
    prevSig = c; prevWord = ""; i++;
  }
  return out.join("");
}

// maskHtml(src, {script}): Kommentare und <style> werden unsichtbar; <script>-Inhalt je nach
// Option "js" (maskJs) oder "drop" (komplett unsichtbar). Alles andere (Text, Attribute) bleibt.
function maskHtml(src, { script = "js" } = {}) {
  const n = src.length;
  const blank = (s) => s.replace(/[^\r\n]/g, " ");
  let out = "", i = 0;
  const re = /<!--|<script\b|<style\b/gi;
  while (i < n) {
    re.lastIndex = i;
    const m = re.exec(src);
    if (!m) { out += src.slice(i); break; }
    out += src.slice(i, m.index);
    const tag = m[0].toLowerCase();
    if (tag === "<!--") {
      const e = src.indexOf("-->", m.index + 4);
      const stop = e < 0 ? n : e + 3;
      out += blank(src.slice(m.index, stop)); i = stop;
    } else if (tag === "<style") {
      const rest = src.slice(m.index);
      const e = rest.search(/<\/style\s*>/i);
      const stop = e < 0 ? n : m.index + e + rest.slice(e).indexOf(">") + 1;
      out += blank(src.slice(m.index, stop)); i = stop;
    } else { // <script
      const gt = src.indexOf(">", m.index);
      if (gt < 0) { out += src.slice(m.index); break; }
      const openTag = src.slice(m.index, gt + 1);
      const e = src.slice(gt + 1).search(/<\/script\s*>/i);
      const bodyEnd = e < 0 ? n : gt + 1 + e;
      const body = src.slice(gt + 1, bodyEnd);
      out += blank(openTag) + (script === "drop" ? blank(body) : maskJs(body));
      const closeLen = e < 0 ? 0 : src.slice(bodyEnd).indexOf(">") + 1;
      out += blank(src.slice(bodyEnd, bodyEnd + closeLen));
      i = bodyEnd + closeLen;
    }
  }
  return out;
}

const decodeEntities = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
  .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const normWs = (s) => s.replace(/\s+/g, " ").trim();

// ── Soll-Tabellen (Briefing 3.1 / 3.2, VORGABEN-B Abschnitt 2) ─────────────────
const SOLL_RESSORTS = [
  { id: "start",       label: "Start",                      short: "Start",      glyph: "⌂", tag: "Übersicht, Einsteiger-Tipps, Neuigkeiten" },
  { id: "kampf",       label: "Kampf",                      short: "Kampf",      glyph: "⚔", tag: "Bosse, Gegner, Fähigkeiten, Builds" },
  { id: "ausruestung", label: "Ausrüstung",                 short: "Ausrüstung", glyph: "⬡", tag: "Waffen, Rüstungen, Abyss-Ausrüstung, Hexen" },
  { id: "quests",      label: "Quests & Herausforderungen", short: "Quests",     glyph: "❢", tag: "Quests, Kapitel, Ruinen, Rätsel, Checklisten" },
  { id: "welt",        label: "Welt & Karte",               short: "Welt",       glyph: "◉", tag: "Karte, Orte, Figuren, Camp, Reittiere" },
  { id: "sammeln",     label: "Herstellen & Sammeln",       short: "Sammeln",    glyph: "⚙", tag: "Kochen, Herstellen, Materialien, Sammelobjekte" },
];
// [id, res, name, en, desc]  (Reihenfolge = Reihenfolge in der Navigation; Sternchen gehoeren nicht zum name)
const SOLL_SEITEN = [
  ["start", "start", "Übersicht", "", "Alle Kategorien und Seiten auf einen Blick"],
  ["beginner", "start", "Anfänger-Guide", "", "Kampf-Grundlagen, Steuerung und erste Schritte"],
  ["patches", "start", "Patch-Notes", "Patch Notes", "Alle Updates und Hotfixes mit den wichtigsten Änderungen"],
  ["roadmap", "start", "Roadmap", "Roadmap", "Was Pearl Abyss als Nächstes plant"],
  ["favorites", "start", "Merkliste", "Favoriten", "Deine mit ☆ markierten Einträge an einem Ort"],
  ["bosses", "kampf", "Bosse", "Bosses", "Fundort, Schwächen, Taktik und Beute aller Bosse"],
  ["bestiary", "kampf", "Gegner", "Creatures", "Normale Gegner und Kreaturen mit Beute"],
  ["skills", "kampf", "Fähigkeiten", "Skills", "Fähigkeiten von Kliff, Damiane und Oongka"],
  ["builds", "kampf", "Builds", "Builds", "Build-Vorschläge und der Build-Optimizer"],
  ["disarm", "kampf", "Entwaffnen", "Disarm", "Welche Gegner du entwaffnen kannst und wie"],
  ["weapons", "ausruestung", "Waffen", "Weapons", "Alle Waffen mit Werten, Fundort und Verfeinerung"],
  ["armor", "ausruestung", "Rüstungen", "Armor", "Rüstungen und Sets mit Werten und Fundort"],
  ["accessories", "ausruestung", "Accessoires", "Accessories", "Ringe, Ohrringe und Halsketten mit Werten"],
  ["cores", "ausruestung", "Abyss-Ausrüstung", "Abyss Gear", "Abyss-Ausrüstung (oft „Abyss Cores“ genannt), Sockel und Werte"],
  ["witches", "ausruestung", "Hexen & Fusion", "Witches", "Alle Hexen, ihre Läden und Fusionsrezepte für Abyss-Ausrüstung"],
  ["dyes", "ausruestung", "Färbemittel", "Dyes", "Farben und wo du sie bekommst"],
  ["quests", "quests", "Quests", "Main & Faction Quests", "True Ending, Hauptquests, Fraktionsquests und Nebenquests"],
  ["chapters", "quests", "Kapitel-Guide", "Chapters", "Die Hauptstory Kapitel für Kapitel"],
  ["checklists", "quests", "Checklisten", "", "Bosse, Graumähnen, Sanktum, Waffen und Verpassbares zum Abhaken"],
  ["ruins", "quests", "Uralte Ruinen", "Ancient Ruins", "Ruinen-Herausforderungen und Abyss-Grenzsteine"],
  ["puzzles", "quests", "Rätsel", "Puzzles", "Lösungen zu Rätseln und Strongboxes"],
  ["minigames", "quests", "Minispiele", "Minigames", "Armdrücken, Duelle, Flipper und alle anderen Minispiele"],
  ["achievements", "quests", "Trophäen & Errungenschaften", "Trophies / Achievements", "Alle Trophäen und Errungenschaften mit Tipps"],
  ["map", "welt", "Karte", "Map", "Interaktive Karte von Pywel"],
  ["locations", "welt", "Orte & Glocken", "Locations", "Wichtige Orte je Region und alle Glocken"],
  ["npcs", "welt", "Charaktere & NPCs", "People", "Verbündete, Händler und wichtige Figuren"],
  ["camp", "welt", "Graumähnen-Camp", "Greymane Camp", "Ausbau des Camps Stufe für Stufe"],
  ["mounts", "welt", "Reittiere", "Mounts", "Pferde und besondere Reittiere mit Fundort"],
  ["pets", "welt", "Haustiere", "Pets", "Alle Haustiere und wie du sie bekommst"],
  ["secrets", "welt", "Geheimnisse & Lore", "Secrets & Lore", "Geheimes Ende, Erinnerungsfragmente, Easter Eggs und Lore"],
  ["crafting", "sammeln", "Herstellen & Farmen", "Crafting", "Rezepte, Materialien und Farm-Routen"],
  ["food", "sammeln", "Kochen & Elixiere", "Cooking & Elixirs", "Gerichte und Elixiere mit Wirkung und Zutaten"],
  ["items", "sammeln", "Materialien & Items", "Materials", "Nachschlagewerk für Materialien und sonstige Gegenstände"],
  ["gatherables", "sammeln", "Sammelobjekte", "Gatherables", "Pflanzen, Erze und andere Rohstoffe zum Sammeln"],
  ["collectibles", "sammeln", "Sammelgegenstände", "Collectibles", "Sammelbare Gegenstände und Wissenseinträge"],
];
const SOLL_ANZAHL = 35;
const START_H2 = "Crimson Desert Wiki: Was suchst du?";
// Linkbeschriftungen der statischen SEO-Seiten (VORGABEN-B Abschnitt 2): slug -> Label
const SOLL_NAV_LABELS = {
  "patch-notes": "Patch-Notes", "bosse": "Bosse", "bestiarium": "Gegner", "skills": "Fähigkeiten",
  "waffen": "Waffen", "ruestungen": "Rüstungen", "accessoires": "Accessoires", "abyss-cores": "Abyss-Ausrüstung",
  "hexen": "Hexen & Fusion", "hauptquests": "Hauptquests", "fraktionen": "Fraktionsquests",
  "side-quests": "Nebenquests", "kapitel-guide": "Kapitel-Guide", "true-ending": "True Ending",
  "ruinen": "Uralte Ruinen", "raetsel": "Rätsel", "trophaeen": "Trophäen & Errungenschaften",
  "npcs": "Charaktere & NPCs", "mounts": "Reittiere", "pets": "Haustiere",
  "geheimnisse": "Geheimnisse & Lore", "crafting": "Herstellen & Farmen",
};

// ── a) Seiten-IDs <-> <section id="sec-..."> ─────────────────────────────────
head("a) Seiten-IDs und <section id=\"sec-...\"> in index.html");
const structHtml = maskHtml(indexHtml, { script: "drop" });
const secTags = [...structHtml.matchAll(/<section\b[^>]*?\bid="sec-([^"]+)"/g)]
  .map((m) => ({ id: m[1], idx: m.index, line: lineOf(indexHtml, m.index) }));
const secCount = {};
for (const s of secTags) secCount[s.id] = (secCount[s.id] || 0) + 1;
if (SECTIONS) {
  let bad = 0;
  for (const s of SECTIONS) {
    const c = secCount[s.id] || 0;
    if (c !== 1) { fail(`${navLoc("SECTIONS", s.id)}: Seite "${s.id}" hat ${c}x <section id="sec-${s.id}"> in index.html (erwartet genau 1)`); bad++; }
  }
  const known = new Set(SECTIONS.map((s) => s.id));
  for (const s of secTags) {
    if (!known.has(s.id)) { fail(`index.html:${s.line}: <section id="sec-${s.id}"> steht nicht in SECTIONS`); bad++; }
  }
  for (const [id, c] of Object.entries(secCount)) if (c > 1) { fail(`index.html: <section id="sec-${id}"> kommt ${c}x vor`); bad++; }
  if (!bad) ok(`${SECTIONS.length} SECTIONS-IDs <-> ${secTags.length} <section id="sec-...">: deckungsgleich`);
} else fail("a) uebersprungen: SECTIONS nicht ladbar");

// ── b) Kategorien, Zuordnung, Eindeutigkeit ──────────────────────────────────
head("b) res existiert, keine leere Kategorie, eindeutige IDs");
if (SECTIONS && RESSORTS) {
  let bad = 0;
  const resIds = new Set(RESSORTS.map((r) => r && r.id));
  for (const s of SECTIONS) {
    if (!resIds.has(s.res)) { fail(`${navLoc("SECTIONS", s.id)}: Seite "${s.id}" hat res="${s.res}", das es in RESSORTS nicht gibt`); bad++; }
  }
  for (const r of RESSORTS) {
    if (!SECTIONS.some((s) => s.res === r.id)) { fail(`${navLoc("RESSORTS", r.id)}: Kategorie "${r.id}" hat keine Seite`); bad++; }
  }
  const dup = (arr, what, kind) => {
    const seen = new Set();
    for (const x of arr) { const id = x && x.id; if (seen.has(id)) { fail(`${navLoc(kind, id)}: ${what}-ID "${id}" doppelt`); bad++; } seen.add(id); }
  };
  dup(SECTIONS, "Seiten", "SECTIONS");
  dup(RESSORTS, "Kategorien", "RESSORTS");
  // Seiten- und Kategorie-ID duerfen sich ueberschneiden ("start", "quests"): getrennte Namensraeume
  // (SECTION_BY_ID / RESSORT_BY_ID), deshalb nur je Liste auf Doppelte geprueft.
  if (!bad) ok(`alle res gueltig, ${RESSORTS.length} Kategorien nicht leer, Seiten- und Kategorie-IDs je fuer sich eindeutig`);
} else fail("b) uebersprungen: RESSORTS/SECTIONS nicht ladbar");

// ── c) Pflichtfelder ─────────────────────────────────────────────────────────
head("c) Pflichtfelder");
const nonEmptyStr = (v) => typeof v === "string" && v.trim() !== "";
if (SECTIONS) {
  let bad = 0;
  for (const s of SECTIONS) {
    const miss = [];
    for (const f of ["name", "desc", "glyph"]) if (!nonEmptyStr(s[f])) miss.push(f);
    if (typeof s.en !== "string") miss.push("en (String, darf leer sein)");
    if (!Array.isArray(s.aka) || s.aka.length === 0 || !s.aka.every(nonEmptyStr)) miss.push("aka (nichtleeres Array nichtleerer Strings)");
    if (!nonEmptyStr(s.id) || !nonEmptyStr(s.res)) miss.push("id/res");
    if (miss.length) { fail(`${navLoc("SECTIONS", s.id)}: Seite "${s.id}": fehlt/ungueltig: ${miss.join(", ")}`); bad++; }
  }
  if (!bad) ok(`${SECTIONS.length} Seiten haben name, desc, glyph, en, aka`);
}
if (RESSORTS) {
  let bad = 0;
  for (const r of RESSORTS) {
    const miss = ["id", "label", "glyph", "tag"].filter((f) => !nonEmptyStr(r[f]));
    if (miss.length) { fail(`${navLoc("RESSORTS", r.id)}: Kategorie "${r.id}": fehlt/ungueltig: ${miss.join(", ")}`); bad++; }
  }
  if (!bad) ok(`${RESSORTS.length} Kategorien haben id, label, glyph, tag`);
}

// ── d) Soll-Abgleich ─────────────────────────────────────────────────────────
head("d) Soll-Abgleich gegen Briefing 3.1 / 3.2");
if (RESSORTS) {
  let bad = 0;
  const ist = RESSORTS.map((r) => r.id).join(",");
  const soll = SOLL_RESSORTS.map((r) => r.id).join(",");
  if (ist !== soll) { fail(`${kindLoc("RESSORTS")}: Kategorien-Reihenfolge ist [${ist}], Soll [${soll}]`); bad++; }
  for (const sr of SOLL_RESSORTS) {
    const r = RESSORTS.find((x) => x.id === sr.id);
    if (!r) { fail(`${kindLoc("RESSORTS")}: Kategorie "${sr.id}" fehlt`); bad++; continue; }
    for (const f of ["label", "short", "glyph", "tag"]) {
      if (r[f] !== sr[f]) { fail(`${navLoc("RESSORTS", sr.id)}: Kategorie "${sr.id}".${f} = ${JSON.stringify(r[f])}, Soll ${JSON.stringify(sr[f])}`); bad++; }
    }
  }
  if (!bad) ok("Kategorien: Reihenfolge, label, short, glyph, tag wie in 3.1");
}
if (SECTIONS) {
  let bad = 0;
  if (SECTIONS.length !== SOLL_ANZAHL) { fail(`${kindLoc("SECTIONS")}: ${SECTIONS.length} Seiten, Soll ${SOLL_ANZAHL}`); bad++; }
  const ist = SECTIONS.map((s) => s.id).join(",");
  const soll = SOLL_SEITEN.map((s) => s[0]).join(",");
  if (ist !== soll) {
    // pro Kategorie getrennt melden, damit ersichtlich ist, wo die Abweichung liegt
    for (const sr of SOLL_RESSORTS) {
      const a = SECTIONS.filter((s) => s.res === sr.id).map((s) => s.id).join(",");
      const b = SOLL_SEITEN.filter((s) => s[1] === sr.id).map((s) => s[0]).join(",");
      if (a !== b) { fail(`${kindLoc("SECTIONS")}: Seiten in "${sr.id}": [${a}], Soll [${b}]`); bad++; }
    }
    if (!bad) { fail(`${kindLoc("SECTIONS")}: Gesamtreihenfolge der Seiten weicht ab: [${ist}], Soll [${soll}]`); bad++; }
  }
  for (const [id, res, name, en, desc] of SOLL_SEITEN) {
    const s = SECTIONS.find((x) => x.id === id);
    if (!s) { fail(`${kindLoc("SECTIONS")}: Seite "${id}" fehlt`); bad++; continue; }
    for (const [f, soll2] of [["res", res], ["name", name], ["en", en], ["desc", desc]]) {
      if (s[f] !== soll2) { fail(`${navLoc("SECTIONS", id)}: Seite "${id}".${f} = ${JSON.stringify(s[f])}, Soll ${JSON.stringify(soll2)}`); bad++; }
    }
  }
  if (!bad) ok(`${SOLL_ANZAHL} Seiten: Reihenfolge, res, name, en, desc wie in 3.2`);
}

// ── e) <h2 class="sec-t"> enthaelt den Seitennamen ───────────────────────────
head("e) Sektionsueberschriften");
if (SECTIONS) {
  let bad = 0, geprueft = 0;
  const h2re = /<h2\b[^>]*\bclass="[^"]*\bsec-t\b[^"]*"[^>]*>([\s\S]*?)<\/h2>/;
  for (const s of SECTIONS) {
    const tag = secTags.find((t) => t.id === s.id);
    if (!tag) continue; // Fehlen steht schon unter a)
    const next = secTags.filter((t) => t.idx > tag.idx).sort((x, y) => x.idx - y.idx)[0];
    const chunk = structHtml.slice(tag.idx, next ? next.idx : structHtml.length);
    const m = h2re.exec(chunk);
    if (!m) { fail(`index.html:${tag.line}: Seite "${s.id}": kein <h2 class="sec-t"> gefunden`); bad++; continue; }
    const inner = m[1]
      .replace(/<span\b[^>]*\bsec-sym\b[^>]*>[\s\S]*?<\/span>/g, " ")
      .replace(/<span\b[^>]*\bsec-t-en\b[^>]*>[\s\S]*?<\/span>/g, " ")
      .replace(/<[^>]*>/g, " ");
    const text = normWs(decodeEntities(inner));
    const line = lineOf(indexHtml, tag.idx + m.index);
    geprueft++;
    if (s.id === "start") {
      if (text !== START_H2) { fail(`index.html:${line}: Seite "start": h2 = ${JSON.stringify(text)}, Soll ${JSON.stringify(START_H2)}`); bad++; }
      continue;
    }
    if (!nonEmptyStr(s.name)) continue; // steht unter c)
    if (!text.includes(s.name)) { fail(`index.html:${line}: Seite "${s.id}": h2 = ${JSON.stringify(text)} enthaelt nicht den Namen ${JSON.stringify(s.name)}`); bad++; }
  }
  if (!bad) ok(`${geprueft} Ueberschriften enthalten den Seitennamen (start: "${START_H2}")`);
}

// ── f) Jargon-Verbotsliste ───────────────────────────────────────────────────
head("f) Jargon in sichtbaren Texten");
const NOT_IDENT_BEFORE = "(?<![A-Za-z0-9_$])";
const mk = (s) => new RegExp(NOT_IDENT_BEFORE + s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
const VERBOTEN = ["Registratur", "Ressort", "Blätter", "Koordinate suchen", "KOORD", "Register ziehen",
  "Register öffnen", "☰ Register", "&#9776; Register", "&#x2630; Register"].map((w) => ({ w, re: mk(w) }));
// Warnliste: nur sichten. "Register" nur alleinstehend (nicht Teil von Registratur/Registerkarte), "Blatt " mit Leerzeichen.
const WARNLISTE = [
  { w: "Sektion", re: mk("Sektion") },
  { w: "Sidebar", re: mk("Sidebar") },
  { w: "Blatt ", re: mk("Blatt ") },
  { w: "Feldatlas", re: mk("Feldatlas") },
  { w: "Feldprotokoll", re: mk("Feldprotokoll") },
  { w: "Register", re: new RegExp(NOT_IDENT_BEFORE + "Register(?![A-Za-zÄÖÜäöüß0-9_$])", "g") },
];
const quellen = [];
quellen.push({ name: "index.html", file: INDEX_PATH, orig: indexHtml, masked: maskHtml(indexHtml, { script: "js" }) });
for (const d of dataFiles) quellen.push({ name: rel(d.file), file: d.file, orig: d.text, masked: maskJs(d.text) });
// SEO-Seiten: alle NAV-Slugs aus gen-seo.mjs (Text lesen, NICHT importieren: der Import schreibt Dateien)
const navBlock = /const NAV = \[([\s\S]*?)\n\];/.exec(genSrc);
const NAV_ENTRIES = navBlock ? [...navBlock[1].matchAll(/\[\s*"([a-z0-9-]+)"\s*,\s*"([^"]*)"/g)].map((m) => ({ slug: m[1], label: m[2], idx: navBlock.index + m.index })) : [];
for (const e of NAV_ENTRIES) {
  const p = path.join(ROOT, e.slug + ".html");
  const t = readSafe(p);
  if (t != null) quellen.push({ name: e.slug + ".html", file: p, orig: t, masked: maskHtml(t, { script: "drop" }) });
}
let verbotTreffer = 0;
const warnZaehler = {};
// Ausnahmen (Spielinhalt, kein Navigations-Jargon): "Blätter" im Sinn von Pflanzenblättern in den
// Rezept-/Kraeuterbeschreibungen von data/d02-crafting.js ("Rosmarin mit gelblichen Blättern").
const AUSNAHMEN = [{ datei: "data/d02-crafting.js", wort: "Blätter" }];
let ausgenommen = 0;
for (const q of quellen) {
  for (const { w, re } of VERBOTEN) {
    re.lastIndex = 0; let m;
    while ((m = re.exec(q.masked))) {
      if (AUSNAHMEN.some((a) => a.datei === q.name && a.wort === w)) { ausgenommen++; continue; }
      fail(`${q.name}:${lineOf(q.orig, m.index)}: verbotenes Wort "${w}": …${kontext(q.orig, m.index, w.length)}…`);
      verbotTreffer++;
    }
  }
  for (const { w, re } of WARNLISTE) {
    re.lastIndex = 0; let m;
    while ((m = re.exec(q.masked))) {
      const key = q.name + "|" + w;
      warnZaehler[key] = (warnZaehler[key] || 0) + 1;
      if (warnZaehler[key] <= 12) warn(`${q.name}:${lineOf(q.orig, m.index)}: "${w.trim()}": …${kontext(q.orig, m.index, w.length)}…`);
      else if (warnZaehler[key] === 13) warn(`${q.name}: "${w.trim()}" weitere Treffer folgen, hier gekappt`);
    }
  }
}
if (!verbotTreffer) ok(`kein verbotenes Jargon-Wort in ${quellen.length} Quellen (index.html, ${dataFiles.length} data-Dateien, ${quellen.length - 1 - dataFiles.length} SEO-Seiten)`);
if (ausgenommen) console.log(`   Hinweis: ${ausgenommen} Treffer von "Blätter" in data/d02-crafting.js ausgenommen (Pflanzenblätter in Kräuterbeschreibungen)`);
{
  const gesamt = Object.entries(warnZaehler);
  const summe = gesamt.reduce((a, [, c]) => a + c, 0);
  console.log(`   Warnliste: ${summe} Treffer in ${gesamt.length} Datei/Wort-Kombinationen (kein Exit 1)`);
}

// ── g) NAV-Slugs und Linkziele ───────────────────────────────────────────────
head("g) gen-seo NAV-Slugs, noscript und #guide-links");
if (!NAV_ENTRIES.length) fail("gen-seo.mjs: NAV-Liste nicht lesbar");
else {
  let bad = 0;
  for (const e of NAV_ENTRIES) {
    if (!fs.existsSync(path.join(ROOT, e.slug + ".html"))) { fail(`scripts/gen-seo.mjs:${lineOf(genSrc, e.idx)}: NAV-Slug "${e.slug}": ${e.slug}.html fehlt im Repo-Root (gen-seo laufen lassen?)`); bad++; }
  }
  if (!bad) ok(`${NAV_ENTRIES.length} NAV-Slugs haben je eine <slug>.html im Repo-Root`);
}
// noscript-Bloecke und <nav id="guide-links"> aus dem Struktur-Text (Kommentare/Skripte raus)
const linkBereiche = [];
for (const m of structHtml.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)) linkBereiche.push({ was: "noscript", idx: m.index, text: m[0] });
{
  const m = /<nav\b[^>]*\bid="guide-links"[\s\S]*?<\/nav>/.exec(structHtml);
  if (m) linkBereiche.push({ was: "#guide-links", idx: m.index, text: m[0] });
  else fail("index.html: <nav id=\"guide-links\"> nicht gefunden");
}
if (!linkBereiche.some((b) => b.was === "noscript")) fail("index.html: kein <noscript>-Block gefunden");
{
  let bad = 0, anzahl = 0;
  for (const b of linkBereiche) {
    for (const m of b.text.matchAll(/<a\b[^>]*\bhref="\/([a-z0-9-]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
      anzahl++;
      const slug = m[1];
      const line = lineOf(indexHtml, b.idx + m.index);
      if (!fs.existsSync(path.join(ROOT, slug + ".html"))) { fail(`index.html:${line}: ${b.was} verlinkt /${slug}, aber ${slug}.html fehlt`); bad++; }
    }
  }
  if (!bad) ok(`${anzahl} Links in noscript/#guide-links zeigen auf vorhandene Dateien`);
}

// ── h) Labels: gen-seo NAV gegen VORGABEN-B, Linktexte in noscript/#guide-links ─
head("h) Linkbeschriftungen der SEO-Seiten (VORGABEN-B Abschnitt 2)");
if (NAV_ENTRIES.length) {
  let bad = 0;
  const navLabel = Object.fromEntries(NAV_ENTRIES.map((e) => [e.slug, e.label]));
  for (const [slug, soll] of Object.entries(SOLL_NAV_LABELS)) {
    const e = NAV_ENTRIES.find((x) => x.slug === slug);
    if (!e) { fail(`scripts/gen-seo.mjs: NAV-Eintrag "${slug}" fehlt (Soll-Label "${soll}")`); bad++; continue; }
    if (e.label !== soll) { fail(`scripts/gen-seo.mjs:${lineOf(genSrc, e.idx)}: NAV "${slug}" = ${JSON.stringify(e.label)}, Soll ${JSON.stringify(soll)}`); bad++; }
  }
  for (const e of NAV_ENTRIES) if (!(e.slug in SOLL_NAV_LABELS)) { fail(`scripts/gen-seo.mjs:${lineOf(genSrc, e.idx)}: NAV-Slug "${e.slug}" steht nicht in der Soll-Tabelle`); bad++; }
  if (!bad) ok(`${NAV_ENTRIES.length} NAV-Labels in gen-seo.mjs wie in VORGABEN-B`);
  let bad2 = 0, anzahl = 0;
  for (const b of linkBereiche) {
    for (const m of b.text.matchAll(/<a\b[^>]*\bhref="\/([a-z0-9-]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
      const slug = m[1];
      if (!(slug in navLabel)) continue;
      anzahl++;
      const text = normWs(decodeEntities(m[2].replace(/<[^>]*>/g, " ")));
      if (text !== (SOLL_NAV_LABELS[slug] ?? navLabel[slug])) {
        fail(`index.html:${lineOf(indexHtml, b.idx + m.index)}: ${b.was} Link /${slug} heisst ${JSON.stringify(text)}, Soll ${JSON.stringify(SOLL_NAV_LABELS[slug] ?? navLabel[slug])}`);
        bad2++;
      }
    }
  }
  if (!bad2) ok(`${anzahl} Linktexte in noscript/#guide-links stimmen mit den NAV-Labels ueberein`);
}

// ── Ergebnis ─────────────────────────────────────────────────────────────────
console.log("");
if (warnings) console.log(`(${warnings} Warnung(en), siehe WARN-Zeilen; zaehlen nicht als Fehler)`);
if (errors === 0) { console.log("ALLE CHECKS GRUEN"); process.exit(0); }
console.log(`${errors} FEHLER`);
process.exit(1);

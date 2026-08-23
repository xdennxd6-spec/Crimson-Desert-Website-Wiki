// gen-seo.mjs — erzeugt statische, crawlbare SEO-Landing-Pages aus den
// Datenstrukturen in index.html (Single Source of Truth bleibt index.html).
//
// Ausgabe: bosse.html, waffen.html, true-ending.html (hier direkt gebaut)
//          + ruestungen.html, crafting.html, bestiarium.html, side-quests.html,
//            trophaeen.html (aus den Modulen in scripts/seo-parts/)
//          + sitemap.xml
// Aufruf:  node scripts/gen-seo.mjs   (laeuft auch im Netlify-Build, s. netlify.toml)
//
// Die Seiten enthalten echten, vorgerenderten Inhalt (kein JS-Nachladen) und
// verlinken zurueck in die interaktive App (/#sec-...). Keine Datenduplizierung:
// alle Inhalte stammen live aus index.html.
//
// SEITEN-MODULE (seit 2026-07-31): Die fuenf neueren Seiten liegen als eigene
// Module unter scripts/seo-parts/. Jedes Modul exportiert SLUG, NAV_LABEL,
// DEEPLINK, SITEMAP, EXTRA_CSS, COUNT_CHECK(ctx) und build(ctx) und liefert damit
// alles, was Navigation, Sitemap, CSS und Ausgabe brauchen. Eine neue Seite
// erfordert deshalb nur: Modul anlegen, in SEO_PARTS eintragen, in NAV eintragen.
// Getestet werden die Module gegen dieselbe Mechanik ueber einen Harness
// (G:\Claude\Crimson-Desert-SEO\harness.mjs), der diese Datei spiegelt.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import * as partRuestungen from "./seo-parts/ruestungen.mjs";
import * as partCrafting from "./seo-parts/crafting.mjs";
import * as partBestiarium from "./seo-parts/bestiarium.mjs";
import * as partSideQuests from "./seo-parts/side-quests.mjs";
import * as partTrophaeen from "./seo-parts/trophaeen.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE = "https://crimson-desert-wiki.netlify.app";
// Seit dem Split (23.08.2026) liegen die Daten-Konstanten in data/*.js;
// fuer extract() zaehlt index.html + alle Datendateien als EIN Quelltext.
const html = [
  fs.readFileSync(path.join(ROOT, "index.html"), "utf8"),
  ...fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js")).sort()
    .map(f => fs.readFileSync(path.join(ROOT, "data", f), "utf8")),
].join("\n");
const TODAY = new Date().toISOString().slice(0, 10);

// ── Datenextraktion: balancierte Klammern + eval des Objektliterals ──────────
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
    else if (c === close) {
      depth--;
      if (depth === 0) {
        // eslint-disable-next-line no-eval
        return eval("(" + html.slice(i, j + 1) + ")");
      }
    }
  }
  throw new Error("Klammern unbalanciert bei: " + name);
}

// Optionale Datenstruktur: fehlt sie in index.html, faellt das zugehoerige
// Feature stillschweigend weg statt den Netlify-Build abzubrechen.
function extractOptional(name) {
  try { return extract(name); } catch { return null; }
}

const BOSSES = extract("BOSSES");
const WEAPONS = extract("WEAPONS");
const TRUE_ENDING = extract("TRUE_ENDING");
const BOSS_IMGS = extract("BOSS_IMGS");
const WEAPON_IMGS = extract("WEAPON_IMGS");
// Zweitbild pro Boss ({url,label,btn,src}); in der App Hover-Preview + Modal,
// hier ein JS-freier Aufklapper. Aktuell nur Sir Catfish, dessen Kartenbild das
// gleichnamige Fisch-Knowledge-Icon ist.
const BOSS_ALT_IMGS = extractOptional("BOSS_ALT_IMGS") || {};

// Datenstrukturen der Modul-Seiten (scripts/seo-parts/).
const ARMOR = extract("ARMOR");
const ARMOR_IMGS = extract("ARMOR_IMGS");
const CRAFTING = extract("CRAFTING");
const TROPHIES = extract("TROPHIES");
const TROPHY_GRADES = extract("TROPHY_GRADES");
const ENEMIES = extract("ENEMIES");
const ENEMY_IMGS = extract("ENEMY_IMGS");
const SIDE_QUESTS = extract("SIDE_QUESTS");

// Icon-CDN der Crafting-Rezepte. Das icon-Feld in CRAFTING haelt nur den
// Dateinamen; die vollstaendige URL ist CRAFT_CDN + icon. Spiegelt die
// gleichnamige Konstante in index.html.
const CRAFT_CDN = "https://cdn.questlog.gg/crimson-desert/assets/_sprites/";

// ── Helfer ───────────────────────────────────────────────────────────────────
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// leere / Platzhalter-Werte ("–", "-", "") als nicht vorhanden behandeln
const has = (v) => v != null && String(v).trim() !== "" && String(v).trim() !== "–" && String(v).trim() !== "-";

// Bild-URL: absolute (http/https, z.B. questlog-CDN) unveraendert, sonst root-relativ
const imgSrc = (v) => /^https?:/i.test(v) ? v : "/" + v;

// ── Seiten-Module + Navigation ───────────────────────────────────────────────
// Reihenfolge hier = Reihenfolge in sitemap.xml.
const SEO_PARTS = [partRuestungen, partCrafting, partBestiarium, partSideQuests, partTrophaeen];

// Kopf-Menue aller acht Seiten. Thematisch gruppiert: erst Gegner, dann
// Ausruestung, dann Herstellung, dann Quests, dann die Meta-Listen.
const NAV = [
  ["bosse", "Bosse"],
  ["bestiarium", "Bestiarium"],
  ["waffen", "Waffen"],
  ["ruestungen", "Rüstungen"],
  ["crafting", "Crafting"],
  ["side-quests", "Nebenquests"],
  ["trophaeen", "Trophäen"],
  ["true-ending", "True Ending"],
];

// Schutz gegen stille Inkonsistenz: jedes Modul muss im Menue auftauchen.
for (const p of SEO_PARTS) {
  if (!NAV.some(([s]) => s === p.SLUG)) {
    throw new Error(`Modul "${p.SLUG}" fehlt in der NAV-Liste von gen-seo.mjs`);
  }
}

// ── Redaktionelle Texte (scripts/seo-content/) ───────────────────────────────
// Einleitungsabsatz und FAQ pro Seite. Beides ist reiner Fliesstext ohne
// Spielmechanik-Zahlen und liegt bewusst NICHT in index.html, weil es kein
// Wiki-Datenbestand ist, sondern Seitentext. Fehlt eine Datei, entfaellt das
// Feature stillschweigend, statt den Netlify-Build zu kippen.
function ladeInhalt(datei) {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "seo-content", datei), "utf8"));
  } catch {
    console.warn(`  WARN: scripts/seo-content/${datei} fehlt oder ist ungueltig, wird uebersprungen`);
    return {};
  }
}
const SEO_INTROS = ladeInhalt("intros.json");
const SEO_FAQ = ladeInhalt("faq.json");
// Freischalt-Anleitungen je Trophaee. Anders als intros/faq ein Array, weil es
// pro Datensatz und nicht pro Seite gilt; das Modul indiziert selbst nach Namen.
const SEO_TROPHAEEN = ladeInhalt("trophaeen.json");

// ── Zahlen in redaktionellen Texten ──────────────────────────────────────────
// Die Fliesstexte in seo-content/ behaupten Datenmengen ("alle 337 Ruestungsteile",
// "fuenf verpassbare Trophaeen"). Fest verdrahtet driften diese Zahlen still von den
// Daten weg — genau das war am 14.08.2026 passiert: der Ruestungsbestand wuchs von
// 314 auf 337, Title und ItemList zogen automatisch mit, Intro und FAQ blieben bei
// 314 stehen und widersprachen der eigenen Seite fuenf Tage lang.
//
// Deshalb stehen dort jetzt Platzhalter: {{anzahl}} setzt die Ziffernform ein,
// {{verpassbar|wort}} die ausgeschriebene. Die Werte liefert das jeweilige Modul
// ueber seinen ZAHLEN(ctx)-Export, abgeleitet aus denselben Daten, aus denen die
// Seite gebaut wird. Ein unbekannter Platzhalter bricht den Build ab, statt still
// im Text stehen zu bleiben.
const ZAHLWORT = ["null", "eine", "zwei", "drei", "vier", "fünf", "sechs", "sieben",
  "acht", "neun", "zehn", "elf", "zwölf"];
const alsWort = (n) => (Number.isInteger(n) && n >= 0 && n < ZAHLWORT.length ? ZAHLWORT[n] : String(n));
// {{name|Wort}} gross geschrieben — zwei der Redaktionssaetze beginnen mit der
// Zahl ("Sechs Nebenquests sind verpassbar"). Ohne diese Variante tauscht man
// einen Zahlenfehler gegen einen Grammatikfehler ein.
const grossFormen = { wort: alsWort, Wort: (n) => { const w = alsWort(n); return w.charAt(0).toUpperCase() + w.slice(1); } };

function zahlenEinsetzen(text, zahlen, herkunft) {
  return String(text).replace(/\{\{(\w+)(?:\|(wort|Wort))?\}\}/g, (_, name, form) => {
    if (!(name in zahlen)) {
      throw new Error(`Unbekannter Platzhalter {{${name}}} in ${herkunft}. `
        + `Bekannt sind: ${Object.keys(zahlen).join(", ") || "(keine — Modul exportiert kein ZAHLEN)"}`);
    }
    const wert = zahlen[name];
    if (typeof wert !== "number") throw new Error(`Platzhalter {{${name}}} in ${herkunft} ist keine Zahl: ${wert}`);
    return form ? grossFormen[form](wert) : String(wert);
  });
}

// Dieselbe Ersetzung ueber eine ganze Datenstruktur. Gebraucht fuer
// seo-content/trophaeen.json: das ist kein Seitentext, sondern ein Array von
// Freischalt-Anleitungen, das gen-seo.mjs bisher ROH an das Modul weiterreichte —
// und damit an jeder Absicherung vorbei. Dort stand "alle 34 uebrigen
// PlayStation-Trophaeen" als hartes Literal, also TROPHIES.length-1.
function platzhalterTief(wert, zahlen, herkunft) {
  if (typeof wert === "string") return zahlenEinsetzen(wert, zahlen, herkunft);
  if (Array.isArray(wert)) return wert.map((v, i) => platzhalterTief(v, zahlen, `${herkunft}[${i}]`));
  if (wert && typeof wert === "object") {
    return Object.fromEntries(Object.entries(wert).map(([k, v]) => [k, platzhalterTief(v, zahlen, `${herkunft}.${k}`)]));
  }
  return wert;
}

// Eine Antwort "unbekannt" ist eine ehrliche Nicht-Antwort der Recherche, aber auf
// der Seite wertlos und ein schlechtes Signal. Solche Paare fliegen raus.
function faqFuer(slugName) {
  const liste = SEO_FAQ[slugName];
  if (!Array.isArray(liste)) return [];
  return liste.filter((f) =>
    f && f.frage && f.antwort && String(f.antwort).trim().toLowerCase() !== "unbekannt");
}

// CSS der Module, regelweise dedupliziert. Mehrere Module definieren bewusst
// dieselben Bausteine (z.B. span.miss und p.warn in trophaeen und side-quests);
// identische Regeln sollen nur einmal ausgeliefert werden. Zerlegt wird an "}",
// was zulaessig ist, solange die Module keine verschachtelten Regeln (@media,
// @supports) verwenden — das prueft die Zusicherung unten.
function cssRules(s) {
  return String(s || "").split("}").map((r) => r.trim()).filter(Boolean).map((r) => r + "}");
}
for (const p of SEO_PARTS) {
  if (/@(media|supports|container)/.test(p.EXTRA_CSS || "")) {
    throw new Error(`EXTRA_CSS von "${p.SLUG}" enthaelt eine At-Regel; die naive Zerlegung an "}" traegt das nicht.`);
  }
}
const PART_CSS = [...new Set(SEO_PARTS.flatMap((p) => cssRules(p.EXTRA_CSS)))].join("\n");

// ── Echte Bild-Dimensionen aus Dateiheadern (PNG IHDR, WebP VP8/VP8L/VP8X) ────
// Grund: #boss-grid-Karten und die SEO-Boss-Artikel sind auf einen 16:9-Container
// fixiert (kein CLS wg. HUD-Overlays). ~44 Boss-Bilder SIND selbst 16:9 (fex/*300px)
// -> object-fit:cover passt fast verlustfrei. ~54 Bilder sind quadratische 512x512-
// Assets (lokale fex-Ausnahmen + questlog-CDN cd_knowledgeimage_*/cd_questimage_*)
// -> cover schneidet dort ~42% vertikal weg. Fix: echte Dimension ermitteln, bei
// Abweichung vom 16:9-Container (Verhaeltnis < 1.5) Klasse "sq" setzen, die per CSS
// auf object-fit:contain umschaltet (Letterboxing auf dem dunklen img-Hintergrund).
function dimsFromBuffer(buf) {
  if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    // PNG: IHDR-Chunk beginnt fix bei Offset 16 (Breite), 20 (Hoehe), big-endian
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  if (buf.length >= 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const fourcc = buf.toString("ascii", 12, 16);
    if (fourcc === "VP8 ") {
      // Lossy VP8: 14-Bit-Werte ab Offset 26/28 (obere 2 Bit sind Skalierungs-Flags)
      return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    }
    if (fourcc === "VP8L") {
      // Lossless VP8L: 14-Bit-Werte (jeweils -1 gespeichert) ab Bit-Offset 21
      const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
      return {
        w: 1 + (((b1 & 0x3f) << 8) | b0),
        h: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
      };
    }
    if (fourcc === "VP8X") {
      // Extended: 24-Bit-Werte (jeweils -1 gespeichert), little-endian, ab Offset 24/27
      return {
        w: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        h: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      };
    }
  }
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    // JPEG: Segmentkette ab Offset 2 abschreiten bis zum ersten SOFn-Rahmenkopf.
    // Dort stehen Hoehe/Breite als big-endian ab Offset 5 bzw. 7. Gebraucht wird das
    // fuer das og:image-Fallbackbild (umbra-final.jpg) - PNG/WebP allein decken es nicht ab.
    let off = 2;
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) { off++; continue; }
      const marker = buf[off + 1];
      // Standalone-Marker ohne Laengenfeld ueberspringen (Padding, SOI, RSTn)
      if (marker === 0xff || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) { off += 2; continue; }
      const len = buf.readUInt16BE(off + 2);
      if (len < 2) break;
      // SOF0-SOF15, aber nicht DHT (c4), JPG (c8), DAC (cc) - die tragen keine Bildmasse
      const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSOF) return { w: buf.readUInt16BE(off + 7), h: buf.readUInt16BE(off + 5) };
      off += 2 + len;
    }
  }
  return null;
}
function dimsFromLocalFile(relPath) {
  try {
    return dimsFromBuffer(fs.readFileSync(path.join(ROOT, relPath)));
  } catch {
    return null;
  }
}
async function dimsFromRemote(url) {
  try {
    // Range-Request reicht fuer die Header (WebP/PNG-Dimensionen stehen in den ersten Bytes);
    // Fallback auf volle Antwort, falls der Server Range ignoriert (Status 200 statt 206).
    const res = await fetch(url, { headers: { Range: "bytes=0-65535" } });
    if (!res.ok) return null;
    return dimsFromBuffer(Buffer.from(await res.arrayBuffer()));
  } catch (e) {
    console.warn(`  WARN: Dimension von ${url} nicht per Netzwerk ermittelbar (${e.message})`);
    return null;
  }
}
// Map url -> {w,h}. Lokal: synchron aus Datei. Remote (questlog-CDN): per Range-Request
// (Netzwerkzugriff zur Buildzeit ist in diesem Projekt etabliert, s. scripts/linkcheck.mjs).
// Schlaegt ein Remote-Fetch fehl, wird konservativ quadratisch (512x512, => "sq") angenommen —
// das entspricht dem tatsaechlich beobachteten Regelfall dieser CDN-Bildklasse und verhindert,
// dass ein Netzwerk-Hänger die Cover-Crop-Regression stillschweigend wieder einschleppt.
const altImgUrls = Object.values(BOSS_ALT_IMGS).map((a) => a && a.url).filter(Boolean);
const bossImgUrls = [...new Set([...Object.values(BOSS_IMGS), ...altImgUrls])];
const bossImgDims = new Map();
const remoteUrls = [];
for (const url of bossImgUrls) {
  if (/^https?:/i.test(url)) { remoteUrls.push(url); continue; }
  const d = dimsFromLocalFile(url);
  if (d) bossImgDims.set(url, d);
  else console.warn(`  WARN: Header von lokalem Boss-Bild nicht lesbar: ${url}`);
}
const remoteDims = await Promise.all(remoteUrls.map(async (url) => [url, await dimsFromRemote(url)]));
for (const [url, d] of remoteDims) {
  bossImgDims.set(url, d || { w: 512, h: 512 });
  if (!d) console.warn(`  WARN: Fallback 512x512 (quadratisch) fuer nicht ermittelbares Remote-Bild: ${url}`);
}

// HOLO-GLAS-Palette (synchron mit index.html Standard-Theme, tokens.css Design-Sync 2026-07-04).
// Sora (Display) / IBM Plex Sans (Body) / IBM Plex Mono (Daten). Glas-Panels, Glow-Schatten, Radius 16.
const SHARED_CSS = `
:root{--bg:#0a0b12;--panel:rgba(20,22,38,.55);--panel-2:rgba(15,17,28,.62);--rail-bg:rgba(22,24,40,.5);
--line:rgba(198,204,236,.16);--line-strong:rgba(198,204,236,.30);
--ink-hi:#f2f0fb;--ink:#dcdcf0;--ink-dim:#a6a8c6;--ink-faint:#7d7fa0;
--red:#ff5a44;--red-hi:#ff8168;--red-glow:rgba(255,90,68,.5);--violet:#8b7bff;--amber:#e0a35a;--radius:16px;
/* Schriftskala wie in index.html: unter 12px zentral gesteuert, mobil angehoben. */
--fs-10:10px;--fs-11:11px;--fs-11-5:11.5px;
--shadow-soft:0 16px 34px -26px rgba(0,0,0,.85);
--f-display:'Sora',sans-serif;
--f-body:'IBM Plex Sans',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
--f-mono:'IBM Plex Mono',ui-monospace,'Courier New',monospace}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);
font-family:var(--f-body);line-height:1.62;font-size:15px;-webkit-font-smoothing:antialiased;
background-image:radial-gradient(70% 80% at 6% -8%,rgba(255,90,68,.14),transparent 55%),radial-gradient(60% 80% at 104% 108%,rgba(139,123,255,.16),transparent 55%)}
a{color:var(--red);text-decoration:none}
a:hover{color:var(--red-hi);text-decoration:underline}
a:focus-visible{outline:2px solid var(--red);outline-offset:2px}
header.site nav a:focus-visible{outline:2px solid var(--red);outline-offset:2px}
header.site{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;
padding:14px 20px;border-bottom:1px solid var(--line);
background:var(--rail-bg);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
header.site .brand{font-family:var(--f-display);font-weight:600;font-size:19px;
color:var(--ink-hi);letter-spacing:.02em;text-transform:uppercase}
header.site nav{display:flex;gap:16px;flex-wrap:wrap;font-family:var(--f-mono);font-size:var(--fs-11);font-weight:600;text-transform:uppercase;letter-spacing:.06em}
header.site nav a{color:var(--amber);display:inline-block;padding:10px 3px}
header.site nav a[aria-current=page]{color:var(--ink-hi);border-bottom:2px solid var(--red)}
main{max-width:1040px;margin:0 auto;padding:22px 20px 60px}
nav.crumbs{font-family:var(--f-mono);font-size:var(--fs-11);color:var(--ink-faint);margin:14px 0 6px;letter-spacing:.04em}
nav.crumbs a{color:var(--ink-faint)}
h1{font-family:var(--f-display);font-weight:600;font-size:30px;line-height:1.15;
margin:.2em 0 .3em;color:var(--ink-hi);letter-spacing:-.01em}
h2{font-family:var(--f-display);font-weight:600;font-size:22px;color:var(--ink-hi);
margin:1.7em 0 .6em;padding-bottom:8px;border-bottom:1px solid var(--line)}
h3{font-family:var(--f-display);font-weight:600;font-size:17px;margin:0 0 8px;color:var(--ink-hi)}
p.lead{font-size:16px;color:var(--ink-dim);max-width:75ch}
.cta{display:inline-block;margin:14px 0 4px;padding:11px 18px;border-radius:12px;
background:var(--red);color:#160a08;font-family:var(--f-mono);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.08em;border:1px solid var(--red);box-shadow:0 0 22px -4px var(--red-glow)}
.cta:hover{background:var(--red-hi);border-color:var(--red-hi);color:#160a08;text-decoration:none;box-shadow:0 0 30px -2px var(--red-glow)}
.note{font-family:var(--f-mono);font-size:var(--fs-11-5);color:var(--ink-faint);margin:6px 0 0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;margin-top:14px}
article.card{background:var(--panel-2);border:1px solid var(--line);border-radius:var(--radius);
padding:14px 16px;display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow-soft);position:relative;overflow:hidden;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
article.card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--red);box-shadow:0 0 12px var(--red-glow)}
article.card img{width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;object-position:center;border-radius:8px;
background:#131629;border:1px solid var(--line);filter:grayscale(.15) contrast(1.03)}
article.card img.sq{object-fit:contain}
ul.stats{list-style:none;margin:0;padding:0;font-size:13px;display:flex;
flex-direction:column;gap:3px}
ul.stats li b{color:var(--amber);font-weight:600;font-family:var(--f-mono)}
p.strat{font-size:13px;color:var(--ink);margin:4px 0 0;background:rgba(224,163,90,.07);border-left:2px solid var(--amber);border-radius:8px;padding:8px 11px}
details.boss-alt{margin:2px 0 0}
details.boss-alt>summary{list-style:none;cursor:pointer;display:inline-flex;align-items:center;
font-family:var(--f-mono);font-size:var(--fs-11);font-weight:600;text-transform:uppercase;letter-spacing:.06em;
color:var(--amber);background:rgba(224,163,90,.08);border:1px solid var(--line);border-radius:10px;
padding:7px 12px;transition:background .15s,border-color .15s,color .15s}
details.boss-alt>summary::-webkit-details-marker{display:none}
details.boss-alt>summary::marker{content:""}
details.boss-alt>summary:hover{background:rgba(224,163,90,.16);border-color:var(--amber);color:var(--ink-hi)}
details.boss-alt>summary:focus-visible{outline:2px solid var(--red);outline-offset:2px}
details.boss-alt[open]>summary{color:var(--ink-hi);border-color:var(--amber)}
details.boss-alt .alt-off{display:none}
details.boss-alt[open] .alt-on{display:none}
details.boss-alt[open] .alt-off{display:inline}
details.boss-alt figure{margin:11px 0 0}
details.boss-alt figure img{aspect-ratio:auto;object-fit:contain;max-height:64vh}
details.boss-alt figcaption{font-family:var(--f-mono);font-size:var(--fs-11);line-height:1.55;color:var(--ink-faint);margin-top:7px}
.tbl-wrap{overflow-x:auto;margin-top:8px;border:1px solid var(--line);border-radius:12px;box-shadow:var(--shadow-soft)}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{text-align:left;padding:9px 11px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--ink-hi);font-family:var(--f-mono);font-weight:700;font-size:var(--fs-10);text-transform:uppercase;letter-spacing:.1em;position:sticky;top:0;background:#191b2e}
tbody tr:nth-child(even) td{background:rgba(198,204,236,.03)}
tr:hover td{background:rgba(255,90,68,.07)}
td.muted{color:var(--ink-faint)}
td img.thumb{width:34px;height:34px;object-fit:cover;border-radius:6px;
background:#131629;border:1px solid var(--line);vertical-align:middle;margin-right:7px}
.te-cat{background:var(--panel-2);border:1px solid var(--line);border-radius:var(--radius);
padding:6px 18px 14px;margin-top:14px;box-shadow:var(--shadow-soft);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
ul.te{list-style:none;margin:0;padding:0}
ul.te li{padding:9px 0 9px 26px;border-bottom:1px solid var(--line);position:relative;font-size:14px}
ul.te li:last-child{border-bottom:0}
ul.te li::before{content:"\\2610";position:absolute;left:0;color:var(--red);font-size:16px}
footer.site{border-top:1px solid var(--line);padding:22px 20px;color:var(--ink-faint);
font-family:var(--f-mono);font-size:var(--fs-11);letter-spacing:.04em;text-align:center;max-width:1040px;margin:0 auto}
@media(max-width:560px){h1{font-size:24px}main{padding:16px 14px 50px}}

/* --- Sprungnavigation und Seitensuche (Punkt E-3) -------------------------
   Die Leiste ist reines HTML und funktioniert ohne Skript. Das Suchfeld steht
   mit [hidden] im Markup und wird erst vom Skript eingeblendet. */
.pagetools{margin:14px 0 22px;padding:12px 14px;background:var(--panel-2);
border:1px solid var(--line);border-radius:var(--radius)}
.pagetools .ptline{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.pagetools label{font-family:var(--f-mono);font-size:var(--fs-11);color:var(--ink-dim);
text-transform:uppercase;letter-spacing:.06em}
.pagetools input[type=search]{flex:1 1 220px;min-width:0;padding:7px 11px;
background:var(--bg);border:1px solid var(--line-strong);border-radius:8px;
color:var(--ink);font-family:var(--f-sans);font-size:14px}
.pagetools input[type=search]:focus{outline:2px solid var(--red);outline-offset:1px}
.pagetools .pt-count{font-family:var(--f-mono);font-size:var(--fs-11-5);color:var(--ink-faint)}
.jump{margin-top:10px;display:flex;flex-wrap:wrap;gap:6px}
.jump a{display:inline-block;padding:4px 10px;background:var(--bg);
border:1px solid var(--line);border-radius:999px;color:var(--ink-dim);
text-decoration:none;font-family:var(--f-mono);font-size:var(--fs-11)}
.jump a:hover,.jump a:focus{border-color:var(--red);color:var(--ink-hi)}
.jump a .n{color:var(--ink-faint);margin-left:5px}
h2[id]{scroll-margin-top:18px}
/* Auf schmalen Schirmen darf die Sprungleiste den Inhalt nicht verdraengen:
   waffen.html hat 21 Abschnitte, das waeren sonst ueber 300px Navigation vor
   dem ersten Eintrag. Drei Zeilen bleiben, der Rest scrollt in der Leiste. */
@media(max-width:600px){.jump{max-height:96px;overflow-y:auto}}
.pt-empty{display:none;margin:18px 0;padding:14px;border:1px dashed var(--line-strong);
border-radius:var(--radius);color:var(--ink-dim);font-family:var(--f-mono);font-size:14px}
/* !important, weil Layoutregeln wie article.card{display:flex} sonst gewinnen */
[data-pt-hidden]{display:none!important}
/* Mobil: nichts unter 11px. Gleiche Schwelle wie index.html. */
@media(max-width:600px){:root{--fs-10:12px;--fs-11:12px;--fs-11-5:12px}}

/* --- Einleitungsabsatz und FAQ der Modul-Seiten --- */
p.intro{font-size:15px;color:var(--ink);max-width:75ch;margin:0 0 4px}
details.faq{background:var(--panel-2);border:1px solid var(--line);border-radius:var(--radius);
margin-top:10px;box-shadow:var(--shadow-soft);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
details.faq>summary{list-style:none;cursor:pointer;padding:13px 16px;font-family:var(--f-display);
font-weight:600;font-size:15px;color:var(--ink-hi);display:flex;justify-content:space-between;gap:12px;align-items:center}
details.faq>summary::-webkit-details-marker{display:none}
details.faq>summary::marker{content:""}
details.faq>summary::after{content:"+";font-family:var(--f-mono);font-size:18px;color:var(--red);line-height:1}
details.faq[open]>summary::after{content:"\\2013"}
details.faq>summary:hover{color:var(--red-hi)}
details.faq>summary:focus-visible{outline:2px solid var(--red);outline-offset:2px}
details.faq>p{margin:0;padding:0 16px 14px;font-size:14px;color:var(--ink-dim);max-width:75ch}

/* --- Bausteine der Modul-Seiten (scripts/seo-parts/), regelweise dedupliziert --- */
${PART_CSS}
`.trim();

// slug fuer Anker-IDs
const slug = (s) => String(s).toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Vergibt jedem <h2> eine stabile id und liefert die Abschnittsliste zurueck.
// Die abschliessende Zaehlklammer bleibt aussen vor, damit die id sich nicht
// aendert, sobald ein Eintrag dazukommt.
function abschnitteAuszeichnen(bodyHtml) {
  const abschnitte = [];
  const vergeben = new Set();
  const body = bodyHtml.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (treffer, attr, inhalt) => {
    if (/\sid=/.test(attr)) return treffer;           // schon ausgezeichnet: nicht anfassen
    const roh = inhalt.replace(/<[^>]*>/g, "").replace(/\\s+/g, " ").trim();
    const ohneZahl = roh.replace(/\s*\([^()]*\)\s*$/, "").trim() || roh;
    // fuer den slug die HTML-Entities aufloesen, sonst wird "&amp;" zu "amp"
    const klar = ohneZahl.replace(/&amp;/g, "&").replace(/&[a-z]+;/g, " ");
    let id = "a-" + slug(klar);
    if (id === "a-") id = "a-abschnitt";
    if (vergeben.has(id)) {                            // Kollision: durchnummerieren
      let i = 2;
      while (vergeben.has(id + "-" + i)) i++;
      console.log(`  Hinweis: doppelter Abschnittstitel "${ohneZahl}" -> ${id}-${i}`);
      id = id + "-" + i;
    }
    vergeben.add(id);
    abschnitte.push({ id, titel: ohneZahl });
    return `<h2${attr} id="${id}">${inhalt}</h2>`;
  });
  return { body, abschnitte };
}

// Sprungleiste + Suchfeld. Ab zwei Abschnitten lohnt die Leiste; die Suche
// steht auf jeder Seite, auch auf einseitigen.
function seitenWerkzeuge(abschnitte) {
  const leiste = abschnitte.length >= 2
    ? `\n  <nav class="jump" aria-label="Abschnitte dieser Seite">${
        abschnitte.map((a) => `<a href="#${a.id}">${a.titel}</a>`).join("")}</nav>`
    : "";
  return `<div class="pagetools">
  <div class="ptline" hidden>
    <label for="pt-suche">Auf dieser Seite</label>
    <input type="search" id="pt-suche" autocomplete="off"
           placeholder="Name, Ort, Effekt \u2026" aria-describedby="pt-count">
    <span class="pt-count" id="pt-count" role="status" aria-live="polite"></span>
  </div>${leiste}
</div>
<p class="pt-empty" id="pt-empty">Kein Treffer auf dieser Seite.</p>`;
}

function pageShell({ slugName, title, desc, h1, lead, ogImage, bodyHtml, crumb, jsonld }) {
  const nav = abschnitteAuszeichnen(bodyHtml);
  bodyHtml = seitenWerkzeuge(nav.abschnitte) + "\n" + nav.body;
  const url = `${SITE}/${slugName}`;
  const OG_FALLBACK = "cd_assets/bosses/umbra-final.jpg";
  // Dimensionen je Seite frisch ermitteln - nicht alle Seiten teilen dasselbe og:image
  // (z.B. seo-parts/ruestungen.mjs nutzt golden-greed-plate.webp).
  let ogRel = ogImage || OG_FALLBACK;
  let ogDim = dimsFromLocalFile(ogRel);
  // twitter:card=summary_large_image braucht mindestens 600x315, sonst zeigen die
  // Plattformen die Karte klein oder ohne Bild. Zu kleine Motive (z.B. 256x256-Item-Icons)
  // deshalb auf das grosse Fallbackbild zuruecksetzen statt eine kaputte Vorschau zu erzeugen.
  if (ogDim && (ogDim.w < 600 || ogDim.h < 315)) {
    ogRel = OG_FALLBACK;
    ogDim = dimsFromLocalFile(ogRel);
  }
  const og = `${SITE}/${ogRel}`;
  const navLinks = NAV.map(([s, l]) =>
    `<a href="/${s}"${s === slugName ? ' aria-current="page"' : ""}>${l}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Crimson Desert Wiki">
<meta property="og:locale" content="de_DE">
<meta property="og:image" content="${og}">${ogDim ? `
<meta property="og:image:width" content="${ogDim.w}">
<meta property="og:image:height" content="${ogDim.h}">` : ""}
<meta property="og:image:alt" content="${esc(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#0a0b12">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/cd_assets/icons/favicon-32.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap">
<script type="application/ld+json">
${JSON.stringify(jsonld)}
</script>
<style>${SHARED_CSS}</style>
</head>
<body>
<header class="site">
  <a class="brand" href="/">Crimson Desert Wiki</a>
  <nav>${navLinks}</nav>
</header>
<main>
<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Startseite</a> &rsaquo; ${esc(crumb)}</nav>
<h1>${esc(h1)}</h1>
<p class="lead">${lead}</p>
${bodyHtml}
</main>
<script>
/* Seitensuche. Laeuft erst nach dem Laden und veraendert nichts, solange
   niemand tippt -- ohne Skript bleibt die Seite exakt wie ausgeliefert.
   Ein "Eintrag" ist eine Tabellenzeile, eine Karte oder ein Listenpunkt; die
   Zuordnung zum Abschnitt ergibt sich aus den Geschwistern hinter jeder
   Abschnittsueberschrift. */
(function(){
  var feld=document.getElementById('pt-suche');
  var zaehler=document.getElementById('pt-count');
  var leer=document.getElementById('pt-empty');
  var main=document.querySelector('main');
  if(!feld||!main)return;

  /* Diakritika entfernen -- dieselbe Faltung wie _fold() im Hauptwiki.
     ACHTUNG: doppelte Backslashes. Dieser Code steht in einem Template-Literal
     des Generators; einfach geschrieben kaeme im HTML /s+/ statt /\s+/ an. */
  function fold(s){return String(s==null?'':s).toLowerCase().replace(/ß/g,'ss')
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/\\s+/g,' ');}
  /* Suchbasis eines Eintrags: zusaetzlich die ausgeschriebene Umlautform.
     Sonst faende "rüstung" das Wort, "ruestung" aber nicht -- auf Tastaturen
     ohne Umlaute die haeufigere Eingabe. Der senkrechte Strich trennt beide
     Formen, damit kein Begriff ueber die Naht hinweg zufaellig trifft. */
  function basis(s){var k=String(s==null?'':s).toLowerCase();
    return fold(k)+'|'+fold(k.replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue'));}

  // Abschnitte einsammeln: jedes h2 mit allem, was bis zum naechsten h2 folgt
  var abschnitte=[];
  var kinder=Array.prototype.slice.call(main.children);
  var aktuell=null;
  kinder.forEach(function(el){
    if(el.tagName==='H2'){aktuell={kopf:el,bloecke:[],eintraege:[]};abschnitte.push(aktuell);return;}
    if(aktuell)aktuell.bloecke.push(el);
  });
  var SEL='tbody tr, article, li';
  abschnitte.forEach(function(a){
    a.bloecke.forEach(function(b){
      var treffer=b.matches&&b.matches(SEL)?[b]:Array.prototype.slice.call(b.querySelectorAll(SEL));
      treffer.forEach(function(e){
        /* Der aeusserste Kandidat gewinnt: eine Boss-Karte enthaelt Listen-
           punkte, trotzdem ist die KARTE der Eintrag. Uebersprungen wird nur,
           wer schon einen Eintrag als Vorfahren hat. */
        var p=e.parentElement, drin=false;
        while(p&&p!==document.body){ if(p.matches&&p.matches(SEL)){drin=true;break;} p=p.parentElement; }
        if(drin)return;
        a.eintraege.push(e);
        e.__pt=basis(e.textContent||'');
      });
    });
  });
  var gesamt=abschnitte.reduce(function(n,a){return n+a.eintraege.length;},0);
  if(!gesamt)return;                       // nichts Filterbares: Feld bleibt verborgen

  var zeile=feld.parentNode; zeile.hidden=false;   /* Label und Zaehler mit einblenden */
  var basis=gesamt+' Eintr'+(gesamt===1?'ag':'aege');
  zaehler.textContent=basis;

  function zeige(el,an){if(an)el.removeAttribute('data-pt-hidden');else el.setAttribute('data-pt-hidden','');}

  function filtern(){
    var q=fold(feld.value.trim());
    if(!q){
      abschnitte.forEach(function(a){
        zeige(a.kopf,true);a.bloecke.forEach(function(b){zeige(b,true);});
        a.eintraege.forEach(function(e){zeige(e,true);});
      });
      zaehler.textContent=basis;leer.style.display='none';return;
    }
    var sichtbar=0;
    abschnitte.forEach(function(a){
      var inAbschnitt=0;
      a.eintraege.forEach(function(e){
        var ok=e.__pt.indexOf(q)>=0;
        zeige(e,ok);if(ok)inAbschnitt++;
      });
      sichtbar+=inAbschnitt;
      // Abschnitt ohne Treffer komplett ausblenden, sonst bleiben leere
      // Ueberschriften und Tabellenkoepfe stehen
      zeige(a.kopf,inAbschnitt>0);
      a.bloecke.forEach(function(b){zeige(b,inAbschnitt>0);});
    });
    zaehler.textContent=sichtbar+' von '+gesamt;
    leer.style.display=sichtbar?'none':'block';
  }

  feld.addEventListener('input',filtern);
  feld.addEventListener('keydown',function(e){
    if(e.key==='Escape'){feld.value='';filtern();}
  });
})();
</script>
<footer class="site">
  Inhalte aus dem <a href="/">Crimson Desert Wiki &amp; Guide (Deutsch)</a> &middot;
  Quellen: Fextralife, game8, PowerPyx &middot; Fan-Projekt, kein offizielles Pearl-Abyss-Angebot.
</footer>
</body>
</html>`;
}

function breadcrumbLd(name, slugName) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name, item: `${SITE}/${slugName}` },
    ],
  };
}

// ── Seite 1: Bosse ────────────────────────────────────────────────────────────
function bossArticle(b) {
  const img = BOSS_IMGS[b.name];
  const d = img ? bossImgDims.get(img) : null;
  const w = d ? d.w : 300, h = d ? d.h : 169;
  const sqCls = d && d.w / d.h < 1.5 ? ' class="sq"' : "";
  const imgTag = img
    ? `<img loading="lazy" src="${esc(imgSrc(img))}" alt="${esc(b.name)} Boss in Crimson Desert" width="${w}" height="${h}"${sqCls}>`
    : "";
  const stats = [];
  if (b.chapter != null) stats.push(["Kapitel", b.chapter]);
  if (has(b.region)) stats.push(["Region", b.region]);
  if (has(b.quest)) stats.push(["Quest", b.quest]);
  if (has(b.weakness)) stats.push(["Schwäche", b.weakness]);
  if (has(b.parry_or_dodge)) stats.push(["Parry / Dodge", b.parry_or_dodge]);
  if (has(b.drop_weapon)) stats.push(["Waffen-Drop", b.drop_weapon]);
  if (has(b.drop_abyss_gear)) stats.push(["Abyss-Gear", b.drop_abyss_gear]);
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("");
  const strat = has(b.strategy) ? `<p class="strat"><b>Strategie:</b> ${esc(b.strategy)}</p>` : "";
  // Zweitbild als JS-freier Aufklapper (<details>): das Kartenbild bleibt stehen,
  // das alternative Artwork erscheint darunter. Bewusst kein Modal — diese Seiten
  // kommen ohne JavaScript aus, und ein Overlay ohne JS koennte weder Escape noch
  // Fokusfalle noch Scroll-Lock sauber bedienen.
  const alt = BOSS_ALT_IMGS[b.name];
  let altHtml = "";
  if (alt && alt.url) {
    const ad = bossImgDims.get(alt.url);
    const aw = ad ? ad.w : 512, ah = ad ? ad.h : 512;
    const cap = [alt.label, alt.src].filter(has).map(esc).join(" &middot; ");
    altHtml = `
<details class="boss-alt">
<summary><span class="alt-on">${esc(alt.btn || "Alternatives Artwork zeigen")}</span><span class="alt-off">Artwork wieder einklappen</span></summary>
<figure>
<img loading="lazy" src="${esc(imgSrc(alt.url))}" alt="${esc(alt.label || b.name)}" width="${aw}" height="${ah}">
${cap ? `<figcaption>${cap}</figcaption>` : ""}
</figure>
</details>`;
  }
  return `<article class="card" id="boss-${slug(b.name)}">
${imgTag}
<h3>${esc(b.name)}</h3>
<ul class="stats">${statsHtml}</ul>
${strat}${altHtml}
</article>`;
}

function buildBosse() {
  const story = BOSSES.filter((b) => b.chapter != null)
    .sort((a, b) => a.chapter - b.chapter || a.name.localeCompare(b.name));
  const world = BOSSES.filter((b) => b.chapter == null)
    .sort((a, b) => a.name.localeCompare(b.name));
  const body = `
<a class="cta" href="/#sec-bosses">Interaktive Boss-Übersicht öffnen &rarr;</a>
<p class="note">Mit Filter nach Region/Kapitel, Such- und Abhak-Funktion in der vollständigen App.</p>
<h2>Story-Bosse (nach Kapitel, ${story.length})</h2>
<div class="grid">${story.map(bossArticle).join("\n")}</div>
<h2>Welt- &amp; Fraktionsbosse (${world.length})</h2>
<div class="grid">${world.map(bossArticle).join("\n")}</div>`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Bosse", "bosse"),
      {
        "@type": "ItemList",
        name: "Alle Bosse in Crimson Desert",
        numberOfItems: BOSSES.length,
        itemListElement: BOSSES.map((b, i) => ({
          "@type": "ListItem", position: i + 1, name: b.name,
        })),
      },
    ],
  };
  return pageShell({
    slugName: "bosse",
    title: `Alle ${BOSSES.length} Bosse in Crimson Desert: Liste & Strategien`,
    desc: `Komplette Liste aller ${BOSSES.length} Bosse in Crimson Desert: Region, Kapitel, Schwächen, Parry- oder Dodge-Hinweise, Drops und Kampf-Strategie für jeden Boss. Deutsch.`,
    h1: `Alle ${BOSSES.length} Bosse in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${BOSSES.length} Bosse</strong> aus Crimson Desert mit Fundort, Kapitel, Schwäche, Parry-/Dodge-Empfehlung, Drops und einer kurzen Strategie. Aufgeteilt in Story-Bosse und freie Welt- &amp; Fraktionsbosse.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Bosse",
    bodyHtml: body,
    jsonld,
  });
}

// ── Seite 2: Waffen ───────────────────────────────────────────────────────────
function weaponRow(w) {
  const img = WEAPON_IMGS[w.name];
  const thumb = img ? `<img class="thumb" loading="lazy" src="${esc(imgSrc(img))}" alt="" width="34" height="34">` : "";
  const cell = (v) => has(v) ? esc(v) : `<span class="muted">nicht erfasst</span>`;
  return `<tr>
<td>${thumb}${esc(w.name)}</td>
<td>${has(w.atk) ? esc(w.atk) : '<span class="muted">–</span>'}</td>
<td>${w.crit != null ? esc(w.crit) : '<span class="muted">n.&nbsp;e.</span>'}</td>
<td>${w.slots != null ? esc(w.slots) : '<span class="muted">n.&nbsp;e.</span>'}</td>
<td>${cell(w.source)}</td>
<td>${cell(w.built_in)}</td>
</tr>`;
}

function buildWaffen() {
  const byType = {};
  for (const w of WEAPONS) {
    const t = has(w.type) ? w.type : "Sonstige";
    (byType[t] ||= []).push(w);
  }
  const types = Object.keys(byType).sort((a, b) => a.localeCompare(b));
  const sections = types.map((t) => {
    const rows = byType[t].sort((a, b) => a.name.localeCompare(b.name)).map(weaponRow).join("\n");
    return `<h2>${esc(t)} (${byType[t].length})</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Waffe</th><th>ATK</th><th>Crit</th><th>Slots</th><th>Fundort</th><th>Built-in / Abyss</th></tr></thead>
<tbody>${rows}</tbody>
</table></div>`;
  }).join("\n");
  const body = `
<a class="cta" href="/#sec-weapons">Interaktive Waffen-Datenbank öffnen &rarr;</a>
<p class="note">„n.&nbsp;e." = nicht erfasst (kein belastbarer Quellenwert). Die ATK-Zahl ist <strong>kein Fundzustands-Wert</strong>: Eine Kartierung aller ${WEAPONS.filter((w) => has(w.atk)).length} Waffen mit ATK gegen die Refinement-Tabellen von Fextralife (Stand 11.08.2026) zeigt, dass hier der höchste dokumentierte Wert steht — bei Kampfwaffen also die Refinement-Endstufe +10. Eine frisch gefundene, ungeschliffene Waffe ist deutlich schwächer. Crit-Stufe und Abyss-Slots differenzieren im Vergleich stärker als die ATK-Zahl.</p>
${sections}`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Waffen", "waffen"),
      {
        "@type": "ItemList",
        name: "Alle Waffen in Crimson Desert",
        numberOfItems: WEAPONS.length,
      },
    ],
  };
  return pageShell({
    slugName: "waffen",
    title: `Alle ${WEAPONS.length} Waffen in Crimson Desert: Werte & Fundorte`,
    desc: `Crimson Desert Waffen-Datenbank: ${WEAPONS.length} Waffen nach Typ sortiert, mit Angriff, Crit-Stufe, Abyss-Slots, Fundort und eingebauten Abyss-Fähigkeiten. Deutsch.`,
    h1: `Alle ${WEAPONS.length} Waffen in Crimson Desert`,
    lead: `Vollständige <strong>Waffen-Datenbank</strong> für Crimson Desert: ${WEAPONS.length} Waffen, gruppiert nach Waffentyp, jeweils mit Angriffswert, Crit-Stufe, Anzahl Abyss-Slots, Fundort und eingebauten Fähigkeiten.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Waffen",
    bodyHtml: body,
    jsonld,
  });
}

// ── Seite 3: True Ending ──────────────────────────────────────────────────────
function buildTrueEnding() {
  const order = ["Companions", "Sanctums", "Hexen", "Greymane", "Story", "Misc"];
  const label = {
    Companions: "Begleiter (Companions)", Sanctums: "Sanctums",
    Hexen: "Hexen-Tokens", Greymane: "Greymane-Commissions",
    Story: "Story & Epilog", Misc: "Sonstiges",
  };
  const cats = [...new Set(TRUE_ENDING.map((t) => t.cat))]
    .sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  const sections = cats.map((cat) => {
    const items = TRUE_ENDING.filter((t) => t.cat === cat);
    const lis = items.map((t) => `<li>${esc(t.task)}</li>`).join("\n");
    return `<h2>${esc(label[cat] || cat)} (${items.length})</h2>
<div class="te-cat"><ul class="te">${lis}</ul></div>`;
  }).join("\n");
  const body = `
<a class="cta" href="/#sec-checklists">Interaktive Checkliste mit Fortschritt öffnen &rarr;</a>
<p class="note">In der App hakst du jede Aufgabe ab und siehst deinen Fortschritt in Prozent; der Stand wird lokal gespeichert.</p>
${sections}`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("True Ending", "true-ending"),
      {
        "@type": "Article",
        headline: "Crimson Desert True Ending: komplette Checkliste",
        inLanguage: "de-DE",
        author: { "@type": "Person", name: "Christian Stein" },
        about: { "@type": "VideoGame", name: "Crimson Desert" },
      },
    ],
  };
  return pageShell({
    slugName: "true-ending",
    title: `Crimson Desert True Ending: komplette Checkliste (Deutsch)`,
    desc: `Alle ${TRUE_ENDING.length} Pflichtaufgaben für das True Ending von Crimson Desert: Begleiter-Arcs, Sanctums, Hexen-Tokens und Abyss-Aufgaben als abhakbare Checkliste.`,
    h1: "Crimson Desert True Ending: komplette Checkliste",
    lead: `Das <strong>True Ending</strong> (das „wahre Ende") von Crimson Desert schaltest du nur frei, wenn du vor dem Abschluss der Hauptstory bestimmte optionale Aufgaben erfüllst. Diese Checkliste fasst alle <strong>${TRUE_ENDING.length} Pflichtaufgaben</strong> zusammen, sortiert nach Bereich.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "True Ending",
    bodyHtml: body,
    jsonld,
  });
}

// ── Sitemap ───────────────────────────────────────────────────────────────────
function buildSitemap() {
  // Die drei urspruenglichen Seiten haben ihre Prioritaet hier fest; die
  // Modul-Seiten bringen sie als SITEMAP-Export selbst mit. Die Reihenfolge
  // folgt NAV, damit Menue und Sitemap nicht auseinanderlaufen.
  const FEST = {
    "bosse": { pri: "0.9", freq: "monthly" },
    "waffen": { pri: "0.9", freq: "monthly" },
    "true-ending": { pri: "0.8", freq: "monthly" },
  };
  const vonModul = Object.fromEntries(SEO_PARTS.map((p) => [p.SLUG, p.SITEMAP]));
  const urls = [
    { loc: SITE + "/", pri: "1.0", freq: "weekly" },
    ...NAV.map(([s]) => {
      const cfg = FEST[s] || vonModul[s];
      if (!cfg) throw new Error(`Keine Sitemap-Angabe fuer Seite "${s}"`);
      return { loc: `${SITE}/${s}`, pri: cfg.pri, freq: cfg.freq };
    }),
  ];
  const body = urls.map((u) =>
    `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

// ── Redaktionelle Zutaten an eine Modul-Seite anflanschen ────────────────────
// Zentral hier statt in jedem der fuenf Module, damit Aufbau, Markup und
// JSON-LD ueber alle Seiten identisch bleiben.

// Sichtbare FAQ als JS-freier Aufklapper. <details> braucht kein Script und ist
// fuer Crawler vollstaendig lesbar, auch im zugeklappten Zustand.
function faqSektion(liste) {
  const items = liste.map((f) => `<details class="faq">
<summary>${esc(f.frage)}</summary>
<p>${esc(f.antwort)}</p>
</details>`).join("\n");
  return `
<h2>Häufige Fragen (${liste.length})</h2>
${items}`;
}

// FAQPage-Auszeichnung. Google kann daraus aufklappbare Treffer direkt in der
// Suchergebnisliste bauen. Muss inhaltlich exakt dem sichtbaren Text entsprechen,
// sonst wertet Google es als irrefuehrend, deshalb dieselbe gefilterte Liste.
function faqPageLd(liste) {
  return {
    "@type": "FAQPage",
    mainEntity: liste.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };
}

// Baut die fertige Seite eines Moduls: Modul-Ausgabe + Intro-Absatz + FAQ.
function baueModulSeite(p) {
  // Zusatztexte des Moduls (ctx.content) VOR dem Rendern fuellen, sonst bliebe
  // eine {{...}}-Klammer im ausgelieferten HTML stehen.
  const vorabZahlen = typeof p.ZAHLEN === "function" ? p.ZAHLEN(CTX) : {};
  const ctx = CTX.content[p.SLUG] === undefined ? CTX
    : { ...CTX, content: { ...CTX.content, [p.SLUG]: platzhalterTief(CTX.content[p.SLUG], vorabZahlen, `${p.SLUG}.json`) } };
  const spec = p.build(ctx);

  // Einleitungsabsatz ganz nach oben, direkt unter den Lead. Das ist der erste
  // zusammenhaengende Fliesstext der Seite und damit das, was Suchmaschinen zur
  // thematischen Einordnung heranziehen.
  // Datenmengen des Moduls, fuer die Platzhalter in Intro, FAQ und Zusatztexten.
  const zahlen = typeof p.ZAHLEN === "function" ? p.ZAHLEN(CTX) : {};

  const intro = SEO_INTROS[p.SLUG];
  if (intro && intro.intro) {
    const text = zahlenEinsetzen(intro.intro, zahlen, `intros.json → ${p.SLUG}.intro`);
    spec.bodyHtml = `<p class="intro">${esc(text)}</p>\n${spec.bodyHtml}`;
  }

  const faq = faqFuer(p.SLUG).map((f, i) => ({
    frage: zahlenEinsetzen(f.frage, zahlen, `faq.json → ${p.SLUG}[${i}].frage`),
    antwort: zahlenEinsetzen(f.antwort, zahlen, `faq.json → ${p.SLUG}[${i}].antwort`),
  }));
  if (faq.length) {
    spec.bodyHtml += "\n" + faqSektion(faq);
    if (spec.jsonld && Array.isArray(spec.jsonld["@graph"])) {
      spec.jsonld["@graph"].push(faqPageLd(faq));
    }
  }
  return pageShell(spec);
}

// ── Kontext fuer die Seiten-Module ────────────────────────────────────────────
// Die Module bekommen Daten und Helfer als Objekt uebergeben, statt sie aus dem
// Dateiscope zu ziehen. Dadurch laufen sie unveraendert auch im Test-Harness.
const CTX = {
  data: {
    ARMOR, ARMOR_IMGS, CRAFTING, TROPHIES, TROPHY_GRADES,
    ENEMIES, ENEMY_IMGS, SIDE_QUESTS,
  },
  // Redaktionelle Zusatztexte aus scripts/seo-content/. Bewusst getrennt von
  // "data": das hier ist kein Wiki-Datenbestand, sondern Seitentext. Fehlt eine
  // Datei, liefert ladeInhalt() {} und das Modul rendert den Teil einfach nicht.
  content: { trophaeen: SEO_TROPHAEEN },
  helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE, CRAFT_CDN },
};

// ── Schreiben ─────────────────────────────────────────────────────────────────
const outputs = [
  ["bosse.html", buildBosse()],
  ["waffen.html", buildWaffen()],
  ["true-ending.html", buildTrueEnding()],
  ...SEO_PARTS.map((p) => [`${p.SLUG}.html`, baueModulSeite(p)]),
  ["sitemap.xml", buildSitemap()],
];
for (const [file, content] of outputs) {
  const ziel = path.join(ROOT, file);
  // Zeilenenden der vorhandenen Datei uebernehmen. Der PC fuehrt die erzeugten Seiten als
  // CRLF, der Pi als LF. Wer hart eines von beiden schreibt, erzeugt auf der jeweils anderen
  // Maschine einen Diff ueber die komplette Datei -- und ein echter Fehler faellt darin
  // niemandem mehr auf. Bis 23.08.2026 schrieb der Generator immer LF.
  let vorhanden = null;
  let ausgabe = content;
  if (fs.existsSync(ziel)) {
    vorhanden = fs.readFileSync(ziel, "utf8");
    const crlf = (vorhanden.match(/\r\n/g) || []).length;
    const lf = (vorhanden.match(/(?<!\r)\n/g) || []).length;
    if (crlf > lf) ausgabe = content.replace(/\r?\n/g, "\r\n");
  }
  // Unveraenderte Dateien nicht anfassen: sonst wandert die mtime und git meldet Arbeit,
  // die es nicht gab.
  if (vorhanden === ausgabe) {
    console.log(`  unveraendert: ${file.padEnd(18)} ${(ausgabe.length / 1024).toFixed(1)} KB`);
    continue;
  }
  fs.writeFileSync(ziel, ausgabe, "utf8");
  console.log(`  geschrieben: ${file.padEnd(18)} ${(ausgabe.length / 1024).toFixed(1)} KB`);
}

// Vollstaendigkeitskontrolle direkt beim Erzeugen: jedes Modul deklariert per
// COUNT_CHECK, wie viele Datensaetze auf seiner Seite stehen muessen. Weicht das
// ab, bricht der Build ab, statt eine unvollstaendige Seite zu deployen.
let countFehler = 0;
for (const p of SEO_PARTS) {
  const { regex, expected, label } = p.COUNT_CHECK(CTX);
  const seite = fs.readFileSync(path.join(ROOT, `${p.SLUG}.html`), "utf8");
  const n = (seite.match(regex) || []).length;
  if (n !== expected) {
    console.error(`  FEHLER: ${p.SLUG}.html hat ${n} ${label}, erwartet ${expected}`);
    countFehler++;
  }
}
if (countFehler) {
  console.error(`\n${countFehler} Seite(n) unvollstaendig — Abbruch.`);
  process.exit(1);
}

const nEnemies = Object.values(ENEMIES).reduce((a, v) => a + (Array.isArray(v) ? v.length : 0), 0);
console.log(`\nDaten: ${BOSSES.length} Bosse, ${WEAPONS.length} Waffen, ${TRUE_ENDING.length} True-Ending-Aufgaben,`);
console.log(`       ${ARMOR.length} Ruestungen, ${CRAFTING.length} Rezepte, ${nEnemies} Gegner, ${SIDE_QUESTS.length} Nebenquests, ${TROPHIES.length} Trophaeen (Stand ${TODAY}).`);

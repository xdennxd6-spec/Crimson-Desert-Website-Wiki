// gen-seo.mjs — erzeugt statische, crawlbare SEO-Landing-Pages aus den
// Datenstrukturen in index.html (Single Source of Truth bleibt index.html).
//
// Ausgabe: bosse.html, waffen.html, true-ending.html + sitemap.xml
// Aufruf:  node scripts/gen-seo.mjs   (laeuft auch im Netlify-Build, s. netlify.toml)
//
// Die Seiten enthalten echten, vorgerenderten Inhalt (kein JS-Nachladen) und
// verlinken zurueck in die interaktive App (/#sec-...). Keine Datenduplizierung:
// alle Inhalte stammen live aus index.html.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE = "https://crimson-desert-wiki.netlify.app";
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
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

// ── Helfer ───────────────────────────────────────────────────────────────────
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// leere / Platzhalter-Werte ("–", "-", "") als nicht vorhanden behandeln
const has = (v) => v != null && String(v).trim() !== "" && String(v).trim() !== "–" && String(v).trim() !== "-";

// Bild-URL: absolute (http/https, z.B. questlog-CDN) unveraendert, sonst root-relativ
const imgSrc = (v) => /^https?:/i.test(v) ? v : "/" + v;

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
header.site nav{display:flex;gap:16px;flex-wrap:wrap;font-family:var(--f-mono);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
header.site nav a{color:var(--amber);display:inline-block;padding:10px 3px}
header.site nav a[aria-current=page]{color:var(--ink-hi);border-bottom:2px solid var(--red)}
main{max-width:1040px;margin:0 auto;padding:22px 20px 60px}
nav.crumbs{font-family:var(--f-mono);font-size:11px;color:var(--ink-faint);margin:14px 0 6px;letter-spacing:.04em}
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
.note{font-family:var(--f-mono);font-size:11.5px;color:var(--ink-faint);margin:6px 0 0}
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
font-family:var(--f-mono);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;
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
details.boss-alt figcaption{font-family:var(--f-mono);font-size:11px;line-height:1.55;color:var(--ink-faint);margin-top:7px}
.tbl-wrap{overflow-x:auto;margin-top:8px;border:1px solid var(--line);border-radius:12px;box-shadow:var(--shadow-soft)}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{text-align:left;padding:9px 11px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--ink-hi);font-family:var(--f-mono);font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.1em;position:sticky;top:0;background:#191b2e}
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
font-family:var(--f-mono);font-size:11px;letter-spacing:.04em;text-align:center;max-width:1040px;margin:0 auto}
@media(max-width:560px){h1{font-size:24px}main{padding:16px 14px 50px}}
`.trim();

// slug fuer Anker-IDs
const slug = (s) => String(s).toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function pageShell({ slugName, title, desc, h1, lead, ogImage, bodyHtml, crumb, jsonld }) {
  const url = `${SITE}/${slugName}`;
  const og = ogImage ? `${SITE}/${ogImage}` : `${SITE}/cd_assets/bosses/umbra-final.jpg`;
  const navLinks = [
    ["bosse", "Bosse"], ["waffen", "Waffen"], ["true-ending", "True Ending"],
  ].map(([s, l]) =>
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
<meta property="og:image" content="${og}">
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
<p class="note">„n.&nbsp;e." = nicht erfasst (kein belastbarer Quellenwert). Crit-Stufe und Abyss-Slots sind die echten Differenzierer, nicht der flache Basis-Angriff.</p>
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
    desc: `Alle ${TRUE_ENDING.length} Pflichtaufgaben für das True Ending von Crimson Desert: Begleiter-Arcs, alle Sanctums, Hexen-Tokens, Greymane-Commissions und Story-Schritte als abhakbare Checkliste.`,
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
  const urls = [
    { loc: SITE + "/", pri: "1.0", freq: "weekly" },
    { loc: SITE + "/bosse", pri: "0.9", freq: "monthly" },
    { loc: SITE + "/waffen", pri: "0.9", freq: "monthly" },
    { loc: SITE + "/true-ending", pri: "0.8", freq: "monthly" },
  ];
  const body = urls.map((u) =>
    `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

// ── Schreiben ─────────────────────────────────────────────────────────────────
const outputs = [
  ["bosse.html", buildBosse()],
  ["waffen.html", buildWaffen()],
  ["true-ending.html", buildTrueEnding()],
  ["sitemap.xml", buildSitemap()],
];
for (const [file, content] of outputs) {
  fs.writeFileSync(path.join(ROOT, file), content, "utf8");
  console.log(`  geschrieben: ${file.padEnd(18)} ${(content.length / 1024).toFixed(1)} KB`);
}
console.log(`\nDaten: ${BOSSES.length} Bosse, ${WEAPONS.length} Waffen, ${TRUE_ENDING.length} True-Ending-Aufgaben (Stand ${TODAY}).`);

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

const BOSSES = extract("BOSSES");
const WEAPONS = extract("WEAPONS");
const TRUE_ENDING = extract("TRUE_ENDING");
const BOSS_IMGS = extract("BOSS_IMGS");
const WEAPON_IMGS = extract("WEAPON_IMGS");

// ── Helfer ───────────────────────────────────────────────────────────────────
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// leere / Platzhalter-Werte ("–", "-", "") als nicht vorhanden behandeln
const has = (v) => v != null && String(v).trim() !== "" && String(v).trim() !== "–" && String(v).trim() !== "-";

// Bild-URL: absolute (http/https, z.B. questlog-CDN) unveraendert, sonst root-relativ
const imgSrc = (v) => /^https?:/i.test(v) ? v : "/" + v;

const SHARED_CSS = `
:root{--bg:#060606;--bg2:#0d0c0c;--bg3:#161414;--red:#c0311f;--rhi:#e84535;
--gold:#cc9f28;--glo:#f4cc52;--text:#ddd5cd;--dim:#8a837c;--bdr:#252222;
--card:#100f0f;--cardh:#181512}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);
font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
line-height:1.6;font-size:15px;-webkit-font-smoothing:antialiased}
a{color:var(--gold);text-decoration:none}
a:hover{color:var(--glo);text-decoration:underline}
header.site{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;
padding:14px 20px;border-bottom:1px solid var(--bdr);
background:linear-gradient(90deg,rgba(201,162,39,.08) 0%,transparent 70%)}
header.site .brand{font-family:Cinzel,serif;font-weight:900;font-size:18px;
color:var(--gold);letter-spacing:.5px}
header.site nav{display:flex;gap:16px;flex-wrap:wrap;font-size:13px;font-weight:600}
header.site nav a[aria-current=page]{color:var(--glo);border-bottom:2px solid var(--red)}
main{max-width:1040px;margin:0 auto;padding:22px 20px 60px}
nav.crumbs{font-size:12px;color:var(--dim);margin:14px 0 6px}
nav.crumbs a{color:var(--dim)}
h1{font-family:Cinzel,serif;font-weight:900;font-size:30px;line-height:1.2;
margin:.2em 0 .3em;color:#f0e8de}
h2{font-family:Cinzel,serif;font-weight:700;font-size:21px;color:var(--gold);
margin:1.7em 0 .6em;padding-bottom:6px;border-bottom:1px solid var(--bdr)}
h3{font-size:16px;margin:0 0 8px;color:#f0e8de}
p.lead{font-size:16px;color:var(--text);max-width:75ch}
.cta{display:inline-block;margin:14px 0 4px;padding:10px 18px;border-radius:8px;
background:var(--red);color:#fff;font-weight:700;font-size:14px}
.cta:hover{background:var(--rhi);color:#fff;text-decoration:none}
.note{font-size:12.5px;color:var(--dim);margin:6px 0 0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;margin-top:14px}
article.card{background:var(--card);border:1px solid var(--bdr);border-radius:10px;
padding:14px 16px;display:flex;flex-direction:column;gap:8px}
article.card img{width:100%;height:150px;object-fit:cover;border-radius:7px;
background:var(--bg3);border:1px solid var(--bdr)}
ul.stats{list-style:none;margin:0;padding:0;font-size:13px;display:flex;
flex-direction:column;gap:3px}
ul.stats li b{color:var(--gold);font-weight:600}
p.strat{font-size:13px;color:var(--text);margin:4px 0 0}
.tbl-wrap{overflow-x:auto;margin-top:8px}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--bdr);vertical-align:top}
th{color:var(--gold);font-weight:600;position:sticky;top:0;background:var(--bg2)}
tr:hover td{background:var(--cardh)}
td.muted{color:var(--dim)}
td img.thumb{width:34px;height:34px;object-fit:cover;border-radius:5px;
background:var(--bg3);vertical-align:middle;margin-right:7px}
.te-cat{background:var(--card);border:1px solid var(--bdr);border-radius:10px;
padding:6px 18px 14px;margin-top:14px}
ul.te{list-style:none;margin:0;padding:0}
ul.te li{padding:9px 0 9px 26px;border-bottom:1px solid var(--bdr);position:relative;font-size:14px}
ul.te li:last-child{border-bottom:0}
ul.te li::before{content:"\\2610";position:absolute;left:0;color:var(--gold);font-size:16px}
footer.site{border-top:1px solid var(--bdr);padding:22px 20px;color:var(--dim);
font-size:12px;text-align:center;max-width:1040px;margin:0 auto}
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
<meta name="theme-color" content="#060606">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/cd_assets/icons/favicon-32.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;500;600;700&display=swap">
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
  const imgTag = img
    ? `<img loading="lazy" src="${esc(imgSrc(img))}" alt="${esc(b.name)} Boss in Crimson Desert" width="300" height="150">`
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
  return `<article class="card" id="boss-${slug(b.name)}">
${imgTag}
<h3>${esc(b.name)}</h3>
<ul class="stats">${statsHtml}</ul>
${strat}
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

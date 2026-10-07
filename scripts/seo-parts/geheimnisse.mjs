// parts/geheimnisse.mjs — SEO-Seite "Secrets & Lore".
//
// Die App-Sektion sec-secrets (renderSecrets() in index.html) hat zwölf Tabs. Davon
// speisen sich sieben aus Datenkonstanten (data/d04-armor-imgs.js); diese stehen
// hier als Karten bzw. Tabellenzeilen mit eigener id:
//   Easter Eggs        SECRETS_EASTER_EGGS      (Karten, geh-ei-)
//   Hidden Locations   SECRETS_LOCATIONS        (Karten, geh-ort-)
//   Hidden Weapons     SECRETS_HIDDEN_WEAPONS   (Karten, geh-waffe-)
//   Mechaniken         SECRETS_MECHANICS        (Karten, geh-mech-)
//   Such-Tools         SECRETS_TOOLS            (Tabelle, geh-tool-)
//   Memory Fragments   FRAGMENT_REGIONS         (Tabelle, geh-fragment-)
//   Abyss Cressets     CRESSET_REGIONS + SECRETS_CRESSET_REGIONS (Tabelle, geh-cresset-)
// Die uebrigen Tabs sind in der App fest in den Renderer geschriebener Text (kein
// Datenobjekt): Hidden Ending, Visione/Fragment-Anleitung, Cresset-Belohnungen und
// Traversal-Skills, Prioritaetsliste. Sie stehen hier als verkuerzte, inhaltlich
// aus dem Renderer uebernommene Textbloecke (Stand index.html 07.10.2026) und haben
// KEINE ids, zaehlen also nicht zu COUNT_CHECK. Die Story-Timeline (Tab 2, maximale
// Spoiler) und die zwei Tracker-Tabs (Mitmach-Werkzeuge) bleiben der App vorbehalten.
// LORE_TERMS ist ein Tooltip-Glossar der App (Hover-Texte), kein sichtbarer Inhalt
// der Sektion, und wird deshalb nicht ausgegeben.
//
// FRAGMENT_TOTAL / CRESSET_TOTAL sind einfache Zahlen und per extract() nicht
// lesbar; die Summe der cap-Felder ergibt dieselben Werte (201 bzw. 60) und ist die
// Rechenbasis der Seite.
//
// HTML in den Daten: SECRETS_LOCATIONS/-MECHANICS/-HIDDEN_WEAPONS enthalten
// <strong> und <em> (die App setzt sie ungefiltert ein). rich() uebernimmt NUR
// diese beiden Tags und escapt alles andere.
//
// ctx = { data, helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE, extract } }

import fs from "fs";

export const SLUG = "geheimnisse";
export const NAV_LABEL = "Secrets & Lore";
export const DEEPLINK = "/#sec-secrets";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
p.geh-spoiler{margin:14px 0 0;padding:9px 13px;font-size:13px;color:var(--ink);background:rgba(255,90,68,.08);border-left:2px solid var(--red);border-radius:8px}
h3.geh-h{margin:20px 0 0;font-size:16px}
p.geh-text{margin:8px 0 0;font-size:14px;color:var(--ink);max-width:75ch}
p.geh-body{margin:2px 0 0;font-size:13.5px;color:var(--ink-dim)}
p.geh-reward{margin:2px 0 0;font-size:13px;color:var(--ink)}
article.card img.geh-wimg{width:85px;height:85px;aspect-ratio:1/1;object-fit:contain}
ul.geh-list,ol.geh-list{margin:6px 0 0;padding-left:22px;font-size:14px;color:var(--ink);max-width:75ch}
ul.geh-list li,ol.geh-list li{margin:0 0 4px}
code.geh-code{font-family:var(--f-mono);font-size:12px;color:var(--amber)}
`.trim();

// ── Rich-Text: nur <strong> und <em> durchlassen ─────────────────────────────
function rich(esc, s) {
  return String(s == null ? "" : s)
    .split(/(<\/?(?:strong|em)>)/g)
    .map((teil, i) => (i % 2 ? teil : esc(teil)))
    .join("");
}

// ── Archive-Records-Buecher (Hidden Ending) ──────────────────────────────────
// Aus dem Tab "Hidden Ending" in renderSecrets() (index.html). Kein Datenobjekt in
// der App; hier einmal abgelegt, damit Buchzahl (6) und Log-Zahl (42) gerechnet statt
// getippt werden. Die App nennt dieselben Summen ("6 Archive-Records-Buecher",
// "42 nummerierte Knowledge Logs").
const ARCHIVE_BUECHER = [
  ["I", [1, 2, 3, 4, 5, 7, 8, 16]],
  ["II", [17, 18, 19, 25, 26, 35, 36, 38]],
  ["III", [39, 45, 46, 47, 48, 53, 54, 59]],
  ["IV", [60, 61, 62, 66, 67, 71, 72, 77]],
  ["V", [78, 82, 83, 89, 90, 98, 99]],
  ["VI", [100, 106, 107]],
];

function daten(ctx) {
  const x = ctx.helpers.extract;
  return {
    eier: x("SECRETS_EASTER_EGGS"),
    orte: x("SECRETS_LOCATIONS"),
    mech: x("SECRETS_MECHANICS"),
    waffen: x("SECRETS_HIDDEN_WEAPONS"),
    crReg: x("SECRETS_CRESSET_REGIONS"),
    tools: x("SECRETS_TOOLS"),
    frReg: x("FRAGMENT_REGIONS"),
    crCap: x("CRESSET_REGIONS"),
    weaponImgs: x("WEAPON_IMGS"),
  };
}

export function COUNT_CHECK(ctx) {
  const d = daten(ctx);
  return {
    regex: /<(?:article class="card"|tr) id="geh-/g,
    expected: d.eier.length + d.orte.length + d.mech.length + d.waffen.length
      + d.crReg.length + d.tools.length + d.frReg.length,
    label: "Geheimnis-Karten und -Zeilen",
  };
}

export function ZAHLEN(ctx) {
  const d = daten(ctx);
  const caps = d.crCap.map((r) => r.cap);
  return {
    easteregg: d.eier.length,
    orte: d.orte.length,
    mechaniken: d.mech.length,
    geheimwaffen: d.waffen.length,
    tools: d.tools.length,
    cressets: d.crCap.reduce((s, r) => s + r.cap, 0),
    cressetregionen: d.crCap.length,
    cressetmax: Math.max(...caps),
    cressetmin: Math.min(...caps),
    fragmente: d.frReg.reduce((s, r) => s + r.cap, 0),
    fragmentregionen: d.frReg.length,
    buecher: ARCHIVE_BUECHER.length,
    logs: ARCHIVE_BUECHER.reduce((s, [, l]) => s + l.length, 0),
  };
}

// ── Bild-Header (PNG/WebP/JPEG) fuer width/height lokaler Bilder ─────────────
function bildMasse(rel) {
  try {
    const buf = fs.readFileSync(new URL("../../" + rel, import.meta.url));
    if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
    if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
      const f = buf.toString("ascii", 12, 16);
      if (f === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
      if (f === "VP8L") {
        const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
        return { w: 1 + (((b1 & 0x3f) << 8) | b0), h: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)) };
      }
      if (f === "VP8X") return { w: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)), h: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)) };
    }
  } catch { /* fehlt: kein Bild */ }
  return null;
}

// ── Bausteine ────────────────────────────────────────────────────────────────
function karteMitIcon(praefix, e, ctx, { ref, reward }) {
  const { esc, has, slug } = ctx.helpers;
  return `<article class="card" id="geh-${praefix}-${slug(e.name)}">
<h3>${has(e.ico) ? esc(e.ico) + " " : ""}${esc(e.name)}</h3>
${ref && has(e.ref) ? `<ul class="stats"><li><b>Ort:</b> ${rich(esc, e.ref)}</li></ul>` : ""}
<p class="geh-body">${rich(esc, e.body)}</p>
${reward && has(e.reward) ? `<p class="geh-reward"><b>🎁 Belohnung:</b> ${rich(esc, e.reward)}</p>` : ""}
</article>`;
}

function waffenKarte(w, ctx, d) {
  const { esc, has, imgSrc, slug } = ctx.helpers;
  const rel = d.weaponImgs[w.name];
  const m = rel ? bildMasse(rel) : null;
  const img = rel && m
    ? `<img class="geh-wimg" loading="lazy" src="${esc(imgSrc(rel))}" alt="${esc(w.name)}, Hidden Weapon in Crimson Desert" width="${m.w}" height="${m.h}">`
    : "";
  const stats = [];
  stats.push(["ATK", `${w.atk} (Refinement +10)`]);
  if (has(w.extra)) stats.push(["Ausstattung", w.extra]);
  if (has(w.loc)) stats.push(["Fundort", w.loc]);
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${rich(esc, v)}</li>`).join("");
  return `<article class="card" id="geh-waffe-${slug(w.name)}">
${img}
<h3>⚔️ ${esc(w.name)}</h3>
<ul class="stats">${statsHtml}</ul>
${has(w.difficulty) ? `<p class="geh-reward"><b>💡 Tipp:</b> ${rich(esc, w.difficulty)}</p>` : ""}
</article>`;
}

const tr = (id, cells) => `<tr id="${id}">${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
const tabelle = (kopf, zeilen) => `<div class="tbl-wrap"><table>
<thead><tr>${kopf.map((k) => `<th>${k}</th>`).join("")}</tr></thead>
<tbody>
${zeilen.join("\n")}
</tbody>
</table></div>`;

export function build(ctx) {
  const { esc, has, slug, breadcrumbLd } = ctx.helpers;
  const d = daten(ctx);
  const z = ZAHLEN(ctx);

  // ── Hidden Ending: Text aus dem Tab "Hidden Ending" der App ──
  const buchZeilen = ARCHIVE_BUECHER.map(([vol, logs]) =>
    `<li><b>Vol ${vol}:</b> ${logs.length} Logs (Nr. ${logs.join(", ")})</li>`).join("");
  const ending = `<h2>🌑 Hidden Ending: Run 108</h2>
<p class="geh-spoiler"><b>Spoiler-Warnung:</b> Diese Seite enthält Hidden-Ending-Lore, Fundorte von Memory Fragments und Auflösungen zur Story. Wer sich überraschen lassen will, überspringt die Abschnitte, die zum eigenen Fortschritt nicht passen.</p>
<p class="geh-text">Die ${z.buecher} <em>Archive Records</em> im Axiom Archive (Verfasser ungenannt) enthalten nummerierte Einträge bis #107: Nach einem Zeitsprung suchen die Abyss-Wächter um White Crow und Alustin einen Helden gegen Umbra, finden Kliff und verändern über viele Anläufe seine Wege, ohne Erfolg. Laut Eintrag #72 scheint Caliburn eine Inkarnation Umbras zu sein; laut #2 und #18 ist Hexe Marie der von Umbra verschlungene, abgespaltene Teil des White Crow und von Kliff besessen. <em>Deutung der Guides:</em> Der gespielte Durchlauf ist Versuch Nr. 108, Eintrag #107 nennt den nächsten Versuch die letzte Chance. Laut consolepulse ist das kein alternatives Ende, sondern eine Lore-Ebene zum regulären Ende.</p>
<h3 class="geh-h">Voraussetzungen</h3>
<p class="geh-text">Freischaltbar erst <b>nach vollständigem Story-Abschluss</b>:</p>
<ul class="geh-list">
<li>Prolog, alle 12 Kapitel und der Epilog (nach Kapitel XII)</li>
<li>Alle 40 Abyss-Challenges, einschließlich <em>Dimensional Bonds</em> (Kapitel XII)</li>
<li>Nicht erforderlich: die 4 Eternal-Corridor-Puzzles, sie gehören zur optionalen Questreihe um Marni</li>
</ul>
<h3 class="geh-h">Schritt für Schritt</h3>
<ol class="geh-list">
<li>Per Nexus-Teleport zum <b>Axiom Archive</b> (eigener Abyss Nexus, laut VULKK und consolepulse im Path of Providence). Es ist schon in Kapitel 1 freigeschaltet (Quest „Polar Opposites“).</li>
<li>In die <b>Library</b> eintreten. Laut VULKK sind Spirit Skills hier blockiert (kein Aerial Force Palm).</li>
<li><b>Axiom Force</b> nutzen, um den <b>3. Stock</b> zu erreichen.</li>
<li>Auf den Bücherregalen liegen die ${z.buecher} Archive-Records-Bücher, alle aufnehmen.</li>
<li>Jede Seite (links und rechts) scannen: Die Bücher enthalten zusammen <b>${z.logs} nummerierte Knowledge Logs</b>.</li>
</ol>
<h3 class="geh-h">Die ${z.buecher} Archive-Records-Bücher</h3>
<ul class="geh-list">${buchZeilen}</ul>
<h3 class="geh-h">Die „107“-Markierungen in der Welt</h3>
<p class="geh-text">Laut VULKK (Einzelquelle) gibt es zwei versteckte „107“-Markierungen: im Axiom Archive an der Rückwand neben dem Teleporter gegenüber dem Eingang und in Goyens Höhle (Nest of Valor) rechts der Arena, die steinerne Treppe hoch. Dort musst du über dem Bett mit der Laterne leuchten, dann werden 107 Striche sichtbar; mit Blinding Flash geht es auch, bei Tageslicht ist das Zählen schwerer. <em>Fan-Deutung:</em> Goyen ist Kliff aus einem früheren Durchlauf und hat die Wiederholungen mitgezählt.</p>
<p class="note">Quellen: Archive Records Vol. I bis VI und Archive Entries #1 bis #107 nach questlog.gg, Voraussetzungen und Run-108-Deutung nach consolepulse.com, Freischaltweg nach VULKK (Stand der App: geprüft 04.10.2026).</p>`;

  // ── Memory Fragments ──
  const frZeilen = d.frReg.map((r) => tr(`geh-fragment-${slug(r.name)}`,
    [`<b>${esc(r.name)}</b>`, String(r.cap), esc(r.note)]));
  const fragmente = `<h2>📜 Memory Fragments (${d.frReg.length} Regionen)</h2>
<p class="geh-text">Memory Fragments sind keine Pickup-Items, sondern ortsgebundene Knowledge-Events: Du entdeckst sie mit der Laterne und spielst sie mit der Visione ab. Die interaktive Karte von crimsondesert.th.gl verzeichnet ${z.fragmente} Memory Fragments (Stand 07.04.2026). Patch 2.00.00 hat laut offiziellen Notes weitere Erinnerungsfragmente hinzugefügt (ohne Anzahl); eine belegte aktuelle Gesamtzahl gibt es nicht. Andere Zählweisen kommen auf 214 (Fortschrittsanzeige im Knowledge-Menü) und 327 (consolepulse, Einzelquelle); diese Zahlen stammen aus unterschiedlichen Zählweisen und Zeitpunkten und werden hier nicht gegeneinander entschieden.</p>
${tabelle(["Region", "Fragmente (Schätzung)", "Beispielorte"], frZeilen)}
<p class="note">Die Verteilung auf die Regionen ist eine Schätzung auf Basis der Skill-Daten und Community-Karten.</p>
<h3 class="geh-h">Visione freischalten und Fragmente finden</h3>
<ul class="geh-list">
<li><b>Visione:</b> Hauptstory, Kapitel 2, Quest „Where the Light Leads“ / „Unexpected Gift“, auf der Spitze des Lioncrest Watchtower in Hernand. Sie wird in mehreren späteren Quests verlangt.</li>
<li>Seit Patch 1.00.03 wird die Visione laut den offiziellen Patch Notes nach dem Lesen eines Memory Fragments mit der Laterne automatisch ausgerüstet und abgespielt.</li>
<li>Außerhalb des Kampfes die <b>Laterne</b> raushalten: In der Nähe eines Fragments pulsiert sie blau und zeigt Geister-Hologramme.</li>
<li>Stillhalten, bis die Leiste „Learning in Progress“ oben links voll ist. Danach ist das Fragment im Visione-Katalog abspielbar.</li>
<li>Abspielen am schnellsten aus dem Inventar: Visione hovern, Use halten, Memory wählen.</li>
</ul>`;

  // ── Cressets ──
  const crZeilen = d.crReg.map((r) => {
    const cap = d.crCap.find((c) => r.name.startsWith(c.name));
    return tr(`geh-cresset-${slug(r.name)}`,
      [`<b>${esc(r.name)}</b>`, cap ? String(cap.cap) : "–", esc(r.info)]);
  });
  const cressets = `<h2>🔥 Abyss Cressets (${d.crReg.length} Regionen)</h2>
<p class="geh-text"><b>${z.cressets}</b> verborgene Abyss-Brazier in Klippen, Höhlen, Felsspitzen und hinter Treibsand-Feldern, verteilt über alle ${z.cressetregionen} Regionen. Die Zählung je Region folgt der game8-Liste der Secret Places.</p>
<h3 class="geh-h">Belohnung pro Cresset</h3>
<ul class="geh-list">
<li><b>1 Abyss Artifact</b> pro entdecktem Cresset, die Lernwährung für Fähigkeiten (seit 2.00.00 erhalten die anderen Charaktere beim Einsatz gleich viele Abyss-Verknüpfungen)</li>
<li><b>Fast-Travel-Point</b> an jeder Location</li>
<li>Trophäe <b>„Pilgrim of Wonders“</b> bei allen ${z.cressets} (alle Secret-Places-Herausforderungen, jede wird durch das Finden eines Abyss Cresset abgeschlossen)</li>
</ul>
<h3 class="geh-h">Verteilung nach Region</h3>
${tabelle(["Region", "Cressets", "Details"], crZeilen)}
<h3 class="geh-h">Skills für schwer erreichbare Cressets</h3>
<ul class="geh-list">
<li>Aerial Force Palm: Vertikal-Boost</li>
<li>Flight (Crow's Wing): Gleiten, Horizontal-Reach</li>
<li>Aerial Force Palm mehrfach in der Luft einsetzen (laut PowerPyx dreimal; nach kurzem Stillstand erneut, nicht sofort hintereinander): höchste Peaks</li>
</ul>
<p class="note">Workaround vor dem Skill-Unlock: Precision Jumping, siehe Abschnitt „Versteckte Mechaniken“.</p>`;

  const eier = `<h2>🥚 Easter Eggs (${d.eier.length})</h2>
<p class="note">Pop-Culture-Anspielungen. Quellen laut App: dropreference.com, allthings.how, thegameswiki.com, giga.de (Drachensturz-Schlucht), questlog.gg (Salvatore, Gold Bar).</p>
<div class="grid">${d.eier.map((e) => karteMitIcon("ei", e, ctx, { ref: true, reward: true })).join("\n")}</div>`;

  const orte = `<h2>📍 Hidden Locations (${d.orte.length})</h2>
<div class="grid">${d.orte.map((e) => karteMitIcon("ort", e, ctx, { ref: true, reward: true })).join("\n")}</div>`;

  const waffen = `<h2>⚔️ Hidden Weapons (${d.waffen.length})</h2>
<p class="geh-text">Drei leicht zu übersehende Waffen. Hollow Visage und Survivor's Solitude liegen in Truhen in Höhlen hinter Wasserfällen; die Vessel of Dark Pursuit trägt der Boss Antumbra's Sword im Sanctum of Absolution.</p>
<div class="grid">${d.waffen.map((w) => waffenKarte(w, ctx, d)).join("\n")}</div>
<p class="strat"><b>Wasserfall-Caves allgemein:</b> 43 Waterside Caves im Spiel, alle hinter Wasserfällen. Eintritt: auf eine Stein-Plattform stellen und mit einem Stab-Attack durch den Wasservorhang. Jede enthält eine Treasure Chest.</p>`;

  const mech = `<h2>🔧 Versteckte Mechaniken (${d.mech.length})</h2>
<div class="grid">${d.mech.map((e) => karteMitIcon("mech", e, ctx, { ref: false, reward: true })).join("\n")}</div>`;

  const toolZeilen = d.tools.map((t) => tr(`geh-tool-${slug(t.tool)}`,
    [`<b>${esc(t.tool)}</b>`, `<code class="geh-code">${esc(t.input)}</code>`, rich(esc, t.effect)]));
  const tools = `<h2>🔎 Such-Tools (${d.tools.length})</h2>
${tabelle(["Tool", "Eingabe", "Wirkung"], toolZeilen)}
<p class="strat"><b>Reflex:</b> An jeder neuen erhöhten Vista und an jedem neuen Zone-Eingang beide aktivieren, Laterne und Guiding Light. Das spart Stunden.</p>`;

  const prio = `<h2>⚡ Was zuerst freischalten?</h2>
<p class="geh-text">Reihenfolge für effizientes Secret-Hunting:</p>
<ol class="geh-list">
<li><b>Visione</b> (Kapitel 2, Hernand): Pflicht für Memory Fragments</li>
<li><b>Dark Fog Lantern</b> (Alfonso-Quest, Hernand): Mehrzweck-Secret-Scanner</li>
<li>Force Palm und Aerial Force Palm: für Abyss Cressets</li>
<li><b>Flight</b> (Kapitel 1, Quest „Woman in White“: White Crow verleiht die Flugfähigkeit): Horizontal-Reach für Cressets</li>
<li><b>Axiom Force</b>: der 3. Stock des Axiom Archive enthält die Hidden-Ending-Bücher</li>
<li>Alle Hauptquests und 40 Abyss-Challenges: <b>Hidden Ending</b></li>
</ol>`;

  const body = `
<a class="cta" href="${DEEPLINK}">Secrets &amp; Lore in der App öffnen &rarr;</a>
<p class="note">Die App enthält zusätzlich eine Story-Timeline mit maximalen Spoilern sowie Tracker für Memory Fragments und Abyss Cressets, die deinen Fortschritt speichern.</p>
<p class="note">Die Trophäe „Pilgrim of Wonders“ und weitere Sammelziele stehen in den <a href="/trophaeen">Trophäen</a>, Rätsel und Strongboxes auf der Seite <a href="/raetsel">Rätsel</a>, die Rätsel der Abyss-Grenzsteine unter <a href="/ruinen">Uralte Ruinen</a>.</p>
${ending}
${fragmente}
${cressets}
${eier}
${orte}
${waffen}
${mech}
${tools}
${prio}`;

  const listeNamen = [...d.eier, ...d.orte, ...d.waffen, ...d.mech].map((e) => e.name);
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Secrets & Lore", SLUG),
      {
        "@type": "ItemList",
        name: "Geheimnisse, Easter Eggs und versteckte Inhalte in Crimson Desert",
        numberOfItems: listeNamen.length,
        itemListElement: listeNamen.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Crimson Desert Secrets: ${z.cressets} Cressets, Easter Eggs & Lore`,
    desc: `Geheimnisse in Crimson Desert: ${z.cressets} Abyss Cressets, ${z.fragmente} Memory Fragments laut Karte, ${z.easteregg} Easter Eggs, ${z.geheimwaffen} Hidden Weapons und das Hidden Ending (Run 108). Deutsch.`,
    h1: `Secrets & Lore in Crimson Desert: Cressets, Easter Eggs & Hidden Ending`,
    lead: `Alles Versteckte auf einer Seite: <strong>${z.cressets} Abyss Cressets</strong> in ${z.cressetregionen} Regionen, <strong>${z.fragmente} Memory Fragments</strong> laut Karte in ${z.fragmentregionen} Gebieten, ${z.easteregg} Easter Eggs, ${z.orte} Hidden Locations, ${z.geheimwaffen} Hidden Weapons, ${z.mechaniken} versteckte Mechaniken, ${z.tools} Such-Tools und die Lore zum Hidden Ending (Run 108).`,
    ogImage: null,
    crumb: "Secrets & Lore",
    bodyHtml: body,
    jsonld,
  };
}

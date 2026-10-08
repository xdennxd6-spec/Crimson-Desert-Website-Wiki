// parts/npcs.mjs — SEO-Seite "NPCs".
//
// Datenquelle ist NPCS: ein OBJEKT mit genau 4 Gruppen (kein Array) — companions
// (3), allies (14), antagonists (7), merchants (16), Summe 40 (Stand 04.10.2026,
// Block 5). Jeder NPC traegt { name, role, region, conf, bio }; "region" ist
// inzwischen bei allen Eintraegen belegt, die Region-Zeile faellt bei fehlendem
// Wert trotzdem weiterhin komplett weg statt "null" oder "-" zu zeigen. "conf"
// ist bei 34 NPCs "high" und bei 6 "medium" (Kathor, Temir, Quentin, Leore,
// Ronan, Brek); nur "medium" kommt in den Daten vor, kein "low" — dafuer wird
// deshalb bewusst keine Fallunterscheidung erfunden. Die bio-Texte sind der
// eigentliche Inhalt dieser Seite (echter Lore-Text), darum eine bildlastige
// Karten-Seite nach dem Vorbild von bestiarium.mjs, keine duenne Tabelle.
//
// Stand 04.10.2026 (Block 6): alle 40 NPCs haben ein lokales Bild in NPC_IMGS
// (39x cd_assets/npcs/*.webp bzw. marius.png, 1x cd_assets/bosses/lucian_bastier.webp fuer den
// bereits als Boss gefuehrten Lucian Bastier). Die 11 in Block 6 nachgelieferten Portraets
// (Naira, Stefan Lanford, Drake Wells, Kathor bis Brek) sind 512x512; marius.png ist 250x250
// (Bild-Header ausgelesen wie dimsFromBuffer() in scripts/gen-seo.mjs). Alle Bilder sind
// quadratisch -- es gibt nur EINE Ausnahme von der 512x512-Norm, siehe IMG_250 unten.
//
// NPC_PAL ist nach GRUPPE geschluesselt (nicht nach NPC-Name), Form
// [gradient, borderColor, accentColor] — identisch zur Fraktionsfarbe, mit der
// die App fehlende NPC-Portraets einfaerbt (siehe npcPH() in index.html). Fehlende
// Bilder bleiben hier leer (siehe oben); die Seite uebernimmt die Palette aber als leises
// Gruppen-Branding: Kartenrahmen und Namens-Farbe je Gruppe. Bewusst als
// INLINE-STYLE aus ctx.data.NPC_PAL erzeugt statt als vier feste CSS-Klassen mit
// abgeschriebenen Hex-/RGBA-Werten — sonst haette die Seite die Palette ein
// zweites Mal hart im Modul stehen und wuerde bei einer Aenderung an NPC_PAL
// still auseinanderlaufen. cssRules() in gen-seo.mjs zerlegt EXTRA_CSS nur
// regelweise; inline-style-Attribute laufen an dieser Zerlegung komplett vorbei
// und sind hier deshalb der richtige statt nur der bequeme Weg.
//
// GROUPS (Icon, Ueberschrift, Unterzeile je Gruppe) sind woertlich aus
// renderNpcs() in index.html uebernommen (Single Source of Truth), damit die
// Beschriftung zwischen App und SEO-Seite nicht auseinanderlaeuft.
//
// ctx = { data: {...}, helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE } }

export const SLUG = "npcs";
export const NAV_LABEL = "Charaktere & NPCs";
export const DEEPLINK = "/#sec-npcs";
export const SITEMAP = { pri: "0.8", freq: "monthly" };

// Portraet-Grossformat statt Thumbnail (anders als ARMOR_IMGS/WEAPON_IMGS in
// ruestungen.mjs/gen-seo.mjs): eigene Klasse, weil article.card img
// standardmaessig auf 16:9 + object-fit:cover eingestellt ist (SHARED_CSS) und
// quadratische Portraets darin beschnitten wuerden. object-fit:contain statt
// cover als Sicherheitsnetz, falls ein spaeter ergaenztes Portraet doch nicht
// exakt quadratisch ist (gleiche Vorsichtsmassnahme wie img.enemy in
// bestiarium.mjs). Eigene Klasse "bio" fuer den Fliesstext, damit die Seite
// nicht auf eine bereits andernorts (bestiarium.mjs) definierte Regel
// angewiesen ist, wenn dieses Modul einmal ohne die anderen laeuft.
export const EXTRA_CSS = `
article.card img.npc{aspect-ratio:1/1;object-fit:contain}
p.bio{margin:4px 0 0;font-size:13.5px;color:var(--ink-dim)}
`.trim();

// Der Vollstaendigkeitstest: eine <article>-Karte pro NPC, ueber alle 4 Gruppen
// hinweg muss das die Summe aller NPCS[key].length ergeben. Keine Huelle um
// mehrere NPCs (die teuerste Falle laut Projektregeln) — jede Karte ist ein
// eigenstaendiges <article>, direktes Kind von .grid.
export function COUNT_CHECK(ctx) {
  const { NPCS } = ctx.data;
  const expected = GROUPS.reduce((sum, [key]) => sum + NPCS[key].length, 0);
  return {
    regex: /<article class="card" id="npc-/g,
    expected,
    label: "NPC-Karten",
  };
}

// Exakt woertlich aus GROUPS in renderNpcs() (index.html) uebernommen: Reihenfolge,
// Icon, Ueberschrift und Unterzeile je Gruppe. [key, icon, label, sub].
const GROUPS = [
  ["companions", "🛡️", "Begleiter & spielbare Charaktere",
    "Der Protagonist und die im Story-Verlauf spielbaren Gefährten."],
  ["allies", "🤝", "Verbündete & Quest-Geber",
    "Wichtige freundliche NPCs, die Kliff unterstützen oder Aufträge vergeben."],
  ["antagonists", "⚔️", "Antagonisten",
    "Gegenspieler und Fraktionsanführer — viele davon sind Bosse (Kampf-Details auf der Seite Bosse)."],
  ["merchants", "💰", "Händler",
    "Benannte Verkäufer in Hernand, im Greymane-Lager und in weiteren Regionen; außerhalb Hernands ist der genaue Standort teils nur auf Regionsebene belegt."],
];

// Einzige gemessene Abweichung von der 512x512-Norm (26.08.2026, Bild-Header
// ausgelesen). Alle anderen NPC_IMGS-Eintraege sind 512x512.
const IMG_250 = new Set(["Marius"]);

function npcCard(n, key, ctx) {
  const { NPC_IMGS, NPC_PAL } = ctx.data;
  const { esc, has, imgSrc, slug } = ctx.helpers;

  const img = NPC_IMGS[n.name];
  const side = IMG_250.has(n.name) ? 250 : 512;
  const imgTag = img
    ? `<img loading="lazy" src="${esc(imgSrc(img))}" alt="${esc(n.name)}, NPC in Crimson Desert" width="${side}" height="${side}" class="npc">`
    : "";

  // Gruppenfarbe als Kartenrahmen + Namensfarbe. Fallback identisch zum
  // Platzhalter-Fallback von npcPH() in index.html, falls eine Gruppe einmal
  // ohne Eintrag in NPC_PAL daherkommt.
  const [bg, bdr, col] = NPC_PAL[key]
    || ["linear-gradient(135deg,#1a1010,#0e0d0d)", "rgba(255,255,255,.06)", "rgba(201,162,39,.5)"];

  const stats = [];
  if (has(n.role)) stats.push(["Rolle", n.role]);
  if (has(n.region)) stats.push(["Region", n.region]);
  // Nur "medium" kommt in den Daten vor (siehe Kommentarkopf) — keine erfundene
  // Fallunterscheidung fuer eine Quellenlage-Stufe, die es hier nicht gibt.
  if (n.conf === "medium") {
    stats.push(["Quellenlage", "unbestätigt, Details teils nur durch eine Quelle belegt"]);
  }
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("");

  const bio = has(n.bio) ? `<p class="bio">${esc(n.bio)}</p>` : "";

  return `<article class="card" id="npc-${slug(n.name)}" style="border-color:${esc(bdr)};background:${esc(bg)}">
${imgTag}
<h3 style="color:${esc(col)}">${esc(n.name)}</h3>
<ul class="stats">${statsHtml}</ul>
${bio}
</article>`;
}

// Datenmengen, die die redaktionellen Texte in scripts/seo-content/ per
// Platzhalter einsetzen ({{name}} = Ziffer, {{name|wort}} = ausgeschrieben).
// Einzige Quelle fuer diese Zahlen ist die Datenstruktur selbst — nie ein
// fest verdrahteter Wert im Text. Siehe zahlenEinsetzen() in gen-seo.mjs.
export function ZAHLEN(ctx) {
  const { NPCS } = ctx.data;
  const { has } = ctx.helpers;
  const alle = GROUPS.flatMap(([key]) => NPCS[key]);
  return {
    anzahl: alle.length,
    begleiter: NPCS.companions.length,
    verbuendete: NPCS.allies.length,
    antagonisten: NPCS.antagonists.length,
    haendler: NPCS.merchants.length,
    ohneregion: alle.filter((n) => !has(n.region)).length,
    mitregion: alle.filter((n) => has(n.region)).length,
    teilsbelegt: alle.filter((n) => n.conf === "medium").length,
  };
}

export function build(ctx) {
  const { NPCS } = ctx.data;
  const { esc, has, breadcrumbLd } = ctx.helpers;
  const z = ZAHLEN(ctx);

  const sections = GROUPS.map(([key, icon, label, sub]) => {
    const items = NPCS[key];
    const cards = items.map((n) => npcCard(n, key, ctx)).join("\n");
    return `<h2>${icon} ${esc(label)} (${items.length})</h2>
<p class="note">${esc(sub)}</p>
<div class="grid">${cards}</div>`;
  }).join("\n");

  // Namen dynamisch aus den Daten filtern statt hart aufzuzaehlen — sonst
  // veraltet dieser Satz still, sobald ein NPC nachtraeglich eine Region
  // bekommt oder ein neuer NPC ohne Region dazukommt.
  const ohneRegionNamen = GROUPS.flatMap(([key]) => NPCS[key])
    .filter((n) => !has(n.region))
    .map((n) => esc(n.name))
    .join(", ");

  const body = `
<a class="cta" href="${DEEPLINK}">Interaktive NPC-Übersicht mit Trust-System öffnen &rarr;</a>
<p class="note">In der App findest du zusätzlich das Trust-System: wie du bei jedem NPC Vertrauen aufbaust und welche Belohnungen es bei maximalem Trust gibt.</p>
<p class="strat"><b>Zur Datenlage:</b> ${z.ohneregion > 0 ? `Bei ${z.ohneregion} der ${z.anzahl} NPCs (${ohneRegionNamen}) ist im Datenbestand kein fester Aufenthaltsort hinterlegt — die Region-Zeile fehlt dort bewusst, statt einen Ort zu raten.` : `Bei allen ${z.anzahl} NPCs ist eine Region hinterlegt; wo die Quellen nur die Region und nicht den genauen Standort belegen, steht bewusst nur diese.`} Bei ${z.teilsbelegt} NPCs gilt die Quellenlage als dünn (nur eine Quelle bestätigt die Angaben); das steht direkt auf der jeweiligen Karte.</p>
<p class="note">Mehrere Antagonisten sind zugleich Bosse mit eigener Kampfmechanik — Details dazu in der <a href="/bosse">Bossliste</a>. Wer stattdessen wilde und feindliche Kreaturen sucht, findet sie unter <a href="/bestiarium">Gegner</a>.</p>
${sections}`;

  const allNames = GROUPS.flatMap(([key]) => NPCS[key].map((n) => n.name));

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Charaktere & NPCs", SLUG),
      {
        "@type": "ItemList",
        name: "Wichtige NPCs in Crimson Desert",
        numberOfItems: z.anzahl,
        itemListElement: allNames.map((name, i) => ({
          "@type": "ListItem", position: i + 1, name,
        })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `${z.anzahl} wichtige NPCs in Crimson Desert: Begleiter & Händler`,
    desc: `${z.anzahl} wichtige NPCs in Crimson Desert im Überblick: ${z.begleiter} Begleiter, ${z.verbuendete} Verbündete, ${z.antagonisten} Antagonisten und ${z.haendler} Händler mit Rolle, Region und ausführlicher Bio. Deutsch.`,
    h1: `${z.anzahl} wichtige NPCs in Crimson Desert`,
    lead: `Diese Übersicht listet <strong>${z.anzahl} wichtige benannte NPCs</strong> aus Crimson Desert: ${z.begleiter} spielbare Begleiter, ${z.verbuendete} Verbündete &amp; Quest-Geber, ${z.antagonisten} Antagonisten und ${z.haendler} Händler, jeweils mit Rolle, Region und ausführlicher Bio.`,
    ogImage: "cd_assets/npcs/kliff.webp",
    crumb: "Charaktere & NPCs",
    bodyHtml: body,
    jsonld,
  };
}

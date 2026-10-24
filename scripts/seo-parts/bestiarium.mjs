// SEO-Seitenmodul: Bestiarium (ENEMIES.wild + ENEMIES.kreaturen + ENEMIES.fraktionen)
//
// ENEMIES ist ein OBJEKT mit genau 3 Gruppen (kein Array): wild (14), kreaturen (13),
// fraktionen (27) — Summe 54 (Stand 04.10.2026). "de" (deutscher Name) existiert nur bei wild/kreaturen,
// die Gruppe "fraktionen" hat kein de-Feld. "tipp" ist selten (2x wild, 2x kreaturen,
// 1x fraktionen). "conf" (Quellen-Konfidenz) kommt 3x in kreaturen vor (Monitor Lizard,
// Crocodile, Hostile Machines) und wird bei conf==="medium" sichtbar als Quellenlage-Hinweis
// ausgegeben (Pflicht-Verifikationsregel des Repos: Unsicherheit als conf-Flag markieren statt
// raten). Sichtbare Felder: Bild, Name/de, Region, Drops, Quellenlage (nur conf==="medium"),
// note und tipp. "—" (Em-Dash) ist bei zwei Eintraegen (Ogre, Flame Knights) ein Platzhalter
// fuer "kein Drop" in ENEMIES.*.drops und wird wie in der App (renderBestiary) herausgefiltert,
// statt als sichtbarer Gedankenstrich zu rendern (Regel 9).
// Die Bilder in ENEMY_IMGS lagen bis 24.10.2026 auf dem questlog.gg-CDN; seitdem lokal unter cd_assets/ql/.

export const SLUG = "bestiarium";
export const NAV_LABEL = "Gegner";
export const DEEPLINK = "/#sec-bestiary";
export const SITEMAP = { pri: "0.8", freq: "monthly" };

// Enemy-Portraits vom questlog-CDN sind durchgehend als Portrait-/Knowledge-Icons quadratisch
// zugeschnitten, anders als die 16:9-Bosskunst. Das Seitenverhaeltnis der Kartenbilder auf dieser
// Seite wird deshalb auf 1:1 fixiert, damit ein nur geschaetzter width/height-Wert kein
// Layout-Springen verursacht (Regel 3).
//
// WICHTIG, eigene Klasse "enemy" statt der vorhandenen "sq":
// EXTRA_CSS wird an SHARED_CSS angehaengt und gilt damit auf ALLEN SEO-Seiten, auch auf der
// bereits live stehenden bosse.html. Dort hat "article.card img.sq" die feste Aufgabe, quadratische
// Boss-Assets im 16:9-Container per object-fit:contain zu letterboxen (siehe Kommentar in
// scripts/gen-seo.mjs ueber dimsFromBuffer). Wuerde diese Seite ".sq" mit aspect-ratio:1/1
// ueberschreiben, wuerden die Boss-Karten global quadratisch. Deshalb eine eigene Klasse, die
// object-fit:contain selbst mitbringt, weil sie die .sq-Regel nicht mehr erbt.
//
// article.card p:not([class]) stylt NUR die klassenlose Beschreibungs-<p> (das note-Feld);
// :not([class]) grenzt bewusst gegen <p class="strat"> ab, damit dessen eigene Regel (Hintergrund,
// Rahmen, Abstand) nicht durch eine hoehere Selektor-Spezifitaet ueberschrieben wird.
// Unkritisch fuer die Bestandsseiten: weder bossArticle noch weaponRow erzeugen ein klassenloses
// <p> innerhalb einer article.card.
export const EXTRA_CSS = `
article.card img.enemy{aspect-ratio:1/1;object-fit:contain}
article.card p:not([class]){margin:0;font-size:13.5px;color:var(--ink-dim)}
table.drp{width:100%;border-collapse:collapse;font-size:12.5px;margin:10px 0 4px}
table.drp caption{text-align:left;font-weight:600;font-size:13px;margin-bottom:4px}
table.drp th,table.drp td{text-align:left;padding:3px 6px;border-bottom:1px solid var(--line,rgba(255,255,255,.12));vertical-align:top}
table.drp td:nth-child(2),table.drp td:nth-child(3){white-space:nowrap}
span.drp-bei{color:var(--ink-faint);font-size:11.5px}
p.drp-selten{font-size:12.5px;margin:4px 0 0;color:var(--ink-dim)}
p.drp-q{font-size:11.5px;margin:4px 0 0;color:var(--ink-faint)}
`.trim();

// Reale Bildmasse per CDN-Range-Request gemessen (gleiche Byte-Header-Methode wie
// dimsFromRemote/dimsFromBuffer in scripts/gen-seo.mjs), 2026-07-31 verifiziert (Hyena + 7 Block-5-Bilder am 04.10.2026): alle 54
// ENEMY_IMGS sind quadratisch, aber NICHT einheitlich 512x512 wie bei den BOSS_IMGS-Sprites.
// Die questlog-URLs mit "portraitimage_animal_" bzw. "mercenary_portrait_domestic_animal_"
// im Pfad sind 256x256, alle anderen (knowledgeimage_*/questimage_*) sind 512x512.
const IMG_256 = new Set([
  "Wolf", "Bear", "Deer", "Fox", "Goat", "Sheep", "Cow",
  "Highland Cow", "White-Striped Longhorn",
  "Elephant", "Hedgehog", "Heloderma Lizard", "Hyena",
]);

// "—" (Em-Dash) als reiner Platzhalterwert ohne Aussage, analog zur App-Filterung
// e.drops&&e.drops!=='—' in renderBestiary(). has() allein faengt das nicht ab (nur
// "", "-", "–"), darum zusaetzliche Pruefung fuer alle Kartenfelder mit Freitext-Herkunft.
const isDashOnly = (v) => /^\s*[—–-]\s*$/.test(String(v));

// Reihenfolge + Icon/Label je Gruppe, identisch zu den Emoji aus renderBestiary() in der App.
const GROUPS = [
  ["wild", "🦌", "Wildtiere"],
  ["kreaturen", "🕷️", "Besondere Kreaturen"],
  ["fraktionen", "⚔️", "Gegner-Fraktionen"],
];

export function COUNT_CHECK(ctx) {
  const { ENEMIES } = ctx.data;
  const expected = GROUPS.reduce((sum, [key]) => sum + ENEMIES[key].length, 0);
  return {
    regex: /<article class="card" id="enemy-/g,
    expected,
    label: "Gegner-Karten",
  };
}

function enemyCard(e, ctx) {
  const { ENEMY_IMGS } = ctx.data;
  const { esc, has, imgSrc, slug } = ctx.helpers;

  const img = ENEMY_IMGS[e.name];
  const side = IMG_256.has(e.name) ? 256 : 512;
  const imgTag = img
    ? `<img loading="lazy" src="${esc(imgSrc(img))}" alt="${esc(e.name)} in Crimson Desert" width="${side}" height="${side}" class="enemy">`
    : "";

  // Deutschen Namen nur in Klammern ergaenzen, wenn er sich vom englischen unterscheidet
  // (fraktionen hat ohnehin kein de-Feld, has() faengt das ab).
  const nameHtml = has(e.de) && e.de !== e.name
    ? `${esc(e.name)} (${esc(e.de)})`
    : esc(e.name);

  const stats = [];
  if (has(e.region) && !isDashOnly(e.region)) stats.push(["Region", e.region]);
  if (has(e.drops) && !isDashOnly(e.drops)) stats.push(["Drops", e.drops]);
  if (e.conf === "medium") stats.push(["Quellenlage", "unbestätigt, Details teils nur durch eine Quelle belegt"]);
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("");

  const note = has(e.note) ? `<p>${esc(e.note)}</p>` : "";
  const tipp = has(e.tipp) ? `<p class="strat"><b>Tipp:</b> ${esc(e.tipp)}</p>` : "";

  return `<article class="card" id="enemy-${slug(e.name)}">
${imgTag}
<h3>${nameHtml}</h3>
<ul class="stats">${statsHtml}</ul>
${note}${tipp}${dropTabelle(e, ctx)}
</article>`;
}

// ── Drop-Tabelle mit Wahrscheinlichkeit (seit 24.10.2026) ─────────────────────
// Quelle: ENEMY_DROPS (data/d10-enemy-drops.js), generiert aus den gedataminten
// Droptabellen der questlog.gg-Datenbank. Mehrere NPC-Varianten eines Eintrags
// (Groessen, Regionen, Fraktionsmitglieder) sind zusammengefasst; Chance und Menge
// erscheinen dann als Spanne, und "bei" sagt, wie viele Varianten den Drop haben.
// Eintraege ohne Datensatz bekommen keine Tabelle (nichts geschaetzt).
const HAUPT_MIN = 1;        // ab dieser Chance (%) in die Tabelle, darunter "selten"
const HAUPT_MAX = 14;       // hoechstens so viele Tabellenzeilen
const SELTEN_MAX = 10;      // hoechstens so viele seltene Drops ausgeschrieben
const FUTTER_MAX = 6;
const zahl = (v) => String(v).replace(".", ",");
const spanne = (v, einheit = "") => Array.isArray(v) ? `${zahl(v[0])} bis ${zahl(v[1])}${einheit}` : `${zahl(v)}${einheit}`;
const maxChance = (d) => Array.isArray(d.chance) ? d.chance[1] : d.chance;

function dropTabelle(e, ctx) {
  const { esc } = ctx.helpers;
  const D = (ctx.data.ENEMY_DROPS || {})[e.name];
  if (!D || !D.drops || !D.drops.length) return "";
  const haupt = D.drops.filter((d) => maxChance(d) >= HAUPT_MIN);
  const selten = D.drops.filter((d) => maxChance(d) < HAUPT_MIN);
  const zeilen = haupt.slice(0, HAUPT_MAX).map((d) => {
    const chance = maxChance(d) === 100 && !Array.isArray(d.chance) ? "sicher (100 %)" : spanne(d.chance, " %");
    const bei = d.bei && D.varianten > 1 ? ` <span class="drp-bei">(bei ${Math.min(d.bei, D.varianten)} von ${D.varianten} Varianten)</span>` : "";
    return `<tr><td>${esc(d.item)}${bei}</td><td>${esc(chance)}</td><td>${esc(spanne(d.menge))}</td></tr>`;
  }).join("");
  const rest = haupt.length - HAUPT_MAX;
  const seltenListe = [...haupt.slice(HAUPT_MAX), ...selten];
  const seltenHtml = seltenListe.length
    ? `<p class="drp-selten"><b>${rest > 0 ? "Weitere Drops" : "Selten (unter 1 %)"}:</b> ${seltenListe.slice(0, SELTEN_MAX).map((d) => `${esc(d.item)} (${esc(spanne(d.chance, " %"))})`).join(", ")}${seltenListe.length > SELTEN_MAX ? ` und ${seltenListe.length - SELTEN_MAX} weitere` : ""}</p>`
    : "";
  const quelle = D.varianten > 1
    ? `${D.varianten} NPC-Varianten zusammengefasst (${esc(D.npcs.slice(0, 4).join(", "))}${D.npcs.length > 4 ? " u. a." : ""})`
    : `NPC „${esc(D.npcs[0])}“`;
  const futter = D.futter && D.futter.length
    ? `<p class="drp-selten"><b>Bevorzugt als Futter/Geschenk:</b> ${esc(D.futter.slice(0, FUTTER_MAX).join(", "))}${D.futter.length > FUTTER_MAX ? " u. a." : ""}</p>`
    : "";
  return `
<table class="drp"><caption>Drops laut Spieldaten</caption><thead><tr><th>Beute</th><th>Chance</th><th>Menge</th></tr></thead><tbody>${zeilen}</tbody></table>
${seltenHtml}${futter}<p class="drp-q">Quelle: questlog.gg-Datenbank, ${quelle}. Chance und Menge wie im Datenbankeintrag.</p>`;
}

// Datenmengen, die die redaktionellen Texte in scripts/seo-content/ per
// Platzhalter einsetzen ({{name}} = Ziffer, {{name|wort}} = ausgeschrieben).
// Einzige Quelle fuer diese Zahlen ist die Datenstruktur selbst — nie ein
// fest verdrahteter Wert im Text. Siehe zahlenEinsetzen() in gen-seo.mjs.
export function ZAHLEN(ctx) {
  const { ENEMIES } = ctx.data;
  return {
    anzahl: GROUPS.reduce((sum, [key]) => sum + ENEMIES[key].length, 0),
    wild: ENEMIES.wild.length,
    kreaturen: ENEMIES.kreaturen.length,
    fraktionen: ENEMIES.fraktionen.length,
  };
}

export function build(ctx) {
  const { ENEMIES } = ctx.data;
  const { breadcrumbLd, SITE } = ctx.helpers;

  const total = GROUPS.reduce((sum, [key]) => sum + ENEMIES[key].length, 0);

  const sections = GROUPS.map(([key, icon, label]) => {
    const items = ENEMIES[key];
    const cards = items.map((e) => enemyCard(e, ctx)).join("\n");
    return `<h2>${icon} ${label} (${items.length})</h2>
<div class="grid">${cards}</div>`;
  }).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Interaktive Gegner-Übersicht mit Suche &amp; Filter öffnen &rarr;</a>
<p class="note">In der App durchsuchst du alle Gegner nach Namen, Region oder Beute und filterst nach Wildtieren, Kreaturen oder Fraktionen.</p>
<p class="note">Viele Drops sind Zutaten für Rezepte unter <a href="/crafting">Herstellen &amp; Farmen</a>, Gegner mit eigener Kampfmechanik stehen zusätzlich in der <a href="/bosse">Bossliste</a>.</p>
${sections}`;

  const allNames = GROUPS.flatMap(([key]) => ENEMIES[key].map((e) => e.name));

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Gegner", SLUG),
      {
        "@type": "ItemList",
        name: "Gegnertypen im Bestiarium von Crimson Desert",
        numberOfItems: total,
        itemListElement: allNames.map((name, i) => ({
          "@type": "ListItem", position: i + 1, name,
        })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Bestiarium: ${total} Gegnertypen in Crimson Desert`,
    desc: `Das Bestiarium zu Crimson Desert: ${ENEMIES.wild.length} Wildtiere, ${ENEMIES.kreaturen.length} besondere Kreaturen und ${ENEMIES.fraktionen.length} Gegner-Fraktionen mit Region, Drop-Chancen laut Spieldaten, Lieblingsfutter und Kampf-Tipps.`,
    h1: `${total} Gegnertypen im Bestiarium von Crimson Desert`,
    lead: `Das <strong>Bestiarium</strong> von Crimson Desert verzeichnet <strong>${total} Gegnertypen</strong> der Spielwelt, getrennt von den Bossen: ${ENEMIES.wild.length} Wildtiere, ${ENEMIES.kreaturen.length} besondere Kreaturen und ${ENEMIES.fraktionen.length} Gegner-Fraktionen, jeweils mit Region, Beschreibung und, wo die Spieldaten sie hergeben, einer Drop-Tabelle mit Chance und Menge.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Gegner",
    bodyHtml: body,
    jsonld,
  };
}

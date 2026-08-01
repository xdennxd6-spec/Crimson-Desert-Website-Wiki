// SEO-Seitenmodul: Bestiarium (ENEMIES.wild + ENEMIES.kreaturen + ENEMIES.fraktionen)
//
// ENEMIES ist ein OBJEKT mit genau 3 Gruppen (kein Array): wild (11), kreaturen (10),
// fraktionen (23) — Summe 44. "de" (deutscher Name) existiert nur bei wild/kreaturen,
// die Gruppe "fraktionen" hat kein de-Feld. "tipp" ist selten (2x wild, 2x kreaturen,
// 1x fraktionen). "conf" (Quellen-Konfidenz) kommt 3x in kreaturen vor (Monitor Lizard,
// Crocodile, Hostile Machines) und wird bei conf==="medium" sichtbar als Quellenlage-Hinweis
// ausgegeben (Pflicht-Verifikationsregel des Repos: Unsicherheit als conf-Flag markieren statt
// raten). Sichtbare Felder: Bild, Name/de, Region, Drops, Quellenlage (nur conf==="medium"),
// note und tipp. "—" (Em-Dash) ist bei zwei Eintraegen (Ogre, Flame Knights) ein Platzhalter
// fuer "kein Drop" in ENEMIES.*.drops und wird wie in der App (renderBestiary) herausgefiltert,
// statt als sichtbarer Gedankenstrich zu rendern (Regel 9).
// Alle 44 Bilder in ENEMY_IMGS sind absolute questlog.gg-CDN-URLs, keine lokalen Assets.

export const SLUG = "bestiarium";
export const NAV_LABEL = "Bestiarium";
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
`.trim();

// Reale Bildmasse per CDN-Range-Request gemessen (gleiche Byte-Header-Methode wie
// dimsFromRemote/dimsFromBuffer in scripts/gen-seo.mjs), 2026-07-31 verifiziert: alle 44
// ENEMY_IMGS sind quadratisch, aber NICHT einheitlich 512x512 wie bei den BOSS_IMGS-Sprites.
// Die questlog-URLs mit "portraitimage_animal_" bzw. "mercenary_portrait_domestic_animal_"
// im Pfad sind 256x256, alle anderen (knowledgeimage_*/questimage_*) sind 512x512.
const IMG_256 = new Set([
  "Wolf", "Bear", "Deer", "Fox", "Goat", "Sheep", "Cow",
  "Elephant", "Hedgehog", "Heloderma Lizard",
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
${note}${tipp}
</article>`;
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
<a class="cta" href="${DEEPLINK}">Interaktives Bestiarium mit Suche &amp; Filter öffnen &rarr;</a>
<p class="note">In der App durchsuchst du alle Gegner nach Namen, Region oder Beute und filterst nach Wildtieren, Kreaturen oder Fraktionen.</p>
<p class="note">Viele Drops sind Zutaten für Rezepte im <a href="/crafting">Crafting-Guide</a>, Gegner mit eigener Kampfmechanik stehen zusätzlich in der <a href="/bosse">Bossliste</a>.</p>
${sections}`;

  const allNames = GROUPS.flatMap(([key]) => ENEMIES[key].map((e) => e.name));

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Bestiarium", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Gegner in Crimson Desert",
        numberOfItems: total,
        itemListElement: allNames.map((name, i) => ({
          "@type": "ListItem", position: i + 1, name,
        })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Bestiarium: Alle ${total} Gegner in Crimson Desert`,
    desc: `Das komplette Bestiarium zu Crimson Desert: ${ENEMIES.wild.length} Wildtiere, ${ENEMIES.kreaturen.length} besondere Kreaturen und ${ENEMIES.fraktionen.length} Gegner-Fraktionen mit Region, Beute-Drops und Kampf-Tipps im Überblick.`,
    h1: `Alle ${total} Gegner in Crimson Desert`,
    lead: `Das <strong>Bestiarium</strong> von Crimson Desert verzeichnet alle <strong>${total} Gegner</strong> der Spielwelt: ${ENEMIES.wild.length} Wildtiere, ${ENEMIES.kreaturen.length} besondere Kreaturen und ${ENEMIES.fraktionen.length} humanoide Gegner-Fraktionen, jeweils mit Region, Beute und Beschreibung.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Bestiarium",
    bodyHtml: body,
    jsonld,
  };
}

// parts/raetsel.mjs — SEO-Seite "Rätsel" (Strongboxes und Story-Rätsel).
//
// Datenquelle ist PUZZLES (data/d02-crafting.js): ein flaches Array aus { name, cat,
// detail, loc, miss, conf }. Die App-Sektion sec-puzzles (renderPuzzles() ->
// renderCompendium('puzzles', PUZZLES, ...)) zeigt genau diese Felder in einer
// Tabelle (Name, Kategorie, Detail, Fundort) plus conf/miss als Badge. Die
// Sanktum-Daten (SANCTUM_GUIDE/SANCTUM_DATA) gehoeren NICHT in diese Sektion; sie
// stehen in der App unter "Checklisten" (renderSanctumGuide) und bleiben deshalb
// hier aussen vor, damit die Seite exakt das zeigt, wohin der Deep-Link springt.
//
// Die generischen Ancient-Ruins-Raetsel sind in der App ausdruecklich NICHT Teil
// dieser Sektion (Hinweisbox in index.html); sie stehen auf /ruinen.
//
// Layout: Karten (article.card) je Raetsel, gruppiert nach cat in der Reihenfolge
// des Kategorie-Filters der App (Strongbox, Story / Abyss, Story (Kapitel),
// Faction-Quest). Die Gruppen werden aus den Daten gebildet; eine neue cat taucht
// mit ihrem Rohnamen als eigene Gruppe auf, statt still zu verschwinden.
//
// conf: "high" ist der Regelfall und bleibt ohne Hinweis; alles andere bekommt wie
// in der App (renderCompendium) eine Quellenlage-Zeile. Die Texte sind die
// title-Attribute der App ("Wert teils quellenabhaengig" bzw. "unbestaetigt - im
// Spiel pruefen"). miss ist in den Daten aktuell nie true; die Zeile ist fuer
// spaeter vorbereitet.
//
// ctx = { data, helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE, extract } }

export const SLUG = "raetsel";
export const NAV_LABEL = "Rätsel";
export const DEEPLINK = "/#sec-puzzles";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
p.rae-detail{margin:2px 0 0;font-size:13.5px;color:var(--ink-dim)}
p.rae-sub{margin:4px 0 0;font-family:var(--f-mono);font-size:var(--fs-11-5);color:var(--ink-faint)}
`.trim();

// [Icon, Ueberschrift, Unterzeile] je cat. Unterzeilen nur dort, wo die App-Sektion
// (Einleitungstext in index.html, sec-puzzles) eine Aussage dazu macht.
const GRUPPEN = {
  "Strongbox": ["📦", "Strongboxes",
    "Verschlossene Truhen mit fester Lösung."],
  "Story / Abyss": ["🌀", "Story-Rätsel im Abyss",
    "Story-Rätsel im Abyss, die meist mit Axiom Force und Force Palm gelöst werden."],
  "Story (Kapitel)": ["📖", "Story-Rätsel in den Kapiteln", ""],
  "Faction-Quest": ["⚔️", "Rätsel in Fraktions-Quests", ""],
};

function gruppen(ctx) {
  const PUZZLES = ctx.helpers.extract("PUZZLES");
  const reihenfolge = [];
  for (const p of PUZZLES) if (!reihenfolge.includes(p.cat)) reihenfolge.push(p.cat);
  // bekannte Kategorien in App-Reihenfolge zuerst, unbekannte dahinter
  const bekannt = Object.keys(GRUPPEN).filter((c) => reihenfolge.includes(c));
  const rest = reihenfolge.filter((c) => !(c in GRUPPEN));
  return [...bekannt, ...rest].map((cat) => ({
    cat,
    icon: (GRUPPEN[cat] || ["🧩"])[0],
    label: (GRUPPEN[cat] || [null, cat])[1],
    sub: (GRUPPEN[cat] || [null, null, ""])[2],
    items: PUZZLES.filter((p) => p.cat === cat),
  }));
}

export function COUNT_CHECK(ctx) {
  const PUZZLES = ctx.helpers.extract("PUZZLES");
  return {
    regex: /<article class="card" id="raetsel-/g,
    expected: PUZZLES.length,
    label: "Rätsel-Karten",
  };
}

// Datenmengen fuer Intro/FAQ (Platzhalter). "methoden" zaehlt die mit (a) bis (d)
// durchnummerierten Loesungsmethoden im Sammeleintrag "Strongbox solving methods"
// (die App nennt dieselbe Zahl: "4 Strongbox-Methoden").
export function ZAHLEN(ctx) {
  const PUZZLES = ctx.helpers.extract("PUZZLES");
  const n = (cat) => PUZZLES.filter((p) => p.cat === cat).length;
  const sammel = PUZZLES.find((p) => /solving methods/i.test(p.name));
  return {
    anzahl: PUZZLES.length,
    strongboxes: n("Strongbox"),
    abyss: n("Story / Abyss"),
    kapitel: n("Story (Kapitel)"),
    fraktion: n("Faction-Quest"),
    methoden: sammel ? (sammel.detail.match(/\([a-d]\)/g) || []).length : 0,
    unsicher: PUZZLES.filter((p) => p.conf && p.conf !== "high").length,
  };
}

function karte(p, ctx) {
  const { esc, has, slug } = ctx.helpers;
  const stats = [];
  if (has(p.loc)) stats.push(["Fundort", p.loc]);
  if (p.conf === "low") stats.push(["Quellenlage", "unbestätigt, im Spiel prüfen"]);
  else if (p.conf && p.conf !== "high") stats.push(["Quellenlage", "Angaben teils quellenabhängig"]);
  if (p.miss) stats.push(["Hinweis", "verpassbar"]);
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("");
  const detail = has(p.detail) ? `<p class="rae-detail">${esc(p.detail)}</p>` : "";
  return `<article class="card" id="raetsel-${slug(p.name)}">
<h3>${esc(p.name)}</h3>
<ul class="stats">${statsHtml}</ul>
${detail}
</article>`;
}

export function build(ctx) {
  const { esc, breadcrumbLd } = ctx.helpers;
  const z = ZAHLEN(ctx);
  const gr = gruppen(ctx);

  const sections = gr.map((g) => `<h2>${g.icon} ${esc(g.label)} (${g.items.length})</h2>${
    g.sub ? `\n<p class="rae-sub">${esc(g.sub)}</p>` : ""}
<div class="grid">${g.items.map((p) => karte(p, ctx)).join("\n")}</div>`).join("\n");

  // Einleitungsbox: Wortlaut aus sec-puzzles in index.html.
  const body = `
<a class="cta" href="${DEEPLINK}">Alle Rätsel &amp; Strongboxes in der App öffnen &rarr;</a>
<p class="strat"><b>So funktionieren die Rätsel:</b> Pywel steckt voller Strongboxes (verschlossene Truhen mit fester Lösung) und Story-Rätsel im Abyss, die meist mit Axiom Force (L3 + rechter Stick) und Force Palm (R3) gelöst werden. Strongboxes folgen vier Mustern: feste Tastenfolge, Räder drehen, Kacheln zu einem Zielbild drehen oder einen Dial bis zum Klacken drehen.</p>
<p class="note">Generische Ancient-Ruins-Rätsel (Statuen drehen, Laternen, Tile-Walking, Match-3, Red-Light-Green-Light) stehen nicht hier, sondern einzeln auf der Seite <a href="/ruinen">Uralte Ruinen</a>. Tipps zu versteckten Orten und Hilfsmitteln findest du unter <a href="/geheimnisse">Geheimnisse &amp; Lore</a>.</p>
<p class="note">Wo im Fundort ein Kapitel steht, hilft der <a href="/kapitel-guide">Kapitel-Guide</a> bei der Einordnung in den Story-Verlauf.</p>
${sections}`;

  const alle = gr.flatMap((g) => g.items.map((p) => p.name));
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Rätsel", SLUG),
      {
        "@type": "ItemList",
        name: "Rätsel und Strongbox-Lösungen in Crimson Desert",
        numberOfItems: alle.length,
        itemListElement: alle.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
      },
    ],
  };

  const rest = z.anzahl - z.strongboxes - z.abyss;
  return {
    slugName: SLUG,
    title: `${z.anzahl} Rätsel in Crimson Desert: Lösungen für Strongboxes & Abyss`,
    desc: `${z.anzahl} Rätsel in Crimson Desert mit Lösung und Fundort: ${z.strongboxes} Strongbox-Einträge, ${z.abyss} Abyss-Rätsel und ${rest} Quest-Rätsel der Story. Deutsch.`,
    h1: `${z.anzahl} Rätsel in Crimson Desert: Strongboxes & Abyss`,
    lead: `Diese Übersicht führt <strong>${z.anzahl} Rätsel</strong> aus Crimson Desert mit Fundort und Lösung: ${z.strongboxes} Strongbox-Einträge, ${z.abyss} Story-Rätsel im Abyss und ${rest} Rätsel aus Story- und Fraktions-Quests.`,
    ogImage: null,
    crumb: "Rätsel",
    bodyHtml: body,
    jsonld,
  };
}

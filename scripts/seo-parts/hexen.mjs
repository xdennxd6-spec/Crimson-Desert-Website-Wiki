// SEO-Seitenmodul "Hexen-Guide" (07.10.2026).
//
// Datenquellen (Stand 07.10.2026):
//  - WITCHES: 6 Hexen mit name/color/img/location/chapter/services/quests/sanctums/tip.
//    Die App (renderWitches) zeigt Bild, Name, Kapitel/Freischaltung, Wohnort, Dienste, Questlinie
//    und Tipp; die Sanctum-Liste steht dort nur als Fliesstext in quests. Hier steht sie
//    zusaetzlich als eigene Zeile (reine Sprungmarke fuer Suchen wie "Sanctum of Temperance").
//    Alle 6 Bilder sind quadratische 512x512-Portraets auf fremden CDNs (5x questlog, 1x
//    gaming.tools bei Elowen), am 07.10.2026 per Range-Request gemessen.
//  - WITCH_SYNTHESIS: 185 Rezepte der Hexen-Werkstatt (questlog-Datamine), je role:
//    tier-core (42, Stufe I einer Familie) + tier-upgrade (82, Stufe II/III) = 124 Stufen-Cores,
//    effect-core (51) = einzelne Effekt-Cores, witch-other (10) = Nicht-Cores (5 Sigil-Mount-
//    Amulette laut SIGIL_AMULETS + 5 sonstige). Cores gesamt 175 in 93 Familien, wie in der App.
//    Die Rezepte sind NICHT je Hexe zugeordnet: die Synthese ist hexenunabhaengig (App-Text
//    "kein Stufen-System pro Hexe"), deshalb ist die Tabelle nach Rezeptart gegliedert, nicht
//    pro Hexe. Die Zuordnung Hexe -> verkaufte Blueprints steht in WITCHES.services.
//  - SIGIL_AMULETS: Rezeptname ohne Endziffer -> {mount, sigil}; liefert Spielname und Reittier.
//
// Icons der Rezepte: SYNTH_CDN + icon (https://cdn.questlog.gg/crimson-desert + /assets/_sprites/..),
// alle 103 verschiedenen Icon-URLs am 07.10.2026 gemessen: 256x256.
//
// Anker: Hexen "hexe-" + slug(name) (z. B. hexe-sylvia, hexe-white-crow); Rezepte "synth-" +
// slug(name) mit dem Rohnamen aus WITCH_SYNTHESIS (auch bei den Amuletten, z. B.
// synth-riding-bear-amulet-0). Die Namen sind in den Daten eindeutig.

export const SLUG = "hexen";
export const NAV_LABEL = "Hexen-Guide";
export const DEEPLINK = "/#sec-witches";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
article.card.hx-card::before{background:var(--hx-c,var(--red));box-shadow:0 0 12px var(--hx-c,var(--red-glow))}
article.card img.hx-img{width:120px;height:120px;aspect-ratio:1/1;object-fit:cover}
span.hx-slot{white-space:nowrap}
`.trim();

const SYNTH_CDN = "https://cdn.questlog.gg/crimson-desert";
const SLOT_DE = { Weapon: "Waffe", Armor: "Rüstung", Both: "Waffe/Hand/Fuß" };

const clean = (n) => String(n || "").replace(/\s+\d+$/, "");
const silber = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Silber`;

function teile(S, SIGIL) {
  const stufen = S.filter((c) => c.role !== "witch-other" && c.tier > 0);
  const effekt = S.filter((c) => c.role !== "witch-other" && !(c.tier > 0));
  const other = S.filter((c) => c.role === "witch-other");
  const amulette = other.filter((c) => SIGIL[clean(c.name)]);
  const sonstige = other.filter((c) => !SIGIL[clean(c.name)]);
  // Stufen-Cores nach Familie, dann Stufe; Effekt-Cores und Sonstiges alphabetisch.
  const byFam = (a, b) => a.family.localeCompare(b.family, "en") || a.tier - b.tier;
  const byName = (a, b) => clean(a.name).localeCompare(clean(b.name), "en");
  stufen.sort(byFam); effekt.sort(byName); sonstige.sort(byName);
  return { stufen, effekt, amulette, sonstige };
}

export function COUNT_CHECK(ctx) {
  const n = ctx.helpers.extract("WITCHES").length + ctx.helpers.extract("WITCH_SYNTHESIS").length;
  return { regex: /<(?:article class="card hx-card"|tr) id="(?:hexe|synth)-/g, expected: n, label: "Hexen-Karten und Synthese-Zeilen" };
}

export function ZAHLEN(ctx) {
  const W = ctx.helpers.extract("WITCHES");
  const S = ctx.helpers.extract("WITCH_SYNTHESIS");
  const SIGIL = ctx.helpers.extract("SIGIL_AMULETS");
  const t = teile(S, SIGIL);
  const cores = S.filter((c) => c.role !== "witch-other");
  return {
    hexen: W.length,
    regional: W.filter((w) => (w.sanctums || []).length >= 3).length,
    rezepte: S.length,
    cores: cores.length,
    familien: new Set(cores.map((c) => c.family)).size,
    stufen: t.stufen.length,
    effektcores: t.effekt.length,
    amulette: t.amulette.length,
    sonstige: t.sonstige.length,
  };
}

function witchCard(w, ctx) {
  const { esc, has, imgSrc, slug } = ctx.helpers;
  const farbe = /^#[0-9a-f]{3,8}$/i.test(w.color || "") ? ` style="--hx-c:${w.color}"` : "";
  const img = has(w.img)
    ? `<img class="hx-img" loading="lazy" src="${esc(imgSrc(w.img))}" alt="${esc(w.name)} in Crimson Desert" width="512" height="512">`
    : "";
  const liste = (arr) => arr.map((s) => `• ${esc(s)}`).join("<br>");
  const stats = [];
  if (has(w.chapter)) stats.push(["Freischaltung", esc(w.chapter)]);
  if (has(w.location)) stats.push(["Wohnort", esc(w.location)]);
  if ((w.services || []).length) stats.push(["Dienste", liste(w.services)]);
  if ((w.quests || []).length) stats.push(["Questlinie", liste(w.quests)]);
  if ((w.sanctums || []).length) stats.push(["Sanctums", esc(w.sanctums.join(", "))]);
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${v}</li>`).join("");
  const tip = has(w.tip) ? `<p class="strat"><b>Tipp:</b> ${esc(w.tip)}</p>` : "";
  return `<article class="card hx-card" id="hexe-${slug(w.name)}"${farbe}>
${img}
<h3>${esc(w.name)}</h3>
<ul class="stats">${statsHtml}</ul>
${tip}
</article>`;
}

function synthRow(c, ctx, opts = {}) {
  const { esc, has, imgSrc, slug } = ctx.helpers;
  const thumb = has(c.icon)
    ? `<img class="thumb" loading="lazy" src="${esc(imgSrc(SYNTH_CDN + c.icon))}" alt="${esc(opts.anzeige || clean(c.name))} in Crimson Desert" width="256" height="256">`
    : "";
  const name = opts.anzeige || clean(c.name);
  const effekt = opts.effektHtml != null ? opts.effektHtml : (has(c.effect) ? esc(c.effect) : '<span class="muted">Effekt nicht erfasst</span>');
  const slot = has(c.slot) ? `<span class="hx-slot">${esc(SLOT_DE[c.slot] || c.slot)}</span>` : "";
  return `<tr id="synth-${slug(c.name)}">
<td>${thumb}${esc(name)}</td>
<td>${esc(c.recipe)}</td>
<td>${effekt}</td>
<td>${slot}</td>
<td>${c.price ? esc(silber(c.price)) : ""}</td>
</tr>`;
}

const synthTable = (rows) => `<div class="tbl-wrap"><table>
<thead><tr><th>Rezept</th><th>Zutaten</th><th>Effekt</th><th>Slot</th><th>Kosten</th></tr></thead>
<tbody>${rows.join("\n")}</tbody>
</table></div>`;

export function build(ctx) {
  const W = ctx.helpers.extract("WITCHES");
  const S = ctx.helpers.extract("WITCH_SYNTHESIS");
  const SIGIL = ctx.helpers.extract("SIGIL_AMULETS");
  const MOUNTS = ctx.helpers.extract("MOUNTS");
  const { esc, breadcrumbLd, slug } = ctx.helpers;
  const z = ZAHLEN(ctx);
  const t = teile(S, SIGIL);

  const ids = [...W.map((w) => "hexe-" + slug(w.name)), ...S.map((c) => "synth-" + slug(c.name))];
  if (new Set(ids).size !== ids.length) throw new Error("hexen.mjs: doppelter Anker-Slug");
  if (t.stufen.length + t.effekt.length + t.amulette.length + t.sonstige.length !== S.length) {
    throw new Error("hexen.mjs: Gruppierung deckt nicht alle Rezepte ab");
  }

  const amuletRow = (c) => {
    const m = SIGIL[clean(c.name)];
    if (!MOUNTS.some((x) => x.name === m.mount)) throw new Error(`hexen.mjs: Mount ${m.mount} nicht in MOUNTS`);
    const effektHtml = `Schaltet das Reittier <a href="/mounts#mount-${slug(m.mount)}">${esc(m.mount)}</a> dauerhaft frei; herstellen bei der Hexe unter „Abyss-Ausrüstung herstellen“ › „Besondere Gegenstände“, danach aus dem Inventar benutzen`;
    return synthRow(c, ctx, { anzeige: m.sigil, effektHtml });
  };

  const hexenSection = `<h2>🧙 Hexen (${W.length})</h2>
<p class="note">Nicht verwechseln: Hexe Marie („Black Witch“, Kapitel 9) ist keine Dienstleisterin, sondern eine feindliche Hexe und ein Boss.</p>
<div class="grid">${W.map((w) => witchCard(w, ctx)).join("\n")}</div>`;

  const synthIntro = `<p class="strat"><b>Reguläre Synthese:</b> Zwei Cores mit gleichem Namen und gleicher Stufe ergeben einen Core eine Stufe höher, zum Beispiel 2x Destruction I zu 1x Destruction II. Die höchste so erreichbare Stufe ist III. Du brauchst das passende Blueprint, das Hexen verkaufen. Die zufällige <b>Spezial-Synthese</b> hat keine festen Rezepte und steht deshalb nicht in den folgenden Tabellen. Die ${S.length} Rezepte stammen aus dem Datamine von questlog; die Kosten sind Silber.</p>`;

  const stufenSection = `<h2>🧪 Stufen-Cores I bis III (${t.stufen.length})</h2>
${synthIntro}
<p class="note">${z.familien} Core-Familien gibt es insgesamt, ${t.stufen.length} Rezepte gehören zu Familien mit Stufen. Stufe II und III entstehen aus je zwei Cores der Vorstufe.</p>
${synthTable(t.stufen.map((c) => synthRow(c, ctx)))}`;

  const effektSection = `<h2>⚗️ Einzelne Effekt-Cores (${t.effekt.length})</h2>
${synthTable(t.effekt.map((c) => synthRow(c, ctx)))}`;

  const amulettSection = `<h2>🐴 Sigil-Mount-Amulette (${t.amulette.length})</h2>
${synthTable(t.amulette.map(amuletRow))}`;

  const sonstigeSection = `<h2>📦 Sonstige Hexen-Rezepte (${t.sonstige.length})</h2>
<p class="note">Keine Cores: Wertmaterialien und Spezial-Items, die an derselben Werkbank entstehen.</p>
${synthTable(t.sonstige.map((c) => synthRow(c, ctx)))}`;

  const body = `
<a class="cta" href="${DEEPLINK}">Hexen-Guide interaktiv in der App öffnen &rarr;</a>
<p class="note">In der App ist die Synthese als durchsuchbarer Baum nach Stufe filterbar und lässt sich auf Cores mit bekanntem Effekt eingrenzen.</p>
<p class="note">Die Core-Effekte selbst stehen im Überblick der <a href="/abyss-cores">Abyss Cores</a>, die Reittiere hinter den Sigil-Amuletten bei den <a href="/mounts">Mounts</a> und weitere Herstellung im <a href="/crafting">Crafting-Guide</a>.</p>
${hexenSection}
${stufenSection}
${effektSection}
${amulettSection}
${sonstigeSection}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Hexen-Guide", SLUG),
      {
        "@type": "ItemList",
        name: "Hexen in Crimson Desert",
        numberOfItems: W.length,
        itemListElement: W.map((w, i) => ({ "@type": "ListItem", position: i + 1, name: w.name })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Hexen-Guide Crimson Desert: ${z.hexen} Hexen & ${z.rezepte} Synthese-Rezepte`,
    desc: `Hexen-Guide zu Crimson Desert: ${z.hexen} Hexen mit Fundort und Freischaltung plus ${z.rezepte} Synthese-Rezepte für Abyss Cores, Sigil-Amulette und mehr mit Zutaten und Kosten.`,
    h1: `Hexen-Guide: ${z.hexen} Hexen und ${z.rezepte} Synthese-Rezepte`,
    lead: `Der Hexen-Guide zu Crimson Desert erklärt alle <strong>${z.hexen} Hexen</strong> mit Wohnort, Freischaltung, Diensten und Sanctum-Questlinie. Dazu stehen alle <strong>${z.rezepte} Synthese-Rezepte</strong> der Hexen-Werkstatt in Tabellen: ${z.stufen} Stufen-Cores, ${z.effektcores} Effekt-Cores, ${z.amulette} Sigil-Mount-Amulette und ${z.sonstige} sonstige Rezepte.`,
    ogImage: null,
    crumb: "Hexen-Guide",
    bodyHtml: body,
    jsonld,
  };
}

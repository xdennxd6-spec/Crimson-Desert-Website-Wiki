// SEO-Seitenmodul "Crafting". Baut auf dem Vertrag aus parts/trophaeen.mjs auf.
//
// ctx = { data: {...alle Datenstrukturen...}, helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE, CRAFT_CDN } }

export const SLUG = "crafting";
export const NAV_LABEL = "Crafting";
export const DEEPLINK = "/#sec-crafting";
export const SITEMAP = { pri: "0.8", freq: "monthly" };

// Nur Klassen, die es in SHARED_CSS noch nicht gibt.
export const EXTRA_CSS = `
span.unsure{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#160a08;background:var(--amber)}
span.unsure.low{background:var(--red)}
span.muted{color:var(--ink-faint)}
`.trim();

// Der Vollstaendigkeitstest muss exakt das zaehlen, was build() ausgibt: eine Tabellenzeile
// pro CRAFTING-Eintrag, ueber alle Kategorie- und Kochstufen-Tabellen hinweg.
export function COUNT_CHECK(ctx) {
  return {
    regex: /<tr>\s*<td/g,
    expected: ctx.data.CRAFTING.length,
    label: "Crafting-Zeilen",
  };
}

// Reihenfolge der Hauptkategorien, wie im Prompt vorgegeben.
const CAT_ORDER = ["Elixir", "Food", "Kuku-Gadget"];

// Die Food-Tiers, siehe CRAFT_TIER_RANK in index.html (Zeile ~10844): Filling/Satisfying/
// Hearty sind echte Ausbaustufen DESSELBEN Grundrezepts (Rang 1-3, Hearty ist die hoechste
// Stufe). Festmahl und Lavish sind dagegen EIGENE Grundrezepte der hoechsten Item-Stufe
// (Rang 0, genau wie Basis) - z.B. sind "Lavish Meal" (Tier Lavish) und "Hearty Lavish Meal"
// (Tier Hearty) zwei verschiedene Karten, keine Basis- und Ausbaustufe desselben Rezepts.
// Reihenfolge daher: erst die drei Rang-0-Grundrezepte, danach die Ausbaustufen-Leiter.
// Elixiere haben nur "Basis", Kuku-Gadgets nur "Gadget" - dort lohnt keine Unterteilung.
const FOOD_TIER_ORDER = ["Basis", "Festmahl", "Lavish", "Filling", "Satisfying", "Hearty"];

export function build(ctx) {
  const { CRAFTING } = ctx.data;
  const { esc, has, imgSrc, breadcrumbLd, SITE, CRAFT_CDN } = ctx.helpers;

  const byName = (a, b) => a.name.localeCompare(b.name, "de");

  // Eine Zeile pro Rezept. conf "low"/"medium" wird sichtbar markiert (Regel: Seite bleibt
  // ehrlich statt unsichere Werte als gesichert auszugeben); spirit/note/conflict haengen
  // als Zusatzzeile unter der Wirkung, weil sie inhaltlich dazugehoeren.
  const row = (c) => {
    const thumb = has(c.icon)
      ? `<img class="thumb" loading="lazy" src="${esc(imgSrc(CRAFT_CDN + c.icon))}" alt="" width="34" height="34">`
      : "";
    // flex heisst NICHT "Zutaten austauschbar", sondern "zusaetzliche, hier nicht gelistete
    // Zutaten noetig" (siehe craftFlexTxt in index.html Zeile 10867).
    const flexTxt = c.flex
      ? c.cat === "Elixir"
        ? " (zusätzlich Reagenz und Katalysator nötig)"
        : " (zusätzlich flexible Zutaten: Fleisch, Fisch oder Korn)"
      : "";
    const confTag = c.conf === "low"
      ? ` <span class="unsure low">geringe Datenlage</span>`
      : c.conf === "medium"
      ? ` <span class="unsure">mittlere Datenlage</span>`
      : "";
    // c.spirit-Werte beginnen selbst fast immer mit "Spirit ..." (z.B. "Spirit +24") -
    // kein zusaetzliches Label davorsetzen, das waere redundant ("Spirit: Spirit +24").
    const spiritLine = has(c.spirit) ? `<br><span class="muted">${esc(c.spirit)}</span>` : "";
    const noteLine = has(c.note) ? `<br><span class="muted">Tipp: ${esc(c.note)}</span>` : "";
    const conflictLine = has(c.conflict) ? `<br><span class="muted">Hinweis: ${esc(c.conflict)}</span>` : "";
    const sourceLine = has(c.source) ? `<br><span class="muted">Quelle: ${esc(c.source)}</span>` : "";
    return `<tr>
<td title="Item-Stufe ${esc(c.grade)}">${thumb}${esc(c.name)}</td>
<td>${esc(c.ingr)}${flexTxt}</td>
<td>${esc(c.effect)}${confTag}${spiritLine}${noteLine}${conflictLine}${sourceLine}</td>
<td>${esc(c.station)}</td>
</tr>`;
  };

  const table = (items) => `<div class="tbl-wrap"><table>
<thead><tr><th>Rezept</th><th>Zutaten</th><th>Wirkung</th><th>Station</th></tr></thead>
<tbody>${items.map(row).join("\n")}</tbody>
</table></div>`;

  const elixirItems = CRAFTING.filter((c) => c.cat === "Elixir").sort(byName);
  const foodAll = CRAFTING.filter((c) => c.cat === "Food");
  const gadgetItems = CRAFTING.filter((c) => c.cat === "Kuku-Gadget").sort(byName);

  const elixirSection = `<h2>Elixir (${elixirItems.length})</h2>
${table(elixirItems)}`;

  const foodTierSections = FOOD_TIER_ORDER
    .filter((t) => foodAll.some((c) => c.tier === t))
    .map((t) => {
      const items = foodAll.filter((c) => c.tier === t).sort(byName);
      return `<h3>${esc(t)} (${items.length})</h3>
${table(items)}`;
    }).join("\n");

  const foodSection = `<h2>Food (${foodAll.length})</h2>
<p class="note">Filling, Satisfying und Hearty sind größere Varianten desselben Grundrezepts: mehr Zutaten, mehr geheilte HP, gleiche Station. Festmahl und Lavish sind dagegen eigene Grundrezepte der höchsten Item-Stufe, keine Ausbaustufe darüber.</p>
${foodTierSections}`;

  const gadgetSection = `<h2>Kuku-Gadget (${gadgetItems.length})</h2>
${table(gadgetItems)}`;

  const unsureCount = CRAFTING.filter((c) => c.conf === "low" || c.conf === "medium").length;

  const body = `
<a class="cta" href="${DEEPLINK}">Interaktive Crafting-Datenbank mit Filtern öffnen &rarr;</a>
<p class="note">In der App nach Kategorie, Station und Effekt filterbar, mit Volltextsuche und allen Kochstufen eines Gerichts gebündelt auf einer Karte.</p>
<p class="note">${unsureCount} von ${CRAFTING.length} Rezepten tragen eine Datenlage-Markierung, weil Zutaten oder Werte nur dünn belegt oder unbestätigt sind. Das steht hier offen dabei, statt einen unsicheren Wert als gesichert auszugeben.</p>
${elixirSection}
${foodSection}
${gadgetSection}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Crafting", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Crafting-Rezepte in Crimson Desert",
        numberOfItems: CRAFTING.length,
        itemListElement: CRAFTING.map((c, i) => ({
          "@type": "ListItem", position: i + 1, name: c.name,
        })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Crimson Desert Crafting: Alle ${CRAFTING.length} Rezepte & Zutaten`,
    desc: `Crimson Desert Crafting-Liste: ${CRAFTING.length} Rezepte für ${elixirItems.length} Elixiere, ${foodAll.length} Gerichte und ${gadgetItems.length} Kuku-Gadgets, jeweils mit Zutaten, Wirkung, Station und Kochstufe. Deutsch.`,
    h1: `Alle ${CRAFTING.length} Crafting-Rezepte in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${CRAFTING.length} Crafting-Rezepte</strong> aus Crimson Desert: <strong>${elixirItems.length} Elixiere</strong>, <strong>${foodAll.length} Gerichte</strong> von der Basis-Stufe bis zur Hearty-Stufe und <strong>${gadgetItems.length} Kuku-Gadgets</strong>, jeweils mit Zutaten, Wirkung, Herstellungsort und offen markierter Datenlage.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Crafting",
    bodyHtml: body,
    jsonld,
  };
}

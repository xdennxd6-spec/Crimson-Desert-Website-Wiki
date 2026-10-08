// SEO-Seitenmodul "Accessoires" (07.10.2026).
//
// Datenquelle: ACCESSORIES (40 Eintraege mit name/type/effect/source/notes/icon, Stand 07.10.2026):
// 13 Ring, 14 Necklace, 13 Earring. Alle 40 haben icon und notes, kein conf-Feld; Widersprueche
// und Unsicherheit stehen als Text in notes (z. B. Aufwertbarkeit der Signets "ungeklaert"),
// und der steht hier unveraendert. Karte wie in renderAccessories() der App: Icon, Name, Typ,
// Effekt, Quelle, Notiz. Die Legende zu "(+10)" ist wortgleich aus index.html uebernommen.
// "Ogre's Ring" ist laut Daten trotz des Namens eine Halskette (Typ Necklace) und steht deshalb
// bei den Halsketten.
//
// Icon-URL wie in der App: SYNTH_CDN (https://cdn.questlog.gg/crimson-desert) + icon
// ("/assets/_sprites/itemicon_prefab_cd_phm_00_...webp"). Alle 40 Icons am 07.10.2026 per
// Range-Request gemessen: 256x256.
//
// Anker: "acc-" + slug(name); die Namen sind in den Daten eindeutig.
// SIGIL_AMULETS gehoert thematisch zu den Hexen-Rezepten und wird auf /hexen genutzt, nicht hier.

export const SLUG = "accessoires";
export const NAV_LABEL = "Accessoires";
export const DEEPLINK = "/#sec-accessories";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
article.card img.acc-ico{width:64px;height:64px;aspect-ratio:1/1;object-fit:contain;padding:4px}
`.trim();

const SYNTH_CDN = "https://cdn.questlog.gg/crimson-desert";

// Reihenfolge wie die Typ-Auswahl in der App; Label ist der deutsche Gruppentitel.
const GROUPS = [
  ["Ring", "💍", "Ringe", "Ring"],
  ["Necklace", "📿", "Halsketten", "Halskette (Necklace)"],
  ["Earring", "✨", "Ohrringe", "Ohrring (Earring)"],
];

function gruppiere(ACC) {
  const out = GROUPS.map(([type, icon, label, typLabel]) => ({ type, icon, label, typLabel, items: ACC.filter((a) => a.type === type) }));
  const bekannt = new Set(GROUPS.map((g) => g[0]));
  const rest = ACC.filter((a) => !bekannt.has(a.type));
  if (rest.length) out.push({ type: "?", icon: "🧿", label: "Weitere Accessoires", typLabel: null, items: rest });
  return out.filter((g) => g.items.length);
}

export function COUNT_CHECK(ctx) {
  return {
    regex: /<article class="card" id="acc-/g,
    expected: ctx.helpers.extract("ACCESSORIES").length,
    label: "Accessoire-Karten",
  };
}

export function ZAHLEN(ctx) {
  const ACC = ctx.helpers.extract("ACCESSORIES");
  const je = (t) => ACC.filter((a) => a.type === t).length;
  return {
    anzahl: ACC.length,
    ringe: je("Ring"),
    halsketten: je("Necklace"),
    ohrringe: je("Earring"),
    unique: ACC.filter((a) => /\bUnique\b/.test(a.effect || "")).length,
  };
}

function accCard(a, typLabel, ctx) {
  const { esc, has, imgSrc, slug } = ctx.helpers;
  const img = has(a.icon)
    ? `<img class="acc-ico" loading="lazy" src="${esc(imgSrc(SYNTH_CDN + a.icon))}" alt="${esc(a.name)} in Crimson Desert" width="256" height="256">`
    : "";
  const stats = [["Typ", typLabel || a.type]];
  if (has(a.effect)) stats.push(["Effekt", a.effect]);
  if (has(a.source)) stats.push(["Quelle", a.source]);
  if (has(a.notes)) stats.push(["Notiz", a.notes]);
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("");
  return `<article class="card" id="acc-${slug(a.name)}">
${img}
<h3>${esc(a.name)}</h3>
<ul class="stats">${statsHtml}</ul>
</article>`;
}

export function build(ctx) {
  const ACC = ctx.helpers.extract("ACCESSORIES");
  const { breadcrumbLd, slug } = ctx.helpers;
  const z = ZAHLEN(ctx);
  const total = ACC.length;

  const ids = ACC.map((a) => slug(a.name));
  if (new Set(ids).size !== ids.length) throw new Error("accessoires.mjs: doppelter Anker-Slug");

  const sections = gruppiere(ACC).map((g) => `<h2>${g.icon} ${g.label} (${g.items.length})</h2>
<div class="grid">${g.items.map((a) => accCard(a, g.typLabel, ctx)).join("\n")}</div>`).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Alle Accessoires interaktiv in der App öffnen &rarr;</a>
<p class="note">In der App filterst du nach Typ und lässt dir zu jedem Accessoire die Fundstelle auf der Karte anzeigen.</p>
<p class="note"><b>Legende:</b> „(+10)“ hinter einem Wert bedeutet: Wert bei voller Verfeinerung (Refinement +10), nicht der Grundwert. Mehrere Accessoires kaufst du bei Hexen wie Elowen, Bari, Lyselia und Areciel, mehr dazu unter <a href="/hexen">Hexen &amp; Fusion</a>; viele Stücke fallen als Beute oder Belohnung bei Gegnern an, die in der <a href="/bosse">Bossliste</a> stehen.</p>
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Accessoires", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Accessoires in Crimson Desert",
        numberOfItems: total,
        itemListElement: ACC.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.name })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${total} Accessoires in Crimson Desert: Ringe, Ketten & Ohrringe`,
    desc: `Crimson Desert Accessoires: ${total} Stück mit Effekt, Fundort und Notizen, darunter ${z.ringe} Ringe, ${z.halsketten} Halsketten und ${z.ohrringe} Ohrringe. ${z.unique} tragen einen Unique-Effekt.`,
    h1: `Alle ${total} Accessoires in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${total} Accessoires</strong> aus Crimson Desert: <strong>${z.ringe} Ringe</strong>, ${z.halsketten} Halsketten und ${z.ohrringe} Ohrringe, jeweils mit Effekt, Fundort oder Händler und Notizen aus den Spieldaten.`,
    ogImage: null,
    crumb: "Accessoires",
    bodyHtml: body,
    jsonld,
  };
}

// SEO-Seitenmodul "Reit- & Tierausrüstung" (08.11.2026, Nachtlauf luecken-fuellen, Paket 2).
//
// Datenquelle: data/d14-reit.js (REIT_AUSRUESTUNG, REIT_VERWEISE, REIT_ARTEN, REIT_META). Dieselben Daten zeigt die App auf der Seite
// sec-reitausruestung (renderReitausruestung in d14). Werte aus questlog (statId-Eichung STAT-EICHUNG.md des Laufs), Gesundheit an
// fünf Sätteln gegen th.gl geprüft. Das Feld de ist der offizielle deutsche Name, nur gesetzt, wenn er bekannt ist; sonst bleibt der
// englische Name stehen (keine eigene Übersetzung).
//
// Zaehlung: je Teil eine Karte <article class="card" id="reit-...">, Anker "reit-" + slug(name); die Namen sind eindeutig.
// Teile, die das Wiki schon an anderer Stelle führt (REIT_VERWEISE), stehen nur als Linkliste, nicht als Karte.

export const SLUG = "reitausruestung";
export const NAV_LABEL = "Reit- & Tierausrüstung";
export const DEEPLINK = "/#sec-reitausruestung";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
article.card img.reit-ico{width:64px;height:64px;aspect-ratio:1/1;object-fit:contain;padding:4px}
`.trim();

const SYNTH_CDN = "cd_assets/ql";
const GRUPPE = { Sattel: "Sättel", Rossharnisch: "Rossharnische", Rossstirn: "Rossstirnen", "Steigbügel": "Steigbügel", Hufeisen: "Hufeisen",
  Haustier: "Ausrüstung für Haustiere", Kuku: "Ausrüstung für Kukuvögel", Sonder: "A.T.A.G., Drache und Verbrauchsgüter" };

function lade(ctx) {
  const x = ctx.helpers.extract;
  return { A: x("REIT_AUSRUESTUNG"), V: x("REIT_VERWEISE"), ARTEN: x("REIT_ARTEN") };
}

export function ZAHLEN(ctx) {
  const { A, V } = lade(ctx);
  const je = (a) => A.filter((x) => x.art === a).length;
  return {
    anzahl: A.length, saettel: je("Sattel"), harnische: je("Rossharnisch"), stirn: je("Rossstirn"), buegel: je("Steigbügel"),
    hufeisen: je("Hufeisen"), haustier: je("Haustier"), kuku: je("Kuku"), sonder: je("Sonder"),
    maxhp: Math.max(...A.map((x) => x.hp || 0)), verweise: V.length,
  };
}

export function COUNT_CHECK(ctx) {
  return { regex: /<article class="card" id="reit-/g, expected: lade(ctx).A.length, label: "Ausrüstungs-Karten" };
}

const werte = (x) => {
  const a = [];
  if (x.hp != null) a.push("Gesundheit " + x.hp);
  if (x.def != null) a.push("Verteidigung " + x.def);
  if (x.atk != null) a.push("Angriff " + x.atk);
  for (const e of x.effekt || []) a.push(e);
  return a.length ? a.join(", ") : "keine Werte in den Spieldaten";
};

function karte(x, ctx) {
  const { esc, has, imgSrc, slug } = ctx.helpers;
  const nm = x.de || x.name;
  const img = has(x.icon)
    ? `<img class="reit-ico" loading="lazy" src="${esc(imgSrc(SYNTH_CDN + x.icon))}" alt="${esc(nm)} in Crimson Desert" width="256" height="256">`
    : "";
  const st = [["Art", x.art + (x.tier ? ", Tier " + x.tier : "")], ["Für", x.fuer], ["Werte", werte(x)], ["Fundort", x.source]];
  if (nm !== x.name) st.unshift(["Englisch", x.name]);
  if (has(x.notes)) st.push(["Notiz", x.notes]);
  return `<article class="card" id="reit-${slug(x.name)}">
${img}
<h3>${esc(nm)}</h3>
<ul class="stats">${st.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("")}</ul>
</article>`;
}

export function build(ctx) {
  const { esc, breadcrumbLd, slug } = ctx.helpers;
  const { A, V, ARTEN } = lade(ctx);
  const z = ZAHLEN(ctx);
  const ids = A.map((x) => slug(x.name));
  if (new Set(ids).size !== ids.length) throw new Error("reitausruestung.mjs: doppelter Anker-Slug");

  const gruppen = ARTEN.map((a) => [a, A.filter((x) => x.art === a)]).filter(([, l]) => l.length)
    .map(([a, l]) => `<h2>${esc(GRUPPE[a] || a)} (${l.length})</h2>
<div class="grid">${l.map((x) => karte(x, ctx)).join("\n")}</div>`).join("\n");

  const verweis = (v) => {
    const href = v.dlc ? `/charting-the-unknown#dlc-geraet-${slug(v.name)}` : `/#sec=${encodeURIComponent(v.sec)}&go=${encodeURIComponent(v.name)}`;
    return `<li><a href="${esc(href)}">${esc(v.name)}</a>: ${esc(v.art)}, ${esc(v.d)}</li>`;
  };

  const body = `
<a class="cta" href="${DEEPLINK}">Alle Teile interaktiv in der App öffnen &rarr;</a>
<p class="note">In der App filterst du nach Art (Sattel, Rossharnisch, Rossstirn, Steigbügel, Hufeisen, Haustier, Kuku, Sonder) und springst zu den Quests, die ein Teil als Belohnung geben.</p>
<p class="note"><b>Legende:</b> Werte und Fundorte stammen aus den Spieldaten (questlog). Die Gesundheit der Sättel deckt sich an mehreren Sätteln mit th.gl. „Vertrauen nötig“ heißt, der Händler verkauft erst mit genug Vertrauen; „nur mit Prestige“ ist der Spieltext der besten Teile. Die Reittiere selbst stehen unter <a href="/mounts">Reittiere</a>, die Haustiere unter <a href="/pets">Haustiere</a>.</p>
${gruppen}
<h2>Schon an anderer Stelle im Wiki (${V.length})</h2>
<p class="note">Diese Teile führt das Wiki bereits in einem anderen Bereich. Sie stehen hier nicht noch einmal.</p>
<ul>${V.map(verweis).join("")}</ul>`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Reit- & Tierausrüstung", SLUG),
      { "@type": "ItemList", name: "Reit- und Tierausrüstung in Crimson Desert", numberOfItems: A.length,
        itemListElement: A.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.de || x.name })) },
    ],
  };

  return {
    slugName: SLUG,
    title: `Reit- & Tierausrüstung in Crimson Desert: ${z.anzahl} Teile`,
    desc: `Crimson Desert Reitausrüstung: ${z.saettel} Sättel, ${z.harnische} Rossharnische, ${z.stirn} Rossstirnen, ${z.buegel} Steigbügel und ${z.hufeisen} Hufeisen mit Werten und Händler, dazu Haustier- und A.T.A.G.-Teile.`,
    h1: `Reit- & Tierausrüstung in Crimson Desert`,
    lead: `Diese Übersicht listet <strong>${z.anzahl} Teile</strong> für Pferde, andere Reittiere, Haustiere, Kukuvögel und den A.T.A.G., jeweils mit Werten aus den Spieldaten und Fundort.`,
    ogImage: null,
    crumb: "Reit- & Tierausrüstung",
    bodyHtml: body,
    jsonld,
  };
}

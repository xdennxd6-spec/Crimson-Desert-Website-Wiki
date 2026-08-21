// parts/ruestungen.mjs — SEO-Seite "Rüstungen".
//
// Gruppiert die ARMOR-Datenstruktur (337 Eintraege) nach Ruestungsteil
// (Torso/Kopf/Haende/Schuhe/Mantel), je Gruppe eine Tabelle (alphabetisch
// sortiert). Stil und Spaltenaufbau orientieren sich an weaponRow/buildWaffen
// aus scripts/gen-seo.mjs (Bild+Name, dann Werte-Spalten, dann Fundort).
//
// Inhaltlich wichtig: der Kommentar direkt ueber der ARMOR-Struktur in
// index.html dokumentiert per Fakten-Audit, welche Ruestungswerte im Spiel
// wirklich existieren (nur Defense, Element-Resistenz Fire/Ice/Lightning als
// STUFE, bei Handschuhen/Stiefeln zusaetzlich Attack, dazu Attack/Move Speed
// & Crit Rate als Level sowie Daze Immunity bei manchen Platten-Helmen) und
// welche Werte in aelteren Guides frei erfunden waren. Der p.strat-Absatz
// unten fasst genau das zusammen, ohne etwas zu behaupten, das dort als
// unwahr markiert ist.
//
// ctx = { data: {...}, helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE, CRAFT_CDN } }

export const SLUG = "ruestungen";
export const NAV_LABEL = "Rüstungen";
export const DEEPLINK = "/#sec-armor";
export const SITEMAP = { pri: "0.8", freq: "monthly" };

// Alle benoetigten Klassen (a.cta, p.strat, p.note, h2, .tbl-wrap/table/thead/
// tbody/th/td, td.muted, td img.thumb) existieren bereits in SHARED_CSS.
// Eine Regel fuer die Quellenlage-Spalte. Flach halten: cssRules() in
// gen-seo.mjs zerlegt an "}" und vertraegt keine verschachtelten Regeln.
export const EXTRA_CSS = `td.prov{font-size:12px;white-space:nowrap;color:var(--ink-faint)}
td.prov.warn{color:var(--amber)}`;

// Der Vollstaendigkeitstest: eine <tr><td>-Zeile pro Ruestungsteil, ueber alle
// 5 Gruppen hinweg muss das exakt ARMOR.length ergeben.
export function COUNT_CHECK(ctx) {
  return {
    regex: /<tr>\s*<td/g,
    expected: ctx.data.ARMOR.length,
    label: "Rüstungs-Zeilen",
  };
}

// Beschriftung der Quellenlage. prov sagt, WOHER der Wert stammt — es ist keine
// Vertrauensnote: die Grenze import/guide folgt der Schreibweise des Wertformats
// im Datenbestand und trennt Import-Chargen, nicht Belegqualitaet.
const PROV_LABEL = {
  import: ["Datenimport", false],
  guide: ["aus Guides belegt", false],
  altbestand: ["ungeprüft", true],
  ohnewert: ["kein Zahlenwert", false],
};

// Reihenfolge der Ruestungsteile (Torso zuerst, wie im Spiel-Inventar).
const TYPE_ORDER = ["Torso", "Kopf", "Hände", "Schuhe", "Mantel"];

// Datenmengen, die die redaktionellen Texte in scripts/seo-content/ per
// Platzhalter einsetzen ({{name}} = Ziffer, {{name|wort}} = ausgeschrieben).
// Einzige Quelle fuer diese Zahlen ist die Datenstruktur selbst — nie ein
// fest verdrahteter Wert im Text. Siehe zahlenEinsetzen() in gen-seo.mjs.
export function ZAHLEN(ctx) {
  const { ARMOR } = ctx.data;
  const je = (t) => ARMOR.filter((a) => a.type === t).length;
  const prov = (p) => ARMOR.filter((a) => a.prov === p).length;
  return {
    anzahl: ARMOR.length,
    torso: je("Torso"), kopf: je("Kopf"), haende: je("Hände"),
    schuhe: je("Schuhe"), mantel: je("Mantel"),
    // Provenienz-Verteilung, siehe prov-Feld am ARMOR-Array in index.html.
    dsimport: prov("import"), dsguide: prov("guide"),
    dsalt: prov("altbestand"), dsohne: prov("ohnewert"),
  };
}

export function build(ctx) {
  const { ARMOR, ARMOR_IMGS } = ctx.data;
  const { esc, has, imgSrc, breadcrumbLd } = ctx.helpers;
  const z = ZAHLEN(ctx);

  // Eine Zeile pro Ruestungsteil. Genau EIN Eintrag hat kein Bild in ARMOR_IMGS
  // (336 Schluessel auf 337 Eintraege) — dann faellt das <img> komplett weg
  // statt einen kaputten Pfad zu rendern (kein <img src=""> o.ae.).
  const row = (a) => {
    const img = ARMOR_IMGS[a.name];
    const thumb = has(img)
      ? `<img class="thumb" loading="lazy" src="${esc(imgSrc(img))}" alt="" width="34" height="34">`
      : "";
    // td.muted (nicht span.muted) nutzen — nur dafuer existiert eine Regel in SHARED_CSS.
    const noteTd = has(a.notes) ? `<td>${esc(a.notes)}</td>` : `<td class="muted">–</td>`;
    const [pLbl, pWarn] = PROV_LABEL[a.prov] || ["–", false];
    const provTd = `<td class="prov${pWarn ? " warn" : ""}">${esc(pLbl)}</td>`;
    return `<tr>
<td>${thumb}${esc(a.name)}</td>
<td>${esc(a.effect)}</td>
<td>${esc(a.source)}</td>
${provTd}
${noteTd}
</tr>`;
  };

  const sections = TYPE_ORDER
    .filter((t) => ARMOR.some((a) => a.type === t))
    .map((t) => {
      const items = ARMOR.filter((a) => a.type === t)
        .sort((a, b) => a.name.localeCompare(b.name, "de"));
      return `<h2>${esc(t)} (${items.length})</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Rüstung</th><th>Effekt</th><th>Fundort</th><th>Quellenlage</th><th>Anmerkung</th></tr></thead>
<tbody>${items.map(row).join("\n")}</tbody>
</table></div>`;
    }).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Interaktive Rüstungs-Datenbank öffnen &rarr;</a>
<p class="strat"><b>Echte Werte im Spiel:</b> Rüstung hat in Crimson Desert nur Defense (Zahl), Element-Resistenz gegen Feuer, Eis und Blitz als Stufe (nicht Prozent) und bei Handschuhen sowie Stiefeln zusätzlich Angriff. Dazu kommen Angriffs- und Lauftempo sowie Crit-Rate als Stufe und bei manchen Platten-Helmen Daze-Immunität. Das Material Cloth, Leather oder Plate ist kein eigener Stat, es bestimmt aber die maximal erreichbare Defense (voll ausgebaut rund 69, 99 bzw. 114). <b>Woher die Werte stammen</b>, steht seit dem 21.&nbsp;August&nbsp;2026 in einer eigenen Spalte: ${z.dsimport} Teile kommen aus dem Datenimport der Spieldateien, ${z.dsguide} sind aus Guides belegt, ${z.dsalt} stammen aus einem älteren kuratierten Bestand und sind <b>ungeprüft</b> — dort standen nachweislich erfundene Werte wie Ausweichen, Goldfund oder Lebensraub, die der Fakten-Audit vom 2.&nbsp;Juni&nbsp;2026 entfernt hat; bei ${z.dsohne} Teilen ist überhaupt kein Zahlenwert hinterlegt. Die Spalte nennt die <b>Herkunft</b>, nicht die Belegqualität: „Datenimport“ heißt nicht „gegengeprüft“, und wo ein Set als verifiziert gilt, betrifft das nur die einzeln geprüften Teile — nicht jedes gleichnamige Stück desselben Sets.</p>
<p class="note">In der App filterst du die Rüstungs-Datenbank nach Teil und Set, siehst größere Icons und vergleichst mehrere Ausrüstungsteile direkt nebeneinander. Herstellbare Teile stehen zusätzlich im <a href="/#sec-crafting">Crafting-Bereich</a>, die mehrfach erwähnten Slots erklärt die <a href="/#sec-cores">Abyss-Core-Übersicht</a>, und als Gegenstück gibt es die <a href="/#sec-weapons">Waffen-Liste</a>.</p>
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Rüstungen", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Rüstungen in Crimson Desert",
        numberOfItems: ARMOR.length,
        itemListElement: ARMOR.map((a, i) => ({
          "@type": "ListItem", position: i + 1, name: a.name,
        })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${ARMOR.length} Rüstungen in Crimson Desert: Def-Werte & Fundorte`,
    desc: `Crimson Desert Rüstungs-Liste: ${ARMOR.length} Teile für Torso, Kopf, Hände, Schuhe und Mantel mit Defense, Resistenz-Stufe, Fundort und Anmerkung zur Quellenlage.`,
    h1: `Alle ${ARMOR.length} Rüstungen in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${ARMOR.length} Rüstungsteile</strong> aus Crimson Desert: Torso, Kopf, Hände, Schuhe und Mantel, jeweils mit Effekt und Fundort, gruppiert nach Rüstungsteil und alphabetisch sortiert.`,
    ogImage: "cd_assets/armor/golden-greed-plate.webp",
    crumb: "Rüstungen",
    bodyHtml: body,
    jsonld,
  };
}

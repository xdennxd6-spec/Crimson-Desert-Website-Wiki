// parts/fraktionen.mjs — SEO-Seite "Fraktionen".
//
// Aufbau: CTA + Hinweis (wie jede Seite) -> je ein <h2> pro REGION (Sprungmarke,
// Reihenfolge exakt wie in FAC_DATA.regions -- keine Umsortierung nach Menge,
// da die Regionen selbst der geografische Spielfortschritt sind), darunter je
// ein <h3>-Zwischenkopf pro FRAKTION mit Kurzbeschreibung (overview), darunter
// die Questtabelle Quest/Auslöser/Voraussetzung/Belohnung. Analog zu
// hauptquests.mjs (Kapitel -> Quests), nur um eine Ebene erweitert
// (Region -> Fraktion -> Quests).
//
// Der zaehlbare Eintrag ist die QUEST-ZEILE <tr id="fr-...">, nicht die
// Fraktion und nicht die Region -- COUNT_CHECK prueft das exakt gegen die
// Gesamtzahl aller FAC_DATA-Quests. Wichtig fuer die client-seitige Seiten-
// suche (SEL='tbody tr, article, li' in gen-seo.mjs): jede Fraktion ist NUR
// h3 + p + div.tbl-wrap als flache Geschwister unter dem Region-<h2>, nicht in
// ein <article> oder <li> gepackt -- sonst zaehlt/filtert die Suche die Huelle
// statt der einzelnen Questzeilen (siehe Projektfalle "aeusserster Knoten
// gewinnt", exakt das Problem vom 22.08. bei patch-notes.html).
//
// Alle drei Verzweigungsebenen bekommen eine eigene Tabelle, AUCH die 7 von 53
// Fraktionen mit nur einer Quest (z.B. Beighen Tribe, House Wells). Eine
// Sonderbehandlung "ab N Quests keine eigene Tabelle" wuerde die Fraktion aus
// der Sprungnavigation/Suche unauffindbar machen bzw. eine zweite Markup-Form
// einfuehren, die die Eintragserkennung nur komplizierter macht -- die grosse
// Fraktion mit 10 Quests und die mit einer Quest sind hier bewusst strukturell
// gleich behandelt.
//
// Datenbesonderheiten (gemessen mit G:\Claude\Crimson-Wiki-SEO-NPCs-Fraktionen\
// fraktionen-explore.mjs am 26.08.2026):
//  - Alle 179 Quests haben trigger/prereq/reward vollstaendig belegt (keine
//    "—"/"-"/leeren Platzhalter) -- anders als hauptquests.mjs braucht dieses
//    Modul deshalb KEINE isReal()/cell()-Fallback-Logik, esc() genuegt direkt.
//  - overview ist bei allen 53 Fraktionen belegt (79-173 Zeichen).
//  - 41 von 53 Fraktionen tragen isNew:true. Das bedeutet "neu ins Wiki
//    aufgenommen", NICHT "neu im Spiel" -- Badge-Text ist deshalb bewusst
//    "Neu erfasst", nicht "NEU" (Verwechslungsgefahr mit Spielinhalt).
//  - conf ist bei 161 Quests "high", 15 "medium", 3 "low". Die Badge-Texte
//    "Quelle: teils belegt" (medium) / "Quelle: unsicher" (low) uebernehmen
//    woertlich die Formulierung aus facBadges() in index.html (dort schon
//    etabliert fuer denselben Datensatz) statt eigene Begriffe zu erfinden.
//  - miss:true kommt in FAC_DATA nicht vor (0 von 179) -- anders als bei den
//    Hauptquests gibt es hier keine "verpassbar"-Badges.
//  - Fraktions- und Questnamen sind ueber den gesamten Datensatz eindeutig
//    (keine Dubletten, gegengeprueft) -- rowId() kann sich darauf verlassen.
//  - Region "Pywel (regionsübergreifend)" haelt nur eine Fraktion (Hexen /
//    Witches, 5 Quests) -- kein Sonderfall im Code noetig, faellt einfach mit
//    einer Fraktion pro Region durch.
//
// ctx = { data: {...}, helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE, CRAFT_CDN } }

export const SLUG = "fraktionen";
export const NAV_LABEL = "Fraktionen";
// Kein eigener Tab-Deeplink moeglich (die App springt nur auf Sektions-Ebene);
// die App zeigt die Fraktionen als dritten Tab innerhalb von sec-quests
// (id="qt-fac"/"qp-fac"), genau wie hauptquests.mjs auf denselben Abschnitt zeigt.
export const DEEPLINK = "/#sec-quests";
export const SITEMAP = { pri: "0.8", freq: "monthly" };

// Nur Klassen, die es in SHARED_CSS noch nicht gibt. span.unsure ist Wort-fuer-
// Wort identisch mit der Definition in hauptquests.mjs (inkl. Zeilenumbruch),
// damit cssRules() in gen-seo.mjs die Regel dedupliziert statt sie doppelt
// auszuliefern.
export const EXTRA_CSS = `
span.unsure{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#1a1204;background:var(--amber)}
span.newfac{display:inline-block;margin-left:8px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#100c24;background:var(--violet)}
p.fac-overview{margin:0 0 10px;color:var(--ink-dim);max-width:75ch}
td.q-cell{min-width:200px}
`.trim();

// Der Vollstaendigkeitstest muss exakt das zaehlen, was build() ausgibt: jede
// Fraktionsquest erzeugt genau eine <tr id="fr-...">-Zeile, ueber alle Regionen
// und Fraktionen hinweg.
export function COUNT_CHECK(ctx) {
  const FAC_DATA = ctx.data.FAC_DATA;
  return {
    regex: /<tr id="fr-/g,
    expected: FAC_DATA.regions.reduce(
      (n, r) => n + r.factions.reduce((m, f) => m + f.quests.length, 0), 0),
    label: "Fraktionsquest-Zeilen",
  };
}

// Datenmengen, die die redaktionellen Texte in scripts/seo-content/ per
// Platzhalter einsetzen. Einzige Quelle ist die Datenstruktur selbst.
export function ZAHLEN(ctx) {
  const { FAC_DATA } = ctx.data;
  const facs = FAC_DATA.regions.flatMap((r) => r.factions);
  const quests = facs.flatMap((f) => f.quests);
  return {
    anzahl: quests.length,
    fraktionen: facs.length,
    regionen: FAC_DATA.regions.length,
    neu: facs.filter((f) => f.isNew).length,
    unsicher: quests.filter((q) => q.conf === "medium" || q.conf === "low").length,
  };
}

export function build(ctx) {
  const { FAC_DATA } = ctx.data;
  const { esc, slug, breadcrumbLd } = ctx.helpers;
  const z = ZAHLEN(ctx);

  const rowId = (region, f, q) =>
    `fr-${slug(region.region)}-${slug(f.name)}-${slug(q.q)}`;

  const confTag = (q) =>
    q.conf === "medium" ? `<span class="unsure">Quelle: teils belegt</span>`
    : q.conf === "low" ? `<span class="unsure">Quelle: unsicher</span>`
    : "";

  const row = (region, f, q) => `<tr id="${esc(rowId(region, f, q))}">
<td class="q-cell">${esc(q.q)}${confTag(q)}</td>
<td>${esc(q.trigger)}</td>
<td>${esc(q.prereq)}</td>
<td>${esc(q.reward)}</td>
</tr>`;

  const facBlock = (region, f) => {
    const newTag = f.isNew ? `<span class="newfac">Neu erfasst</span>` : "";
    return `<h3>${esc(f.name)} (${f.quests.length})${newTag}</h3>
<p class="fac-overview">${esc(f.overview)}</p>
<div class="tbl-wrap"><table>
<thead><tr><th>Quest</th><th>Auslöser</th><th>Voraussetzung</th><th>Belohnung</th></tr></thead>
<tbody>${f.quests.map((q) => row(region, f, q)).join("\n")}</tbody>
</table></div>`;
  };

  const sections = FAC_DATA.regions.map((r) => {
    const rq = r.factions.reduce((n, f) => n + f.quests.length, 0);
    return `<h2>${esc(r.region)} (${rq})</h2>
${r.factions.map((f) => facBlock(r, f)).join("\n")}`;
  }).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Interaktive Fraktions-Übersicht in der App öffnen &rarr;</a>
<p class="note">In der App klappst du jede Fraktion einzeln auf und siehst zusätzlich das regionsübergreifende Liberation-Endgame-System (23 Forts, 13 Fraktionen), das hier nicht abgebildet ist.</p>
<p class="note">Bei ${z.unsicher} Quests ist die Quellenlage nur teilweise oder unsicher belegt; das steht direkt neben dem Questnamen. ${z.neu} der ${z.fraktionen} Fraktionen sind seit dem letzten großen Datenimport neu ins Wiki aufgenommen.</p>
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Fraktionen", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Fraktionsquests in Crimson Desert",
        numberOfItems: z.anzahl,
        itemListElement: FAC_DATA.regions.flatMap((r) => r.factions).flatMap((f) => f.quests)
          .map((q, i) => ({ "@type": "ListItem", position: i + 1, name: q.q })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${z.anzahl} Fraktionsquests in Crimson Desert: ${z.fraktionen} Fraktionen`,
    // Muss unter 175 Zeichen bleiben (Pruefung in scripts/verify-seo.mjs; die
    // erste Fassung lag mit 195 darueber). Bewusst knapp gehalten, damit auch
    // vierstellige Mengen noch hineinpassen.
    desc: `Alle Fraktionsquests von Crimson Desert: ${z.anzahl} Quests, ${z.fraktionen} Fraktionen, ${z.regionen} Regionen — mit Auslöser, Voraussetzung, Belohnung und der Freischalt-Bedingung jeder Fraktion.`,
    h1: `Alle ${z.anzahl} Fraktionsquests in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${z.anzahl} Fraktionsquests</strong> von Crimson Desert, aufgeteilt auf <strong>${z.fraktionen} Fraktionen</strong> in <strong>${z.regionen} Regionen</strong>: mit Auslöser, Voraussetzung und Belohnung siehst du auf einen Blick, wie du jede Fraktion überhaupt erst freischaltest.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Fraktionen",
    bodyHtml: body,
    jsonld,
  };
}

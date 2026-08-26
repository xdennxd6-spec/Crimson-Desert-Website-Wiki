// parts/patch-notes.mjs — Seite "Patch-Notes" (PATCHES, 32 Eintraege).
//
// Aufbau: CTA + Hinweis (wie jede Seite) -> je ein <h2> pro Patch in
// Veroeffentlichungsreihenfolge (neuester zuerst, so liegt PATCHES bereits vor),
// darunter eine Meta-Zeile, der Einordnungstext des Patches und je Kategorie
// ein <h3> mit einer <ul> der Einzelpunkte.
//
// ZWEI EIGENHEITEN, die man kennen muss:
//
// 1. Die Texte in `size` und in `features[].items` enthalten ABSICHTLICH
//    Markup (<b>, <em>, <span style=...>) und werden deshalb NICHT escaped.
//    Escapen wuerde sichtbare Tags auf die Seite schreiben. Nur `ver`, `date`
//    und `cat` sind reine Daten und laufen durch esc(). Die Texte stammen aus
//    dem Repo, nicht aus Nutzereingaben — dieselbe Vertrauensstufe wie die App.
//
// 2. Diese Texte referenzieren die Farbvariablen --gdim und --gold, die es nur
//    in index.html gibt, nicht im SHARED_CSS der SEO-Seiten. Ohne die beiden
//    Deklarationen unten faellt var() auf den geerbten Wert zurueck und die als
//    "Einordnung" gedachten Nebensaetze saehen aus wie normaler Text. Die Werte
//    sind 1:1 aus index.html uebernommen (Primaerthema), nicht geschaetzt.
//
// Bewusst KEIN <article> um einen Patch: die Seitensuche in gen-seo.mjs nimmt
// den AEUSSERSTEN Treffer aus 'tbody tr, article, li'. Mit <article> waere ein
// ganzer Patch ein Sucheintrag (32 Stueck), ohne sind es die 647 Einzelpunkte —
// und genau die will man auf einer Patch-Notes-Seite finden.

export const SLUG = "patch-notes";
export const NAV_LABEL = "Patch-Notes";
export const DEEPLINK = "/#sec-patches";
// Patches kommen laufend dazu, daher haeufigeres Crawl-Intervall als die
// statischen Datenseiten (die stehen auf monthly).
export const SITEMAP = { pri: "0.8", freq: "weekly" };

export const EXTRA_CSS = `
/* Aus index.html uebernommen: die Patch-Texte setzen diese beiden Variablen in
   inline-style-Attributen voraus. Fehlen sie, verliert die Einordnung ihre
   optische Absetzung. */
:root{--gold:#e0a35a;--gdim:#c78f4e}
p.pmeta{font-family:var(--f-mono);font-size:var(--fs-11-5);color:var(--ink-faint);
letter-spacing:.04em;margin:6px 0 0}
p.psize{font-size:13.5px;color:var(--ink-dim);background:var(--panel-2);border:1px solid var(--line);
border-radius:10px;padding:11px 14px;margin:10px 0 0}
h3.pcat{font-family:var(--f-mono);font-size:var(--fs-11-5);text-transform:uppercase;letter-spacing:.08em;
color:var(--gold);margin:16px 0 6px;padding-bottom:5px;border-bottom:1px solid var(--line)}
ul.plist{margin:0;padding-left:20px}
ul.plist li{margin:5px 0}
span.latest{display:inline-block;margin-left:8px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#160a08;background:var(--red)}
`.trim();

// Der Vollstaendigkeitstest zaehlt die Meta-Zeilen: build() gibt genau eine
// <p class="pmeta" id="patch-..."> je Patch aus, auch wenn `size` fehlt.
export function COUNT_CHECK(ctx) {
  return {
    regex: /<p class="pmeta" id="patch-/g,
    expected: ctx.data.PATCHES.length,
    label: "Patch-Meta-Zeilen",
  };
}

const zaehleKategorien = (PATCHES) =>
  PATCHES.reduce((n, p) => n + (p.features || []).length, 0);
const zaehlePunkte = (PATCHES) =>
  PATCHES.reduce((n, p) => n + (p.features || []).reduce((m, f) => m + f.items.length, 0), 0);

export function ZAHLEN(ctx) {
  const { PATCHES } = ctx.data;
  return {
    anzahl: PATCHES.length,
    punkte: zaehlePunkte(PATCHES),
    kategorien: zaehleKategorien(PATCHES),
  };
}

export function build(ctx) {
  const { PATCHES } = ctx.data;
  const { esc, slug, breadcrumbLd } = ctx.helpers;

  const punkte = zaehlePunkte(PATCHES);
  const neuester = PATCHES[0];
  const aeltester = PATCHES[PATCHES.length - 1];

  const sections = PATCHES.map((p, idx) => {
    const kats = p.features || [];
    const nPunkte = kats.reduce((m, f) => m + f.items.length, 0);
    const neuTag = idx === 0 ? `<span class="latest">aktuell</span>` : "";

    // ACHTUNG: p.size und f.items tragen bewusstes Markup -> nicht escapen.
    const sizeBlock = p.size ? `<p class="psize">${p.size}</p>` : "";

    const katBloecke = kats.map((f) => `<h3 class="pcat">${esc(f.cat)}</h3>
<ul class="plist">
${f.items.map((it) => `<li>${it}</li>`).join("\n")}
</ul>`).join("\n");

    return `<h2>Patch ${esc(p.ver)}${neuTag} (${esc(p.date)})</h2>
<p class="pmeta" id="patch-${esc(slug(p.ver))}">Veröffentlicht am ${esc(p.date)} &middot; ${nPunkte} ${nPunkte === 1 ? "Eintrag" : "Einträge"} in ${kats.length} ${kats.length === 1 ? "Kategorie" : "Kategorien"}</p>
${sizeBlock}
${katBloecke}`;
  }).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Patch-Archiv in der App öffnen &rarr;</a>
<p class="note">In der App filterst du das Patch-Archiv nach Version und springst von einem Patch direkt zu den betroffenen Bossen, Waffen und Quests.</p>
<p class="note">Die Einordnungen in gedämpfter Schrift stammen nicht aus den offiziellen Notes, sondern ordnen ein, was dort <em>nicht</em> steht — etwa fehlende Bedingungen oder Abweichungen zwischen deutscher und englischer Fassung.</p>
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Patch-Notes", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Patch-Notes zu Crimson Desert",
        numberOfItems: PATCHES.length,
        itemListElement: PATCHES.map((p, i) => ({
          "@type": "ListItem", position: i + 1, name: `Patch ${p.ver} (${p.date})`,
        })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Crimson Desert Patch Notes: alle ${PATCHES.length} Updates`,
    desc: `Alle ${PATCHES.length} Patches zu Crimson Desert von ${aeltester.ver} bis ${neuester.ver} auf einer Seite: ${punkte} einzelne Änderungen mit Datum, Kategorie und Einordnung dessen, was die Notes offenlassen.`,
    h1: `Crimson Desert Patch Notes: alle ${PATCHES.length} Updates`,
    lead: `Diese Seite sammelt alle <strong>${PATCHES.length} Patches</strong> zu Crimson Desert von <strong>${esc(aeltester.ver)}</strong> (${esc(aeltester.date)}) bis <strong>${esc(neuester.ver)}</strong> (${esc(neuester.date)}), insgesamt <strong>${punkte} einzelne Änderungen</strong>, jeweils nach Kategorie sortiert.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Patch-Notes",
    bodyHtml: body,
    jsonld,
  };
}

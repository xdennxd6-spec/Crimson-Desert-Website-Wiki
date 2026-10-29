// parts/patch-notes.mjs — Seite "Patch-Notes" (PATCHES, ein Abschnitt je Eintrag).
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
// ganzer Patch ein Sucheintrag, ohne ist es jeder einzelne Punkt —
// und genau die will man auf einer Patch-Notes-Seite finden.

// ── Umbau zum DLC (fest aktiv seit 29.10.2026) ────────────────────────────────
// Diese Seite ist die 2.x-Seite mit Block "Die wichtigsten Änderungen" oben und
// einer Einordnung "Was heißt das für dich?" je Patch; alle 1.x-Patches stehen auf
// der Archivseite /patch-notes-1 (scripts/seo-parts/patch-notes-1.mjs, fest in
// SEO_PARTS und NAV von gen-seo.mjs). Texte: scripts/seo-content/patch-notes-umbau.json.
// Rueckweg: UMBAU = false setzt die alte Einzelseite zurueck; dann aber auch
// patch-notes-1 aus SEO_PARTS/NAV, verify-seo, verify-nav und die Links in
// index.html (noscript, #guide-links) zuruecknehmen, sonst laufen die Gates rot.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Seit 29.10.2026 (DLC "Charting the Unknown", Patch 2.04.00) fest freigeschaltet;
// die Umgebungsvariable CD_PATCH_UMBAU wird nicht mehr gebraucht.
export const UMBAU = true;
const UMBAU_TEXT = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "seo-content", "patch-notes-umbau.json"), "utf8"));
  } catch { return { highlights: [], spieler: {} }; }
})();
const ist2x = (p) => /^2\./.test(p.ver);
// Welche Patches eine Seite zeigt: ohne Umbau alle, mit Umbau 2.x hier und 1.x im Archiv.
export const auswahl = (PATCHES, archiv = false) =>
  !UMBAU ? PATCHES : PATCHES.filter((p) => (archiv ? !ist2x(p) : ist2x(p)));
export const ARCHIV_SLUG = "patch-notes-1";

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
ul.plist li{margin:5px 0;overflow-wrap:anywhere}
p.pspieler{font-size:14px;color:var(--ink);border-left:3px solid var(--gold);padding:6px 0 6px 12px;margin:10px 0 0}
ul.phigh{margin:0;padding-left:20px}
ul.phigh li{margin:7px 0}
span.latest{display:inline-block;margin-left:8px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#160a08;background:var(--red)}
`.trim();

// Der Vollstaendigkeitstest zaehlt die Meta-Zeilen: build() gibt genau eine
// <p class="pmeta" id="patch-..."> je Patch aus, auch wenn `size` fehlt.
export function COUNT_CHECK(ctx) {
  return {
    regex: /<p class="pmeta" id="patch-/g,
    expected: auswahl(ctx.data.PATCHES).length,
    label: "Patch-Meta-Zeilen",
  };
}

const zaehleKategorien = (PATCHES) =>
  PATCHES.reduce((n, p) => n + (p.features || []).length, 0);
const zaehlePunkte = (PATCHES) =>
  PATCHES.reduce((n, p) => n + (p.features || []).reduce((m, f) => m + f.items.length, 0), 0);

// anzahl/punkte/kategorien = alle Patches (2.x und 1.x zusammen); *2x = was diese
// Seite zeigt; *1x = was im Patch-Archiv 1.x steht. Ohne Umbau sind die 2x-Werte = alle.
export function ZAHLEN(ctx) {
  const { PATCHES } = ctx.data;
  const neu = auswahl(PATCHES, false), alt = UMBAU ? auswahl(PATCHES, true) : [];
  return {
    anzahl: PATCHES.length,
    punkte: zaehlePunkte(PATCHES),
    kategorien: zaehleKategorien(PATCHES),
    anzahl2x: neu.length,
    punkte2x: zaehlePunkte(neu),
    kategorien2x: zaehleKategorien(neu),
    anzahl1x: alt.length,
  };
}

export function build(ctx) {
  return buildSeite(ctx, false);
}

// Einleitung im Umbau (ohne Umbau null -> Text aus intros.json wie bisher). Zahlen aus den Daten.
export function INTRO(ctx) {
  return introUmbau(ctx, false);
}
export function introUmbau(ctx, archiv) {
  if (!UMBAU) return null;
  const alle = ctx.data.PATCHES, neu = auswahl(alle, false), alt = auswahl(alle, true);
  return archiv
    ? `Dieses Archiv sammelt die ${alt.length} Patches von Crimson Desert vor dem Enhanced-Update, von ${alt[alt.length - 1].ver} bis ${alt[0].ver}. Jeder Eintrag nennt Datum und Kategorien, die großen Updates von 1.13 bis 1.18 ordnet ein Kasten zusätzlich für Spieler ein. Was danach kam, steht auf der Seite [[/patch-notes|Patch-Notes 2.x]].`
    : `Seit dem Enhanced-Update am ${neu[neu.length - 1].date} hat Pearl Abyss ${neu.length} Patches veröffentlicht. Oben findest du die wichtigsten Änderungen auf einen Blick, darunter jeden Patch mit den offiziellen Punkten und einem Kasten, was er für dich als Spieler bedeutet. Die ${alt.length} älteren Patches stehen im [[/${ARCHIV_SLUG}|Patch-Archiv 1.x]].`;
}

// Gemeinsamer Aufbau fuer die Hauptseite (archiv=false) und die 1.x-Archivseite (archiv=true).
export function buildSeite(ctx, archiv) {
  const ALLE = ctx.data.PATCHES;
  const PATCHES = auswahl(ALLE, archiv);
  const { esc, slug, breadcrumbLd } = ctx.helpers;
  const seitenSlug = archiv ? ARCHIV_SLUG : SLUG;
  const spieler = (p) => {
    const s = UMBAU && UMBAU_TEXT.spieler[p.ver];
    return s ? `<p class="pspieler"><b>Was heißt das für dich?</b> ${esc(s.replace(/^Für dich heißt das:\s*/, ""))}</p>` : "";
  };

  const punkte = zaehlePunkte(PATCHES);
  const neuester = PATCHES[0];
  const aeltester = PATCHES[PATCHES.length - 1];

  const sections = PATCHES.map((p, idx) => {
    const kats = p.features || [];
    const nPunkte = kats.reduce((m, f) => m + f.items.length, 0);
    const neuTag = idx === 0 && !archiv ? `<span class="latest">aktuell</span>` : "";

    // ACHTUNG: p.size und f.items tragen bewusstes Markup -> nicht escapen.
    const sizeBlock = p.size ? `<p class="psize">${p.size}</p>` : "";

    const katBloecke = kats.map((f) => `<h3 class="pcat">${esc(f.cat)}</h3>
<ul class="plist">
${f.items.map((it) => `<li>${it}</li>`).join("\n")}
</ul>`).join("\n");

    return `<h2>Patch ${esc(p.ver)}${neuTag} (${esc(p.date)})</h2>
<p class="pmeta" id="patch-${esc(slug(p.ver))}">Offizielle Notes vom ${esc(p.date)} &middot; ${nPunkte} ${nPunkte === 1 ? "Eintrag" : "Einträge"} in ${kats.length} ${kats.length === 1 ? "Kategorie" : "Kategorien"}</p>
${sizeBlock}
${spieler(p)}${katBloecke}`;
  }).join("\n");

  // Nur mit Umbau: Block "Die wichtigsten Änderungen" (Hauptseite).
  const highlights = UMBAU && !archiv && UMBAU_TEXT.highlights.length ? `
<h2>Die wichtigsten Änderungen</h2>
<ul class="phigh">
${UMBAU_TEXT.highlights.map((h) => {
    const ziel = (ist2x({ ver: h.ver }) ? "" : "/" + ARCHIV_SLUG) + "#patch-" + slug(h.ver);
    return `<li><a href="${esc(ziel)}">Patch ${esc(h.ver)}</a>: <b>${esc(h.titel)}.</b> ${esc(h.text)}</li>`;
  }).join("\n")}
</ul>` : "";
  // Kein eigener Querverweis-Hinweis mehr zwischen 2.x und 1.x: die Einleitung
  // (introUmbau) verlinkt auf beiden Seiten schon die jeweils andere, ein zweiter
  // Hinweis direkt darunter waere doppelt (Nachbesserung 30.10.2026).
  const querverweis = "";

  const body = `
<a class="cta" href="${DEEPLINK}">Patch-Archiv in der App öffnen &rarr;</a>
<p class="note">In der App filterst du das Patch-Archiv nach Version und springst von einem Patch direkt zu den betroffenen Bossen, Waffen und Quests.</p>
${querverweis}<p class="note">Die Einordnungen in gedämpfter Schrift stammen nicht aus den offiziellen Notes, sondern ordnen ein, was dort <em>nicht</em> steht — etwa fehlende Bedingungen oder Abweichungen zwischen deutscher und englischer Fassung.</p>${highlights}
${sections}`;

  const titel = !UMBAU
    ? `Crimson Desert Patch Notes: alle ${PATCHES.length} Updates`
    : archiv
      ? `Crimson Desert Patch Notes 1.x: Archiv aller ${PATCHES.length} Updates`
      : `Crimson Desert Patch Notes 2.x: alle Updates seit Enhanced`;
  const beschreibung = !UMBAU
    ? `Alle ${PATCHES.length} Patches zu Crimson Desert von ${aeltester.ver} bis ${neuester.ver} auf einer Seite: ${punkte} einzelne Änderungen mit Datum, Kategorie und Einordnung dessen, was die Notes offenlassen.`
    : archiv
      ? `Archiv der ${PATCHES.length} Patches von Crimson Desert vor Enhanced, ${aeltester.ver} bis ${neuester.ver}: ${punkte} Änderungen mit Datum, Kategorie und Einordnung der großen Updates.`
      : `Crimson Desert Patch Notes ab Enhanced (${aeltester.ver} bis ${neuester.ver}): die wichtigsten Änderungen vorab und zu jedem Patch, was er für dich als Spieler bedeutet.`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd(archiv ? "Patch-Archiv 1.x" : "Patch-Notes", seitenSlug),
      {
        "@type": "ItemList",
        name: archiv ? "Patch-Notes 1.x zu Crimson Desert" : UMBAU ? "Patch-Notes 2.x zu Crimson Desert" : "Alle Patch-Notes zu Crimson Desert",
        numberOfItems: PATCHES.length,
        itemListElement: PATCHES.map((p, i) => ({
          "@type": "ListItem", position: i + 1, name: `Patch ${p.ver} (${p.date})`,
        })),
      },
    ],
  };

  return {
    slugName: seitenSlug,
    title: titel,
    desc: beschreibung,
    h1: titel,
    lead: `Diese Seite sammelt ${UMBAU ? "" : "alle "}<strong>${PATCHES.length} Patches</strong> zu Crimson Desert von <strong>${esc(aeltester.ver)}</strong> (${esc(aeltester.date)}) bis <strong>${esc(neuester.ver)}</strong> (${esc(neuester.date)}), insgesamt <strong>${punkte} einzelne Änderungen</strong>, jeweils nach Kategorie sortiert.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: archiv ? "Patch-Archiv 1.x" : "Patch-Notes",
    bodyHtml: body,
    jsonld,
  };
}

// parts/hauptquests.mjs — Seite "Hauptquests" (MAIN_QUESTS, 14 Kapitel).
//
// Aufbau: CTA + Hinweis (wie jede Seite) -> Warnbox mit den verpassbaren
// Quests (vorgezogen, analog side-quests.mjs und trophaeen.mjs) -> je ein <h2>
// pro Kapitel in Spielreihenfolge, darunter eine Kopfzeile mit Boss,
// Freischaltung und Kapitelwarnung, dann eine Tabelle Questname/Ausloeser/
// Voraussetzung/Belohnung.
//
// Reihenfolge: MAIN_QUESTS steht in Spielreihenfolge (Prolog -> 1..12 ->
// Epilog). Anders als bei den Nebenquests wird NICHT nach Menge sortiert --
// bei einer Story ist die Reihenfolge selbst die Information.
//
// Datenbesonderheiten:
//  - Platzhalter fuer "kein Wert" ist der Halbgeviertstrich "—", nicht das
//    "–"/"-", das ctx.helpers.has() kennt. Deshalb eine eigene isReal()-Pruefung,
//    wortgleich zu side-quests.mjs.
//  - Die Kapitelfelder boss/warn/unlock sind entweder String oder null. Ohne
//    Null-Pruefung stuende "null" auf der Seite.
//  - 45 der Quests tragen conf:"medium". Das wird als Badge ausgewiesen statt
//    verschwiegen -- Projektregel: Unsicherheit markieren, nicht glaetten.

export const SLUG = "hauptquests";
export const NAV_LABEL = "Hauptquests";
export const DEEPLINK = "/#sec-quests";
export const SITEMAP = { pri: "0.8", freq: "monthly" };

// Nur Klassen, die es in SHARED_CSS noch nicht gibt. Wird an SHARED_CSS angehaengt.
export const EXTRA_CSS = `
span.miss{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#160a08;background:var(--red)}
span.unsure{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#1a1204;background:var(--amber)}
p.warn{font-size:13.5px;color:var(--ink);background:rgba(255,90,68,.09);border-left:3px solid var(--red);
border-radius:8px;padding:11px 14px;margin:14px 0 0}
p.chapmeta{font-size:13.5px;color:var(--ink-dim);background:var(--panel-2);border:1px solid var(--line);
border-radius:10px;padding:10px 13px;margin:10px 0 0}
p.chapmeta b{color:var(--ink-hi)}
.muted{color:var(--ink-faint)}
td.q-cell{min-width:200px}
`.trim();

// Der Vollstaendigkeitstest muss exakt das zaehlen, was build() ausgibt:
// jede Hauptquest erzeugt genau eine <tr id="mq-...">-Zeile.
export function COUNT_CHECK(ctx) {
  const MAIN_QUESTS = ctx.data.MAIN_QUESTS;
  return {
    regex: /<tr id="mq-/g,
    expected: MAIN_QUESTS.reduce((n, c) => n + c.quests.length, 0),
    label: "Hauptquest-Zeilen",
  };
}

const alleQuests = (MAIN_QUESTS) => MAIN_QUESTS.flatMap((c) => c.quests);

// Datenmengen, die die redaktionellen Texte in scripts/seo-content/ per
// Platzhalter einsetzen. Einzige Quelle ist die Datenstruktur selbst.
export function ZAHLEN(ctx) {
  const { MAIN_QUESTS } = ctx.data;
  const q = alleQuests(MAIN_QUESTS);
  return {
    anzahl: q.length,
    kapitel: MAIN_QUESTS.length,
    verpassbar: q.filter((x) => x.miss).length,
    unsicher: q.filter((x) => x.conf === "medium").length,
    bosse: MAIN_QUESTS.filter((c) => c.boss).length,
  };
}

export function build(ctx) {
  const { MAIN_QUESTS } = ctx.data;
  const { esc, slug, breadcrumbLd } = ctx.helpers;

  // "—" ist in dieser Datenstruktur der Platzhalter fuer "kein Wert";
  // ctx.helpers.has() kennt nur "–"/"-" und wuerde ihn als Wert durchlassen.
  const isReal = (v) => {
    const t = String(v == null ? "" : v).trim();
    return t !== "" && t !== "—" && t !== "–" && t !== "-";
  };
  const cell = (v) => (isReal(v) ? esc(v) : `<span class="muted">–</span>`);

  // Kapitelueberschrift: "Kapitel 3 — Howling Hill" bzw. "Prolog — Dead of
  // Night". abschnitteAuszeichnen() schneidet die Zaehlklammer am Ende fuer
  // die id ab, die Sprungmarke bleibt daher stabil, wenn Quests dazukommen.
  const kapTitel = (c) =>
    (/^\d+$/.test(String(c.ch)) ? `Kapitel ${c.ch}` : String(c.ch)) + `: ${c.name}`;

  const rowId = (c, q) => `mq-${slug(String(c.ch))}-${slug(q.q)}`;

  const row = (c, q) => {
    const missTag = q.miss ? `<span class="miss">verpassbar</span>` : "";
    const confTag = q.conf === "medium" ? `<span class="unsure">Quelle unsicher</span>` : "";
    const tip = isReal(q.tip) ? `<br><span class="muted">Tipp: ${esc(q.tip)}</span>` : "";
    return `<tr id="${esc(rowId(c, q))}">
<td class="q-cell">${esc(q.q)}${missTag}${confTag}</td>
<td>${cell(q.trigger)}</td>
<td>${cell(q.prereq)}</td>
<td>${cell(q.reward)}${tip}</td>
</tr>`;
  };

  const sections = MAIN_QUESTS.map((c) => {
    // boss/warn/unlock sind String ODER null — ohne Pruefung stuende "null" da.
    const meta = [];
    if (isReal(c.boss))   meta.push(`<b>Bosskampf:</b> ${esc(c.boss)}`);
    if (isReal(c.unlock)) meta.push(`<b>Schaltet frei:</b> ${esc(c.unlock)}`);
    const metaZeile = meta.length ? `<p class="chapmeta">${meta.join(" &middot; ")}</p>` : "";
    const warnZeile = isReal(c.warn) ? `<p class="warn">${esc(c.warn)}</p>` : "";

    return `<h2>${esc(kapTitel(c))} (${c.quests.length})</h2>
${metaZeile}
${warnZeile}
<div class="tbl-wrap"><table>
<thead><tr><th>Hauptquest</th><th>Auslöser</th><th>Voraussetzung</th><th>Belohnung</th></tr></thead>
<tbody>${c.quests.map((q) => row(c, q)).join("\n")}</tbody>
</table></div>`;
  }).join("\n");

  const q = alleQuests(MAIN_QUESTS);
  const missQ = MAIN_QUESTS.flatMap((c) => c.quests.filter((x) => x.miss).map((x) => ({ c, x })));
  const missList = missQ
    .map(({ c, x }) => `<a href="#${esc(rowId(c, x))}">${esc(x.q)}</a> <span class="muted">(${esc(kapTitel(c))})</span>`)
    .join(", ");
  const unsicher = q.filter((x) => x.conf === "medium").length;

  const body = `
<a class="cta" href="${DEEPLINK}">Interaktiven Kapitel-Guide mit Fortschritt öffnen &rarr;</a>
<p class="note">In der App hakst du jedes Kapitel ab, siehst deinen Story-Fortschritt und springst direkt zu den zugehörigen Bossen und Nebenquests.</p>
<p class="warn"><strong>${missQ.length} verpassbare Hauptquest-Inhalte:</strong> ${missList}. Diese lassen sich im laufenden Durchgang dauerhaft verpassen, erledige sie vor dem jeweiligen Kapitelabschluss.</p>
<p class="note">Bei ${unsicher} Quests ist die Quellenlage dünn; sie tragen den Hinweis „Quelle unsicher“ und sollten im Zweifel gegengeprüft werden.</p>
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Hauptquests", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Hauptquests in Crimson Desert",
        numberOfItems: q.length,
        itemListElement: q.map((x, i) => ({
          "@type": "ListItem", position: i + 1, name: x.q,
        })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${q.length} Hauptquests in Crimson Desert: Kapitel-Guide`,
    desc: `Alle ${q.length} Hauptquests von Crimson Desert in Spielreihenfolge: ${MAIN_QUESTS.length} Kapitel mit Auslöser, Voraussetzung, Belohnung, Bosskämpfen und ${missQ.length} verpassbaren Inhalten.`,
    h1: `Alle ${q.length} Hauptquests in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${q.length} Hauptquests</strong> von Crimson Desert in Spielreihenfolge, aufgeteilt auf <strong>${MAIN_QUESTS.length} Kapitel</strong>, jeweils mit Auslöser, Voraussetzung, Belohnung und dem Bosskampf des Kapitels.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Hauptquests",
    bodyHtml: body,
    jsonld,
  };
}

// parts/side-quests.mjs — Seite "Nebenquests" (SIDE_QUESTS, 78 Eintraege).
//
// Aufbau: CTA + Hinweis (wie jede Seite) -> Warnbox mit den 6 verpassbaren
// Quests (zusaetzlich vorgezogen, analog zu trophaeen.mjs bei verpassbaren
// Trophaeen) -> je ein <h2> pro Region (6 Werte), absteigend nach Anzahl
// Quests sortiert, darunter eine Tabelle Questname/Ausloeser/Voraussetzung/
// Belohnung. Die 6 "special"-Eintraege (Sigil-Mount-System) tragen zusaetzlich
// mount/boss/craft; Boss-Strategie und Craft-Kette sind lang (mehrere Saetze)
// und werden ueber <details class="boss-alt"> eingeklappt (dieselbe JS-freie
// Aufklapp-Technik, die gen-seo.mjs fuer BOSS_ALT_IMGS nutzt) statt die Zeile
// zu sprengen — nichts wird dabei gekuerzt, nur standardmaessig eingeklappt.
//
// Datenbesonderheit: Platzhalter fuer "kein Wert" sind in SIDE_QUESTS ein
// Halbgeviertstrich "—" (nicht das "–"/"-", das ctx.helpers.has() erkennt).
// Deshalb definiert dieses Modul eine eigene isReal()-Pruefung statt has().

export const SLUG = "side-quests";
export const NAV_LABEL = "Nebenquests";
export const DEEPLINK = "/#sec-quests";
export const SITEMAP = { pri: "0.8", freq: "monthly" };

// Nur Klassen, die es in SHARED_CSS noch nicht gibt. Wird an SHARED_CSS angehaengt.
export const EXTRA_CSS = `
span.miss{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#160a08;background:var(--red)}
span.sys{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#0d0b1a;background:var(--violet)}
p.warn{font-size:13.5px;color:var(--ink);background:rgba(255,90,68,.09);border-left:3px solid var(--red);
border-radius:8px;padding:11px 14px;margin:14px 0 0}
.muted{color:var(--ink-faint)}
td.q-cell{min-width:200px}
`.trim();

// Der Vollstaendigkeitstest muss exakt das zaehlen, was build() ausgibt:
// jede Nebenquest erzeugt genau eine <tr id="sq-...">-Zeile.
export function COUNT_CHECK(ctx) {
  return {
    regex: /<tr id="sq-/g,
    expected: ctx.data.SIDE_QUESTS.length,
    label: "Nebenquest-Zeilen",
  };
}

// Regionen absteigend nach Anzahl Quests (Hernand ist der groesste Hub zuerst).
function regionsByCount(SIDE_QUESTS) {
  const counts = {};
  for (const q of SIDE_QUESTS) counts[q.region] = (counts[q.region] || 0) + 1;
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b, "de"));
}

// Datenmengen, die die redaktionellen Texte in scripts/seo-content/ per
// Platzhalter einsetzen ({{name}} = Ziffer, {{name|wort}} = ausgeschrieben).
// Einzige Quelle fuer diese Zahlen ist die Datenstruktur selbst — nie ein
// fest verdrahteter Wert im Text. Siehe zahlenEinsetzen() in gen-seo.mjs.
export function ZAHLEN(ctx) {
  const { SIDE_QUESTS } = ctx.data;
  return {
    anzahl: SIDE_QUESTS.length,
    verpassbar: SIDE_QUESTS.filter((q) => q.miss).length,
    regionen: regionsByCount(SIDE_QUESTS).length,
  };
}

export function build(ctx) {
  const { SIDE_QUESTS } = ctx.data;
  const { esc, slug, breadcrumbLd } = ctx.helpers;

  // "—" (Halbgeviertstrich) ist in dieser Datenstruktur der Platzhalter fuer
  // "kein Wert" — ctx.helpers.has() prueft nur "–"/"-" und wuerde ihn als
  // vorhanden werten, daher eine eigene, auf diese Daten passende Pruefung.
  const isReal = (v) => {
    const t = String(v == null ? "" : v).trim();
    return t !== "" && t !== "—" && t !== "–" && t !== "-";
  };
  const cell = (v) => (isReal(v) ? esc(v) : `<span class="muted">–</span>`);
  const rowId = (q) => `sq-${slug(q.region)}-${slug(q.q)}`;

  const row = (q) => {
    const missTag = q.miss ? `<span class="miss">verpassbar</span>` : "";
    const sysTag = isReal(q.special) ? `<span class="sys">${esc(q.special)}</span>` : "";

    let bonus = "";
    if (isReal(q.mount)) {
      bonus += `<br><span class="muted">Mount: ${esc(q.mount)}</span>`;
    }
    if (isReal(q.boss) || isReal(q.craft)) {
      bonus += `
<details class="boss-alt">
<summary><span class="alt-on">Boss-Kampf &amp; Crafting anzeigen</span><span class="alt-off">Boss-Kampf &amp; Crafting verbergen</span></summary>
${isReal(q.boss) ? `<p>${esc(q.boss)}</p>` : ""}
${isReal(q.craft) ? `<p>${esc(q.craft)}</p>` : ""}
</details>`;
    }
    const tip = isReal(q.tip) ? `<br><span class="muted">Tipp: ${esc(q.tip)}</span>` : "";

    return `<tr id="${esc(rowId(q))}">
<td class="q-cell">${esc(q.q)}${missTag}${sysTag}</td>
<td>${cell(q.trigger)}</td>
<td>${cell(q.prereq)}</td>
<td>${cell(q.reward)}${bonus}${tip}</td>
</tr>`;
  };

  const regions = regionsByCount(SIDE_QUESTS);
  const sections = regions.map((r) => {
    const items = SIDE_QUESTS.filter((q) => q.region === r)
      .sort((a, b) => a.q.localeCompare(b.q, "de"));
    return `<h2>${esc(r)} (${items.length})</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Nebenquest</th><th>Auslöser</th><th>Voraussetzung</th><th>Belohnung</th></tr></thead>
<tbody>${items.map(row).join("\n")}</tbody>
</table></div>`;
  }).join("\n");

  const missCount = SIDE_QUESTS.filter((q) => q.miss).length;
  const missList = SIDE_QUESTS.filter((q) => q.miss)
    .map((q) => `<a href="#${esc(rowId(q))}">${esc(q.q)}</a> <span class="muted">(${esc(q.region)})</span>`)
    .join(", ");

  const body = `
<a class="cta" href="${DEEPLINK}">Interaktive Nebenquest-Liste mit Fortschritt öffnen &rarr;</a>
<p class="note">In der App hakst du jede Nebenquest ab, siehst deinen Fortschritt je Region und kannst alle Haken auf einmal zurücksetzen.</p>
<p class="warn"><strong>${missCount} verpassbare Nebenquests:</strong> ${missList}. Diese Quests lassen sich im laufenden Spieldurchgang dauerhaft verpassen, erledige sie vor dem jeweiligen Story- oder Regionsabschluss.</p>
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Nebenquests", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Nebenquests in Crimson Desert",
        numberOfItems: SIDE_QUESTS.length,
        itemListElement: SIDE_QUESTS.map((q, i) => ({
          "@type": "ListItem", position: i + 1, name: q.q,
        })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${SIDE_QUESTS.length} Nebenquests in Crimson Desert: Guide & Belohnungen`,
    desc: `Alle ${SIDE_QUESTS.length} Nebenquests in Crimson Desert im Überblick: nach Region sortiert, mit Auslöser, Voraussetzung, Belohnung und ${missCount} verpassbaren Quests als Warnhinweis.`,
    h1: `Alle ${SIDE_QUESTS.length} Nebenquests in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${SIDE_QUESTS.length} Nebenquests</strong> von Crimson Desert nach Region sortiert, jeweils mit Auslöser, Voraussetzung und Belohnung. <strong>${missCount} davon sind verpassbar</strong> und sollten vor dem jeweiligen Regionsabschluss erledigt werden.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Nebenquests",
    bodyHtml: body,
    jsonld,
  };
}

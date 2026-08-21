// REFERENZMODUL — Vorlage fuer alle weiteren SEO-Seitenmodule.
//
// Vertrag eines Moduls:
//   SLUG        string   URL-Pfad ohne Slash, zugleich Dateiname (<slug>.html)
//   NAV_LABEL   string   Beschriftung im Kopf-Menue
//   DEEPLINK    string   Sprungziel in die interaktive App, Form "/#sec-..."
//   SITEMAP     object   { pri, freq } fuer sitemap.xml
//   EXTRA_CSS   string   zusaetzliche CSS-Regeln, leer lassen wenn keine noetig
//   COUNT_CHECK fn(ctx)  { regex, expected, label } fuer den Vollstaendigkeitstest
//   build(ctx)  fn       liefert das Objekt fuer pageShell()
//
// ctx = { data: {...alle Datenstrukturen...}, helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE, CRAFT_CDN } }

export const SLUG = "trophaeen";
export const NAV_LABEL = "Trophäen";
export const DEEPLINK = "/#sec-achievements";
export const SITEMAP = { pri: "0.8", freq: "monthly" };

// Nur Klassen, die es in SHARED_CSS noch nicht gibt. Wird an SHARED_CSS angehaengt.
export const EXTRA_CSS = `
td.grade{font-family:var(--f-mono);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap}
span.miss{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#160a08;background:var(--red)}
p.warn{font-size:13.5px;color:var(--ink);background:rgba(255,90,68,.09);border-left:3px solid var(--red);
border-radius:8px;padding:11px 14px;margin:14px 0 0}
span.tr-when{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);
font-size:10px;font-weight:700;letter-spacing:.04em;color:var(--ink-dim);border:1px solid var(--line);white-space:nowrap}
p.tr-how{margin:7px 0 0;font-size:13.5px;color:var(--ink-dim);max-width:70ch}
p.tr-acht{margin:5px 0 0;font-size:13px;color:var(--ink);border-left:2px solid var(--red);padding-left:9px;max-width:70ch}
`.trim();

// Der Vollstaendigkeitstest muss exakt das zaehlen, was build() ausgibt.
export function COUNT_CHECK(ctx) {
  return {
    regex: /<tr>\s*<td/g,
    expected: ctx.data.TROPHIES.length,
    label: "Trophäen-Zeilen",
  };
}

// Reihenfolge der Wertigkeiten, wertvollste zuerst
const GRADE_ORDER = ["platinum", "gold", "silver", "bronze"];

// Wann eine Trophaee sinnvollerweise angegangen wird. Die Rohwerte stammen aus
// scripts/seo-content/trophaeen.json und sind bewusst ASCII, damit die Datei
// unabhaengig von der Zeichenkodierung der Lieferung bleibt.
const ZEITPUNKT_LABEL = {
  frueh: "früh im Spiel",
  mitte: "Spielmitte",
  spaet: "spät im Spiel",
  "nach Abspann": "nach dem Abspann",
};

// Datenmengen, die die redaktionellen Texte in scripts/seo-content/ per
// Platzhalter einsetzen ({{name}} = Ziffer, {{name|wort}} = ausgeschrieben).
// Einzige Quelle fuer diese Zahlen ist die Datenstruktur selbst — nie ein
// fest verdrahteter Wert im Text. Siehe zahlenEinsetzen() in gen-seo.mjs.
export function ZAHLEN(ctx) {
  const { TROPHIES } = ctx.data;
  const je = (g) => TROPHIES.filter((t) => t.grade === g).length;
  return {
    anzahl: TROPHIES.length,
    verpassbar: TROPHIES.filter((t) => t.miss).length,
    // "alle uebrigen Trophaeen" in der Platin-Anleitung: alles ausser Platin selbst.
    uebrige: TROPHIES.length - 1,
    platin: je("platinum"), gold: je("gold"), silber: je("silver"), bronze: je("bronze"),
  };
}

export function build(ctx) {
  const { TROPHIES, TROPHY_GRADES } = ctx.data;
  const { esc, has, breadcrumbLd, SITE } = ctx.helpers;

  // Freischalt-Anleitungen, nach Trophaeenname indiziert. Fehlt die Datei, bleibt
  // die Map leer und die Seite rendert exakt wie vorher — kein Build-Abbruch.
  const roh = (ctx.content && ctx.content.trophaeen) || [];
  const anleitungen = new Map(
    (Array.isArray(roh) ? roh : []).filter((a) => a && a.name).map((a) => [a.name, a])
  );

  const missCount = TROPHIES.filter((t) => t.miss).length;

  // Eine Zeile pro Trophaee. Das sec-Feld verweist auf die passende Wiki-Sektion
  // und wird zur internen Verlinkung genutzt (gut fuer Crawler und Nutzer).
  const row = (t) => {
    const g = TROPHY_GRADES[t.grade] || { ico: "", lbl: t.grade, col: "var(--ink)" };
    const missTag = t.miss ? `<span class="miss">verpassbar</span>` : "";
    const link = has(t.sec)
      ? ` <a href="/#sec-${esc(t.sec)}">Details im Wiki</a>`
      : "";
    const tip = has(t.tip) ? `<br><span class="muted">Tipp: ${esc(t.tip)}</span>` : "";

    // Redaktioneller Zusatz: der konkrete Weg zur Trophaee. Steht bewusst unter
    // der knappen Bedingung, damit die Tabelle ueberfliegbar bleibt.
    const a = anleitungen.get(t.name);
    const when = a && ZEITPUNKT_LABEL[a.zeitpunkt]
      ? `<span class="tr-when">${esc(ZEITPUNKT_LABEL[a.zeitpunkt])}</span>` : "";
    const how = a && has(a.anleitung)
      ? `<p class="tr-how"><strong>So gehst du vor:</strong> ${esc(a.anleitung)}</p>` : "";
    const acht = a && has(a.achtung)
      ? `<p class="tr-acht"><strong>Achtung:</strong> ${esc(a.achtung)}</p>` : "";

    return `<tr>
<td class="grade" style="color:${esc(g.col)}">${esc(g.ico)} ${esc(g.lbl)}</td>
<td><strong>${esc(t.name)}</strong>${missTag}${when}</td>
<td>${esc(t.desc)}${link}${tip}${how}${acht}</td>
</tr>`;
  };

  const sections = GRADE_ORDER
    .filter((g) => TROPHIES.some((t) => t.grade === g))
    .map((g) => {
      const items = TROPHIES.filter((t) => t.grade === g)
        .sort((a, b) => a.name.localeCompare(b.name, "de"));
      const meta = TROPHY_GRADES[g] || { lbl: g, ico: "" };
      return `<h2>${esc(meta.ico)} ${esc(meta.lbl)} (${items.length})</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Wertung</th><th>Trophäe</th><th>Bedingung</th></tr></thead>
<tbody>${items.map(row).join("\n")}</tbody>
</table></div>`;
    }).join("\n");

  const missList = TROPHIES.filter((t) => t.miss)
    .map((t) => esc(t.name)).join(", ");

  const body = `
<a class="cta" href="${DEEPLINK}">Interaktive Trophäen-Liste mit Fortschritt öffnen &rarr;</a>
<p class="note">In der App hakst du jede Trophäe ab, filterst nach Wertung und siehst deinen Platin-Fortschritt in Prozent.</p>
${missCount ? `<p class="warn"><strong>${missCount} verpassbare Trophäen:</strong> ${missList}. Diese lassen sich in einem laufenden Spieldurchgang unwiederbringlich verlieren. Prüfe sie, bevor du das jeweilige Kapitel abschließt.</p>` : ""}
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Trophäen", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Trophäen in Crimson Desert",
        numberOfItems: TROPHIES.length,
        itemListElement: TROPHIES.map((t, i) => ({
          "@type": "ListItem", position: i + 1, name: t.name,
        })),
      },
    ],
  };

  // Titel, Beschreibung und Lead sagen nur dann Anleitungen zu, wenn welche
  // vorliegen. Fehlt die Inhaltsdatei, beschreibt die Seite sich wieder als
  // reine Bedingungsliste, statt etwas zu versprechen, was nicht da steht.
  const nHow = TROPHIES.filter((t) => anleitungen.has(t.name)).length;
  const desc = nHow
    ? `Alle ${TROPHIES.length} Trophäen in Crimson Desert mit Freischaltbedingung, Anleitung und empfohlenem Zeitpunkt, sortiert nach Wertung, samt Warnung vor den ${missCount} verpassbaren.`
    : `Alle ${TROPHIES.length} Trophäen in Crimson Desert nach Platin, Gold, Silber und Bronze sortiert, jeweils mit Freischaltbedingung und Warnung vor den ${missCount} verpassbaren Erfolgen.`;
  const leadHow = nHow === TROPHIES.length
    ? " Zu jeder Trophäe steht eine konkrete Anleitung samt empfohlenem Zeitpunkt."
    : nHow ? ` Zu ${nHow} davon steht eine konkrete Anleitung samt empfohlenem Zeitpunkt.` : "";

  return {
    slugName: SLUG,
    title: `Alle ${TROPHIES.length} Trophäen in Crimson Desert & Platin-Guide`,
    desc,
    h1: `Alle ${TROPHIES.length} Trophäen in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${TROPHIES.length} Trophäen</strong> von Crimson Desert, sortiert nach Wertung, jeweils mit der genauen Freischaltbedingung.${leadHow} <strong>${missCount} davon sind verpassbar</strong> und sollten früh eingeplant werden.`,
    ogImage: "cd_assets/bosses/umbra-final.jpg",
    crumb: "Trophäen",
    bodyHtml: body,
    jsonld,
  };
}

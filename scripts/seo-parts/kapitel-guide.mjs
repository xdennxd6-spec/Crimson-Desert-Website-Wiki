// SEO-Seitenmodul: Kapitel-Guide (CHAPTERS, dazu CH_REGION fuer die Region).
//
// Datenform (Stand 07.10.2026, per node inspiziert): CHAPTERS hat 13 Eintraege
// {num, title, boss, items, missable, tip}. num ist bei den ersten zwoelf eine Zahl (1 bis 12),
// beim letzten der String "Epilog". Der Prolog ist KEIN eigener Eintrag: Kapitel 1 traegt den
// Titel "Prolog und Erste Begegnung". MAIN_QUESTS (Hauptquest-Seite) fuehrt dagegen Prolog,
// 1 bis 12 und Epilog als 14 Abschnitte. Die Seite benennt das offen, damit die Kapitelzahl
// eindeutig bleibt (siehe FAQ).
//
// Titelformat in den Daten: "Deutscher Titel (English Title)". Der englische Teil steht in der
// Klammer am Ende (bei Kapitel 1 "Dead of Night / The First Encounter"). Die <h2> zeigt
// "Kapitel N: Deutscher Titel"; der englische Titel steht als eigene Zeile in der Karte.
// Beim Epilog besteht der deutsche Titel nur aus "Epilog", dort lautet die Ueberschrift
// "Epilog: Journey's End".
//
// Sonderfaelle in den Feldern:
//  - boss beim Epilog beginnt mit einem Gedankenstrich ("– (laut den Missionsbeschreibungen ...)"),
//    er steht fuer "kein Boss" und wird als "Kein Boss (...)" ausgegeben.
//  - missable ist meist leer; Kapitel 8 beginnt mit "— (Brass Rose Rapier ... nicht missable ...)",
//    d. h. dort ist ausdruecklich NICHTS verpassbar. Das wird als neutraler Hinweis ausgegeben,
//    nicht als Warnung. Als verpassbar zaehlen nur Kapitel mit echtem Text (Stand 07.10.2026: 3).
//  - Region: CH_REGION[<num>] = {region, conf}. conf "high" wird ohne Zusatz gezeigt, "medium"
//    mit Vermerk "Zuordnung weniger sicher", bei "low"/region null entfaellt die Zeile (gleiche
//    Regel wie chapAccent() in index.html).
//
// IDs: <article class="card" id="kap-<slug(num)>"> (kap-1 ... kap-12, kap-epilog).

export const SLUG = "kapitel-guide";
export const NAV_LABEL = "Kapitel-Guide";
export const DEEPLINK = "/#sec-chapters";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

// Nur eigene Klassen mit Praefix "kg-". Keine At-Regeln.
export const EXTRA_CSS = `
div.kg-list{display:flex;flex-direction:column;gap:14px;margin-top:12px}
p.kg-en{margin:0;font-family:var(--f-mono);font-size:var(--fs-11-5);color:var(--ink-faint);text-transform:none}
p.kg-miss{margin:4px 0 0;font-size:13px;color:var(--ink);background:rgba(255,90,68,.09);border-left:3px solid var(--red);border-radius:8px;padding:8px 11px}
p.kg-hint{margin:4px 0 0;font-size:13px;color:var(--ink-dim);background:rgba(198,204,236,.05);border-left:3px solid var(--line-strong);border-radius:8px;padding:8px 11px}
span.kg-unsure{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#1a1204;background:var(--amber)}
p.kg-spoiler{font-size:13.5px;color:var(--ink-dim);max-width:78ch;margin:12px 0 0}
`.trim();

let _cache = null;
function daten(ctx) {
  if (_cache) return _cache;
  const { extract } = ctx.helpers;
  _cache = { chapters: extract("CHAPTERS"), region: extract("CH_REGION"), mq: extract("MAIN_QUESTS") };
  return _cache;
}

const istEpilog = (c) => typeof c.num !== "number";
// "—"/"–" am Anfang = Platzhalter fuer "nichts"
const dashStart = (t) => /^\s*[—–-]/.test(String(t || ""));
const hatVerpassbares = (c) => !!(c.missable && String(c.missable).trim() && !dashStart(c.missable));

export function COUNT_CHECK(ctx) {
  return { regex: /<article class="card" id="kap-/g, expected: daten(ctx).chapters.length, label: "Kapitel-Karten" };
}

export function ZAHLEN(ctx) {
  const { chapters, mq } = daten(ctx);
  return {
    kapitel: chapters.filter((c) => !istEpilog(c)).length,
    gesamt: chapters.length,
    hq: mq.length,
    verpassbar: chapters.filter(hatVerpassbares).length,
  };
}

// Teilt "Deutscher Titel (English Title)" in {de, en}. Nur eine abschliessende Klammer zaehlt.
function titelTeile(title) {
  const m = /^(.*?)\s*\(([^()]+)\)\s*$/.exec(title);
  return m ? { de: m[1].trim(), en: m[2].trim() } : { de: title.trim(), en: "" };
}

// "– (text)" oder "— (text)" -> "<Ersatz> (text)"; Text ohne Strichanfang bleibt unveraendert.
function ohneDash(t, ersatz) {
  const s = String(t).trim();
  if (!dashStart(s)) return s;
  const rest = s.replace(/^[—–-]\s*/, "");
  return rest ? `${ersatz} ${rest}` : ersatz;
}

export function build(ctx) {
  const { esc, has, slug, breadcrumbLd } = ctx.helpers;
  const d = daten(ctx);
  const z = ZAHLEN(ctx);

  const heading = (c) => {
    const { de, en } = titelTeile(c.title);
    return istEpilog(c) ? `Epilog: ${en || de}` : `Kapitel ${c.num}: ${de}`;
  };

  const regionLi = (c) => {
    const r = d.region[String(c.num)];
    if (!r || !r.region || r.conf === "low") return "";
    const tag = r.conf === "medium" ? ' <span class="kg-unsure">Zuordnung weniger sicher</span>' : "";
    return `<li><b>Region:</b> ${esc(r.region)}${tag}</li>`;
  };

  const card = (c) => {
    const { en } = titelTeile(c.title);
    const lis = [
      regionLi(c),
      has(c.boss) ? `<li><b>Boss:</b> ${esc(ohneDash(c.boss, "Kein Boss"))}</li>` : "",
      has(c.items) ? `<li><b>Key Items:</b> ${esc(c.items)}</li>` : "",
    ].join("");
    let miss = "";
    if (c.missable && String(c.missable).trim()) {
      miss = hatVerpassbares(c)
        ? `<p class="kg-miss"><b>Verpassbar:</b> ${esc(c.missable)}</p>`
        : `<p class="kg-hint"><b>Verpassbares:</b> ${esc(ohneDash(c.missable, "Nichts Verpassbares"))}</p>`;
    }
    const tipp = has(c.tip) ? `<p class="strat"><b>Tipp:</b> ${esc(c.tip)}</p>` : "";
    return `<article class="card" id="kap-${slug(c.num)}">
<p class="kg-en">${istEpilog(c) ? "Epilog" : `Kapitel ${esc(c.num)}`}${en ? ` · Englischer Titel: ${esc(en)}` : ""}</p>
<ul class="stats">${lis}</ul>
${miss}${tipp}
</article>`;
  };

  const abschnitte = d.chapters.map((c) => `<h2>${esc(heading(c))}</h2>
<div class="kg-list">${card(c)}</div>`).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Kapitel-Guide mit Fortschritts-Tracking in der App öffnen &rarr;</a>
<p class="note">In der App kannst du jedes Kapitel als abgeschlossen markieren und so deinen Story-Fortschritt abhaken.</p>
<p class="note">Alle einzelnen Quests der Kapitel stehen in den <a href="/hauptquests">Hauptquests</a>, die Bosse mit Werten und Taktik in der <a href="/bosse">Bossliste</a>.</p>
<p class="kg-spoiler">Spoiler-Hinweis: Die Karten nennen Bosse, Belohnungen und Story-Ereignisse der jeweiligen Kapitel. Der Prolog gehört in diesem Guide zum ersten Kapitel; die Hauptquest-Liste führt ihn dagegen als eigenen Abschnitt, daher zählt sie ${z.hq} Abschnitte.</p>
${abschnitte}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Kapitel-Guide", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Kapitel der Story von Crimson Desert",
        numberOfItems: d.chapters.length,
        itemListElement: d.chapters.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: heading(c) })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${z.kapitel} Kapitel in Crimson Desert: Übersicht & Guide`,
    desc: `Alle ${z.kapitel} Kapitel von Crimson Desert plus Epilog im Überblick: Region, Bosse, Key Items, verpassbare Inhalte und ein Tipp zu jedem Story-Kapitel. Deutscher Guide.`,
    h1: `Alle ${z.kapitel} Kapitel in Crimson Desert: Übersicht der Story`,
    lead: `Crimson Desert hat laut Wiki-Daten <strong>${z.kapitel} nummerierte Kapitel</strong> plus einen <strong>Epilog</strong>. Diese Übersicht führt jedes Kapitel mit Titel, Region, Boss, Key Items, Verpassbarem und Tipp auf. Der Prolog gehört zum ersten Kapitel.`,
    ogImage: null,
    crumb: "Kapitel-Guide",
    bodyHtml: body,
    jsonld,
  };
}

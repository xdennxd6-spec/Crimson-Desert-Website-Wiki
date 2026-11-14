// SEO-Seitenmodul "Karte" (14.11.2026): eigene Weltkarte von Pywel aus den Spieldaten.
//
// Datenquelle: data/d17-weltkarte.js (WELTKARTE, WELT_ORTE). Dieselben Daten zeigt die App auf der Seite sec-map
// (Renderer data/d17-weltkarte-app.js, Kacheln cd_assets/weltkarte/{z}/{x}/{y}.webp). Erzeugt werden die Daten von
// F:\Claude\Crimson-Desert-Datamining\karte-kacheln\wiki_daten.py (Ortsnamen DE/EN aus den Spieldaten, Lage per Georeferenz).
//
// Zaehlung: je Ort ein Listeneintrag <li id="ort-<slug>"> (Soll = WELT_ORTE.length). Jeder Eintrag verlinkt mit
// /#sec=map&ort=<slug> direkt auf den Ort in der Karte.

export const SLUG = "karte";
export const NAV_LABEL = "Karte";
export const DEEPLINK = "/#sec-map";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
.wk-bild{display:block;width:100%;max-width:760px;height:auto;margin:14px 0 6px;border-radius:12px;border:1px solid var(--line)}
ul.wk-orte{columns:3 230px;column-gap:24px;list-style:none;margin:10px 0 0;padding:0;font-size:14px}
ul.wk-orte li{break-inside:avoid;padding:3px 0}
ul.wk-orte li small{color:var(--ink-faint)}
h3.wk-bu{margin:18px 0 4px;color:var(--amber)}
`.trim();

function lade(ctx) {
  const x = ctx.helpers.extract;
  return { M: x("WELTKARTE"), O: x("WELT_ORTE") };
}

export function ZAHLEN(ctx) {
  const { M, O } = lade(ctx);
  return { orte: O.length, zoom: M.zmax + 1 };
}

export function COUNT_CHECK(ctx) {
  return { regex: /<li id="ort-/g, expected: lade(ctx).O.length, label: "Orte" };
}

export function build(ctx) {
  const { esc, breadcrumbLd } = ctx.helpers;
  const { O } = lade(ctx);
  const z = ZAHLEN(ctx);
  const ids = O.map((o) => o[0]);
  if (new Set(ids).size !== ids.length) throw new Error("karte.mjs: doppelter Ort-Slug");

  // Buchstabengruppen nach dem deutschen Namen
  const gruppen = new Map();
  for (const o of O) {
    const b = o[3].normalize("NFKD").replace(/[\u0300-\u036f]/g, "").charAt(0).toUpperCase();
    const k = /[A-Z]/.test(b) ? b : "#";
    if (!gruppen.has(k)) gruppen.set(k, []);
    gruppen.get(k).push(o);
  }
  const liste = [...gruppen.entries()].map(([b, l]) => `<h3 class="wk-bu">${esc(b)}</h3>
<ul class="wk-orte">${l.map((o) => `<li id="ort-${esc(o[0])}"><a href="/#sec=map&amp;ort=${esc(o[0])}">${esc(o[3])}</a>${o[4] !== o[3] ? ` <small>${esc(o[4])}</small>` : ""}</li>`).join("")}</ul>`).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Weltkarte interaktiv öffnen &rarr;</a>
<img class="wk-bild" src="/cd_assets/weltkarte/pywel-uebersicht.webp" width="1200" height="1238" loading="lazy" alt="Weltkarte von Pywel aus Crimson Desert, selbst erstellt aus den Spieldaten">
<p class="note">Übersicht der Karte. In der App zoomst du bis auf einzelne Wege und Bachläufe heran, suchst Orte nach deutschem oder englischem Namen und blendest die Ortsnamen ein oder aus.</p>
<h2>So ist die Karte entstanden</h2>
<p>Die Karte ist kein Screenshot und keine Kopie einer anderen Kartenseite. Das Wiki liest die Kartentexturen direkt aus den Spieldateien (Stand Patch ${esc(lade(ctx).M.patch)}): Küstenlinien, Flüsse, Seen, Gebirge, Straßen und Wagenwege liegen dort als Distanzfelder, das Relief kommt aus der Höhenkarte des Spiels. Daraus entsteht eine Kachelkarte mit ${z.zoom} Zoomstufen. Die Lage der Orte stammt aus den Ortsdaten des Spiels und ist an über sechzehntausend Wegpunkten geeicht, die fast alle genau auf den Straßen liegen.</p>
<p class="note">Am West- und Nordrand endet die Höhenkarte des Spiels; dort blendet das Relief in eine neutrale Fläche aus. Die neuen Inseln aus Charting the Unknown haben keine Höhendaten und erscheinen flach. Alle Inseln mit Orten, Höhlen und Quests stehen auf der Seite <a href="/inseln">Inseln</a>. Wer zusätzlich Sammelobjekte als Marker sucht, findet in der App den Reiter MapGenie.</p>
<h2>Alle ${O.length} Orte auf der Karte</h2>
<p class="note">Jeder Name öffnet die Karte direkt an diesem Ort. Kleingedruckt steht der englische Name aus dem Spiel.</p>
${liste}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Karte", SLUG),
      { "@type": "ImageObject", name: "Weltkarte von Pywel (Crimson Desert)", contentUrl: "https://crimson-desert-wiki.com/cd_assets/weltkarte/pywel-uebersicht.webp",
        width: 1200, height: 1238, description: "Selbst erstellte Weltkarte von Pywel aus den Spieldaten von Crimson Desert" },
      { "@type": "ItemList", name: "Orte auf der Weltkarte von Crimson Desert", numberOfItems: O.length,
        itemListElement: O.map((o, i) => ({ "@type": "ListItem", position: i + 1, name: o[3] })) },
    ],
  };

  return {
    slugName: SLUG,
    title: `Crimson Desert Karte: Weltkarte von Pywel mit ${O.length} Orten`,
    desc: `Interaktive Weltkarte von Crimson Desert, selbst aus den Spieldaten erstellt: ${O.length} Orte mit deutschem und englischem Namen, Suche, Zoom bis auf einzelne Wege, dazu die Inseln aus dem DLC.`,
    h1: `Weltkarte von Pywel`,
    lead: `Eine eigene Karte der ganzen Spielwelt mit <strong>${O.length} benannten Orten</strong>, gerendert aus den Spieldateien statt aus Screenshots.`,
    ogImage: "cd_assets/weltkarte/pywel-uebersicht.webp",
    crumb: "Karte",
    bodyHtml: body,
    jsonld,
  };
}

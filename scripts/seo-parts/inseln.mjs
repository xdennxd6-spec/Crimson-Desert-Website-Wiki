// SEO-Seitenmodul "Inseln" (11.11.2026, Pi-Nachtlauf inseln).
//
// Datenquelle: data/d15-inseln.js (INSELN, INSELN_OHNE_INSEL, INSELN_META). Dieselben Daten zeigt die App auf der Seite
// sec-inseln (Renderer in data/d15-inseln-app.js). Der Text hier kommt ausschliesslich aus diesen Daten: je Insel Name auf
// Deutsch und Englisch, Meeresgebiet (nur wenn die Daten es nennen), Kurzbeschreibung, Orte, Hoehlen, Bewohner, Quests,
// Wissenseintraege, Fundorte, Tiere und Items. Leere Listen erzeugen keine Zeilen und keine leeren Ueberschriften; eine
// Insel ganz ohne Eintraege bekommt einen einzigen Satz. Fehlt INSELN_OHNE_INSEL, entfaellt der letzte Abschnitt.
//
// Zaehlung: je Insel eine Karte <article class="card ins-seo" id="insel-<slug>"> (Soll = INSELN.length).
// 13.11.2026 (Neugestaltung wie die App): zwei Gruppen "Inseln im Großen Ozean (DLC)" (= DLC_ISLANDS, data/d12-dlc.js) und
// "Inseln aus dem Hauptspiel", Reihenfolge wie die App ("Empfohlen": erste unerschlossene Insel laut DLC_ISLANDS.unlock zuerst,
// dann nach Zahl der Eintraege). Je Karte das Inselbild aus SCENES (isl-<slug>, data/d09-scenes.js) direkt nach dem <article>-Tag,
// Meeresgebiet nur, wo belegt, Fundorte mit Namen.

export const SLUG = "inseln";
export const NAV_LABEL = "Inseln";
export const DEEPLINK = "/#sec-inseln";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
article.ins-seo .ins-en{margin:0 0 8px;color:var(--ink-dim);font-size:13px}
article.ins-seo .ins-img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:10px;margin:0 0 12px}
`.trim();

function lade(ctx) {
  const x = ctx.helpers.extract;
  let ohne = null;
  try { ohne = x("INSELN_OHNE_INSEL"); } catch { ohne = null; }
  const o = ohne && typeof ohne === "object" ? ohne : {};
  let scenes = null, dlc = null;
  try { scenes = x("SCENES"); } catch { scenes = null; }
  try { dlc = x("DLC_ISLANDS"); } catch { dlc = null; }
  return {
    I: x("INSELN"), S: scenes && typeof scenes === "object" ? scenes : {}, D: Array.isArray(dlc) ? dlc : [],
    O: { hoehlen: Array.isArray(o.hoehlen) ? o.hoehlen : [], meere: Array.isArray(o.meere) ? o.meere : [], sonst: Array.isArray(o.sonst) ? o.sonst : [] },
  };
}

const liste = (a) => (Array.isArray(a) ? a : []);
const mitNamen = (a) => liste(a).filter((e) => e && (e.de || e.titel || e.en));
const summe = (I, feld) => I.reduce((n, i) => n + liste(i[feld]).length, 0);

export function ZAHLEN(ctx) {
  const { I } = lade(ctx);
  return {
    anzahl: I.length, mitlage: I.filter((i) => i.lage).length,
    orte: summe(I, "orte"), hoehlen: summe(I, "hoehlen"), quests: summe(I, "quests"), wissen: summe(I, "wissen"),
  };
}

export function COUNT_CHECK(ctx) {
  return { regex: /<article class="card ins-seo" id="insel-/g, expected: lade(ctx).I.length, label: "Insel-Karten" };
}

const mehrzahl = (n, eins, viele) => `${n} ${n === 1 ? eins : viele}`;

// Reihenfolge wie die App (data/d15-inseln-app.js, _insOrdnung); INSELN selbst bleibt unveraendert (verify-seo).
const FELDER = ["fundorte", "quests", "hoehlen", "orte", "tiere", "wissen", "items", "bewohner"];
const inhalt = (i) => FELDER.reduce((n, k) => n + liste(i[k]).length, 0);
function ordnung(I, D) {
  const dlcE = (i) => D.find((d) => d && d.name === i.en) || null;
  const idx = new Map(I.map((i, n) => [i, n]));
  const cmp = (a, b) => ((dlcE(b) || {}).unlock ? 1 : 0) - ((dlcE(a) || {}).unlock ? 1 : 0) || inhalt(b) - inhalt(a) || idx.get(a) - idx.get(b);
  return { dlc: I.filter((i) => dlcE(i)).sort(cmp), haupt: I.filter((i) => !dlcE(i)).sort(cmp) };
}
function bild(i, S) {
  const e = i && S["isl-" + i.slug];
  if (!e || !e.f) return null;
  return { src: e.f.includes("/") ? e.f : "cd_assets/scenes/" + e.f, w: e.w || 1024, h: e.h || 1024 };
}
const namen = (a, n) => {
  const l = a.map((e) => e.de || e.item || e.en).filter(Boolean);
  return l.slice(0, n).join(", ") + (l.length > n ? " und " + mehrzahl(l.length - n, "weiterer", "weitere") : "");
};

function karte(i, ctx, S) {
  const { esc, imgSrc } = ctx.helpers;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(i.slug))) throw new Error("inseln.mjs: ungueltiger Slug " + i.slug);
  const st = [];
  const zeile = (k, v) => st.push(`<li><b>${esc(k)}:</b> ${esc(v)}</li>`);

  if (i.meer && (i.meer.de || i.meer.en)) {
    let m = i.meer.de || i.meer.en;
    if (i.meer.de && i.meer.en && i.meer.en !== i.meer.de) m += " (" + i.meer.en + ")";
    if (i.meer.hinweis) m += ". Hinweis: " + i.meer.hinweis;
    if (/unbestätigt$/.test(String(i.meer.beleg || "").trim())) m += " (unbestätigt)";
    zeile("Meeresgebiet", m);
  }
  if (i.kurz && i.kurz.txt) zeile("Kurzbeschreibung", i.kurz.txt);

  const orte = mitNamen(i.orte);
  if (orte.length) zeile("Orte (" + orte.length + ")", orte.map((o) => o.de || o.en).join(", "));
  const hoehlen = liste(i.hoehlen);
  if (hoehlen.length) {
    const wasser = hoehlen.filter((h) => h && h.unterwasser).length;
    zeile("Höhlen", mehrzahl(hoehlen.length, "Höhle", "Höhlen") + (wasser ? ", davon " + wasser + " unter Wasser" : ""));
  }
  const bew = mitNamen(i.bewohner);
  if (bew.length) zeile("Bewohner und Fraktionen", bew.map((b) => b.de || b.en).join(", "));
  const quests = mitNamen(i.quests);
  if (quests.length) zeile("Quests (" + quests.length + ")", quests.map((q) => q.de || q.en).join(", "));
  const boss = mitNamen(i.tiere).filter((t) => t.art === "boss");
  if (boss.length) zeile(boss.length === 1 ? "Boss" : "Bosse", boss.map((t) => t.de || t.en).join(", "));
  const tiere = mitNamen(i.tiere).filter((t) => t.art !== "boss");
  if (tiere.length) zeile("Gegner, Schiffe und Reittiere", tiere.map((t) => t.de || t.en).join(", "));
  const fundL = liste(i.fundorte).filter((e) => e && (e.de || e.item));
  const fund = fundL.length;
  if (fund) zeile("Fundorte (" + fund + ")", namen(fundL, 6));
  const items = liste(i.items).length;
  if (items) zeile("Items mit Inselbezug", mehrzahl(items, "Eintrag", "Einträge"));
  const wissen = liste(i.wissen).length;
  if (wissen) zeile("Wissenseinträge", mehrzahl(wissen, "Eintrag", "Einträge") + " aus Spieldaten und Wiki");

  const leer = !(i.kurz && i.kurz.txt) && !orte.length && !hoehlen.length && !bew.length && !quests.length && !tiere.length && !boss.length && !fund && !items && !wissen;
  const rumpf = st.length ? `<ul class="stats">${st.join("")}</ul>` : "";
  const b = bild(i, S);
  const img = b ? `<img class="ins-img" loading="lazy" decoding="async" src="${esc(imgSrc(b.src))}" alt="${esc(i.de)} im Spiel" width="${b.w}" height="${b.h}">\n` : "";
  const hinweisLeer = leer ? `\n<p class="note">Für diese Insel sind noch keine Einzelheiten erfasst.</p>` : "";
  const href = `/#sec=inseln&insel=${i.slug}`;

  return `<article class="card ins-seo" id="insel-${i.slug}">
${img}<h3>${esc(i.de)}</h3>
<p class="ins-en">${esc(i.en)}</p>
${rumpf}${hinweisLeer}
<p><a href="${esc(href)}">${esc(i.de)} in der App öffnen &rarr;</a></p>
</article>`;
}

function ohneInsel(O, ctx) {
  const { esc } = ctx.helpers;
  const name = (e) => (e.de || e.en || "") + (e.de && e.en && e.en !== e.de ? " (" + e.en + ")" : "");
  const teile = [];
  const abschnitt = (titel, a, mitHinweis) => {
    const l = a.filter((e) => e && (e.de || e.en));
    if (!l.length) return;
    teile.push(`<h3 class="ctu-h">${esc(titel)} (${l.length})</h3>
<ul>${l.map((e) => `<li>${esc(name(e))}${mitHinweis && e.hinweis ? esc(". Hinweis: " + e.hinweis) : ""}</li>`).join("")}</ul>`);
  };
  abschnitt("Höhlen", O.hoehlen, false);
  abschnitt("Meere", O.meere, true);
  abschnitt("Weitere Orte", O.sonst, false);
  if (!teile.length) return "";
  return `<h2>Ohne Inselbezug</h2>
<p class="note">Diese Orte der DLC-Meere nennen die Spieldaten ohne Inselbezug. Sie stehen hier getrennt, damit keine Zuordnung geraten wird.</p>
${teile.join("\n")}`;
}

export function build(ctx) {
  const { esc, breadcrumbLd } = ctx.helpers;
  const { I, O, S, D } = lade(ctx);
  const z = ZAHLEN(ctx);
  const ord = ordnung(I, D);
  if (ord.dlc.length + ord.haupt.length !== I.length) throw new Error("inseln.mjs: Gruppen decken nicht alle Inseln ab");
  const gruppe = (titel, L) => (L.length ? `<h2>${titel} (${L.length})</h2>
<div class="grid">${L.map((i) => karte(i, ctx, S)).join("\n")}</div>` : "");
  const og = bild(I.find((i) => i.slug === "samora") || I[0], S);
  const ids = I.map((i) => i.slug);
  if (new Set(ids).size !== ids.length) throw new Error("inseln.mjs: doppelter Slug");

  const zahlen = [];
  if (z.orte) zahlen.push(mehrzahl(z.orte, "Ort", "Orte"));
  if (z.hoehlen) zahlen.push(mehrzahl(z.hoehlen, "Höhle", "Höhlen"));
  if (z.quests) zahlen.push(mehrzahl(z.quests, "Quest", "Quests"));
  if (z.wissen) zahlen.push(mehrzahl(z.wissen, "Wissenseintrag", "Wissenseinträge"));
  const lead = `Diese Übersicht führt <strong>${z.anzahl} Inseln</strong> aus den Spieldaten von Crimson Desert mit Namen auf Deutsch und Englisch`
    + (zahlen.length ? `, dazu ${zahlen.join(", ")} (Summe über alle Inseln).` : ".");

  const body = `
<a class="cta" href="${DEEPLINK}">Alle Inseln in der App öffnen &rarr;</a>
<p class="note">In der App öffnest du jede Insel mit allen Angaben und Belegen. Die Angaben stammen aus den Spieldaten und dem Wiki, wenige aus einzeln genannten Guides; ein Meeresgebiet nennt die Seite nur, wenn eine Quelle die Insel einem Meer zuordnet. Die Bilder sind die Wissensbilder des Spiels zu den Inseln.</p>
${gruppe("Inseln im Großen Ozean (DLC)", ord.dlc)}
${gruppe("Inseln aus dem Hauptspiel", ord.haupt)}
${ohneInsel(O, ctx)}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Inseln", SLUG),
      { "@type": "ItemList", name: "Inseln in Crimson Desert", numberOfItems: I.length,
        itemListElement: ord.dlc.concat(ord.haupt).map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.de })) },
    ],
  };

  return {
    slugName: SLUG,
    title: `Inseln in Crimson Desert: ${z.anzahl} Inseln im Überblick`,
    desc: `Alle ${z.anzahl} Inseln aus Crimson Desert mit Namen auf Deutsch und Englisch, dazu Meeresgebiet, Orte, Höhlen, Quests und Spieltexte, soweit die Spieldaten sie nennen.`,
    h1: `Inseln in Crimson Desert`,
    lead,
    ogImage: og ? og.src : null,
    crumb: "Inseln",
    bodyHtml: body,
    jsonld,
  };
}

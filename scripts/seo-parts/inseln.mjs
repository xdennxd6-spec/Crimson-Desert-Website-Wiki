// SEO-Seitenmodul "Inseln" (11.11.2026, Pi-Nachtlauf inseln).
//
// Datenquelle: data/d15-inseln.js (INSELN, INSELN_OHNE_INSEL, INSELN_META). Dieselben Daten zeigt die App auf der Seite
// sec-inseln (Renderer in data/d15-inseln-app.js). Der Text hier kommt ausschliesslich aus diesen Daten: je Insel Name auf
// Deutsch und Englisch, Meeresgebiet (nur wenn die Daten es nennen), Kurzbeschreibung, Orte, Hoehlen, Bewohner, Quests,
// Wissenseintraege, Fundorte, Tiere und Items. Leere Listen erzeugen keine Zeilen und keine leeren Ueberschriften; eine
// Insel ganz ohne Eintraege bekommt einen einzigen Satz. Fehlt INSELN_OHNE_INSEL, entfaellt der letzte Abschnitt.
//
// Zaehlung: je Insel eine Karte <article class="card ins-seo" id="insel-<slug>"> (Soll = INSELN.length).

export const SLUG = "inseln";
export const NAV_LABEL = "Inseln";
export const DEEPLINK = "/#sec-inseln";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
article.ins-seo .ins-en{margin:0 0 8px;color:var(--ink-dim);font-size:13px}
`.trim();

function lade(ctx) {
  const x = ctx.helpers.extract;
  let ohne = null;
  try { ohne = x("INSELN_OHNE_INSEL"); } catch { ohne = null; }
  const o = ohne && typeof ohne === "object" ? ohne : {};
  return {
    I: x("INSELN"),
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

function karte(i, ctx) {
  const { esc } = ctx.helpers;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(i.slug))) throw new Error("inseln.mjs: ungueltiger Slug " + i.slug);
  const st = [];
  const zeile = (k, v) => st.push(`<li><b>${esc(k)}:</b> ${esc(v)}</li>`);

  if (i.meer && (i.meer.de || i.meer.en)) {
    let m = i.meer.de || i.meer.en;
    if (i.meer.de && i.meer.en && i.meer.en !== i.meer.de) m += " (" + i.meer.en + ")";
    if (i.meer.hinweis) m += ". Hinweis: " + i.meer.hinweis;
    zeile("Meeresgebiet", m);
  } else {
    zeile("Meeresgebiet", "nicht erfasst");
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
  const tiere = mitNamen(i.tiere);
  if (tiere.length) zeile("Reittiere, Gegner und Bosse", tiere.map((t) => t.de || t.en).join(", "));
  const fund = liste(i.fundorte).length;
  if (fund) zeile("Ausrüstung mit Fundort", mehrzahl(fund, "Eintrag", "Einträge"));
  const items = liste(i.items).length;
  if (items) zeile("Items mit Inselbezug", mehrzahl(items, "Eintrag", "Einträge"));
  const wissen = liste(i.wissen).length;
  if (wissen) zeile("Wissenseinträge", mehrzahl(wissen, "Eintrag", "Einträge") + " mit dem Spieltext");

  const leer = !(i.kurz && i.kurz.txt) && !orte.length && !hoehlen.length && !bew.length && !quests.length && !tiere.length && !fund && !items && !wissen;
  const rumpf = `<ul class="stats">${st.join("")}</ul>`;
  const hinweisLeer = leer ? `\n<p class="note">Für diese Insel sind noch keine Einzelheiten erfasst.</p>` : "";
  const href = `/#sec=inseln&insel=${i.slug}`;

  return `<article class="card ins-seo" id="insel-${i.slug}">
<h3>${esc(i.de)}</h3>
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
  return `<h2>Meeresgebiet, Insel nicht belegt</h2>
<p class="note">Diese Orte der DLC-Meere nennen die Spieldaten ohne Inselbezug. Sie stehen hier getrennt, damit keine Zuordnung geraten wird.</p>
${teile.join("\n")}`;
}

export function build(ctx) {
  const { esc, breadcrumbLd } = ctx.helpers;
  const { I, O } = lade(ctx);
  const z = ZAHLEN(ctx);
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
<p class="note">In der App öffnest du jede Insel mit allen Angaben und Belegen. Text steht hier nur, wo die Spieldaten ihn liefern; ein Meeresgebiet nennt die Seite nur, wenn die Daten die Insel einem Meer zuordnen. Schiffe, Tauchen und Reittiere des DLC stehen auf der Seite <a href="/charting-the-unknown">Charting the Unknown</a>.</p>
<h2>Die Inseln (${I.length})</h2>
<div class="grid">${I.map((i) => karte(i, ctx)).join("\n")}</div>
${ohneInsel(O, ctx)}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Inseln", SLUG),
      { "@type": "ItemList", name: "Inseln in Crimson Desert", numberOfItems: I.length,
        itemListElement: I.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.de })) },
    ],
  };

  return {
    slugName: SLUG,
    title: `Inseln in Crimson Desert: ${z.anzahl} Inseln im Überblick`,
    desc: `Alle ${z.anzahl} Inseln aus Crimson Desert mit Namen auf Deutsch und Englisch, dazu Meeresgebiet, Orte, Höhlen, Quests und Spieltexte, soweit die Spieldaten sie nennen.`,
    h1: `Inseln in Crimson Desert`,
    lead,
    ogImage: null,
    crumb: "Inseln",
    bodyHtml: body,
    jsonld,
  };
}

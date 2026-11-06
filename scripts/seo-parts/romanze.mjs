// SEO-Seitenmodul "Romanze & Ehe" (05.11.2026).
//
// Datenquelle: data/d13-romanze.js (ROM_*), Faktenbasis FAKTEN.md des Nachtlaufs romanze. Dieselben Daten zeigt die App auf der Seite
// sec-romanze (renderRomanze in d13). Feldvertrag wie d12: Wert = "Text" | {v, c:"unb"|"nb", q} | Liste; was nur eine Quelle nennt,
// steht grau mit Vermerk, nicht Belegtes ebenso (Klassen ctu-unb, ctu-nb, ctu-flag kommen aus EXTRA_CSS von charting-the-unknown).
// Zaehlung: je Kandidat eine Karte <article class="card" id="rom-...">: die Hexen plus die Sammelkarte NPCs mit Herzsymbol.

export const SLUG = "romanze";
export const NAV_LABEL = "Romanze & Ehe";
export const DEEPLINK = "/#sec-romanze";
export const SITEMAP = { pri: "0.8", freq: "weekly" };

export const EXTRA_CSS = `
article.rom-seo img{width:96px;height:96px;aspect-ratio:1/1;object-fit:cover;object-position:50% 20%;border-radius:12px;float:right;margin:0 0 8px 12px}
article.rom-seo ol{margin:8px 0 0;padding-left:20px;font-size:14px}
article.rom-seo li{margin:0 0 5px}
`.trim();

function lade(ctx) {
  const x = ctx.helpers.extract;
  return { W: x("ROM_WITCHES"), FIGS: x("ROM_FIGS"), PATH: x("ROM_PATH"), NPCS: x("ROM_NPCS"), OUT: x("ROM_OUT"), PLAN: x("ROM_PLAN"),
    WED: x("ROM_WEDDING"), PERKS: x("ROM_PERKS"), FEST: x("ROM_FEST"), MULTI: x("ROM_MULTI"), TRAPS: x("ROM_TRAPS"), FIXES: x("ROM_FIXES"),
    ORDER: x("ROM_ORDER_NOTE"), GAPS: x("ROM_GAPS"), SOURCES: x("ROM_SOURCES"), META: x("ROM_META") };
}

export function ZAHLEN(ctx) {
  const D = lade(ctx);
  // voll und strafe: Maximum der Leisten und Flirt-Strafe (FAKTEN 1.3, 1.13), damit Intro und FAQ keine festen Ziffern tragen
  return { hexen: D.W.length, figuren: D.FIGS.length, voll: 100, strafe: 10 };
}

export function COUNT_CHECK(ctx) {
  const D = lade(ctx);
  return { regex: /<article class="card rom-seo" id="rom-/g, expected: D.W.length + 1, label: "Kandidaten-Karten" };
}

export function build(ctx) {
  const { esc, breadcrumbLd, imgSrc } = ctx.helpers;
  const D = lade(ctx);
  const z = ZAHLEN(ctx);
  const obj = (x) => (x && typeof x === "object" && !Array.isArray(x) ? x : { v: x });
  const flag = (c, q) => `<span class="ctu-flag">${esc((c === "nb" ? "nicht belegt" : "unbestätigt") + (q ? ": " + q : ""))}</span>`;
  const val = (x) => {
    if (x == null || x === "") return "";
    if (Array.isArray(x)) return x.map(val).filter(Boolean).join(" ");
    const o = obj(x);
    if (!o.c || o.c === "ok") return esc(o.v);
    return `<span class="ctu-${o.c === "nb" ? "nb" : "unb"}">${esc(o.v)}</span> ${flag(o.c, o.q)}`;
  };
  const li = (list) => list.map((x) => `<li>${x}</li>`).join("");

  const weg = `<h2>Der Weg bis zur Heirat</h2>
<ol class="ctu-steps">${li(D.PATH.map((p) => `<b>${esc(p.t)}:</b> ${esc(p.d)}`))}</ol>`;

  const karte = (w) => `<article class="card rom-seo" id="rom-${esc(w.id)}">
<img src="${imgSrc(w.port)}" alt="Porträt von ${esc(w.name)}" width="96" height="96" loading="lazy" decoding="async">
<h3>${esc(w.name)}, ${esc(w.title)}</h3>
<p>${esc(w.lead)}</p>
<dl class="ctu-facts"><div><dt>Fundort</dt><dd>${esc(w.where)}</dd></div>
<div><dt>Einstieg</dt><dd>${val(w.entry)}</dd></div>
<div><dt>Sanktums</dt><dd>${w.sanct.map(esc).join(", ")}. ${val(w.sanctLoc)}</dd></div></dl>
<p><strong>Romanze-Reihe:</strong> ${esc(w.series)} (${esc(w.seriesDe)}) ${val(w.seriesFlag)}</p>
<ol>${li(w.steps.map((s) => `<b>${esc(s.en)}</b> (${esc(s.de)}): ${val(s.d)}`))}</ol>
<p>${val(D.ORDER)}</p>
</article>`;
  const npcKarte = `<article class="card rom-seo" id="rom-npcs">
<h3>${esc(D.NPCS.title)}</h3>
<p>${esc(D.NPCS.lead)}</p>
<dl class="ctu-facts">${D.NPCS.rows.map((r) => `<div><dt>${esc(r[0])}</dt><dd>${val(r[1])}</dd></div>`).join("")}</dl>
<p class="note">${esc(D.NPCS.gap)}</p>
</article>`;
  const kandidaten = `<h2>Kandidaten: die ${z.hexen} Hexen und NPCs mit Herz</h2>
<div class="grid">${D.W.map(karte).join("\n")}
${npcKarte}</div>
<h3 class="ctu-h">${esc(D.OUT.title)}</h3>
<ul class="ctu-list">${li(D.OUT.rows.map(val))}</ul>`;

  const vorgehen = `<h2>Vertrauen aufbauen: empfohlenes Vorgehen</h2>
<p class="note">${esc(D.META.planNote)}</p>
<ol class="ctu-steps">${li(D.PLAN.map((p) => `<b>${esc(p.t)}:</b> ${val(p.d)}`))}</ol>`;

  const heirat = `<h2>Heirat und was sie bringt</h2>
<dl class="ctu-facts">${D.WED.rows.map((r) => `<div><dt>${esc(r.t)}</dt><dd>${val(r.d)}</dd></div>`).join("")}</dl>
<ul class="ctu-list">${li(D.PERKS.map((p) => `<b>${esc(p.t)}:</b> ${val(p.d)}`))}</ul>`;

  const fest = `<h2>Camp-Fest und mehrere Romanzen</h2>
<p>${esc(D.FEST.lead)} <span class="ctu-unb">${D.FEST.chips.map((c) => `${esc(c.v)} ${esc(c.t)}`).join(", ")}</span> ${flag("unb", D.FEST.chipsQ)}</p>
<ul class="ctu-list">${li(D.FEST.steps.map((s) => `<b>${esc(s.t)}:</b> ${val(s.d)}`))}</ul>
<ul class="ctu-list">${li(D.MULTI.rows.map((r) => `<b>${esc(r[0])}:</b> ${val(r[1])}`))}</ul>`;

  const fallen = `<h2>Stolperfallen und Hotfixes</h2>
<ul class="ctu-list">${li(D.TRAPS.map((t) => `<b>${esc(t.t)}:</b> ${val(t.d)}`))}</ul>
<ul class="ctu-list">${li(D.FIXES.map((f) => `<b>${esc(f.ver)}:</b> ${esc(f.d)}`))}</ul>`;

  const offen = `<h2>Was noch nicht belegt ist</h2>
<ul class="ctu-list">${li(D.GAPS.map(esc))}</ul>`;

  const quellen = `<p class="ctu-src">Quellen: ${D.SOURCES.map((s) => `<a href="${esc(s.url)}" rel="nofollow noopener noreferrer" target="_blank">${esc(s.t)}</a>`).join(" &middot; ")}. Geprüft am ${esc(D.META.checked)}.</p>`;

  const body = `
<a class="cta" href="${DEEPLINK}">Romanze &amp; Ehe in der App öffnen &rarr;</a>
<p class="note">Grau mit Vermerk steht, was nur eine Quelle nennt oder ein eigener Schluss ist; „nicht belegt“ heißt gesucht, aber nichts gefunden.</p>
${weg}
${kandidaten}
${vorgehen}
${heirat}
${fest}
${fallen}
${offen}
${quellen}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Romanze & Ehe", SLUG),
      {
        "@type": "Article",
        headline: "Crimson Desert: Romanze und Heirat",
        inLanguage: "de-DE",
        author: { "@type": "Person", name: "Christian Stein" },
        about: { "@type": "VideoGame", name: "Crimson Desert" },
      },
      {
        "@type": "ItemList",
        name: "Hexen als Partnerinnen in Crimson Desert",
        numberOfItems: D.W.length,
        itemListElement: D.W.map((w, i) => ({ "@type": "ListItem", position: i + 1, name: w.name })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: "Crimson Desert Romanze & Heirat: Flirten, Partner, Guide",
    desc: `Romanze in Crimson Desert: So flirtest und heiratest du, welche ${z.hexen} Hexen und NPCs infrage kommen, was die Ehe bringt und was noch nicht belegt ist.`,
    h1: "Romanze & Heirat in Crimson Desert",
    lead: `Wie Flirten, Vertrauen und Heiratsantrag seit dem DLC <strong>Charting the Unknown</strong> funktionieren, welche <strong>${z.hexen} Hexen</strong> und NPCs infrage kommen und was bisher keine geprüfte Quelle belegt.`,
    ogImage: "cd_assets/scenes/rom-hochzeit-v3.webp",
    crumb: "Romanze & Ehe",
    bodyHtml: body,
    jsonld,
  };
}

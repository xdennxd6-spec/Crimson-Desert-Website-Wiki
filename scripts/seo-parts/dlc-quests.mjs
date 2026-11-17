// SEO-Seitenmodul "DLC-Quests" (17.11.2026): alle Questreihen aus Charting the Unknown mit jedem Schritt als
// eigener Zwischenueberschrift.
//
// Anlass: Search Console 17.11.2026. Gesucht werden die deutschen Namen einzelner DLC-Schritte („Schicksalhafte
// Begegnung“, „Ein mysteriöser Angriff“, „Uralter Tempel“, „Jenseits der Ränder“ …). /charting-the-unknown fuehrt
// die Quests nur als Tabellenzeile je Reihe; diese Seite gibt jeder Reihe ein <h2> und jedem Schritt ein <h3> mit
// deutschem Namen (aus data/d00-de-namen.js) und dem englischen Namen daneben.
//
// Datenquelle: data/d12-dlc.js (DLC_QUESTS, DLC_QUEST_NOTES), dieselben Daten wie die App-Seite sec-dlc-quests.
// Feldvertrag wie in charting-the-unknown.mjs: Wert = "Text" | {v, c:"ok"|"unb"|"nb", q} | Liste. Unbestaetigtes
// steht grau mit Vermerk (Klassen ctu-unb/ctu-nb/ctu-flag aus charting-the-unknown.mjs, EXTRA_CSS gilt auf allen Seiten).
//
// Zaehlung (COUNT_CHECK): jeder Schritt ist genau ein <h3 class="dq-step" id="dq-...">. Reihen ohne steps (nur subs)
// zeigen ihre Unterquests als Liste und zaehlen nicht mit.

import { deN, deT } from "./_de.mjs";

export const SLUG = "dlc-quests";
export const NAV_LABEL = "DLC-Quests";
export const DEEPLINK = "/#sec-dlc-quests";
export const SITEMAP = { pri: "0.7", freq: "weekly" };

// Praefix dq-. Flach halten: cssRules() in gen-seo.mjs vertraegt keine @media-Regeln.
export const EXTRA_CSS = `
nav.dq-toc ol{margin:10px 0 0;padding-left:22px;font-size:14px;columns:2 260px;column-gap:28px}
nav.dq-toc li{margin:0 0 6px;break-inside:avoid}
h2.dq-reihe small,h3.dq-step small{font-weight:400;color:var(--ink-faint);font-size:.78em}
h3.dq-step{margin:18px 0 4px;font-size:16px}
p.dq-meta{font-size:13.5px;color:var(--ink-dim);background:var(--panel-2);border:1px solid var(--line);border-radius:10px;padding:10px 13px;margin:10px 0 0}
p.dq-meta b{color:var(--ink-hi)}
p.dq-d{margin:4px 0 0;font-size:14px}
p.dq-d.ctu-unb{color:var(--ink-faint)}
p.dq-rw{margin:4px 0 0;font-size:13.5px;color:var(--ink-dim)}
p.dq-rw b{color:var(--amber)}
`.trim();

function lade(ctx) {
  const x = ctx.helpers.extract;
  return { QUESTS: x("DLC_QUESTS").filter(Boolean), NOTES: x("DLC_QUEST_NOTES") || [] };
}
const stepsOf = (q) => (Array.isArray(q.steps) ? q.steps.filter(Boolean) : []);

export function ZAHLEN(ctx) {
  const { QUESTS } = lade(ctx);
  return {
    reihen: QUESTS.length,
    schritte: QUESTS.reduce((n, q) => n + stepsOf(q).length, 0),
  };
}

export function COUNT_CHECK(ctx) {
  return { regex: /<h3 class="dq-step" id="dq-/g, expected: ZAHLEN(ctx).schritte, label: "Quest-Schritte" };
}

export function build(ctx) {
  const { esc, slug, breadcrumbLd } = ctx.helpers;
  const { QUESTS, NOTES } = lade(ctx);
  const z = ZAHLEN(ctx);

  // Wert -> HTML, wortgleich zum Vertrag in charting-the-unknown.mjs.
  const obj = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : { v });
  const flag = (c, q) => `<span class="ctu-flag">${esc((c === "nb" ? "nicht belegt" : "unbestätigt") + (q ? ": " + q : ""))}</span>`;
  const val = (v) => {
    if (v == null || v === "") return "";
    if (Array.isArray(v)) return v.map(val).filter(Boolean).join(" ");
    const o = obj(v), c = o.c || "ok", t = esc(o.v);
    if (c === "ok") return t;
    const f = c === "nb" && /nicht belegt/i.test(String(o.v)) ? "" : " " + flag(c, o.q);
    return `<span class="ctu-${c === "nb" ? "nb" : "unb"}">${t}${f}</span>`;
  };
  // Deutscher Name, englischer daneben, wenn er sich unterscheidet.
  const zweisprachig = (en, de) => {
    const d = de || deN(en);
    return d !== en ? `${esc(d)} <small>(${esc(en)})</small>` : esc(d);
  };

  const vergeben = new Set();
  const rid = (teil) => {
    const id = `dq-${teil}`;
    if (vergeben.has(id)) throw new Error(`dlc-quests.mjs: doppelter Anker ${id}`);
    vergeben.add(id);
    return id;
  };

  const reihen = QUESTS.map((q) => {
    const rs = slug(q.name);
    const id = rid(rs);
    const deName = q.de || deN(q.name);
    const st = stepsOf(q);
    const meta = [
      q.who ? `<b>Figur / Bereich:</b> ${esc(deT(q.who))}` : "",
      q.start ? `<b>Start:</b> ${val(q.start)}` : "",
      val(q.req) ? `<b>Voraussetzung:</b> ${val(q.req)}` : "",
      st.length ? `<b>Schritte:</b> ${st.length}` : "",
    ].filter(Boolean).join("<br>");
    const reiheFlag = q.c && q.c !== "ok" ? " " + flag(q.c, q.q) : "";

    let schritte;
    if (st.length) {
      schritte = st.map((s, i) => {
        const o = typeof s === "string" ? { name: s } : s;
        const bad = o.c && o.c !== "ok";
        const d = val(o.d), rw = val(o.reward);
        return `<h3 class="dq-step" id="${rid(rs + "-" + slug(o.name || "schritt-" + (i + 1)))}">${i + 1}. ${zweisprachig(o.name || "Schritt")}</h3>
${d ? `<p class="dq-d${bad ? " ctu-unb" : ""}">${d}${bad ? " " + flag(o.c, o.q) : ""}</p>` : bad ? `<p class="dq-d">${flag(o.c, o.q)}</p>` : ""}${rw ? `\n<p class="dq-rw"><b>Belohnung:</b> ${rw}</p>` : ""}`;
      }).join("\n");
    } else {
      const o = obj(Array.isArray(q.subs) ? q.subs[0] : q.subs);
      const teile = String(o.v || "").split(/\s*;\s*/).filter(Boolean);
      schritte = o.c === "nb" || !teile.length
        ? `<p class="dq-d">Einzelne Schritte: ${val({ v: "nicht belegt", c: "nb" })}</p>`
        : `<ul class="ctu-list">${teile.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>${o.c && o.c !== "ok" ? " " + flag(o.c, o.q) : ""}`;
    }

    return `<h2 class="dq-reihe" id="${id}">${zweisprachig(q.name, q.de)}${reiheFlag}</h2>
${meta ? `<p class="dq-meta">${meta}</p>` : ""}
${schritte}
${val(q.rewards) ? `<p class="dq-rw"><b>Belohnungen der Reihe:</b> ${val(q.rewards)}</p>` : ""}${q.note ? `\n<p class="note">${val(q.note)}</p>` : ""}`;
  }).join("\n");

  const toc = `<nav class="dq-toc" aria-label="Questreihen"><h2>Alle ${z.reihen} Questreihen</h2>
<ol>${QUESTS.map((q) => `<li><a href="#dq-${slug(q.name)}">${esc(q.de || deN(q.name))}</a>${stepsOf(q).length ? ` <small>(${stepsOf(q).length} Schritte)</small>` : ""}</li>`).join("")}</ol></nav>`;

  const body = `
<a class="cta" href="${DEEPLINK}">DLC-Quests in der App öffnen &rarr;</a>
<p class="note">Questreihen aus dem DLC <a href="/charting-the-unknown">Charting the Unknown</a>. Schiffe, Inseln, Bosse und Ausrüstung des DLC stehen dort, die Inseln einzeln auf der Seite <a href="/inseln">Inseln</a>. Grau mit Vermerk heißt: nur eine Quelle oder nicht belegt.</p>
${toc}
${reihen}
<h2>Hinweise zu den Quellen</h2>
<ul class="ctu-list">${[].concat(NOTES).map((n) => `<li>${val(n)}</li>`).join("")}</ul>
<p class="note">Hauptspiel: <a href="/hauptquests">Hauptquests</a>, <a href="/fraktionen">Fraktionsquests</a>, <a href="/side-quests">Nebenquests</a>. Romanze-Kandidaten, Antrag und Ehe: <a href="/romanze">Romanze &amp; Ehe</a>.</p>`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("DLC-Quests", SLUG),
      { "@type": "ItemList", name: "Questreihen aus Crimson Desert: Charting the Unknown", numberOfItems: QUESTS.length,
        itemListElement: QUESTS.map((q, i) => ({ "@type": "ListItem", position: i + 1, name: q.de || deN(q.name),
          url: `https://crimson-desert-wiki.com/${SLUG}#dq-${slug(q.name)}` })) },
    ],
  };

  return {
    slugName: SLUG,
    title: `Crimson Desert DLC-Quests: alle ${z.schritte} Schritte im Überblick`,
    desc: `Alle ${z.reihen} Questreihen aus Charting the Unknown: Jenseits der Ränder, Aus der Asche, Geschmiedete Entschlossenheit und mehr, jeder Schritt mit Ablauf und Belohnung.`,
    h1: `DLC-Quests aus Charting the Unknown`,
    lead: `<strong>${z.reihen} Questreihen</strong> mit <strong>${z.schritte} Schritten</strong>, jeder Schritt mit deutschem und englischem Namen, Ablauf und Belohnung.`,
    crumb: "DLC-Quests",
    bodyHtml: body,
    jsonld,
  };
}

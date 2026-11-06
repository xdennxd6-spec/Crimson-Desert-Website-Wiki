// SEO-Seitenmodul "Charting the Unknown" (erster DLC, 31.10.2026).
//
// Datenquelle: data/d12-dlc.js (DLC_META, DLC_ACCESS, DLC_WARN, DLC_SHIPS, DLC_SHIP_NOTES, DLC_SHIP_FACTS,
// DLC_CREW, DLC_CREW_NOTES, DLC_SHIPBUILD, DLC_SHIP_PARTS, DLC_PART_NOTES, DLC_ISLANDS, DLC_ISLAND_FACTS, DLC_DIVE,
// DLC_MOUNTS, DLC_MOUNT_FACTS, DLC_QUESTS, DLC_QUEST_NOTES, DLC_BOSSES, DLC_BOSS_NOTES, DLC_GARDEN_RULES,
// DLC_GARDEN, DLC_GARDEN_NOTE, DLC_LIVING, DLC_GEAR_TOOLS, DLC_GEAR_TOOLS_DE, DLC_GEAR_NOTES, DLC_OPEN, DLC_SOURCES;
// ab 01.11.2026 zusaetzlich die optionalen Tabellen DLC_TRADE, DLC_HOMES, DLC_RELIC_SHOPS, DLC_GEAR_EXTRA: fehlt eine
// Konstante oder ist sie leer, entfaellt der Abschnitt, die Seite bricht nicht ab).
// Optionale Felder (nur als Spalte, wenn mindestens ein Eintrag sie hat): DLC_ISLANDS where/nexus/unlock, DLC_SHIPS
// vendor/crew, DLC_MOUNTS where/trust/stats; DLC_QUESTS req und steps (ersetzen subs), DLC_GARDEN bq.
// Dieselben Daten zeigt die App auf der Seite sec-dlc (renderDlc in index.html); Feldvertrag im Kopf von d12:
// Wert = "Text" | {v, c:"ok"|"unb"|"nb", q} | Liste. Unbestaetigtes steht grau mit Vermerk, nicht Belegtes ebenso.
//
// Die neue DLC-Ausruestung steht nicht in d12, sondern in WEAPONS/ARMOR mit dem Feld dlc (Vertrag der Bauagenten:
// dlc:"Charting the Unknown"). Das Modul filtert danach, ohne einen einzigen Namen fest zu verdrahten; solange
// noch kein Eintrag gekennzeichnet ist, steht dort ein Hinweis statt einer leeren Tabelle.
//
// Zaehlung (COUNT_CHECK): jede Datenzeile ist ein <tr id="dlc-...">, ueber Schiffe, Schiffsteile, Inseln,
// Unterwasser-Reittiere, Questreihen, Bosse, Garten-Gruppen, Seehandel-Waren, Wohnsitze, Relic-Haendler, DLC_GEAR_EXTRA
// und die gekennzeichneten Waffen/Ruestungen. Accessoires und Abyss-Kerne mit dlc stehen nur als Hinweiszeile (keine Zeile).
// verify-seo.mjs rechnet die Soll-Menge unabhaengig aus denselben Datenstrukturen nach.

import { deN, deT } from "./_de.mjs";

export const SLUG = "charting-the-unknown";
export const NAV_LABEL = "Charting the Unknown";
export const DEEPLINK = "/#sec-dlc";
export const SITEMAP = { pri: "0.8", freq: "weekly" };

// Praefix ctu-, damit nichts Vorhandenes umdefiniert wird (EXTRA_CSS landet auf allen Seiten).
// Flach halten: cssRules() in gen-seo.mjs zerlegt an "}" und vertraegt keine @media-Regeln.
export const EXTRA_CSS = `
span.ctu-unb,span.ctu-nb,tr.ctu-row-unb td,tr.ctu-row-nb td{color:var(--ink-faint)}
tr.ctu-row-unb td:first-child,tr.ctu-row-nb td:first-child{color:var(--ink-dim)}
span.ctu-flag{display:inline-block;margin-left:3px;padding:0 6px;border:1px dashed var(--ink-faint);border-radius:6px;font-family:var(--f-mono);font-size:var(--fs-10);font-weight:600;letter-spacing:.02em;color:var(--ink-faint);white-space:normal}
dl.ctu-facts{margin:10px 0 0;display:grid;gap:8px}
dl.ctu-facts>div{background:var(--panel-2);border:1px solid var(--line);border-radius:12px;padding:10px 14px}
dl.ctu-facts dt{font-family:var(--f-mono);font-size:var(--fs-11);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--amber)}
dl.ctu-facts dd{margin:3px 0 0;font-size:14px;color:var(--ink)}
ol.ctu-steps{margin:10px 0 0;padding-left:22px}
ol.ctu-steps li{margin:0 0 8px;font-size:14px}
ol.ctu-steps li b{color:var(--ink-hi)}
p.ctu-warn{font-size:13.5px;color:var(--ink);background:rgba(255,90,68,.09);border-left:3px solid var(--red);border-radius:8px;padding:10px 13px;margin:10px 0 0}
ul.ctu-list{margin:10px 0 0;padding-left:20px;font-size:14px}
ul.ctu-list li{margin:0 0 6px}
h3.ctu-h{margin:22px 0 4px}
td.ctu-sub{min-width:240px;font-size:13px}
p.ctu-src{font-family:var(--f-mono);font-size:var(--fs-11-5);color:var(--ink-faint);margin:14px 0 0;line-height:1.7}
ol.ctu-st{margin:0;padding-left:18px;font-size:13px}
ol.ctu-st li{margin:0 0 6px}
ol.ctu-st li.ctu-unb{color:var(--ink-faint)}
div.dlc-neu{margin:18px 0 6px;padding:2px 16px 12px;background:var(--panel-2);border:1px solid var(--line);border-left:3px solid #8fdcff;border-radius:12px}
ul.dlc-neu-l{margin:8px 0 0;padding-left:20px;font-size:14px;columns:2 260px;column-gap:28px}
ul.dlc-neu-l li{margin:0 0 7px;break-inside:avoid}
span.dlc-neu-i{display:block;font-size:12.5px;color:var(--ink-dim)}
span.dlc-gtag{display:inline-block;margin-left:8px;padding:1px 7px;border-radius:7px;font-family:var(--f-mono);font-size:var(--fs-10);font-weight:700;letter-spacing:.06em;color:#08202b;background:#8fdcff;vertical-align:2px}
`.trim();

const LISTEN = ["DLC_META", "DLC_ACCESS", "DLC_WARN", "DLC_SHIPS", "DLC_SHIP_NOTES", "DLC_SHIP_FACTS", "DLC_CREW",
  "DLC_CREW_NOTES", "DLC_SHIPBUILD", "DLC_SHIP_PARTS", "DLC_PART_NOTES", "DLC_ISLANDS", "DLC_ISLAND_FACTS", "DLC_DIVE",
  "DLC_MOUNTS", "DLC_MOUNT_FACTS", "DLC_QUESTS", "DLC_QUEST_NOTES", "DLC_BOSSES", "DLC_BOSS_NOTES", "DLC_GARDEN_RULES",
  "DLC_GARDEN", "DLC_GARDEN_NOTE", "DLC_LIVING", "DLC_GEAR_TOOLS", "DLC_GEAR_TOOLS_DE", "DLC_GEAR_NOTES", "DLC_OPEN",
  "DLC_SOURCES", "DLC_TRADE", "DLC_HOMES", "DLC_RELIC_SHOPS", "DLC_GEAR_EXTRA"];
// Nachtlauf 01.11.2026: diese Konstanten duerfen fehlen oder leer sein (dann entfaellt der Abschnitt).
const OPTIONAL = new Set(["DLC_TRADE", "DLC_HOMES", "DLC_RELIC_SHOPS", "DLC_GEAR_EXTRA"]);

function lade(ctx) {
  const D = {};
  for (const n of LISTEN) {
    const key = n.replace(/^DLC_/, "");
    if (!OPTIONAL.has(n)) { D[key] = ctx.helpers.extract(n); continue; }
    let v = [];
    try { v = ctx.helpers.extract(n); } catch { v = []; }
    D[key] = Array.isArray(v) ? v.filter(Boolean) : [];
  }
  // Vertrag der Bauagenten: neue DLC-Eintraege tragen das Feld dlc.
  D.GEAR_W = (ctx.helpers.extract("WEAPONS") || []).filter((w) => w && w.dlc);
  D.GEAR_A = (ctx.data.ARMOR || []).filter((a) => a && a.dlc);
  D.GEAR_X = (ctx.helpers.extract("ACCESSORIES") || []).filter((a) => a && a.dlc);
  D.GEAR_K = (ctx.helpers.extract("CORES") || []).filter((a) => a && a.dlc);
  // Hero-Kennzahl und Ueberschrift "Neue DLC-Ausruestung (n)": Waffen + Ruestungen + Accessoires + Kerne + DLC_GEAR_EXTRA
  D.N_GEAR = D.GEAR_W.length + D.GEAR_A.length + D.GEAR_X.length + D.GEAR_K.length + D.GEAR_EXTRA.length;
  return D;
}

export function ZAHLEN(ctx) {
  const D = lade(ctx);
  return {
    ausruestung: D.N_GEAR,
    waren: D.TRADE.length,
    wohnsitze: D.HOMES.length,
    relichaendler: D.RELIC_SHOPS.length,
    schiffe: D.SHIPS.length,
    schiffsteile: D.SHIP_PARTS.length,
    inseln: D.ISLANDS.length,
    reittiere: D.MOUNTS.length,
    questreihen: D.QUESTS.length,
    bosse: D.BOSSES.length,
    gruppen: D.GARDEN.length,
    charaktere: D.META.gardenChars,
  };
}

export function COUNT_CHECK(ctx) {
  const D = lade(ctx);
  return {
    regex: /<tr id="dlc-/g,
    expected: D.SHIPS.length + D.SHIP_PARTS.length + D.ISLANDS.length + D.MOUNTS.length + D.QUESTS.length
      + D.BOSSES.length + D.GARDEN.length + D.GEAR_W.length + D.GEAR_A.length
      + D.TRADE.length + D.HOMES.length + D.RELIC_SHOPS.length + D.GEAR_EXTRA.length,
    label: "DLC-Datenzeilen",
  };
}

export function build(ctx) {
  const { esc, has, breadcrumbLd, slug } = ctx.helpers;
  const D = lade(ctx);
  const M = D.META;

  // Wert -> HTML (Vertrag siehe Kopf). Nur das eigene c zaehlt; ganze unbestaetigte Zeilen faerbt ihre Zeilenklasse.
  const obj = (x) => (x && typeof x === "object" && !Array.isArray(x) ? x : { v: x });
  const flag = (c, q) => `<span class="ctu-flag">${esc((c === "nb" ? "nicht belegt" : "unbestätigt") + (q ? ": " + q : ""))}</span>`;
  const val = (x) => {
    if (x == null || x === "") return "";
    if (Array.isArray(x)) return x.map(val).filter(Boolean).join(" ");
    const o = obj(x), c = o.c || "ok", t = esc(o.v);
    if (c === "ok") return t;
    const f = c === "nb" && /nicht belegt/i.test(String(o.v)) ? "" : " " + flag(c, o.q);
    return `<span class="ctu-${c === "nb" ? "nb" : "unb"}">${t}${f}</span>`;
  };
  // Zahl nur aus einer Quelle (val_q aus d01/d02): Vermerk; val_part = nur ein Teil unbestaetigt, daher nicht grau.
  const valQ = (t, x) => (!x || !x.val_q ? esc(t) : x.val_part ? `${esc(t)} ${flag("unb", x.val_q)}` : `<span class="ctu-unb">${esc(t)} ${flag("unb", x.val_q)}</span>`);
  const vT = (x) => (typeof x === "string" ? deT(x) : x);
  const name = (e) => `<strong>${esc(deN(e.name))}</strong>${e.de && e.de !== deN(e.name) ? ` (${esc(e.de)})` : ""}${e.c && e.c !== "ok" ? " " + flag(e.c, e.q) : ""}`;
  const facts = (rows) => `<dl class="ctu-facts">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${val(v)}</dd></div>`).join("")}</dl>`;
  const list = (arr) => `<ul class="ctu-list">${[].concat(arr || []).map((x) => `<li>${val(x)}</li>`).join("")}</ul>`;

  // Anker-ids muessen eindeutig sein. In d12 ist eine Kollision ein Datenfehler (Abbruch); bei den Waffen und
  // Ruestungen aus d01/d02 bekommt ein doppelter Name eine laufende Nummer, damit fremde Daten den Lauf nicht kippen.
  const vergeben = new Set();
  const rid = (pfx, n) => {
    let id = `dlc-${pfx}-${slug(n)}`;
    if (vergeben.has(id)) {
      if (pfx !== "waffe" && pfx !== "ruestung" && pfx !== "geraet") throw new Error(`charting-the-unknown.mjs: doppelter Anker ${id}`);
      let i = 2;
      while (vergeben.has(`${id}-${i}`)) i++;
      id = `${id}-${i}`;
    }
    vergeben.add(id);
    return id;
  };
  // Zelle: HTML-String oder {h, cls}
  const tr = (id, e, cells) => `<tr id="${id}"${e && e.c && e.c !== "ok" ? ` class="ctu-row-${e.c}"` : ""}>${cells.map((c) =>
    (typeof c === "object" ? `<td class="${c.cls}">${c.h}</td>` : `<td>${c}</td>`)).join("")}</tr>`;
  const table = (cols, rows) => `<div class="tbl-wrap"><table>
<thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
<tbody>${rows.join("\n")}</tbody>
</table></div>`;

  // Zelle: leeres Feld = "nicht belegt" (grau), wenn leer=true; sonst bleibt sie leer. da = Feld belegt?
  const cell = (x, leer) => val(x) || (leer ? '<span class="ctu-nb">nicht belegt</span>' : "");
  const da = (arr, k) => arr.some((e) => e && val(e[k]) !== "");
  // Spalten nur, wenn mindestens ein Eintrag das optionale Feld hat: opt(arr, [[Feld, Kopf, leer?], ...])
  const optCols = (arr, defs) => defs.filter(([k]) => da(arr, k));
  // Quest-Schritte {name, d, reward, c, q}: nummerierte Liste, unbestaetigte Schritte grau mit Vermerk.
  const stepsHtml = (steps) => `<ol class="ctu-st">${steps.map((st) => {
    const o = typeof st === "string" ? { name: st } : st || {}, bad = o.c && o.c !== "ok";
    const d = val(o.d), rw = val(o.reward);
    return `<li${bad ? ' class="ctu-unb"' : ""}><b>${esc(o.name || "Schritt")}</b>${d ? "<br>" + d : ""}${rw ? "<br>Belohnung: " + rw : ""}${bad ? " " + flag(o.c, o.q) : ""}</li>`;
  }).join("")}</ol>`;

  const z = ZAHLEN(ctx);
  const nGear = D.N_GEAR;

  // ── Abschnitte ──
  const zugang = `<h2>Überblick und Zugang</h2>
${facts([["Voller Titel", M.full], ["Erschienen", M.release], ["Patch", `${M.patch}; danach ${M.hotfixes}`], ["Preis", M.price], ["Plattformen", M.platforms]])}
<h3 class="ctu-h">Voraussetzungen und Start</h3>
<ol class="ctu-steps">${D.ACCESS.map((s) => `<li><b>${esc(s.t)}:</b> ${esc(s.d)}${s.u ? " " + val(s.u) : ""}</li>`).join("")}</ol>
${D.WARN.map((w) => `<p class="ctu-warn"><b>${esc(w.t)}:</b> ${esc(w.d)}</p>`).join("\n")}`;

  const sV = da(D.SHIPS, "vendor"), sC = da(D.SHIPS, "crew");
  const schiffe = `<h2>Schiffe (${D.SHIPS.length})</h2>
<p class="note">Werte in der Reihenfolge Health / Inventar / Tempo / Beschleunigung / Handling.</p>
${table(["Schiff", "Preis", ...(sV ? ["Verkäufer"] : []), "Erhalt", "Werte", ...(sC ? ["Besatzung"] : [])],
    D.SHIPS.map((s) => tr(rid("schiff", s.name), s, [name(s), val(s.price), ...(sV ? [cell(s.vendor, true)] : []),
      val(s.obtain), val(s.stats), ...(sC ? [cell(s.crew, true)] : [])])))}
${list(D.SHIP_NOTES)}
<h3 class="ctu-h">Händler, Währung, Seekampf</h3>
${facts(D.SHIP_FACTS)}${D.TRADE.length ? `
<h3 class="ctu-h">Seehandel: Waren (${D.TRADE.length})</h3>
${table(["Ware", "Einkauf", "Verkauf", "Hinweis"],
    D.TRADE.map((t) => tr(rid("ware", t.name), t, [name(t), cell(t.buy, true), cell(t.sell, true), cell(t.note)])))}` : ""}`;

  const bau = `<h2>Schiffsbau und Besatzung</h2>
${facts(D.SHIPBUILD)}
<h3 class="ctu-h">Besatzung: ${D.CREW.length} Rollen</h3>
<ul class="ctu-list">${D.CREW.map((r) => `<li><b>${esc(deT(r.role))}:</b> ${esc(r.d)}</li>`).join("")}</ul>
${list(D.CREW_NOTES)}`;

  const teile = `<h2>Schiffsteile (${D.SHIP_PARTS.length})</h2>
${list(D.PART_NOTES)}
${table(["Teil", "Typ", "Größe", "Händler / Erhalt", "Preis", "Boni"],
    D.SHIP_PARTS.map((p) => tr(rid("teil", p.name), p, [name(p), esc(deT(p.type)), val(vT(p.size)), val(p.vendor), val(p.price), val(p.bonus)])))}`;

  const iCols = optCols(D.ISLANDS, [["where", "Lage"], ["nexus", "Abyss Nexus"], ["unlock", "Erschließung"]]);
  const inseln = `<h2>Inseln (${D.ISLANDS.length})</h2>
<p class="note">Benannte Inseln aus den Guides. Eine Gesamtzahl nennt Pearl Abyss nicht; in der App lassen sich die Inseln abhaken.</p>
${table(["Insel", ...iCols.map(([, kopf]) => kopf), "Angaben"],
    D.ISLANDS.map((i) => tr(rid("insel", i.name), i, [name(i), ...iCols.map(([k]) => cell(i[k], true)), val(i.info)])))}
<h3 class="ctu-h">Ozean, Erschließung, Häfen</h3>
${facts(D.ISLAND_FACTS)}`;

  const tauchen = `<h2>Tauchen</h2>
${facts(D.DIVE)}${D.RELIC_SHOPS.length ? `
<h3 class="ctu-h">Relic-Händler (${D.RELIC_SHOPS.length})</h3>
${table(["Händler", "Ort", "Sortiment", "Freischaltung"],
    D.RELIC_SHOPS.map((r) => tr(rid("relic", r.name), r, [name(r), cell(r.where, true), cell(r.sells, true), cell(r.unlock)])))}` : ""}`;

  const mW = da(D.MOUNTS, "where"), mT = da(D.MOUNTS, "trust"), mS = da(D.MOUNTS, "stats");
  const reittiere = `<h2>Unterwasser-Reittiere (${D.MOUNTS.length})</h2>
${table(["Reittier", ...(mW ? ["Fundort"] : []), "Zähmen", ...(mT ? ["Vertrauen"] : []), ...(mS ? ["Werte"] : [])],
    D.MOUNTS.map((m) => tr(rid("reittier", m.name), m, [name(m), ...(mW ? [cell(m.where, true)] : []), val(m.how),
      ...(mT ? [cell(m.trust, true)] : []), ...(mS ? [cell(m.stats, true)] : [])])))}
${facts(D.MOUNT_FACTS)}
<p class="note">Pferde, Drachen und Fahrzeuge aus dem Hauptspiel stehen bei den <a href="/mounts">Reittieren</a>.</p>`;

  const stepsOf = (q) => (Array.isArray(q.steps) ? q.steps.filter(Boolean) : []);
  const subsHtml = (q) => {
    const st = stepsOf(q);
    if (st.length) return stepsHtml(st);
    const o = obj(Array.isArray(q.subs) ? q.subs[0] : q.subs);
    if (o.c === "nb") return val(o);
    if (!String(o.v || "").trim()) return val({ v: "nicht belegt", c: "nb" });
    const teile2 = String(o.v || "").split(/\s*;\s*/).filter(Boolean).map(esc).join("; ");
    return o.c && o.c !== "ok" ? `<span class="ctu-unb">${teile2}</span> ${flag(o.c, o.q)}` : teile2;
  };
  const quests = `<h2>DLC-Quests (${D.QUESTS.length})</h2>
${list(D.QUEST_NOTES)}
${table(["Questreihe", "Figur / Start", D.QUESTS.some((q) => stepsOf(q).length) ? "Schritte und Unterquests (Reihenfolge laut Guide)" : "Unterquests (Reihenfolge laut Guide)", "Belohnungen"],
    D.QUESTS.map((q) => tr(rid("quest", q.name), q, [name(q),
      esc(deT(q.who)) + (q.start ? "<br>Start: " + val(q.start) : "") + (val(q.req) ? "<br>Voraussetzung: " + val(q.req) : ""),
      { h: subsHtml(q), cls: "ctu-sub" }, val(q.rewards) + (q.note ? "<br>" + val(q.note) : "")])))}
<p class="note">Alle übrigen Graumähnen-Quests stehen bei den <a href="/fraktionen">Fraktionsquests</a>.</p>`;

  const bosse = `<h2>Bosse (${D.BOSSES.length})</h2>
${list(D.BOSS_NOTES)}
${table(["Boss", "Ort und Kontext", "Beute"],
    D.BOSSES.map((b) => tr(rid("boss", b.name), b, [name(b) + (b.w ? `<br><a href="/bosse#boss-${slug(b.w)}">in der Bossliste</a>` : ""),
      val(b.where) + (b.note ? " " + val(b.note) : ""), val(b.drop)])))}`;

  const garten = `<h2>Garten der Prüfungen (${D.GARDEN.length} Gruppen)</h2>
${facts(D.GARDEN_RULES)}
${table(["Gruppe", "Bosse", "Belohnung"],
    D.GARDEN.map((g) => {
      const links = [].concat(g.b || []).map((n) => `<a href="/bosse#boss-${slug(n)}">${esc(deN(n))}</a>`).join(", ");
      return tr(rid("garten", g.name), null, [`${esc(g.n)}. ${esc(g.name)}`,
        g.bc === "ok" ? links : `<span class="ctu-unb">${links}</span> ${flag("unb", g.bq || "GameRant")}`, esc(g.reward)]);
    }))}
${list([D.GARDEN_NOTE])}`;

  const gruppen = [...new Set(D.LIVING.map((x) => x.g))];
  const leben = `<h2>Burgen, Wohnen, Verwaltung und Soziales</h2>
${gruppen.map((g) => `<h3 class="ctu-h">${esc(g)}</h3>
<ul class="ctu-list">${D.LIVING.filter((x) => x.g === g).map((x) => `<li><b>${esc(x.t)}:</b> ${val(x.d)}</li>`).join("")}</ul>`).join("\n")}${D.HOMES.length ? `
<h3 class="ctu-h">Wohnsitze (${D.HOMES.length})</h3>
${table(["Wohnsitz", "Ort", "Erwerb", "Hinweis"],
    D.HOMES.map((x) => tr(rid("wohnsitz", x.name), x, [name(x), cell(x.where, true), cell(x.how, true), cell(x.note)])))}` : ""}`;

  const gearNamen = new Set(D.GEAR_W.map((w) => w.name));
  const tools = D.GEAR_TOOLS.filter((t) => !gearNamen.has(t));
  const ausruestung = `<h2>Neue DLC-Ausrüstung (${nGear})</h2>
${list(D.GEAR_NOTES)}
${D.GEAR_W.length ? `<h3 class="ctu-h">Waffen (${D.GEAR_W.length})</h3>
${table(["Waffe", "Typ", "ATK", "Fundort"], D.GEAR_W.map((w) => tr(rid("waffe", w.name), null,
    [`<strong>${esc(deN(w.name))}</strong><span class="dlc-gtag">DLC</span>`, esc(deT(w.type || "")), has(w.atk) ? valQ(w.atk, w) : has(w.def) ? valQ("DEF " + w.def, w) : '<span class="ctu-nb">nicht erfasst</span>', has(w.source) ? esc(w.source) : '<span class="ctu-nb">nicht erfasst</span>'])))}` : ""}
${D.GEAR_A.length ? `<h3 class="ctu-h">Rüstungen (${D.GEAR_A.length})</h3>
${table(["Rüstung", "Teil", "Effekt", "Fundort"], D.GEAR_A.map((a) => tr(rid("ruestung", a.name), null,
    [`<strong>${esc(deN(a.name))}</strong><span class="dlc-gtag">DLC</span>`, esc(deT(a.type || "")), has(a.effect) ? valQ(a.effect, a) : '<span class="ctu-nb">nicht erfasst</span>', has(a.source) ? esc(a.source) : '<span class="ctu-nb">nicht erfasst</span>'])))}` : ""}
${D.GEAR_EXTRA.length ? `<h3 class="ctu-h">Weitere Ausrüstung (${D.GEAR_EXTRA.length})</h3>
${table(["Name", "Art", "Slot", "Charakter", "Werte", "Erhalt"], D.GEAR_EXTRA.map((g) => {
    const s = val(g.source), r = val(g.req);
    return tr(rid("geraet", g.name), g, [name(g), cell(vT(g.kind), true), cell(g.slot, true), cell(vT(g.char), true), cell(g.stats, true),
      s || r ? s + (r ? (s ? "<br>" : "") + "Voraussetzung: " + r : "") : '<span class="ctu-nb">nicht belegt</span>']);
  }))}` : ""}
${D.GEAR_X.length ? `<p class="note">Neue Accessoires: ${D.GEAR_X.map((x) => `<strong>${esc(deN(x.name))}</strong> (${[deT(x.type), x.source].filter(Boolean).map(esc).join(", ")})`).join("; ")}. Details auf der Seite <a href="/accessoires">Accessoires</a>.</p>` : ""}
${D.GEAR_K.length ? `<p class="note">Neue Abyss-Kerne: ${D.GEAR_K.map((x) => `<strong>${esc(deN(x.name))}</strong> (${[deT(x.slot), deT(x.source)].filter(Boolean).map(esc).join(", ")})`).join("; ")}. Details auf der Seite <a href="/abyss-cores">Abyss-Ausrüstung</a>.</p>` : ""}
${nGear ? "" : '<p class="note">Im Datenbestand ist noch keine Waffe und keine Rüstung als DLC-Inhalt gekennzeichnet; die Einträge erscheinen hier automatisch.</p>'}
${tools.length ? `<p class="note">Offiziell neu sind außerdem im Kampf einsetzbare Alltagswerkzeuge: ${tools.map((t) => `${esc(t)} (${esc(D.GEAR_TOOLS_DE[t] || "")})`).join(", ")}. Werte, Fundort und Waffentyp sind nicht belegt.</p>` : ""}
<p class="note">Alle gekennzeichneten Einträge tragen auf den Seiten <a href="/waffen">Waffen</a> und <a href="/ruestungen">Rüstungen</a> das Etikett <span class="dlc-gtag">DLC</span>. Jede Themen-Seite hat oben einen eigenen Abschnitt „Neu mit Charting the Unknown“: <a href="/waffen#dlc">Waffen</a>, <a href="/ruestungen#dlc">Rüstungen</a>, <a href="/accessoires#dlc">Accessoires</a>, <a href="/abyss-cores#dlc">Abyss-Ausrüstung</a>, <a href="/bosse#dlc">Bosse</a>, <a href="/mounts#dlc">Reittiere</a> und <a href="/hauptquests#dlc">Quests</a>.</p>`;

  const offen = `<h2>Was noch offen ist (${D.OPEN.length})</h2>
<ul class="ctu-list">${D.OPEN.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

  const quellen = `<p class="ctu-src">Quellen: ${D.SOURCES.map((s) => `<a href="${esc(s.url)}" rel="nofollow noopener noreferrer" target="_blank">${esc(s.t)}</a>`).join(" &middot; ")}. Geprüft am ${esc(M.checked)}${M.recheck && M.recheck !== M.checked ? ` (einzelne Seiten erneut am ${esc(M.recheck)})` : ""}.</p>`;

  const body = `
<a class="cta" href="${DEEPLINK}">Alles zum DLC interaktiv in der App öffnen &rarr;</a>
<p class="note">In der App hakst du besuchte Inseln ab und filterst die Schiffsteile nach Typ. <strong>Belegt</strong> heißt: offizielle Notes von Pearl Abyss oder mindestens zwei unabhängige Guides. Grau mit Vermerk ${flag("unb")} nennt nur eine Quelle, ${flag("nb")} heißt gesucht, aber nichts gefunden. Release, Preis und die vollständige Featureliste stehen bei den <a href="/patch-notes">Patch-Notes</a>.</p>
${zugang}
${schiffe}
${bau}
${teile}
${inseln}
${tauchen}
${reittiere}
${quests}
${bosse}
${garten}
${leben}
${ausruestung}
${offen}
${quellen}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Charting the Unknown", SLUG),
      {
        "@type": "Article",
        headline: "Crimson Desert DLC Charting the Unknown: Schiffe, Inseln, Tauchen und Quests",
        inLanguage: "de-DE",
        author: { "@type": "Person", name: "Christian Stein" },
        about: { "@type": "VideoGame", name: "Crimson Desert" },
      },
      {
        "@type": "ItemList",
        name: "Schiffe im DLC Charting the Unknown",
        numberOfItems: D.SHIPS.length,
        itemListElement: D.SHIPS.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: deN(s.name) })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: "Charting the Unknown DLC: Schiffe, Inseln & Guide",
    desc: `Crimson Desert DLC Charting the Unknown: ${z.schiffe} Schiffe, ${z.schiffsteile} Schiffsteile, Inseln, Tauchen, Haie, Quests, Garten der Prüfungen und neue Ausrüstung.`,
    h1: "Charting the Unknown: alle DLC-Inhalte",
    lead: `Alles Neue aus dem ersten DLC von Crimson Desert: <strong>${z.schiffe} Schiffe</strong> mit Preis und Erhalt, soweit belegt, ${z.schiffsteile} Schiffsteile, ${z.inseln} benannte Inseln, Tauchen, ${z.reittiere} Unterwasser-Reittiere, ${z.questreihen} Questreihen, ${z.bosse} Bosse und Gegner aus dem DLC (teils bekannte Namen aus dem Hauptspiel) und die ${z.gruppen} Gruppen im Garten der Prüfungen.`,
    ogImage: null,
    crumb: "Charting the Unknown",
    bodyHtml: body,
    jsonld,
  };
}

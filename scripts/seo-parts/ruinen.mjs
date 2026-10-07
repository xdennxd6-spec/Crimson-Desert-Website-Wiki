// parts/ruinen.mjs — SEO-Seite "Uralte Ruinen" (Abyss-Grenzstein-Raetsel).
//
// Datenquelle: RUINS_DATA ({ Region: [ruine, ...] }) und RUINS_REGION_ORDER
// (data/d08-ruins-data.js). Stand 07.10.2026: 37 Ruinen in 5 Regionen (Hernand 15,
// Pailune 5, Demeniss 7, Delesyia 8, Crimson Desert 2). Jede Ruine traegt
// { ar, name, de, loc, mech, reward, steps[], warn[], imgs[], srcs[{n,u}], conf,
// conflicts }. Die App (_ruinCard/renderRuins in index.html) zeigt: AR-Nummer, Name,
// deutschen Namen (falls vorhanden), Ort, Mechanik, Belohnung, nummerierte
// Loesungsschritte, Hinweise, Lösungsbilder, Quellenlinks und ein conf-Badge. Die
// Seite zeigt dieselben Felder in derselben Reihenfolge.
//
// WICHTIG zum Laden: d08-ruins-data.js deklariert die Daten mit "var", nicht mit
// "const". ctx.helpers.extract() sucht nur "const NAME = [" und fand RUINS_DATA
// daher nicht. Das Modul versucht zuerst extract() (falls die Daten einmal auf
// "const" umgestellt werden) und liest sonst die Datei data/d08-ruins-data.js
// selbst ein und fuehrt sie in einem leeren vm-Kontext aus (die Datei enthaelt nur
// drei Variablendeklarationen, sonst nichts). Das aendert keine Datei.
//
// conf: "high" -> Badge "verifiziert"; "medium" -> Badge "geprüft · exakte Sequenz
// quellenabhängig" (Wortlaut der App) und, ANDERS als in der App (dort nur als
// Tooltip), das Feld "conflicts" als aufklappbarer Text, weil ein Tooltip ohne
// Maus/JS fuer Leser und Crawler nicht existiert. Bei "high" wird conflicts wie in
// der App nicht gezeigt.
//
// Bilder: Die Lösungs-Screenshots liegen bei PowerPyx (RUIN_B + imgs[i] + ".jpg",
// Vorschau "-300x169.jpg"). Die App bindet sie genauso extern ein. Am 07.10.2026
// geprueft: alle 160 Vorschaubilder und alle 160 Originale antworten mit HTTP 200
// (Vorschau jeweils 300x169), kein Hotlink-Schutz (auch mit Referer der Domain),
// robots.txt von powerpyx.com erlaubt alles. Ob eine dauerhafte Einbindung fremder
// Screenshots rechtlich gewuenscht ist, ist eine Entscheidung des Betreibers: mit
// MIT_BILDERN = false entfaellt jede Bildeinbindung, der Rest der Seite bleibt
// gleich. Vorschau und Link auf das Original, Quelle im Bildtext.
//
// ctx = { data, helpers: { esc, has, imgSrc, slug, breadcrumbLd, SITE, extract } }

import fs from "fs";
import vm from "vm";
import { fileURLToPath } from "url";

export const SLUG = "ruinen";
export const NAV_LABEL = "Uralte Ruinen";
export const DEEPLINK = "/#sec-ruins";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

const MIT_BILDERN = true;

export const EXTRA_CSS = `
.ru-list{display:flex;flex-direction:column;gap:14px;margin-top:14px}
article.card .ru-ar{display:inline-block;margin-right:8px;padding:2px 8px;border-radius:7px;background:var(--red);color:#160a08;font-family:var(--f-mono);font-size:var(--fs-11);font-weight:700;letter-spacing:.08em;vertical-align:middle}
p.ru-de{margin:-4px 0 0;font-family:var(--f-mono);font-size:var(--fs-11-5);font-style:italic;color:var(--ink-faint)}
ol.ru-steps{margin:2px 0 0;padding-left:22px;font-size:13.5px;color:var(--ink)}
ol.ru-steps li{margin:0 0 5px}
div.ru-warn{margin:4px 0 0;padding:8px 12px;font-size:13px;color:var(--ink);background:rgba(255,90,68,.08);border-left:2px solid var(--red);border-radius:8px}
div.ru-warn ul{margin:5px 0 0;padding-left:18px}
div.ru-warn li{margin:0 0 3px}
div.ru-imgs{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
div.ru-imgs a{display:block;line-height:0}
article.card img.ru-img{width:300px;max-width:100%;height:auto;aspect-ratio:16/9;object-fit:cover}
p.ru-src{margin:4px 0 0;padding-top:8px;border-top:1px solid var(--line);font-family:var(--f-mono);font-size:var(--fs-11);color:var(--ink-faint);line-height:1.7}
span.ru-conf{font-weight:700;color:#7fc17b}
span.ru-conf.ru-med{color:var(--amber)}
details.ru-conflicts{margin:2px 0 0;font-size:13px;color:var(--ink-dim)}
details.ru-conflicts>summary{cursor:pointer;font-family:var(--f-mono);font-size:var(--fs-11);color:var(--amber)}
details.ru-conflicts>p{margin:6px 0 0}
`.trim();

// ── Daten laden ──────────────────────────────────────────────────────────────
let _cache = null;
function lade(ctx) {
  if (_cache) return _cache;
  try {
    _cache = {
      data: ctx.helpers.extract("RUINS_DATA"),
      order: ctx.helpers.extract("RUINS_REGION_ORDER"),
      base: "https://www.powerpyx.com/wp-content/uploads/",
    };
    return _cache;
  } catch { /* "var" statt "const": Datei direkt lesen */ }
  const datei = fileURLToPath(new URL("../../data/d08-ruins-data.js", import.meta.url));
  const sandbox = {};
  vm.runInNewContext(fs.readFileSync(datei, "utf8"), sandbox, { filename: "d08-ruins-data.js" });
  _cache = { data: sandbox.RUINS_DATA, order: sandbox.RUINS_REGION_ORDER, base: sandbox._RUIN_B };
  return _cache;
}

function regionen(ctx) {
  const { data, order } = lade(ctx);
  // wie renderRuins(): nur Regionen aus RUINS_REGION_ORDER, leere Regionen entfallen
  return order.filter((r) => (data[r] || []).length).map((r) => ({ name: r, items: data[r] }));
}

export function COUNT_CHECK(ctx) {
  return {
    regex: /<article class="card" id="ruine-/g,
    expected: regionen(ctx).reduce((s, r) => s + r.items.length, 0),
    label: "Ruinen-Karten",
  };
}

// Schluessel der Regionsanzahlen fuer Platzhalter: "r_" + Regionsname als [a-z_]+
// (z. B. r_hernand, r_crimson_desert). Fehlt ein Schluessel im Text-JSON, bricht
// der Build ab; eine umbenannte Region faellt also auf.
const regKey = (name, slug) => "r_" + slug(name).replace(/-/g, "_");

export function ZAHLEN(ctx) {
  const { slug } = ctx.helpers;
  const rg = regionen(ctx);
  const alle = rg.flatMap((r) => r.items);
  const z = {
    anzahl: alle.length,
    regionen: rg.length,
    unsicher: alle.filter((p) => p.conf === "medium").length,
  };
  for (const r of rg) z[regKey(r.name, slug)] = r.items.length;
  return z;
}

function karte(p, ctx) {
  const { esc, has, slug } = ctx.helpers;
  const { base } = lade(ctx);

  const stats = [];
  if (has(p.loc)) stats.push(["Ort", p.loc]);
  if (has(p.mech)) stats.push(["Mechanik", p.mech]);
  if (has(p.reward)) stats.push(["Belohnung", p.reward]);
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("");

  const steps = (p.steps || []).length
    ? `<ol class="ru-steps">${p.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : "";
  const warn = (p.warn || []).length
    ? `<div class="ru-warn"><b>⚠ Hinweise</b><ul>${p.warn.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div>` : "";

  let bilder = "";
  if (MIT_BILDERN && (p.imgs || []).length) {
    const tags = p.imgs.map((b, i) =>
      `<a href="${esc(base + b + ".jpg")}" target="_blank" rel="noopener noreferrer"><img class="ru-img" loading="lazy" src="${esc(base + b + "-300x169.jpg")}" alt="${esc(`${p.name}: Lösungs-Screenshot ${i + 1} (PowerPyx) in Crimson Desert`)}" width="300" height="169"></a>`).join("");
    bilder = `<div class="ru-imgs">${tags}</div>`;
  }

  const quellen = (p.srcs || []).map((s) =>
    `<a href="${esc(s.u)}" target="_blank" rel="noopener noreferrer">${esc(s.n)}</a>`).join(" · ");
  const medium = p.conf === "medium";
  const badge = medium
    ? `<span class="ru-conf ru-med">geprüft · exakte Sequenz quellenabhängig</span>`
    : `<span class="ru-conf">verifiziert</span>`;
  const quelleZeile = `<p class="ru-src">${quellen ? `Quellen: ${quellen} · ` : ""}${badge}${
    MIT_BILDERN && bilder ? " · Screenshots: PowerPyx" : ""}</p>`;
  const konflikt = medium && has(p.conflicts)
    ? `<details class="ru-conflicts"><summary>Warum nur eingeschränkt gesichert?</summary><p>${esc(p.conflicts)}</p></details>` : "";

  return `<article class="card" id="ruine-${slug(p.name)}">
<h3><span class="ru-ar">AR${esc(p.ar)}</span> ${esc(p.name)}</h3>
${has(p.de) ? `<p class="ru-de">${esc(p.de)}</p>` : ""}
<ul class="stats">${statsHtml}</ul>
${steps}
${warn}
${bilder}
${konflikt}
${quelleZeile}
</article>`;
}

export function build(ctx) {
  const { esc, breadcrumbLd } = ctx.helpers;
  const z = ZAHLEN(ctx);
  const rg = regionen(ctx);

  const sections = rg.map((r) => `<h2>🏛️ ${esc(r.name)} (${r.items.length})</h2>
<div class="ru-list">${r.items.map((p) => karte(p, ctx)).join("\n")}</div>`).join("\n");

  const verteilung = rg.map((r) => `${esc(r.name)} ${r.items.length}`).join(" · ");

  // Erklaerungstexte: Wortlaut aus sec-ruins in index.html (disarm-hero und ruin-note).
  const body = `
<a class="cta" href="${DEEPLINK}">Uralte Ruinen in der App öffnen &rarr;</a>
<p class="strat"><b>Abyss-Grenzsteine</b> (Abyss Cressets in den „Uralten Ruinen“) sind Schnellreise-Knoten, die du durch das Lösen eines <b>Rätsels</b> freischaltest. Jeder gelöste Grenzstein gibt <b>1 Abyss-Artefakt</b> (Lernwährung für Fähigkeiten) und einen Schnellreisepunkt. Zu unterscheiden vom <b>Abyss-Nexus</b> (einfach betreten, kein Rätsel), von den versteckten <b>Abyss-Cressets</b> der Oberwelt und von den Sky-/Restoration-Puzzles im Abyss. Nicht jeder Energiepunkt hat ein Rätsel; hier stehen nur die <b>mit</b> Rätsel.</p>
<p class="note"><b>Alle ${z.anzahl} Abyss-Grenzstein-Rätsel über ${z.regionen} Regionen:</b> ${verteilung}. Regionszuordnung nach PowerPyx (deckt sich mit dem In-Game-Regionszähler); einzelne grenznahe Orte ordnen andere Guides abweichend ein. „Mysteriöse Energie“ steht in den Rätselbeschreibungen für die Kartenmarkierung „Mysterious Energy“ (game8: Orte, die ein Abyss Nexus oder ein Abyss Cresset sein können); der deutsche Spieltext dazu ist nicht belegt.</p>
<p class="note">Das Badge „geprüft · exakte Sequenz quellenabhängig“ markiert Rätsel, bei denen Guides Details wie die genaue Zugnummerierung unterschiedlich angeben. Die Begründung steht aufklappbar auf der Karte. Alle Lösungen wurden gegen mehrere unabhängige Text- und Bild-Guides abgeglichen (keine Videos).</p>
<p class="note">Die versteckten Cressets der Oberwelt findest du unter <a href="/geheimnisse">Secrets &amp; Lore</a>, Strongboxes und Abyss-Rätsel auf der Seite <a href="/raetsel">Rätsel</a>. Für die Trophäe „Puzzle Solver“ müssen alle Rätsel der Antiken Ruinen gelöst werden, siehe <a href="/trophaeen">Trophäen</a>.</p>
${sections}`;

  const alle = rg.flatMap((r) => r.items.map((p) => p.name));
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Uralte Ruinen", SLUG),
      {
        "@type": "ItemList",
        name: "Uralte Ruinen und Abyss-Grenzstein-Rätsel in Crimson Desert",
        numberOfItems: alle.length,
        itemListElement: alle.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Uralte Ruinen in Crimson Desert: ${z.anzahl} Rätsel mit Lösung`,
    desc: `Alle ${z.anzahl} Rätsel der Uralten Ruinen (Abyss-Grenzsteine) in Crimson Desert mit Ort, Lösungsschritten, Hinweisen und Belohnung in ${z.regionen} Regionen. Deutsch.`,
    h1: `Uralte Ruinen in Crimson Desert: ${z.anzahl} Rätsel mit Lösung`,
    lead: `Diese Übersicht führt <strong>alle ${z.anzahl} Rätsel der Uralten Ruinen</strong> (Abyss-Grenzsteine) in ${z.regionen} Regionen auf, jeweils mit Ort, Mechanik, Belohnung, nummerierten Lösungsschritten, Hinweisen und Quellen.`,
    ogImage: null,
    crumb: "Uralte Ruinen",
    bodyHtml: body,
    jsonld,
  };
}

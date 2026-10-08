// SEO-Seitenmodul: Abyss Cores (CORES; Icons aus CORE_IMGS, Stufenwerte aus CORE_TIERS).
//
// Datenform (Stand 07.10.2026, per node inspiziert): CORES ist ein Array aus 71 Objekten mit
// genau {name, effect, source, slot}; slot ist "Weapon" (30), "Armor" (27) oder "Both" (14,
// deutsch "Waffe/Hand/Fuß" laut SLOT_DE). Es gibt kein conf-Feld; Unsicherheit steckt im
// Quellentext ("Quelle nicht belegt", "Spezial-Synthese-Angabe nicht belegt") und im Alias-Hinweis
// zum Rampaging-Core, den renderCores() in der App aus coreGreaterNote() erzeugt. Beides wird hier
// sichtbar uebernommen. Der Effekttext enthaelt teils den Silberpreis der Hexen-Synthese.
//
// Aufbau wie die App (renderCores): Tabelle Name/Effekt/Quelle, hier nach Slot-Typ in drei
// Abschnitte gegliedert (die App nutzt den Slot-Typ als Filter). Je Core eine
// <tr id="core-<slug(name)>">. Namen sind eindeutig (slug-eindeutig, geprueft).
//
// Bilder: CORE_IMGS[name] (lokal cd_assets/cores/*.webp, 15 Stueck, gemessen 125x125, oder
// questlog-CDN, 54 Stueck, per Range-Request am 07.10.2026 durchgehend 256x256). Zwei Cores
// (Breath of Life I, Rampaging Insight) haben kein Bild; dort steht wie in der App ein Symbol.
// Das lokale Bild hat in der App die CDN-URL als onerror-Fallback; fuer die statische Seite
// zaehlt nur die Hauptquelle.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SLUG = "abyss-cores";
export const NAV_LABEL = "Abyss-Ausrüstung";
export const DEEPLINK = "/#sec-cores";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

// Nur eigene Klassen mit Praefix "crs-". Keine At-Regeln.
export const EXTRA_CSS = `
td.crs-n{min-width:190px}
td.crs-n strong{color:var(--ink-hi)}
img.crs-img{width:44px;height:44px;object-fit:contain;border-radius:7px;background:rgba(255,255,255,.04);padding:3px;vertical-align:middle;margin-right:9px}
span.crs-ph{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:7px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--ink-faint);vertical-align:middle;margin-right:9px;font-size:16px}
p.crs-tiers{margin:6px 0 0;font-size:12.5px;color:var(--ink-dim)}
p.crs-tiers b{color:var(--amber);font-family:var(--f-mono)}
p.crs-warn{margin:6px 0 0;font-size:12.5px;color:#d9a8ff}
td.crs-src{font-size:12.5px;color:var(--ink-faint)}
div.crs-synth{margin-top:12px;padding:12px 16px;background:var(--panel-2);border:1px solid var(--line);border-radius:12px}
div.crs-synth p{margin:0 0 10px;font-size:14px;color:var(--ink-dim);max-width:78ch}
div.crs-synth p:last-child{margin-bottom:0}
div.crs-synth b{color:var(--ink-hi)}
p.crs-legend{font-size:13.5px;color:var(--ink-dim);max-width:78ch;margin:12px 0 0}
`.trim();

const GRUPPEN = [
  { slot: "Weapon", h2: "⚔️ Cores für Waffen" },
  { slot: "Armor", h2: "🛡️ Cores für Rüstung" },
  { slot: "Both", h2: "🔧 Cores für Waffen, Handschuhe und Schuhe" },
];

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
function dimsLocal(rel) {
  const buf = fs.readFileSync(path.join(ROOT, rel));
  if (buf[0] === 0x89 && buf[1] === 0x50) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const f = buf.toString("ascii", 12, 16);
    if (f === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (f === "VP8L") {
      const [b0, b1, b2, b3] = [buf[21], buf[22], buf[23], buf[24]];
      return { w: 1 + (((b1 & 0x3f) << 8) | b0), h: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)) };
    }
    if (f === "VP8X") return { w: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)), h: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)) };
  }
  throw new Error(`abyss-cores.mjs: Bildmasse von ${rel} nicht lesbar`);
}
const CDN_ICON_PX = 256; // gemessen 07.10.2026, siehe Kopfkommentar

let _cache = null;
function daten(ctx) {
  if (_cache) return _cache;
  const { extract } = ctx.helpers;
  _cache = { cores: extract("CORES"), imgs: extract("CORE_IMGS"), tiers: extract("CORE_TIERS"), slotDe: extract("SLOT_DE") };
  return _cache;
}

// Regeln wie coreGreaterNote() in index.html.
const istRampaging = (c) => /^Rampaging\b/.test(c.name);
const istGreater = (c) => /^Greater\b/.test(c.name) || (/Greater/.test(c.source || "") && !istRampaging(c));

export function COUNT_CHECK(ctx) {
  return { regex: /<tr id="core-/g, expected: daten(ctx).cores.length, label: "Core-Zeilen" };
}

export function ZAHLEN(ctx) {
  const { cores, tiers } = daten(ctx);
  const je = (slot) => cores.filter((c) => c.slot === slot).length;
  return {
    anzahl: cores.length,
    waffe: je("Weapon"), ruestung: je("Armor"), both: je("Both"),
    greater: cores.filter((c) => /^Greater\b/.test(c.name)).length,
    vorgesockelt: cores.filter((c) => /^Vorgesockelt in /.test(c.source)).length,
    tiers: Object.keys(tiers).length,
  };
}

export function build(ctx) {
  const { esc, imgSrc, slug, breadcrumbLd } = ctx.helpers;
  const d = daten(ctx);
  const z = ZAHLEN(ctx);
  const ROM = ["I", "II", "III", "IV", "V"];

  const tierStrip = (name) => {
    const t = d.tiers[name];
    if (!t) return "";
    const fmt = (v) => (t.lv ? "Lv." + v : String(v));
    if (t.single != null) return `<p class="crs-tiers"><b>Stufe</b> ${esc(t.stat)}: ${esc(fmt(t.single))}</p>`;
    return `<p class="crs-tiers"><b>Stufen-Werte</b> ${t.vals.map((v, i) => `<b>${ROM[i]}</b> ${esc(t.stat)}: ${esc(fmt(v))}`).join(" · ")}</p>`;
  };

  const greaterNote = (c) => {
    if (istRampaging(c)) return `<p class="crs-warn">Rampaging-Core (im deutschen Spiel „Wütend“): wahrscheinlich Alias des gleichnamigen Greater-Cores, dessen deutscher Name ebenfalls „Wütende …“ lautet; als eigene Reihe nicht belegt.</p>`;
    if (istGreater(c)) return `<p class="crs-warn">Greater-Core: nur per Spezial-Synthese, mit Haltbarkeit. Er zerbricht und ist nicht reparierbar.</p>`;
    return "";
  };

  const iconHtml = (c) => {
    const img = d.imgs[c.name];
    if (!img) return `<span class="crs-ph" aria-hidden="true">◈</span>`;
    const dim = /^https?:/i.test(img) ? { w: CDN_ICON_PX, h: CDN_ICON_PX } : dimsLocal(img);
    return `<img class="crs-img" loading="lazy" src="${esc(imgSrc(img))}" alt="${esc(c.name)} Abyss Core in Crimson Desert" width="${dim.w}" height="${dim.h}">`;
  };

  const row = (c) => `<tr id="core-${slug(c.name)}">
<td class="crs-n">${iconHtml(c)}<strong>${esc(c.name)}</strong></td>
<td>${esc(c.effect)}${tierStrip(c.name)}${greaterNote(c)}</td>
<td class="crs-src">${esc(c.source)}</td>
</tr>`;

  const table = (liste) => `<div class="tbl-wrap"><table>
<thead><tr><th>Core</th><th>Effekt</th><th>Quelle</th></tr></thead>
<tbody>${liste.map(row).join("\n")}</tbody>
</table></div>`;

  const gruppen = GRUPPEN.map((g) => {
    const liste = d.cores.filter((c) => c.slot === g.slot);
    return `<h2>${g.h2} (${liste.length})</h2>
${table(liste)}`;
  }).join("\n");

  const slotLegende = "Slot-Typ: „Waffe/Hand/Fuß“ passt laut den Sockeldaten von questlog in Waffen (Nah- und Fernkampf, keine Schilde), Handschuhe und Schuhe. „Waffe“ und „Rüstung“ sind Sammelangaben, einzelne Cores sind enger: Tempest of Destruction, Kinetic Burst, Colossal Might, Putrid Touch, The Showstopper und Karmic Pulse passen nur in Handschuhe, Infinite Arrows nur in Fernkampfwaffen; Aegis und Fortification passen auch in Schilde.";

  const synthese = `<h2>🔮 Synthese in Kürze</h2>
<div class="crs-synth">
<p>Abyss-Cores (Abyss Gears) werden bei einer craft-fähigen <b>Hexe</b> erstellt und in Waffen oder Rüstung gesockelt. Quellen sind versiegelte Abyss-Artefakte, Elite-Gegner, Boss-Beute und Welt-Loot. An der Hexe wählst du <i>Craft Abyss Gear</i> und wechselst dann mit R2/RT in den Synthese-Tab.</p>
<p><b>Reguläre Synthese</b> (sicher, deterministisch): Cores mit gleichem Namen und gleicher Stufe werden zu einem Core der nächsthöheren Stufe, die höchste so erreichbare Stufe ist III. Es braucht das passende Blueprint, das bei Hexen kaufbar ist. Nicht jeder Core ist aufwertbar.</p>
<p><b>Spezial-Synthese</b> (Glücksspiel, kein Blueprint): Der Typ des Ergebnisses ist zufällig, nur die Stufe skaliert mit dem Input. Sie ist der einzige Weg zu Greater-Cores. Greater-Cores haben eine Haltbarkeit, zerbrechen nach einiger Nutzung und lassen sich nicht reparieren, sondern müssen neu synthetisiert werden. Die hohen Bane-Werte gehören zu den Greater-Cores und nicht zu Stufe III.</p>
</div>`;

  const body = `
<a class="cta" href="${DEEPLINK}">Core-Datenbank mit Slot-Filter in der App öffnen &rarr;</a>
<p class="note">In der App filterst du die Cores nach Slot-Typ und findest darunter den durchsuchbaren Witch-Synthese-Baum mit allen Rezepten.</p>
<p class="note">Wie die Hexen Cores herstellen und welche Rezepte sie verkaufen, steht unter <a href="/hexen">Hexen &amp; Fusion</a>; viele Cores fallen als Beute von Gegnern aus der <a href="/bosse">Bossliste</a>.</p>
<p class="crs-legend">${esc(slotLegende)}</p>
${gruppen}
${synthese}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Abyss-Ausrüstung", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Abyss Cores in Crimson Desert",
        numberOfItems: d.cores.length,
        itemListElement: d.cores.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${z.anzahl} Abyss Cores in Crimson Desert: Effekte & Quellen`,
    desc: `Alle ${z.anzahl} Abyss Cores in Crimson Desert: ${z.waffe} für Waffen, ${z.ruestung} für Rüstung und ${z.both} für Waffe, Handschuhe und Schuhe, mit Effekt, Quelle und Stufenwerten.`,
    h1: `Alle ${z.anzahl} Abyss Cores in Crimson Desert`,
    lead: `Die Liste aller <strong>${z.anzahl} Abyss Cores</strong>: <strong>${z.waffe}</strong> für Waffen, <strong>${z.ruestung}</strong> für Rüstung und <strong>${z.both}</strong> für Waffe, Handschuhe und Schuhe, jeweils mit Effekt, Quelle bzw. Fundort und, wo bekannt, den Stufenwerten. Greater-Cores und unsichere Zuordnungen sind markiert.`,
    ogImage: null,
    crumb: "Abyss-Ausrüstung",
    bodyHtml: body,
    jsonld,
  };
}

// SEO-Seitenmodul: Skills (KLIFF_STAMINA, KLIFF_SPIRIT, KLIFF_HEALTH, DAMIANE_SKILLS,
// OONGKA_SKILLS, WATCH_AND_LEARN; Icons aus SKILL_IMGS / SKILL_IMGS_BY_CHAR).
//
// Datenform (Stand 07.10.2026, per node inspiziert): die fuenf Baum-Arrays haben je Eintrag
// genau {name, prereq, cost, effect}; WATCH_AND_LEARN hat {skill, loc, miss}. Es gibt kein
// conf-Feld. Die Unsicherheit steckt im Fliesstext der Felder ("laut Fextralife", "laut game8",
// "Einzelquelle") und wird unveraendert uebernommen. Als "verpassbar" gilt wie in der App
// (isMiss() in index.html) ein Baum-Skill, dessen prereq "MISSABLE" oder "NICHT erlernbar"
// enthaelt; bei Watch & Learn das miss-Flag.
//
// Aufbau wie die App (renderSkills): je Charakter Kliff / Damiane / Oongka, bei Kliff getrennt
// nach den drei Baeumen, dazu die Watch-&-Learn-Tabelle. Tabellenlayout (vier Textfelder je
// Skill), eine <tr id="skill-<char>-<name>"> pro Skill. Gleichnamige Skills kommen bei allen
// drei Charakteren vor (z. B. Armed Combat), darum steht der Charakter im Anker. Innerhalb eines
// Charakters sind die Namen eindeutig (Kliff 103 ueber alle drei Baeume, geprueft).
//
// Bilder: SKILL_IMGS_BY_CHAR[Charakter][Name] vor SKILL_IMGS[Name], wie skillImg() der App.
// Lokale Icons (cd_assets/skills/*.webp) werden aus dem Dateikopf gemessen; die questlog-CDN-Icons
// sind laut Range-Request-Messung vom 07.10.2026 durchgehend 200x200 (149 URLs, alle gleich).
// Das Icon hat 12 Skills nicht (Kliff), dort steht wie in der App ein Platzhalter-Symbol.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SLUG = "skills";
export const NAV_LABEL = "Fähigkeiten";
export const DEEPLINK = "/#sec-skills";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

// Nur eigene Klassen mit Praefix "skl-". Keine At-Regeln.
export const EXTRA_CSS = `
td.skl-n{min-width:190px}
td.skl-n strong{color:var(--ink-hi)}
img.skl-img{width:34px;height:34px;object-fit:contain;border-radius:6px;background:#131629;border:1px solid var(--line);vertical-align:middle;margin-right:8px}
span.skl-ph{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:6px;border:1px solid var(--line);background:#131629;color:var(--ink-faint);vertical-align:middle;margin-right:8px;font-size:15px}
span.skl-miss{display:inline-block;margin-left:7px;padding:1px 7px;border-radius:8px;font-family:var(--f-mono);font-size:var(--fs-10);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#160a08;background:var(--red)}
span.skl-ok{color:var(--ink-faint);font-size:12px}
td.skl-cost{min-width:96px;max-width:260px;color:var(--amber);font-size:12.5px}
p.skl-legend{font-size:13.5px;color:var(--ink-dim);max-width:78ch;margin:12px 0 0}
dl.skl-info{margin:12px 0 0;padding:10px 14px;background:var(--panel-2);border:1px solid var(--line);border-radius:12px;font-size:13.5px}
dl.skl-info dt{font-family:var(--f-mono);font-size:var(--fs-11);font-weight:700;color:var(--amber);text-transform:uppercase;letter-spacing:.06em;margin-top:8px}
dl.skl-info dt:first-child{margin-top:0}
dl.skl-info dd{margin:2px 0 0;color:var(--ink-dim)}
`.trim();

// Reihenfolge und Beschriftung der Abschnitte. key = Datenkonstante.
const BAEUME = [
  { key: "KLIFF_STAMINA", char: "Kliff", h2: "Kliff: Stamina-Baum" },
  { key: "KLIFF_SPIRIT", char: "Kliff", h2: "Kliff: Spirit-Baum" },
  { key: "KLIFF_HEALTH", char: "Kliff", h2: "Kliff: Health-Baum und Elemente" },
  { key: "DAMIANE_SKILLS", char: "Damiane", h2: "Damiane: Skill-Tree" },
  { key: "OONGKA_SKILLS", char: "Oongka", h2: "Oongka: Skill-Tree" },
];

// Gleiche Regel wie isMiss() in index.html.
const isMiss = (s) => !!(s.prereq && (s.prereq.includes("MISSABLE") || s.prereq.includes("NICHT erlernbar")));

// Mini-Leser fuer WebP/PNG-Kopf, wie dimsFromBuffer() in gen-seo.mjs (dort nicht importierbar).
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
  throw new Error(`skills.mjs: Bildmasse von ${rel} nicht lesbar`);
}
const CDN_ICON_PX = 200; // gemessen 07.10.2026, siehe Kopfkommentar

let _cache = null;
function daten(ctx) {
  if (_cache) return _cache;
  const { extract } = ctx.helpers;
  const baeume = BAEUME.map((b) => ({ ...b, liste: extract(b.key) }));
  _cache = {
    baeume,
    wl: extract("WATCH_AND_LEARN"),
    imgs: extract("SKILL_IMGS"),
    imgsChar: extract("SKILL_IMGS_BY_CHAR"),
  };
  return _cache;
}

const alleSkills = (d) => d.baeume.flatMap((b) => b.liste.map((s) => ({ s, char: b.char })));

export function COUNT_CHECK(ctx) {
  const d = daten(ctx);
  return {
    regex: /<tr id="(?:skill|wl)-/g,
    expected: alleSkills(d).length + d.wl.length,
    label: "Skill- und Watch-&-Learn-Zeilen",
  };
}

export function ZAHLEN(ctx) {
  const d = daten(ctx);
  const je = (key) => d.baeume.find((b) => b.key === key).liste.length;
  const verpassbarNamen = new Set([
    ...alleSkills(d).filter(({ s }) => isMiss(s)).map(({ s }) => s.name),
    ...d.wl.filter((w) => w.miss).map((w) => w.skill),
  ]);
  return {
    gesamt: alleSkills(d).length,
    charaktere: new Set(d.baeume.map((b) => b.char)).size,
    kliff: d.baeume.filter((b) => b.char === "Kliff").reduce((n, b) => n + b.liste.length, 0),
    stamina: je("KLIFF_STAMINA"), spirit: je("KLIFF_SPIRIT"), health: je("KLIFF_HEALTH"),
    damiane: je("DAMIANE_SKILLS"), oongka: je("OONGKA_SKILLS"),
    wl: d.wl.length,
    verpassbar: verpassbarNamen.size,
  };
}

// Texte der Charakter-Kaesten, wortgleich aus renderSkills() in index.html (Stand 07.10.2026).
const KLIFF_INFO = [
  ["Stat-Maxima", "HP 18 · Sta 14 · Spirit 12"],
];
const DAMIANE_INFO = [
  ["Unlock", "Kapitel 3, First Step to Rebuilding (Howling Hill Camp)"],
  ["Quick Swap", "DEFAULT, kein Armed Combat Lv 5 nötig"],
  ["Flight", "Mechanischer Glider (kein Magie-System), ab Freischaltung verfügbar. Skystep (Abyss-Fan) über die Scholastone-Forschung nach Kap. 4 (The Price of Knowledge); seit Patch 1.14.00 gleiche Eingabe wie Oongkas Vertical Flight"],
  ["Kosten (2.00.00)", "Seit Patch 2.00.00 (25.08.2026) lernt Damiane mit eigenen Abyss-Verknüpfungen: Jedes Abyss-Artefakt, das ein anderer Charakter für einen Skill ausgibt, schreibt ihr eine Verknüpfung gut. Skills lassen sich pro Charakter zurücksetzen."],
  ["Elemente", "Flame Rush · Frost Mantle · Lightning Strike · Storm Pillar. Der Elementfortschritt wird mit Kliff und Oongka geteilt: Wer ein Element mit einem Charakter freischaltet, hat es für alle (Fextralife)"],
];
const OONGKA_INFO = [
  ["Unlock", "Erstmals spielbar in Kap. 7: Nach der Begegnung mit Myurdin in Ashclaw Keep fällt Kliff aus, Oongka übernimmt bis zum Sieg über One-Armed Ludvig (Twisted Fate). Dauerhaft laut game8 erst nach der Greymane-Fraktionsquest Words Left by the Riverside (Kap. 8)."],
  ["Quick Swap", "laut game8 ab Armed Combat Lv 5 (Fextralife: Default)"],
  ["Flight", "Kuku Rocket Pack: Fraktionsquest Fire Breathing Pack (Reihe The Giant's Leap, Kap. 8), Brief von Grimnir lesen. Vertical Flight über die Forschung „Machine Parts Research“ (questlog-Wissenseintrag: der Raketenrucksack lässt sich damit um Vertical Flight erweitern)"],
  ["Kosten (2.00.00)", "Seit Patch 2.00.00 (25.08.2026) lernt Oongka mit eigenen Abyss-Verknüpfungen: Jedes Abyss-Artefakt, das ein anderer Charakter für einen Skill ausgibt, schreibt ihm eine Verknüpfung gut. Skills lassen sich pro Charakter zurücksetzen."],
  ["Elemente", "Flame Quake · Frost Mantle · Storm Howl · Lightning Pulse. Der Elementfortschritt wird mit Kliff und Damiane geteilt: Wer ein Element mit einem Charakter freischaltet, hat es für alle (Fextralife)"],
];
const INFO = { Kliff: KLIFF_INFO, Damiane: DAMIANE_INFO, Oongka: OONGKA_INFO };

export function build(ctx) {
  const { esc, imgSrc, slug, breadcrumbLd } = ctx.helpers;
  const d = daten(ctx);
  const z = ZAHLEN(ctx);

  const iconFuer = (name, char) => {
    const b = d.imgsChar[char];
    return (b && b[name]) || d.imgs[name] || "";
  };

  const iconHtml = (name, char) => {
    const img = iconFuer(name, char);
    if (!img) return `<span class="skl-ph" aria-hidden="true">✦</span>`;
    const px = /^https?:/i.test(img) ? CDN_ICON_PX : null;
    const dim = px ? { w: px, h: px } : dimsLocal(img);
    return `<img class="skl-img" loading="lazy" src="${esc(imgSrc(img))}" alt="${esc(name)} (${esc(char)}) in Crimson Desert" width="${dim.w}" height="${dim.h}">`;
  };

  const skillRow = (s, char) => `<tr id="skill-${slug(char)}-${slug(s.name)}">
<td class="skl-n">${iconHtml(s.name, char)}<strong>${esc(s.name)}</strong>${isMiss(s) ? ' <span class="skl-miss">verpassbar</span>' : ""}</td>
<td>${esc(s.prereq)}</td>
<td class="skl-cost">${esc(s.cost)}</td>
<td>${esc(s.effect)}</td>
</tr>`;

  const skillTable = (liste, char) => `<div class="tbl-wrap"><table>
<thead><tr><th>Skill</th><th>Voraussetzung</th><th>Kosten</th><th>Wirkung</th></tr></thead>
<tbody>${liste.map((s) => skillRow(s, char)).join("\n")}</tbody>
</table></div>`;

  const infoBlock = (char) => `<dl class="skl-info">${INFO[char].map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`;

  // Kliff hat drei Baeume, die Charakter-Info steht nur ueber dem ersten.
  const baumAbschnitte = d.baeume.map((b, i) => {
    const info = i === 0 || b.char !== d.baeume[i - 1].char ? infoBlock(b.char) : "";
    return `<h2>${esc(b.h2)} (${b.liste.length})</h2>
${info}
${skillTable(b.liste, b.char)}`;
  }).join("\n");

  const wlRow = (w) => `<tr id="wl-${slug(w.skill)}">
<td class="skl-n"><strong>${esc(w.skill)}</strong></td>
<td>${esc(w.loc)}</td>
<td>${w.miss ? '<span class="skl-miss">verpassbar</span>' : '<span class="skl-ok">unkritisch</span>'}</td>
</tr>`;

  const wlSection = `<h2>Watch &amp; Learn: Skills abschauen (${d.wl.length})</h2>
<p class="skl-legend">Diese Skills lernst du, indem du sie in der genannten Situation abschaust, statt ein Abyss-Artefakt auszugeben. Alle Einträge stehen auch in den Skill-Bäumen oben.</p>
<div class="tbl-wrap"><table>
<thead><tr><th>Skill</th><th>Lernort</th><th>Status</th></tr></thead>
<tbody>${d.wl.map(wlRow).join("\n")}</tbody>
</table></div>`;

  const legende = "Kosten: „AA“ steht für Abyss-Artefakt (Abyss Artifact), die Skillpunkt-Währung: in der Regel 1 Artefakt pro Skill bzw. Stufe. Eine Fundquelle sind die Uralten Ruinen (Abyss-Grenzsteine). Per Watch & Learn gelernte Skills kosten kein Artefakt. Schreibweise: „1 AA“ = einmalig, „1 AA/Lv“ = je Stufe („mindestens bis Lv N“ nennt die höchste belegte Voraussetzung, nicht eine belegte Maximalstufe), „0 oder 1 AA“ = per Watch & Learn kostenlos oder mit 1 Artefakt. Die Elementar-Skills (Flame/Frost/Lightning/Wind) schaltet der Abschluss der zugehörigen Abyss-Challenges frei (laut Fextralife für alle Charaktere, ohne Artefakt). Seit Patch 2.00.00 erhalten die anderen spielbaren Charaktere beim Erlernen per Abyss-Artefakt automatisch gleich viele Abyss-Verknüpfungen (Abyss Link); Zurücksetzen geht je Charakter einzeln.";

  const body = `
<a class="cta" href="${DEEPLINK}">Skill-Bäume mit Tree-Graph in der App öffnen &rarr;</a>
<p class="note">In der App gibt es zusätzlich die Freischalt-Details mit Filter nach Verpassbarkeit und einen Tree-Graph, der die Abhängigkeiten als Baum zeigt.</p>
<p class="note">Abyss-Artefakte findest du unter anderem an den <a href="/ruinen">Uralten Ruinen</a>, manche Skills lernst du von Gegnern aus der <a href="/bosse">Bossliste</a>, und welche Waffen zu den Kampf-Skills passen, steht in der <a href="/waffen">Waffenliste</a>.</p>
<p class="skl-legend">${esc(legende)}</p>
${baumAbschnitte}
${wlSection}`;

  const itemList = alleSkills(d).map(({ s, char }) => `${s.name} (${char})`);

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Fähigkeiten", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Skills von Kliff, Damiane und Oongka in Crimson Desert",
        numberOfItems: itemList.length,
        itemListElement: itemList.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${z.gesamt} Skills in Crimson Desert: Skill-Bäume & Guide`,
    desc: `Alle ${z.gesamt} Skills von Kliff, Damiane und Oongka in Crimson Desert mit Voraussetzung, Kosten und Wirkung, dazu ${z.wl} Watch-&-Learn-Skills mit Lernort.`,
    h1: `Alle ${z.gesamt} Skills in Crimson Desert: Kliff, Damiane und Oongka`,
    lead: `Die Skill-Bäume von <strong>Kliff</strong> (${z.kliff} Skills), <strong>Damiane</strong> (${z.damiane}) und <strong>Oongka</strong> (${z.oongka}) im Überblick, jeweils mit Voraussetzung, Kosten in Abyss-Artefakten und Wirkung. Dazu die <strong>${z.wl} Watch-&amp;-Learn-Skills</strong> mit Lernort und Hinweis auf Verpassbares.`,
    ogImage: null,
    crumb: "Fähigkeiten",
    bodyHtml: body,
    jsonld,
  };
}

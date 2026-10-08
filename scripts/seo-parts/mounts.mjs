// SEO-Seitenmodul "Mounts" (07.10.2026).
//
// Datenquelle: MOUNTS (52 Eintraege mit name/type/unlock/stats/notes, Stand 07.10.2026),
// MOUNT_IMGS (Name -> lokale Datei unter cd_assets/mounts/: 33x .webp 400x260 und 19x .svg
// 400x266, die SVGs sind im Wiki gezeichnete Abstrakt-Illustrationen) und MOUNT_INGAME_IMGS
// (Name -> In-Game-Portraet, ueberwiegend questlog-CDN; 50 von 52 Mounts haben eines, Ibex und
// Giant Green Iguana nicht).
//
// Gruppierung exakt wie renderMounts() in index.html (Pferde / Drachen / Sigil / Wildtiere /
// Fahrzeuge), nur die Pferde sind hier in "Legendaere Pferde" und "Pferde und Kriegspferde"
// getrennt, weil nach legendaeren Pferden eigens gesucht wird. Die Zuordnung ist
// "erster Treffer gewinnt"; ein kuenftiger neuer type-Wert faellt in "Weitere Mounts",
// statt wie bei der alten App-Gruppierung (Audit 23.08.2026) still zu verschwinden.
//
// Die Karte zeigt dieselben Felder wie mountCard() in der App: Bild, Name, Typ, Freischalten,
// Stats, Notizen. Stats und Notizen sind lang (Notizen bis ~2000 Zeichen, teils mit Audit-
// Vermerken), die Notizen stehen deshalb in einem zugeklappten <details>, genau wie die App
// "Stats & Notizen" einklappt. Das MOUNTS-Datenmodell hat kein conf-Feld; Unsicherheit steht
// in den Daten selbst als Text ("unbelegt", "Widerspruch"), und der steht hier unveraendert.
// Das In-Game-Portrait ist ein Link (kein zweites Bild), um die Seite bei 52 Karten nicht
// mit 50 Fremd-Bildern zu belasten.

import fs from "fs";
import { fileURLToPath } from "url";

export const SLUG = "mounts";
export const NAV_LABEL = "Reittiere";
export const DEEPLINK = "/#sec-mounts";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

// Eigene Klassen mit Praefix mnt-, damit nichts Vorhandenes umdefiniert wird. Die Bilder aller
// Mounts sind 400x260 bzw. 400x266 (ca. 3:2); die globale 16:9-Regel wuerde oben und unten
// ca. 13 % abschneiden, deshalb ein eigenes Seitenverhaeltnis.
export const EXTRA_CSS = `
article.card img.mnt-img{aspect-ratio:3/2;object-fit:cover}
details.mnt-notes>summary{cursor:pointer;font-family:var(--f-mono);font-size:var(--fs-11);font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--amber);margin-bottom:6px}
details.mnt-notes>summary:focus-visible{outline:2px solid var(--red);outline-offset:2px}
p.mnt-ig{margin:0;font-family:var(--f-mono);font-size:var(--fs-11)}
`.trim();

const ROOT = fileURLToPath(new URL("../../", import.meta.url));

// Bildmasse aus dem Dateiheader (WebP: VP8/VP8L/VP8X wie dimsFromBuffer in gen-seo.mjs,
// SVG: viewBox). Wirft, statt eine Groesse zu raten.
function localDims(rel) {
  const buf = fs.readFileSync(ROOT + rel);
  if (buf.length >= 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const f = buf.toString("ascii", 12, 16);
    if (f === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (f === "VP8L") {
      const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
      return { w: 1 + (((b1 & 0x3f) << 8) | b0), h: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)) };
    }
    if (f === "VP8X") return { w: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)), h: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)) };
  }
  const m = /viewBox="\s*[\d.]+[ ,]+[\d.]+[ ,]+([\d.]+)[ ,]+([\d.]+)\s*"/.exec(buf.toString("utf8", 0, 800));
  if (m) return { w: Math.round(Number(m[1])), h: Math.round(Number(m[2])) };
  throw new Error(`mounts.mjs: Bildmasse von ${rel} nicht lesbar`);
}

// Reihenfolge = Reihenfolge der Abschnitte; erster Treffer gewinnt.
const GROUPS = [
  ["legendaer", "🐎", "Legendäre Pferde", (m) => m.type.includes("Legendary")],
  ["pferde", "🐴", "Pferde und Kriegspferde", (m) => /pferd/i.test(m.type)],
  ["drachen", "🐉", "Drachen und Wyvern", (m) => m.type === "Drache"],
  ["sigil", "⚔️", "Sigil-Mounts", (m) => m.type.includes("Sigil")],
  ["wild", "🦁", "Wildtiere", (m) => m.type.startsWith("Wildtier")],
  ["fahrzeuge", "🚂", "Fahrzeuge", (m) => m.type.startsWith("Fahrzeug")],
];

function gruppiere(MOUNTS) {
  const rest = new Set(MOUNTS);
  const out = GROUPS.map(([key, icon, label, test]) => {
    const items = MOUNTS.filter((m) => rest.has(m) && test(m));
    items.forEach((m) => rest.delete(m));
    return { key, icon, label, items };
  });
  if (rest.size) out.push({ key: "weitere", icon: "🧭", label: "Weitere Mounts", items: [...rest] });
  return out.filter((g) => g.items.length);
}

export function COUNT_CHECK(ctx) {
  return {
    regex: /<article class="card" id="mount-/g,
    expected: ctx.helpers.extract("MOUNTS").length,
    label: "Mount-Karten",
  };
}

export function ZAHLEN(ctx) {
  const MOUNTS = ctx.helpers.extract("MOUNTS");
  const g = Object.fromEntries(gruppiere(MOUNTS).map((x) => [x.key, x.items.length]));
  return {
    anzahl: MOUNTS.length,
    legendaer: g.legendaer || 0,
    pferde: g.pferde || 0,
    drachen: g.drachen || 0,
    sigil: g.sigil || 0,
    wildtiere: g.wild || 0,
    fahrzeuge: g.fahrzeuge || 0,
  };
}

function mountCard(m, ctx, MOUNT_IMGS, MOUNT_INGAME_IMGS) {
  const { esc, has, imgSrc, slug } = ctx.helpers;
  const img = MOUNT_IMGS[m.name];
  let imgTag = "";
  if (has(img)) {
    const d = localDims(img);
    const zeichnung = /\.svg$/i.test(img);
    const alt = zeichnung ? `Zeichnung: ${m.name} in Crimson Desert` : `${m.name} in Crimson Desert`;
    imgTag = `<img class="mnt-img" loading="lazy" src="${esc(imgSrc(img))}" alt="${esc(alt)}" width="${d.w}" height="${d.h}">`;
  }

  const stats = [["Typ", esc(m.type)]];
  if (has(m.unlock)) stats.push(["Freischalten", esc(m.unlock)]);
  // Stats-Teile sind in den Daten mit " · " getrennt; untereinander lesbarer, Text bleibt gleich.
  if (has(m.stats)) stats.push(["Stats", String(m.stats).split(" · ").map(esc).join("<br>")]);
  const statsHtml = stats.map(([k, v]) => `<li><b>${esc(k)}:</b> ${v}</li>`).join("");

  const notes = has(m.notes)
    ? `<details class="mnt-notes"><summary>Notizen</summary><p>${esc(m.notes)}</p></details>`
    : "";
  const ig = has(MOUNT_INGAME_IMGS[m.name])
    ? `<p class="mnt-ig"><a href="${esc(imgSrc(MOUNT_INGAME_IMGS[m.name]))}" target="_blank" rel="nofollow noopener noreferrer">In-Game-Ansicht (Bild)</a></p>`
    : "";

  return `<article class="card" id="mount-${slug(m.name)}">
${imgTag}
<h3>${esc(m.name)}</h3>
<ul class="stats">${statsHtml}</ul>
${notes}${ig}
</article>`;
}

export function build(ctx) {
  const MOUNTS = ctx.helpers.extract("MOUNTS");
  const MOUNT_IMGS = ctx.helpers.extract("MOUNT_IMGS");
  const MOUNT_INGAME_IMGS = ctx.helpers.extract("MOUNT_INGAME_IMGS");
  const { breadcrumbLd, slug } = ctx.helpers;

  const ids = MOUNTS.map((m) => slug(m.name));
  if (new Set(ids).size !== ids.length) throw new Error("mounts.mjs: zwei Mounts fallen auf denselben Anker-Slug");

  const groups = gruppiere(MOUNTS);
  const z = ZAHLEN(ctx);
  const total = MOUNTS.length;

  const sections = groups.map((g) => `<h2>${g.icon} ${g.label} (${g.items.length})</h2>
<div class="grid">${g.items.map((m) => mountCard(m, ctx, MOUNT_IMGS, MOUNT_INGAME_IMGS)).join("\n")}</div>`).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Alle Reittiere interaktiv in der App öffnen &rarr;</a>
<p class="note">In der App markierst du Favoriten und siehst die In-Game-Ansicht eines Mounts direkt als Vorschau.</p>
<p class="note">Sigil-Mounts schaltest du mit Amuletten frei, die eine Hexe herstellt: Rezepte und Fundorte unter <a href="/hexen">Hexen &amp; Fusion</a>. Tiere als Begleiter statt als Reittier stehen bei den <a href="/pets">Haustieren</a>, die Gegner hinter den Sigil-Mounts in der <a href="/bosse">Bossliste</a>. Wo sich Quellen widersprechen oder ein Beschaffungsweg fehlt, steht das offen in den Notizen der jeweiligen Karte.</p>
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Reittiere", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Mounts und Fahrzeuge in Crimson Desert",
        numberOfItems: total,
        itemListElement: MOUNTS.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.name })),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${total} Mounts in Crimson Desert: Fundorte & Stats`,
    desc: `Crimson Desert Mounts: ${total} Reittiere mit Fundort, Stats und Notizen, darunter ${z.legendaer} legendäre Pferde, ${z.drachen} Drachen-Mounts, ${z.sigil} Sigil-Mounts und ${z.fahrzeuge} Fahrzeuge.`,
    h1: `Alle ${total} Mounts in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${total} Mounts</strong> aus Crimson Desert: <strong>${z.legendaer} legendäre Pferde</strong>, ${z.pferde} weitere Pferde und Kriegspferde, ${z.drachen} Drachen-Mounts, ${z.sigil} Sigil-Mounts, ${z.wildtiere} Wildtiere und ${z.fahrzeuge} Fahrzeuge, jeweils mit Freischaltweg, Stats und Notizen.`,
    ogImage: null,
    crumb: "Reittiere",
    bodyHtml: body,
    jsonld,
  };
}

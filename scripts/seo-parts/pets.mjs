// SEO-Seitenmodul "Pets" (07.10.2026).
//
// Datenquelle: PETS (200 Eintraege mit name/type/food/icon, bei den 84 Kleintieren zusaetzlich
// cat = Tierfamilie; Stand 07.10.2026). type ist cat (49), dog (67) oder critter (84).
// Mehrfach vorkommende Namen sind gewollt: Katzen und Hunde stehen je Fellfarbe als eigener
// Eintrag (eigenes Portraet, teils anderes Lieblingsessen, z. B. "Cat" mit Squid oder Salmon),
// deshalb 116 verschiedene Namen bei 200 Eintraegen. Die App zeigt jeden Eintrag als eigene
// Karte; hier ist es eine Tabellenzeile je Eintrag.
//
// Icon-URL wie _petCardImg() in index.html: beginnt icon mit "http" oder "cd_assets/", ist es
// schon ein Pfad, sonst gilt PET_CDN + icon (questlog-Sprite-CDN, https://cdn.questlog.gg/
// crimson-desert/assets/_sprites/). 12 Icons sind lokal (cd_assets/pets/*.webp, 256x256), 188
// liegen auf dem CDN. Bildmasse der CDN-Icons am 07.10.2026 per Range-Request fuer alle 195
// verschiedenen Icons gemessen: Dateien mit Praefix cd_knowledgeimage_ sind 512x512, alle
// anderen (cd_portrait_petimage_*, cd_mercenary_portrait_petimage_*, itemicon_*) 256x256;
// alle quadratisch. Lokale Icons werden aus dem Dateiheader gelesen.
//
// Gruppierung der Seite (feiner als der App-Filter Katzen/Hunde/Kleintiere, damit Suchen wie
// "Papagei zaehmen" einen eigenen Abschnitt finden): Katzen, Hunde, Voegel (critter mit cat
// "Vogel..."), Nager und Saeugetiere (cat "Nager..." bzw. "Saeugetier..."), Fuechse und
// Sonstige (Rest der critter). Summe = 200; ein unbekannter type landet in "Weitere Pets".
//
// Dazu die zwei Freischalt-Guides aus renderLegendaryPetGuide() (Iron Eagle, Phoenix), deren Text
// in der App fest in index.html steht und hier sinngemaess uebernommen ist, inklusive der dort
// genannten Unsicherheiten. Beide Tiere stehen zusaetzlich als Zeile in der Vogel-Tabelle.
//
// Anker: Zeilen-id = "pet-" + slug(name); kommt der Name mehrfach vor, haengt "-" + slug(Icon-
// Dateiname ohne Praefix und .webp) dran (Name + Icon ist in den Daten eindeutig).

import fs from "fs";
import { fileURLToPath } from "url";

export const SLUG = "pets";
export const NAV_LABEL = "Pets";
export const DEEPLINK = "/#sec-pets";
export const SITEMAP = { pri: "0.7", freq: "monthly" };

export const EXTRA_CSS = `
td img.pet-thumb{width:48px;height:48px;object-fit:cover;border-radius:8px;background:#131629;border:1px solid var(--line);vertical-align:middle;margin-right:10px}
span.pet-var{margin-left:6px;color:var(--ink-faint);font-size:12px}
article.card img.pet-guide-img{width:110px;height:110px;aspect-ratio:1/1;object-fit:cover}
p.pet-ref{margin:0;font-family:var(--f-mono);font-size:var(--fs-11);color:var(--ink-faint)}
`.trim();

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const PET_CDN = "https://cdn.questlog.gg/crimson-desert/assets/_sprites/";

function localWebpDims(rel) {
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
  throw new Error(`pets.mjs: Bildmasse von ${rel} nicht lesbar`);
}

// Pfad (fuer imgSrc) und Masse eines Icons.
function iconInfo(icon) {
  if (/^https?:/.test(icon)) return { src: icon, w: 256, h: 256 };
  if (/^cd_assets\//.test(icon)) { const d = localWebpDims(icon); return { src: icon, w: d.w, h: d.h }; }
  const side = /^cd_knowledgeimage_/.test(icon) ? 512 : 256;
  return { src: PET_CDN + icon, w: side, h: side };
}

// Farb-/Musterangabe aus dem Icon-Dateinamen, identisch zu petVariant() in index.html.
const PET_VARIANT_LABELS = { russianblue: "Russian Blue", ragdoll: "Ragdoll" };
function petVariant(p) {
  const m = (p.icon || "").match(/(?:^|_)(yellow|white|black|bicolor|tricolor|brown|striped|russianblue|ragdoll)(?=[_.]|$)/i);
  if (!m) return "";
  const k = m[1].toLowerCase();
  return PET_VARIANT_LABELS[k] || k.replace(/^./, (c) => c.toUpperCase());
}

const GROUPS = [
  ["katzen", "🐈", "Katzen", (p) => p.type === "cat", false],
  ["hunde", "🐕", "Hunde", (p) => p.type === "dog", false],
  ["voegel", "🦜", "Vögel", (p) => p.type === "critter" && /^Vogel/.test(p.cat || ""), true],
  ["nager", "🐿️", "Nager und Säugetiere", (p) => p.type === "critter" && /^(Nager|Säugetier)/.test(p.cat || ""), true],
  ["sonstige", "🦊", "Füchse und Sonstige", (p) => p.type === "critter", true],
];

function gruppiere(PETS) {
  const rest = new Set(PETS);
  const out = GROUPS.map(([key, icon, label, test, mitArt]) => {
    const items = PETS.filter((p) => rest.has(p) && test(p));
    items.forEach((p) => rest.delete(p));
    return { key, icon, label, items, mitArt };
  });
  if (rest.size) out.push({ key: "weitere", icon: "🐾", label: "Weitere Pets", items: [...rest], mitArt: false });
  return out.filter((g) => g.items.length);
}

const iconCore = (icon) => String(icon).replace(/^.*\//, "").replace(/\.webp$/i, "")
  .replace(/^(cd_portrait_petimage_animal_|cd_mercenary_portrait_petimage_|cd_knowledgeimage_knowledge_|cd_knowledgeimage_animal_|cd_pet_|itemicon_)/, "");

function petIds(PETS, slug) {
  const namen = {};
  PETS.forEach((p) => { namen[p.name] = (namen[p.name] || 0) + 1; });
  const used = new Set();
  const map = new Map();
  for (const p of PETS) {
    let id = "pet-" + slug(p.name) + (namen[p.name] > 1 ? "-" + slug(iconCore(p.icon)) : "");
    if (used.has(id)) { let i = 2; while (used.has(id + "-" + i)) i++; id = id + "-" + i; }
    used.add(id);
    map.set(p, id);
  }
  return map;
}

export function COUNT_CHECK(ctx) {
  return {
    regex: /<tr id="pet-/g,
    expected: ctx.helpers.extract("PETS").length,
    label: "Pet-Zeilen",
  };
}

export function ZAHLEN(ctx) {
  const PETS = ctx.helpers.extract("PETS");
  const g = Object.fromEntries(gruppiere(PETS).map((x) => [x.key, x.items.length]));
  const je = (t) => PETS.filter((p) => p.type === t).length;
  return {
    anzahl: PETS.length,
    katzen: je("cat"),
    hunde: je("dog"),
    kleintiere: je("critter"),
    voegel: g.voegel || 0,
    nager: g.nager || 0,
  };
}

// Die zwei Guides. Text sinngemaess aus renderLegendaryPetGuide() in index.html; Zeilen "Unsicher"
// uebernehmen die dort genannten Widersprueche.
const GUIDES = [
  {
    id: "petguide-iron-eagle",
    name: "Iron Eagle",
    img: "cd_assets/pets/cd_pet_iron-eagle.webp",
    zeilen: [
      ["Typ", "Legendärer, bio-mechanischer Vogel-Begleiter (kein Reittier), laut Lore vom Erfinder Marni erschaffen. Als Pet offiziell mit Patch 1.05.00 eingeführt; die Schritte unten stammen aus Community-Guides und sind teils widersprüchlich."],
      ["Fundort", "Hawkstone Ruins, Ost-Region von Delesyia, auf der Karte nahe dem „A“ in „Delesyia“ (Marnis Maschinen-Gebiet, nahe Marni Mechworks)."],
      ["Voraussetzungen", "Das Item „Sotdae of Bond“ (Vogel-Futterstelle), laut questlog Belohnung der Mission „Authorized Access“ (Questreihe Trembling Woods bei Pororin) und der Mission „Fallen God“ (Questreihe Master of Thunder). Dazu seltenes Metall als Futter: 1x Platinum (laut questlog +100 Vertrauen, also sofort voll) oder Mercury (laut questlog +15 je Stück, etwa 7 Stück; Guides nennen +5 je Stück bzw. ca. 20 Stück)."],
      ["Schritte", "1. Zu den Hawkstone Ruins reisen. 2. In der Morgendämmerung (ingame etwa 4:45 bis 5:00 Uhr) am zentralen Zahnrad-Mechanismus interagieren, der Iron Eagle erwacht. 3. „Sotdae of Bond“ in seine Flugbahn stellen und mit Metall bestücken. 4. Füttern, bis das Vertrauen 100 erreicht. 5. Wenn er landet, die Option „Take In“ wählen. Nicht auf ihn schießen, das zählt als Angriff und bricht das Zähmen ab."],
      ["Nutzen", "Loot-Begleiter: sammelt nach Kämpfen automatisch Beute und Materialien ein. Seit Patch 1.13.00 kann er das „Sigil of Valor“ tragen und dann am Kampf teilnehmen, das „Hunter’s Sigil“ macht ihn zum spezialisierten Sammler."],
      ["Unsicher", "Offiziell nennt Pearl Abyss nur Existenz und „bestimmte Bedingungen“. Uneinig sind die Guides bei der Uhrzeit (4:45 gegen 5:00 Uhr) und bei der nötigen Mercury-Menge. Herkunft des Sotdae of Bond und Platinum als Sofort-Futter sind über questlog-Spieldaten belegt."],
    ],
  },
  {
    id: "petguide-phoenix",
    name: "Phoenix",
    img: "cd_assets/pets/cd_pet_phoenix.webp",
    zeilen: [
      ["Typ", "Legendärer Feuervogel und fliegender Loot-Begleiter (kein Reittier). Er wird nicht gezähmt, sondern aus der Luft geschossen und gehäutet; der eigentliche Pet entsteht erst durch einen Crafting-Schritt bei einer Hexe. Die Erlangung ist nur über Community-Guides belegt."],
      ["Fundort", "Südlich bis südwestlich von Trader’s Expanse in der Region Varnia: ein kleiner Oasen- oder Kraterbereich mit großen Felsen nahe Merchant’s Resting Place, nächster Schnellreisepunkt ein Abyss Nexus östlich davon. Der Phoenix patrouilliert eine feste Flugschleife; laut Community passiert er das Oasenzentrum etwa alle 7:30 Minuten."],
      ["Voraussetzungen", "Ein Bogen (fliegendes Ziel), Munition Explosive Arrows vom Back Alley Trader in Tommaso (führt nur 2 Stück) und Zugang zu einer Hexe mit dem Menü „Craft Abyss Gear“. Laut den meisten Guides genügt jede Hexe, die Community-Referenz ist Elowen."],
      ["Schritte", "1. Zum Abyss Nexus östlich von Merchant’s Resting Place reisen und auf die Felsen der Oase steigen. 2. Vorher die Explosive Arrows kaufen. 3. Auf den Phoenix warten, einen großen gold-orangen Vogel an der Spitze eines Schwarms. 4. Mit Focused Shot markieren und einen Charged Shot mit Explosive Arrow abfeuern. 5. Zur Absturzstelle gehen und den Kadaver häuten, das ergibt die Phoenix Feather. 6. Bei einer Hexe „Craft Abyss Gear“ › „Special Items“ wählen und den „Sigil of Solidarity (Phoenix)“ craften. 7. Den Sigil im Inventar benutzen, der Phoenix landet im Pet-Roster. 8. Über den Pets-Reiter beschwören."],
      ["Nutzen", "Standardmäßig ein reiner Loot-Sammel-Begleiter ohne Kampfnutzen. Mit dem Sigil of Valor (ab Patch 1.13.00) erhält er laut Community eine Feuerattacke und lootet dann weniger."],
      ["Unsicher", "Das Erlangungs-Item heißt „Sigil of Solidarity (Phoenix)“, nicht „Sigil of Valor“; viele Guides vermischen beide. Uneinheitlich sind die Kampf- und Wiederbelebungs-Mechanik, die Angabe „Fire Lv 1“ und die Nennung von Elowen (nur zwei Quellen). Keine offizielle Pearl-Abyss-Note beschreibt die Erlangung."],
    ],
  },
];

function guideCard(g, ctx) {
  const { esc, imgSrc } = ctx.helpers;
  const d = localWebpDims(g.img);
  const li = g.zeilen.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("");
  return `<article class="card" id="${g.id}">
<img class="pet-guide-img" loading="lazy" src="${esc(imgSrc(g.img))}" alt="${esc(g.name)} in Crimson Desert" width="${d.w}" height="${d.h}">
<h3>${esc(g.name)}: Freischalten und Zähmen</h3>
<ul class="stats">${li}</ul>
</article>`;
}

function petRow(p, id, mitArt, ctx) {
  const { esc, has, imgSrc } = ctx.helpers;
  const ic = iconInfo(p.icon);
  const variant = petVariant(p);
  const label = variant ? `${p.name} (${variant})` : p.name;
  const food = has(p.food) ? esc(p.food) : "keine Angabe";
  const art = mitArt ? `<td>${has(p.cat) ? esc(p.cat) : ""}</td>` : "";
  return `<tr id="${id}">
<td><img class="pet-thumb" loading="lazy" src="${esc(imgSrc(ic.src))}" alt="${esc(label)} in Crimson Desert" width="${ic.w}" height="${ic.h}">${esc(p.name)}${variant ? `<span class="pet-var">${esc(variant)}</span>` : ""}</td>
<td>${food}</td>${art}
</tr>`;
}

function petTable(g, ids, ctx) {
  const head = `<tr><th>Pet</th><th>Lieblingsessen</th>${g.mitArt ? "<th>Art</th>" : ""}</tr>`;
  return `<div class="tbl-wrap"><table>
<thead>${head}</thead>
<tbody>${g.items.map((p) => petRow(p, ids.get(p), g.mitArt, ctx)).join("\n")}</tbody>
</table></div>`;
}

export function build(ctx) {
  const PETS = ctx.helpers.extract("PETS");
  const { breadcrumbLd, slug } = ctx.helpers;
  const z = ZAHLEN(ctx);
  const total = PETS.length;
  const ids = petIds(PETS, slug);
  const groups = gruppiere(PETS);

  const guides = `<h2>🦅 Legendäre Begleiter: Iron Eagle und Phoenix (${GUIDES.length})</h2>
<p class="pet-ref">Beide Tiere stehen zusätzlich in der Vogel-Tabelle weiter unten.</p>
<div class="grid">${GUIDES.map((g) => guideCard(g, ctx)).join("\n")}</div>`;

  const sections = groups.map((g) => `<h2>${g.icon} ${g.label} (${g.items.length})</h2>
${petTable(g, ids, ctx)}`).join("\n");

  const body = `
<a class="cta" href="${DEEPLINK}">Alle Pets interaktiv in der App öffnen &rarr;</a>
<p class="note">In der App filterst du die Pets nach Katzen, Hunden und Kleintieren und durchsuchst sie nach Name und Lieblingsessen.</p>
<p class="note">Zwei Pets wachsen zu Reittieren heran, nämlich Baby Wyvern und Kuku Bird Chick: Die fertigen Reittiere stehen bei den <a href="/mounts">Mounts</a>. Wie Hexen Sigil-Amulette herstellen, steht im <a href="/hexen">Hexen-Guide</a>. Katzen und Hunde mit mehreren Fellfarben stehen als eigene Zeilen da, weil Porträt und Lieblingsessen je Farbe abweichen können.</p>
${guides}
${sections}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd("Pets", SLUG),
      {
        "@type": "ItemList",
        name: "Alle Pets in Crimson Desert",
        numberOfItems: total,
        itemListElement: PETS.map((p, i) => {
          const v = petVariant(p);
          return { "@type": "ListItem", position: i + 1, name: v ? `${p.name} (${v})` : p.name };
        }),
      },
    ],
  };

  return {
    slugName: SLUG,
    title: `Alle ${total} Pets in Crimson Desert: Lieblingsessen & Guide`,
    desc: `Crimson Desert Pets: ${total} Begleiter mit Porträt und Lieblingsessen, ${z.katzen} Katzen, ${z.hunde} Hunde, ${z.kleintiere} Kleintiere plus Guides zu Iron Eagle und Phoenix.`,
    h1: `Alle ${total} Pets in Crimson Desert`,
    lead: `Diese Übersicht listet alle <strong>${total} Pets</strong> aus Crimson Desert: <strong>${z.katzen} Katzen</strong>, ${z.hunde} Hunde und ${z.kleintiere} Kleintiere wie Vögel, Nager und Füchse, jeweils mit Porträt und Lieblingsessen, dazu die Freischalt-Guides für Iron Eagle und Phoenix.`,
    ogImage: null,
    crumb: "Pets",
    bodyHtml: body,
    jsonld,
  };
}

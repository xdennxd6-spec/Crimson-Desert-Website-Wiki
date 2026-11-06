// Baustein "Neu mit Charting the Unknown" (01.11.2026) fuer die Themen-Seiten (waffen, ruestungen, accessoires,
// abyss-cores, bosse, mounts, hauptquests). Kein Seitenmodul: gen-seo.mjs importiert die Seitenmodule einzeln,
// diese Datei (Unterstrich) wird nur von dort und aus den Modulen benutzt.
//
// dlcNeu(h, o) -> HTML oder "" (keine Eintraege)
//   h = { esc, slug } aus ctx.helpers bzw. gen-seo.mjs
//   o = { titel, intro, items:[{ name, de?, info?, c?, q?, pfx?, href? }], mehr? }
//       pfx  = Anker-Praefix der Zeile auf /charting-the-unknown (dlc-<pfx>-<slug>, siehe rid() dort)
//       href = eigener Anker auf derselben Seite (z. B. "#mount-..."), hat Vorrang vor pfx
//       c/q  = Beleg-Vermerk wie in d12 (c:"unb"/"nb", q = Quelle); erscheint als grauer Vermerk
// Die Liste ist bewusst <ul>, keine Tabelle: die COUNT_CHECKs der Seiten zaehlen <tr>/<article>, nicht <li>.
// Der Abschnitt steht im Wrapper id="dlc" (Sprungziel /waffen#dlc usw.); die h2 bekommt ihren Anker wie alle
// anderen ueber abschnitteAuszeichnen() und erscheint damit in der Sprungleiste der Seite.

import { deN, deT } from "./_de.mjs";

export const DLC_NAME = "Charting the Unknown";

export function dlcNeu(h, o) {
  const { esc, slug } = h;
  const items = (o.items || []).filter((e) => e && e.name);
  if (!items.length) return "";
  const flag = (e) => (e.c && e.c !== "ok"
    ? ` <span class="ctu-flag">${esc((e.c === "nb" ? "nicht belegt" : "unbestätigt") + (e.q ? ": " + e.q : ""))}</span>` : "");
  // info darf wie in d12 ein Wertobjekt {v,c,q} oder eine Liste sein; gezeigt wird nur der Text, gekuerzt
  const txt = (x) => (x == null ? "" : Array.isArray(x) ? x.map(txt).filter(Boolean).join(" ")
    : typeof x === "object" ? txt(x.v) : String(x).trim());
  const kurz = (s) => (s.length > 120 ? s.slice(0, s.lastIndexOf(" ", 117) > 60 ? s.lastIndexOf(" ", 117) : 117) + " …" : s);
  const li = (e) => {
    const href = e.href || (e.pfx ? `/charting-the-unknown#dlc-${e.pfx}-${slug(e.name)}` : "");
    const nm = `<strong>${esc(deN(e.name))}</strong>${e.de ? ` (${esc(e.de)})` : ""}`;
    const info = kurz(txt(e.info));
    return `<li>${href ? `<a href="${esc(href)}">${nm}</a>` : nm}${info ? `<span class="dlc-neu-i">${esc(info)}</span>` : ""}${flag(e)}</li>`;
  };
  return `<div class="dlc-neu" id="dlc">
<h2>${esc(o.titel)} (${items.length})</h2>
${o.intro ? `<p class="note">${o.intro}</p>\n` : ""}<ul class="dlc-neu-l">${items.map(li).join("\n")}</ul>
<p class="note">${o.mehr || ""}Alles Neue aus dem DLC (Schiffe, Inseln, Tauchen, Quests, Bosse und Ausrüstung) steht gesammelt auf der Seite <a href="/charting-the-unknown">${DLC_NAME}</a>.</p>
</div>`;
}

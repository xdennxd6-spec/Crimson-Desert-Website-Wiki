// SEO-Seitenmodul "Jenseits der Ränder" (K5, 14.11.2026). Schlank: Inhalt = Loesungsabschnitt aus data/d16-loesungen.js
// (slug jenseits-der-raender, ganze DLC-Reihe von Kliff), Aufbau in _loesung-seite.mjs. Einzelschritt "Der Weg jenseits des Sandsturms"
// hat eine eigene Seite und wird nur verlinkt. Intro: seo-content/seiten/jenseits-der-raender.json. DEEPLINK mit &go=: die App springt zur Loesung.

import { baueLoesungSeite, loesungEintragOderFehler, LOESUNG_COUNT } from "./_loesung-seite.mjs";

export const SLUG = "jenseits-der-raender";
export const NAV_LABEL = "Jenseits der Ränder";
export const DEEPLINK = "/#sec=dlc-quests&go=loes-jenseits-der-raender";
export const SITEMAP = { pri: "0.7", freq: "monthly" };
export const EXTRA_CSS = "";
export const COUNT_CHECK = () => LOESUNG_COUNT;

export function build(ctx) {
  const e = loesungEintragOderFehler(ctx, SLUG);
  return baueLoesungSeite(ctx, {
    slug: SLUG,
    crumb: NAV_LABEL,
    title: "Jenseits der Ränder in Crimson Desert: Lösung der Reihe",
    desc: "Jenseits der Ränder, Kliffs DLC-Questreihe in Crimson Desert: alle Schritte von der Taverne in Pailune bis zur Wüstenkarte bei Sebastian, mit Belohnungen.",
    h1: "Jenseits der Ränder in Crimson Desert",
    lead: `Schritt-für-Schritt-Lösung: <strong>${ctx.helpers.esc(e.de)}</strong>${e.en ? ` (englisch: ${ctx.helpers.esc(e.en)})` : ""} im DLC Charting the Unknown, mit Voraussetzungen, Belohnung, Hinweisen und Quellen.`,
    deeplink: DEEPLINK,
    headline: "Crimson Desert: Jenseits der Ränder, Lösung der DLC-Questreihe",
    verwandt: [{ slug: "der-weg-jenseits-des-sandsturms", satz: "Der Schritt {link} hat eine eigene Lösungsseite." }],
    belege: ["Pailune", "Sebastian", "Wüstenkarte"],
  });
}

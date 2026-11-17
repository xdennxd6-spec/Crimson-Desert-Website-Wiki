// SEO-Seitenmodul "Der Weg jenseits des Sandsturms" (K5, 14.11.2026). Schlank: Inhalt = Loesungsabschnitt aus
// data/d16-loesungen.js (slug der-weg-jenseits-des-sandsturms), Aufbau in _loesung-seite.mjs. Intro: seo-content/seiten/<slug>.json.
// DEEPLINK mit &go=: die App springt beim Laden zur Loesung (_applyUrlState in index.html wertet go aus).

import { baueLoesungSeite, loesungEintragOderFehler, LOESUNG_COUNT } from "./_loesung-seite.mjs";

export const SLUG = "der-weg-jenseits-des-sandsturms";
export const NAV_LABEL = "Der Weg jenseits des Sandsturms";
export const DEEPLINK = "/#sec=dlc-quests&go=loes-der-weg-jenseits-des-sandsturms";
export const SITEMAP = { pri: "0.7", freq: "monthly" };
export const EXTRA_CSS = "";
export const COUNT_CHECK = () => LOESUNG_COUNT;

export function build(ctx) {
  const e = loesungEintragOderFehler(ctx, SLUG);
  return baueLoesungSeite(ctx, {
    slug: SLUG,
    crumb: NAV_LABEL,
    title: "Der Weg jenseits des Sandsturms: Lösung in Crimson Desert",
    desc: "Der Weg jenseits des Sandsturms im Crimson-Desert-DLC: an den Wegsteinen durch den Sturm, fünf Aufgaben für Sebastian, schwarze Pfähle. Schritt für Schritt.",
    h1: "Der Weg jenseits des Sandsturms in Crimson Desert",
    lead: `Schritt-für-Schritt-Lösung: <strong>${ctx.helpers.esc(e.de)}</strong>${e.en ? ` (englisch: ${ctx.helpers.esc(e.en)})` : ""} im DLC Charting the Unknown, mit Voraussetzungen, Belohnung, Hinweisen und Quellen.`,
    deeplink: DEEPLINK,
    headline: "Crimson Desert: Der Weg jenseits des Sandsturms, Lösung",
    verwandt: [{ slug: "jenseits-der-raender", satz: "Der Weg jenseits des Sandsturms ist ein Schritt der Questreihe {link}." }],
    belege: ["Sandsturm", "Sebastian", "Wegsteine", "schwarzen Pfähle"],
  });
}

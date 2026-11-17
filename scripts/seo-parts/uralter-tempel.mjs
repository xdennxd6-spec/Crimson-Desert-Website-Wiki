// SEO-Seitenmodul "Uralter Tempel" (K5, 14.11.2026). Schlank: Inhalt = Loesungsabschnitt aus data/d16-loesungen.js
// (slug uralter-tempel, DLC-Ort), Aufbau in _loesung-seite.mjs. Abgrenzung zu den Uralten Ruinen des Hauptspiels: Satz mit Link auf /ruinen.
// Intro: seo-content/seiten/uralter-tempel.json. DEEPLINK mit &go=: die App springt beim Laden zur Loesung.

import { baueLoesungSeite, loesungEintragOderFehler, LOESUNG_COUNT } from "./_loesung-seite.mjs";

export const SLUG = "uralter-tempel";
export const NAV_LABEL = "Uralter Tempel";
export const DEEPLINK = "/#sec=dlc-quests&go=loes-uralter-tempel";
export const SITEMAP = { pri: "0.7", freq: "monthly" };
export const EXTRA_CSS = "";
export const COUNT_CHECK = () => LOESUNG_COUNT;

export function build(ctx) {
  const e = loesungEintragOderFehler(ctx, SLUG);
  return baueLoesungSeite(ctx, {
    slug: SLUG,
    crumb: NAV_LABEL,
    title: "Uralter Tempel in Crimson Desert: Lösung im DLC",
    desc: "Uralter Tempel im Crimson-Desert-DLC: Anreise, Eingang unter Wasser, Drehmechanismus und Schlangenreliquie, getrennt von den Uralten Ruinen des Hauptspiels.",
    h1: "Uralter Tempel in Crimson Desert",
    lead: `Schritt-für-Schritt-Lösung: <strong>${ctx.helpers.esc(e.de)}</strong>${e.en ? ` (englisch: ${ctx.helpers.esc(e.en)})` : ""} im DLC Charting the Unknown, mit Voraussetzungen, Belohnung, Hinweisen und Quellen.`,
    deeplink: DEEPLINK,
    headline: "Crimson Desert: Uralter Tempel im DLC, Lösung",
    belege: ["Schlangenreliquie", "Drehmechanismus", "Unterwasser"],
  });
}

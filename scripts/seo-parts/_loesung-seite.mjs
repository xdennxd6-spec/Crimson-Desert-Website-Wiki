// Baustein "Eigene Loesungsseite" (K5, Lauf quest-loesungen, 14.11.2026). Kein Seitenmodul (Unterstrich): gen-seo.mjs
// importiert nur die schlanken Module der-weg-jenseits-des-sandsturms.mjs, uralter-tempel.mjs und jenseits-der-raender.mjs,
// die beide diesen Baustein aufrufen (Muster: patch-notes-1.mjs nutzt patch-notes.mjs).
//
// Inhalt einer solchen Seite: der Loesungsabschnitt des Eintrags aus data/d16-loesungen.js (loesungenSeo aus
// _loesungen.mjs, Eintrag mit seo.seite === slug) und sonst nur Navigation: Lead, Einleitung (seo-content/seiten/<slug>.json,
// kommt von gen-seo), Links zur Sammelseite /charting-the-unknown und zu verwandten Loesungsseiten. Kein Spieltext in diesem Modul.
// Es gibt bewusst KEINE <h2>: appFassung() in gen-seo.mjs klappt alles ab der ersten <h2> ein, die Loesung soll offen stehen.
// Kein FAQ-Markup, JSON-LD nur BreadcrumbList und Article. Fehlt der Eintrag (oder seine Schritte), bricht der Lauf mit
// Klartext ab, statt eine leere Seite auszuliefern.
//
// cfg: { slug, crumb, title, desc, h1, lead (HTML), deeplink, headline, verwandt: [{slug, satz}], zusatz: [HTML-Saetze],
//        belege: [Woerter, die im Eintrag vorkommen muessen, sonst Warnung (Titel/Description sind statisch)] }

import { loesungenSeo, loesungEintrag, loesungHref } from "./_loesungen.mjs";

export const SAMMELSEITE = { slug: "charting-the-unknown", label: "Charting the Unknown" };

// Die drei Seiten kennen sich: Eintraege aus data/d16-loesungen.js, nur die vorhandenen werden verlinkt.
export const EIGENE_SEITEN = ["der-weg-jenseits-des-sandsturms", "uralter-tempel", "jenseits-der-raender"];

export function loesungEintragOderFehler(ctx, slug) {
  const e = loesungEintrag(ctx.helpers, slug);
  if (!e || e.seo.seite !== slug) {
    throw new Error(`${slug}.mjs: kein Loesungseintrag mit slug "${slug}" und seo.seite "${slug}" samt h3 und Schritten in data/d16-loesungen.js`);
  }
  return e;
}

export function baueLoesungSeite(ctx, cfg) {
  const { esc, breadcrumbLd } = ctx.helpers;
  const e = loesungEintragOderFehler(ctx, cfg.slug);
  const text = JSON.stringify(e).toLowerCase();
  for (const w of cfg.belege || []) {
    if (!text.includes(String(w).toLowerCase())) console.warn(`  WARN: ${cfg.slug}: "${w}" (steht in Titel oder Description) kommt im Loesungseintrag nicht mehr vor`);
  }
  const verwandt = (cfg.verwandt || []).map((v) => {
    const href = loesungHref(ctx.helpers, v.slug);
    const ziel = loesungEintrag(ctx.helpers, v.slug);
    return href && ziel ? `${v.satz.replace("{link}", `<a href="${esc(href)}">${esc(ziel.de)}</a>`)}` : "";
  }).filter(Boolean);
  const saetze = [
    `Mehr aus dem DLC: <a href="/${SAMMELSEITE.slug}">${esc(SAMMELSEITE.label)}</a> mit Schiffen, Inseln, Quests und allen weiteren Inhalten.`,
    ...verwandt,
    ...(cfg.zusatz || []),
  ];
  const body = `
<a class="cta" href="${cfg.deeplink}">Lösung in der App öffnen &rarr;</a>
${loesungenSeo(ctx.helpers, cfg.slug)}
<p class="note loes-seo-verweis">${saetze.join(" ")}</p>`;

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd(cfg.crumb, cfg.slug),
      {
        "@type": "Article",
        headline: cfg.headline,
        inLanguage: "de-DE",
        author: { "@type": "Person", name: "Christian Stein" },
        about: { "@type": "VideoGame", name: "Crimson Desert" },
      },
    ],
  };
  return {
    slugName: cfg.slug,
    title: cfg.title,
    desc: cfg.desc,
    h1: cfg.h1,
    lead: cfg.lead,
    ogImage: null,
    crumb: cfg.crumb,
    bodyHtml: body,
    jsonld,
  };
}

// COUNT_CHECK der drei Module: genau ein Loesungsabschnitt je Seite (Soll-Menge hier fest 1, verify-seo rechnet gleich).
export const LOESUNG_COUNT = { regex: /<section class="loes-seo" id="loes-seo-/g, expected: 1, label: "Lösungsabschnitte" };

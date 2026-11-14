// Baustein "Loesungen" (Lauf quest-loesungen, 14.11.2026) fuer die Themen-Seiten. Kein Seitenmodul: gen-seo.mjs
// importiert die Seitenmodule einzeln, diese Datei (Unterstrich) wird nur aus den Modulen benutzt.
//
// Datenquelle: data/d16-loesungen.js mit den beiden Arrays LOESUNGEN_PFLICHT und LOESUNGEN_KUER (Feldliste im Kopf
// dieser Datei). LOESUNGEN selbst ist kein Array-Literal (concat) und geht nicht durch extract(); deshalb werden die
// beiden Bloecke einzeln gelesen und in dieser Reihenfolge (PFLICHT, dann KUER) zusammengefuegt.
//
// Vertrag
//   h = ctx.helpers aus gen-seo.mjs, genutzt werden nur h.esc und h.extract.
//   loesungenSeo(h, seite)   -> HTML aller Eintraege mit seo.seite === seite (Reihenfolge wie im Array), sonst "".
//       Je Eintrag <section class="loes-seo" id="loes-seo-<slug>"> mit <h3 id="a-<slug>">, Kurzantwort, Voraussetzung,
//       Belohnung, <ol class="loes-seo-steps"> (je Schritt ein <li>), Hinweisen, Abgrenzung, Quellenzeile und Link in die
//       App (/#sec=<sec>[&tab=<tab>]&go=loes-<slug>, class cd-go mit data-go/data-goq/data-tab wie die App-Links).
//       Ab zwei Eintraegen umhuellt <div class="loes-seo-wrap" id="loesungen"> alles und ein kurzer Satz steht davor.
//       Kein <tr>/<article>, kein <h2> (COUNT_CHECKs und die Aufteilung in appFassung() bleiben unberuehrt), kein FAQ-/JSON-LD.
//       abgrenzung + abgrenzungLink {seite, text}: Hinweis „Nicht verwechseln“ mit Link auf /<seite>.
//   loesungHref(h, slug)     -> "/<seo.seite>#a-<slug>" oder "" (kein Eintrag oder kein seo); bei eigener Seite
//       (seo.seite === slug) ohne Fragment "/<slug>", damit die App-Fassung beim Laden zur Loesung springt.
//   loesungEintrag(h, slug)  -> Eintrag mit seo, seo.h3 und Schritten oder null (K5, eigene Seiten).
//   loesungenVerweise(h, slugs, satzHtml) -> <p class="note loes-seo-verweis"> mit Links auf die eigenen Loesungsseiten
//       der genannten slugs (nur Eintraege mit seo.seite === slug) oder "" (K5).
//   loesungVerweis(h, slug, satzHtml) -> <p class="note loes-seo-verweis">satzHtml <a href=...>Zur Lösung</a></p> oder "".
//       satzHtml ist fertiges HTML des Aufrufers (nicht escaped).
// Fehlt LOESUNGEN_PFLICHT (extract wirft) oder ist ein Array leer, liefern alle drei Funktionen "".
//
// Einbindung im Seitenmodul: GENAU eine Zeile, die das Ergebnis VOR die erste <h2> des bodyHtml setzt (appFassung()
// zeigt nur, was vor der ersten <h2> steht, offen; alles danach landet in "Komplette Liste zum Nachschlagen").
//   ${loesungenSeo(ctx.helpers, SLUG)}   // LOES: Loesungen zu dieser Seite
// Pruefung: verify-seo.mjs, Abschnitt "LOES Anfang".

const cache = new WeakMap();

function lade(h) {
  if (!h || typeof h.extract !== "function") return [];
  if (cache.has(h.extract)) return cache.get(h.extract);
  const lies = (n) => { try { const a = h.extract(n); return Array.isArray(a) ? a : []; } catch { return []; } };
  const liste = lies("LOESUNGEN_PFLICHT").concat(lies("LOESUNGEN_KUER")).filter((e) => e && e.slug);
  cache.set(h.extract, liste);
  return liste;
}

const arr = (x) => (Array.isArray(x) ? x : x == null || x === "" ? [] : [x]).filter((v) => v != null && v !== "");
const datumDe = (d) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(d || "")); return m ? `${m[3]}.${m[2]}.${m[1]}` : String(d || ""); };
const HINWEIS = { miss: "Verpassbar:", warn: "Achtung:", info: "Hinweis:" };

export function loesungHref(h, slug) {
  const e = lade(h).find((x) => x.slug === slug);
  if (!e || !e.seo || !e.seo.seite) return "";
  // Eigene Seite (seite === slug, K5): Adresse ohne Fragment. Mit einem # in der Adresse setzt das Start-Skript der
  // App-Fassung den Startbereich nicht (if(!location.hash)...) und der Besucher landete nicht bei der Loesung.
  return e.seo.seite === e.slug ? `/${e.seo.seite}` : `/${e.seo.seite}#a-${e.slug}`;
}

// K5: voller Eintrag zu einem slug (nur wenn er eine SEO-Seite und Schritte hat), sonst null.
export function loesungEintrag(h, slug) {
  const e = lade(h).find((x) => x.slug === slug);
  return e && e.seo && e.seo.seite && e.seo.h3 && arr(e.schritte).length ? e : null;
}

// K5: eine Zeile mit Links auf die EIGENEN Loesungsseiten (Eintraege, deren seo.seite gleich ihrem slug ist, z. B.
// /uralter-tempel). Gedacht fuer Sammelseiten (charting-the-unknown); ohne passende Eintraege kommt "".
//   satzHtml: fertiges HTML des Aufrufers (nicht escaped), z. B. "Eigene Loesungsseiten:".
export function loesungenVerweise(h, slugs, satzHtml) {
  const liste = arr(slugs).map((s) => loesungEintrag(h, s)).filter((e) => e && e.seo.seite === e.slug);
  if (!liste.length) return "";
  return `<p class="note loes-seo-verweis">${satzHtml} ${liste.map((e) => `<a href="${h.esc(loesungHref(h, e.slug))}">${h.esc(e.de)}</a>`).join(" &middot; ")}</p>`;
}

export function loesungVerweis(h, slug, satzHtml) {
  const href = loesungHref(h, slug);
  if (!href) return "";
  return `<p class="note loes-seo-verweis">${satzHtml} <a href="${h.esc(href)}">Zur Lösung</a></p>`;
}

function abschnitt(h, e) {
  const { esc } = h;
  const s = e.slug;
  const tab = e.tab ? `&amp;tab=${esc(e.tab)}` : "";
  const appHref = `/#sec=${esc(e.sec)}${tab}&amp;go=loes-${esc(s)}`;
  const zeile = (label, liste) => {
    const l = arr(liste);
    return l.length ? `<p class="loes-seo-z"><strong>${label}</strong> ${l.map(esc).join("; ")}</p>\n` : "";
  };
  const schritte = arr(e.schritte).map((st) =>
    `<li>${st.t ? `<strong>${esc(st.t)}:</strong> ` : ""}${esc(st.d)}${st.conf === "einzelquelle" ? ` <span class="loes-seo-unb">eine Quelle, unbestätigt</span>` : ""}</li>`).join("\n");
  const hinweise = arr(e.hinweise).map((x) => `<p class="note">${HINWEIS[x.kind] || HINWEIS.info} ${esc(x.txt)}</p>`).join("\n");
  const quellen = arr(e.quellen);
  const daten = [...new Set(quellen.map((q) => q.datum))];
  const einDatum = daten.length === 1;
  const qLinks = quellen.map((q) => {
    const t = esc(q.t || q.url);
    const a = /^https:\/\//.test(String(q.url || "")) ? `<a href="${esc(q.url)}" rel="noopener" target="_blank">${t}</a>` : t;
    return einDatum ? a : `${a} (${esc(datumDe(q.datum))})`;
  });
  const qZeile = quellen.length
    ? `<p class="loes-seo-q">Quellen (${einDatum ? `nachgelesen am ${esc(datumDe(daten[0]))}` : "nachgelesen"}): ${qLinks.join(", ")}</p>\n`
    : "";
  return `<section class="loes-seo" id="loes-seo-${esc(s)}">
<h3 id="a-${esc(s)}">${esc(e.seo.h3)}</h3>
<p class="loes-seo-kurz">${esc(e.kurz)}</p>
${e.abgrenzung ? `<p class="note">Nicht verwechseln: ${esc(e.abgrenzung)}${e.abgrenzungLink && e.abgrenzungLink.seite ? ` <a href="/${esc(e.abgrenzungLink.seite)}">${esc(e.abgrenzungLink.text || "Ansehen")}</a>` : ""}</p>\n` : ""}${zeile("Voraussetzung:", e.voraussetzung)}${zeile("Belohnung:", e.belohnung)}<ol class="loes-seo-steps">
${schritte}
</ol>
${hinweise ? hinweise + "\n" : ""}${qZeile}<p class="loes-seo-app"><a class="cd-go" href="${appHref}" data-go="${esc(e.sec)}" data-goq="loes-${esc(s)}"${e.tab ? ` data-tab="${esc(e.tab)}"` : ""}>Lösung in der App öffnen</a></p>
</section>`;
}

export function loesungenSeo(h, seite) {
  const liste = lade(h).filter((e) => e.seo && e.seo.seite === seite && e.seo.h3 && arr(e.schritte).length);
  if (!liste.length) return "";
  const teile = liste.map((e) => abschnitt(h, e)).join("\n");
  if (liste.length === 1) return teile;
  return `<div class="loes-seo-wrap" id="loesungen">
<p class="note">Schritt-für-Schritt-Lösungen zu Quests, nach denen oft gesucht wird.</p>
${teile}
</div>`;
}

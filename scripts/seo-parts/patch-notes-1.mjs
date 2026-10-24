// parts/patch-notes-1.mjs — Archivseite "Patch-Notes 1.x" (vorbereitet 24.10.2026).
//
// Existiert nur zusammen mit dem Patch-Notes-Umbau (CD_PATCH_UMBAU=1, siehe Kopf von
// patch-notes.mjs): dann zeigt /patch-notes die 2.x-Patches und diese Seite alle
// Patches vor Crimson Desert Enhanced (1.x). Aufbau, CSS und Einordnungen kommen
// vollstaendig aus patch-notes.mjs (buildSeite mit archiv=true), hier steht nur,
// was die Seite als eigenes Modul fuer gen-seo braucht.

import { buildSeite, auswahl, ARCHIV_SLUG, UMBAU, introUmbau } from "./patch-notes.mjs";

export function INTRO(ctx) {
  return introUmbau(ctx, true);
}

export { UMBAU };
export const SLUG = ARCHIV_SLUG;
export const NAV_LABEL = "Patch-Archiv 1.x";
export const DEEPLINK = "/#sec-patches";
// Archiv: aendert sich kaum noch.
export const SITEMAP = { pri: "0.5", freq: "monthly" };
export const EXTRA_CSS = "";

export function COUNT_CHECK(ctx) {
  return {
    regex: /<p class="pmeta" id="patch-/g,
    expected: auswahl(ctx.data.PATCHES, true).length,
    label: "Patch-Meta-Zeilen (1.x)",
  };
}

export function build(ctx) {
  return buildSeite(ctx, true);
}

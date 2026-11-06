// Deutsche Anzeigenamen fuer die SEO-Seiten. Laedt data/d00-de-namen.js (dieselbe Zuordnung wie die App) einmal per vm.
// deN(name) fuer genau einen Namen, deT(text) fuer zusammengesetzte Felder, deQ(q) Suchnadeln deutsch und englisch.
// Nur fuer die Anzeige: Slugs, Anker-IDs, Bild-Schluessel und Sortier-/Filterschluessel bleiben englisch.
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const D00 = fileURLToPath(new URL("../../data/d00-de-namen.js", import.meta.url));
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(D00, "utf8") + ";globalThis.__de={deN,deT,deQ}", ctx, { filename: D00 });
export const { deN, deT, deQ } = ctx.__de;

#!/usr/bin/env node
// Misst die Abdeckung von data/d14-beschaffung.js: je Tabelle Anzahl mit Eintrag, Weg, Ort, Kapitel, Karte, „nicht erfasst“.
// Aufruf: node scripts/beschaffung-abdeckung.mjs [--json]   Exit 1, wenn ein Teil keinen Eintrag hat oder ein Weg auf einen unbekannten Ort zeigt.
import fs from "node:fs"; import path from "node:path"; import vm from "node:vm"; import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { console, window: {}, document: { addEventListener() {}, getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; }, createElement() { return {}; } }, localStorage: { getItem() { return null; }, setItem() {} }, navigator: {}, location: {} };
ctx.self = ctx; vm.createContext(ctx);
for (const f of fs.readdirSync(path.join(ROOT, "data")).filter((f) => /^d\d\d.*\.js$/.test(f)).sort()) vm.runInContext(fs.readFileSync(path.join(ROOT, "data", f), "utf8"), ctx, { filename: f });
const g = (n) => { try { return vm.runInContext(n, ctx); } catch { return undefined; } };
const B = g("typeof BESCHAFFUNG==='undefined'?{}:BESCHAFFUNG"), O = g("typeof ORTE==='undefined'?{}:ORTE"), F = g("FUNDORTE");
const zeilen = [], fehler = [];
for (const t of ["WEAPONS", "ARMOR", "ACCESSORIES", "DLC_GEAR_EXTRA"]) {
  const L = g(t) || []; const z = { tabelle: t, teile: L.length, eintrag: 0, weg: 0, ort: 0, kapitel: 0, karte: 0, nichtErfasst: 0, fundorteAlt: 0 };
  for (const e of L) {
    if (F[e.name]) z.fundorteAlt++;
    const d = B[e.name]; if (!d) { fehler.push(`ohne Eintrag: ${t}: ${e.name}`); continue; }
    z.eintrag++; const w = d.wege || [];
    if (w.length) z.weg++; else z.nichtErfasst++;
    for (const x of w) if (x.ort && !O[x.ort]) fehler.push(`unbekannter Ort ${x.ort}: ${e.name}`);
    if (w.some((x) => x.ort && O[x.ort])) z.ort++;
    if (d.ab && d.ab.kapitel != null) z.kapitel++;
    if (w.some((x) => x.ort && O[x.ort] && O[x.ort].img)) z.karte++;
  }
  zeilen.push(z);
}
const mitBild = Object.values(O).filter((o) => o.img); const fehlt = mitBild.filter((o) => !fs.existsSync(path.join(ROOT, "cd_assets/maps", o.img)));
for (const o of fehlt) fehler.push(`Bild fehlt: ${o.img}`);
if (process.argv.includes("--json")) console.log(JSON.stringify({ zeilen, orte: Object.keys(O).length, orteMitBild: mitBild.length, fehler }, null, 1));
else {
  console.log("Tabelle".padEnd(16) + ["Teile", "Eintrag", "Weg", "Ort", "Kapitel", "Karte", "n. erfasst", "alt"].map((s) => s.padStart(11)).join(""));
  for (const z of zeilen) console.log(z.tabelle.padEnd(16) + [z.teile, z.eintrag, z.weg, z.ort, z.kapitel, z.karte, z.nichtErfasst, z.fundorteAlt].map((s) => String(s).padStart(11)).join(""));
  console.log(`Orte: ${Object.keys(O).length}, mit Bild: ${mitBild.length}, BESCHAFFUNG-Einträge: ${Object.keys(B).length}`);
  fehler.slice(0, 40).forEach((f) => console.log("FEHLER " + f)); if (fehler.length > 40) console.log(`… ${fehler.length - 40} weitere`);
}
process.exit(fehler.length ? 1 : 0);

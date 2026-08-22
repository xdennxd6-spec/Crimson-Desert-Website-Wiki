// Linkcheck ueber alle externen Bild-URLs der *_IMGS-Maps in index.html.
// Aufruf: node scripts/linkcheck.mjs   (Exit-Code 1, wenn URLs kaputt sind)
// Prueft per HEAD (Fallback GET bei 405) mit kleiner Parallelitaet.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
// Seit dem Split (23.08.2026) liegen die Daten-Konstanten in data/*.js;
// die *_IMGS-Maps stehen dort — index.html + Datendateien als EIN Quelltext lesen.
const html = [
  fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'),
  ...fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('.js')).sort()
    .map(f => fs.readFileSync(path.join(ROOT, 'data', f), 'utf8')),
].join('\n');

// Praefix-Konstante QLG aus dem HTML lesen und in den eval-Scope binden, damit
// die NPC_IMGS_CDN-Map (Eintraege der Form QLG+"…webp") parsebar wird und nicht
// still uebersprungen wird. Per Regex aus dem HTML gelesen, damit kein Drift entsteht.
const qm = html.match(/const QLG\s*=\s*'([^']+)'/);
const QLG = qm ? qm[1] : '';

const urls = new Map(); // url -> [wo gefunden]
// Lazy bis zum ersten "};" — funktioniert fuer mehrzeilige UND einzeilige Maps
// (CORE_IMGS_CDN ist ein Einzeiler; die alte \n};-Variante fraß sich bis in CORE_VIDS und crashte).
for (const m of html.matchAll(/const ([A-Z_]+_IMGS(?:_CDN)?)\s*=\s*(\{[\s\S]*?\})\s*;/g)) {
  let obj;
  try { obj = eval('(' + m[2] + ')'); }
  catch (e) { console.error('WARN: Map', m[1], 'nicht parsebar —', e.message); continue; }
  for (const [key, v] of Object.entries(obj)) {
    if (typeof v === 'string' && /^https?:\/\//.test(v)) {
      if (!urls.has(v)) urls.set(v, []);
      urls.get(v).push(m[1] + ':' + key);
    }
  }
}
// --- Inline-Icons aus Daten-Arrays -------------------------------------------------
// PETS, CRAFTING und WITCH_SYNTHESIS tragen ihre Bilder NICHT in einer *_IMGS-Map,
// sondern als blosser Dateiname im Feld `icon`; die volle URL entsteht erst zur
// Laufzeit als PRAEFIX + icon (index.html: PET_CDN/CRAFT_CDN/SYNTH_CDN). Die Regex
// oben sieht davon nichts, wodurch mehrere hundert Bilder ungeprueft blieben.
function constStr(name) {
  const m = html.match(new RegExp('const ' + name + "\\s*=\\s*['\"]([^'\"]+)['\"]"));
  return m ? m[1] : null;
}
// Array-Rumpf ab "const NAME=[" bis zur abschliessenden Zeile "];". Bewusst kein
// Klammer-Zaehlen: die Daten enthalten eckige Klammern in Fliesstexten (z.B. "[Patch 1.10]"),
// waehrend "];" am Zeilenanfang eindeutig das Array-Ende markiert.
function arrayBlock(name) {
  const m = html.match(new RegExp('const ' + name + '\\s*=\\s*\\['));
  if (!m) return null;
  const start = m.index + m[0].length;
  const end = html.indexOf('\n];', start);
  return end === -1 ? null : html.slice(start, end);
}
for (const [arr, prefixName] of [['PETS', 'PET_CDN'], ['CRAFTING', 'CRAFT_CDN'], ['WITCH_SYNTHESIS', 'SYNTH_CDN']]) {
  const prefix = constStr(prefixName);
  const block = arrayBlock(arr);
  if (!prefix) { console.error('WARN: Praefix', prefixName, 'nicht gefunden — ' + arr + '-Icons ungeprueft'); continue; }
  if (!block) { console.error('WARN: Array', arr, 'nicht abgrenzbar — Icons ungeprueft'); continue; }
  let n = 0;
  for (const im of block.matchAll(/\bicon:\s*"([^"]+)"/g)) {
    const raw = im[1];
    // gleiche Aufloesung wie im Renderer: absolute bzw. lokale Pfade bleiben unveraendert
    const url = /^(https?:|cd_assets\/)/.test(raw) ? raw : prefix + raw;
    if (!/^https?:\/\//.test(url)) continue;
    if (!urls.has(url)) urls.set(url, []);
    urls.get(url).push(arr + ':' + raw.slice(0, 48));
    n++;
  }
  console.log('  ' + arr + '-Icons aufgeloest:', n, '(Praefix ' + prefixName + ')');
}

console.log('Externe Bild-URLs:', urls.size);

const broken = [];
let checked = 0;
const list = [...urls.keys()];
let idx = 0;
async function check(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux aarch64)' }, signal: AbortSignal.timeout(20000) });
      if (res.ok) return null;
      if (res.status === 405 && method === 'HEAD') continue;
      return 'HTTP ' + res.status;
    } catch (e) {
      if (method === 'GET') return e.name === 'TimeoutError' ? 'Timeout' : e.message;
    }
  }
  return 'unklar';
}
await Promise.all(Array.from({ length: 6 }, async () => {
  while (idx < list.length) {
    const url = list[idx++];
    const err = await check(url);
    checked++;
    if (err) broken.push({ url, err, refs: urls.get(url) });
    if (checked % 100 === 0) console.log('geprueft:', checked, '/', list.length);
    await new Promise(r => setTimeout(r, 100));
  }
}));

if (broken.length) {
  console.log('\nKAPUTTE URLS (' + broken.length + '):');
  for (const b of broken) console.log('-', b.err, b.url, '  [' + b.refs.join(', ') + ']');
  process.exit(1);
} else {
  console.log('Alle URLs erreichbar.');
}

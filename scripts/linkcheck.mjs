// Linkcheck ueber alle externen Bild-URLs der *_IMGS-Maps in index.html.
// Aufruf: node scripts/linkcheck.mjs   (Exit-Code 1, wenn URLs kaputt sind)
// Prueft per HEAD (Fallback GET bei 405) mit kleiner Parallelitaet.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const urls = new Map(); // url -> [wo gefunden]
for (const m of html.matchAll(/const ([A-Z_]+_IMGS(?:_CDN)?)\s*=\s*(\{[\s\S]*?\n\s*\};)/g)) {
  const obj = eval('(' + m[2].replace(/;\s*$/, '') + ')');
  for (const [key, v] of Object.entries(obj)) {
    if (typeof v === 'string' && /^https?:\/\//.test(v)) {
      if (!urls.has(v)) urls.set(v, []);
      urls.get(v).push(m[1] + ':' + key);
    }
  }
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

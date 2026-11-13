#!/usr/bin/env node
// gen-inseln.mjs: erzeugt data/d15-inseln.js (Daten der App-Seite „Inseln“, #sec=inseln) vollständig neu.
//
// Herkunft
//   1. Spieldaten-Paket inseln.json (19 Inseln, vom PC aus den Spieldateien ausgelesen: Patch 2.04.03 + DLC dlc_01,
//      08.11.2026): Namen, Regionen, Knoten mit Weltpositionen, Texte aus knowledge/quest/item/region/character/faction.
//   2. Wiki-Daten aus data/*.js (in einem vm-Kontext geladen): DLC_ISLANDS, DLC_ISLAND_FACTS, DLC_QUESTS, DLC_BOSSES,
//      DLC_MOUNTS, MOUNTS, WEAPONS, ARMOR, ACCESSORIES, ITEMS, CRAFTING, DLC_GEAR_EXTRA, DLC_TRADE, DLC_SHIPS, DLC_SHIP_PARTS
//      und DE_NAMES. Welche Wiki-Einträge zu welcher Insel gehören, steht in scripts/inseln-hand.json (wiki_bezuege,
//      wiki_inseln); jeder Text dort wird hier gegen die aktuellen data/*.js geprüft.
//   3. Wenige Fremdquellen (Game8, KeenGamer) für Ankerplatz, Abyss-Nexus, Anreise und Rohstoffe, mit URL und
//      Prüfdatum in scripts/inseln-hand.json (fremd).
//
// Aufruf (auf dem Pi über schwer.sh):
//   node scripts/gen-inseln.mjs --paket ~/cdwiki-nacht/auftraege/inseln-paket/inseln.json
//   Optionen: --repo <Pfad> (Standard: Ordner über scripts/), --out <Datei> (Standard: data/d15-inseln.js),
//             --zahlen <Datei> (Kennzahlen je Insel als JSON, für Berichte), --pruefen (nur prüfen, nichts schreiben)
//
// Feldvertrag (Kurzfassung; ausführlich im Briefing des Nachtlaufs 11.11.2026, Abschnitt 4.2):
//   INSELN_META        {stand, erzeugt, paket}
//   INSELN             19 Inseln in Paket-Reihenfolge, je {slug, en, de, region_id, meer, lage, kurz, orte, hoehlen,
//                      bewohner, quests, wissen, fundorte, tiere, items, quellen}
//   INSELN_OHNE_INSEL  {hoehlen, meere, sonst}: DLC-Regionen ohne belegte Insel
//   Jedes Objekt trägt „beleg“: „Spieldaten: <datei> <key>“, „Wiki: <Konstante> <Eintrag>“ (bei unsicherer Wiki-Angabe
//   mit „, laut <Quelle>, unbestätigt“) oder „<Quelle> <URL> (geprüft TT.MM.JJJJ)“ (Einzelquelle: „, einzige Quelle,
//   unbestätigt“). Texte ohne HTML, Absätze mit Leerzeile, keine Platzhalter, keine leeren Strings.
//
// Die Ausgabedatei NICHT von Hand editieren: Handpflege gehört in scripts/inseln-hand.json, danach neu erzeugen.
// Selbstprüfungen (Abbruch mit Exit 1): 19 Inseln mit festen Slugs, Belege, keine HTML-Reste oder Platzhalter, keine
// leeren Strings, keine Gedankenstriche in eigenen Texten, keine doppelten Texte je Insel, keine Insel „Rosenui“,
// Link-Ziele in SECTIONS, Neuladen der geschriebenen Datei im vm-Kontext mit Strukturprüfung.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const flag = k => process.argv.includes('--' + k);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(arg('repo', path.join(HERE, '..')));
const PAKET = arg('paket', '');
const OUT = path.resolve(arg('out', path.join(ROOT, 'data', 'd15-inseln.js')));
const HAND = path.resolve(arg('hand', path.join(ROOT, 'scripts', 'inseln-hand.json')));
if (!PAKET) { console.error('Aufruf: node scripts/gen-inseln.mjs --paket <inseln.json>'); process.exit(2); }

const fehler = [];
const fail = m => { fehler.push(m); };
const stop = () => { if (fehler.length) { console.error('gen-inseln: ' + fehler.length + ' Fehler'); fehler.slice(0, 60).forEach(f => console.error('  ' + f)); process.exit(1); } };

const P = JSON.parse(fs.readFileSync(PAKET.replace(/^~/, process.env.HOME), 'utf8'));
const H = JSON.parse(fs.readFileSync(HAND, 'utf8'));
const GEPRUEFT = H.geprueft;
const PAKET_TXT = 'inseln.json (Patch 2.04.03 + DLC dlc_01, ausgelesen 08.11.2026)';

const SLUGS = ['crowtalon', 'red-hangs', 'satyros', 'iliya', 'bergel', 'samora', 'estra', 'ocula', 'nirakan', 'cloven-hoof',
  'saeon', 'navrah', 'phragma', 'carcano', 'auronui', 'razanui', 'xamaca', 'spagnola', 'drangar'];
const EN_ERWARTET = ['Crowtalon Isle', 'Red Hangs Island', 'Satyros Island', 'Iliya Island', 'Bergel Island', 'Samora Island',
  'Estra Island', 'Ocula Island', 'Nirakan Island', 'Cloven Hoof Isle', 'Saeon Island', 'Navrah Island', 'Phragma Island',
  'Carcano Island', 'Auronui Island', 'Razanui Island', 'Xamaca Island', 'Spagnola Island', 'Drangar Island'];
const ORT_ARTEN = ['dorf', 'kueste', 'ruine', 'wachturm', 'ankerplatz', 'nest', 'haus', 'gebiet', 'sonst'];
const BEW_ARTEN = ['npc', 'fraktion', 'volk'];
const TIER_ARTEN = ['reittier', 'gegner', 'boss', 'schiff'];

// ---------------------------------------------------------------- Wiki-Daten laden
const W = {};
{
  const ctx = { console };
  ctx.self = ctx; ctx.window = ctx;
  ctx.document = { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {} };
  ctx.localStorage = { getItem: () => null, setItem() {} };
  vm.createContext(ctx);
  const files = fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^d\d\d.*\.js$/.test(f) && !f.startsWith('d15')).sort();
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, 'data', f), 'utf8');
    const ns = [...src.matchAll(/^(?:const|var|let)\s+([A-Za-z_$][\w$]*)\s*=/gm)].map(m => m[1]);
    vm.runInContext(src + '\n;' + ns.map(n => `this.__${n}=${n}`).join(';'), ctx, { filename: f });
    for (const n of ns) W[n] = ctx['__' + n];
  }
}
const DE_NAMES = W.DE_NAMES || {};
const WIKI_ALLES = (() => { const o = []; for (const [k, v] of Object.entries(W)) if (!/IMGS$|^DE_NAMES$/.test(k)) { try { o.push(JSON.stringify(v)); } catch {} } return o.join('\n'); })();
const SEC_IDS = new Set((W.SECTIONS || []).map(s => s.id));
if (!SEC_IDS.size) fail('SECTIONS nicht geladen (data/d04-armor-imgs.js)');

// ---------------------------------------------------------------- Text-Helfer
const norm = s => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
function clean(s) {
  let t = String(s);
  t = t.replace(/\{[^{}#]*#([^{}]*)\}/g, '$1');          // {StaticInfo:…#sichtbarer Text} -> sichtbarer Text
  t = t.replace(/\{[^{}]*\}/g, '');                        // übrige Platzhalter
  t = t.replace(/%[sd]/g, '');
  t = t.replace(/\s*<br\s*\/?>\s*/gi, '\n\n');             // Zeilenumbrüche -> Absätze
  t = t.replace(/<[^>]+>/g, '');                           // übrige Tags
  t = t.split('\n\n').map(p => p.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n\n');
  return t.trim();
}
const paras = t => t.split('\n\n').filter(Boolean);
function saetze(t) {
  const out = []; const re = /[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g; let m;
  while ((m = re.exec(t))) { const s = m[0].trim(); if (s) out.push(s); }
  return out;
}
// erster Absatz bzw. erster Satz als Bezeichnung, Rest als Text
function teile(t) {
  const ps = paras(t);
  if (ps.length > 1) return [ps[0], ps.slice(1).join('\n\n')];
  const ss = saetze(t);
  if (ss.length > 1) return [ss[0], t.slice(t.indexOf(ss[0]) + ss[0].length).trim()];
  return [t, ''];
}
const ohnePunkt = s => s.replace(/[.:]+$/, '').trim();
const gross = s => s ? s[0].toUpperCase() + s.slice(1) : s;
const ohneArtikel = s => gross(ohnePunkt(s).replace(/^(Ein|Eine|Einen|A|An)\s+/, ''));
const woerter = s => (s.toLowerCase().match(/[a-zäöüß0-9]+/g) || []);
function aehnlich(a, b) {
  const A = new Set(woerter(a)), B = new Set(woerter(b)); if (!A.size || !B.size) return 0;
  let n = 0; for (const x of A) if (B.has(x)) n++; return n / Math.min(A.size, B.size);
}
const DASH = /[–—]/;

// Alle Spieltexte (bereinigt) für die Gedankenstrich-Prüfung: Spieltexte bleiben wörtlich, eigene Texte ohne U+2013/2014.
const SPIEL = [];
const spiel = s => { if (s) SPIEL.push(s); return s; };

// ---------------------------------------------------------------- Wiki-Helfer
function wikiEintrag(konst, eintrag) {
  const K = W[konst];
  if (K == null) return null;
  if (Array.isArray(K)) {
    const e = K.find(x => x && !Array.isArray(x) && (x.name === eintrag || x.en === eintrag));
    if (e) return e;
    const a = K.find(x => Array.isArray(x) && x[0] === eintrag);
    return a || null;
  }
  if (typeof K === 'object') return Object.prototype.hasOwnProperty.call(K, eintrag) ? K[eintrag] : null;
  return null;
}
function wikiText(v) { // alle Strings eines Eintrags als ein normalisierter Text
  const out = []; (function walk(x) { if (typeof x === 'string') out.push(x); else if (x && typeof x === 'object') for (const k of Object.keys(x)) walk(x[k]); })(v);
  return norm(out.join(' \u0001 '));
}
// q ist meist eine Quellenliste („th.gl“, „Game8, Mobalytics“); manche Wiki-Einträge tragen dort einen Satz („Name, Effekt und
// Preis nur laut th.gl“), der dann ohne vorangestelltes „laut“ übernommen wird.
const istQuellenliste = q => /^[A-Za-z0-9.' ]+(?:(?:, | und |; )[A-Za-z0-9.' ()]+)*$/.test(q) && !/\b(nur|laut|strittig|Name|Preis)\b/.test(q);
const wikiBeleg = (konst, eintrag, unb, q) => 'Wiki: ' + konst + ' ' + eintrag + (unb ? (q ? (istQuellenliste(q) ? ', laut ' : ', ') + q : '') + ', unbestätigt' : '');
const fremdBeleg = (quellen, einzel) => quellen.map(q => q.quelle + ' ' + q.url + ' (geprüft ' + GEPRUEFT + ')').join('; ') + (einzel ? ', einzige Quelle, unbestätigt' : '');
const deName = en => (en && Object.prototype.hasOwnProperty.call(DE_NAMES, en)) ? DE_NAMES[en] : null;

// ---------------------------------------------------------------- Paket prüfen
if (!Array.isArray(P.inseln) || P.inseln.length !== 19) fail('Paket: erwartet 19 Inseln, gefunden ' + (P.inseln || []).length);
P.inseln.forEach((i, n) => { if (i.en !== EN_ERWARTET[n]) fail('Paket: Insel ' + n + ' ist ' + i.en + ', erwartet ' + EN_ERWARTET[n]); });
stop();
const REGION_ALLE = new Map(P.dlc_regionen_alle.map(r => [r.region_id, r]));

// Hand-Klassen auf Vollständigkeit prüfen (jede soll genau einen Paket-Eintrag treffen)
const handGenutzt = new Set();

// ---------------------------------------------------------------- Inseln aufbauen
const zugeordneteRegionen = new Set();
const INSELN = [];
const statistik = {};

for (let n = 0; n < 19; n++) {
  const I = P.inseln[n], slug = SLUGS[n];
  const ins = { slug, en: I.en, de: I.de, region_id: I.region_id, meer: null, lage: null, kurz: null,
    orte: [], hoehlen: [], bewohner: [], quests: [], wissen: [], fundorte: [], tiere: [], items: [], quellen: [] };
  const st = statistik[slug] = { quests_ausgeschlossen: [], items_ohne_text: [], titel_ohne_text: [] };
  zugeordneteRegionen.add(I.region_id);

  // Gruppen je Datei und id (bei fehlender id: key)
  const gruppen = [];
  for (const [datei, liste] of Object.entries(I.texte)) {
    const m = new Map();
    for (const t of liste) {
      const gid = t.id != null ? String(t.id) : String(t.key);
      if (!m.has(gid)) m.set(gid, { datei, id: gid, texte: [] });
      m.get(gid).texte.push(t);
    }
    gruppen.push(...m.values());
  }
  const hand = g => { const k = slug + '|' + g.datei + '|' + g.id; const h = H.paket_klassen[k]; if (h) handGenutzt.add(k); return h || null; };
  const sb = (datei, key) => 'Spieldaten: ' + datei + ' ' + key;

  // Varianten einer Gruppe: Titel und Beschreibung (gleiche Texte zusammengefasst)
  const TITEL_FELDER = ['0x490', '0x890', '0x70', '0x101', '0x100', '0x110', '0x30', '0xfa40210', '0xfa00210'];
  const DESC_FOLGE = ['0x491', '0x891', '0x49e', '0x49f', '0x89f', '0x71', '0x102', '0x105', null];
  function zerlege(g) {
    const tit = g.texte.filter(t => TITEL_FELDER.includes(t.feld));
    let desc = g.texte.filter(t => !TITEL_FELDER.includes(t.feld) && t.feld !== '0x49d');
    desc.sort((a, b) => DESC_FOLGE.indexOf(a.feld) - DESC_FOLGE.indexOf(b.feld));
    const titel = tit.length ? { de: spiel(clean(tit[0].de)), en: clean(tit[0].en), key: tit[0].key } : null;
    // Quest-Beschreibung und Abschlusstext sind verschiedene Texte: beide behalten; Wissens-Varianten zusammenfassen
    const absatz = []; let key = null; const enAbs = [];
    for (const t of desc) {
      const de = clean(t.de); if (!de) continue;
      if (absatz.some(a => a === de || (aehnlich(a, de) >= 0.6 && !(g.datei.startsWith('quest') && t.feld === '0x105')))) continue;
      if (absatz.length && g.datei.startsWith('knowledge') && aehnlich(absatz[0], de) >= 0.3) continue;
      absatz.push(spiel(de)); enAbs.push(clean(t.en)); if (!key) key = t.key;
    }
    return { titel, txt: absatz.join('\n\n'), en: enAbs.join('\n\n'), key: key || (titel && titel.key) };
  }

  // --- Regionen der Insel (Orte und Höhlen mit Namen)
  const regionen = new Map(); // region_id -> {de,en,key,datei}
  for (const g of gruppen) if (g.datei.startsWith('region')) {
    const t = g.texte.find(x => x.feld === '0x110'); if (!t) continue;
    regionen.set(Number(g.id), { de: spiel(clean(t.de)), en: clean(t.en), key: t.key, datei: g.datei });
  }
  for (const r of I.regionen_intern) if (!regionen.has(r.id)) regionen.set(r.id, { de: spiel(r.name_de), en: r.name_en, key: 'region_id ' + r.id, datei: r.quelle });
  const ortNachName = new Map(); const hoehleNachName = new Map();
  const ohneBest = s => s.replace(/^(Der|Die|Das)\s+/, '');
  for (const [rid, r] of regionen) {
    zugeordneteRegionen.add(rid);
    if (rid === I.region_id || r.de === I.de) continue;
    const istHoehle = (rid >= 33200 && rid < 33300) || /Höhle|Grotte|Cave|Grotto/i.test(r.de + ' ' + r.en);
    if (istHoehle) {
      const h = { de: r.de, en: r.en, txt: null, unterwasser: false, beleg: sb(r.datei, r.key) };
      ins.hoehlen.push(h); hoehleNachName.set(ohneBest(r.de), h);
    } else {
      const e = r.en;
      const art = /Village|^Samora$/.test(e) ? 'dorf' : /Coast/.test(e) ? 'kueste' : /Ruins/.test(e) ? 'ruine' : /Watchtower/.test(e) ? 'wachturm'
        : /Nest/.test(e) ? 'nest' : /Outpost/.test(e) ? 'gebiet' : /Dock|Pier|Anchorage/.test(e) ? 'ankerplatz' : 'sonst';
      const o = { de: r.de, en: r.en, art, beleg: sb(r.datei, r.key) };
      ins.orte.push(o); ortNachName.set(ohneBest(r.de), o);
    }
  }
  const unterwasser = (de, en) => /Meeresgrund|Unterwasser|unter Wasser/i.test(de) || /seabed|seafloor|sea floor|underwater|beneath the (sea|waves)/i.test(en);

  // --- Gruppen auswerten
  const schiffe = []; const warnungen = [];
  for (const g of gruppen) {
    if (g.datei.startsWith('region')) continue;
    const z = zerlege(g); const h = hand(g);

    // Hand-Klassen zuerst
    if (h) {
      if (h.ziel === 'orte' || h.ziel === 'bewohner') {
        let de = h.de, en = h.en, txt = z.txt;
        if (h.wort_de && !z.txt.includes(h.wort_de)) fail(slug + ': Name ' + h.wort_de + ' steht nicht im Text ' + g.id);
        if (h.wort_en && !z.en.includes(h.wort_en)) fail(slug + ': Name ' + h.wort_en + ' steht nicht im EN-Text ' + g.id);
        if (!de) { const [a, b] = teile(z.txt); de = ohneArtikel(a); txt = b; en = ohneArtikel(teile(z.en)[0]); if (!de.includes(',') && en.includes(',')) en = en.slice(0, en.indexOf(',')); }
        const o = { de, en, art: h.art }; if (txt) o.txt = txt; o.beleg = sb(g.datei, z.key);
        (h.ziel === 'orte' ? ins.orte : ins.bewohner).push(o); continue;
      }
      if (h.ziel === 'wissen') {
        if (!z.txt) fail(slug + ': Wissen ohne Text ' + g.id);
        const da = ins.wissen.find(w => norm(w.txt) === norm(z.txt));
        if (da) da.beleg += '; ' + g.datei + ' ' + z.key; else ins.wissen.push({ titel: h.titel, txt: z.txt, beleg: sb(g.datei, z.key) });
        continue;
      }
      if (h.ziel === 'items') {
        let de = h.de, en = h.en, extra = '';
        if (h.wiki_name) {
          const e = wikiEintrag(h.wiki_name.konst, h.wiki_name.eintrag);
          if (!e) { fail(slug + ': Wiki-Eintrag fehlt ' + h.wiki_name.konst + ' ' + h.wiki_name.eintrag); continue; }
          const wt = wikiText(e);
          if (!paras(z.txt).some(p => p.length >= 40 && wt.includes(norm(p)))) fail(slug + ': Itemtext nicht im Wiki-Eintrag ' + h.wiki_name.eintrag);
          en = h.wiki_name.eintrag; de = deName(en) || en; extra = '; Name: ' + wikiBeleg(h.wiki_name.konst, h.wiki_name.eintrag);
        }
        ins.items.push({ de, en, txt: z.txt, beleg: sb(g.datei, z.key) + extra }); continue;
      }
      if (h.ziel === 'tiere') { ins.tiere.push({ de: z.titel.de, en: z.titel.en, art: h.art, beleg: sb(g.datei, z.titel.key) }); continue; }
      if (h.ziel === 'quest_wiki') {
        const q = (W.DLC_QUESTS || []).find(x => x.name === h.quest);
        const s = q && (q.steps || []).find(x => x.name === h.schritt);
        if (!s) { fail(slug + ': DLC_QUESTS ' + h.quest + ' / ' + h.schritt + ' fehlt'); continue; }
        if (!WIKI_ALLES.includes(h.de)) fail(slug + ': DE-Titel ' + h.de + ' steht nirgends in den Wiki-Daten');
        const ae = aehnlich(norm(z.txt), norm([].concat(s.d).join(' ')));
        statistik[slug].quest_aehnlichkeit = Object.assign(statistik[slug].quest_aehnlichkeit || {}, { [h.schritt]: Math.round(ae * 100) / 100 });
        if (ae < (h.min_aehnlich || 0.5)) fail(slug + ': Questtext passt nicht zu ' + h.schritt + ' (' + ae.toFixed(2) + ')');
        const unb = q.c === 'unb';
        const slugF = 'dlc-q-' + cdSlug(q.name);
        ins.quests.push({ de: h.de, en: h.en, txt: z.txt, beleg: sb(g.datei, z.key) + '; Titel: ' + wikiBeleg('DLC_QUESTS', q.name, unb, q.q), link: { sec: 'dlc-quests', go: slugF } });
        continue;
      }
      fail(slug + ': unbekanntes Hand-Ziel ' + h.ziel); continue;
    }

    if (g.datei.startsWith('knowledge')) {
      if (z.titel && z.titel.de === I.de) { // Wissenseintrag der Insel
        if (z.txt) { ins._inselText = { txt: z.txt, key: z.key, datei: g.datei }; }
        continue;
      }
      const tn = z.titel && ohneBest(z.titel.de);
      if (z.titel && (ortNachName.has(tn) || hoehleNachName.has(tn))) {
        const o = ortNachName.get(tn) || hoehleNachName.get(tn);
        if (z.txt) { o.txt = z.txt; o.beleg += '; ' + g.datei + ' ' + z.key; if (hoehleNachName.has(tn)) o.unterwasser = unterwasser(z.txt, z.en); }
        continue;
      }
      if (z.titel) {
        if (!z.txt) { st.titel_ohne_text.push(z.titel.de); continue; }
        ins.wissen.push({ titel: z.titel.de, txt: z.txt, beleg: sb(g.datei, z.key) }); continue;
      }
      // ohne Titel: Schiff-Steckbrief oder Höhle, sonst muss die Handpflege entscheiden
      if (/^Name:/.test(z.en) || /^Name:/.test(z.txt)) { schiffe.push({ g, z }); continue; }
      const ersterSatzEn = saetze(z.en.split('\n\n')[0])[0] || '';
      if (/\b(cave|grotto)\b/i.test(ersterSatzEn)) {
        ins.hoehlen.push({ de: null, en: null, txt: z.txt, unterwasser: unterwasser(z.txt, z.en), beleg: sb(g.datei, z.key) }); continue;
      }
      fail(slug + ': Wissenseintrag ohne Titel nicht klassifiziert: ' + g.datei + '|' + g.id + ' ' + z.txt.slice(0, 60));
      continue;
    }

    if (g.datei.startsWith('item')) {
      if (/^Eine Warnung vor dem Piratenschiff/.test(z.txt)) { warnungen.push({ g, z }); continue; }
      if (z.titel && z.txt) { ins.items.push({ de: z.titel.de, en: z.titel.en, txt: z.txt, beleg: sb(g.datei, z.titel.key) + (z.key !== z.titel.key ? '; ' + g.datei + ' ' + z.key : '') }); continue; }
      if (z.titel && !z.txt) { st.items_ohne_text.push(z.titel.de); continue; }
      const [a, b] = teile(z.txt);
      if (!b) { fail(slug + ': Item ohne Namen und mit nur einem Satz, Handpflege nötig: ' + g.id); continue; }
      ins.items.push({ de: ohneArtikel(a), en: ohneArtikel(teile(z.en)[0]), txt: b, beleg: sb(g.datei, z.key) });
      continue;
    }

    if (g.datei.startsWith('quest') && !g.datei.startsWith('questdialog')) {
      if (!z.titel) { fail(slug + ': Questtext ohne Titel, Handpflege nötig: ' + g.datei + '|' + g.id + ' ' + z.txt.slice(0, 60)); continue; }
      const ausschluss = H.quest_ausschluss_en.some(r => new RegExp(r).test(z.titel.en));
      if (ausschluss) { st.quests_ausgeschlossen.push(z.titel.de + ' (' + z.titel.en + ')'); continue; }
      if (ins.quests.some(q => q.de === z.titel.de)) continue; // gleicher Titel unter mehreren Schlüsseln
      const q = { de: z.titel.de, en: z.titel.en }; if (z.txt) q.txt = z.txt; q.beleg = sb(g.datei, z.titel.key) + (z.txt && z.key !== z.titel.key ? '; ' + g.datei + ' ' + z.key : '');
      ins.quests.push(q); continue;
    }

    if (g.datei.startsWith('faction')) { // Entsendungen der Erschließung (Hausbau, Ruinenausgrabung)
      const t = g.texte[0];
      ins.quests.push({ de: spiel(clean(t.de)), en: clean(t.en), beleg: sb(g.datei, t.key) }); continue;
    }
    if (g.datei.startsWith('character')) { fail(slug + ': Figur ohne Handpflege ' + g.id); continue; }
    if (g.datei.startsWith('questdialog')) { fail(slug + ': Dialog ohne Handpflege ' + g.id); continue; }
    fail(slug + ': unbekannte Datei ' + g.datei);
  }

  // --- Piratenschiffe: Steckbrief (Wissen) + Warnung (Item) zusammenfassen
  for (const { g, z } of schiffe) {
    const ps = paras(z.txt), pe = paras(z.en);
    const nameDe = (ps[0] || '').replace(/^Name:\s*/, ''), nameEn = (pe[0] || '').replace(/^Name:\s*/, '');
    const w = warnungen.find(x => x.z.en.includes('"' + nameEn) || x.z.en.includes('“' + nameEn)) || warnungen.find(x => x.z.txt.includes('„' + nameDe + '“'));
    let de = nameDe;
    if (w) { const m = /„([^“]+)“/.exec(w.z.txt); if (m && m[1] !== nameDe) { st.schiffsname_abweichung = (st.schiffsname_abweichung || []).concat(nameDe + ' -> ' + m[1]); de = m[1]; } warnungen.splice(warnungen.indexOf(w), 1); }
    const o = { de, en: nameEn, art: 'schiff', txt: ps.slice(1).join('\n\n'), beleg: sb(g.datei, z.key) + (w ? '; ' + w.g.datei + ' ' + w.z.key : '') };
    spiel(de);
    const oq = (W.DLC_QUESTS || []).find(x => x.name === 'Outlaws of the Ocean');
    if (oq && (oq.steps || []).some(s => s.name === 'Pirate Ship: ' + nameEn)) o.link = { sec: 'dlc-quests', go: 'dlc-q-' + cdSlug(oq.name) };
    ins.tiere.push(o);
  }
  for (const { g, z } of warnungen) fail(slug + ': Piraten-Warnung ohne Steckbrief ' + g.id + ' ' + z.txt.slice(0, 60));

  // --- Wissenseintrag der Insel -> kurz + wissen
  if (ins._inselText) {
    const t = ins._inselText; const flach = paras(t.txt).join(' ');
    const ss = saetze(flach); let k = ss[0] || flach;
    if (ss.length > 1 && (k + ' ' + ss[1]).length <= 240) k = k + ' ' + ss[1];
    ins.kurz = { txt: spiel(k), beleg: sb(t.datei, t.key) };
    if (norm(t.txt) !== norm(k)) ins.wissen.unshift({ titel: I.de, txt: t.txt, beleg: sb(t.datei, t.key) });
    delete ins._inselText;
  }

  // --- Lage aus den Knoten (Regel des Admins)
  {
    let k = I.knoten.filter(x => Array.isArray(x.pos) && x.pos[1] >= 200);
    if (k.length) {
      const med = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
      const mx = med(k.map(x => x.pos[0])), mz = med(k.map(x => x.pos[2]));
      k = k.filter(x => Math.hypot(x.pos[0] - mx, x.pos[2] - mz) <= 3000);
    }
    if (k.length) {
      const x = Math.round(k.reduce((s, q) => s + q.pos[0], 0) / k.length), z = Math.round(k.reduce((s, q) => s + q.pos[2], 0) / k.length);
      const qu = [...new Set(k.map(q => q.quelle))].join(', ');
      ins.lage = { x, z, beleg: 'Spieldaten: Mittel aus ' + k.length + ' Knoten (' + qu + ': ' + k.map(q => q.name).join(', ') + ')' };
    }
  }
  INSELN.push(ins);
}
for (const k of Object.keys(H.paket_klassen)) if (!handGenutzt.has(k)) fail('Handpflege trifft keinen Paket-Eintrag: ' + k);

function cdSlug(s) { // wie cdSlug in index.html (Fold-IDs der DLC-Quests: dlc-q-<slug>)
  const h = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const m = /function cdSlug\(([^)]*)\)\{([^\n]*)\}/.exec(h);
  if (!m) { fail('cdSlug in index.html nicht gefunden'); return String(s); }
  return new Function(m[1], m[2])(s);
}
const insel = slug => INSELN.find(i => i.slug === slug);

// ---------------------------------------------------------------- Handpflege: Bewohner, Tiere, Meer
const paketGruppe = (slug, datei, id) => {
  const I = P.inseln[SLUGS.indexOf(slug)]; const l = (I.texte[datei] || []).filter(t => String(t.id) === String(id));
  return l.length ? l : null;
};
for (const b of H.bewohner_hand) {
  const l = paketGruppe(b.slug, b.datei, b.id);
  if (!l) { fail('bewohner_hand: Schlüssel fehlt ' + b.slug + ' ' + b.datei + ' ' + b.id); continue; }
  const t = l.find(x => clean(x.de).includes(b.wort)); if (!t) { fail('bewohner_hand: „' + b.wort + '“ nicht im Text ' + b.id); continue; }
  insel(b.slug).bewohner.push({ de: b.de, en: b.en, art: b.art, beleg: 'Spieldaten: ' + b.datei + ' ' + t.key });
}
for (const b of H.tiere_hand) {
  const l = paketGruppe(b.slug, b.datei, b.id);
  const t = l && l.find(x => clean(x.de).includes(b.wort)); if (!t) { fail('tiere_hand: „' + b.wort + '“ nicht im Text ' + b.id); continue; }
  if (b.link_pruef && !wikiEintrag(b.link_pruef.konst, b.link_pruef.eintrag)) fail('tiere_hand: Link-Ziel fehlt ' + b.link_pruef.eintrag);
  const o = { de: b.de, en: b.en, art: b.art }; if (b.txt) o.txt = b.txt; o.beleg = 'Spieldaten: ' + b.datei + ' ' + t.key; if (b.link) o.link = b.link;
  insel(b.slug).tiere.push(o);
}
for (const [slug, m] of Object.entries(H.meer_hand)) {
  const r = REGION_ALLE.get(m.region_id); if (!r) { fail('meer_hand: Region fehlt ' + m.region_id); continue; }
  const o = { de: r.de, en: r.en };
  if (m.quelle === 'paket') {
    const l = paketGruppe(slug, m.datei, m.id); const t = l && l.find(x => clean(x.de).includes(m.wort));
    if (!t) { fail('meer_hand: „' + m.wort + '“ nicht gefunden ' + slug); continue; }
    o.beleg = 'Spieldaten: ' + m.datei + ' ' + t.key;
  } else {
    const e = wikiEintrag(m.konst, m.eintrag); const v = e && [].concat(e[1])[m.index];
    const vt = v && (typeof v === 'string' ? v : v.v);
    if (!vt || !vt.includes(m.wort)) { fail('meer_hand: Wiki-Text fehlt ' + slug); continue; }
    o.beleg = wikiBeleg(m.konst, m.eintrag, v.c === 'unb', v.q);
  }
  if (m.hinweis) o.hinweis = m.hinweis;
  insel(slug).meer = o;
}

// ---------------------------------------------------------------- Wiki: DLC_ISLANDS / DLC_ISLAND_FACTS
for (const w of H.wiki_inseln) {
  const ins = insel(w.slug);
  let v, konst, eintrag;
  if (w.fakt) { konst = 'DLC_ISLAND_FACTS'; eintrag = w.fakt; const e = wikiEintrag(konst, w.fakt); v = e && [].concat(e[1])[w.index]; }
  else {
    konst = 'DLC_ISLANDS'; eintrag = ins.en; const e = wikiEintrag(konst, ins.en);
    if (!e) { fail('DLC_ISLANDS: ' + ins.en + ' fehlt'); continue; }
    const [k, i] = w.pfad.split('.'); v = e[k]; if (i != null) v = Array.isArray(v) ? v[Number(i)] : undefined;
  }
  if (v == null) { fail('wiki_inseln: Pfad fehlt ' + w.slug + ' ' + (w.pfad || w.fakt)); continue; }
  const unb = typeof v === 'object' && v.c === 'unb', q = typeof v === 'object' ? v.q : null;
  let txt = typeof v === 'string' ? v : v.v;
  if (typeof txt !== 'string') { fail('wiki_inseln: kein Text ' + w.slug + ' ' + w.pfad); continue; }
  if (w.teil === 'nach_spieltext') { const i = txt.indexOf('Spieltext:'); if (i < 0) { fail('wiki_inseln: kein „Spieltext:“ ' + w.slug); continue; } txt = gross(txt.slice(i + 10).trim()); }
  txt = txt.trim();
  const beleg = wikiBeleg(konst, eintrag, unb, q);
  if (w.ziel === 'kurz') { if (!ins.kurz) ins.kurz = { txt, beleg }; continue; }
  if (w.ziel === 'wissen') { ins.wissen.push({ titel: w.titel, txt, beleg }); continue; }
  if (w.ziel === 'bewohner') {
    const da = ins.bewohner.find(b => b.de === w.de);
    if (da) { da.txt = da.txt ? da.txt + '\n\n' + txt : txt; da.beleg += '; ' + beleg; }
    else ins.bewohner.push({ de: w.de, en: w.en, art: w.art, txt, beleg });
    continue;
  }
  if (w.ziel === 'fundorte') {
    const t2 = w.zusatz ? txt + ' ' + w.zusatz : txt;
    ins.fundorte.push({ item: w.item, de: w.de, txt: t2, beleg: beleg + (w.fremd ? '; ' + fremdBeleg(w.fremd, false) : ''), link: null });
    continue;
  }
  fail('wiki_inseln: unbekanntes Ziel ' + w.ziel);
}

// ---------------------------------------------------------------- Wiki-Bezüge (Fundorte, Tiere, Quests)
for (const b of H.wiki_bezuege) {
  const ins = insel(b.slug); if (!ins) { fail('wiki_bezuege: Slug ' + b.slug); continue; }
  const e = wikiEintrag(b.konst, b.eintrag);
  if (!e) { fail('wiki_bezuege: ' + b.konst + ' ' + b.eintrag + ' fehlt in data/*.js'); continue; }
  const wt = wikiText(e);
  for (const t of b.belegtext) if (!wt.includes(norm(t))) fail('wiki_bezuege: Text nicht (mehr) im Wiki: ' + b.konst + ' ' + b.eintrag + ': ' + t.slice(0, 70));
  for (const t of b.belegtext) if (!b.txt.includes(t) && !b.txt.includes(t.replace(/\.$/, ''))) {
    if (!(b.konst === 'DLC_QUESTS' && /^Fraktionsquest/.test(t))) fail('wiki_bezuege: Belegtext fehlt in txt ' + b.eintrag);
  }
  if (b.link && !SEC_IDS.has(b.link.sec)) fail('wiki_bezuege: sec unbekannt ' + b.link.sec);
  const beleg = wikiBeleg(b.konst, b.eintrag, b.unb, b.q);
  if (b.ziel === 'fundorte') ins.fundorte.push({ item: b.en, de: b.de, txt: b.txt.replace(/^Rezept Rezept: /, 'Rezept: '), beleg, link: b.link || null });
  else if (b.ziel === 'tiere') {
    const da = ins.tiere.find(t => t.de === b.de || t.en === b.en);
    if (da) { da.txt = da.txt ? da.txt + '\n\n' + b.txt : b.txt; da.beleg += '; ' + beleg; if (b.link) da.link = b.link; if (!da.en) da.en = b.en; }
    else { const o = { de: b.de, en: b.en, art: b.art, txt: b.txt, beleg }; if (b.link) o.link = b.link; ins.tiere.push(o); }
  } else if (b.ziel === 'quests') {
    const o = { de: b.de, en: b.en, txt: b.txt, beleg }; if (b.link) o.link = b.link; ins.quests.push(o);
  } else fail('wiki_bezuege: Ziel ' + b.ziel);
}

// ---------------------------------------------------------------- Fremdquellen
for (const f of H.fremd) {
  const ins = insel(f.slug); const beleg = fremdBeleg(f.quellen, f.einzel);
  if (!f.quellen.every(q => /^https:\/\//.test(q.url) && q.zitat)) fail('fremd: URL oder Zitat fehlt ' + f.slug);
  if (f.ziel === 'orte') ins.orte.push({ de: f.de, en: f.en, art: f.art, txt: f.txt, beleg });
  else if (f.ziel === 'fundorte') ins.fundorte.push({ item: f.item, de: f.de, txt: f.txt, beleg, link: null });
  else if (f.ziel === 'wissen') ins.wissen.push({ titel: f.titel, txt: f.txt, beleg });
  else fail('fremd: Ziel ' + f.ziel);
}

// ---------------------------------------------------------------- Quellenliste je Insel
for (const ins of INSELN) {
  const alle = [];
  const add = o => { if (o && o.beleg) alle.push(o.beleg); };
  ['meer', 'lage', 'kurz'].forEach(k => add(ins[k]));
  ['orte', 'hoehlen', 'bewohner', 'quests', 'wissen', 'fundorte', 'tiere', 'items'].forEach(k => ins[k].forEach(add));
  const dateien = new Set(), konst = new Set(), fremd = new Set();
  for (const b of alle) for (const teil of b.split('; ')) {
    let m;
    if ((m = /^(?:Spieldaten: |Titel: |Name: )?([a-z_]+(?:\.dlc_01)?(?:\.paloc)?) (?:region_id )?\d/.exec(teil))) dateien.add(m[1]);
    if (/^Spieldaten: Mittel aus/.test(teil)) dateien.add('factionnode.dlc_01');
    if ((m = /(?:^|: )Wiki: ([A-Z_]+) /.exec(teil))) konst.add(m[1]);
    if ((m = /^(Game8|KeenGamer|th\.gl|Fextralife|PowerPyx|Mobalytics) (https:\/\/\S+) \(geprüft ([0-9.]+)\)/.exec(teil))) fremd.add(m[1] + ' ' + m[2] + ' (geprüft ' + m[3] + ')');
  }
  ins.quellen.push('Spieldaten: ' + PAKET_TXT + ', region_id ' + ins.region_id + (dateien.size ? '; Dateien: ' + [...dateien].join(', ') : ''));
  if (konst.size) ins.quellen.push('Wiki: ' + [...konst].join(', '));
  for (const f of fremd) ins.quellen.push(f);
}

// ---------------------------------------------------------------- Ohne Insel
const OHNE = { hoehlen: [], meere: [], sonst: [] };
for (const r of P.dlc_regionen_alle) {
  if (zugeordneteRegionen.has(r.region_id)) continue;
  if (r.region_id >= 33200 && r.region_id < 33300) OHNE.hoehlen.push({ de: r.de, en: r.en, beleg: 'Spieldaten: ' + r.datei + ' region_id ' + r.region_id });
}
for (const id of H.meere_ids) {
  const r = REGION_ALLE.get(id); if (!r) { fail('meere_ids: ' + id + ' fehlt'); continue; }
  const o = { de: r.de, en: r.en, beleg: 'Spieldaten: ' + r.datei + ' region_id ' + id };
  if (H.meer_hinweise[String(id)]) o.hinweis = H.meer_hinweise[String(id)];
  OHNE.meere.push(o);
}
for (const ids0 of H.sonst_ids) {
  const ids = ids0.filter(id => !zugeordneteRegionen.has(id)); if (!ids.length) continue;
  const rs = ids.map(id => REGION_ALLE.get(id)); if (rs.some(r => !r)) { fail('sonst_ids: ' + ids.join(',') + ' fehlt'); continue; }
  if (rs.some(r => r.de !== rs[0].de)) fail('sonst_ids: Gruppe mit verschiedenen Namen ' + ids.join(','));
  OHNE.sonst.push({ de: rs[0].de, en: rs[0].en, beleg: 'Spieldaten: ' + rs[0].datei + ' region_id ' + (ids.length > 1 ? ids[0] + ' bis ' + ids[ids.length - 1] + ' (' + ids.length + ' Einträge)' : ids[0]) });
}

stop();

// ---------------------------------------------------------------- Selbstprüfungen
function pruefe(INS, OI) {
  const f = [];
  if (!Array.isArray(INS) || INS.length !== 19) f.push('nicht 19 Inseln');
  INS.forEach((i, n) => { if (i.slug !== SLUGS[n]) f.push('Slug ' + n + ': ' + i.slug); });
  const alles = JSON.stringify([INS, OI]);
  if (/rosenui/i.test(alles)) f.push('„Rosenui“ kommt vor');
  const spielGes = SPIEL.join('\u0000');
  function strings(o, pfad, cb) {
    if (typeof o === 'string') cb(o, pfad);
    else if (Array.isArray(o)) o.forEach((x, i) => strings(x, pfad + '[' + i + ']', cb));
    else if (o && typeof o === 'object') for (const k of Object.keys(o)) strings(o[k], pfad + '.' + k, cb);
  }
  strings([INS, OI], '', (s, p) => {
    if (s === '' || !s.trim()) f.push('leerer String ' + p);
    if (/<br/i.test(s) || /<[a-z\/][^>]*>/i.test(s)) f.push('HTML ' + p);
    if (/[{}]|%s|%d/.test(s)) f.push('Platzhalter ' + p + ': ' + s.slice(0, 50));
    if (/[\u2028\u2029]/.test(s)) f.push('Zeilentrenner U+2028/2029 ' + p);
    if (DASH.test(s) && !/\.beleg$|\.quellen\[/.test(p)) {
      for (const a of paras(s)) if (DASH.test(a) && !spielGes.includes(a)) f.push('Gedankenstrich in eigenem Text ' + p + ': ' + a.slice(0, 60));
    }
  });
  const pflicht = {
    orte: ['de', 'en', 'art', 'beleg'], hoehlen: ['txt', 'beleg'], bewohner: ['de', 'art', 'beleg'], quests: ['de', 'en', 'beleg'],
    wissen: ['titel', 'txt', 'beleg'], fundorte: ['item', 'de', 'txt', 'beleg'], tiere: ['de', 'art', 'beleg'], items: ['de', 'en', 'txt', 'beleg'] };
  for (const i of INS) {
    for (const k of ['slug', 'en', 'de']) if (typeof i[k] !== 'string') f.push(i.slug + ': ' + k);
    if (typeof i.region_id !== 'number') f.push(i.slug + ': region_id');
    for (const k of ['meer', 'lage', 'kurz']) if (i[k] !== null && !(i[k] && typeof i[k].beleg === 'string' && i[k].beleg)) f.push(i.slug + ': ' + k + ' ohne beleg');
    if (i.meer && !(i.meer.de && i.meer.en)) f.push(i.slug + ': meer unvollständig');
    if (i.lage && !(Number.isFinite(i.lage.x) && Number.isFinite(i.lage.z))) f.push(i.slug + ': lage keine Zahl');
    if (i.kurz && !i.kurz.txt) f.push(i.slug + ': kurz ohne txt');
    for (const [k, felder] of Object.entries(pflicht)) {
      if (!Array.isArray(i[k])) { f.push(i.slug + ': ' + k + ' fehlt'); continue; }
      i[k].forEach((o, n) => {
        for (const fe of felder) if (typeof o[fe] !== 'string' || !o[fe]) f.push(i.slug + '.' + k + '[' + n + ']: ' + fe + ' fehlt');
        if (k === 'orte' && !ORT_ARTEN.includes(o.art)) f.push(i.slug + '.orte: art ' + o.art);
        if (k === 'bewohner' && !BEW_ARTEN.includes(o.art)) f.push(i.slug + '.bewohner: art ' + o.art);
        if (k === 'tiere' && !TIER_ARTEN.includes(o.art)) f.push(i.slug + '.tiere: art ' + o.art);
        if (k === 'hoehlen') { if (typeof o.unterwasser !== 'boolean') f.push(i.slug + '.hoehlen: unterwasser'); if (!('de' in o) || !('en' in o)) f.push(i.slug + '.hoehlen: de/en'); }
        if ('link' in o && o.link !== null) { if (!o.link || !SEC_IDS.has(o.link.sec) || typeof o.link.go !== 'string' || !o.link.go) f.push(i.slug + '.' + k + ': link ' + JSON.stringify(o.link)); }
        if (k === 'fundorte' && !('link' in o)) f.push(i.slug + '.fundorte: link-Feld fehlt');
      });
    }
    if (!Array.isArray(i.quellen) || !i.quellen.length || !/^Spieldaten/.test(i.quellen[0])) f.push(i.slug + ': quellen');
    // doppelte Texte je Insel
    const gesehen = new Map();
    const txts = [];
    // Fundorte verschiedener Items dürfen denselben Fundort-Text haben (z. B. gleicher Händler, gleicher Preis): dort zählt Item + Text.
    for (const k of Object.keys(pflicht)) i[k].forEach((o, n) => { if (o.txt) txts.push([k === 'fundorte' ? o.item + '\u0001' + o.txt : o.txt, k + '[' + n + ']']); });
    for (const [t, wo] of txts) { const key = norm(t); if (gesehen.has(key)) f.push(i.slug + ': doppelter Text ' + gesehen.get(key) + ' / ' + wo); else gesehen.set(key, wo); }
    if (i.kurz && txts.some(([t]) => norm(t) === norm(i.kurz.txt))) f.push(i.slug + ': kurz doppelt');
    // doppelte Namen je Liste
    for (const k of ['orte', 'bewohner', 'quests', 'tiere', 'items']) {
      const ns = i[k].map(o => o.de); const d = ns.filter((x, j) => ns.indexOf(x) !== j);
      if (d.length && k !== 'orte') f.push(i.slug + '.' + k + ': doppelte Namen ' + [...new Set(d)].join(', '));
      if (d.length && k === 'orte' && d.some(x => x !== 'Abyss-Nexus')) f.push(i.slug + '.orte: doppelte Namen ' + d.join(', '));
    }
    const fn = i.fundorte.map(o => o.item); const fd = fn.filter((x, j) => fn.indexOf(x) !== j); if (fd.length) f.push(i.slug + '.fundorte: doppelt ' + fd.join(', '));
  }
  for (const k of ['hoehlen', 'meere', 'sonst']) {
    if (!Array.isArray(OI[k])) { f.push('OHNE.' + k); continue; }
    OI[k].forEach((o, n) => { for (const fe of ['de', 'en', 'beleg']) if (typeof o[fe] !== 'string' || !o[fe]) f.push('OHNE.' + k + '[' + n + ']: ' + fe); });
  }
  return f;
}
fehler.push(...pruefe(INSELN, OHNE));
stop();

// ---------------------------------------------------------------- Schreiben
const heute = new Date(); const dd = String(heute.getDate()).padStart(2, '0'), mm = String(heute.getMonth() + 1).padStart(2, '0');
const META = { stand: 'Spieldateien Patch 2.04.03 + DLC dlc_01, ausgelesen 08.11.2026; Wiki-Daten und Fremdquellen geprüft ' + GEPRUEFT,
  erzeugt: dd + '.' + mm + '.' + heute.getFullYear(), paket: PAKET_TXT };
const kopf = [
  '// d15-inseln.js: Daten der App-Seite „Inseln“ (#sec=inseln, Deep-Link #sec=inseln&insel=<slug>).',
  '// ERZEUGT von scripts/gen-inseln.mjs, nicht von Hand editieren. Handpflege in scripts/inseln-hand.json, dann neu erzeugen:',
  '//   node scripts/gen-inseln.mjs --paket ~/cdwiki-nacht/auftraege/inseln-paket/inseln.json',
  '// Herkunft: Spieldaten-Paket ' + PAKET_TXT + ', Wiki-Daten aus data/*.js, wenige Fremdquellen mit URL und Prüfdatum.',
  '// Felder: INSELN_META {stand, erzeugt, paket}; INSELN (19 Inseln, Paket-Reihenfolge) je {slug, en, de, region_id, meer, lage,',
  '//   kurz, orte, hoehlen, bewohner, quests, wissen, fundorte, tiere, items, quellen}; INSELN_OHNE_INSEL {hoehlen, meere, sonst}.',
  '//   Jedes Objekt hat „beleg“ (Spieldaten / Wiki / Fremdquelle); endet er auf „unbestätigt“, ist die Angabe unsicher.',
  '//   lage = Mittel der Knoten-Weltpositionen (x, z) ohne Knoten mit y < 200 und ohne Ausreißer > 3000 vom Median.',
  '//   Texte ohne HTML, Absätze durch Leerzeile getrennt. Keine Kommentare innerhalb der Literale (gen-seo liest sie per extract).'
].join('\n');
const lit = v => JSON.stringify(v);
const body = kopf + '\n'
  + 'const INSELN_META = ' + lit(META) + ';\n'
  + 'const INSELN = [\n' + INSELN.map(lit).join(',\n') + '\n];\n'
  + 'const INSELN_OHNE_INSEL = ' + lit(OHNE) + ';\n';

// Datei im frischen vm-Kontext laden und erneut prüfen
{
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(body + '\nthis.__M=INSELN_META;this.__I=INSELN;this.__O=INSELN_OHNE_INSEL;', ctx, { filename: 'd15-inseln.js' });
  const f2 = pruefe(ctx.__I, ctx.__O);
  if (!ctx.__M || !ctx.__M.stand || !/^\d\d\.\d\d\.\d{4}$/.test(ctx.__M.erzeugt) || !ctx.__M.paket) f2.push('INSELN_META unvollständig');
  if (JSON.stringify(ctx.__I) !== JSON.stringify(INSELN)) f2.push('Neu geladene Daten weichen ab');
  if (f2.length) { fehler.push(...f2.map(x => 'nach dem Laden: ' + x)); stop(); }
}

// Kennzahlen
const WORT_FELDER = ['de', 'titel', 'txt', 'hinweis'];
function wortzahl(i) {
  let n = 0; const z = s => { if (typeof s === 'string') n += (s.match(/\S+/g) || []).length; };
  z(i.de); if (i.kurz) z(i.kurz.txt); if (i.meer) { z(i.meer.de); z(i.meer.hinweis); }
  for (const k of ['orte', 'hoehlen', 'bewohner', 'quests', 'wissen', 'fundorte', 'tiere', 'items']) for (const o of i[k]) for (const fe of WORT_FELDER) z(o[fe]);
  return n;
}
const zahlen = INSELN.map(i => ({ slug: i.slug, de: i.de, orte: i.orte.length, hoehlen: i.hoehlen.length, quests: i.quests.length, wissen: i.wissen.length,
  bewohner: i.bewohner.length, fundorte: i.fundorte.length, tiere: i.tiere.length, items: i.items.length, woerter: wortzahl(i),
  lage: !!i.lage, meer: i.meer ? i.meer.de : null, kurz: !!i.kurz,
  unsicher: ['orte', 'hoehlen', 'bewohner', 'quests', 'wissen', 'fundorte', 'tiere', 'items'].reduce((s, k) => s + i[k].filter(o => /unbestätigt$/.test(o.beleg)).length, 0),
  ausgeschlossen: statistik[i.slug] }));
if (arg('zahlen', '')) fs.writeFileSync(arg('zahlen'), JSON.stringify({ inseln: zahlen, ohne_insel: { hoehlen: OHNE.hoehlen.length, meere: OHNE.meere.length, sonst: OHNE.sonst.length } }, null, 1));

if (flag('pruefen')) { console.log('gen-inseln: Prüfung ok (nichts geschrieben)'); }
else { fs.writeFileSync(OUT, body); console.log('gen-inseln: ' + path.relative(ROOT, OUT) + ' geschrieben (' + Buffer.byteLength(body) + ' Byte)'); }
console.log('Insel'.padEnd(22) + 'Orte Höhl Bew Quest Wiss Fund Tier Item Wörter Lage Meer');
for (const z of zahlen) console.log(z.de.padEnd(22) + [z.orte, z.hoehlen, z.bewohner, z.quests, z.wissen, z.fundorte, z.tiere, z.items].map(x => String(x).padStart(4)).join(' ')
  + String(z.woerter).padStart(7) + (z.lage ? '   ja' : ' nein') + ' ' + (z.meer || '-'));
console.log('Ohne Insel: Höhlen ' + OHNE.hoehlen.length + ', Meere ' + OHNE.meere.length + ', Sonstiges ' + OHNE.sonst.length);

#!/usr/bin/env node
// Erzeugt data/d14-beschaffung.js (ORTE, BESCHAFFUNG) aus den Wiki-Tabellen, den questlog-Rohdaten und dem th.gl-Index.
// Aufruf: node scripts/gen-beschaffung.mjs --roh <ordner>   (<ordner> enthält items.jsonl, missions*.jsonl, quests*.jsonl, npcs.jsonl,
// dispatch.jsonl, thgl/knoten.json und die Grundkarten-Datei orte.csv unter --grund). Handrecherche: scripts/beschaffung-hand.json.
// Regel: Kein Weg, kein Ort, kein Kapitel ohne Beleg. Kapitel nur über eine benannte Kette (Feld beleg). Was fehlt, heißt „nicht erfasst“.
import fs from "node:fs"; import path from "node:path"; import vm from "node:vm"; import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const ROH = arg("--roh", path.join(process.env.HOME, "cdwiki-nacht/runs/2026-11-06-fundort-karten/roh"));
const GRUND = arg("--grund", path.join(process.env.HOME, "cdwiki-nacht/auftraege/fundort-karten/grundkarte"));
const DATUM = "06.11.2026", GEPRUEFT = ` (geprüft ${DATUM})`;
const THGL = "https://crimsondesert.th.gl/maps/Continent%20of%20Pywel";
// ── Wiki-Daten ──
const ctx = { console, window: {}, document: { addEventListener() {}, getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; }, createElement() { return {}; } }, localStorage: { getItem() { return null; }, setItem() {} }, navigator: {}, location: {} };
ctx.self = ctx; vm.createContext(ctx);
for (const f of fs.readdirSync(path.join(ROOT, "data")).filter((f) => /^d(0\d|1[0-3]).*\.js$/.test(f)).sort()) vm.runInContext(fs.readFileSync(path.join(ROOT, "data", f), "utf8"), ctx, { filename: f });
const g = (n) => vm.runInContext(n, ctx);
const [WEAPONS, ARMOR, ACCESSORIES, DLCX, FUNDORTE, BOSSES, NPCS, MQ, SQ, FD, deT, deE, DE_NAMES] = ["WEAPONS", "ARMOR", "ACCESSORIES", "DLC_GEAR_EXTRA", "FUNDORTE", "BOSSES", "NPCS", "MAIN_QUESTS", "SIDE_QUESTS", "FAC_DATA", "deT", "deE", "DE_NAMES"].map(g);
const HAND = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/beschaffung-hand.json"), "utf8"));
const jsonl = (f) => { const p = path.join(ROH, f); if (!fs.existsSync(p)) return new Map(); const m = new Map(); for (const l of fs.readFileSync(p, "utf8").split("\n")) { if (!l) continue; try { const r = JSON.parse(l); if (r.daten) m.set(String(r.id), r.daten); } catch {} } return m; };
const ITEMS = jsonl("items.jsonl"), MISS = jsonl("missions.jsonl"), MISS_DE = jsonl("missions-de.jsonl"), QUE = jsonl("quests.jsonl"), QUE_DE = jsonl("quests-de.jsonl"), DISP = jsonl("dispatch.jsonl"), DISP_DE = jsonl("dispatch-de.jsonl");
const NPC = jsonl("npcs.jsonl"); for (const [k, v] of jsonl("npcs-rest.jsonl")) if (!NPC.has(k)) NPC.set(k, v);
const KN = JSON.parse(fs.readFileSync(path.join(ROH, "thgl/knoten.json"), "utf8"));
const ZIEL = new Map(JSON.parse(fs.readFileSync(path.join(ROH, "ziel.json"), "utf8")).map((o) => [o.name, o.ids]));
const norm = (s) => String(s || "").toLowerCase().replace(/[’‘]/g, "'");
// ── Grundkarte: benannte Orte ──
const csvZeile = (l) => { const o = []; let c = "", q = false; for (const ch of l) { if (ch === '"') q = !q; else if (ch === "," && !q) { o.push(c); c = ""; } else c += ch; } o.push(c); return o; };
const PLAETZE = fs.readFileSync(path.join(GRUND, "orte.csv"), "utf8").replace(/^﻿/, "").split(/\r?\n/).slice(1).filter(Boolean).map(csvZeile).map(([knoten, en, de, x, , z, px, py]) => ({ knoten, en, de, x: +x, z: +z, px: +px, py: +py })).filter((p) => p.de);
// Zusätzliche benannte Orte: Ortsangaben der th.gl-Questknoten (Mitte aller Knoten, nur wenn sie eng beieinander liegen).
{ const m = new Map(); for (const e of KN) { if (!e.ext || !e.desc || /^(Objectives|Unlocks|Location)\b/.test(e.desc) || e.desc.length > 40 || e.desc.includes("|") || e.desc.includes(":")) continue; const k = norm(e.desc); (m.get(k) || m.set(k, []).get(k)).push(e); }
  const roh = PLAETZE.slice(); const nah = (x, z) => { let b = null, bd = 1e18; for (const p of roh) { const d = (p.x - x) ** 2 + (p.z - z) ** 2; if (d < bd) { bd = d; b = p; } } return b; };
  const mitte = (a) => { const v = a.slice().sort((p, q) => p - q); return v[v.length >> 1]; };
  for (const L of m.values()) { const x = mitte(L.map((e) => e.x)), z = mitte(L.map((e) => e.z)); if (L.some((e) => Math.hypot(e.x - x, e.z - z) > 700)) continue; const n = nah(x, z); PLAETZE.push({ knoten: n ? n.knoten : "thgl", en: L[0].desc, de: L[0].desc_de || L[0].desc, x, z, thgl: true }); } }
for (const a of DISP.values()) { const l = a.dispatchMissionLocation; if (l && a.locationName) PLAETZE.push({ knoten: "questlog", en: a.locationName, de: DE_NAMES[a.locationName] || a.locationName, x: l.x, z: l.z, thgl: false, ql: true }); }
const REG = { Her: "Hernand", Hernand: "Hernand", Kwe: "Pailune", Pailune: "Pailune", Dem: "Demeniss", Cal: "Calphade", Crim: "Crimson Desert", Crimson: "Crimson Desert", Del: "Delesyia", Abyss: "The Abyss", Abyssone: "The Abyss" };
const regionVon = (kn) => REG[(String(kn).match(/^Node_([A-Za-z]+)_/) || [])[1]] || "";
const ROHZEILEN = fs.readFileSync(path.join(GRUND, "orte.csv"), "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).slice(1).filter(Boolean).map(csvZeile);
const LAGER = (() => { const r = ROHZEILEN.find((z) => z[0] === "Node_Her_GreymaneCamp"); return { knoten: r[0], en: "Greymane Camp", de: DE_NAMES["Greymane Camp"] || "Graumähnen-Camp", x: +r[3], z: +r[5] }; })();
const naechster = (x, z) => { let b = null, bd = 1e18; for (const p of PLAETZE) { const d = (p.x - x) ** 2 + (p.z - z) ** 2; if (d < bd) { bd = d; b = p; } } return { p: b, d: Math.sqrt(bd) }; };
const GEO = JSON.parse(fs.readFileSync(path.join(GRUND, "georef.json"), "utf8"));
const aufKarte = (x, z) => { const px = x / GEO.su + GEO.ox, py = -z / GEO.su + GEO.oy; return px >= 0 && py >= 0 && px < 8192 && py < 8192; };
// Ortsnamen für die Textsuche: lange Namen zuerst, Regionsnamen getrennt.
const REGIONEN = { hernand: "Hernand", pailune: "Pailune", kweiden: "Pailune", demeniss: "Demeniss", delesyia: "Delesyia", "crimson desert": "Crimson Desert", tashkalp: "Crimson Desert", "the abyss": "The Abyss", abyss: "The Abyss", calphade: "Calphade" };
const PN = []; const pnSeen = new Set();
for (const p of PLAETZE) for (const n of [p.en, p.de]) { const k = norm(n); if (k.length >= 5 && !REGIONEN[k] && !pnSeen.has(k)) { pnSeen.add(k); PN.push({ k, p }); } }
PN.sort((a, b) => b.k.length - a.k.length);
const wort = (t, k) => { const i = t.indexOf(k); if (i < 0) return false; const a = t[i - 1], b = t[i + k.length]; return !(a && /[a-zäöüß]/.test(a)) && !(b && /[a-zäöüß]/.test(b)); };
const findePlatz = (text) => { const t = norm(text); for (const e of PN) if (wort(t, e.k)) return e.p; return null; };
const findeRegion = (text) => { const t = norm(text); for (const k of Object.keys(REGIONEN).sort((a, b) => b.length - a.length)) if (wort(t, k)) return REGIONEN[k]; return null; };
// ── Orte ──
const ORTE = { ...HAND.orte }, SPEC = {};
const slug = (s) => norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 44);
function regText(x, z) { const n = naechster(x, z); return n.p ? regionVon(n.p.knoten) : ""; }
function ortKoord(pre, x, z, name, en, beleg, q) {
  const id = `${pre}-${slug(en || name)}-${Math.round(Math.abs(x))}-${Math.round(Math.abs(z))}`.replace(/--+/g, "-");
  if (!ORTE[id]) {
    const auf = aufKarte(x, z);
    ORTE[id] = { name, en: en || undefined, reg: regText(x, z) || undefined, img: auf ? `o-${id}.webp` : undefined, q: q || "Spielkarte, Position laut th.gl", qUrl: THGL, marker: "genau", beleg };
    if (auf) SPEC[id] = { art: "welt", x, z, titel: name };
  }
  return id;
}
function ortPlatz(p, beleg) {
  const id = `p-${slug(p.en || p.de)}`;
  if (!ORTE[id]) {
    const auf = aufKarte(p.x, p.z) && regionVon(p.knoten) !== "The Abyss";
    ORTE[id] = { name: p.de, en: p.en || undefined, reg: regionVon(p.knoten) || undefined, img: auf ? `o-${id}.webp` : undefined, q: p.thgl ? "Spielkarte, Ortsname laut th.gl" : "Spielkarte, Ortsname aus den Spieldaten", qUrl: p.thgl ? THGL : null, marker: "ort", beleg: beleg || `Grundkarte orte.csv, Knoten ${p.knoten}` };
    if (auf) SPEC[id] = { art: "ort", x: p.x, z: p.z, titel: p.de };
  }
  return id;
}
const RZ = {}; { const su = {}; for (const r of fs.readFileSync(path.join(GRUND, "orte.csv"), "utf8").split(/\r?\n/).slice(1).filter(Boolean).map(csvZeile)) { const n = regionVon(r[0]); if (!n) continue; (su[n] ||= []).push([+r[3], +r[5]]); } for (const [n, l] of Object.entries(su)) RZ[n] = [l.reduce((a, b) => a + b[0], 0) / l.length, l.reduce((a, b) => a + b[1], 0) / l.length]; }
function ortRegion(r, beleg) {
  const id = `r-${slug(r)}`;
  if (!ORTE[id]) {
    const name = deT(r), auf = r !== "The Abyss" && RZ[r];
    ORTE[id] = { name, en: r, reg: name, img: auf ? `o-${id}.webp` : undefined, q: "Spielkarte, Regionsmitte aus den Spieldaten", qUrl: null, marker: "region", beleg: beleg || "Region laut Wiki oder Spieltext" };
    if (auf) SPEC[id] = { art: "region", x: RZ[r][0], z: RZ[r][1], titel: `${name} (ungefähre Region)` };
  }
  return id;
}
// ── th.gl-Indizes ──
const kl = (s) => norm(s);
const HI = new Map(), SHOPS = [], MANUAL = new Map(), MNODE = new Map();
const parseShop = (e) => { const seg = e.desc.split(" | "); const it = new Map(); let cond = null; for (const s of seg) { const m = s.match(/^• (.+?) — ([\d,]+) ([^·]+?)(?: · (.+))?$/); if (m) it.set(kl(m[1]), { preis: m[2], waehrung: m[3], bed: m[4] || null }); else if (/^Available/.test(s)) cond = s; } const titel = seg[0] && !/^Sells/.test(seg[0]) ? seg[0] : ""; const deSeg = (e.desc_de || "").split(" | "); return { ...e, items: it, cond, titel, titelDe: deSeg[0] && !/^Verkauft/i.test(deSeg[0]) && !deSeg[0].startsWith("•") ? deSeg[0] : titel }; };
for (const e of KN) {
  if (e.typ.startsWith("hi_") && e.name) { const k = kl(e.name); (HI.get(k) || HI.set(k, []).get(k)).push(e); }
  else if (e.desc && /Sells \(/.test(e.desc)) SHOPS.push(parseShop(e));
  else if (e.typ.startsWith("manual_") && e.name) { const k = kl(e.name); (MANUAL.get(k) || MANUAL.set(k, []).get(k)).push(e); }
  if (e.ext && e.name) { const k = kl(e.name); (MNODE.get(k) || MNODE.set(k, []).get(k)).push(e); }
}
const SHOPITEM = new Map(); for (const s of SHOPS) for (const k of s.items.keys()) (SHOPITEM.get(k) || SHOPITEM.set(k, []).get(k)).push(s);
const npcInfo = new Map(); for (const d of NPC.values()) npcInfo.set(d.id, d);
// NPC → Laden: erst über Namen, dann über Sortiment (Überschneidung ≥ 60 % der kleineren Liste, mindestens 3 Teile).
const TOWN = /\b(?:merchant|vendor|tailor|saddler|jeweler|assessor|keeper|trader|dealer|smith|blacksmith|provisioner|owner|manager|butcher|grocer|barber|innkeeper|carpenter|dyer|alchemist|collector|clerk|master|artisan|supplier|seller)\s+(?:of|in|at)\s+(?:the\s+)?((?:St\.\s+)?[A-Z][\w'’]+(?:\s+[A-Z][\w'’]+)*)/;
const BERUFE = [[/equipment vendor/i, /equipment/i], [/\btailor\b/i, /tailor|cloth|outfit/i], [/\bbarber\b/i, /barber/i], [/back-alley/i, /alley|smuggl|black ?market/i], [/\bsaddler\b/i, /saddl/i], [/\bjeweler\b/i, /jewel/i], [/provision/i, /provision/i], [/assessor/i, /contribution|assessor/i]];
function beruf(npcId) { const d = npcInfo.get(npcId); if (!d || !d.description) return null; for (const [a, b] of BERUFE) if (a.test(d.description.slice(0, 80))) return b; return null; }
function stadtVon(npcId) { const d = npcInfo.get(npcId); if (!d || !d.description) return null; const m = d.description.match(TOWN); return m ? m[1] : null; }
// NPC → Laden: erst über den Namen, dann Stadt aus dem Spieltext plus Sortiment, zuletzt allein über das Sortiment (ab 90 %, nur eindeutig).
function ladenVon(npcId, npcName) {
  const direkt = SHOPS.filter((s) => (s.name && kl(s.name) === kl(npcName)) || (s.titel && new RegExp(`\\(${npcName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)$`).test(s.titel)));
  if (direkt.length) return { laeden: direkt, weg: "Name" };
  const d = npcInfo.get(npcId); const L = ((d && d.npcSellsItems) || []).map((x) => kl(x.name)); if (L.length < 3) return { laeden: [], weg: "" };
  const S = new Set(L); const stadt = stadtVon(npcId);
  const wert = (s) => { let h = 0; for (const k of s.items.keys()) if (S.has(k)) h++; return { h, q: h / Math.min(S.size, s.items.size || 1) }; };
  const job = beruf(npcId);
  if (stadt && job) { const K = SHOPS.filter((s) => norm(s.titel).includes(norm(stadt)) && job.test(s.titel)); let b = null, bq = 0; for (const s of K) { const w = wert(s); if (w.h >= 3 && w.q >= 0.3 && w.q > bq) { bq = w.q; b = s; } } if (b) return { laeden: [b], weg: `Spieltext „${stadt}“, Beruf und Sortiment ${Math.round(bq * 100)} %` }; }
  const hoch = SHOPS.filter((s) => !s.name).map((s) => ({ s, ...wert(s) })).filter((x) => x.h >= 3 && x.q >= 0.9).sort((a, b) => b.q - a.q);
  if (hoch.length === 1) return { laeden: [hoch[0].s], weg: `Sortiment ${Math.round(hoch[0].q * 100)} %` };
  return { laeden: [], weg: "" };
}
const NPC_WIKI = new Map(); for (const L of Object.values(NPCS)) for (const n of L) NPC_WIKI.set(kl(n.name), n);
for (const w of g("WITCHES")) { const k = kl(w.name.replace(/^Hexe\s+/, "")); NPC_WIKI.set(k, { name: w.name, region: w.location, bio: "", kapText: w.chapter }); }
// ── Kapitel-Ketten ──
const K_HAUPT = new Map(); for (const m of MQ) { const c = m.ch; for (const q of m.quests) K_HAUPT.set(kl(q.q), { ch: c, name: m.name, q: q.q, miss: q.miss, reward: q.reward }); }
const K_NEBEN = new Map(); const kap = (t) => { const m = String(t || "").match(/Kapitel\s+(\d+)|Kap\.\s*(\d+)/); return m ? +(m[1] || m[2]) : null; };
for (const s of SQ) K_NEBEN.set(kl(s.q), { kap: kap(s.prereq) ?? kap(s.trigger), quelle: "Nebenquests", q: s.q, miss: s.miss, prereq: s.prereq, trigger: s.trigger });
for (const r of FD.regions) for (const f of r.factions) for (const q of f.quests || []) if (!K_NEBEN.has(kl(q.q))) K_NEBEN.set(kl(q.q), { kap: kap(q.prereq) ?? kap(q.trigger), quelle: `Fraktion ${f.name}`, q: q.q, miss: q.miss, prereq: q.prereq, trigger: q.trigger });
const zahlKap = (ch) => (typeof ch === "number" ? ch : /^\d+$/.test(String(ch)) ? +ch : null);
function kapitelVonQuest(namen) { // namen: Quest- und Missionsnamen, die zur selben Kette gehören
  for (const n of namen) { const h = K_HAUPT.get(kl(n)); if (h) return { kapitel: zahlKap(h.ch), txt: zahlKap(h.ch) == null ? String(h.ch) : "", beleg: `Hauptquest „${h.q}“ steht im Wiki in Kapitel ${h.ch} (${h.name})`, miss: h.miss }; }
  for (const n of namen) { const s = K_NEBEN.get(kl(n)); if (s && s.kap != null) return { kapitel: s.kap, txt: "", beleg: `Quest „${s.q}“: Wiki (${s.quelle}) nennt als Voraussetzung Kapitel ${s.kap}`, miss: s.miss }; }
  for (const n of namen) { const s = K_NEBEN.get(kl(n)); if (s) return { kapitel: null, txt: "", beleg: "", miss: s.miss, voraus: s.prereq, q: s.q }; }
  return null;
}
function missionsNamen(mis) { // Quest + ganze Kette
  const n = []; for (const q of mis.getMissionIsPartOfQuests || []) { n.push(q.name); const Q = QUE.get(String(q.id)); if (Q) for (const c of Q.fullQuestChain || []) n.push(c.name); }
  n.push(mis.name); for (const c of mis.fullMissionChain || []) n.push(c.name); return [...new Set(n)];
}
// Kapitel über Wiki-Texte, die den Namen des Teils nennen: Belohnung einer Hauptquest, Kapitelführer.
const NAMEN_KAPITEL = []; for (const m of MQ) for (const q of m.quests) if (q.reward && q.reward !== "—") NAMEN_KAPITEL.push({ t: norm(q.reward), ch: zahlKap(m.ch), beleg: `Wiki: Hauptquest „${q.q}“ (Kapitel ${m.ch}) nennt das Teil als Belohnung`, art: "quest", q }); for (const c of g("CHAPTERS")) if (c.items) NAMEN_KAPITEL.push({ t: norm(c.items), ch: zahlKap(c.num), beleg: `Wiki-Kapitelführer nennt das Teil in Kapitel ${c.num}`, art: "kap" });
const kapitelAusText = (name) => { const n = [norm(name), norm(DE_NAMES[name] || "")].filter((x) => x.length >= 7); for (const e of NAMEN_KAPITEL) if (e.ch != null && n.some((x) => wort(e.t, x))) return e; return null; };
// ── Hilfen ──
const zahl = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const kosten = (c) => { if (!c) return undefined; if (c.name === "Copper") { const s = c.amount % 100 === 0 ? ` (${zahl(c.amount / 100)} Silber)` : ""; return `${zahl(c.amount)} Kupfer${s}`; } return `${zahl(c.amount)} ${c.name}`; };
const UNLOCK = (u, npc) => { if (!u) return null; if (/Trust points/i.test(u)) return `Genug Vertrauen bei ${npc} aufbauen`; if (/acquire knowledge/i.test(u)) return "Das nötige Wissen vorher erlernen"; if (/expand camp/i.test(u)) return "Das Lager vorher ausbauen"; const m = u.match(/^(.+) required\.?$/i); if (m) { const v = m[1].match(/^(.+?) (Equipment|Outfit) Supply Contract$/); if (v) { const de = DE_NAMES[`${v[2]} Supply Contract - ${v[1]}`]; return de ? `Erst mit „${de}“ erhältlich` : `Erst mit dem ${v[2] === "Equipment" ? "Ausrüstungs" : "Bekleidungs"}-Liefervertrag für ${deT(v[1])} erhältlich`; } return `Erst mit ${m[1]} erhältlich`; } return u; };
const qUrlItem = (id) => `https://questlog.gg/crimson-desert/en/db/item/${id}`;
const EXKLUSIV = /Vorbesteller|PS5-exklusiv|Twitch-Drop|Deluxe Edition|Bonusinhalt|Vorbestell|Pre-?order/i;
const LEER = /^(Fundort( und Händler)? nicht (erfasst|belegt)|Fundort nicht belegt|nicht erfasst)\b/i;
function artVon(t, e) { if (e.dlc) return "dlc"; if (/^(Händler|Kauf|Verkauf|Contribution Shop|Beitragsshop)/i.test(t)) return "haendler"; if (/^(Boss|Drop:? |Sieg über|Bossdrop)/i.test(t)) return "boss"; if (/^(Reward|Belohnung|Missionsbelohnung|Storybelohnung|Quest)/i.test(t)) return "quest"; if (/^(Herstellung|Rezept|Craft|Schmiede)/i.test(t)) return "rezept"; if (/^(Tresor|Truhe|Schatz|Fund|Liegt|Geh )/i.test(t)) return "welt"; return "sonst"; }
const bericht = { haendlerOhneOrt: {}, haendlerRegion: {}, haendlerWeg: {}, namensAbweichung: [], bossOhneOrt: {}, questOhneKapitel: {}, ohneWeg: [] };
const BOSS_DROP = new Map(); for (const b of BOSSES) for (const f of [b.drop_weapon, b.drop_abyss_gear]) for (const t of String(f || "").split(/,|\/|;| und /)) { const k = kl(t.replace(/\(.*?\)/g, "").trim()); if (k.length > 3) (BOSS_DROP.get(k) || BOSS_DROP.set(k, []).get(k)).push(b); }
const bossName = (s) => String(s || "").replace(/\s*\((Phase[^)]*|Final)\)/, "");
function bossOrt(b) {
  if (HAND.boss[b.name]) return HAND.boss[b.name].ort;
  const teil = String(b.region || "").replace(/\(.*?\)/g, ""); const seg = teil.split(" - ").slice(1).join(" - ") || "";
  const p = findePlatz(seg) || findePlatz(teil);
  if (p) return ortPlatz(p, `Boss ${b.name}: Wiki-Region „${b.region}“, Ort in den Spieldaten (${p.knoten})`);
  const r = findeRegion(teil); if (r) { (bericht.bossOhneOrt[b.name] = b.region); return ortRegion(r, `Boss ${b.name}: Wiki-Region „${b.region}“`); }
  bericht.bossOhneOrt[b.name] = b.region; return null;
}
// ── Einträge ──
const BESCHAFFUNG = {};
function eintrag(tab, e) {
  const name = e.name, wege = [], quellen = new Set(), voraus = [], warnung = []; let abK = [];
  const nehmen = (w, rang) => wege.push({ ...w, _r: rang });
  const ids = (ZIEL.get(name) || []).filter((i) => { const d = ITEMS.get(i); if (!d) return false; if (kl(d.name) === kl(name)) return true; const tx = `${e.notes || ""} ${e.source || ""}`; if (new RegExp(`(Item-?ID|questlog-Item)[ :]*${i}\\b`, "i").test(tx)) return true; bericht.namensAbweichung.push(`${name} ≠ ${d.name} (${i})`); return false; });
  const D = ids.map((i) => ITEMS.get(i));
  for (const i of ids) quellen.add(qUrlItem(i) + GEPRUEFT);
  const namen = new Set([kl(name), ...D.map((d) => kl(d.name))]);
  // 1) Vorhandene Fundort-Karte
  const F = FUNDORTE[name];
  if (F) {
    const titel = F.reg ? String(F.reg).split(",")[0].replace(/\s*\(.*?\)\s*/g, " ").trim() : deT(name);
    const id = `alt-${slug(name)}`;
    if (!ORTE[id]) ORTE[id] = { name: F.reg || titel, en: deE(titel).replace(/\s*\(.*?\)\s*/g, " ").trim(), reg: F.reg || undefined, img: F.img || undefined, q: F.q || undefined, qUrl: F.qUrl || undefined, marker: F.img ? "genau" : "ort", beleg: F.q ? `Fundort-Karte aus ${F.q}` : "Fundort-Karte des Wikis" };
    nehmen({ art: "welt", ort: id, txt: F.txt, beleg: `Wiki FUNDORTE${F.q ? ", " + F.q : ""}` }, 0);
    if (F.qUrl) quellen.add(F.qUrl + GEPRUEFT);
    if (F.vor) { if (/von Spielbeginn an/i.test(F.vor)) abK.push({ kapitel: null, txt: "Von Spielbeginn an erreichbar", beleg: `Wiki FUNDORTE, ${F.q || "ohne Quellenname"}`, rang: -1 }); voraus.push(F.vor); }
    if (F.warn) warnung.push(F.warn);
  }
  // 2) Feste Fundstellen in der Welt (th.gl)
  let spots = []; for (const k of namen) spots = spots.concat(HI.get(k) || []);
  const uniq = new Map(); for (const s of spots) uniq.set(`${s.x}:${s.z}`, s); spots = [...uniq.values()].filter((s) => aufKarte(s.x, s.z));
  if (spots.length && !F) {
    const zeig = spots.length <= 3 ? spots : [spots.slice().sort((a, b) => naechster(a.x, a.z).d - naechster(b.x, b.z).d)[0]];
    for (const s of zeig) {
      const n = naechster(s.x, s.z), nah = n.p && n.d < 900 ? n.p : null;
      const ort = ortKoord("f", s.x, s.z, nah ? `Fundstelle bei ${nah.de}` : `Fundstelle in ${deT(regText(s.x, s.z) || "Pywel")}`, nah ? nah.en : "", `th.gl Knoten ${s.typ}@${s.x}:${s.z}, geprüft ${DATUM}`);
      const txt = spots.length > 3 ? `Liegt fest in der Welt. th.gl verzeichnet ${spots.length} Fundstellen, die Karte zeigt eine davon, alle stehen auf der interaktiven Karte von th.gl.` : "Liegt fest in der Welt an der markierten Stelle (Weltkoordinate laut th.gl).";
      nehmen({ art: "welt", ort, txt, beleg: `th.gl Knoten ${s.typ}@${s.x}:${s.z}` }, spots.length <= 3 ? 2 : 7);
    }
    quellen.add(THGL + GEPRUEFT);
  }
  // 3) Händler
  const hSeen = new Set();
  for (const d of D) for (const s of d.itemIsSoldByNpcs || []) {
    if (hSeen.has(s.id)) continue; hSeen.add(s.id);
    const preis = kosten(s.currency); const unlock = UNLOCK(s.unlock, s.name);
    const h = HAND.haendler[s.name]; const { laeden, weg } = h ? { laeden: [], weg: "" } : ladenVon(s.id, s.name);
    let ort = h ? h.ort : null, beleg = h ? h.beleg : "", extra = null, regionsOrt = false, nurStadt = false;
    if (!ort && laeden.length) {
      const l = laeden.find((x) => [...namen].some((k) => x.items.has(k))) || laeden[0];
      const n = naechster(l.x, l.z), titel = l.titelDe || (n.p ? `Laden bei ${n.p.de}` : "Laden");
      ort = ortKoord("h", l.x, l.z, titel, l.titel || (n.p ? n.p.en : ""), `th.gl Knoten ${l.typ}@${l.x}:${l.z} (${l.name || l.titel}), Zuordnung zu NPC ${s.name} über ${weg}, geprüft ${DATUM}`);
      beleg = `questlog itemIsSoldByNpcs; Laden th.gl über ${weg}`; quellen.add(THGL + GEPRUEFT);
      const it = [...namen].map((k) => l.items.get(k)).find(Boolean); if (it && it.bed) extra = it.bed;
      if (l.cond) extra = extra ? `${extra} ${l.cond}` : l.cond;
      bericht.haendlerWeg[s.name] = weg;
    }
    if (!ort) { // Stadt aus dem Spieltext, Wiki-NPC-Tabelle, dann übriger Spieltext des NPC
      const w = NPC_WIKI.get(kl(s.name));
      const stadt = stadtVon(s.id);
      if (stadt) { const p = findePlatz(stadt); if (p) { ort = ortPlatz(p, `NPC ${s.name}: Spieltext nennt ${stadt}`); beleg = `questlog itemIsSoldByNpcs; Spieltext des NPC nennt ${stadt}`; nurStadt = true; } }
      if (!ort && stadt) { const L = SHOPS.filter((l) => norm(l.titel).includes(norm(stadt))); if (L.length) { const m = (a) => a.slice().sort((p, q) => p - q)[a.length >> 1]; const x = m(L.map((l) => l.x)), z = m(L.map((l) => l.z)); const n = naechster(x, z); ort = ortPlatz({ knoten: n.p ? n.p.knoten : "", en: stadt, de: DE_NAMES[stadt] || stadt, x, z, thgl: true }, `NPC ${s.name}: Spieltext nennt ${stadt}; Lage der Stadt über die th.gl-Läden mit „${stadt}“ im Namen, geprüft ${DATUM}`); beleg = `questlog itemIsSoldByNpcs; Spieltext des NPC nennt ${stadt}`; nurStadt = true; } }
      if (!ort && /Greymane/i.test(String(w?.region || "") + " " + String(npcInfo.get(s.id)?.description || "") + " " + String(npcInfo.get(s.id)?.npcFaction?.name || ""))) { ort = ortPlatz(LAGER, "Graumähnen-Camp: Spieldaten-Knoten Node_Her_GreymaneCamp"); beleg = `questlog itemIsSoldByNpcs; ${s.name} gehört laut questlog und Wiki zu den Graumähnen, Camp aus den Spieldaten`; }
      if (!ort && w) { const p = findePlatz(w.region); if (p) { ort = ortPlatz(p, `NPC ${s.name}: Wiki-Region „${w.region}“`); beleg = `questlog itemIsSoldByNpcs; Standort Wiki NPC-Tabelle „${w.region}“`; } else { const r = findeRegion(w.region); if (r) { ort = ortRegion(r, `NPC ${s.name}: Wiki-Region „${w.region}“`); beleg = `questlog itemIsSoldByNpcs; Region Wiki NPC-Tabelle „${w.region}“`; regionsOrt = true; } } }
      const info = npcInfo.get(s.id);
      if (!ort && info && info.description) { const t = info.description; const p = findePlatz(t); if (p) { ort = ortPlatz(p, `NPC ${s.name}: Spieltext nennt ${p.en || p.de}`); beleg = `questlog itemIsSoldByNpcs; Spieltext des NPC nennt den Ort`; } else { const r = findeRegion(t); if (r) { ort = ortRegion(r, `NPC ${s.name}: Spieltext nennt ${r}`); beleg = `questlog itemIsSoldByNpcs; Spieltext des NPC nennt die Region`; regionsOrt = true; } } }
      if (w && w.kapText) { const m = String(w.kapText).match(/Kap\.\s*(\d+)/); if (m) abK.push({ kapitel: +m[1], txt: "", beleg: `${w.name} steht im Wiki bei „${String(w.kapText).slice(0, 80)}“`, rang: 3 }); }
      if (w && /Ab Kapitel (\d+)/.test(w.bio || "")) abK.push({ kapitel: +w.bio.match(/Ab Kapitel (\d+)/)[1], txt: "", beleg: `NPC-Eintrag ${s.name} im Wiki: ${w.bio.match(/Ab Kapitel \d+[^.]*/)[0]}`, rang: 3 });
    }
    if (!ort) { (bericht.haendlerOhneOrt[s.name] ||= 0); bericht.haendlerOhneOrt[s.name]++; continue; } // Händler nur nennen, wenn der Standort belegt ist
    if (regionsOrt) { (bericht.haendlerRegion[s.name] ||= 0); bericht.haendlerRegion[s.name]++; }
    const txtB = [`Verkauf bei ${s.name}.`]; if (regionsOrt) txtB.push("Der genaue Standort ist nicht belegt, nur die Region."); else if (nurStadt) txtB.push("Der Spieltext nennt nur den Ort, der Stand selbst ist nicht markiert.");
    const bed = []; if (unlock) bed.push(unlock);
    if (extra) { const q = extra.match(/Available after completing (?:"([^"]+)" in )?the quest "([^"]+)"/); if (q) { bed.push(`Erst nach der Quest „${q[2]}“${q[1] ? ` (Abschnitt „${q[1]}“)` : ""}`); const kk = kapitelVonQuest([q[2], q[1]].filter(Boolean)); if (kk && (kk.kapitel != null || kk.txt)) abK.push({ ...kk, beleg: `Laden laut th.gl erst nach Quest „${q[2]}“; ${kk.beleg}`, rang: 3 }); else abK.push({ kapitel: null, txt: `Beim Händler erst nach der Quest „${q[2]}“`, beleg: `th.gl Ladenknoten, geprüft ${DATUM}`, rang: 6 }); } else if (/Trust/.test(extra)) { const m = extra.match(/(\d+) Trust/); bed.push(m ? `${m[1]} Vertrauen bei ${s.name} nötig` : `Vertrauen bei ${s.name} nötig`); } }
    if (bed.length) voraus.push(`${s.name}: ${[...new Set(bed)].join(", ")}.`);
    nehmen({ art: e.dlc ? "dlc" : "haendler", ort, txt: txtB.join(" "), kosten: preis, beleg }, bed.length ? 3 : 1);
  }
  // 4) Bossbeute laut Wiki-Bosstabelle
  const bSeen = new Set();
  for (const k of namen) for (const b of BOSS_DROP.get(k) || []) {
    const bn = bossName(b.name); if (bSeen.has(bn)) continue; bSeen.add(bn);
    const ort = bossOrt(b);
    nehmen({ art: "boss", ort: ort || undefined, txt: `Beute von Boss ${b.name}.${b.quest ? " Quest: " + String(b.quest).split(";")[0].trim() + "." : ""}`, beleg: `Wiki BOSSES (${b.name})` }, 5);
    if (zahlKap(b.chapter) != null) abK.push({ kapitel: zahlKap(b.chapter), txt: "", beleg: `Beute von Boss ${b.name}, der im Wiki in Kapitel ${b.chapter} steht`, rang: 2 });
  }
  // 5) Questbelohnungen
  const mSeen = new Set();
  for (const d of D) for (const m of d.itemIsObtainedFromMissions || []) {
    if (mSeen.has(m.id)) continue; mSeen.add(m.id);
    const mis = MISS.get(String(m.id)); if (!mis) continue;
    const qs = mis.getMissionIsPartOfQuests || []; const qn = qs[0];
    const misDe = MISS_DE.get(String(m.id))?.name || mis.name; const qDe = qn ? QUE_DE.get(String(qn.id))?.name || qn.name : "";
    let ort; const nd = MNODE.get(kl(mis.name)) || (qn ? MNODE.get(kl(qn.name)) : null);
    if (nd && new Set(nd.map((x) => x.desc || "")).size === 1 && nd.length <= 4) { const x = nd[0]; if (aufKarte(x.x, x.z)) { const n = naechster(x.x, x.z), loc = x.desc && !/^(Objectives|Unlocks|Location)\b/.test(x.desc) && x.desc.length <= 40 && !x.desc.includes(":") ? x : null; const de = loc ? String(loc.desc_de || loc.desc) : (n.p ? `Questort bei ${n.p.de}` : "Questort"); ort = ortKoord("q", x.x, x.z, de, loc ? loc.desc : n.p?.en, `th.gl Questknoten ${x.typ}@${x.x}:${x.z} („${x.name}“), geprüft ${DATUM}`); quellen.add(THGL + GEPRUEFT); } }
    const ket = kapitelVonQuest(missionsNamen(mis));
    if (ket && (ket.kapitel != null || ket.txt)) abK.push({ kapitel: ket.kapitel, txt: ket.txt, beleg: `Belohnung der Mission „${mis.name}“ (Quest „${qn?.name || "?"}“); ${ket.beleg}`, rang: 1 });
    else if (!ket) { const key = qn?.name || mis.name; bericht.questOhneKapitel[key] = (bericht.questOhneKapitel[key] || 0) + 1; }
    if (ket?.voraus && !/^keine/i.test(ket.voraus)) voraus.push(`Quest „${ket.q}“: ${ket.voraus}`);
    if (ket?.miss) warnung.push(`Die Quest kann verpasst werden (Wiki: Quest „${qn?.name}“).`);
    nehmen({ art: "quest", ort, txt: `Belohnung der Mission „${misDe}“${qDe && qDe !== misDe ? ` in der Quest „${qDe}“` : ""}.`, beleg: `questlog itemIsObtainedFromMissions ${m.id}` }, ort ? 4 : 5);
  }
  // 6) Aufträge (Entsendung)
  const dSeen = new Set();
  for (const d of D) for (const m of d.itemIsRewardOfDispatchMissions || []) {
    if (dSeen.has(m.id)) continue; dSeen.add(m.id);
    const a = DISP.get(String(m.id)); let ort;
    if (a && a.dispatchMissionLocation && aufKarte(a.dispatchMissionLocation.x, a.dispatchMissionLocation.z)) ort = ortKoord("a", a.dispatchMissionLocation.x, a.dispatchMissionLocation.z, a.locationName ? deT(a.locationName) : "Auftragsort", a.locationName, `questlog Auftrag ${m.id}, Koordinate dispatchMissionLocation`, "Spielkarte, Position laut questlog");
    const K = { funds: "Geldmittel", food: "Nahrung", stone: "Stein", wood: "Holz", equipment: "Ausrüstung" };
    const ko = a && a.dispatchMissionCosts ? a.dispatchMissionCosts.map((c) => `${zahl(c.amount)} ${K[c.resourceType] || c.resourceType}`).join(", ") : undefined;
    nehmen({ art: "sonst", ort, txt: `Belohnung des Auftrags „${DISP_DE.get(String(m.id))?.name || m.name}“${a?.durationMinutes ? `, Dauer ${a.durationMinutes} Minuten` : ""}.`, kosten: ko, beleg: `questlog itemIsRewardOfDispatchMissions ${m.id}` }, 6);
  }
  // 7) Herstellung
  const rSeen = new Set();
  for (const d of D) for (const r of d.itemIsProducedByRecipes || []) {
    if (rSeen.has(r.id) || rSeen.size >= 2) continue; rSeen.add(r.id);
    const zut = [...(r.ingredients || []).map((x) => `${x.quantity}x ${x.name}`), ...(r.ingredientGroups || []).map((x) => `${x.quantity}x ${x.name === "Kuku Pot Sealed Item" ? "versiegelte Kuku-Topf-Ware (Gruppe „Kuku Pot Sealed Item“)" : x.name}`)].join(" + ");
    let ort, plan = "";
    const bp = [`blueprint: ${d.name}`, r.taughtBy && String(r.taughtBy.id) !== String(d.id) && kl(r.taughtBy.name) !== kl(d.name) && kl(r.taughtBy.name)].filter(Boolean).map(kl);
    for (const k of bp) { const n = MANUAL.get(k); if (n && n.length && aufKarte(n[0].x, n[0].z)) { const x = n[0], ne = naechster(x.x, x.z); ort = ortKoord("b", x.x, x.z, ne.p ? `Blaupause bei ${ne.p.de}` : "Blaupause", ne.p?.en, `th.gl Knoten ${x.typ}@${x.x}:${x.z} („${x.name}“), geprüft ${DATUM}`); plan = n.length > 1 ? ` Die Blaupause liegt an ${n.length} Stellen, die Karte zeigt eine.` : " Die Karte zeigt die Fundstelle der Blaupause."; quellen.add(THGL + GEPRUEFT); break; } }
    if (!ort) for (const k of bp) { const n = SHOPITEM.get(k); if (n && n.length) { const l = n[0], ne = naechster(l.x, l.z); ort = ortKoord("h", l.x, l.z, l.titelDe || (ne.p ? `Laden bei ${ne.p.de}` : "Laden"), l.titel || ne.p?.en, `th.gl Knoten ${l.typ}@${l.x}:${l.z} (${l.name || l.titel}), geprüft ${DATUM}`); const it = l.items.get(k); plan = ` Die Blaupause verkauft ${l.name || l.titelDe}${it ? ` für ${it.preis.replace(/,/g, ".")} ${it.waehrung}` : ""}.`; quellen.add(THGL + GEPRUEFT); break; } }
    nehmen({ art: e.dlc ? "dlc" : "rezept", ort, txt: `Herstellung${zut ? ": " + zut : ""}.${plan}`, beleg: `questlog itemIsProducedByRecipes ${r.id}` }, ort ? 5 : 6);
  }
  // 8) Wiki-Text (Feld source, ohne den questlog-Anhang)
  const roh = String(e.source || ""); const kern = roh.split(/;\s*questlog|\s*questlog zusätzlich/i)[0].trim().replace(/[;,]$/, "");
  const artK = artVon(kern, e); const dopp = (/^(Händler|Rezept|Herstellung|questlog)/i.test(kern) && wege.length > 0) || ((artK === "boss" || artK === "quest") && wege.some((w) => w.art === artK));
  if (kern && dopp) { const kk = kap(kern); if (kk != null) abK.push({ kapitel: kk, txt: "", beleg: `Wiki-Quellenangabe des Eintrags nennt Kapitel ${kk}`, rang: 2 }); }
  if (kern && !LEER.test(kern) && !dopp && !F) {
    const p = findePlatz(kern), r = p ? null : findeRegion(kern);
    const ort = p ? ortPlatz(p, `Wiki-Quellenangabe nennt „${p.en || p.de}“, Ort in den Spieldaten (${p.knoten})`) : r && !EXKLUSIV.test(kern) ? ortRegion(r, `Wiki-Quellenangabe nennt die Region ${r}`) : undefined;
    nehmen({ art: artK, ort, txt: kern.replace(/^Reward Quest\b/, "Belohnung der Quest").replace(/^Reward\b/, "Belohnung").replace(/^Drop:\s*/, "Beute: ").replace(/\bContribution Shop\b/g, "Beitragsladen").replace(/\bEquipment-Shop\b/g, "Ausrüstungsladen"), beleg: "Wiki, Feld source" }, ort ? (ORTE[ort]?.marker === "region" ? 7 : 4) : 8);
    quellen.add(`Wiki, Quellenangabe des Eintrags`);
    const kk = kap(kern); if (kk != null) abK.push({ kapitel: kk, txt: "", beleg: `Wiki-Quellenangabe des Eintrags nennt Kapitel ${kk}`, rang: 2 });
  }
  const tk = kapitelAusText(name); if (tk) abK.push({ kapitel: tk.ch, txt: "", beleg: tk.beleg, rang: 2 });
  const nk = String(e.notes || "").match(/\b(?:ab|nach|in|aus|vor) Kap(?:\.|itel)\s*(\d+)/i); if (nk) abK.push({ kapitel: +nk[1], txt: "", beleg: `Wiki-Notiz des Eintrags: „${nk[0]}“`, rang: 4 });
  if (EXKLUSIV.test(roh)) warnung.push("Nicht regulär im Spiel zu finden: Das Teil gehört zu einem Bonus oder einer Aktion, siehe Text.");
  if (e.req) voraus.push(String(e.req));
  // 9) Sammelquellen
  const truhe = D.some((d) => (d.itemFoundInTreasureChests || []).some((c) => c.name === "Treasure Chest")); const erin = D.some((d) => (d.itemFoundInTreasureChests || []).some((c) => c.name === "Gift of Reminiscence"));
  if (truhe) nehmen({ art: "welt", txt: "Zufällige Beute aus Schatztruhen, kein fester Ort (questlog).", beleg: "questlog itemFoundInTreasureChests" }, 10);
  if (erin) nehmen({ art: "sonst", txt: "Enthalten in „Gift of Reminiscence“ (questlog).", beleg: "questlog itemFoundInTreasureChests" }, 10);
  const dr = new Map(); for (const d of D) { const L = d.itemDroppedFromNpcs || []; for (const s of L) dr.set(s.name, 1); }
  if (dr.size) { const nam = [...dr.keys()]; const txt = dr.size > 100 ? `Kann als allgemeine Beute von sehr vielen Gegnern fallen (${dr.size} Einträge bei questlog).` : `Kann als Beute fallen bei: ${nam.slice(0, 5).join(", ")}${nam.length > 5 ? ` und ${nam.length - 5} weiteren Gegnern` : ""} (questlog).`; nehmen({ art: "sonst", txt, beleg: "questlog itemDroppedFromNpcs" }, 9); }
  // Hand
  const H = HAND.teile[name];
  let liste = wege.sort((a, b) => a._r - b._r);
  if (H) { if (H.ersetzen) liste = []; for (const w of H.wege || []) liste.unshift({ ...w, _r: -1 }); if (H.vor) voraus.unshift(H.vor); if (H.warn) warnung.unshift(H.warn); for (const q of H.quellen || []) quellen.add(q); if (H.ab) abK.unshift({ ...H.ab, rang: -2 }); }
  // Mehrere Händler am selben Ort zu einem Weg zusammenfassen.
  { const v = new Map(); const neu = []; for (const w of liste) { const n = (String(w.txt).match(/^Verkauf bei (.+?)\./) || [])[1]; if (n && w.ort && v.has(w.ort + "|" + (w.kosten || ""))) { const a = v.get(w.ort + "|" + (w.kosten || "")); a.txt = a.txt.replace(/^Verkauf bei (.+?)\./, (m, x) => `Verkauf bei ${x} oder ${n}.`); continue; } if (n && w.ort) v.set(w.ort + "|" + (w.kosten || ""), w); neu.push(w); } liste = neu; }
  // Dubletten und Obergrenze: höchstens 6 Wege, Rest als Sammelhinweis.
  const dedup = []; const dk = new Set(); for (const w of liste) { const k = `${w.art}|${w.ort || ""}|${w.txt}`; if (dk.has(k)) continue; dk.add(k); dedup.push(w); }
  let aus = dedup; if (dedup.length > 6) { const rest = dedup.slice(5); const hd = rest.filter((w) => w.art === "haendler" || w.art === "dlc"); aus = dedup.slice(0, 5); const nm = rest.map((w) => (w.txt.match(/^Verkauf bei (.+?)\./) || [])[1]).filter(Boolean); aus.push({ art: "sonst", txt: nm.length ? `Außerdem bei weiteren ${nm.length} Händlern: ${nm.join(", ")}.` + (rest.length > nm.length ? ` Dazu ${rest.length - nm.length} weitere Wege.` : "") : `Dazu ${rest.length} weitere Wege, siehe Belege.`, beleg: "Zusammenfassung der weiteren Wege" }); }
  aus = aus.map(({ _r, ...w }) => Object.fromEntries(Object.entries(w).filter(([, v]) => v !== undefined && v !== "")));
  // Ab wann: früheste belegte Angabe
  let ab = { kapitel: null, txt: "Nicht erfasst: Für dieses Teil ist kein Kapitel belegt.", beleg: "" };
  const mitK = abK.filter((a) => a.kapitel != null || a.txt);
  if (mitK.length) {
    const start = mitK.find((a) => a.rang <= -1 && /Spielbeginn/.test(a.txt));
    const kk = mitK.filter((a) => a.kapitel != null).sort((a, b) => a.kapitel - b.kapitel);
    if (mitK.find((a) => a.rang === -2)) { const h = mitK.find((a) => a.rang === -2); ab = { kapitel: h.kapitel ?? null, txt: h.txt || "", beleg: h.beleg }; }
    else if (start) ab = { kapitel: null, txt: start.txt, beleg: start.beleg };
    else if (kk.length) { const a = kk[0]; const sammel = aus.some((w) => w.art === "welt" || w.art === "haendler") && aus.length > 1; ab = { kapitel: a.kapitel, txt: sammel ? "Frühester Weg mit belegtem Kapitel. Andere Wege können früher möglich sein, das ist aber nicht belegt." : "", beleg: a.beleg }; }
    else { const a = mitK[0]; ab = { kapitel: null, txt: a.txt, beleg: a.beleg }; }
  }
  const obj = { wege: aus, ab };
  const v = [...new Set(voraus)].join(" "); if (v) obj.vor = v; const wa = [...new Set(warnung)].join(" "); if (wa) obj.warn = wa;
  obj.quellen = [...quellen]; if (!obj.quellen.length) obj.quellen = ["Wiki, Quellenangabe des Eintrags"];
  if (!aus.length) { bericht.ohneWeg.push(`${tab}: ${name}`); const tr = new Set(); for (const d of D) for (const n of d.itemIsWornByNpcs || []) tr.add(n.name); if (tr.size) { const l = [...tr]; obj.warn = [obj.warn, `Kein Beschaffungsweg belegt. Bei questlog steht nur, wer es trägt: ${l.slice(0, 5).join(", ")}${l.length > 5 ? ` und ${l.length - 5} weitere` : ""}. Ob man es von ihnen bekommt, ist nicht belegt.`].filter(Boolean).join(" "); } }
  return obj;
}
for (const [t, L] of [["WEAPONS", WEAPONS], ["ARMOR", ARMOR], ["ACCESSORIES", ACCESSORIES], ["DLC_GEAR_EXTRA", DLCX]]) for (const e of L) if (!BESCHAFFUNG[e.name]) BESCHAFFUNG[e.name] = eintrag(t, e);
// Nur benutzte Orte schreiben
const benutzt = new Set(); for (const b of Object.values(BESCHAFFUNG)) for (const w of b.wege) if (w.ort) benutzt.add(w.ort);
const ORTE_AUS = {}; for (const k of Object.keys(ORTE).sort()) if (benutzt.has(k)) ORTE_AUS[k] = Object.fromEntries(Object.entries(ORTE[k]).filter(([, v]) => v != null));
const zeilen = (o) => Object.entries(o).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(",\n");
const kopf = `// Beschaffungskarten: Wo und ab wann man jedes Teil bekommt. Erzeugt von scripts/gen-beschaffung.mjs am ${DATUM}, nicht von Hand ändern (Handrecherche: scripts/beschaffung-hand.json).\n// Wird erst beim Öffnen des Fundort-Fensters nachgeladen (beschLaden() in index.html). marker: genau = Koordinate oder Quellenbild, ort = benannter Ort, region = ungefähre Region.\n`;
fs.writeFileSync(path.join(ROOT, "data/d14-beschaffung.js"), `${kopf}const ORTE={\n${zeilen(ORTE_AUS)}\n};\nconst BESCHAFFUNG={\n${zeilen(BESCHAFFUNG)}\n};\n`);
const SPEC_AUS = {}; for (const k of Object.keys(SPEC)) if (benutzt.has(k) && ORTE_AUS[k]?.img) SPEC_AUS[k] = { ...SPEC[k], img: ORTE_AUS[k].img };
fs.writeFileSync(path.join(ROH, "orte-spec.json"), JSON.stringify(SPEC_AUS));
fs.writeFileSync(path.join(ROH, "gen-bericht.json"), JSON.stringify(bericht, null, 1));
const st = fs.statSync(path.join(ROOT, "data/d14-beschaffung.js")).size;
console.log(`d14: ${Object.keys(BESCHAFFUNG).length} Einträge, ${Object.keys(ORTE_AUS).length} Orte, ${Object.keys(SPEC_AUS).length} neue Bilder, ${Math.round(st / 1024)} KB`);

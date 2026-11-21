
// ===== SYNC-CODE (seit 29.09.2026, ersetzt Netlify Identity) =====
// Kein Konto, keine Fremdskripte: Der Client erzeugt einen zufälligen Code (24 Zeichen,
// 31er-Alphabet ohne 0/O/1/I/L, ca. 119 Bit). Der Code geht NUR im Header X-Sync-Code
// an /api/sync (nie in URL oder Body), der Server speichert nur sha256(code) als Schlüssel.
// Synchronisiert wird ausschließlich die True-Ending-Checkliste (localStorage cd_te).
// Der Code selbst liegt in localStorage cd_sync_code und wird bewusst NICHT exportiert.
//
// Schnittstelle zum Rest der Seite (unverändert seit der Identity-Zeit):
//   window._syncProgress(items)  wird von saveTE() nach jeder Änderung gerufen.
// Änderungen werden entprellt (1,2 s) gesammelt, weil nginx /api/sync auf 20 Anfragen
// pro Minute begrenzt: der letzte Stand geht immer raus, schnelles Abhaken erzeugt keine 429er.
// Das Modul lädt sich nichts nach, es hat keine import-Anweisungen.

const SY_KEY = 'cd_sync_code';
const SY_LEN = 24;
const SY_ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // 31 Zeichen
const SY_RE = /^[A-HJKMNP-Z2-9]{24}$/;               // wie die Server-Regex
const SY_DEBOUNCE_MS = 1200;
const SY_TIMEOUT_MS = 15000;
// Server-Grenzen für PUT /api/sync: höchstens 500 Einträge, Body höchstens 16 KiB (sonst 413),
// jeder Eintrag muss SY_ID_RE erfüllen (sonst verwirft der Server ihn). Der Client filtert vorab.
// Belegt: alle IDs, die in cd_te stehen können (True-Ending-Liste te1..te31 und te_abyss_01..40,
// Sanctum-IDs sind eine Teilmenge davon), sind höchstens 11 Zeichen lang und passen zur Regex.
const SY_MAX_ITEMS = 500;
const SY_ID_RE = /^[A-Za-z0-9_-]{1,40}$/;

const $id = (id) => document.getElementById(id);

// ── Code: Erzeugen, Normalisieren, Anzeigen ─────────────────────────
// Rejection Sampling: Bytes ab 248 (= 31 * 8) werden verworfen, der Rest % 31 ist
// dann gleichverteilt (kein Modulo-Bias).
function syGenerate() {
  if (!(window.crypto && crypto.getRandomValues)) throw new Error('no_crypto');
  const out = [];
  const buf = new Uint8Array(48);
  while (out.length < SY_LEN) {
    crypto.getRandomValues(buf);
    for (let i = 0; i < buf.length && out.length < SY_LEN; i++) {
      if (buf[i] < 248) out.push(SY_ALPHA[buf[i] % 31]);
    }
  }
  return out.join('');
}
// Großbuchstaben, alles außer Alphabet-Zeichen entfernen (Bindestriche, Leerzeichen, Zeilenumbrüche).
function syNormalize(s) {
  return String(s == null ? '' : s).toUpperCase().replace(/[^A-HJKMNP-Z2-9]/g, '');
}
function syFormat(code) { return code.match(/.{4}/g).join('-'); }
function syShort(code) { return code.slice(0, 4) + '-…-' + code.slice(-4); }

function syGetCode() {
  try {
    const c = localStorage.getItem(SY_KEY);
    return c && SY_RE.test(c) ? c : '';
  } catch (_) { return ''; }
}
function syStoreCode(code) {
  try { localStorage.setItem(SY_KEY, code); return localStorage.getItem(SY_KEY) === code; }
  catch (_) { return false; }
}
function syForgetCode() { try { localStorage.removeItem(SY_KEY); } catch (_) {} }

// Nur zulässige Einträge (ID-Form), ohne Duplikate, höchstens SY_MAX_ITEMS. Alles, was an den Server geht, läuft hierdurch.
function syValid(list) {
  const out = [];
  const seen = new Set();
  for (const x of Array.isArray(list) ? list : []) {
    if (typeof x === 'string' && SY_ID_RE.test(x) && !seen.has(x)) { seen.add(x); out.push(x); if (out.length >= SY_MAX_ITEMS) break; }
  }
  return out;
}
// Lokaler Stand roh (nur Strings); zum Hochladen immer syValid() verwenden.
function syLocalItems() {
  const v = lsJson('cd_te', []);
  return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
}

// ── API ─────────────────────────────────────────────────────────────
async function syApi(method, code, items) {
  const headers = { 'X-Sync-Code': code, Accept: 'application/json' };
  const init = { method, headers, cache: 'no-store' };
  if (method === 'PUT') {
    headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify({ checkedItems: syValid(items) });
    if (init.body.length < 60000) init.keepalive = true; // überlebt das Schließen des Tabs (Limit 64 KiB)
  }
  const ctl = typeof AbortController === 'function' ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), SY_TIMEOUT_MS) : null;
  if (ctl) init.signal = ctl.signal;
  try {
    const res = await fetch('/api/sync', init);
    let data = null;
    try { data = await res.json(); } catch (_) {}
    return { status: res.status, data };
  } finally {
    if (timer) clearTimeout(timer);
  }
}
function syErrText(status) {
  if (status === 429) return 'Zu viele Anfragen. Bitte in einer Minute noch einmal versuchen.';
  if (status === 507) return 'Der Server nimmt gerade keine neuen Codes an. Bitte später noch einmal versuchen.';
  if (status === 413) return 'Der Stand ist zu groß für den Server (Grenze 16 KiB, 500 Einträge).';
  if (status >= 500 || status === 0) return 'Der Server ist gerade nicht erreichbar. Bitte später noch einmal versuchen.';
  return 'Unerwartete Antwort vom Server (HTTP ' + status + ').';
}
function syOk(r) { return r.status === 200 && r.data && r.data.ok === true; }

// ── Status in der Sidebar (#auth-sync-status) ───────────────────────
let _syStatusTimer = null;
function setSyncStatus(msg, clearAfterMs) {
  const el = $id('auth-sync-status');
  if (el) el.textContent = msg;
  clearTimeout(_syStatusTimer);
  if (clearAfterMs) _syStatusTimer = setTimeout(() => { if (el) el.textContent = ''; }, clearAfterMs);
}

// ── Hochladen (entprellt, seriell, mit Wiederholung) ────────────────
let _syTimer = null;
let _syPending = null;
let _syWaiters = [];
let _syChain = Promise.resolve();
let _syRetryTimer = null;
let _syRetryMs = 15000;

async function syPush(items, codeArg) {
  const code = codeArg || syGetCode(); // beim Verbinden ist der Code noch nicht gespeichert
  if (!code) return true;
  setSyncStatus('Speichert…');
  try {
    const r = await syApi('PUT', code, items);
    if (!syOk(r)) throw Object.assign(new Error('HTTP ' + r.status), { status: r.status });
    _syRetryMs = 15000;
    setSyncStatus('Gespeichert ✓', 2000);
    return true;
  } catch (err) {
    console.warn('Sync fehlgeschlagen:', err);
    clearTimeout(_syRetryTimer);
    _syRetryTimer = null;
    // 413 (Stand zu groß) und 507 (Server voll) sind dauerhaft: nicht wiederholen, sondern
    // melden. Die nächste Änderung des Nutzers versucht es von selbst wieder.
    const st = err && err.status;
    if (st === 413 || st === 507) {
      setSyncStatus('Sync fehlgeschlagen, lokal gespeichert' + (st === 413 ? ' (Stand zu groß)' : ' (Server voll)'), 5000);
      return false;
    }
    setSyncStatus('Sync fehlgeschlagen, lokal gespeichert', 4000);
    // Sonst später noch einmal den dann aktuellen lokalen Stand senden (Backoff bis 2 Minuten).
    _syRetryTimer = setTimeout(() => window._syncProgress(syLocalItems()).catch(() => {}), _syRetryMs);
    _syRetryMs = Math.min(_syRetryMs * 2, 120000);
    return false;
  }
}
function syFlush() {
  clearTimeout(_syTimer);
  _syTimer = null;
  const items = _syPending;
  if (items === null) return _syChain;
  _syPending = null;
  const waiters = _syWaiters.splice(0);
  _syChain = _syChain.then(() => syPush(items)).then(() => { waiters.forEach((w) => w()); });
  return _syChain;
}
window._syncProgress = function _syncProgress(items) {
  if (!syGetCode()) return Promise.resolve();
  _syPending = Array.isArray(items) ? items : [];
  clearTimeout(_syTimer);
  _syTimer = setTimeout(syFlush, SY_DEBOUNCE_MS);
  return new Promise((resolve) => { _syWaiters.push(resolve); });
};
// Tab wird versteckt oder verlassen: ausstehenden Stand sofort senden.
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') syFlush(); });
window.addEventListener('pagehide', () => { syFlush(); });

// ── Laden und Vereinigen ────────────────────────────────────────────
// Server-Stand und lokaler Stand werden vereinigt (Server zuerst). Hat der lokale Stand
// mehr, geht die Vereinigung zurück an den Server.
async function syMergeFromServer(code) {
  const r = await syApi('GET', code);
  if (r.status === 404) return { missing: true };
  if (!syOk(r)) throw Object.assign(new Error('HTTP ' + r.status), { status: r.status });
  const server = syValid(r.data.checkedItems);
  const local = syLocalItems();
  const merged = Array.from(new Set([...server, ...local]));
  if (merged.length !== local.length) {
    lsSet('cd_te', JSON.stringify(merged));
    if (typeof renderTE === 'function') renderTE();
    if (typeof _r2b6Render === 'function') _r2b6Render();   /* R2 Abnahme: Checklisten-Seite nachziehen */
  }
  // Hochgeladen wird nur der zulässige Teil; wächst er über den Serverstand hinaus, geht er zurück.
  const grew = syValid(merged).length > server.length;
  if (grew) await syPush(merged, code);
  return { missing: false, serverCount: server.length, merged: merged.length, grew };
}

async function _loadServerProgress() {
  const code = syGetCode();
  if (!code) return;
  setSyncStatus('Lade Fortschritt…');
  try {
    const res = await syMergeFromServer(code);
    if (res.missing) setSyncStatus('Kein Stand auf dem Server, wird beim nächsten Speichern angelegt', 5000);
    else if (!res.grew) setSyncStatus('Fortschritt geladen ✓', 2500);
  } catch (err) {
    console.warn('Sync-Laden fehlgeschlagen:', err);
    setSyncStatus('Sync nicht erreichbar, lokal gespeichert', 4000);
  }
}

// ── Sidebar-Bereich #auth-area ──────────────────────────────────────
function updateSyncUI() {
  const btn = $id('auth-btn');
  const userEl = $id('auth-user');
  if (!btn || !userEl) return;
  const code = syGetCode();
  if (code) {
    userEl.textContent = 'Code ' + syShort(code);
    userEl.title = 'Sync-Code anzeigen';
    userEl.setAttribute('aria-label', 'Sync-Code anzeigen');
    userEl.style.display = 'block';
    btn.textContent = '🚪 Sync beenden';
    btn.onclick = () => window.openSyncModal('end');
  } else {
    userEl.style.display = 'none';
    btn.textContent = '🔑 Sync';
    btn.onclick = () => window.openSyncModal('start');
  }
}

// ── Modal ───────────────────────────────────────────────────────────
function syErr(msg) {
  const el = $id('sync-err');
  el.textContent = msg || '';
  el.classList.toggle('show', !!msg);
}
function syBusy(on) {
  ['sy-create', 'sy-enter', 'sy-end-local', 'sy-end-server', 'sy-end-cancel'].forEach((id) => {
    const b = $id(id);
    if (b) b.disabled = !!on;
  });
  $id('sync-box').setAttribute('aria-busy', on ? 'true' : 'false');
}
function syRenderCode(code) {
  const box = $id('sy-code');
  box.textContent = '';
  syFormat(code).split('-').forEach((g) => {
    const s = document.createElement('span');
    s.textContent = g;
    box.appendChild(s);
  });
  box.setAttribute('aria-label', 'Dein Sync-Code: ' + code.split('').join(' '));
}
// view: 'start' | 'code' | 'end'
function syShow(view, lead) {
  const titles = { start: 'Sync-Code', code: 'Dein Sync-Code', end: 'Sync beenden' };
  ['start', 'code', 'end'].forEach((v) => { $id('sy-v-' + v).hidden = v !== view; });
  $id('sync-title').textContent = titles[view];
  syErr('');
  $id('sy-copy-msg').textContent = '';
  if (view === 'code') {
    const code = syGetCode();
    if (code) syRenderCode(code);
    $id('sy-lead').textContent = lead || 'Sync ist auf diesem Gerät aktiv. Dein Code:';
  }
  const focusId = { start: 'sy-create', code: 'sy-copy', end: 'sy-end-local' }[view];
  const f = $id(focusId);
  if (f) f.focus();
}
window.openSyncModal = (view) => {
  $id('sync-overlay').classList.add('show');
  if (typeof modalFocusOpen === 'function') modalFocusOpen('sync-overlay'); // merkt sich den Fokus für das Schließen
  const code = syGetCode();
  if (!code) syShow('start');
  else if (view === 'end') syShow('end');
  else syShow('code');
};
window.closeSyncModal = (e) => {
  if (e && e.target !== $id('sync-overlay')) return;
  $id('sync-overlay').classList.remove('show');
  syErr('');
  $id('sy-input').value = '';
  $id('sy-copy-msg').textContent = '';
  if (typeof modalFocusClose === 'function') modalFocusClose();
};

// Neuen Code erzeugen: erst beim Server anlegen (erster PUT mit dem lokalen Stand),
// erst danach lokal speichern und anzeigen.
async function syCreate() {
  syErr('');
  let code;
  try { code = syGenerate(); }
  catch (_) { syErr('Dieser Browser kann keine sicheren Zufallszahlen erzeugen. Bitte einen aktuellen Browser verwenden.'); return; }
  syBusy(true);
  try {
    const r = await syApi('PUT', code, syLocalItems());
    if (!syOk(r)) { syErr(syErrText(r.status)); return; }
    if (!syStoreCode(code)) { syErr('Der Code konnte in diesem Browser nicht gespeichert werden (privater Modus?). Bitte nicht verwenden.'); return; }
    updateSyncUI();
    syShow('code', 'Neuer Code erstellt. Notiere ihn jetzt:');
  } catch (_) {
    syErr(syErrText(0));
  } finally {
    syBusy(false);
  }
}

// Vorhandenen Code eingeben: laden, mit lokalem Stand vereinigen, bei Zuwachs hochladen.
async function syEnter() {
  syErr('');
  const code = syNormalize($id('sy-input').value);
  if (code.length !== SY_LEN) {
    syErr('Ein Code hat genau ' + SY_LEN + ' Zeichen (Buchstaben außer I, L, O und Ziffern 2 bis 9). Erkannt: ' + code.length + '.');
    $id('sy-input').focus();
    return;
  }
  syBusy(true);
  try {
    const res = await syMergeFromServer(code);
    if (res.missing) { syErr('Diesen Code kennt der Server nicht. Prüfe die Eingabe oder erstelle einen neuen Code.'); return; }
    if (!syStoreCode(code)) { syErr('Der Code konnte in diesem Browser nicht gespeichert werden (privater Modus?).'); return; }
    updateSyncUI();
    $id('sy-input').value = '';
    syShow('code', 'Verbunden, ' + res.merged + ' Einträge zusammengeführt. Dein Code:');
    setSyncStatus('Fortschritt geladen ✓', 2500);
  } catch (err) {
    syErr(err && err.status === 400 ? 'Ungültiger Code.' : syErrText(err && err.status ? err.status : 0));
  } finally {
    syBusy(false);
  }
}

async function syCopy() {
  const code = syGetCode();
  if (!code) return;
  const txt = syFormat(code);
  let ok = false;
  try { await navigator.clipboard.writeText(txt); ok = true; }
  catch (_) {
    try {
      const ta = document.createElement('textarea');
      ta.value = txt;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      ok = document.execCommand('copy');
      ta.remove();
    } catch (_2) {}
  }
  $id('sy-copy-msg').textContent = ok ? 'Kopiert ✓' : 'Kopieren nicht möglich, bitte den Code markieren und von Hand kopieren.';
  $id('sy-copy').focus();
}

// Sync beenden. Mit deleteServer wird zuerst der Serverstand gelöscht; scheitert das,
// bleibt der Sync aktiv, damit niemand fälschlich glaubt, die Daten seien weg.
async function syEnd(deleteServer) {
  const code = syGetCode();
  if (!code) { window.closeSyncModal(null); return; }
  syErr('');
  syBusy(true);
  try {
    if (deleteServer) {
      // Erst alles Ausstehende verwerfen und die laufende Upload-Kette abwarten, sonst kann ein
      // PUT das DELETE überholen und den Serverstand wieder anlegen.
      clearTimeout(_syTimer); _syTimer = null; _syPending = null;
      clearTimeout(_syRetryTimer); _syRetryTimer = null;
      _syWaiters.splice(0).forEach((w) => w());
      await _syChain;
      const r = await syApi('DELETE', code);
      if (!syOk(r)) {
        syErr('Die Serverdaten konnten nicht gelöscht werden. ' + syErrText(r.status) + ' Der Sync bleibt aktiv.');
        window._syncProgress(syLocalItems()).catch(() => {}); // verworfenen Stand wieder einreihen
        return;
      }
    }
    clearTimeout(_syTimer); _syTimer = null; _syPending = null;
    clearTimeout(_syRetryTimer); _syRetryTimer = null;
    _syWaiters.splice(0).forEach((w) => w());
    syForgetCode();
    updateSyncUI();
    window.closeSyncModal(null);
    setSyncStatus(deleteServer ? 'Sync beendet, Serverdaten gelöscht' : 'Sync beendet', 3500);
  } catch (_) {
    syErr(syErrText(0) + ' Der Sync bleibt aktiv.');
    if (syGetCode()) window._syncProgress(syLocalItems()).catch(() => {});
  } finally {
    syBusy(false);
  }
}

// Tastatur im Modal: Tab bleibt im Dialog (Escape schließt der globale Handler).
function syTrapTab(e) {
  if (e.key !== 'Tab') return;
  const box = $id('sync-box');
  const list = Array.from(box.querySelectorAll('button,input,[tabindex="0"]'))
    .filter((el) => !el.disabled && el.offsetParent !== null);
  if (!list.length) return;
  const first = list[0], last = list[list.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

// ── Verdrahtung und Start ───────────────────────────────────────────
$id('sy-create').addEventListener('click', syCreate);
$id('sy-enter-form').addEventListener('submit', (e) => { e.preventDefault(); syEnter(); });
$id('sy-copy').addEventListener('click', syCopy);
$id('sy-done').addEventListener('click', () => window.closeSyncModal(null));
$id('sy-end-open').addEventListener('click', () => syShow('end'));
$id('sy-end-local').addEventListener('click', () => syEnd(false));
$id('sy-end-server').addEventListener('click', () => syEnd(true));
$id('sy-end-cancel').addEventListener('click', () => syShow(syGetCode() ? 'code' : 'start'));
$id('auth-user').addEventListener('click', () => window.openSyncModal('code'));
$id('sync-overlay').addEventListener('keydown', syTrapTab);

updateSyncUI();
if (syGetCode()) _loadServerProgress();

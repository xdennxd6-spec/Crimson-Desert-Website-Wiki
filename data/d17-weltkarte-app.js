// Weltkarte (14.11.2026): Renderer der Seite "Karte" (#sec=map). Daten: data/d17-weltkarte.js (WELTKARTE, WELT_ORTE).
// Leaflet 1.9.4 liegt selbst gehostet unter vendor/ und wird erst beim Öffnen der Karte geladen (weltkarteLaden in index.html).
// Zwei Reiter: "Eigene Karte" (Kacheln aus cd_assets/weltkarte, Standard) und "MapGenie" (iframe, lädt erst beim Umschalten).
// Deep Link: #sec=map&ort=<slug> zeigt einen Ort. Alle Klassen mit Präfix wk-, CSS in app.css (Anker WELTKARTE).
let _wk = null; // { map, marker:{slug:L.Marker}, aktiv, input, liste, reiter }

function _wkNorm(s) {
  return String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
}
function _wkTreffer(q) {
  const n = _wkNorm(q).trim();
  if (!n) return [];
  // Rang: exakter Name, dann Wortanfang, dann irgendwo enthalten; innerhalb des Rangs kürzere Namen zuerst
  const t = [];
  for (const o of WELT_ORTE) {
    const de = _wkNorm(o[3]), en = _wkNorm(o[4]);
    const r = (de === n || en === n) ? 0 : (de.startsWith(n) || en.startsWith(n)) ? 1
      : (de.includes(' ' + n) || en.includes(' ' + n)) ? 2 : (de.includes(n) || en.includes(n)) ? 3 : -1;
    if (r >= 0) t.push([r, Math.min(de.length, en.length), o]);
  }
  return t.sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2]);
}

function _wkBauen(root) {
  const nOrte = WELT_ORTE.length;
  root.innerHTML =
    '<div class="wk">' +
      '<div class="wk-bar">' +
        '<div class="cd-pills wk-tabs" role="group" aria-label="Kartenquelle">' +
          '<button type="button" class="cd-pill" data-wk="eigen" aria-pressed="true">Eigene Karte</button>' +
          '<button type="button" class="cd-pill" data-wk="mg" aria-pressed="false">MapGenie mit Markern</button>' +
        '</div>' +
        '<div class="wk-such" role="search">' +
          '<input type="search" id="wk-q" autocomplete="off" spellcheck="false" placeholder="Ort suchen, deutsch oder englisch" aria-label="Ort auf der Karte suchen" aria-controls="wk-liste">' +
          '<ul class="wk-liste" id="wk-liste" role="listbox" aria-label="Gefundene Orte" hidden></ul>' +
        '</div>' +
        '<label class="wk-nam"><input type="checkbox" id="wk-namen" checked> Ortsnamen</label>' +
        ('caches' in window ? '<button type="button" class="cd-pill wk-off" id="wk-off" title="Alle Kacheln (rund 6 MB) im Browser speichern, danach geht die Karte auch ohne Internet">📥 Offline speichern</button>' : '') +
      '</div>' +
      '<div class="wk-rahmen" id="wk-eigen">' +
        '<div class="wk-karte" id="wk-karte" data-lenis-prevent role="application" aria-label="Weltkarte von Pywel, mit Maus oder Fingern verschieben und zoomen"></div>' +
        '<button type="button" class="wk-voll" id="wk-voll" title="Vollbild" aria-label="Karte im Vollbild zeigen">⛶</button>' +
      '</div>' +
      '<p class="wk-hin">Selbst erstellt aus den Spieldateien (Stand Patch ' + escHtml(WELTKARTE.patch) + '), ' + nOrte +
        ' benannte Orte. Ortsnamen erscheinen ab mittlerer Zoomstufe. Spielwelt © Pearl Abyss.</p>' +
    '</div>';

  // MapGenie-iframe aus der Sektion in einen zweiten Reiter umziehen (lädt erst beim Umschalten)
  const mg = document.getElementById('wk-mg');
  if (mg) { root.querySelector('.wk').insertBefore(mg, root.querySelector('.wk-hin')); mg.hidden = true; }

  const Z = WELTKARTE.zmax, V = WELTKARTE.voll;
  const crs = L.extend({}, L.CRS.Simple, { transformation: new L.Transformation(1 / 2 ** Z, 0, 1 / 2 ** Z, 0) });
  // zoomSnap 1: ganze Stufen, Bruchteile skalieren die Kacheln krumm und zeigen Fugenlinien
  const map = L.map('wk-karte', { crs, minZoom: 1, maxZoom: Z + 2, zoomSnap: 1, attributionControl: true, zoomControl: true });
  const pt = (x, y) => map.unproject([x, y], Z);
  const welt = L.latLngBounds(pt(0, 0), pt(V, V));
  map.setMaxBounds(welt.pad(0.15));
  map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>');
  // Kachelverzeichnis (WELTKARTE.kacheln, Bitfeld je Stufe): fehlende Meerkacheln gar nicht erst anfragen
  const leer = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const bits = {};
  for (const [z, [n, b64]] of Object.entries(WELTKARTE.kacheln || {})) bits[z] = { n, b: Uint8Array.from(atob(b64), c => c.charCodeAt(0)) };
  const hat = (z, x, y) => {
    const t = bits[z]; if (!t) return true;
    if (x < 0 || y < 0 || x >= t.n || y >= t.n) return false;
    const i = y * t.n + x; return !!(t.b[i >> 3] & (0x80 >> (i & 7)));
  };
  const Kacheln = L.TileLayer.extend({
    getTileUrl(c) { return hat(this._getZoomForUrl(), c.x, c.y) ? L.TileLayer.prototype.getTileUrl.call(this, c) : leer; }
  });
  new Kacheln('cd_assets/weltkarte/{z}/{x}/{y}.webp', {
    minZoom: 0, maxNativeZoom: Z, maxZoom: Z + 2, bounds: welt, noWrap: true, tileSize: WELTKARTE.kachel,
    attribution: 'Karte: Crimson Desert Wiki aus Spieldaten · © Pearl Abyss',
    // reine Meerkacheln gibt es nicht: transparentes Bild statt Fehlersymbol, der Hintergrund ist Meeresfarbe
    errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }).addTo(map);
  // Startansicht: das Land (ohne leeres Meer im Süden/Osten). Mit ganzen Zoomstufen rundet fitBounds oft eine Stufe
  // zu weit heraus; passt das Land zu drei Vierteln in die nächste Stufe, diese nehmen.
  const land = L.latLngBounds(pt(0, 0), pt(19500, 20500));
  map.fitBounds(land);
  const kasten = document.getElementById('wk-karte');
  const passt = Math.min(kasten.clientWidth / (19500 / 2 ** (Z - map.getZoom() - 1)), kasten.clientHeight / (20500 / 2 ** (Z - map.getZoom() - 1)));
  if (passt >= 0.75) map.setView(land.getCenter(), map.getZoom() + 1, { animate: false });

  const marker = {};
  const ebene = L.layerGroup();
  for (const [s, x, y, de, en] of WELT_ORTE) {
    const m = L.marker(pt(x, y), {
      title: de === en ? de : de + ' (' + en + ')', riseOnHover: true, keyboard: false,
      icon: L.divIcon({ className: 'wk-ort', html: '<i></i><span>' + escHtml(de) + '</span>', iconSize: null, iconAnchor: [5, 5] })
    });
    m.on('click', () => _wkZeige(s, { fliegen: false }));
    marker[s] = m; m.addTo(ebene);
  }
  ebene.addTo(map);
  const box = document.getElementById('wk-karte');
  const zoomKlasse = () => {
    const z = map.getZoom();
    box.classList.toggle('wk-z-aus', z < 3);
    box.classList.toggle('wk-z-punkt', z >= 3 && z < 5);
  };
  map.on('zoomend', zoomKlasse); zoomKlasse();

  _wk = { map, marker, pt, aktiv: '', input: root.querySelector('#wk-q'), liste: root.querySelector('#wk-liste'), reiter: 'eigen' };

  // Suche
  const zeigeListe = () => {
    const t = _wkTreffer(_wk.input.value).slice(0, 8);
    if (!_wk.input.value.trim()) { _wk.liste.hidden = true; _wk.liste.innerHTML = ''; return; }
    _wk.liste.innerHTML = t.length
      ? t.map((o, i) => '<li role="option" id="wk-o-' + i + '" data-ort="' + o[0] + '"><b>' + escHtml(o[3]) + '</b>' +
          (o[4] !== o[3] ? '<small>' + escHtml(o[4]) + '</small>' : '') + '</li>').join('')
      : '<li class="wk-leer" aria-disabled="true">Kein Ort mit diesem Namen auf der Karte</li>';
    _wk.liste.hidden = false;
  };
  _wk.input.addEventListener('input', zeigeListe);
  _wk.input.addEventListener('keydown', e => {
    const items = [..._wk.liste.querySelectorAll('li[data-ort]')];
    const i = items.findIndex(li => li.classList.contains('wk-sel'));
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); if (!items.length) return;
      const n = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items.forEach(li => li.classList.remove('wk-sel')); items[n].classList.add('wk-sel');
      _wk.input.setAttribute('aria-activedescendant', items[n].id);
    } else if (e.key === 'Enter') {
      e.preventDefault(); const li = items[i >= 0 ? i : 0]; if (li) { _wkZeige(li.dataset.ort); _wk.liste.hidden = true; }
    } else if (e.key === 'Escape') { _wk.liste.hidden = true; }
  });
  _wk.liste.addEventListener('mousedown', e => {
    const li = e.target.closest('li[data-ort]'); if (!li) return;
    e.preventDefault(); _wkZeige(li.dataset.ort); _wk.liste.hidden = true;
  });
  _wk.input.addEventListener('blur', () => setTimeout(() => { _wk.liste.hidden = true; }, 120));

  root.querySelector('#wk-namen').addEventListener('change', e => box.classList.toggle('wk-ohne-namen', !e.target.checked));
  root.querySelectorAll('.wk-tabs .cd-pill').forEach(b => b.addEventListener('click', () => _wkReiter(b.dataset.wk)));
  root.querySelector('#wk-voll').addEventListener('click', () => {
    const r = document.getElementById('wk-eigen');
    if (document.fullscreenElement) document.exitFullscreen(); else if (r.requestFullscreen) r.requestFullscreen();
  });
  document.addEventListener('fullscreenchange', () => setTimeout(() => map.invalidateSize(), 60));

  // Offline speichern: alle vorhandenen Kacheln (Bitfeld) in einen eigenen Vorrat legen. Der Service Worker
  // sucht Bilder in allen Vorräten (caches.match) und behält diesen bei Versionswechseln (WK_OFFLINE in sw.js).
  const off = root.querySelector('#wk-off');
  if (off) {
    const NAME = 'cd-weltkarte-offline';
    const alle = [];
    for (const [z, t] of Object.entries(bits))
      for (let i = 0; i < t.n * t.n; i++)
        if (t.b[i >> 3] & (0x80 >> (i & 7))) alle.push(new URL('cd_assets/weltkarte/' + z + '/' + (i % t.n) + '/' + Math.floor(i / t.n) + '.webp', location.href).href);
    caches.open(NAME).then(c => c.keys()).then(k => { if (k.length >= alle.length) { off.textContent = '✅ Offline gespeichert'; off.dataset.fertig = '1'; } }).catch(() => {});
    off.addEventListener('click', async () => {
      if (off.disabled || off.dataset.fertig) return;
      off.disabled = true;
      try {
        const c = await caches.open(NAME);
        const da = new Set((await c.keys()).map(r => r.url));
        const offen = alle.filter(u => !da.has(u));
        let fertig = alle.length - offen.length, fehler = 0, pos = 0;
        const zeig = () => { off.textContent = '📥 ' + Math.floor(fertig * 100 / alle.length) + ' %'; };
        zeig();
        const arbeiter = async () => {
          while (pos < offen.length) {
            const u = offen[pos++];
            try { const r = await fetch(u); if (r.ok) { await c.put(u, r); fertig++; } else fehler++; } catch (e) { fehler++; }
            if (fertig % 50 === 0) zeig();
          }
        };
        await Promise.all(Array.from({ length: 6 }, arbeiter));
        if (fehler) { off.textContent = '⚠️ ' + fehler + ' fehlen, nochmal tippen'; off.disabled = false; }
        else { off.textContent = '✅ Offline gespeichert'; off.dataset.fertig = '1'; }
      } catch (e) { off.textContent = '⚠️ Speichern nicht möglich'; off.disabled = false; }
    });
  }
}

function _wkReiter(w) {
  if (!_wk) return;
  _wk.reiter = w;
  document.querySelectorAll('.wk-tabs .cd-pill').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.wk === w)));
  const eigen = document.getElementById('wk-eigen'), mg = document.getElementById('wk-mg');
  eigen.hidden = w !== 'eigen';
  document.querySelector('.wk-such').hidden = w !== 'eigen';
  document.querySelector('.wk-nam').hidden = w !== 'eigen';
  if (mg) {
    mg.hidden = w !== 'mg';
    const f = document.getElementById('mapgenie-frame');
    if (w === 'mg' && f && !f.getAttribute('src') && f.dataset.src) f.src = f.dataset.src;
  }
  if (w === 'eigen') setTimeout(() => _wk.map.invalidateSize(), 30);
}

function _wkZeige(slug, o) {
  o = o || {};
  if (!_wk || !_wk.marker[slug]) return false;
  if (_wk.reiter !== 'eigen') _wkReiter('eigen');
  if (_wk.aktiv && _wk.marker[_wk.aktiv]) {
    const alt = _wk.marker[_wk.aktiv].getElement(); if (alt) alt.classList.remove('wk-an');
  }
  _wk.aktiv = slug;
  const m = _wk.marker[slug], ort = WELT_ORTE.find(x => x[0] === slug);
  if (o.sofort) _wk.map.setView(m.getLatLng(), 6, { animate: false });
  else if (o.fliegen !== false) _wk.map.flyTo(m.getLatLng(), Math.max(_wk.map.getZoom(), 6), { duration: 0.8 });
  const an = () => { const el = m.getElement(); if (el) el.classList.add('wk-an'); };
  an(); _wk.map.once('moveend', an);
  if (ort) _wk.input.value = ort[3];
  const h = '#sec=map&ort=' + slug;
  if (location.hash !== h) history.replaceState(null, '', h);
  return true;
}

// Einstieg aus index.html (renderWeltkarte): opts.ort = Slug aus dem Hash, opts.suche = Begriff aus dem Fundort-Fenster
function weltkarteRender(root, opts) {
  opts = opts || {};
  const neu = !_wk;
  if (neu) _wkBauen(root);
  // Erst nach dem Sichtbarwerden vermessen, sonst rechnet Leaflet mit Größe 0 und der Sprung zum Ort geht ins Leere
  setTimeout(() => {
    _wk.map.invalidateSize();
    if (opts.ort && _wkZeige(opts.ort, { sofort: neu })) return;
    if (opts.suche) {
      const t = _wkTreffer(opts.suche);
      if (t.length) _wkZeige(t[0][0], { sofort: neu });
      else { _wk.input.value = opts.suche; _wk.input.dispatchEvent(new Event('input')); }
    }
  }, 60);
}

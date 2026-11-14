// Crimson Desert Guide — Service Worker
// Network-First fuer index.html + data/*.js, Stale-while-Revalidate fuer Assets & CDN-Bilder
const CACHE_VERSION = 'cd-guide-v60';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

const CORE_ASSETS = [
  './',
  './index.html',
  './site.webmanifest',
  './app.css',
  './consent.js?v=2',
  './data/d00-de-namen.js?v=e8a267806f',
  './data/d01-weapons.js?v=4c2a958adb',
  './data/d02-crafting.js?v=10a2fd48cd',
  './data/d03-main-quests.js?v=df369aba6f',
  './data/d04-armor-imgs.js?v=14c298e4c8',
  './data/d05-fac-data.js?v=f38e5817d5',
  './data/d06-items.js?v=fb0d7ab2f6',
  './data/d07-patches.js?v=1602a4b1c2',
  './data/d08-ruins-data.js?v=c20bbd8150',
  './data/d09-scenes.js?v=5cc68f1271',
  './data/d10-enemy-drops.js?v=6309ff85a7',
  './data/d11-fac-quest-imgs.js?v=a185e7aad3',
  './data/d12-dlc.js?v=9ec53fa1a1',
  './data/d13-romanze.js?v=6f08b281cc',
  './data/d14-beschaffung.js?v=41df301ac2',
  './data/d14-reit.js?v=6b0ec13e59',
  './data/d15-inseln.js?v=82ea433e0b',
  './data/d15-inseln-app.js?v=cfb358679c',
  './data/d17-weltkarte.js?v=9e4a742ffb',
  './data/d17-weltkarte-app.js?v=0764dc55b9',
  './vendor/leaflet-1.9.4.min.js',
  './vendor/leaflet-1.9.4.css',
  './vendor/gsap-3.15.0.min.js',
  './vendor/ScrollTrigger-3.15.0.min.js',
  './vendor/SplitText-3.15.0.min.js',
  './vendor/lenis-1.3.26.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CORE_CACHE)
      // Einzel-Adds statt addAll(): addAll ist atomar (ein 404 wirft alle Assets aus dem
      // Precache), und ein pauschales .catch() hat das bisher still verschluckt -- damit
      // fehlte im Zweifel sogar index.html offline. Promise.allSettled cached jedes Asset
      // fuer sich; "partial erlaubt" bleibt also das Verhalten, nur nicht mehr alles-oder-nichts.
      .then(c => Promise.allSettled(CORE_ASSETS.map(p => c.add(p))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      // cd-weltkarte-offline: vom Besucher per Knopf gespeicherte Kartenkacheln, bleibt über Versionswechsel erhalten
      Promise.all(keys.filter(k => !k.startsWith(CACHE_VERSION) && k !== 'cd-weltkarte-offline').map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // Network-First fuer HTML und die ausgelagerten Datendateien — User soll Updates sehen.
  // data/*.js muss mit index.html synchron bleiben, darf also nie stale ausgeliefert werden.
  const istDatenSkript = url.origin === self.location.origin && url.pathname.startsWith('/data/') && url.pathname.endsWith('.js');
  const istAppCss = url.origin === self.location.origin && url.pathname === '/app.css';
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/' || istDatenSkript || istAppCss) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          // Clone SOFORT ziehen — sonst Race: Body kann schon konsumiert sein
          if (r.ok) {
            const clone = r.clone();
            caches.open(CORE_CACHE).then(c => c.put(e.request, clone).then(() => {
              // Datendateien tragen seit 10.11.2026 einen Pruefwert (?v=...): aeltere Fassungen derselben Datei
              // aus dem Vorrat nehmen, sonst waechst er mit jeder Datenaenderung.
              if (!istDatenSkript) return;
              return c.keys().then(ks => Promise.all(ks.filter(k => { const u = new URL(k.url); return u.pathname === url.pathname && u.search !== url.search; }).map(k => c.delete(k))));
            }));
          }
          return r;
        })
        // NIE index.html als Skript-Fallback liefern — HTML als JS geparst crasht die Seite
        // app.css und data/*.js tragen einen Pruefwert (?v=...): offline zaehlt jede vorhandene Fassung
        .catch(() => caches.match(e.request, { ignoreSearch: istAppCss || istDatenSkript }).then(r => r || (istDatenSkript || istAppCss ? Response.error() : caches.match('./index.html'))))
    );
    return;
  }

  // Lokale Assets: Stale-while-Revalidate (sofort aus Cache, im Hintergrund aktualisieren).
  // /vendor/ (Leaflet, GSAP, Lenis; Versionsnummer im Dateinamen) gehört dazu, sonst fehlen die Bibliotheken offline.
  if (url.origin === self.location.origin && url.pathname.startsWith('/vendor/') || url.pathname.startsWith('/cd_assets/') || url.pathname.endsWith('.webmanifest') || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.webp') || url.pathname.endsWith('.mp4')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(resp => {
          if (resp.ok && resp.type === 'basic') {
            const clone = resp.clone();
            caches.open(ASSET_CACHE).then(c => c.put(e.request, clone));
          }
          return resp;
        }).catch(() => cached || Response.error());
        // NIE index.html als Bild-Fallback liefern — lieber sauberer Netzwerkfehler
        return cached || fetchPromise;
      })
    );
    return;
  }

  // CDN-Bilder (questlog/fextralife): Stale-while-Revalidate
  // Cross-Origin-Antworten ohne CORS sind 'opaque' (ok=false) — trotzdem cachen
  if (url.hostname.includes('questlog.gg') || url.hostname.includes('fextralifeimages.com') || url.hostname.includes('gamerantimages.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(r => {
          if (r.ok || r.type === 'opaque') {
            const clone = r.clone();
            caches.open(ASSET_CACHE).then(c => c.put(e.request, clone));
          }
          return r;
        }).catch(() => cached || Response.error());
        return cached || fetchPromise;
      })
    );
  }
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

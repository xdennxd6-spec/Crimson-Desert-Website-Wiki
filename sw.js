// Crimson Desert Guide — Service Worker
// Network-First fuer index.html + data/*.js, Stale-while-Revalidate fuer Assets & CDN-Bilder
const CACHE_VERSION = 'cd-guide-v70';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

const CORE_ASSETS = [
  './',
  './index.html',
  './site.webmanifest',
  './app.css',
  './consent.js?v=2',
  './data/d00-de-namen.js?v=44f5996f27',
  './data/d01-weapons.js?v=de1c28afe7',
  './data/d02-crafting.js?v=28ded62c80',
  './data/d03-main-quests.js?v=d9e95bbd08',
  './data/d04-armor-imgs.js?v=96dd1f7141',
  './data/d05-fac-data.js?v=4517311cb3',
  './data/d06-items.js?v=966af5998e',
  './data/d07-patches.js?v=8c73823473',
  './data/d08-ruins-data.js?v=1584c23442',
  './data/d09-scenes.js?v=09b7712c8d',
  './data/d10-enemy-drops.js?v=68d552c789',
  './data/d11-fac-quest-imgs.js?v=13947fead7',
  './data/d12-dlc.js?v=ca18096e80',
  './data/d13-romanze.js?v=1beb4059c6',
  './data/d14-beschaffung.js?v=cfab8a9b0f',
  './data/d14-reit.js?v=ebe0ae09b3',
  './data/d15-inseln.js?v=a4a26ee859',
  './data/d15-inseln-app.js?v=7e8bd04f7b',
  './data/d16-loesungen.js?v=0af7b511cc',
  './data/d16-loesungen-app.js?v=fef338ee99',
  './data/d17-weltkarte.js?v=9e4a742ffb',
  './data/d17-weltkarte-app.js?v=0764dc55b9',
  './data/d18-synthese-blaupausen.js?v=19ad86c9f6',
  // 11/2026 (Performance-Paket): die ausgelagerten App-Blöcke aus js/app-*.js —
  // gleiche Behandlung wie data/*.js (network-first, ?v=-Prüfwert), sonst fehlen sie offline.
  './js/app-01-fundament.js?v=3d44d0d874',
  './js/app-02-core.js?v=e15753a7f2',
  './js/app-03-sync.js?v=65b3ea6cb2',
  './js/app-04-ruinen.js?v=0a812ea75d',
  './js/app-05-motion-kern.js?v=834da11c34',
  './js/app-06-motion-effekte.js?v=545e26befc',
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
  // 11/2026 (Performance-Paket): /js/app-*.js genauso behandeln wie data/*.js —
  // network-first mit ?v=-Prüfwert, alte Fassungen werden aus dem Vorrat entfernt.
  const istDatenSkript = url.origin === self.location.origin && (url.pathname.startsWith('/data/') || url.pathname.startsWith('/js/app-')) && url.pathname.endsWith('.js');
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

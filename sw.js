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
  './data/d00-de-namen.js?v=4f661ed9c1',
  './data/d01-weapons.js?v=696c5033f8',
  './data/d02-crafting.js?v=9f8afe1668',
  './data/d03-main-quests.js?v=2cd8f88b03',
  './data/d04-armor-imgs.js?v=c4368f3538',
  './data/d05-fac-data.js?v=be4d594a22',
  './data/d06-items.js?v=383573514a',
  './data/d07-patches.js?v=7f40a010ac',
  './data/d08-ruins-data.js?v=1584c23442',
  './data/d09-scenes.js?v=b7d24fb7d6',
  './data/d10-enemy-drops.js?v=68d552c789',
  './data/d11-fac-quest-imgs.js?v=333e3d7e70',
  './data/d12-dlc.js?v=13a1a22440',
  './data/d13-romanze.js?v=ac00eaa452',
  './data/d14-beschaffung.js?v=044af75735',
  './data/d14-reit.js?v=ca231c4d49',
  './data/d15-inseln.js?v=a4a26ee859',
  './data/d15-inseln-app.js?v=e5d65402a7',
  './data/d16-loesungen.js?v=bfccfe91e2',
  './data/d16-loesungen-app.js?v=88b6035564',
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
      Promise.all(keys.filter(k => !k.startsWith(CACHE_VERSION)).map(k => caches.delete(k)))
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

  // Lokale Assets: Stale-while-Revalidate (sofort aus Cache, im Hintergrund aktualisieren)
  if (url.pathname.startsWith('/cd_assets/') || url.pathname.endsWith('.webmanifest') || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.webp') || url.pathname.endsWith('.mp4')) {
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

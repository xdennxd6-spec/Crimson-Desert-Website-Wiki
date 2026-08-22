// Crimson Desert Guide — Service Worker
// Network-First fuer index.html + data/*.js, Stale-while-Revalidate fuer Assets & CDN-Bilder
const CACHE_VERSION = 'cd-guide-v26';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

const CORE_ASSETS = [
  './',
  './index.html',
  './site.webmanifest',
  './data/d01-weapons.js',
  './data/d02-crafting.js',
  './data/d03-main-quests.js',
  './data/d04-armor-imgs.js',
  './data/d05-fac-data.js',
  './data/d06-items.js',
  './data/d07-patches.js',
  './data/d08-ruins-data.js'
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
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/' || istDatenSkript) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          // Clone SOFORT ziehen — sonst Race: Body kann schon konsumiert sein
          if (r.ok) {
            const clone = r.clone();
            caches.open(CORE_CACHE).then(c => c.put(e.request, clone));
          }
          return r;
        })
        // NIE index.html als Skript-Fallback liefern — HTML als JS geparst crasht die Seite
        .catch(() => caches.match(e.request).then(r => r || (istDatenSkript ? Response.error() : caches.match('./index.html'))))
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

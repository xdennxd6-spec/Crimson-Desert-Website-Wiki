// Crimson Desert Guide — Service Worker
// Cache-First mit Network-Fallback fuer Assets, Network-First fuer index.html
const CACHE_VERSION = 'cd-guide-v3';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

const CORE_ASSETS = [
  './',
  './index.html',
  './site.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CORE_CACHE)
      .then(c => c.addAll(CORE_ASSETS).catch(() => {/* allow partial */}))
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

  // Network-First fuer HTML/JS — User soll Updates sehen
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    e.respondWith(
      fetch(e.request)
        .then(r => { caches.open(CORE_CACHE).then(c => c.put(e.request, r.clone())); return r; })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-First fuer Assets (Bilder, Manifest, etc.)
  if (url.pathname.startsWith('/cd_assets/') || url.pathname.endsWith('.webmanifest') || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.webp') || url.pathname.endsWith('.mp4')) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
        if (resp.ok && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(ASSET_CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match('./index.html')))
    );
    return;
  }

  // CDN-Bilder (questlog/fextralife): Stale-while-Revalidate
  if (url.hostname.includes('questlog.gg') || url.hostname.includes('fextralifeimages.com') || url.hostname.includes('gamerantimages.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(r => {
          if (r.ok) {
            const clone = r.clone();
            caches.open(ASSET_CACHE).then(c => c.put(e.request, clone));
          }
          return r;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

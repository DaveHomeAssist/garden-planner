// ═══════════════════════════════════════════════════════════
//  Raised Bed Planner — Service Worker
//  Strategy: Cache-first for all app assets, background update
//  on every fetch so the user always gets the latest version
//  silently next time they open the app.
// ═══════════════════════════════════════════════════════════

// Bump this string whenever you deploy a new version.
// The old cache is deleted automatically when the new SW activates.
const CACHE_VERSION = 'rbp-v3-r1';

// Everything the app needs to work completely offline.
// Relative to the service worker's scope (the repo root).
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './icons/icon-base.svg',
  './icons/icon-maskable.svg',
  // Google Fonts — cached on first use, not precached (avoids CORS preflight)
];

// ─── Install: precache the shell ────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      // Individual adds so one 404 doesn't abort the whole install
      return Promise.allSettled(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(err =>
            console.warn('[SW] precache miss:', url, err.message)
          )
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ─── Activate: delete stale caches ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch: cache-first with stale-while-revalidate ─────────────────────────
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin or Google Fonts
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === location.origin;
  const isFonts = url.hostname === 'fonts.googleapis.com' ||
                  url.hostname === 'fonts.gstatic.com';

  if (!isSameOrigin && !isFonts) return;

  event.respondWith(
    caches.open(CACHE_VERSION).then(async cache => {
      const cached = await cache.match(request);

      // Kick off a background network fetch to refresh the cache
      const networkFetch = fetch(request)
        .then(response => {
          if (response.ok || response.type === 'opaque') {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => null); // network unavailable — that's fine

      // Return cached version immediately if we have it;
      // otherwise wait for the network
      return cached || networkFetch;
    })
  );
});

// ─── Message: force-update on demand ────────────────────────────────────────
// The app can post { type: 'SKIP_WAITING' } to apply a waiting SW immediately.
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

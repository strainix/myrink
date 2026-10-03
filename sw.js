// myrink service worker: makes the app open offline.
// Bump VERSION whenever you deploy a change so installed apps pick it up.
const VERSION = 'v13';
const SHELL = `myrink-shell-${VERSION}`;
const FONTS = 'myrink-fonts';
const LIBRARY = 'myrink-library';

const SHELL_FILES = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => (k.startsWith('myrink-shell-') || k.startsWith('rinkgrid-')) && k !== SHELL).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The page itself: try the network first so updates show up, fall back to the cached copy offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(SHELL).then(c => c.put('/index.html', copy)); return res; })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Play library on GitHub: always try for the latest, fall back to the last copy offline.
  if (url.hostname === 'raw.githubusercontent.com' || url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(
      fetch(req)
        .then(res => { if (res.ok) { const copy = res.clone(); caches.open(LIBRARY).then(c => c.put(req.url, copy)); } return res; })
        .catch(() => caches.match(req.url, { cacheName: LIBRARY }).then(hit => hit || Response.error()))
    );
    return;
  }

  // Google Fonts: cache once, then serve from cache.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONTS).then(cache => cache.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
        return res;
      })))
    );
    return;
  }

  // Everything else on this site: cache first, refresh in the background.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(SHELL).then(cache => cache.match(req).then(hit => {
        const fresh = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || fresh;
      }))
    );
  }
});

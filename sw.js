// Sismes Progressive Web App Service Worker
const CACHE_NAME = 'sismes-pwa-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './data/others/custom.css',
  './tyrano/tyrano.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Core asset cache partial error:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Pass through audio/video/media and range requests directly to network
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isMedia = url.pathname.endsWith('.ogg') ||
                  url.pathname.endsWith('.m4a') ||
                  url.pathname.endsWith('.mp4') ||
                  url.pathname.endsWith('.wav') ||
                  url.pathname.endsWith('.vrm') ||
                  url.pathname.endsWith('.glb');

  if (isMedia || req.headers.has('range')) {
    // Network only for media / range requests
    return;
  }

  // Network-first with cache fallback for HTML, scripts and styles
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});

// service-worker.js

const CACHE_NAME = 'mvp-lifeline-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/assets/mvp-lifeline-logo.png',
  '/assets/mvp-lifeline-wallpaper.jpg',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
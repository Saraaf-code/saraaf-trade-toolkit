const CACHE_NAME = 'saraaf-toolkit-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/variables.css',
  './assets/css/main.css',
  './src/ui/navigation.js',
  './src/ui/app.js',
  './src/engine/converter.js',
  './src/storage/state.js',
  './Saraaf TM logo.jpg'
];

// Install Service Worker and Cache Static Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Serve Cached Content when Offline or Loading
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

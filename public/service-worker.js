// /* eslint-env serviceworker */

// const CACHE_NAME = 'langar-v1';
// const URLS_TO_CACHE = [
//   '/',
//   '/index.html',
//   '/logo192.png',
//   '/logo512.png',
//   '/manifest.json',
//   '/favicon.ico',
//   '/static/js/main.js', // make sure this is correct path
//   '/static/css/main.css',
// ];

// // Install Event
// self.addEventListener('install', (event) => {
//   self.skipWaiting(); // activate immediately
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(URLS_TO_CACHE);
//     })
//   );
// });

// // Activate Event: Clean up old caches
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((name) => {
//           if (name !== CACHE_NAME) {
//             return caches.delete(name);
//           }
//         })
//       )
//     )
//   );
//   self.clients.claim(); // control clients immediately
// });

// // Fetch Event: Serve cached or fetch and cache new
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       if (cachedResponse) return cachedResponse;

//       return fetch(event.request)
//         .then((networkResponse) => {
//           if (
//             !networkResponse ||
//             networkResponse.status !== 200 ||
//             networkResponse.type !== 'basic'
//           ) {
//             return networkResponse;
//           }

//           const responseToCache = networkResponse.clone();
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseToCache);
//           });

//           return networkResponse;
//         })
//         .catch(() => {
//           // Optionally, fallback for offline support
//         });
//     })
//   );
// });

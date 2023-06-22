const CACHE_NAME = `creathon-ffrs`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/index.html',
      '/club.html',
      '/perso.html',
      '/css/stylesheet.css',
      '/css/navbar.css',
      '/css/home.css',
      '/css/club.css',
      '/css/perso.css',
      '/assets/camera.svg',
      '/assets/check.png',
      '/assets/clock.png',
      '/assets/ffrs.png',
      '/assets/gym.svg',
      '/assets/hiking.svg',
      '/assets/hiking.png',
      '/assets/home.png',
      '/assets/logo.png',
      '/assets/nordic.svg',
      '/assets/phone.png',
      '/assets/restaurant.svg',
      '/assets/run.png',
      '/assets/swim.svg',
      '/assets/swimming.png',
      '/assets/target.svg',
      '/assets/trophy.svg',
      '/assets/user.png',
      '/assets/wine.svg',
      '/script.js',
      '/cancel-web-behavior.js',
      '/jsQR.js',
      '/qr-scan.js'
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
        }
    }
  })());
});
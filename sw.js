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
      '/assets/home.png',
      '/assets/run.png',
      '/assets/user.png',
      '/assets/restaurant.svg',
      '/assets/target.svg',
      '/assets/trophy.svg',
      '/assets/wine.svg',
      '/assets/hiking.svg',
      '/assets/nordic.svg',
      '/assets/hiking.png',
      '/assets/swim.svg',
      '/assets/swimming.png',
      '/assets/gym.svg',
      '/script.js',
      '/html5-qrcode.min.js'
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
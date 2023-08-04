
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1')
      .then(cache => cache.addAll([
        './',
        './index.html',
        // Agrega aquí los recursos que deseas cachear
      ]))
      .catch(error => console.error('Error al agregar recursos a la caché:', error))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});


  
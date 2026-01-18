‎const CACHE_NAME = 'charbuy-global-v3';
‎const ASSETS_TO_CACHE = [
‎  '/',
‎  'index.html',
‎  'https://i.ibb.co/L6V6X0s/charbuy-logo.png',
‎  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap'
‎];
‎
‎// Instalación: Cachear activos esenciales
‎self.addEventListener('install', (event) => {
‎  event.waitUntil(
‎    caches.open(CACHE_NAME).then((cache) => {
‎      return cache.addAll(ASSETS_TO_CACHE);
‎    })
‎  );
‎  self.skipWaiting();
‎});
‎
‎// Activación: Limpiar versiones antiguas de la app
‎self.addEventListener('activate', (event) => {
‎  event.waitUntil(
‎    caches.keys().then((keys) => {
‎      return Promise.all(
‎        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
‎      );
‎    })
‎  );
‎});
‎
‎// Estrategia: Network First (Priorizar red para datos de divisas y anuncios)
‎self.addEventListener('fetch', (event) => {
‎  event.respondWith(
‎    fetch(event.request).catch(() => {
‎      return caches.match(event.request);
‎    })
‎  );
‎});


‎
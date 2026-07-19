// @ts-nocheck
// Minimal Service Worker to prevent 404 errors
// This is a placeholder - replace with actual PWA service worker implementation

/** @type {ServiceWorkerGlobalScope} */
const sw = self;

// Cache name for versioning
const CACHE_NAME = 'veles-voyage-static-v1';
const ASSETS_CACHE = 'static-assets';

sw.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    Promise.all([
      sw.skipWaiting(),
      // Pre-cache essential assets if needed
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('[Service Worker] Pre-caching static assets');
          // Add essential static assets here if needed
        })
        .catch(err => console.warn('[Service Worker] Pre-caching failed:', err))
    ])
  );
});

sw.addEventListener('activate', (/** @type {ExtendableEvent} */ event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    Promise.all([
      sw.clients.claim(),
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== ASSETS_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

sw.addEventListener('fetch', (/** @type {FetchEvent} */ event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Simple cache-first strategy for static assets
  if (event.request.destination === 'image' || 
      event.request.destination === 'font' ||
      event.request.url.includes('/_next/static/')) {
    
    event.respondWith(
      caches.open(ASSETS_CACHE).then(cache => {
        return cache.match(event.request).then(response => {
          // Return cached response if available
          if (response) {
            return response;
          }
          
          // Fetch from network and cache
          return fetch(event.request).then(networkResponse => {
            // Only cache successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            const responseToCache = networkResponse.clone();
            cache.put(event.request, responseToCache);
            return networkResponse;
          }).catch(error => {
            console.error('[Service Worker] Network fetch failed:', error);
            // Return a fallback response or rethrow
            throw error;
          });
        });
      }).catch(error => {
        console.error('[Service Worker] Cache operation failed:', error);
        // Fall back to network
        return fetch(event.request);
      })
    );
  }
});

// Handle messages from client
sw.addEventListener('message', (/** @type {ExtendableMessageEvent} */ event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting');
    sw.skipWaiting();
  }
});

// Handle push notifications (placeholder)
sw.addEventListener('push', (/** @type {PushEvent} */ event) => {
  console.log('[Service Worker] Push received');
  // Handle push notification logic here
});

// Handle notification clicks
sw.addEventListener('notificationclick', (/** @type {NotificationEvent} */ event) => {
  console.log('[Service Worker] Notification clicked');
  event.notification.close();
  // Handle notification click logic here
});
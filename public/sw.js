var staticCacheName = 'neighborhood-map-static';
/* eslint-disable */
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
    return cache.addAll([
      '/',
      '/index.html'
    ])
    .catch(error => {
      
    });
  }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('neighborhood-map-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', 
function(event) 
{
  event.respondWith
  (    
    caches.match(event.request)
    .then
    (
      function(response) 
      {
        if (response !== undefined) 
        {
          return response;
        } 
      
        else 
        {        
          return fetch(event.request).then
          (
              function (response) 
              {
                let responseClone = response.clone();
                
                caches.open(staticCacheName)
                .then
                (
                  function (cache) 
                  {
                    cache.put(event.request, responseClone);
                  }
                );
                return response;
              }
          );
        }
      }
    ) 
      
  ); 

}
);
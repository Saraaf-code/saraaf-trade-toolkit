const CACHE_NAME='saraaf-toolkit-v2';
const CORE=['./','./index.html','./manifest.json','./assets/css/variables.css','./assets/css/main.css','./assets/css/toolkit.css','./assets/js/app.js','./assets/js/tool-registry.js','./assets/js/toolkit-common.js','./Saraaf TM logo.jpg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith(caches.match(event.request).then(cached=>{
    const network=fetch(event.request).then(response=>{
      if(response.ok && new URL(event.request.url).origin===location.origin){const copy=response.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));}
      return response;
    }).catch(()=>cached);
    return cached || network;
  }));
});

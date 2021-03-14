const staticOutgo = 'gbswhs-outgo-v1'
const assets = ['/']

self.addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(staticOutgo).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener('fetch', fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})

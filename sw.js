self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("static").then(function(cache) {
      cache.addAll([
        "/",
        "./js/main.js",
        "./css/style.css",
        "./index.html",
        "./data.json",
        "./images/icons/icon-72x72.png",
        "./images/icons/icon-96x96.png",
        "./images/icons/icon-128x128.png",
        "./images/icons/icon-144x144.png",
        "./images/icons/icon-152x152.png",
        "./images/icons/icon-192x192.png",
        "./images/icons/icon-384x384.png",
        "./images/icons/icon-512x512.png",
        "./images/eloquence.png",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        "https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      ]);
    })
  );
});
self.addEventListener("activate", function() {
  console.log("activated");
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) {
        return res;
      } else {
        return fetch(event.request);
      }
    })
  );
});

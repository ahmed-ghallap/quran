self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open("static")
        .then(cache => {
            return cache.addAll([
                "./", "./master.js", "./helpers.js", 
                "./icons"
            ]);
        })
    );
});


self.addEventListener('fetch', e => {
    e.respondeWith(
        caches.match(e.request)
        .then(response => {
            return response || fetch(e.request);
        })
    );
});
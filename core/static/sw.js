const CACHE_NAME = "axiom-legacy-app-shell-v2";
const SHELL_URLS = [
    "/app/legacy",
    "/static/app.css",
    "/static/app.js",
    "/static/manifest.webmanifest",
    "/static/icons/axiom-mark.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_URLS)),
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key)),
            ),
        ),
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    if (
        requestUrl.pathname.startsWith("/overview") ||
        requestUrl.pathname.startsWith("/recent") ||
        requestUrl.pathname.startsWith("/search") ||
        requestUrl.pathname.startsWith("/add") ||
        requestUrl.pathname.startsWith("/upload") ||
        requestUrl.pathname.startsWith("/item/") ||
        requestUrl.pathname.startsWith("/file/") ||
        requestUrl.pathname.startsWith("/archive/") ||
        requestUrl.pathname.startsWith("/restore/") ||
        requestUrl.pathname.startsWith("/artifacts")
    ) {
        return;
    }

    if (requestUrl.pathname === "/app/legacy") {
        event.respondWith(
            fetch(event.request).catch(() => caches.match("/app/legacy")),
        );
        return;
    }

    if (
        requestUrl.pathname.startsWith("/static/") ||
        requestUrl.pathname === "/sw.js"
    ) {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                if (cached) {
                    return cached;
                }
                return fetch(event.request).then((response) => {
                    const responseClone = response.clone();
                    void caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                });
            }),
        );
    }
});

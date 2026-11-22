// Offline support: pages are network-first (fresh when online, cached copy when offline),
// hashed build assets are cache-first. Map tiles from other origins are not cached.
const CACHE = "madeira2026-v2";
const ROUTES = ["", "itinerar/", "zboruri/", "harta/", "optionale/", "de-verificat/", "print/", "zi/2026-12-06/", "zi/2026-12-07/", "zi/2026-12-08/", "zi/2026-12-09/", "zi/2026-12-10/", "zi/2026-12-11/", "zi/2026-12-12/", "zi/2026-12-13/", "zi/2026-12-14/", "zi/2026-12-15/", "zi/2026-12-16/", "zi/2026-12-17/"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  const scope = self.registration.scope;
  event.waitUntil(
    caches.open(CACHE).then((cache) => Promise.allSettled(ROUTES.map((r) => cache.add(scope + r)))),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.includes("/_next/static/")) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
            return res;
          }),
      ),
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match(self.registration.scope))),
  );
});

const FILES_TO_CACHE = [
  "./public/index.html",
  "./public/css/styles.css",
  "./public/dist/script.min.js",
  "./models/transaction.js",
  "./public/js/ibd.js",
  "./public/js/index.js",
  "./public/serviceWorker.js",
  "./dist/script.min.js",
];

const APP_PREFIX = "BudgetTracker-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cachesKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheKeeplist.push(CACHE_NAME);
      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log("deleting cache: " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

cacheKeeplist.push(CACHE_NAME);

return Promise.all(
  keyList.map(function (key, i) {
    if (cacheKeeplist.indexOf(key) === -1) {
      console.log("deletinhg cache : " + keyList[i]);
      return caches.delete(keyList[i]);
    }
  })
);

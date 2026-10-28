const CACHE = "english-games-v6";
const FILES = [
  "./", "index.html", "memory.html", "quiz.html", "scramble.html",
  "hangman.html", "falling.html", "fillblank.html", "listen.html", "truefalse.html", "typing.html", "sentence.html",
  "wordsearch.html", "oddone.html", "connect.html", "dictation.html", "missing.html",
  "crossword.html", "whack.html", "wordle.html", "sort.html", "speak.html",
  "snake.html", "bingo.html", "ladder.html", "spellbee.html", "errorspot.html",
  "css/style.css", "js/common.js", "js/choice.js", "js/data.js", "icon.svg", "manifest.webmanifest"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request))
  );
});

const CACHE = "english-games-v8";
const FILES = [
  "./", "index.html", "aan.html", "alphabet.html", "balloon.html", "bingo.html", "blitz.html", "chain.html",
  "cloze.html", "collocation.html", "colorclash.html", "conditional.html", "confusing.html", "connect.html",
  "crossword.html", "decode.html", "defender.html", "defineit.html", "dialogueorder.html", "dictation.html",
  "dragon.html", "emailfix.html", "emojiquiz.html", "errorspot.html", "escape.html", "falling.html", "fillblank.html",
  "fishcatch.html", "flash.html", "formal.html", "frog.html", "gaplisten.html", "greetchat.html", "hangman.html",
  "idiom.html", "ladder.html", "listen.html", "listenq.html", "memory.html", "missing.html", "monster.html",
  "numbers.html", "oddone.html", "opposites.html", "paraphrase.html", "passive.html", "pasttense.html", "perfect.html",
  "phrasal.html", "plural.html", "prepositions.html", "questionwords.html", "quiz.html", "readdetect.html",
  "reading.html", "reported.html", "rhyme.html", "runner.html", "scramble.html", "sentence.html", "sentmatch.html",
  "shooter.html", "shoptalk.html", "simon.html", "snake.html", "snakeladder.html", "sniper.html", "sort.html",
  "speak.html", "spellbee.html", "synonym.html", "tensetime.html", "tictactoe.html", "truefalse.html", "tugwar.html",
  "typerace.html", "typing.html", "whack.html", "wordfamily.html", "wordform.html", "wordle.html", "wordsearch.html",
  "css/style.css", "js/common.js", "js/choice.js", "js/kit.js", "js/data.js", "icon.svg", "manifest.webmanifest"
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

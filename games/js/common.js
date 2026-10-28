const $ = (s, r = document) => r.querySelector(s);

const Store = {
  get(k, d) { try { const v = localStorage.getItem("ef_" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("ef_" + k, JSON.stringify(v)); } catch (e) {} }
};

function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// Difficulty ladder. A lesson takes its unit's level; ?level=1-4 overrides it.
//   opts   multiple-choice options (correct + distractors)
//   secs   seconds per question in choice games (0 = no timer)
//   pace   multiplier on how long things stay on screen or how fast they move (lower = harder)
//   lives  Hangman wrong guesses   tries  Word Guess attempts   pairs  Memory Match pairs
//   rush   Match Rush seconds      hint   hints allowed in Spell It / Scramble
//   review words from earlier lessons mixed into this lesson    similar  distractors look alike
const LEVELS = {
  1: { name: "Easy",   mm: "လွယ်",         opts: 3, secs: 0,  pace: 1.25, lives: 8, tries: 6, pairs: 4, rush: 75, hint: true,  review: 0, similar: false },
  2: { name: "Medium", mm: "အလယ်အလတ်",     opts: 4, secs: 20, pace: 1,    lives: 6, tries: 6, pairs: 6, rush: 60, hint: true,  review: 3, similar: false },
  3: { name: "Hard",   mm: "ခက်",          opts: 4, secs: 12, pace: 0.8,  lives: 5, tries: 5, pairs: 8, rush: 50, hint: true,  review: 5, similar: true },
  4: { name: "Expert", mm: "အရမ်းခက်",     opts: 4, secs: 8,  pace: 0.65, lives: 4, tries: 4, pairs: 8, rush: 40, hint: false, review: 6, similar: true }
};

// The lesson a game page was opened with (?lesson=l5 or ?lesson=boss2; ?topic= still works).
// `own` is the lesson's own words. `words` adds review words from earlier lessons at higher
// levels, or the whole unit for a boss, so every game gets a bigger and harder pool for free.
let _topic;
function getTopic() {
  if (_topic) return _topic;
  const q = new URLSearchParams(location.search);
  const id = q.get("lesson") || q.get("topic");
  const bossUnit = /^boss(\d)$/.exec(id || "");
  const forced = parseInt(q.get("level"), 10);
  const pick = lv => (LEVELS[forced] ? forced : lv) || 1;
  if (bossUnit) {
    const u = UNITS.find(x => x.n === +bossUnit[1]) || UNITS[0];
    const own = TOPICS.filter(t => t.unit === u.n).flatMap(t => t.words);
    return (_topic = { id: "boss" + u.n, boss: true, unit: u.n, icon: "👑", name: "Unit " + u.n + " Boss", mm: u.title,
      level: pick(u.level), own, words: own, review: [] });
  }
  const base = TOPICS.find(t => t.id === id) || TOPICS[0];
  const level = pick(base.unit ? UNITS.find(u => u.n === base.unit).level : 1);
  const earlier = base.unit ? TOPICS.filter(t => t.unit && TOPICS.indexOf(t) < TOPICS.indexOf(base)).flatMap(t => t.words) : [];
  const review = shuffle(earlier).slice(0, LEVELS[level].review);
  return (_topic = Object.assign({}, base, { level, own: base.words, review, words: base.words.concat(review) }));
}
function getLevel() { return LEVELS[getTopic().level]; }

// How alike two English words look: shared letters, same first/last letter, similar length.
function likeness(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  const A = new Set(a), B = new Set(b);
  const shared = [...A].filter(c => B.has(c)).length / new Set([...A, ...B]).size;
  return shared * 4 + (a[0] === b[0] ? 2 : 0) + (a.slice(-1) === b.slice(-1) ? 1 : 0) - Math.abs(a.length - b.length) * 0.4;
}

// n wrong options (not w). Capped so a question never has more than the level's option count.
// From level 3 the wrong options are picked among the words that look most like the answer.
function others(topic, w, n) {
  const LV = getLevel();
  n = Math.min(n, LV.opts - 1);
  const pool = topic.words.filter(x => x !== w);
  if (!LV.similar) return shuffle(pool).slice(0, n);
  return pool.map(x => ({ x, s: likeness(w.en, x.en) + Math.random() * 1.5 }))
    .sort((p, q) => q.s - p.s).slice(0, n).map(o => o.x);
}

let audioCtx;
function beep(freqs, dur) {
  if (Store.get("mute", false)) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    let t = audioCtx.currentTime;
    freqs.forEach(f => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.frequency.value = f;
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + dur);
      t += dur;
    });
  } catch (e) {}
}
const sfx = {
  ok: () => beep([660, 880], 0.12),
  bad: () => beep([220], 0.25),
  win: () => beep([523, 659, 784, 1047], 0.15)
};

function speak(text) {
  if (!("speechSynthesis" in window) || Store.get("mute", false)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = 0.85;
  speechSynthesis.speak(u);
}

function addPoints(n) { Store.set("points", Store.get("points", 0) + n); }
function saveStars(game, topic, stars) {
  const k = "stars_" + game + "_" + topic;
  if (stars > Store.get(k, 0)) Store.set(k, stars);
}
function starsHtml(n) {
  return [1, 2, 3].map(i => i <= n ? "★" : '<span class="off">★</span>').join("");
}

function renderBar(title) {
  const bar = $("#bar");
  bar.innerHTML = '<a href="index.html" aria-label="Back to menu">←</a><h1></h1><span class="lvchip"></span><button id="mute" aria-label="Sound on/off"></button>';
  $("h1", bar).textContent = title;
  const lv = getTopic().level;
  const chip = $(".lvchip", bar);
  chip.textContent = "Lv " + lv + " · " + LEVELS[lv].name;
  chip.dataset.lv = lv;
  const m = $("#mute", bar);
  const paint = () => { m.textContent = Store.get("mute", false) ? "🔇" : "🔊"; };
  paint();
  m.onclick = () => { Store.set("mute", !Store.get("mute", false)); paint(); };
}

function showResult({ title, stars, text, onAgain }) {
  const t = getTopic();
  saveStars(onAgain.gameId, t.id, stars);
  // When a game runs inside the Shwequest map (iframe), tell it how the player did.
  try {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "ef-game-result", game: onAgain.gameId, lesson: t.id, unit: t.unit || null, level: t.level, stars }, "*");
    }
  } catch (e) {}
  sfx.win();
  const o = document.createElement("div");
  o.className = "overlay";
  o.innerHTML = '<div class="dialog" role="dialog" aria-modal="true"><h2></h2><div class="stars"></div><p></p><div class="row"><button class="btn primary" id="again">Play again</button><a class="btn" href="index.html" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center">Menu</a></div></div>';
  $("h2", o).textContent = title;
  $(".stars", o).innerHTML = starsHtml(stars);
  $("p", o).textContent = text;
  document.body.appendChild(o);
  $("#again", o).focus();
  $("#again", o).onclick = () => { o.remove(); onAgain(); };
}

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

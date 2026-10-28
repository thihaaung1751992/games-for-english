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

function getTopic() {
  const id = new URLSearchParams(location.search).get("topic");
  return TOPICS.find(t => t.id === id) || TOPICS[0];
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
  bar.innerHTML = '<a href="index.html" aria-label="Back to menu">←</a><h1></h1><button id="mute" aria-label="Sound on/off"></button>';
  $("h1", bar).textContent = title;
  const m = $("#mute", bar);
  const paint = () => { m.textContent = Store.get("mute", false) ? "🔇" : "🔊"; };
  paint();
  m.onclick = () => { Store.set("mute", !Store.get("mute", false)); paint(); };
}

function showResult({ title, stars, text, onAgain }) {
  saveStars(onAgain.gameId, getTopic().id, stars);
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

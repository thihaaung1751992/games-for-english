// Building blocks for the extra games. Load after data.js, common.js and choice.js.
//   take(arr, n)      n items, cycling through a reshuffled arr if it is shorter than n
//   mcq(o)            one multiple-choice question from an answer and a pool of wrong answers
//   Q.*               ready-made vocabulary questions for a lesson word
//   ask(q)            one question in a pop-up, resolves true/false (for board and battle games)
//   runTargets(cfg)   moving targets: tap the right one before it escapes (fall / rise / swim)
//   runOrder(cfg)     put the pieces in order (sentence, dialogue, letters)
//   runType(cfg)      type the answer
// A question is { label, text, my?, small?, speak?, auto?, options[], answer, explain }, the same
// shape runChoice uses. Every game must set `play.gameId` (or `onAgain.gameId`) before showResult.

function take(arr, n) {
  if (!arr.length) return [];
  let out = [];
  while (out.length < n) out = out.concat(shuffle(arr));
  return out.slice(0, n);
}

// answer + pool of wrong answers (strings, may include the answer) -> question with the level's option count.
function mcq(o) {
  const n = (o.opts || getLevel().opts) - 1;
  const wrong = shuffle([...new Set(o.pool || [])].filter(x => x !== o.answer)).slice(0, n);
  return Object.assign({}, o, { options: shuffle([o.answer, ...wrong]) });
}

function opts4(topic, w, key) { return shuffle([w, ...others(topic, w, 3)]).map(x => x[key]); }
const Q = {
  enMy: (topic, w) => ({ label: "English → မြန်မာ", text: w.en, speak: w.en, options: opts4(topic, w, "my"), answer: w.my, explain: w.en + " = " + w.my }),
  myEn: (topic, w) => ({ label: "မြန်မာ → English", text: w.my, my: true, options: opts4(topic, w, "en"), answer: w.en, explain: w.en + " = " + w.my }),
  listen: (topic, w) => ({ label: "ကြားပြီး အဓိပ္ပါယ်ရွေးပါ", text: "🎧", speak: w.en, auto: true, options: opts4(topic, w, "my"), answer: w.my, explain: w.en + " = " + w.my }),
  hear: (topic, w) => ({ label: "ကြားတဲ့ စာလုံးကို ရွေးပါ", text: "🎧", speak: w.en, auto: true, options: opts4(topic, w, "en"), answer: w.en, explain: w.en + " = " + w.my }),
  blank: (topic, w) => ({ label: "ဝါကျကို ဖြည့်ပါ", text: blankOut(w), small: true, options: opts4(topic, w, "en"), answer: w.en, explain: w.ex + " — " + w.exMy }),
  // Burmese sentence -> the matching English sentence (other lessons' sentences are the wrong answers).
  sentence: (topic, w) => ({ label: "ဒီဝါကျနဲ့ ကိုက်တဲ့ English ဝါကျကို ရွေးပါ", text: w.exMy, my: true, small: true,
    options: shuffle([w, ...others(topic, w, 3)]).map(x => x.ex), answer: w.ex, explain: w.ex + " — " + w.exMy }),
  // The question kind rotates from a random start, so even n = 1 is not always English → Burmese.
  mixed: (topic, n) => { const off = Math.floor(Math.random() * 4); return take(topic.words, n).map((w, k) => [Q.enMy, Q.myEn, Q.blank, Q.listen][(k + off) % 4](topic, w)); }
};

// ---------- ask: a single question in a pop-up ----------
// opts.noTimer skips the level's time limit. Resolves true (right) or false (wrong or out of time).
function ask(q, opts) {
  opts = opts || {};
  const LV = getLevel();
  return new Promise(resolve => {
    const o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML = '<div class="dialog ask" role="dialog" aria-modal="true"><div class="q-label"></div><div class="q-text"></div>' +
      '<button class="btn say">🔊 Listen</button><div class="timer" hidden><i></i></div><div class="opts"></div>' +
      '<div class="fb" aria-live="polite"></div><button class="btn primary go" hidden>Continue →</button></div>';
    $(".q-label", o).textContent = q.label || "";
    const qt = $(".q-text", o);
    qt.textContent = q.text; qt.className = "q-text" + (q.my ? " my" : "");
    qt.style.fontSize = q.small ? "clamp(1.2rem, 5vw, 1.6rem)" : "clamp(1.6rem, 7vw, 2.2rem)";
    const say = $(".say", o);
    say.hidden = !q.speak; say.onclick = () => speak(q.speak);
    document.body.appendChild(o);
    if (q.speak && q.auto) speak(q.speak);
    let done = false, tick;
    function finish(ok) { clearInterval(tick); o.remove(); resolve(ok); }
    function pick(btn, ok) {
      if (done) return;
      done = true; clearInterval(tick);
      const fb = $(".fb", o);
      [...$(".opts", o).children].forEach(b => { b.disabled = true; if (b.textContent === q.answer) b.classList.add("right"); });
      if (ok) { sfx.ok(); fb.className = "fb ok"; fb.textContent = "✓ မှန်ပါတယ်!"; setTimeout(() => finish(true), 800); return; }
      sfx.bad(); if (btn) btn.classList.add("wrong");
      fb.className = "fb no"; fb.textContent = (btn ? "✗ မှားပါတယ်။ " : "⏱ အချိန်ကုန်ပါပြီ။ ") + (q.explain || "");
      const go = $(".go", o); go.hidden = false; go.focus(); go.onclick = () => finish(false);
    }
    q.options.forEach(t => {
      const b = document.createElement("button");
      b.className = "opt"; b.textContent = t;
      b.onclick = () => pick(b, t === q.answer);
      $(".opts", o).appendChild(b);
    });
    if (LV.secs && !opts.noTimer) {
      const bar = $(".timer", o); bar.hidden = false;
      const t0 = Date.now();
      tick = setInterval(() => {
        const left = Math.max(0, 1 - (Date.now() - t0) / (LV.secs * 1000));
        $("i", bar).style.transform = "scaleX(" + left + ")";
        if (left === 0) pick(null, false);
      }, 100);
    }
  });
}

// ---------- shared pieces for the round-based engines ----------
function hearts(n, max) { return "❤️".repeat(Math.max(0, n)) + "🖤".repeat(Math.max(0, max - n)); }
function starsFor(ratio) { return ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1; }
function cheer(ratio) { return ratio >= 0.9 ? "အရမ်းတော်တယ်! 🎉" : ratio >= 0.6 ? "ကောင်းပါတယ်! 👍" : "ထပ်ကြိုးစားကြည့်ပါ 💪"; }

// ---------- runTargets ----------
// cfg: { gameId, title, build(topic) -> questions, rounds = 10, lives = 3,
//        motion: "fall" | "rise" | "swim", skin: "rock" | "balloon" | "fish" | "bubble", prompt }
// The question's text is shown on top; its options move across the play area. Tap the answer.
function runTargets(cfg) {
  const topic = getTopic(), LV = getLevel();
  const ROUNDS = cfg.rounds || 10, MAXL = cfg.lives || 3, motion = cfg.motion || "fall", skin = cfg.skin || "rock";
  renderBar(cfg.title + " · " + topic.name);
  $("#app").innerHTML =
    '<div class="stats"><span>Round: <b id="rn">1</b>/' + ROUNDS + '</span><span class="hearts" id="lives"></span><span>Score: <b id="score">0</b></span></div>' +
    '<div class="panel" style="padding:12px"><div class="q-label" id="qlabel"></div><div class="q-text" id="qtext" style="margin:0"></div>' +
    '<button class="btn" id="say" style="min-height:40px;margin-top:6px">🔊 Listen</button></div>' +
    '<div class="area sky ' + motion + '" id="area"></div>';
  const AH = 360, TH = 48;
  let qs, round, lives, score, solved, streak, q, els, t0, dur, raf, locked;

  function play() { qs = take(cfg.build(topic), ROUNDS); round = 0; lives = MAXL; score = 0; solved = 0; streak = 0; paint(); next(); }
  function paint() { $("#lives").textContent = hearts(lives, MAXL); $("#score").textContent = score; }
  function next() {
    cancelAnimationFrame(raf);
    $("#area").innerHTML = "";
    if (round >= ROUNDS || lives <= 0) return end();
    q = qs[round]; round++; locked = false;
    $("#rn").textContent = round;
    $("#qlabel").textContent = q.label || cfg.prompt || "";
    const qt = $("#qtext"); qt.textContent = q.text; qt.className = "q-text" + (q.my ? " my" : "");
    qt.style.fontSize = q.small ? "clamp(1.1rem, 4.6vw, 1.5rem)" : "clamp(1.5rem, 7vw, 2.2rem)";
    $("#say").hidden = !q.speak; $("#say").onclick = () => speak(q.speak);
    if (q.speak && q.auto) speak(q.speak);
    const n = q.options.length;
    els = q.options.map((t, k) => {
      const b = document.createElement("button");
      b.className = "tg " + skin + " c" + (k % 4); b.textContent = t; b._t = t;
      if (motion === "swim") { b.style.top = (k * (AH / n) + (AH / n - TH) / 2) + "px"; b._per = (2300 + k * 450) * LV.pace; b._ph = Math.random(); }
      else { b.style.left = k % 2 ? "51%" : "1%"; b._off = [0, -95, -50, -140][k % 4]; }
      b.onclick = () => tap(b);
      $("#area").appendChild(b);
      return b;
    });
    dur = Math.max(motion === "swim" ? 4500 : 3200, (motion === "swim" ? 10500 : 9500) - round * 350) * LV.pace;
    t0 = performance.now();
    raf = requestAnimationFrame(loop);
  }
  function loop(now) {
    if (locked) return;
    const p = (now - t0) / dur, W = $("#area").clientWidth;
    els.forEach(b => {
      if (motion === "fall") b.style.top = (b._off + (AH - TH - b._off) * Math.min(p, 1)) + "px";
      else if (motion === "rise") { const s0 = AH - TH - b._off; b.style.top = (s0 + (-TH - s0) * Math.min(p, 1)) + "px"; }
      else {
        // swim: back and forth along its own row, every target on screen the whole round
        const f = ((now - t0) / b._per + b._ph) % 1, tri = f < 0.5 ? f * 2 : 2 - f * 2;
        b.style.left = (tri * (W - b.offsetWidth)) + "px";
      }
    });
    if (p >= 1) return miss();
    raf = requestAnimationFrame(loop);
  }
  function tap(b) {
    if (locked) return;
    if (b._t === q.answer) {
      locked = true; solved++; streak++;
      const pts = 10 + Math.min(streak - 1, 5) * 2; score += pts; addPoints(pts); sfx.ok();
      b.classList.add("right", "pop"); paint();
      setTimeout(next, 550);
    } else {
      streak = 0; lives--; sfx.bad(); b.disabled = true; b.classList.add("wrong"); paint();
      if (lives <= 0) { locked = true; show(); setTimeout(end, 1100); }
    }
  }
  function show() { els.forEach(b => { if (b._t === q.answer) b.classList.add("right"); }); }
  function miss() {
    locked = true; streak = 0; lives--; sfx.bad(); paint(); show();
    setTimeout(next, 1100);
  }
  function end() {
    cancelAnimationFrame(raf);
    const r = solved / ROUNDS;
    showResult({ title: cheer(r), stars: starsFor(r), text: solved + " / " + ROUNDS + " ကြိမ် မှန်တယ် · " + score + " points", onAgain: play });
  }
  play.gameId = cfg.gameId;
  play();
}

// ---------- runOrder ----------
// cfg: { gameId, title, build(topic) -> items, hint }
// item: { label?, text, my?, tokens: [pieces in the right order], join = " ", speak?, explain? }
function runOrder(cfg) {
  const topic = getTopic();
  renderBar(cfg.title + " · " + topic.name);
  $("#app").innerHTML =
    '<div class="stats"><span>Item: <b id="sn">1</b>/<span id="st"></span></span><span>Score: <b id="score">0</b></span></div>' +
    '<div class="panel"><div class="q-label" id="qlabel"></div><div class="q-text" id="clue" style="font-size:clamp(1.2rem,5vw,1.6rem)"></div>' +
    '<button class="btn" id="say" style="min-height:40px">🔊 Listen</button>' +
    '<div class="chips line" id="line" aria-label="Your answer"></div><div class="chips" id="bank" aria-label="Pieces"></div>' +
    '<div class="fb" id="fb" aria-live="polite"></div>' +
    '<div class="row"><button class="btn" id="clear">Clear</button><button class="btn" id="skip">Skip</button><button class="btn primary" id="next" hidden>Next →</button></div></div>';
  let list, i, score, solved, toks, placed, locked;

  function play() { list = cfg.build(topic); i = 0; score = 0; solved = 0; $("#st").textContent = list.length; show(); }
  function show() {
    const it = list[i], sep = it.join == null ? " " : it.join;
    locked = false; placed = [];
    let arr = it.tokens.map((t, id) => ({ t, id }));
    for (let n = 0; n < 12 && arr.map(x => x.t).join(sep) === it.tokens.join(sep); n++) arr = shuffle(arr);
    toks = arr;
    $("#sn").textContent = i + 1; $("#score").textContent = score;
    $("#qlabel").textContent = it.label || "";
    const c = $("#clue"); c.textContent = it.text; c.className = "q-text" + (it.my ? " my" : "");
    $("#say").hidden = !it.speak; $("#say").onclick = () => speak(it.speak);
    $("#fb").textContent = ""; $("#fb").className = "fb";
    $("#next").hidden = true; $("#clear").disabled = false; $("#skip").disabled = false;
    draw();
  }
  function draw() {
    const line = $("#line"), bank = $("#bank");
    line.innerHTML = ""; bank.innerHTML = ""; line.className = "chips line";
    placed.forEach((p, n) => {
      const b = document.createElement("button");
      b.className = "chip placed"; b.textContent = p.t;
      b.onclick = () => { if (!locked) { placed.splice(n, 1); draw(); } };
      line.appendChild(b);
    });
    toks.forEach(p => {
      const b = document.createElement("button");
      b.className = "chip"; b.textContent = p.t;
      b.disabled = placed.some(x => x.id === p.id);
      b.onclick = () => { if (!locked) { placed.push(p); draw(); if (placed.length === toks.length) check(); } };
      bank.appendChild(b);
    });
  }
  function check() {
    const it = list[i], sep = it.join == null ? " " : it.join, line = $("#line"), fb = $("#fb");
    const ok = placed.map(p => p.t).join(sep) === it.tokens.join(sep);
    locked = true;
    if (ok) {
      solved++; score += 10; addPoints(10); sfx.ok(); if (it.speak) speak(it.speak);
      line.classList.add("good"); fb.className = "fb ok"; fb.textContent = "✓ မှန်ပါတယ်! " + (it.explain || "");
      $("#clear").disabled = true; $("#skip").disabled = true;
      const n = $("#next"); n.hidden = false; n.textContent = i === list.length - 1 ? "Finish" : "Next →"; n.focus();
      $("#score").textContent = score;
    } else {
      sfx.bad(); line.classList.add("bad"); fb.className = "fb no"; fb.textContent = "အစီအစဉ် မမှန်သေးပါဘူး၊ ထပ်ကြိုးစားပါ";
      setTimeout(() => { placed = []; fb.textContent = ""; locked = false; draw(); }, 800);
    }
  }
  function advance() {
    if (i < list.length - 1) { i++; show(); return; }
    const r = solved / list.length;
    showResult({ title: cheer(r), stars: starsFor(r), text: solved + " / " + list.length + " မှန်တယ် · " + score + " points", onAgain: play });
  }
  $("#clear").onclick = () => { if (!locked) { placed = []; draw(); } };
  $("#skip").onclick = advance;
  $("#next").onclick = advance;
  play.gameId = cfg.gameId;
  play();
}

// ---------- runType ----------
// cfg: { gameId, title, build(topic) -> items, loose }
// item: { label?, text, my?, speak?, auto?, answers: [accepted strings], hint?, explain? }
// Answers are compared lower-case, trimmed, with repeated spaces and end punctuation ignored.
function runType(cfg) {
  const topic = getTopic(), LV = getLevel();
  renderBar(cfg.title + " · " + topic.name);
  $("#app").innerHTML =
    '<div class="stats"><span>Item: <b id="wn">1</b>/<span id="wt"></span></span><span>Score: <b id="score">0</b></span></div>' +
    '<div class="panel"><div class="q-label" id="qlabel"></div><div class="q-text" id="meaning" style="font-size:clamp(1.3rem,6vw,2rem)"></div>' +
    '<button class="btn" id="say" style="min-height:40px">🔊 Listen</button>' +
    '<div><input class="input" id="inp" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Your answer"></div>' +
    '<div class="fb" id="fb" aria-live="polite"></div>' +
    '<div class="row"><button class="btn" id="hint">💡 Hint (−3)</button><button class="btn" id="skip">Skip</button><button class="btn primary" id="check">Check</button><button class="btn primary" id="next" hidden>Next →</button></div></div>';
  if (!LV.hint) $("#hint").hidden = true;
  const norm = s => String(s).toLowerCase().trim().replace(/\s+/g, " ").replace(/[.!?,;]+$/, "");
  let list, i, score, right, done, hinted;

  function play() { list = cfg.build(topic); i = 0; score = 0; right = 0; $("#wt").textContent = list.length; show(); }
  function show() {
    done = false; hinted = false;
    const it = list[i];
    $("#wn").textContent = i + 1; $("#score").textContent = score;
    $("#qlabel").textContent = it.label || "";
    const m = $("#meaning"); m.textContent = it.text; m.className = "q-text" + (it.my ? " my" : "");
    $("#say").hidden = !it.speak; $("#say").onclick = () => speak(it.speak);
    if (it.speak && it.auto) speak(it.speak);
    const inp = $("#inp"); inp.value = ""; inp.disabled = false; inp.focus();
    $("#fb").textContent = ""; $("#fb").className = "fb";
    $("#next").hidden = true; $("#check").hidden = false; $("#hint").disabled = false; $("#skip").hidden = false;
  }
  function finish() {
    $("#inp").disabled = true; $("#check").hidden = true; $("#hint").disabled = true; $("#skip").hidden = true;
    const n = $("#next"); n.hidden = false; n.textContent = i === list.length - 1 ? "Finish" : "Next →"; n.focus();
    $("#score").textContent = score;
  }
  function check() {
    if (done) return;
    const it = list[i], v = norm($("#inp").value), fb = $("#fb");
    if (!v) return;
    if (it.answers.some(a => norm(a) === v)) {
      done = true; right++; score += hinted ? 7 : 10; addPoints(hinted ? 7 : 10); sfx.ok();
      if (it.speak) speak(it.speak);
      fb.className = "fb ok"; fb.textContent = "✓ " + it.answers[0] + (it.explain ? " — " + it.explain : "");
      finish();
    } else { sfx.bad(); fb.className = "fb no"; fb.textContent = "မမှန်သေးပါဘူး၊ ထပ်ကြိုးစားပါ"; $("#inp").select(); }
  }
  $("#check").onclick = check;
  $("#inp").addEventListener("keydown", e => { if (e.key === "Enter") check(); });
  $("#hint").onclick = () => {
    const it = list[i]; hinted = true;
    const a = it.answers[0];
    $("#fb").className = "fb";
    $("#fb").textContent = "💡 " + (it.hint || a[0] + " " + a.slice(1).replace(/[^ ]/g, "_").split("").join(" ") + " (" + a.length + " letters)");
    $("#inp").focus();
  };
  $("#skip").onclick = () => {
    if (done) return;
    done = true; sfx.bad();
    const it = list[i];
    $("#fb").className = "fb no"; $("#fb").textContent = "အဖြေ: " + it.answers[0] + (it.explain ? " — " + it.explain : "");
    finish();
  };
  $("#next").onclick = () => {
    if (i < list.length - 1) { i++; show(); return; }
    const r = right / list.length;
    showResult({ title: cheer(r), stars: starsFor(r), text: right + " / " + list.length + " မှန်တယ် · " + score + " points", onAgain: play });
  };
  play.gameId = cfg.gameId;
  play();
}

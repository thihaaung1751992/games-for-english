// Shared engine for multiple-choice games.
// build(topic) returns questions: { label, text, my, speak, options[], answer, explain }
// clock: seconds. One timer for the whole run instead of one per question; the questions keep
// coming (build is called again) until it runs out.
function runChoice({ gameId, title, build, clock }) {
  const topic = getTopic();
  renderBar(title + " · " + topic.name);
  const LV = getLevel();
  $("#app").innerHTML =
    '<div class="stats"><span>Question: <b id="qn">1</b>/<span id="qt"></span></span><span>Streak: <b id="streak">0</b> 🔥</span><span>Score: <b id="score">0</b></span></div>' +
    (LV.secs || clock ? '<div class="timer"><i id="tbar"></i></div>' : '') +
    '<div class="panel"><div class="q-label" id="qlabel"></div><div class="q-text" id="qtext"></div>' +
    '<button class="btn" id="say">🔊 Listen</button><div class="opts" id="opts"></div>' +
    '<div class="fb" id="fb" aria-live="polite"></div><button class="btn primary" id="next" hidden>Next →</button></div>';

  let qs, i, correct, streak, score, answered, tick, tStart, wall, over;

  function play() {
    qs = build(topic); i = 0; correct = 0; streak = 0; score = 0; over = false;
    $("#qt").textContent = clock ? "∞" : qs.length;
    if (clock) {
      clearInterval(wall); const w0 = Date.now();
      wall = setInterval(() => {
        const left = Math.max(0, 1 - (Date.now() - w0) / (clock * 1000));
        $("#tbar").style.transform = "scaleX(" + left + ")";
        if (left === 0) { clearInterval(wall); finish(); }
      }, 100);
    }
    show();
  }
  function show() {
    answered = false;
    const q = qs[i];
    $("#qn").textContent = i + 1; $("#streak").textContent = streak; $("#score").textContent = score;
    $("#qlabel").textContent = q.label;
    const qt = $("#qtext");
    qt.textContent = q.text;
    qt.className = "q-text" + (q.my ? " my" : "");
    qt.style.fontSize = q.small ? "clamp(1.3rem, 5.5vw, 1.8rem)" : "";
    $("#say").hidden = !q.speak;
    $("#say").onclick = () => speak(q.speak);
    if (q.speak && q.auto) speak(q.speak);
    const box = $("#opts");
    box.innerHTML = "";
    q.options.forEach(o => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = o;
      b.onclick = () => choose(b, o === q.answer);
      box.appendChild(b);
    });
    $("#fb").textContent = ""; $("#fb").className = "fb";
    $("#next").hidden = true;
    startTimer();
  }
  // Levels 2-4 give each question a time limit; running out counts as a miss.
  function startTimer() {
    clearInterval(tick);
    if (!LV.secs || clock) return;
    tStart = Date.now();
    $("#tbar").style.transform = "scaleX(1)";
    tick = setInterval(() => {
      const left = Math.max(0, 1 - (Date.now() - tStart) / (LV.secs * 1000));
      $("#tbar").style.transform = "scaleX(" + left + ")";
      if (left === 0) choose(null, false);
    }, 100);
  }
  function choose(btn, ok) {
    if (answered || over) return;
    answered = true; clearInterval(tick);
    const q = qs[i], fb = $("#fb");
    [...$("#opts").children].forEach(b => { b.disabled = true; if (b.textContent === q.answer) b.classList.add("right"); });
    if (ok) {
      correct++; streak++;
      const pts = 10 + Math.min(streak - 1, 5) * 2;
      score += pts; addPoints(pts); sfx.ok();
      fb.className = "fb ok"; fb.textContent = "✓ မှန်ပါတယ်! +" + pts;
    } else {
      streak = 0; sfx.bad(); if (btn) btn.classList.add("wrong");
      fb.className = "fb no"; fb.textContent = btn ? "✗ မှားပါတယ်။" : "⏱ အချိန်ကုန်သွားပါပြီ။";
    }
    fb.appendChild(document.createElement("br"));
    fb.appendChild(document.createTextNode(q.explain));
    $("#streak").textContent = streak; $("#score").textContent = score;
    const n = $("#next");
    n.hidden = false; n.textContent = !clock && i === qs.length - 1 ? "Finish" : "Next →"; n.focus();
  }
  function finish() {
    if (over) return;
    over = true; clearInterval(tick); clearInterval(wall);
    const seen = clock ? i + (answered ? 1 : 0) : qs.length;
    const pct = clock ? Math.min(1, correct / Math.max(1, clockGoal())) : correct / qs.length;
    showResult({
      title: pct >= 0.9 ? "အရမ်းတော်တယ်! 🎉" : pct >= 0.7 ? "ကောင်းပါတယ်! 👍" : "ထပ်ကြိုးစားကြည့်ပါ 💪",
      stars: pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1,
      text: correct + " / " + seen + " မှန်တယ် · " + score + " points",
      onAgain: play
    });
  }
  // Clock runs: about one answer per 3 seconds is a full score.
  function clockGoal() { return Math.round(clock / 3); }
  $("#next").onclick = () => {
    if (i < qs.length - 1) { i++; show(); return; }
    if (clock && !over) { qs = qs.concat(build(topic)); i++; show(); return; }
    finish();
  };
  play.gameId = gameId;
  play();
}

function blankOut(w) { return w.ex.replace(new RegExp(w.en, "i"), "____"); }

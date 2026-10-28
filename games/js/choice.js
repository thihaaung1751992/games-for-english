// Shared engine for multiple-choice games.
// build(topic) returns questions: { label, text, my, speak, options[], answer, explain }
function runChoice({ gameId, title, build }) {
  const topic = getTopic();
  renderBar(title + " · " + topic.name);
  $("#app").innerHTML =
    '<div class="stats"><span>Question: <b id="qn">1</b>/<span id="qt"></span></span><span>Streak: <b id="streak">0</b> 🔥</span><span>Score: <b id="score">0</b></span></div>' +
    '<div class="panel"><div class="q-label" id="qlabel"></div><div class="q-text" id="qtext"></div>' +
    '<button class="btn" id="say">🔊 Listen</button><div class="opts" id="opts"></div>' +
    '<div class="fb" id="fb" aria-live="polite"></div><button class="btn primary" id="next" hidden>Next →</button></div>';

  let qs, i, correct, streak, score, answered;

  function play() {
    qs = build(topic); i = 0; correct = 0; streak = 0; score = 0;
    $("#qt").textContent = qs.length;
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
  }
  function choose(btn, ok) {
    if (answered) return;
    answered = true;
    const q = qs[i], fb = $("#fb");
    [...$("#opts").children].forEach(b => { b.disabled = true; if (b.textContent === q.answer) b.classList.add("right"); });
    if (ok) {
      correct++; streak++;
      const pts = 10 + Math.min(streak - 1, 5) * 2;
      score += pts; addPoints(pts); sfx.ok();
      fb.className = "fb ok"; fb.textContent = "✓ မှန်ပါတယ်! +" + pts;
    } else {
      streak = 0; sfx.bad(); btn.classList.add("wrong");
      fb.className = "fb no"; fb.textContent = "✗ မှားပါတယ်။";
    }
    fb.appendChild(document.createElement("br"));
    fb.appendChild(document.createTextNode(q.explain));
    $("#streak").textContent = streak; $("#score").textContent = score;
    const n = $("#next");
    n.hidden = false; n.textContent = i === qs.length - 1 ? "Finish" : "Next →"; n.focus();
  }
  $("#next").onclick = () => {
    if (i < qs.length - 1) { i++; show(); return; }
    const pct = correct / qs.length;
    showResult({
      title: pct >= 0.9 ? "အရမ်းတော်တယ်! 🎉" : pct >= 0.7 ? "ကောင်းပါတယ်! 👍" : "ထပ်ကြိုးစားကြည့်ပါ 💪",
      stars: pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1,
      text: correct + " / " + qs.length + " မှန်တယ် · " + score + " points",
      onAgain: play
    });
  };
  play.gameId = gameId;
  play();
}

// helper: n distractor words (not w) from the topic
function others(topic, w, n) { return shuffle(topic.words.filter(x => x !== w)).slice(0, n); }
function blankOut(w) { return w.ex.replace(new RegExp(w.en, "i"), "____"); }

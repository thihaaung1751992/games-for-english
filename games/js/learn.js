// Teaching pieces shared by the games. Load after common.js.
//   wordCard(w, ok)      DOM element: the word (tap to hear), its Burmese meaning, an example and its translation
//   showRecap(cfg)       "Words you practised" pop-up before the result; cfg = { title, items: [{ w, ok }], onClose }
//   hiliteIn(sentence, en)   DOM fragment with the word picked out in bold inside the sentence
(function () {
  const css = document.createElement("style");
  css.textContent =
    ".lcard{text-align:left;background:color-mix(in srgb,var(--accent) 10%,var(--card));border:1.5px solid color-mix(in srgb,var(--accent) 40%,var(--line));border-radius:16px;padding:10px 14px;margin:6px 0}" +
    ".lcard.miss{background:color-mix(in srgb,var(--bad) 10%,var(--card));border-color:color-mix(in srgb,var(--bad) 50%,var(--line))}" +
    ".lcard .lw{display:flex;align-items:center;gap:8px;font-size:1.25rem;font-weight:900}" +
    ".lcard .lw .st{margin-left:auto;font-size:.85rem}" +
    ".lcard .lsay{min-width:40px;min-height:40px;border-radius:50%;border:1.5px solid var(--line);background:var(--card);color:var(--ink);font-size:1rem;cursor:pointer;padding:0}" +
    ".lcard .lm{font-size:1.05rem;margin:2px 0}" +
    ".lcard .le{font-size:.95rem;line-height:1.6}" +
    ".lcard .le mark{background:color-mix(in srgb,var(--star) 35%,transparent);color:inherit;font-weight:800;border-radius:4px;padding:0 3px}" +
    ".lcard .lx{font-size:.85rem;color:var(--muted)}" +
    ".recap{max-width:520px;max-height:90vh;overflow:auto;text-align:center}" +
    ".recap .sum{color:var(--muted);margin:0 0 6px;font-size:.95rem}";
  document.head.appendChild(css);
})();

function hiliteIn(sentence, en) {
  const frag = document.createDocumentFragment();
  const i = sentence.toLowerCase().indexOf(en.toLowerCase());
  if (i < 0) { frag.appendChild(document.createTextNode(sentence)); return frag; }
  frag.appendChild(document.createTextNode(sentence.slice(0, i)));
  const m = document.createElement("mark"); m.textContent = sentence.slice(i, i + en.length); frag.appendChild(m);
  frag.appendChild(document.createTextNode(sentence.slice(i + en.length)));
  return frag;
}

function wordCard(w, ok) {
  const d = document.createElement("div");
  d.className = "lcard" + (ok === false ? " miss" : "");
  const row = document.createElement("div"); row.className = "lw";
  const t = document.createElement("span"); t.textContent = w.en;
  const b = document.createElement("button"); b.type = "button"; b.className = "lsay"; b.textContent = "🔊"; b.setAttribute("aria-label", "Listen to " + w.en);
  b.onclick = () => speak(w.en);
  row.append(t, b);
  if (ok !== undefined) { const s = document.createElement("span"); s.className = "st"; s.textContent = ok ? "✓ မှန်" : "✗ ပြန်လေ့ကျင့်ပါ"; row.appendChild(s); }
  const m = document.createElement("div"); m.className = "lm my"; m.textContent = w.my;
  const e = document.createElement("div"); e.className = "le"; e.appendChild(hiliteIn(w.ex, w.en));
  const x = document.createElement("div"); x.className = "lx my"; x.textContent = w.exMy || "";
  d.append(row, m, e, x);
  return d;
}

function showRecap({ title, items, onClose }) {
  const seen = new Map();
  items.forEach(it => { const k = it.w.en; if (!seen.has(k) || !it.ok) seen.set(k, it); });   // keep a miss if there was one
  const list = [...seen.values()].sort((a, b) => (a.ok === b.ok ? 0 : a.ok ? 1 : -1));
  const missed = list.filter(it => !it.ok).length;
  const o = document.createElement("div");
  o.className = "overlay";
  o.innerHTML = '<div class="dialog recap" role="dialog" aria-modal="true"><h2></h2><p class="sum"></p><div class="cards"></div><div class="row"><button class="btn primary" id="recapGo">Continue →</button></div></div>';
  $("h2", o).textContent = title || "📚 ဒီတစ်ပွဲမှာ လေ့ကျင့်ခဲ့တဲ့ စာလုံးများ";
  $(".sum", o).textContent = missed ? missed + " လုံး ပြန်လေ့လာဖို့ လိုတယ် — 🔊 နှိပ်ပြီး နားထောင်ပါ" : "အကုန်မှန်တယ်! ကျွမ်းကျင်နေပြီ 🎉";
  list.forEach(it => $(".cards", o).appendChild(wordCard(it.w, it.ok)));
  document.body.appendChild(o);
  $("#recapGo", o).focus();
  $("#recapGo", o).onclick = () => { o.remove(); onClose && onClose(); };
}

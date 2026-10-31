// Juice for the games: confetti, floating score pop-ups, shake, flash. Load after common.js.
//   fx.confetti(x, y, n)   burst of coloured bits from page point (x, y); no args = from the top middle
//   fx.rain(n)             confetti falling from the whole top edge (use for a win)
//   fx.pop(el, text, cls)  floating text (e.g. "+10") that rises from the middle of el
//   fx.shake(el)           quick horizontal shake (wrong answer)
//   fx.flash(el, cls)      add cls to el for 600 ms (e.g. "flash-good")
//   fx.at(el)              {x, y} page centre of an element
// Everything is skipped when the player prefers reduced motion.
const fx = (() => {
  const still = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = ["#f5b301", "#e5484d", "#3b82f6", "#2f9e44", "#8b5cf6", "#f08c2e", "#d6336c", "#17a091"];
  let layer;
  function box() {
    if (layer && layer.isConnected) return layer;
    layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:50";
    document.body.appendChild(layer);
    return layer;
  }
  function at(el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
  function confetti(x, y, n) {
    if (still()) return;
    n = n || 36;
    if (x == null) { x = innerWidth / 2; y = innerHeight * 0.3; }
    const L = box();
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      const s = 6 + Math.random() * 8, ang = Math.random() * Math.PI * 2, v = 90 + Math.random() * 190;
      p.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px;width:" + s + "px;height:" + (s * 0.6) + "px;background:" + COLORS[i % COLORS.length] +
        ";border-radius:2px;opacity:1;will-change:transform,opacity";
      L.appendChild(p);
      const dx = Math.cos(ang) * v, dy = Math.sin(ang) * v - 80, rot = (Math.random() - 0.5) * 900;
      const a = p.animate([
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: "translate(" + dx + "px," + dy + "px) rotate(" + rot / 2 + "deg)", opacity: 1, offset: 0.45 },
        { transform: "translate(" + dx * 1.15 + "px," + (dy + 320) + "px) rotate(" + rot + "deg)", opacity: 0 }
      ], { duration: 900 + Math.random() * 600, easing: "cubic-bezier(.2,.7,.4,1)" });
      a.onfinish = () => p.remove();
    }
  }
  function rain(n) {
    if (still()) return;
    n = n || 60;
    const L = box();
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      const s = 7 + Math.random() * 7;
      p.style.cssText = "position:absolute;top:-20px;left:" + Math.random() * 100 + "%;width:" + s + "px;height:" + (s * 0.6) + "px;background:" + COLORS[i % COLORS.length] + ";border-radius:2px";
      L.appendChild(p);
      const a = p.animate([
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: "translate(" + (Math.random() - 0.5) * 160 + "px," + (innerHeight + 40) + "px) rotate(" + (Math.random() - 0.5) * 1000 + "deg)", opacity: 0.9 }
      ], { duration: 1600 + Math.random() * 1600, delay: Math.random() * 600, easing: "ease-in" });
      a.onfinish = () => p.remove();
    }
  }
  function pop(el, text, cls) {
    if (!el) return;
    const { x, y } = at(el), t = document.createElement("div");
    t.textContent = text;
    t.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px;transform:translate(-50%,-50%);font-weight:900;font-size:1.5rem;color:" +
      (cls === "bad" ? "var(--bad)" : "var(--good)") + ";text-shadow:0 2px 0 rgba(0,0,0,.18),0 0 8px var(--card);white-space:nowrap";
    box().appendChild(t);
    if (still()) { setTimeout(() => t.remove(), 700); return; }
    const a = t.animate([
      { transform: "translate(-50%,-50%) scale(.6)", opacity: 0 },
      { transform: "translate(-50%,-90%) scale(1.25)", opacity: 1, offset: 0.25 },
      { transform: "translate(-50%,-230%) scale(1)", opacity: 0 }
    ], { duration: 950, easing: "ease-out" });
    a.onfinish = () => t.remove();
  }
  function shake(el) {
    if (!el || still()) return;
    el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(-5px)" }, { transform: "translateX(0)" }], { duration: 320 });
  }
  function flash(el, cls) { if (!el) return; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 600); }
  return { confetti, rain, pop, shake, flash, at };
})();

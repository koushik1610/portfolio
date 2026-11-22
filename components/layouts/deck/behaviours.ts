"use client";

import { useEffect, useState, type RefObject } from "react";
import { scrambleFrame, TIMING } from "./scramble";

export { randomLike, scrambleFrame } from "./scramble";

/* The deck's three behaviours. Each one reads prefers-reduced-motion live, so
   turning the setting on mid-visit stops the motion without a reload. */

const REDUCE = "(prefers-reduced-motion: reduce)";

/** True while the visitor asks for reduced motion. Follows the setting live. */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(REDUCE);
    const onChange = () => setReduce(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Pointer lean. The deck leans toward the cursor and opens a little as it nears.
 *  One rAF loop, smoothed, stops when it settles, pauses off screen and on hidden
 *  tabs, and writes custom properties on the deck, never React state. */
export function useFanPointer(
  hero: RefObject<HTMLElement | null>,
  stage: RefObject<HTMLElement | null>,
  deck: RefObject<HTMLElement | null>,
  reduce: boolean,
) {
  useEffect(() => {
    const h = hero.current, s = stage.current, d = deck.current;
    if (!h || !s || !d || reduce) return;
    let raf = 0;
    let onScreen = true;
    const cur = { x: 0, y: 0, n: 0 };
    const tgt = { x: 0, y: 0, n: 0 };
    const write = () => {
      d.style.setProperty("--dk-px", cur.x.toFixed(4));
      d.style.setProperty("--dk-py", cur.y.toFixed(4));
      d.style.setProperty("--dk-near", cur.n.toFixed(4));
    };
    const tick = () => {
      raf = 0;
      let moving = false;
      for (const k of ["x", "y", "n"] as const) {
        const diff = tgt[k] - cur[k];
        if (Math.abs(diff) > 0.001) { cur[k] += diff * 0.12; moving = true; } else cur[k] = tgt[k];
      }
      write();
      if (moving && onScreen && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(tick); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    /* Page-relative boxes, measured on resize rather than on every move. */
    const box = { cx: 0, cy: 0, hw: 1, hh: 1 };
    const measure = () => {
      const r = s.getBoundingClientRect();
      const hr = h.getBoundingClientRect();
      box.cx = r.left + window.scrollX + r.width / 2;
      box.cy = r.top + window.scrollY + r.height / 2;
      box.hw = Math.max(1, hr.width);
      box.hh = Math.max(1, hr.height);
    };
    measure();
    let alive = true;
    /* Web fonts change the hero's height when they land; measure again then. */
    document.fonts?.ready.then(() => { if (alive) measure(); });
    const ro = new ResizeObserver(measure);
    ro.observe(h);
    ro.observe(s);
    const onMove = (e: PointerEvent) => {
      const dx = e.pageX - box.cx, dy = e.pageY - box.cy;
      tgt.x = clamp(dx / (box.hw / 2), -1, 1);
      tgt.y = clamp(dy / (box.hh / 2), -1, 1);
      tgt.n = clamp(1 - Math.hypot(dx, dy) / (box.hw * 0.45), 0, 1);
      kick();
    };
    const onLeave = () => { tgt.x = 0; tgt.y = 0; tgt.n = 0; kick(); };
    const onVis = () => { if (document.hidden) stop(); else kick(); };
    const io = new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; if (!onScreen) stop(); });
    io.observe(h);
    h.addEventListener("pointermove", onMove);
    h.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      stop();
      io.disconnect();
      ro.disconnect();
      h.removeEventListener("pointermove", onMove);
      h.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      d.style.removeProperty("--dk-px");
      d.style.removeProperty("--dk-py");
      d.style.removeProperty("--dk-near");
    };
  }, [hero, stage, deck, reduce]);
}

/** Scramble. Words settle from scrambled letters once, when the line scrolls in.
 *  Writes only to the aria-hidden overlay spans (`.dk-w__s[data-w]`); the real
 *  words never leave the DOM. The current letters live in a local array.
 *  `rng` defaults to Math.random; pass a seeded one to test it. */
export function useScramble(line: RefObject<HTMLElement | null>, reduce: boolean, rng: () => number = Math.random) {
  useEffect(() => {
    const el = line.current;
    if (!el || reduce || el.dataset.settled) return;
    const overlays = Array.from(el.querySelectorAll<HTMLElement>(".dk-w__s"));
    const finals = overlays.map((o) => o.dataset.w ?? "");
    const shown: string[][] = finals.map((w) => w.split(""));
    let raf = 0;
    let start = 0;
    let lastStep = -1;
    const finish = () => { el.classList.remove("is-scrambling"); overlays.forEach((o) => { o.textContent = ""; }); };
    const run = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      const step = Math.floor(elapsed / TIMING.STEP);
      const settled = scrambleFrame(finals, shown, elapsed, step !== lastStep, rng);
      overlays.forEach((o, i) => { o.textContent = shown[i].join(""); });
      lastStep = step;
      if (settled) { el.dataset.settled = "1"; finish(); } else raf = requestAnimationFrame(run);
    };
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      el.classList.add("is-scrambling");
      raf = requestAnimationFrame(run);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); finish(); };
  }, [line, reduce, rng]);
}

/** Marquee pause off screen: toggles `is-off` on the marquee while it is out of view. */
export function useOffscreenPause(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => el.classList.toggle("is-off", !en.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

/** Opens the project row a card links to. On load and on every hashchange, a
 *  `#dk-p-<id>` hash opens that row's <details> and focuses its summary. */
export function useOpenFromHash(prefix: string) {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith(prefix)) return;
      const details = document.getElementById(id)?.querySelector("details");
      if (!details) return;
      details.open = true;
      details.querySelector("summary")?.focus({ preventScroll: true });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [prefix]);
}

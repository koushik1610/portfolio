"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { REST, MAX_SWING, KEY_NUDGE, MAX_THROW, advance, atRest, clamp, strapPath, type SwingState } from "./physics";

/* The badge's lanyard: a damped pendulum written by hand.

   The physics is the pure `step` in ./physics.ts. It takes a state and a time step and
   returns the next state, with no DOM. The hook `useLanyard` wires it to the page:
   it measures the rig, runs the loop, handles the pointer and the arrow keys, and
   writes two CSS custom properties and one SVG path per frame. React state holds
   only whether motion is reduced. The loop runs while the badge moves and is on
   screen, and stops when it settles or the tab is hidden. */

/* ── DOM wiring ───────────────────────────────────────────────────────────── */

/** Pixels a pointer must move before a press becomes a drag, so a tap on a link
 *  on the back of the badge is still a tap. */
const DRAG_SLOP = 5;
/** A pending frame request older than this, in ms, is treated as lost. */
const STALE_FRAME = 250;
/** How far the strap runs on above the top edge of the screen, in px. */
const STRAP_LEAD = 80;
/** The swing it is hung with on load, in rad/s. */
const HANG_SWING = 0.9;

export function useLanyard() {
  const rigRef = useRef<HTMLDivElement>(null);
  const pendRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [still, setStill] = useState(false);

  /* Measured before paint, so the strap is drawn in the first frame. */
  useLayoutEffect(() => {
    const rig = rigRef.current;
    const pend = pendRef.current;
    const badge = badgeRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!rig || !pend || !badge || !svg || !path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let s: SwingState = REST;
    let L = 0;
    let cx = 0;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    let dragging = false;
    /* Measured from the DOM: the drop from the card's top up to the middle of the
       clip's bar, where the strap loops and the badge turns on its clip. */
    let reach = 0;
    let requested = 0;
    let lead = 0;

    const draw = () => {
      pend.style.setProperty("--bd-theta", `${s.theta}rad`);
      pend.style.setProperty("--bd-phi", `${s.phi}rad`);
      path.setAttribute("d", strapPath(s, cx, L - reach, lead));
    };

    const measure = () => {
      const r = rig.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${r.width.toFixed(1)} ${r.height.toFixed(1)}`);
      cx = r.width / 2;
      L = badge.offsetTop;
      const clip = badge.querySelector<HTMLElement>(".bd-clip");
      const bar = clip?.querySelector<HTMLElement>(".bd-clip__bar");
      reach = clip && bar ? -(clip.offsetTop + bar.offsetTop + bar.offsetHeight / 2) : 0;
      badge.style.setProperty("--bd-pivot", `${(-reach).toFixed(1)}px`);
      /* Only where the rig starts at the top of the page (the desktop hero) does the
         strap run on past the edge; on a phone it hangs from a rule mid-page. */
      lead = r.top + window.scrollY < 1 ? STRAP_LEAD : 0;
      draw();
    };

    const frame = (t: number) => {
      raf = 0;
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 1 / 60);
      last = t;
      s = advance(s, dt, dragging);
      if (!dragging && atRest(s)) {
        s = REST;
        draw();
        last = 0;
        return;
      }
      draw();
      requested = performance.now();
      raf = requestAnimationFrame(frame);
    };

    /* A frame request the browser dropped (seen while a capture froze rendering) would
       leave `raf` set and the badge stuck mid-swing, so a request older than
       STALE_FRAME ms is replaced instead of trusted. */
    const kick = () => {
      if (reduce.matches || !onScreen || document.hidden) return;
      if (raf && performance.now() - requested < STALE_FRAME) return;
      if (raf) cancelAnimationFrame(raf);
      last = 0;
      requested = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const halt = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    let pid = -1;
    let sx = 0;
    let sy = 0;
    let grab = 0;
    let lastT = 0;
    let lastTheta = 0;
    let moved = false;

    const angleAt = (x: number, y: number) => {
      const r = rig.getBoundingClientRect();
      return Math.atan2(-(x - (r.left + cx)), y - r.top);
    };
    const onDown = (e: PointerEvent) => {
      if (reduce.matches || (e.pointerType === "mouse" && e.button !== 0)) return;
      pid = e.pointerId;
      sx = e.clientX;
      sy = e.clientY;
      moved = false;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pid) return;
      if (!dragging) {
        if (Math.hypot(e.clientX - sx, e.clientY - sy) < DRAG_SLOP) return;
        dragging = true;
        moved = true;
        badge.setPointerCapture(pid);
        grab = angleAt(e.clientX, e.clientY) - s.theta;
        lastT = e.timeStamp;
        lastTheta = s.theta;
        badge.classList.add("is-held");
        kick();
      }
      const theta = clamp(angleAt(e.clientX, e.clientY) - grab, -MAX_SWING, MAX_SWING);
      let { omega, alpha } = s;
      const dt = (e.timeStamp - lastT) / 1000;
      if (dt > 0.004) {
        const w = (theta - lastTheta) / dt;
        alpha = (w - omega) / dt;
        omega = omega * 0.4 + w * 0.6;
        lastT = e.timeStamp;
        lastTheta = theta;
      }
      s = { ...s, theta, omega, alpha };
    };
    const release = (e: PointerEvent) => {
      if (e.pointerId !== pid) return false;
      pid = -1;
      if (!dragging) return false;
      dragging = false;
      badge.classList.remove("is-held");
      if (badge.hasPointerCapture(e.pointerId)) badge.releasePointerCapture(e.pointerId);
      s = { ...s, omega: clamp(s.omega, -MAX_THROW, MAX_THROW), alpha: 0 };
      kick();
      return true;
    };
    const onUp = (e: PointerEvent) => {
      release(e);
    };
    /* A cancelled press never produces a click, so nothing is left to swallow. */
    const onCancel = (e: PointerEvent) => {
      release(e);
      moved = false;
    };
    const onClick = (e: MouseEvent) => {
      if (!moved) return;
      moved = false;
      e.preventDefault();
      e.stopPropagation();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.target !== badge || reduce.matches) return;
      if (e.key === "ArrowLeft") s = { ...s, omega: s.omega + KEY_NUDGE };
      else if (e.key === "ArrowRight") s = { ...s, omega: s.omega - KEY_NUDGE };
      else return;
      e.preventDefault();
      kick();
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();
    const onVisibility = () => (document.hidden ? halt() : kick());
    const onMotion = () => {
      setStill(reduce.matches);
      if (reduce.matches) {
        halt();
        if (pid !== -1 && badge.hasPointerCapture(pid)) badge.releasePointerCapture(pid);
        pid = -1;
        dragging = false;
        moved = false;
        badge.classList.remove("is-held");
        s = REST;
        draw();
      }
    };

    measure();
    setStill(reduce.matches);
    const ro = new ResizeObserver(measure);
    ro.observe(rig);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) kick();
      else halt();
    });
    io.observe(rig);

    badge.addEventListener("pointerdown", onDown);
    badge.addEventListener("pointermove", onMove);
    badge.addEventListener("pointerup", onUp);
    badge.addEventListener("pointercancel", onCancel);
    badge.addEventListener("click", onClick, true);
    badge.addEventListener("keydown", onKey);
    badge.addEventListener("dragstart", onDragStart);
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onMotion);

    /* It has just been hung up: one small swing that settles on its own. */
    s = { ...s, omega: HANG_SWING };
    kick();

    return () => {
      halt();
      ro.disconnect();
      io.disconnect();
      badge.removeEventListener("pointerdown", onDown);
      badge.removeEventListener("pointermove", onMove);
      badge.removeEventListener("pointerup", onUp);
      badge.removeEventListener("pointercancel", onCancel);
      badge.removeEventListener("click", onClick, true);
      badge.removeEventListener("keydown", onKey);
      badge.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onMotion);
    };
  }, []);

  return { rigRef, pendRef, badgeRef, svgRef, pathRef, still };
}

"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { initial, aim, leave, turn, step, type TiltState } from "./tilt";

/* The depth hero's pointer tilt: the DOM side only. The pose and hold logic is
   the pure state machine in ./tilt.ts; this file feeds it events and the time,
   and writes its `now` to two custom properties each frame. */

/* The one source for the two custom properties. TiltHero declares them on the
   hero at rest (0, 0) through its style attribute, and the effect updates them.
   styles.css reads them in `.dp-name` (the drift) and `.dp-figure` (the turn). */
const TILT_X = "--tilt-x";
const TILT_Y = "--tilt-y";
const REST = { [TILT_X]: "0", [TILT_Y]: "0" } as CSSProperties;

function usePortraitTilt() {
  const heroRef = useRef<HTMLElement>(null);
  const turnRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let s: TiltState = initial();
    let raf = 0;
    let visible = true;
    let on = false;

    const write = () => {
      hero.style.setProperty(TILT_X, s.now.x.toFixed(4));
      hero.style.setProperty(TILT_Y, s.now.y.toFixed(4));
    };
    const frame = () => {
      const next = step(s);
      s = next.state;
      write();
      raf = next.settled ? 0 : requestAnimationFrame(frame);
    };
    const run = () => {
      if (on && !raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onPointer = (e: PointerEvent) => {
      s = aim(s, { x: e.clientX, y: e.clientY }, hero.getBoundingClientRect(), performance.now());
      run();
    };
    const onLeave = (e: PointerEvent) => {
      s = leave(s, e.pointerType === "mouse");
      run();
    };
    const onVisibility = () => (document.hidden ? stop() : run());
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
      else stop();
    });
    const onTurn = () => {
      s = turn(s, performance.now());
      run();
    };

    const enable = () => {
      if (on) return;
      on = true;
      hero.addEventListener("pointermove", onPointer, { passive: true });
      hero.addEventListener("pointerdown", onPointer, { passive: true });
      hero.addEventListener("pointerleave", onLeave, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      io.observe(hero);
      turnRef.current = onTurn;
      setReady(true);
    };
    const disable = () => {
      on = false;
      stop();
      io.disconnect();
      hero.removeEventListener("pointermove", onPointer);
      hero.removeEventListener("pointerdown", onPointer);
      hero.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      s = initial();
      write();
      turnRef.current = () => {};
      setReady(false);
    };
    /* Read live: a visitor who turns reduced motion on mid-visit gets the still
       poster at once, and turning it off brings the effect back. */
    const onMotionPref = () => (reduce.matches ? disable() : enable());

    onMotionPref();
    reduce.addEventListener("change", onMotionPref);
    return () => {
      reduce.removeEventListener("change", onMotionPref);
      disable();
    };
  }, []);

  return { heroRef, ready, turn: () => turnRef.current() };
}

/** The hero section with the tilt attached, and the visible control that does
 *  the same thing without a pointer. The control stays hidden until the effect
 *  is running, so with no script or with reduced motion it is not offered. */
export function TiltHero({ className, labelledBy, children }: { className: string; labelledBy: string; children: ReactNode }) {
  const { heroRef, ready, turn: onTurn } = usePortraitTilt();
  return (
    <section className={className} aria-labelledby={labelledBy} ref={heroRef} style={REST}>
      {children}
      <button type="button" className="dp-turn" onClick={onTurn} hidden={!ready}>
        Turn the portrait
      </button>
    </section>
  );
}

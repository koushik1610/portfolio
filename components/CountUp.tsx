"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface CountUpProps {
  value: string;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

function parseNumeric(val: string): { prefix: string; num: number; suffix: string } | null {
  const match = val.match(/^([^0-9]*)([0-9,]+\.?[0-9]*)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2].replace(/,/g, ""));
  if (isNaN(num)) return null;
  return { prefix: match[1], num, suffix: match[3] };
}

function formatNum(n: number, originalVal: string): string {
  const hasComma = originalVal.includes(",");
  const hasDecimal = originalVal.includes(".");
  if (hasDecimal) return n.toFixed(2);
  if (hasComma && n >= 1000) return Math.round(n).toLocaleString("en-US");
  return Math.round(n).toString();
}

export default function CountUp({ value, duration = 1400, style, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  // `display` is seeded from `value` once, but the animation effect below bails
  // on hasAnimated and never re-enters. Without this, a later `value` change
  // would leave the visible number stale forever. No theme mutates `value`
  // today; the new themes read from lib/stats.ts, which makes it easy to start.
  useEffect(() => {
    if (!hasAnimated.current) setDisplay(value);
  }, [value]);

  useEffect(() => {
    if (reduce) { setDisplay(value); return; }
    if (!inView || hasAnimated.current) return;
    const parsed = parseNumeric(value);
    if (!parsed) return;
    hasAnimated.current = true;

    const { prefix, num, suffix } = parsed;
    const start = performance.now();
    const finalDisplay = prefix + formatNum(num, value) + suffix;

    // Failsafe: this drives itself off rAF directly, not GSAP, so it has no
    // ScrollTrigger-settle equivalent. If rAF stalls after the first tick
    // (backgrounded tab, low-power mode), `hasAnimated` is already true and
    // the effect never re-enters — the stat would freeze at a wrong
    // intermediate number forever instead of its real value. Wall-clock
    // setTimeout still fires when rAF does not, so force the final value
    // once duration has clearly elapsed.
    const settleTimer = window.setTimeout(() => setDisplay(finalDisplay), duration + 1500);

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(prefix + formatNum(current, value) + suffix);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        window.clearTimeout(settleTimer);
      }
    };

    requestAnimationFrame(tick);
    return () => window.clearTimeout(settleTimer);
  }, [inView, value, duration, reduce]);

  // The final value is carried by a visually-hidden SIBLING, not by aria-label.
  // aria-label is not permitted on an element with the generic role, and AT that
  // drops it would leave a user with only the aria-hidden span — i.e. nothing at
  // all for that stat. A real text node cannot be dropped.
  return (
    <span ref={ref} style={style} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="th-sr-only">{value}</span>
    </span>
  );
}

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

  useEffect(() => {
    if (reduce) { setDisplay(value); return; }
    if (!inView || hasAnimated.current) return;
    const parsed = parseNumeric(value);
    if (!parsed) return;
    hasAnimated.current = true;

    const { prefix, num, suffix } = parsed;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(prefix + formatNum(current, value) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, duration, reduce]);

  // aria-label carries the final value so screen readers never read intermediate ticks
  return (
    <span ref={ref} style={style} className={className} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

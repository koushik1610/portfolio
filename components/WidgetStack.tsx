"use client";

import { useEffect, useState } from "react";
import ThemeBadge from "./ThemeBadge";
import { AskAIFloat } from "./AskAI";

// The fixed top-right widget stack. Both routes (/ and /theme/[name]) must
// render this same component so the badge + Ask-AI float never drift apart.
//
// Compact-on-scroll: a real-user QA pass across all 12 themes found this
// stack (always ~250x130px, fixed at top:1rem/right:1rem) repeatedly
// clipped in-flow content that scrolled into that same screen region —
// stat numbers, headings, even a theme's own top meta bar on phones. The
// stack never shrank or moved, so anything happening to render at that
// fixed viewport coordinate lost real content. Fix: shrink to a compact
// single-line form once the page has scrolled past the very top, where a
// user is actively reading content rather than just arriving — restores
// on scroll back near the top. Threshold-based, not scroll-direction-based
// (direction-based hide/show reads twitchy on small back-and-forth scrolls;
// a fixed pixel threshold does not).
const COMPACT_THRESHOLD = 32;

export default function WidgetStack() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > COMPACT_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.4rem",
        pointerEvents: "none",
      }}
    >
      <ThemeBadge compact={compact} />
      <AskAIFloat compact={compact} />
    </div>
  );
}

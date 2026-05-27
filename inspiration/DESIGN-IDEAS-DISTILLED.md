# Design Ideas Distilled — House-Style Pattern Library
**Source:** motionsite.ai references — Asme, Aethera, 3D Portfolio, 3D Collectible, Visual Hero, Mindloop, AI Designer / Viktor Oddy  
**Stack target:** Next.js 15 static export · `motion/react` (not `framer-motion`) · Geist Sans + Mono · `globals.css` scoped CSS · no Tailwind in heroes · no video · no external asset URLs  
**Date distilled:** 2026-05-24  
**Purpose:** Reusable reference for `03-deep-theme-build.md` and `03b-flagship-cinematic-build.md`.

Read this before building any new theme. Bucket A patterns are open to all kept themes. Bucket B patterns are reserved exclusively for the cinematic flagship; using them in an everyday theme is an automatic council fail (member 1 will flag it as AI slop energy, member 8 will flag the performance cost).

---

## Hard Rejects

These are discarded wholesale — no bucket, never implement.

| Reject | Source | Why |
|--------|--------|-----|
| Any hardcoded motionsite.ai / figma.site / CloudFront asset URL | All references | External URLs break on cache expiry, expose vendor fingerprinting, and are not self-authored assets. Static export to GitHub Pages with hardcoded third-party URLs is also a copyright/ToS problem. |
| `framer-motion` import | All references (the prompts use it verbatim) | Package is `motion` v11; the correct import path is `motion/react`. `framer-motion` is a different (older) package. The prompts' code will silently break at the import layer. |
| 3D avatar / figurine of Koushik's face | 3D Portfolio (Magnet section), 3D Collectible | Dual failure: (a) uncanny valley risk — a low-poly or AI-generated face reads as toylike and undermines Staff/Principal credibility; (b) requires a custom 3D asset that doesn't exist in /public and can't be self-authored without a 3D pipeline. The *interaction pattern* (magnetic pointer follow) survives — the avatar does not. |
| Full-screen autoplay video (external) | Visual Hero, Aethera | No. External video = CDN dependency. Autoplay = no reduced-motion respect. Stack disallows it by rule. A self-authored canvas animation achieves the same visual effect with full control. |
| Glassmorphism as a system-wide aesthetic | Aethera, Viktor Oddy | `backdrop-filter: blur()` on every card surface is the single most recognizable "AI template" tell in 2025–26. Used sparingly on one element in the flagship it can read as intentional; used everywhere it reads as generated slop. Banned from everyday themes unconditionally. |
| Gradient text on body copy or headings | Aethera, Mindloop | `background-clip: text` on a gradient is the second most common AI template signal, especially when applied to main headings. The flagship may use it on ONE display-size element if concept-motivated; everyday themes never. |
| Liquid glass morphing / `border-radius` keyframe morph blobs | Aethera | No concept motivation. Purely decorative. Tanks performance on lower-end hardware. |
| Animated gradient mesh backgrounds (CSS `@keyframes` on conic/mesh gradients) | Aethera | Same problem as above — looks like every AI landing page from 2024. Performance cost high for zero differentiation. The flagship may use a self-authored WebGL/canvas alternative instead. |
| Three.js / React Three Fiber as a dependency | 3D Collectible | 250–400 kB bundle addition for a portfolio static site. Not in `package.json`. Unless the flagship concept genuinely requires WebGL, use Canvas 2D. Any addition must be justified against `package.json` showing current deps. |
| Drag-to-spin 3D turntable | 3D Collectible | Requires Three.js (see above). The adapted version (pointer-drag scrubbing a 2D timeline) survives in Bucket A without the 3D dep. |
| Skill percentage bars / progress ring animations | Viktor Oddy | Read as résumé-template energy. Ranking skills by a made-up percentage is anti-credible. A security engineer at Principal level doesn't say "Python: 87%". The draw-on-entry line technique (below) achieves a similar visual hit without the credibility damage. |
| Perpetual background animation that never pauses | Any | Violates `prefers-reduced-motion`. Also violates `document.visibilityState` — a tab-hidden animation that keeps running wastes CPU. Any looping animation must pause on hidden tab and on reduced-motion. |

---

## Bucket A — Everyday House-Style Patterns

Usable in any of the 8 kept themes. Zero new dependencies beyond current `package.json`. Must degrade gracefully under `prefers-reduced-motion: reduce`. Scoped to the specific layout's `html[data-layout="X"]` namespace in `globals.css`.

---

### A-01 — Scroll-Driven Word / Char Text Reveal

**What it is:** A block of text where individual words (or characters, for short headlines) are hidden at opacity 0 + small y-offset, and reveal sequentially as the containing section scrolls into and through the viewport. Not a simple `whileInView` — the reveal is *scroll-progress-linked*, so pausing mid-scroll freezes the text at a mid-reveal state.

**Source:** Mindloop (body copy reveal), 3D Portfolio About section. User confirmed as high-value.

**Implementation (motion/react + CSS):**

```tsx
// Split text into <motion.span> per word at render time — no JS library needed
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"], // reveal starts when top enters 90% of viewport
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className="srv-paragraph">
      {words.map((word, i) => {
        // Each word covers a slice of scroll progress
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        const y = useTransform(scrollYProgress, [start, end], [12, 0]);
        return (
          <motion.span key={i} style={{ opacity, y, display: "inline-block" }}>
            {word}&nbsp;
          </motion.span>
        );
      })}
    </p>
  );
}
```

**CSS (globals.css, scoped to layout):**
```css
html[data-layout="X"] .srv-paragraph {
  line-height: 1.7;
  /* No overflow hidden needed — y offsets are small (12px max) */
}
/* Reduced-motion: show all words immediately at full opacity */
@media (prefers-reduced-motion: reduce) {
  html[data-layout="X"] .srv-paragraph span {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**Accessibility:** Under `prefers-reduced-motion`, override all `opacity` and `transform` values to final state via CSS. Screen readers receive the full text regardless (the `<motion.span>` approach keeps the DOM intact). Do not use `aria-hidden` on individual words.

**Performance:** `useTransform` is pure math on motion values — zero React re-renders on scroll. `useScroll` with `{ target }` uses IntersectionObserver + passive scroll listener. Safe. Avoid calling `useTransform` in a loop inside a component — move the array creation outside the JSX, or use a sub-component per word (as shown above, each word is its own component with its own hooks).

**Council notes:** M2 (Frontend Craft) rewards this for micro-polish. M10 (Conversion) rewards scroll-momentum — users who start scrolling are committed. M9 (Accessibility) will check the reduced-motion override; if it's missing, that's an 80-point blocker.

---

### A-02 — Sticky-Stacking Scaling Project Cards

**What it is:** A project list where each card has `position: sticky; top: <offset>`, so as you scroll down, newer cards stack on top of older ones. The card that is being scrolled *past* simultaneously scales down slightly (from 1 → 0.95) and darkens, creating a "deck" metaphor. The top card is always at full scale; cards below it are compressed.

**Source:** 3D Portfolio Projects section. User confirmed as high-value for presenting projects.

**Implementation (motion/react + CSS):**

```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const PROJECTS = [ /* typed project data */ ];
const CARD_OFFSET = 72; // px between sticky tops

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // 0 when top hits viewport top, 1 when bottom leaves
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <div ref={ref} className="stk-card-outer" style={{ top: `${CARD_OFFSET * index}px` }}>
      <motion.div
        className="stk-card"
        style={{ scale, opacity }}
      >
        {/* card content */}
      </motion.div>
    </div>
  );
}
```

```css
/* globals.css */
html[data-layout="X"] .stk-card-outer {
  position: sticky;
  /* top is set via inline style above */
  height: 100vh; /* each card occupies one viewport height */
}
html[data-layout="X"] .stk-card {
  transform-origin: top center;
  will-change: transform, opacity; /* declare but don't overuse */
}
/* Reduced-motion: remove scale animation, keep stacking layout */
@media (prefers-reduced-motion: reduce) {
  html[data-layout="X"] .stk-card {
    scale: 1 !important;
    opacity: 1 !important;
  }
}
```

**Accessibility:** Cards remain in DOM order, which is the correct reading order. Keyboard focus naturally moves through cards top-to-bottom. The visual stacking is purely presentational.

**Performance:** `useTransform` on scroll progress is GPU-composited (`transform` and `opacity` are compositor-only properties). Set `will-change: transform, opacity` on `.stk-card`, but only for the duration of the scroll — remove it after (or accept it on all cards since there are typically ≤6 projects). Do not use `will-change: all`.

**Council notes:** M2 (Craft) loves the attention to scroll choreography. M8 (Performance) will check that `will-change` is appropriately scoped. M10 (Conversion) — this pattern keeps users scrolling; it has high retention signal.

---

### A-03 — Magnetic / Parallax Pointer-Follow on Focal Element

**What it is:** A key UI element (a logo mark, a large stat, a CTA button, a section accent) subtly follows the cursor within its bounding box — moving 5–15% of the cursor's relative offset from center. Not a cartoon avatar. The motion is spring-damped so it trails smoothly rather than snapping. On touch devices and under reduced-motion, it simply stays static.

**Source:** 3D Portfolio Magnet section (interaction extracted, avatar discarded). Viktor Oddy magnetic buttons.

**Implementation (motion/react + CSS):**

```tsx
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const STRENGTH = 0.12; // 12% follow — subtle, not cartoonish

function MagneticElement({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * STRENGTH);
    rawY.set((e.clientY - cy) * STRENGTH);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
         className="mag-wrapper">
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  );
}
```

**CSS:**
```css
html[data-layout="X"] .mag-wrapper {
  display: inline-block;
  cursor: pointer;
}
/* Reduced-motion: kill the spring translation */
@media (prefers-reduced-motion: reduce) {
  html[data-layout="X"] .mag-wrapper motion,
  html[data-layout="X"] .mag-wrapper [style*="transform"] {
    transform: none !important;
  }
}
```

**Accessibility:** The element's content doesn't change — only its visual position shifts. No ARIA changes needed. Ensure keyboard focus styling is not lost when the element is translated (use `outline` on `:focus-visible`, not `box-shadow`, which translates with the element).

**Performance:** `useMotionValue` + `useSpring` are entirely off the React render cycle. `mousemove` fires very frequently — keep the handler dead simple (just `set()` calls). No `getBoundingClientRect()` inside `requestAnimationFrame`; reading it in the event handler is acceptable since it's already on the event flush boundary.

**Strength calibration:** `STRENGTH = 0.12` means 120px cursor offset → 14px element movement. For a CTA button, 0.10 is enough. For a large decorative mark, 0.15 is the ceiling before it reads as "drunk element."

---

### A-04 — Scroll-Linked Horizontal Marquee of Project Tiles

**What it is:** A horizontal strip of project tiles (Koushik's own projects, not stock GIFs) that scrolls laterally as the user scrolls vertically through a pinned section. The further you scroll, the further the strip moves. Effect: a gallery that reveals more content without a horizontal scrollbar.

**Source:** 3D Portfolio Marquee section. User confirmed, with explicit note to use own project thumbnails.

**Implementation (motion/react + CSS):**

```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function ProjectMarquee() {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start end", "end start"],
  });
  // Maps full scroll through the section to a lateral slide of -60% of strip width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div ref={outerRef} className="mq-outer">
      {/* The outer div is scroll-tracked; the inner slides */}
      <div className="mq-sticky">
        <motion.div className="mq-strip" style={{ x }}>
          {PROJECTS.map((p) => (
            <div key={p.id} className="mq-tile">
              {/* Project thumbnail + title */}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
```

```css
html[data-layout="X"] .mq-outer {
  height: 300vh; /* tall section = slow lateral travel */
  position: relative;
}
html[data-layout="X"] .mq-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}
html[data-layout="X"] .mq-strip {
  display: flex;
  gap: 2rem;
  width: max-content;
  will-change: transform;
}
html[data-layout="X"] .mq-tile {
  width: clamp(220px, 30vw, 400px);
  flex-shrink: 0;
}
/* Reduced-motion: show all tiles in a static wrapping grid instead */
@media (prefers-reduced-motion: reduce) {
  html[data-layout="X"] .mq-outer { height: auto; }
  html[data-layout="X"] .mq-sticky { position: static; height: auto; overflow: visible; }
  html[data-layout="X"] .mq-strip { flex-wrap: wrap; width: 100%; transform: none !important; }
}
```

**Accessibility:** Under reduced-motion, revert to a static grid. The `300vh` tall outer div collapses to `height: auto` in reduced-motion — otherwise non-motion users are scrolling through 3 viewports of nothing for no reason.

**Performance:** `useTransform` on `x` is GPU-composited. The `will-change: transform` on the strip is appropriate because it's continuously translating during scroll. The tile images (if any) should be `loading="lazy"` since tiles far to the right aren't visible on load.

**Content note:** Project "thumbnails" can be CSS-only (a dark card with the project name, a stat, and a one-line desc in Geist Mono). No actual screenshots are required. Code-as-art tiles (showing a snippet of the YAML manifest, a log line, a detection rule) are on-brand and more distinctive than generic dashboard screenshots.

---

### A-05 — Staggered Pill-Tag Row Entrance

**What it is:** A horizontal row of domain tags (`DETECTION ENGINEERING · IAM · CLOUD SECURITY · AI PIPELINES · GOAT BENCHMARK`) that enter the viewport with a stagger delay — each pill animating in 60ms after the previous one, rather than all appearing simultaneously.

**Source:** Aethera (tag cloud entrance, stripped of glassmorphism). Also implicit in many of the references.

**Implementation (motion/react + CSS):**

```tsx
const TAGS = ["DETECTION ENGINEERING", "IAM", "CLOUD SECURITY", "AI PIPELINES", "GOAT BENCHMARK"];

function TagRow() {
  return (
    <div className="ptag-row" role="list">
      {TAGS.map((tag, i) => (
        <motion.span
          key={tag}
          className="ptag"
          role="listitem"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
```

```css
html[data-layout="X"] .ptag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-block: 1.5rem;
}
html[data-layout="X"] .ptag {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  padding: 0.3em 0.75em;
  border: 1px solid var(--border);
  color: var(--text-muted);
}
@media (prefers-reduced-motion: reduce) {
  html[data-layout="X"] .ptag {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**Accessibility:** `role="list"` on the row and `role="listitem"` on each pill ensures screen readers announce it as a list. Tags are text content — no icon-only ambiguity.

**Performance:** `whileInView` uses IntersectionObserver internally — zero scroll listener overhead. Appropriate for elements that only animate once on entry.

---

### A-06 — Oversized Section-Number Markers

**What it is:** Section entry markers using a two-digit counter (`01`, `02`, `03`) rendered at display scale (8–12rem, or larger) behind or beside the section heading, in a muted/low-opacity color. Pure CSS — no JS, no animation. Creates visual depth and editorial gravity without any runtime cost.

**Source:** Asme (editorial section numbering). Common across Swiss-grid design systems.

**Implementation:**

```css
html[data-layout="X"] .sec-marker {
  font-family: var(--font-geist-mono), monospace;
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 700;
  color: var(--text-muted);
  opacity: 0.12;
  line-height: 1;
  letter-spacing: -0.04em;
  user-select: none;
  pointer-events: none;
  /* Position alongside heading: */
  position: absolute;
  left: -0.5ch;
  top: -0.2em;
}
html[data-layout="X"] .sec-header {
  position: relative;
}
```

```tsx
<div className="sec-header">
  <span className="sec-marker" aria-hidden="true">01</span>
  <h2 className="sec-heading">Experience</h2>
</div>
```

**Accessibility:** `aria-hidden="true"` on the number — it's decorative, not content.

**Performance:** Zero. Pure CSS text. No animation.

**Council notes:** M1 (Product Design) rewards typographic confidence. M7 (Design Systems) rewards the consistent system use. This is a simple but effective signal of editorial polish.

---

### A-07 — Animated Number Counter on Viewport Entry

**What it is:** A key metric (`2,823`, `222`, `100`, `9`) counts up from 0 to its final value over ~1 second when the stat element enters the viewport. The count-up is eased (not linear) so it decelerates near the end, which reads as weight and significance.

**Source:** Mindloop (metric reveal section). Already partially implemented in the codebase as a `CountUp` component — this is the canonical implementation spec.

**Implementation (motion/react + CSS):**

```tsx
import { useRef, useEffect, useState } from "react";
import { useInView, animate } from "motion/react";

function CountUp({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    // Check reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      ref.current.textContent = target.toLocaleString();
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1], // strong ease-out — decelerates into final number
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return <span ref={ref}>0</span>;
}
```

**Accessibility:** Screen readers read the final number, not intermediate values (since we're updating `textContent` imperatively, not re-rendering). Pair with a visually hidden label so the number has context: `<span className="sr-only">cloud accounts secured:</span><CountUp target={2823} />`.

**Performance:** `animate()` from `motion/react` runs on the motion engine — off React render cycle. `useInView` uses IntersectionObserver. Total overhead is negligible.

**Note:** The existing `CountUp` component in the codebase should be audited against this spec. If it already uses `animate()` from motion/react, no change needed.

---

### A-08 — Scroll-Progress Position Indicator

**What it is:** A thin line (1–2px, full height of the viewport) on the left edge of a section that fills from top to bottom as you scroll through that section. Indicates scroll depth within a long section without requiring a global progress bar (which would conflict with other themes' aesthetics when cycling).

**Source:** Mindloop (vertical progress line). Common in editorial long-reads.

**Implementation (motion/react + CSS):**

```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function ScrollProgressLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="spl-section">
      <motion.div className="spl-line" style={{ scaleY }} />
      {/* section content */}
    </div>
  );
}
```

```css
html[data-layout="X"] .spl-section {
  position: relative;
}
html[data-layout="X"] .spl-line {
  position: fixed; /* or sticky, if section-scoped */
  left: 1.5rem;
  top: 0;
  width: 1px;
  height: 100vh;
  background: var(--accent);
  transform-origin: top center;
  opacity: 0.6;
}
@media (prefers-reduced-motion: reduce) {
  html[data-layout="X"] .spl-line {
    display: none; /* remove entirely — its only purpose is to show motion */
  }
}
```

**Accessibility:** Hidden entirely under reduced-motion. `aria-hidden="true"` in JSX regardless — it's purely decorative.

**Performance:** `scaleY` transform is GPU-composited. One IntersectionObserver + passive scroll listener per section. Acceptable.

---

### A-09 — Section Blend / Opacity Cross-Fade on Scroll

**What it is:** Two adjacent sections overlap via `position: sticky`, and the outgoing section fades to opacity 0 as the incoming section scrolls up over it. Eliminates the hard visual "cut" between sections. Works especially well between a dark section and a light section (or vice versa), providing a smooth luminance transition.

**Source:** Viktor Oddy (section transition blend). Adapted without backdrop-blur.

**Implementation (motion/react + CSS):**

```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function FadingSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Section fades out as it scrolls past the top of the viewport
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  return (
    <motion.div ref={ref} className="blend-section" style={{ opacity }}>
      {children}
    </motion.div>
  );
}
```

```css
html[data-layout="X"] .blend-section {
  position: sticky;
  top: 0;
  min-height: 100vh;
}
@media (prefers-reduced-motion: reduce) {
  html[data-layout="X"] .blend-section {
    opacity: 1 !important;
    position: static; /* unstick under reduced-motion to maintain normal flow */
  }
}
```

**Accessibility:** Under reduced-motion, the sections are static and fully visible. The `position: sticky` causes a pinning effect that, under reduced-motion, would leave sections pinned without the fade — so reverting to `position: static` is essential.

**Performance:** `opacity` is compositor-only. The sticky layout itself has zero JS cost.

**Caution:** More than 2 adjacent sticky sections creates layout complexity. Use sparingly — only at major section boundaries, not between every subsection.

---

### A-10 — Pointer-Drag Horizontal Scrub (Timeline / Stat Panel)

**What it is:** A user drags left/right across a panel to scrub through a timeline or reveal a set of stats. No 3D — purely 2D. The drag position maps to a `translateX` offset on the content strip inside. Spring physics give it a natural deceleration when released. On touch devices this degrades to normal horizontal scroll.

**Source:** 3D Collectible (interaction extracted from the turntable drag; 3D removed entirely). Concept only — the 3D dep is rejected.

**Implementation (motion/react + CSS):**

```tsx
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useDragControls } from "motion/react";

function DragScrubPanel() {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 30 });

  return (
    <div className="dsp-track">
      <motion.div
        className="dsp-inner"
        drag="x"
        dragConstraints={{ left: -600, right: 0 }} // adjust to content width
        style={{ x: springX }}
        dragElastic={0.05}
      >
        {/* timeline entries or stats */}
      </motion.div>
    </div>
  );
}
```

```css
html[data-layout="X"] .dsp-track {
  overflow: hidden;
  cursor: grab;
}
html[data-layout="X"] .dsp-track:active { cursor: grabbing; }
html[data-layout="X"] .dsp-inner {
  display: flex;
  width: max-content;
  user-select: none;
}
@media (prefers-reduced-motion: reduce) {
  html[data-layout="X"] .dsp-track {
    overflow-x: auto; /* revert to normal horizontal scroll */
    cursor: auto;
  }
  html[data-layout="X"] .dsp-inner {
    transform: none !important;
  }
}
```

**Accessibility:** Under reduced-motion, revert to `overflow-x: auto` — the OS-native horizontal scroll. Keyboard users can tab through items in DOM order since items stay in the flow. Add `aria-label="Drag or scroll to navigate timeline"` on the track div.

**Performance:** `drag` in motion/react is handled off the React render cycle. Spring physics is on the motion engine. `overflow: hidden` on the track prevents layout shift.

---

## Bucket B — Cinematic Flagship Patterns

Reserved exclusively for the cinematic flagship theme. **Never use in everyday (non-flagship) themes.** Every pattern below has craft rules — the rules are what separate it from AI slop. Violating the craft rules means the pattern becomes slop by definition.

The flagship has one relaxed-rules budget: one self-hosted display font, one self-authored canvas/WebGL motion background, and permission to use `backdrop-filter`, gradient text, and grain overlay — all scoped to `html[data-layout="<flagship>"]`. New dependencies must be justified.

---

### B-01 — Full-Bleed Self-Authored Generative Motion Background

**What it is:** A full-viewport canvas or WebGL layer that renders a generative animation tied to the flagship's concept. The motion background exists to *mean something*: a threat-map particle sweep, a phosphor oscilloscope trace, a signal-interference field — not a generic floating orbs or aurora gradient.

**Source:** Visual Hero (video background concept), Aethera (mesh gradient), Mindloop (section transitions) — all sanitized of stock content and re-motivated by Koushik's domain.

**Craft rules (what separates this from AI slop):**
1. The animation must be conceptually motivated — the viewer should be able to name the concept it represents (signal, threat map, waveform, network traffic) before reading any text.
2. It must be self-authored code in `/public` or inline in the component. Zero stock video URLs.
3. It must `pause()` on `document.visibilityState === 'hidden'` and on `prefers-reduced-motion`.
4. Under reduced-motion, it must resolve to a single static frame that is itself a strong composition (poster quality). The static frame is not a blank screen.
5. It must not run at more than 60fps, must cap particle count, and must respect device pixel ratio (max DPR 2, preferably capped at 1.5 on mobile).
6. It must not block first paint — initialize via `useEffect` (client-only) with `requestAnimationFrame`, not in SSR render.

**Implementation sketch (Canvas 2D — no new deps):**

```tsx
"use client";
import { useEffect, useRef } from "react";

export function GenerativeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Draw single static frame and return — no rAF loop
      renderStaticFrame(canvas);
      return;
    }
    const ctx = canvas.getContext("2d")!;
    let rafId: number;
    let paused = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = () => {
      if (!paused) renderFrame(ctx, canvas);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="gen-bg" aria-hidden="true" />;
}
```

**New dependency check:** Canvas 2D — zero new deps. WebGL via raw WebGL API — zero new deps. If WebGL is chosen, justify the added complexity in the build session. **Do not add Three.js or React Three Fiber** unless the specific concept requires it and the bundle justification is explicit (Three.js adds ~250 kB min+gzip).

**Performance:** DPR cap at 1.5 prevents the canvas from rasterizing at retina×retina on high-DPI desktop. Particle count cap: ≤120 particles. Frame rate: natural rAF at 60fps — do not add a manual frame skip unless profiling shows jank.

**Accessibility:** `aria-hidden="true"` on the canvas. Fully hidden under `prefers-reduced-motion` (no rAF loop at all). Static frame must be composited as a background (z-index: 0) so text remains on top and readable.

---

### B-02 — Boomerang / Ping-Pong Seamless Loop on Generative Element

**What it is:** A motion animation that plays forward to a keyframe, then reverses back to the start and repeats — creating a "breathing" or "pendulum" feel with no visible jump seam. Applied to the self-authored canvas element (B-01), not to a video. The signal goes up → comes back → goes up. The threat map sweeps → resets → sweeps.

**Source:** Visual Hero (boomerang video concept) — the video is rejected, the looping *rhythm* survives.

**Craft rules:**
1. The forward and reverse paths must be visually equivalent (same easing, mirrored) — not just a CSS `animation-direction: alternate` on a keyframe that reads differently in reverse.
2. The animation must have a conceptual "why" — a signal waveform looping makes sense; a camera panning forward-then-backward for no reason does not.
3. Must pause under `prefers-reduced-motion` and on hidden tab (same as B-01).

**Implementation (applied inside the canvas tick function):**

```ts
// In the canvas rAF loop — use a phase that oscillates [0, 1, 0, 1...]
let phase = 0;
let direction = 1; // 1 = forward, -1 = reverse
const SPEED = 0.004; // tuned per concept

function tick() {
  phase += SPEED * direction;
  if (phase >= 1) { phase = 1; direction = -1; }
  if (phase <= 0) { phase = 0; direction = 1; }
  renderFrame(ctx, phase);
  rafId = requestAnimationFrame(tick);
}
```

**Performance:** The phase + direction pattern is O(1) per frame — no array allocation, no GC pressure.

---

### B-03 — Glass / Backdrop-Blur HUD Surface

**What it is:** A semi-transparent panel with `backdrop-filter: blur(12–20px)` and a very low-opacity solid fill, used for navigation or a stat HUD that floats over the motion background. NOT used for every card on the page — one or two elements maximum.

**Source:** Aethera (glass panels), Viktor Oddy (frosted nav). Allowed only in flagship.

**Craft rules:**
1. Maximum two glass surfaces per viewport height. If everything is glass, nothing is.
2. Must have a visible border (`border: 1px solid rgba(255,255,255,0.12)`) — borderless glass is invisible and inaccessible.
3. Text inside the glass surface must pass WCAG AA (4.5:1) against the *blurred background*, not the element fill. Test with the background animation paused at its darkest/lightest frame.
4. Must degrade under `@supports not (backdrop-filter: blur(1px))` — provide a solid fallback background.
5. Under `prefers-reduced-motion`, the backdrop-filter can remain (it's not motion) but the entrance animation of the glass panel collapses to opacity fade only.

**CSS:**
```css
html[data-layout="flagship"] .glass-hud {
  background: rgba(10, 10, 20, 0.55);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.10);
}
@supports not (backdrop-filter: blur(1px)) {
  html[data-layout="flagship"] .glass-hud {
    background: rgba(10, 10, 20, 0.90); /* solid fallback */
  }
}
```

**Performance:** `backdrop-filter` on many elements simultaneously causes GPU compositing layer explosion. Hard limit: ≤2 elements with `backdrop-filter` active at any one time. Prefer applying it only on `position: fixed` or `position: sticky` elements (nav, stat bar) — these are promoted to their own compositing layer and avoid layout repaints.

---

### B-04 — Grain / Film Noise Overlay

**What it is:** A full-page `::after` pseudo-element with a base64-encoded noise texture (SVG turbulence or a tiny PNG tileset) at very low opacity (2–5%), adding tactile texture to the background without any runtime JS. Gives dark backgrounds a matte/film quality that reads as crafted rather than flat digital.

**Source:** Asme (editorial texture). Common in high-end agency work.

**Craft rules:**
1. The grain texture must be self-authored or a permissively licensed tiny asset in `/public` — not a hotlinked noise CDN.
2. Opacity ≤ 4% on dark backgrounds. Higher reads as dirty/broken.
3. No animation on the grain (no `animation: grain-shake` CSS keyframe — that is the #1 AI slop signal in this category).
4. Under `prefers-reduced-motion`, grain is fine to keep (it's not motion). Under high-contrast mode, remove it.

**Implementation (pure CSS, SVG-inline turbulence):**
```css
html[data-layout="flagship"]::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
@media (forced-colors: active) {
  html[data-layout="flagship"]::after { display: none; }
}
```

**Performance:** The SVG data-URI is inlined (zero network request). The `position: fixed` pseudo-element is on its own compositing layer. Zero JS.

---

### B-05 — Giant Display Typography Hero

**What it is:** A headline rendered at 12–20vw (viewport-width units), filling most of the hero above the fold. The type is the hero — no imagery needed. Works with Geist (already available) but may warrant a self-hosted display weight if Geist ExtraBold is insufficient.

**Source:** Asme (editorial letterform scale). Common in agency / design studio work.

**Craft rules:**
1. The headline must be real content, not decoration. "KOUSHIK KOTAMRAJU" or a key phrase from the security domain, not lorem ipsum or a decorative ampersand.
2. Line breaks must be controlled — `max-width` on the container or `<br>` at deliberate break points (not left to the browser to reflow awkwardly).
3. If using a self-hosted display font: the font file lives in `/public/fonts/`, referenced via `@font-face` in `globals.css`, with `font-display: swap`. No Google Fonts CDN. Justify the font choice in the build session.
4. Must be legible at all viewport widths — `clamp()` is mandatory: `font-size: clamp(4rem, 12vw, 14rem)`.
5. A text shadow or very light fill-offset may be used for depth, but gradient text at this scale is Bucket B on its own (see B-06).

**CSS:**
```css
html[data-layout="flagship"] .display-hero-text {
  font-family: var(--font-geist-sans), sans-serif; /* or self-hosted display variant */
  font-size: clamp(4rem, 12vw, 14rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}
```

**Accessibility:** Giant text scores well on contrast (large text threshold is 3:1, not 4.5:1). Ensure `role="heading"` or proper `<h1>` tag is used — not a `<div>`. The heading hierarchy of the page must start here.

**Performance:** Font size is CSS-only. Ensure `font-display: swap` on the `@font-face` so the page doesn't show invisible text during font load (FOIT → FOUT trade-off is acceptable here).

---

### B-06 — Gradient Text (Single Element, Concept-Motivated)

**What it is:** `background-clip: text` on a gradient applied to ONE display-scale element — a name, a key metric, or a domain phrase. Not applied to body copy, subheadings, tags, or anything below 3rem.

**Source:** Aethera, Mindloop. The pattern itself is fine; the abuse of it everywhere is the slop.

**Craft rules:**
1. Maximum one gradient text element per theme. If the flagship has more than one, it becomes an Aethera clone.
2. The gradient must use colors from the theme's CSS custom property palette — not arbitrary rainbow. A two-stop gradient from `--accent` to `--text-primary` is appropriate. A five-stop neon rainbow is not.
3. The gradient must make semantic sense — applying it to a number that represents a signal/intensity level makes sense; applying it to a name for decoration does not.
4. Provide a `color: var(--accent)` fallback for browsers where `background-clip: text` fails.
5. Under `prefers-contrast: more`, fall back to solid `color: var(--text-primary)`.

**CSS:**
```css
html[data-layout="flagship"] .gradient-stat {
  background: linear-gradient(135deg, var(--accent), var(--text-primary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--accent); /* fallback */
}
@media (prefers-contrast: more) {
  html[data-layout="flagship"] .gradient-stat {
    -webkit-text-fill-color: unset;
    color: var(--text-primary);
  }
}
```

---

### B-07 — Magnetic Cursor Ring (Large, Dramatic Version)

**What it is:** A custom cursor ring (20–40px diameter) that follows the mouse with a spring delay, replacing or augmenting the OS cursor. In the flagship, this can be a larger, more dramatic element (e.g., a crosshair ring, a scanning circle) that reinforces the theme concept. In everyday themes, only the subtle element-level magnetic interaction (A-03) is allowed.

**Source:** 3D Portfolio (cursor component). Viktor Oddy (magnetic cursor). Bucket B because a visible custom cursor ring is a visual statement that only the flagship can support without reading as a gimmick.

**Craft rules:**
1. The ring must be concept-motivated — a crosshair ring fits a threat-map concept; a scanning circle fits a radar/monitoring concept. A generic circle dot fits nothing.
2. The cursor must not obscure interactive elements — keep `pointer-events: none` on the ring element and ensure it doesn't overlap CTA hit targets.
3. On touch devices, do not render the cursor ring at all (use `@media (hover: none)` to hide).
4. Under `prefers-reduced-motion`, reduce to a fixed-position indicator at screen center or remove entirely.
5. Must not be the only focus indicator — keyboard focus styling (`outline` / `focus-visible`) must still be present independent of the cursor ring.

**Implementation (motion/react + CSS):**

```tsx
"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorRing() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 180, damping: 28 });
  const y = useSpring(rawY, { stiffness: 180, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => { rawX.set(e.clientX); rawY.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <motion.div
      className="cursor-ring"
      style={{ x, y }}
      aria-hidden="true"
    />
  );
}
```

```css
html[data-layout="flagship"] .cursor-ring {
  position: fixed;
  top: -18px;  /* half the ring size, for centering */
  left: -18px;
  width: 36px;
  height: 36px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference; /* optional — gives inversion effect over content */
}
@media (hover: none) {
  html[data-layout="flagship"] .cursor-ring { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  html[data-layout="flagship"] .cursor-ring { display: none; }
}
```

**Performance:** `useMotionValue` + `useSpring` are off the React render cycle. One `mousemove` event listener with `{ passive: true }`. `position: fixed` promotes the element to its own compositing layer. Mix-blend-mode may cause additional GPU layer creation — test on a mid-range laptop.

---

## Cross-Reference: Pattern Pairings

Which patterns work well together, and which combinations to avoid.

| Pairing | Assessment |
|---------|------------|
| A-01 (word reveal) + A-02 (sticky stacking) | Strong — text reveal in sections, sticky stacking in projects. Natural page architecture. |
| A-01 (word reveal) + A-04 (marquee) | Strong — reveal happens above the fold; marquee in its own pinned section below. |
| A-03 (magnetic element) + A-05 (pill tags) | Good — magnetic on the CTA, pill tags on the skills row. Independent elements. |
| A-02 (sticky stacking) + A-04 (marquee) | Avoid combining in a single layout — two different scroll-hijacking patterns in the same theme create conflicting scroll contracts. Choose one. |
| B-01 (gen background) + B-03 (glass HUD) + B-07 (cursor ring) | The flagship core trio — these three together define the cinematic flagship. They are mutually reinforcing. |
| B-04 (grain) + B-01 (gen background) | Good — grain adds texture over the canvas background. |
| B-05 (display type) + B-06 (gradient text) | Acceptable — giant type with ONE gradient application. Do not gradient the body copy in the same theme. |
| A-01 (word reveal) inside the flagship | Perfectly fine — Bucket A patterns can be used IN the flagship. The reverse is not true. |
| B-03 (glass) in an everyday theme | Hard no. Automatic council fail. Member 1 will flag as AI slop. |
| B-07 (cursor ring) in an everyday theme | Hard no. It reads as a gimmick without the cinematic context. |

---

## Quick Reference: Reduced-Motion Degradation Contract

Every pattern must have an explicit reduced-motion behavior. This table is the contract:

| Pattern | Under `prefers-reduced-motion: reduce` |
|---------|---------------------------------------|
| A-01 word reveal | All words visible at full opacity instantly. CSS override. |
| A-02 sticky stacking | Cards still stack (CSS sticky remains), scale animation removed. Cards stay at scale 1. |
| A-03 magnetic | Element stays centered. No translation. Mouse handlers can remain registered (no-op). |
| A-04 scroll marquee | Revert to static wrapping grid (`flex-wrap: wrap`, `overflow: visible`). |
| A-05 pill tags | All pills visible at full opacity instantly. CSS override. |
| A-06 section numbers | No change — pure CSS, no animation. |
| A-07 count-up | Jump to final value immediately (no `animate()` call). |
| A-08 scroll progress line | Remove entirely. Its only purpose is to indicate motion. |
| A-09 section blend | Sections revert to `position: static`, full opacity. |
| A-10 drag scrub | Revert to `overflow-x: auto` native horizontal scroll. |
| B-01 generative background | Render single static frame, no rAF loop. Poster-quality still. |
| B-02 boomerang loop | Loop stops. Freeze at neutral position (phase = 0 or 0.5). |
| B-03 glass HUD | `backdrop-filter` remains (not motion). Entrance animation skipped. |
| B-04 grain overlay | Unchanged — grain is not motion. |
| B-05 display type | Unchanged — static. |
| B-06 gradient text | Unchanged — static. |
| B-07 cursor ring | Remove entirely. Never render under reduced-motion. |

---

## Dependency Audit

Current `package.json` production dependencies: `next@15.3.2`, `react@19`, `react-dom@19`, `motion@11.18.2`, `geist@1.3.1`.

| Pattern | New dep required? | Verdict |
|---------|------------------|---------|
| A-01 through A-10 | None — all use `motion/react` (already in `motion@11.18.2`) | Clean |
| B-01 Canvas 2D | None — Web API | Clean |
| B-01 WebGL (raw) | None — Web API | Clean (complex to implement, but zero bundle cost) |
| B-01 WebGL via Three.js | `three@~170kB` + `@react-three/fiber@~50kB` gzipped | Justify or skip — Canvas 2D achieves the same visual class for this use case |
| B-02 boomerang loop | None — implemented in Canvas rAF logic | Clean |
| B-03 glass HUD | None — pure CSS | Clean |
| B-04 grain overlay | None — inline SVG data URI | Clean |
| B-05 display type (Geist) | None — already installed | Clean |
| B-05 self-hosted display font | Font files in `/public/fonts/` — no npm dep | Clean; add `font-display: swap` |
| B-06 gradient text | None — pure CSS | Clean |
| B-07 cursor ring | None — `motion/react` already installed | Clean |

**Conclusion:** All patterns — Bucket A and Bucket B — are implementable within the current `package.json` if Canvas 2D is used for the generative background. Three.js is the only meaningful dep risk; use Canvas 2D unless the flagship concept genuinely requires geometry transforms that Canvas 2D cannot provide.

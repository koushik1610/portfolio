

---

# PROMPT 2 — Reference Intake (one-time; converts motionsite prompts to house style)

This converts the cinematic references into YOUR vocabulary so they're reusable and
de-risked. Paste into Claude Code.

```
You are working in my portfolio repo. Read CLAUDE.md and COUNCIL.md first.

GOAL: I collected several cinematic website reference prompts (motionsite.ai: Asme,
Aethera, 3D Portfolio, 3D Collectible, Visual Hero, Mindloop, AI Designer / Viktor
Oddy). They are all written for Vite + Tailwind + framer-motion + Google Fonts +
full-screen video + liquid glass. My stack is the OPPOSITE: Next.js static export,
motion/react, Geist only, no video, CSS-in-globals.css, no Tailwind in heroes.

I do NOT want to port these literally — full-screen video + liquid glass is exactly
the "AI slop" signature I'm avoiding. Instead, distill them into reusable, house-style
design ideas.

DO THIS:
1. Read the reference prompts I will paste below (or read them from
   inspiration/prompts/ if I've saved them there).
2. For each reference, extract ONLY the transferable ideas — the motion patterns,
   layout structures, and typographic moves — and discard the slop signals
   (autoplay video, glassmorphism, gradient text, magnetic cartoon avatars).
3. Produce inspiration/DESIGN-IDEAS-DISTILLED.md cataloguing the survivors as a
   reusable pattern library. For each pattern give: name, what it is, which reference
   it came from, how to implement it in motion/react + CSS (no Tailwind, no video),
   an accessibility note (respect prefers-reduced-motion), and a performance note.

PATTERNS I ALREADY KNOW ARE WORTH KEEPING (confirm + add others you find):
- Scroll-driven, word-by-word or char-by-char text reveal (Mindloop, 3D Portfolio
  About section) — via motion/react useScroll + useTransform. High value, on-brand.
- Sticky-stacking project cards that scale down as you scroll past (3D Portfolio
  Projects) — strong way to present my projects; implement with CSS sticky +
  motion/react scroll progress.
- Magnetic / parallax micro-interactions on a focal element (3D Portfolio Magnet) —
  subtle pointer-follow, NOT a cartoon figurine.
- Scroll-linked horizontal marquee of project tiles (3D Portfolio Marquee) — but
  using MY project thumbnails, not motionsite GIFs.
- Boomerang/ping-pong loop concept (Visual Hero) — keep the IDEA of seamless looping
  motion, but applied to a CSS/canvas generative element, never an external video.

SORT EVERY PATTERN INTO ONE OF TWO BUCKETS (do not reject cinematic ideas outright —
there is now a dedicated cinematic flagship that wants them):

BUCKET A — Everyday house-style patterns (usable in any kept theme):
- scroll-driven word/char text reveal, sticky-stacking scaling project cards,
  magnetic/parallax micro-interactions, scroll-linked marquee of MY project tiles,
  seamless-loop motion on a CSS/canvas element.
- Must work with motion/react + Geist + globals.css scoping, no new heavy deps.

BUCKET B — Cinematic patterns reserved for the FLAGSHIP ONLY (never in everyday themes):
- full-bleed motion background, glass/backdrop-blur surfaces, giant display typography,
  grain/noise overlay, gradient text, boomerang/ping-pong loop as a hero centerpiece.
- For each, write the craft rules that keep it from reading as AI slop: must be concept-
  motivated, must use MY OWN assets, must degrade under prefers-reduced-motion, must not
  tank LCP/first paint.

HARD REJECTS regardless of bucket (write down WHY):
- any hardcoded motionsite.ai / figma.site / CloudFront asset URL.
- framer-motion (use motion/react).
- a 3D avatar/figurine of my face (uncanny risk + unserious for Staff/Principal).

CONSTRAINT CHECK: Bucket A patterns must be implementable with motion/react, Geist, and
globals.css scoping — no new heavy deps. Bucket B may assume the flagship's relaxed rules
(self-hosted display font, self-authored canvas/WebGL) but must still flag any new
dependency and justify it against package.json.

Output only the doc. No code changes. This is a reusable reference for the build step.
```

NOTE: when you run this, paste the seven motionsite prompts after the instruction, or
save them first into inspiration/prompts/ as raw files and tell the agent to read them.

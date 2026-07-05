"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   W-Theme-11 — "AXIOM"
   A live security attack-graph IS the layout. ~32 nodes (cloud accounts, IAM
   roles, findings, projects) wired by edges. "Koushik / Kotamraju" are the two
   largest hub nodes the graph converges on. On scroll the same node system
   re-clusters scene → scene (hero → stats → expertise → work → contact).
   The graph is decorative (aria-hidden); a full semantic DOM layer carries all
   content for screen readers + no-JS.
───────────────────────────────────────────────────────────────────────────── */

type Scene = "hero" | "stats" | "expertise" | "work" | "contact";

interface NodeDef {
  id: string;
  kind: "hub" | "critical" | "node" | "leaf";
  label?: string;
  /** per-scene fractional position (0..1 of the graph box) */
  p: Record<Scene, [number, number]>;
  /** node is highlighted oxblood when the toxic-combo count fires */
  toxic?: boolean;
}

interface EdgeDef {
  a: string;
  b: string;
  /** lights oxblood with the toxic-combination count-up */
  toxic?: boolean;
}

const SCENES: Scene[] = ["hero", "stats", "expertise", "work", "contact"];

/* Two hubs = the name. They stay central-ish across every scene so Koushik is
   literally the point the whole graph resolves around. */
const NODES: NodeDef[] = [
  { id: "k1", kind: "hub", label: "Koushik", p: {
    hero: [0.40, 0.46], stats: [0.28, 0.30], expertise: [0.24, 0.30], work: [0.26, 0.28], contact: [0.34, 0.40] } },
  { id: "k2", kind: "hub", label: "Kotamraju", p: {
    hero: [0.58, 0.56], stats: [0.30, 0.42], expertise: [0.27, 0.44], work: [0.30, 0.42], contact: [0.40, 0.54] } },

  // cloud-account / architecture cluster
  { id: "aws", kind: "node", label: "AWS", p: {
    hero: [0.20, 0.24], stats: [0.62, 0.20], expertise: [0.66, 0.18], work: [0.70, 0.16], contact: [0.66, 0.22] } },
  { id: "gcp", kind: "node", label: "GCP", p: {
    hero: [0.74, 0.22], stats: [0.78, 0.30], expertise: [0.80, 0.30], work: [0.82, 0.26], contact: [0.78, 0.34] } },
  { id: "cnapp", kind: "node", p: {
    hero: [0.12, 0.50], stats: [0.70, 0.34], expertise: [0.74, 0.44], work: [0.62, 0.36], contact: [0.20, 0.30] } },
  { id: "ztna", kind: "leaf", p: {
    hero: [0.30, 0.74], stats: [0.84, 0.16], expertise: [0.88, 0.18], work: [0.90, 0.22], contact: [0.18, 0.62] } },

  // detection cluster
  { id: "det", kind: "node", label: "Detect", p: {
    hero: [0.86, 0.44], stats: [0.60, 0.60], expertise: [0.66, 0.62], work: [0.62, 0.62], contact: [0.78, 0.66] } },
  { id: "sig", kind: "leaf", p: {
    hero: [0.90, 0.62], stats: [0.74, 0.66], expertise: [0.80, 0.66], work: [0.78, 0.70], contact: [0.86, 0.58] } },
  { id: "mitre", kind: "leaf", p: {
    hero: [0.78, 0.74], stats: [0.66, 0.74], expertise: [0.72, 0.76], work: [0.70, 0.80], contact: [0.70, 0.78] } },
  { id: "terra", kind: "leaf", p: {
    hero: [0.66, 0.84], stats: [0.82, 0.78], expertise: [0.86, 0.78], work: [0.86, 0.80], contact: [0.84, 0.76] } },

  // IAM / toxic-combination cluster (oxblood when count fires)
  { id: "iam", kind: "critical", label: "IAM", toxic: true, p: {
    hero: [0.50, 0.18], stats: [0.40, 0.62], expertise: [0.42, 0.60], work: [0.42, 0.60], contact: [0.54, 0.24] } },
  { id: "esc1", kind: "critical", toxic: true, p: {
    hero: [0.40, 0.30], stats: [0.30, 0.72], expertise: [0.30, 0.72], work: [0.30, 0.74], contact: [0.44, 0.18] } },
  { id: "esc2", kind: "critical", toxic: true, p: {
    hero: [0.62, 0.30], stats: [0.50, 0.72], expertise: [0.52, 0.74], work: [0.52, 0.74], contact: [0.64, 0.16] } },
  { id: "esc3", kind: "node", toxic: true, p: {
    hero: [0.24, 0.40], stats: [0.20, 0.62], expertise: [0.20, 0.60], work: [0.20, 0.62], contact: [0.30, 0.20] } },
  { id: "esc4", kind: "leaf", toxic: true, p: {
    hero: [0.76, 0.40], stats: [0.40, 0.84], expertise: [0.42, 0.86], work: [0.42, 0.86], contact: [0.50, 0.10] } },

  // AI-security cluster
  { id: "ai", kind: "node", label: "AI", p: {
    hero: [0.16, 0.66], stats: [0.16, 0.42], expertise: [0.18, 0.46], work: [0.16, 0.46], contact: [0.16, 0.46] } },
  { id: "model1", kind: "leaf", p: {
    hero: [0.10, 0.78], stats: [0.08, 0.30], expertise: [0.10, 0.32], work: [0.08, 0.34], contact: [0.10, 0.34] } },
  { id: "model2", kind: "leaf", p: {
    hero: [0.22, 0.86], stats: [0.10, 0.54], expertise: [0.12, 0.58], work: [0.10, 0.58], contact: [0.12, 0.58] } },
  { id: "kg", kind: "node", label: "Graph", p: {
    hero: [0.46, 0.82], stats: [0.22, 0.48], expertise: [0.24, 0.18], work: [0.24, 0.18], contact: [0.24, 0.68] } },

  // research / project anchors
  { id: "artemis", kind: "node", label: "Artemis", p: {
    hero: [0.84, 0.84], stats: [0.50, 0.18], expertise: [0.52, 0.18], work: [0.52, 0.20], contact: [0.62, 0.74] } },
  { id: "antitoxin", kind: "critical", label: "Antitoxin", toxic: true, p: {
    hero: [0.54, 0.70], stats: [0.40, 0.46], expertise: [0.40, 0.18], work: [0.40, 0.18], contact: [0.46, 0.70] } },
  { id: "iaudit", kind: "node", p: {
    hero: [0.34, 0.58], stats: [0.58, 0.46], expertise: [0.58, 0.30], work: [0.66, 0.50], contact: [0.52, 0.62] } },
  { id: "threat", kind: "node", p: {
    hero: [0.68, 0.66], stats: [0.62, 0.32], expertise: [0.62, 0.46], work: [0.76, 0.50], contact: [0.58, 0.50] } },

  // inert scaffold (steel) — accounts & findings filling the graph
  { id: "n1", kind: "leaf", p: {
    hero: [0.06, 0.36], stats: [0.06, 0.18], expertise: [0.08, 0.14], work: [0.06, 0.14], contact: [0.06, 0.30] } },
  { id: "n2", kind: "leaf", p: {
    hero: [0.94, 0.30], stats: [0.92, 0.46], expertise: [0.92, 0.50], work: [0.94, 0.40], contact: [0.92, 0.42] } },
  { id: "n3", kind: "leaf", p: {
    hero: [0.06, 0.66], stats: [0.06, 0.72], expertise: [0.06, 0.78], work: [0.06, 0.78], contact: [0.08, 0.74] } },
  { id: "n4", kind: "leaf", p: {
    hero: [0.94, 0.72], stats: [0.92, 0.70], expertise: [0.92, 0.72], work: [0.94, 0.70], contact: [0.92, 0.70] } },
  { id: "n5", kind: "leaf", p: {
    hero: [0.40, 0.10], stats: [0.50, 0.08], expertise: [0.52, 0.08], work: [0.52, 0.08], contact: [0.40, 0.06] } },
  { id: "n6", kind: "leaf", p: {
    hero: [0.60, 0.92], stats: [0.30, 0.92], expertise: [0.32, 0.92], work: [0.32, 0.92], contact: [0.34, 0.90] } },
  { id: "n7", kind: "leaf", p: {
    hero: [0.14, 0.14], stats: [0.18, 0.86], expertise: [0.18, 0.86], work: [0.18, 0.88], contact: [0.14, 0.86] } },
  { id: "n8", kind: "leaf", p: {
    hero: [0.86, 0.14], stats: [0.86, 0.86], expertise: [0.86, 0.90], work: [0.86, 0.90], contact: [0.86, 0.88] } },
  { id: "n9", kind: "leaf", p: {
    hero: [0.50, 0.40], stats: [0.46, 0.34], expertise: [0.46, 0.62], work: [0.48, 0.36], contact: [0.48, 0.40] } },
  { id: "n10", kind: "leaf", p: {
    hero: [0.32, 0.24], stats: [0.72, 0.50], expertise: [0.74, 0.60], work: [0.72, 0.66], contact: [0.36, 0.32] } },
];

const EDGES: EdgeDef[] = [
  { a: "k1", b: "k2" },
  { a: "k1", b: "aws" }, { a: "k1", b: "iam", toxic: true }, { a: "k1", b: "ai" },
  { a: "k1", b: "cnapp" }, { a: "k1", b: "esc3", toxic: true }, { a: "k1", b: "n7" },
  { a: "k2", b: "gcp" }, { a: "k2", b: "det" }, { a: "k2", b: "kg" },
  { a: "k2", b: "artemis" }, { a: "k2", b: "antitoxin", toxic: true }, { a: "k2", b: "threat" },
  { a: "aws", b: "cnapp" }, { a: "gcp", b: "cnapp" }, { a: "cnapp", b: "ztna" },
  { a: "det", b: "sig" }, { a: "det", b: "mitre" }, { a: "det", b: "terra" },
  { a: "iam", b: "esc1", toxic: true }, { a: "iam", b: "esc2", toxic: true },
  { a: "iam", b: "esc3", toxic: true }, { a: "iam", b: "esc4", toxic: true },
  { a: "antitoxin", b: "iam", toxic: true }, { a: "antitoxin", b: "esc2", toxic: true },
  { a: "ai", b: "model1" }, { a: "ai", b: "model2" }, { a: "ai", b: "kg" },
  { a: "kg", b: "threat" }, { a: "artemis", b: "aws" }, { a: "artemis", b: "gcp" },
  { a: "iaudit", b: "iam", toxic: true }, { a: "iaudit", b: "k1" },
  { a: "threat", b: "ai" }, { a: "n9", b: "k1" }, { a: "n9", b: "iam", toxic: true },
  { a: "n10", b: "det" }, { a: "aws", b: "n1" }, { a: "gcp", b: "n2" },
  { a: "ai", b: "n3" }, { a: "det", b: "n4" }, { a: "iam", b: "n5", toxic: true },
  { a: "kg", b: "n6" }, { a: "esc1", b: "n7", toxic: true }, { a: "esc2", b: "n8", toxic: true },
];


/* ── Content (semantic layer + data) ───────────────────────────────────────── */

const METRICS = [
  { key: "accounts", target: 2800, suffix: "+", numClass: "w11-m-accounts", label: "Cloud accounts (AWS + GCP)", ariaLabel: "2,800+ cloud accounts across AWS and GCP" },
  { key: "toxic", target: 62, suffix: "", numClass: "w11-m-toxic", label: "Toxic IAM combinations", ariaLabel: "62 toxic IAM combinations", lights: true },
  { key: "paths", target: 65, suffix: "+", numClass: "w11-m-paths", label: "Escalation paths · 10 classes", ariaLabel: "65+ escalation paths across 10 vulnerability classes", lights: true },
  { key: "recall", target: 150, suffix: "+", numClass: "w11-m-recall", label: "Security reviews · every business unit", ariaLabel: "150 plus security reviews across every business unit" },
] as const;

const EXPERTISE = [
  { num: "01", name: "Detection Engineering", desc: "200+ active signatures evaluating 1,400+ AWS accounts. CIS-benchmarked baselines, MITRE ATT&CK coverage of real-world techniques, deployed via Terraform.", meta: "1,400+ acct" },
  { num: "02", name: "IAM Privilege Analysis", desc: "AI-native IAM audit agent traversing 65+ escalation paths across 10 vulnerability classes, with semantic interpretation of transitive privilege chains.", meta: "32 GOAT" },
  { num: "03", name: "AI Security Tooling", desc: "Multi-agent orchestration across 19 models from 5 providers, on a 1,700+-node knowledge graph. Agentic SOAR at $1.40 per research run.", meta: "19 models" },
  { num: "04", name: "Cloud Security Architecture", desc: "2,800+ cloud accounts. CNAPP-class attack-path simulation, AI-augmented CSPM, crown-jewel exposure tracking, Zero Trust enforcement.", meta: "2,800+ acct" },
  { num: "05", name: "Security Research", desc: "Artemis multi-cloud attack-path simulation; Antitoxin graph-theoretic IAM analysis cataloguing 62 toxic combinations with minimum cut-set remediation.", meta: "62 combos" },
] as const;

const PROJECTS = [
  { id: "01", name: "Artemis", desc: "Multi-cloud attack-path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph layer.", metric: "2,800+ accounts", tags: ["Python", "GCP SCC", "AWS Security Hub"] },
  { id: "02", name: "IAM Audit Agent", desc: "Boto3 tool-calling agent. 65+ escalation paths across 10 vulnerability classes. Evaluated against 32 GOAT benchmarks.", metric: "32 GOAT benchmarks", tags: ["IAM", "Python", "Boto3"] },
  { id: "03", name: "Autonomous Threat Intel", desc: "19 models, 5 providers, performance-weighted router. Analyst-ready proposals at $1.40 per run.", metric: "$1.40 / run", tags: ["Multi-Agent", "Claude", "GPT-4"] },
  { id: "04", name: "Detection Engine", desc: "200+ active signatures via Terraform. MITRE ATT&CK gap analysis across 1,400+ AWS accounts.", metric: "200+ signatures", tags: ["Python", "Lambda", "Terraform"] },
] as const;

const SCENE_CAPTIONS: Record<Scene, { tag: string; title: string }> = {
  hero: { tag: "GRAPH · ROOT", title: "Koushik Kotamraju" },
  stats: { tag: "CLUSTER · SIGNALS", title: "The numbers behind the systems" },
  expertise: { tag: "CLUSTER · DISCIPLINES", title: "What I build" },
  work: { tag: "CLUSTER · ARTIFACTS", title: "Selected work" },
  contact: { tag: "GRAPH · RESOLVE", title: "Let's connect" },
};

/* ── Component ──────────────────────────────────────────────────────────────── */

export default function AxiomHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const layer = root.querySelector<HTMLElement>(".w11-graph");
      const svg = root.querySelector<SVGSVGElement>(".w11-edges");
      if (!layer || !svg) return;

      // Box of the (fixed) graph layer in px.
      let W = layer.clientWidth;
      let H = layer.clientHeight;

      const nodeEls = new Map<string, HTMLElement>();
      NODES.forEach((n) => {
        const el = root.querySelector<HTMLElement>(`.w11-node[data-id="${n.id}"]`);
        if (el) nodeEls.set(n.id, el);
      });
      const edgeEls = EDGES.map((e) =>
        svg.querySelector<SVGLineElement>(`.w11-edge[data-a="${e.a}"][data-b="${e.b}"]`)
      );

      // live state: where each node currently is (px), driven by GSAP.
      const state = new Map<string, { x: number; y: number }>();
      const px = (n: NodeDef, scene: Scene) => ({ x: n.p[scene][0] * W, y: n.p[scene][1] * H });

      // Place a node element via transform (transform-only = one owner, perf).
      const place = (id: string) => {
        const el = nodeEls.get(id);
        const s = state.get(id);
        if (el && s) el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      };

      // Re-draw all edges from current node state.
      const drawEdges = () => {
        EDGES.forEach((e, i) => {
          const line = edgeEls[i];
          const a = state.get(e.a);
          const b = state.get(e.b);
          if (line && a && b) {
            line.setAttribute("x1", String(a.x));
            line.setAttribute("y1", String(a.y));
            line.setAttribute("x2", String(b.x));
            line.setAttribute("y2", String(b.y));
          }
        });
      };

      // Initialise everyone at the hero layout.
      NODES.forEach((n) => {
        const pos = px(n, "hero");
        state.set(n.id, pos);
      });
      nodeEls.forEach((_, id) => place(id));
      drawEdges();
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ── Count-ups (always run; gate the animation, not the result) ─────────
      const lightToxic = () => {
        root.querySelectorAll<SVGLineElement>(".w11-edge[data-toxic='1']").forEach((l) =>
          l.classList.add("is-lit")
        );
        root.querySelectorAll<HTMLElement>(".w11-node[data-toxic='1']").forEach((n) =>
          n.classList.add("is-lit")
        );
      };

      METRICS.forEach((m) => {
        const el = root.querySelector<HTMLElement>(`.${m.numClass}`);
        if (!el) return;
        const lights = "lights" in m && m.lights;
        if (prefersReduced) {
          el.textContent = m.target.toLocaleString() + m.suffix;
          return;
        }
        const obj = { val: 0 };
        gsap.to(obj, {
          val: m.target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".w11-scene--stats", start: "top 75%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + m.suffix;
          },
          onComplete: () => {
            if (lights) lightToxic();
          },
        });
      });

      // ── Reduced motion: settled static hero, no scrub, no drift ────────────
      if (prefersReduced) {
        gsap.set(".w11-graph", { autoAlpha: 1 });
        return;
      }

      // Failsafe: if the rAF ticker stalls (background tab, low-power mode),
      // never leave the on-mount graph-assembly tweens stuck mid-flight —
      // force-complete them by wall clock. Cleared in the cleanup below.
      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween | gsap.core.Timeline, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      // Intro: nodes assemble from a slight scatter, edges fade in.
      const edgesIn = gsap.from(".w11-edges", { autoAlpha: 0, duration: 1.2, ease: "power2.out", delay: 0.3 });
      settle(edgesIn, 3000);
      const nodesIn = gsap.from(Array.from(nodeEls.values()), {
        autoAlpha: 0,
        scale: 0.4,
        duration: 0.7,
        ease: "back.out(1.6)",
        stagger: { each: 0.018, from: "center" },
      });
      settle(nodesIn, 3000);

      // ── Idle drift: subtle sine wobble per node, layered on top of layout ──
      const drift = new Map<string, { x: number; y: number }>();
      NODES.forEach((n) => {
        drift.set(n.id, { x: 0, y: 0 });
        const amp = n.kind === "hub" ? 5 : n.kind === "leaf" ? 11 : 8;
        const d = drift.get(n.id)!;
        gsap.to(d, {
          x: gsap.utils.random(-amp, amp),
          y: gsap.utils.random(-amp, amp),
          duration: gsap.utils.random(3.2, 6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 2),
        });
      });

      // ── Cursor repulsion (substantive: works on every pointer move) ────────
      const pointer = { x: -9999, y: -9999, active: false };
      const onMove = (ev: PointerEvent) => {
        const rect = layer.getBoundingClientRect();
        pointer.x = ev.clientX - rect.left;
        pointer.y = ev.clientY - rect.top;
        pointer.active = true;
      };
      const onLeave = () => { pointer.active = false; };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave, { passive: true });

      // ── Scene scrub: tween every node's base layout between scenes ─────────
      // base = the scrub-driven layout position; we add drift + repulsion in a ticker.
      const base = new Map<string, { x: number; y: number }>();
      NODES.forEach((n) => base.set(n.id, { ...px(n, "hero") }));

      for (let i = 0; i < SCENES.length - 1; i++) {
        const from = SCENES[i];
        const to = SCENES[i + 1];
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `.w11-scene--${to}`,
            start: "top bottom",
            end: "top center",
            scrub: 0.8,
          },
        });
        NODES.forEach((n, idx) => {
          const b = base.get(n.id)!;
          tl.to(
            b,
            {
              x: () => n.p[to][0] * W,
              y: () => n.p[to][1] * H,
              ease: "power2.inOut",
              duration: 1,
            },
            idx * 0.004
          );
          // keep the "from" target honest on resize/refresh
          tl.set(b, { immediateRender: false }, 0);
          void from;
        });
      }

      // ── Render loop: compose base + drift + repulsion → state → DOM/SVG ────
      const REPEL = 120;
      const ticker = () => {
        NODES.forEach((n) => {
          const b = base.get(n.id)!;
          const d = drift.get(n.id)!;
          let x = b.x + d.x;
          let y = b.y + d.y;
          if (pointer.active && n.kind !== "hub") {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < REPEL && dist > 0.01) {
              const force = (1 - dist / REPEL) * 26;
              x += (dx / dist) * force;
              y += (dy / dist) * force;
            }
          }
          const s = state.get(n.id)!;
          s.x = x;
          s.y = y;
          place(n.id);
        });
        drawEdges();
      };
      gsap.ticker.add(ticker);

      // ── Resize: recompute box + refresh triggers ──────────────────────────
      const onResize = () => {
        W = layer.clientWidth;
        H = layer.clientHeight;
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        NODES.forEach((n) => {
          const b = base.get(n.id)!;
          const pos = px(n, "hero");
          b.x = pos.x;
          b.y = pos.y;
        });
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        gsap.ticker.remove(ticker);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("resize", onResize);
        settleTimers.forEach((t) => window.clearTimeout(t));
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="w11-root" ref={rootRef}>
      <a href="#w11-main" className="w11-skip">Skip to main content</a>

      {/* Visually-prominent + semantic H1 lives in the hero scene caption below.
          This sr-only one guarantees a single canonical H1 for AT/no-JS. */}
      <h1 className="w11-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids. Cloud security
        engineer building AI-native security platforms.
      </h1>

      {/* ── Decorative attack-graph layer (fixed, follows the page) ────────── */}
      <div className="w11-graph" aria-hidden="true">
        <svg className="w11-edges" preserveAspectRatio="none" focusable="false">
          {EDGES.map((e) => (
            <line
              key={`${e.a}-${e.b}`}
              className={`w11-edge${e.toxic ? " w11-edge--toxic" : ""}`}
              data-a={e.a}
              data-b={e.b}
              data-toxic={e.toxic ? "1" : "0"}
            />
          ))}
        </svg>
        {NODES.map((n) => (
          <div
            key={n.id}
            className={`w11-node w11-node--${n.kind}`}
            data-id={n.id}
            data-toxic={n.toxic ? "1" : "0"}
          >
            <span className="w11-node-dot" />
            {n.label && <span className="w11-node-label">{n.label}</span>}
          </div>
        ))}
        <div className="w11-grid" />
      </div>

      <nav className="w11-nav" aria-label="Primary navigation">
        <span className="w11-nav-logo">
          KK<span className="w11-nav-logo-dot">.</span>
        </span>
        <ul className="w11-nav-links" role="list">
          <li><a href="#w11-stats" className="w11-nav-link">Signals</a></li>
          <li><a href="#w11-expertise" className="w11-nav-link">Disciplines</a></li>
          <li><a href="#w11-work" className="w11-nav-link">Work</a></li>
          <li><a href="#w11-contact" className="w11-nav-link">Contact</a></li>
        </ul>
        <span className="w11-nav-status">
          <span className="w11-status-dot" aria-hidden="true" />
          Open to work
        </span>
      </nav>

      {/* ── Semantic / scroll-driving scenes ──────────────────────────────── */}
      <main id="w11-main" className="w11-main">
        {/* HERO */}
        <section className="w11-scene w11-scene--hero" aria-labelledby="w11-hero-name">
          <div className="w11-scene-inner w11-hero-inner">
            <p className="w11-eyebrow">
              <span className="w11-eyebrow-tag">{SCENE_CAPTIONS.hero.tag}</span>
              Sr. Security Engineer · Yahoo Paranoids
            </p>
            <p id="w11-hero-name" className="w11-hero-name">
              Koushik <span className="w11-hero-name-2">Kotamraju</span>
            </p>
            <p className="w11-hero-lede">
              Cloud security engineer building AI-native security platforms —
              production systems, not prototypes. Every account, role, finding and
              project below is a node in one graph that resolves around the person at
              its center.
            </p>
            <div className="w11-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="w11-btn w11-btn--primary">
                Email me
              </a>
              <a href="/resume" className="w11-btn w11-btn--ghost">
                Résumé
              </a>
            </div>
            <div className="w11-hero-foot">
              <span className="w11-chip">9 years</span>
              <span className="w11-chip">AWS Solutions Architect</span>
              <span className="w11-chip">AWS Security Specialty</span>
              <span className="w11-chip">CIEM · CNAPP · Detection</span>
            </div>
            <p className="w11-scrollcue" aria-hidden="true">Scroll — the graph re-solves ↓</p>
          </div>
        </section>

        {/* STATS */}
        <section
          id="w11-stats"
          className="w11-scene w11-scene--stats"
          aria-labelledby="w11-stats-head"
        >
          <div className="w11-scene-inner">
            <header className="w11-scene-head">
              <span className="w11-scene-tag">{SCENE_CAPTIONS.stats.tag}</span>
              <h2 id="w11-stats-head" className="w11-scene-title">{SCENE_CAPTIONS.stats.title}</h2>
            </header>
            <div className="w11-metrics">
              {METRICS.map((m) => (
                <div key={m.key} className="w11-metric" role="group" aria-label={m.ariaLabel}>
                  <span className={`w11-metric-num ${m.numClass}`} aria-hidden="true">
                    0{m.suffix}
                  </span>
                  <span className="w11-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
            <p className="w11-scene-note">
              The 62 toxic combinations and 65+ escalation paths light their edges
              oxblood as they resolve — the critical sub-graph the work targets.
            </p>
          </div>
        </section>

        {/* EXPERTISE */}
        <section
          id="w11-expertise"
          className="w11-scene w11-scene--expertise"
          aria-labelledby="w11-exp-head"
        >
          <div className="w11-scene-inner">
            <header className="w11-scene-head">
              <span className="w11-scene-tag">{SCENE_CAPTIONS.expertise.tag}</span>
              <h2 id="w11-exp-head" className="w11-scene-title">{SCENE_CAPTIONS.expertise.title}</h2>
            </header>
            <ol className="w11-list" role="list">
              {EXPERTISE.map((item) => (
                <li key={item.num} className="w11-list-row">
                  <span className="w11-list-num" aria-hidden="true">{item.num}</span>
                  <div className="w11-list-body">
                    <h3 className="w11-list-name">{item.name}</h3>
                    <p className="w11-list-desc">{item.desc}</p>
                  </div>
                  <span className="w11-list-meta" aria-hidden="true">{item.meta}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WORK */}
        <section
          id="w11-work"
          className="w11-scene w11-scene--work"
          aria-labelledby="w11-work-head"
        >
          <div className="w11-scene-inner">
            <header className="w11-scene-head">
              <span className="w11-scene-tag">{SCENE_CAPTIONS.work.tag}</span>
              <h2 id="w11-work-head" className="w11-scene-title">{SCENE_CAPTIONS.work.title}</h2>
            </header>
            <div className="w11-projects">
              {PROJECTS.map((p) => (
                <article key={p.id} className="w11-proj" aria-label={`Project: ${p.name}`}>
                  <div className="w11-proj-top">
                    <span className="w11-proj-id" aria-hidden="true">{p.id}</span>
                    <span className="w11-proj-metric">{p.metric}</span>
                  </div>
                  <h3 className="w11-proj-name">{p.name}</h3>
                  <p className="w11-proj-desc">{p.desc}</p>
                  <div className="w11-proj-tags" aria-label="Technologies">
                    {p.tags.map((t) => (
                      <span key={t} className="w11-chip">{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="w11-contact"
          className="w11-scene w11-scene--contact"
          aria-labelledby="w11-contact-head"
        >
          <div className="w11-scene-inner w11-contact-inner">
            <header className="w11-scene-head">
              <span className="w11-scene-tag">{SCENE_CAPTIONS.contact.tag}</span>
              <h2 id="w11-contact-head" className="w11-scene-title">
                Open to Staff &amp; Principal Security Engineer roles.
              </h2>
            </header>
            <p className="w11-contact-note">AI Security · Cloud Security · Detection. Still shipping, still curious.</p>
            <div className="w11-links">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="w11-clink">
                <span className="w11-clink-k">Email</span>
                <span className="w11-clink-v">koushik.kotamraju1610@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/koushikkotamraju/"
                className="w11-clink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w11-clink-k">LinkedIn</span>
                <span className="w11-clink-v">in/koushikkotamraju</span>
              </a>
              <a
                href="https://github.com/koushik1610"
                className="w11-clink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w11-clink-k">GitHub</span>
                <span className="w11-clink-v">github.com/koushik1610</span>
              </a>
            </div>
            <p className="w11-colophon">koushik.io — one graph, resolved.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

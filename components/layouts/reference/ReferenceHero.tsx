"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   REFERENCE · layout variant: reference · class prefix: rf-
   Stripe-docs-grade API reference for the Koushik API: a light three-zone
   layout (sticky rail · endpoint prose · dark response panel) where
   endpoints are GET /koushik/experience, GET /koushik/evidence, and
   POST /koushik/hire. Palette: warm white #fbfaf7 · ink #151417 · muted
   #5c5a63 · owned accent: blurple, derived from the registry token. The
   response panel is the one deliberate dark zone. Animation owner: GSAP.
   Every stat below is defined ONCE per endpoint and rendered into both the
   attribute table and the response panel — no hand-duplicated numbers.
───────────────────────────────────────────────────────────────────────────── */

interface Attr {
  key: string;
  value: string;
  /* the compact panel echoes a subset of attrs as count-up figures */
  panelValue?: string;
  required?: boolean;
}

interface Endpoint {
  id: string;
  railLabel: string;
  method: "GET" | "POST";
  path: string;
  heading: string;
  prose: string;
  attrs: Attr[];
  panelStatus: string;
  /* swap grid order so the two GET endpoints don't read as one template
     stamped twice */
  panelFirst?: boolean;
}

const INTRO_RAIL = { id: "rf-intro", railLabel: "Introduction" } as const;

const ENDPOINTS: Endpoint[] = [
  {
    id: "rf-experience",
    railLabel: "GET /experience",
    method: "GET",
    path: "/koushik/experience",
    heading: "Detection at estate scale",
    prose:
      "Own the end-to-end lifecycle of 200+ Python/Lambda detection signatures evaluating 1,400+ AWS accounts — the posture scores the company is measured against. The v6.0 release added 50+ new baselines, the largest single control expansion in program history, each grounded in a MITRE ATT&CK gap analysis against real-world techniques from cloud incident-response data.",
    attrs: [
      { key: "signatures", value: "200+ Python/Lambda", panelValue: "200+" },
      { key: "accounts_evaluated", value: "1,400+ AWS", panelValue: "1,400+" },
      { key: "baselines_v6", value: "50+ · largest release in program history", panelValue: "50+" },
      { key: "reviews", value: "150+ PSR · Product Security, Network, Identity" },
    ],
    panelStatus: "200 OK",
  },
  {
    id: "rf-evidence",
    railLabel: "GET /evidence",
    method: "GET",
    path: "/koushik/evidence",
    heading: "Benchmarked before trusted",
    prose:
      "Built the GOAT benchmark first — 32 ground-truth findings — then evaluated the IAM audit agent against all 32. 65+ escalation paths catalogued across 10 vulnerability classes. Antitoxin catalogues 62 toxic IAM combinations with a graph-theoretic minimum cut-set dissolution. A self-learning research router orchestrates 19 models across 5 providers at $1.40 per run.",
    attrs: [
      { key: "goat_benchmarks", value: "32 ground-truth findings — built first, evaluated against all 32", panelValue: "32" },
      { key: "escalation_paths", value: "65+ across 10 vulnerability classes", panelValue: "65+" },
      { key: "toxic_combinations", value: "62 (Antitoxin, minimum cut-set)", panelValue: "62" },
      { key: "research_router", value: "19 models · 5 providers · $1.40/run" },
    ],
    panelStatus: "200 OK",
    panelFirst: true,
  },
];

const HIRE = {
  id: "rf-hire",
  railLabel: "POST /hire",
  path: "/koushik/hire",
  heading: "Requires no auth. Returns immediately.",
  prose: "Open to Staff and Principal Security Engineer roles — AI Security, Detection Engineering, and cloud identity governance.",
  params: [
    { key: "role", required: true, value: "staff | principal" },
    { key: "team", required: true, value: "yours" },
  ],
} as const;

const RAIL = [INTRO_RAIL, ...ENDPOINTS.map((e) => ({ id: e.id, railLabel: e.railLabel })), { id: HIRE.id, railLabel: HIRE.railLabel }];

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

function Method({ verb, filled }: { verb: "GET" | "POST"; filled?: boolean }) {
  return (
    <span className={`rf-method rf-method--${verb.toLowerCase()}${filled ? " rf-method--filled" : ""}`}>
      {verb}
    </span>
  );
}

function CtaRow() {
  return (
    <div className="rf-cta-row">
      <a href="mailto:koushik.kotamraju1610@gmail.com" className="rf-btn rf-btn--primary">Email me</a>
      <a href="/resume" className="rf-btn rf-btn--ghost">Résumé</a>
    </div>
  );
}

function AvailBadge({ className }: { className: string }) {
  return (
    <p className={className}>
      <span className="rf-open-dot" aria-hidden="true" /> Open to opportunities
    </p>
  );
}

function ResponsePanel({
  status,
  rows,
  compact,
}: {
  status: string;
  rows: { key: string; value: string; isCount?: boolean }[];
  compact?: boolean;
}) {
  return (
    <div className={`rf-panel${compact ? " rf-panel--compact" : ""}`}>
      <div className="rf-panel-head"><span className="rf-panel-status">{status}</span></div>
      <dl className="rf-panel-body">
        {rows.map((r) => (
          <div key={r.key}>
            <dt>{r.key}</dt>
            <dd>{r.isCount ? <CountUp value={r.value} className="rf-panel-num" /> : r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ReferenceHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      const intro = gsap.from(".rf-intro > *", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      gsap.utils.toArray<HTMLElement>(".rf-reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 14,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
          },
        });
      });

      return () => settleTimers.forEach((t) => window.clearTimeout(t));
    },
    { scope: rootRef }
  );

  return (
    <div className="rf-root" ref={rootRef}>
      <a href="#rf-main" className="rf-skip">Skip to main content</a>

      <nav className="rf-nav" aria-label="Primary navigation">
        <span className="rf-meta" aria-hidden="true">api reference · v9 · base url: koushik.io</span>
        <span className="rf-open">
          <span className="rf-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <div className="rf-shell">
        {/* ── Rail ──────────────────────────────────────────────────────── */}
        <nav className="rf-rail" aria-label="Reference sections">
          <ol>
            {RAIL.map((r) => (
              <li key={r.id}><a href={`#${r.id}`}>{r.railLabel}</a></li>
            ))}
          </ol>
        </nav>

        <main id="rf-main" className="rf-main">
          {/* ── Introduction ──────────────────────────────────────────── */}
          <section id={INTRO_RAIL.id} className="rf-intro" aria-labelledby="rf-intro-head">
            <p className="rf-path">
              <Method verb="GET" /> <span className="rf-path-str">/koushik</span>
            </p>
            <h1 id="rf-intro-head" className="rf-name">Koushik Kotamraju</h1>
            <p className="rf-lede">
              Cloud security engineer building AI-native security platforms —{" "}
              <strong>production systems, not prototypes.</strong>
            </p>
            <p className="rf-hook">
              A small team. 2,800+ cloud accounts. The math only works if you build the right systems.
            </p>
            <CtaRow />
            <AvailBadge className="rf-avail" />
            <ResponsePanel
              status="200 OK"
              rows={[
                { key: "role", value: '"Sr. Security Engineer · Yahoo Paranoids"' },
                { key: "experience", value: '"9 years"' },
                { key: "status", value: '"open_to_opportunities"' },
              ]}
            />
          </section>

          {/* ── GET endpoints ─────────────────────────────────────────── */}
          {ENDPOINTS.map((e) => (
            <section key={e.id} id={e.id} className="rf-endpoint rf-reveal" aria-labelledby={`${e.id}-head`}>
              <p className="rf-path"><Method verb={e.method} /> <span className="rf-path-str">{e.path}</span></p>
              <h2 id={`${e.id}-head`}>{e.heading}</h2>
              <p className="rf-prose">{e.prose}</p>
              <div className={`rf-endpoint-grid${e.panelFirst ? " rf-endpoint-grid--reverse" : ""}`}>
                <dl className="rf-attrs">
                  {e.attrs.map((a) => (
                    <div key={a.key}><dt>{a.key}</dt><dd>{a.value}</dd></div>
                  ))}
                </dl>
                <ResponsePanel
                  compact
                  status={e.panelStatus}
                  rows={e.attrs
                    .filter((a) => a.panelValue)
                    .map((a) => ({ key: a.key.replace(/_.*$/, ""), value: a.panelValue!, isCount: true }))}
                />
              </div>
            </section>
          ))}

          {/* ── POST /hire — the conversion block ─────────────────────── */}
          <section id={HIRE.id} className="rf-endpoint rf-hire rf-reveal" aria-labelledby="rf-hire-head">
            <p className="rf-path"><Method verb="POST" filled /> <span className="rf-path-str">{HIRE.path}</span></p>
            <h2 id="rf-hire-head">{HIRE.heading}</h2>
            <p className="rf-prose">{HIRE.prose}</p>
            <div className="rf-endpoint-grid">
              <dl className="rf-attrs rf-attrs--params">
                {HIRE.params.map((p) => (
                  <div key={p.key}>
                    <dt>{p.key} {p.required && <span className="rf-required">required</span>}</dt>
                    <dd><code>{p.value}</code></dd>
                  </div>
                ))}
              </dl>
              <ResponsePanel compact status="201 Created" rows={[{ key: "next_step", value: '"email"' }]} />
            </div>
            <CtaRow />
          </section>

          {/* ── Support / contact ──────────────────────────────────────── */}
          <section className="rf-support rf-reveal" aria-labelledby="rf-support-head">
            <h2 id="rf-support-head">Support</h2>
            <ul className="rf-contacts" role="list">
              {CONTACT.map((c) => (
                <li key={c.k}>
                  <a
                    href={c.href}
                    className="rf-contact-link"
                    {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="rf-contact-k">{c.k}</span>
                    <span className="rf-contact-v">{c.v}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// ── Content ─────────────────────────────────────────────────────────────────

interface Stat {
  key: string;
  target: number;
  duration: number;
  format?: (v: number) => string;
  initial: string;
  numClass: string;
  label: string;
  sub: string;
  ariaLabel: string;
}

const STATS: Stat[] = [
  {
    key: "accounts",
    target: 2823,
    duration: 1.8,
    initial: "0",
    numClass: "w6-num-accounts",
    label: "Cloud Accounts",
    sub: "Yahoo · AWS + GCP",
    ariaLabel: "2,823 cloud accounts",
  },
  {
    key: "sigs",
    target: 222,
    duration: 1.4,
    initial: "0",
    numClass: "w6-num-sigs",
    label: "Detection Signatures",
    sub: "0% false-positive rate",
    ariaLabel: "222 active detection signatures",
  },
  {
    key: "recall",
    target: 100,
    duration: 1.4,
    format: (v) => Math.round(v) + "%",
    initial: "0%",
    numClass: "w6-num-recall",
    label: "GOAT Recall",
    sub: "32 / 32 findings · 0 FP",
    ariaLabel: "100 percent GOAT benchmark recall",
  },
  {
    key: "cost",
    target: 1.4,
    duration: 1.2,
    format: (v) => "$" + v.toFixed(2),
    initial: "$0.00",
    numClass: "w6-num-cost",
    label: "Per Research Run",
    sub: "19 models · 5 providers",
    ariaLabel: "1 dollar 40 cents per research run",
  },
];

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "222 active signatures across 1,500+ AWS accounts — 0% false positives. CIS-benchmarked baselines, MITRE ATT&CK coverage of 74 techniques, deployed via Terraform.",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "AI-native IAM audit agent traversing 65+ escalation paths across 10 vulnerability classes. 100% recall on the GOAT benchmark — 32/32 findings, zero false positives.",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "Multi-agent orchestration across 19 models from 5 providers. Agentic SOAR workstation on a 1,767-node knowledge graph mined from 3,559 historical tickets.",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "2,823 AWS and GCP accounts. CNAPP-class attack-path simulation, AI-augmented CSPM, crown-jewel exposure tracking, Zero Trust enforcement.",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis: multi-cloud attack-path simulation. Antitoxin: graph-theoretic IAM analysis cataloguing 62 toxic combinations with minimum cut-set auto-remediation.",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    cat: "Attack Path Simulation",
    desc: "Multi-cloud attack-path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph layer — crown-jewel exposure, toxic IAM chains, cross-cloud paths.",
    metric: "2,823+",
    metricLabel: "accounts unified",
    tags: ["Python", "GCP SCC", "AWS Security Hub", "Vertex AI"],
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    cat: "Privilege Analysis",
    desc: "Boto3 tool-calling agent enumerating live AWS IAM. 65+ escalation paths across 10 vulnerability classes. LLM semantic interpretation surfaces transitive chains.",
    metric: "100%",
    metricLabel: "GOAT recall",
    tags: ["IAM", "Python", "Boto3"],
  },
  {
    id: "03",
    name: "Autonomous Threat Intel",
    cat: "AI Orchestration",
    desc: "Multi-agent pipeline across 19 models, 5 providers, performance-weighted router. Analyst-ready proposals at $1.40 per run — replaced a fully manual weekly process.",
    metric: "$1.40",
    metricLabel: "per run",
    tags: ["Multi-Agent", "Claude", "GPT-4"],
  },
  {
    id: "04",
    name: "Detection Engine",
    cat: "Detection Engineering",
    desc: "222 active signatures deployed via Terraform across 1,500+ AWS accounts. MITRE ATT&CK gap analysis against 74 real-world techniques. Zero false positives at scale.",
    metric: "222",
    metricLabel: "signatures",
    tags: ["Python", "Lambda", "Terraform"],
  },
] as const;

const PANELS = ["01", "02", "03", "04", "05"] as const;

// ── Component ───────────────────────────────────────────────────────────────

export default function WTheme06Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const countUp = (
        stat: Stat,
        container?: gsap.core.Tween,
        triggerEl?: Element
      ) => {
        const el = rootRef.current?.querySelector<HTMLElement>(`.${stat.numClass}`);
        if (!el) return;
        if (prefersReduced) {
          el.textContent = stat.format ? stat.format(stat.target) : String(stat.target);
          return;
        }
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: stat.duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: triggerEl ?? el,
            containerAnimation: container,
            start: container ? "left 70%" : "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = stat.format
              ? stat.format(obj.val)
              : Math.round(obj.val).toLocaleString();
          },
        });
      };

      const mm = gsap.matchMedia();

      // ── Desktop (motion OK): horizontal pinned scroll ──────────────────
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = rootRef.current?.querySelector<HTMLElement>(".w6-track");
        const panels = gsap.utils.toArray<HTMLElement>(".w6-panel");
        if (!track || panels.length === 0) return;

        const horizontal = gsap.to(track, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".w6-viewport",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + track.offsetWidth,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (panels.length - 1));
              const dots = rootRef.current?.querySelectorAll(".w6-rail-dot");
              dots?.forEach((d, i) =>
                d.classList.toggle("is-active", i === idx)
              );
              const bar = rootRef.current?.querySelector<HTMLElement>(".w6-progress-fill");
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        // Name reveal on panel 1
        if (!prefersReduced) {
          const split = SplitText.create(".w6-hero-name", {
            type: "words",
            mask: "words",
            aria: "none",
          });
          gsap.from(split.words, {
            yPercent: 110,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.15,
          });
          gsap.from(".w6-hero-meta > *", {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.5,
          });
        }

        // Count-ups tied to the horizontal container animation
        STATS.forEach((stat) => {
          const card = rootRef.current?.querySelector(
            `[data-stat="${stat.key}"]`
          );
          countUp(stat, horizontal, card ?? undefined);
        });

        // Expertise rows + project cards reveal as their panel enters
        gsap.from(".w6-exp-row", {
          autoAlpha: 0,
          x: 40,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".w6-panel-expertise",
            containerAnimation: horizontal,
            start: "left 65%",
            once: true,
          },
        });
        gsap.from(".w6-proj-card", {
          autoAlpha: 0,
          y: 44,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".w6-panel-work",
            containerAnimation: horizontal,
            start: "left 60%",
            once: true,
          },
        });

        return () => {
          // matchMedia auto-reverts; nothing extra
        };
      });

      // ── Mobile / tablet / reduced-motion: vertical stacked fallback ────
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        if (!prefersReduced) {
          const split = SplitText.create(".w6-hero-name", {
            type: "words",
            mask: "words",
            aria: "none",
          });
          gsap.from(split.words, {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
          });
          gsap.utils.toArray<HTMLElement>(".w6-panel").forEach((panel) => {
            gsap.from(panel.querySelectorAll(".w6-reveal"), {
              autoAlpha: 0,
              y: 28,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: { trigger: panel, start: "top 75%", once: true },
            });
          });
        }
        STATS.forEach((stat) => countUp(stat));
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="w6-root" ref={rootRef}>
      <a href="#w6-main" className="w6-skip">Skip to main content</a>
      <h1 className="w6-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids
      </h1>

      {/* ── Fixed chrome ─────────────────────────────────────────────────── */}
      <nav className="w6-nav" aria-label="Primary navigation">
        <span className="w6-nav-logo" aria-hidden="true">KK</span>
        <span className="w6-nav-role">Sr. Security Engineer</span>
        <a
          href="https://github.com/koushik1610"
          className="w6-nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>

      <div className="w6-progress" aria-hidden="true">
        <div className="w6-progress-fill" />
      </div>

      <ol className="w6-rail" aria-hidden="true">
        {PANELS.map((p, i) => (
          <li
            key={p}
            className={`w6-rail-dot${i === 0 ? " is-active" : ""}`}
          >
            <span className="w6-rail-num">{p}</span>
          </li>
        ))}
      </ol>

      {/* ── Horizontal viewport ──────────────────────────────────────────── */}
      <div className="w6-viewport" id="w6-main">
        <div className="w6-track">
          {/* Panel 1 — Identity */}
          <section className="w6-panel w6-panel-hero" aria-label="Introduction">
            <div className="w6-hero-inner">
              <p className="w6-hero-eyebrow w6-reveal">
                <span className="w6-dot" aria-hidden="true" />
                Sr. Security Engineer · Yahoo Paranoids
              </p>
              <div className="w6-hero-name" aria-hidden="true">
                Koushik<br />Kotamraju
              </div>
              <div className="w6-hero-meta">
                <p className="w6-hero-tagline w6-reveal">
                  Cloud security engineer building AI-native security
                  platforms — production systems, not prototypes.
                </p>
                <p className="w6-hero-hook w6-reveal">
                  4 engineers. 2,823 cloud accounts. The math only works if
                  you build the right systems.
                </p>
                <div className="w6-hero-ctas w6-reveal">
                  <a href="mailto:koushik.kotamraju1610@gmail.com" className="w6-hero-cta w6-hero-cta--primary">Get in touch</a>
                  <a href="https://github.com/koushik1610" className="w6-hero-cta" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <span className="w6-hero-hint" aria-hidden="true">
                    Scroll to advance<span className="w6-hint-arrow">→</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Panel 2 — Stats */}
          <section className="w6-panel w6-panel-stats" aria-label="Key metrics">
            <div className="w6-panel-head">
              <span className="w6-panel-index" aria-hidden="true">02</span>
              <h2 className="w6-panel-title w6-reveal">By the numbers</h2>
            </div>
            <div className="w6-stats-grid">
              {STATS.map((stat) => (
                <article
                  key={stat.key}
                  className="w6-stat-card w6-reveal"
                  data-stat={stat.key}
                  aria-label={stat.ariaLabel}
                >
                  <div className={`w6-stat-num ${stat.numClass}`} aria-hidden="true">
                    {stat.initial}
                  </div>
                  <div className="w6-stat-label">{stat.label}</div>
                  <div className="w6-stat-sub">{stat.sub}</div>
                </article>
              ))}
            </div>
          </section>

          {/* Panel 3 — Expertise */}
          <section
            className="w6-panel w6-panel-expertise"
            aria-label="What I build"
          >
            <div className="w6-panel-head">
              <span className="w6-panel-index" aria-hidden="true">03</span>
              <h2 className="w6-panel-title w6-reveal">What I build</h2>
            </div>
            <ol className="w6-exp-list" role="list">
              {EXPERTISE.map((item) => (
                <li key={item.num} className="w6-exp-row w6-reveal">
                  <span className="w6-exp-num" aria-hidden="true">{item.num}</span>
                  <div className="w6-exp-body">
                    <h3 className="w6-exp-name">{item.name}</h3>
                    <p className="w6-exp-desc">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Panel 4 — Work */}
          <section className="w6-panel w6-panel-work" aria-label="Selected work">
            <div className="w6-panel-head">
              <span className="w6-panel-index" aria-hidden="true">04</span>
              <h2 className="w6-panel-title w6-reveal">Selected work</h2>
            </div>
            <div className="w6-work-grid">
              {PROJECTS.map((proj) => (
                <article
                  key={proj.id}
                  className="w6-proj-card"
                  aria-label={`Project: ${proj.name}`}
                >
                  <div className="w6-proj-top">
                    <span className="w6-proj-cat">{proj.cat}</span>
                    <div
                      className="w6-proj-metric"
                      aria-label={`${proj.metric} ${proj.metricLabel}`}
                    >
                      <span className="w6-proj-metric-num">{proj.metric}</span>
                      <span className="w6-proj-metric-label">{proj.metricLabel}</span>
                    </div>
                  </div>
                  <h3 className="w6-proj-name">{proj.name}</h3>
                  <p className="w6-proj-desc">{proj.desc}</p>
                  <div className="w6-proj-tags" aria-label="Technologies">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="w6-tag">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Panel 5 — Contact */}
          <section className="w6-panel w6-panel-contact" aria-label="Contact">
            <div className="w6-contact-inner">
              <span className="w6-panel-index" aria-hidden="true">05</span>
              <p className="w6-contact-eyebrow w6-reveal">Open to opportunities</p>
              <h2 className="w6-contact-title w6-reveal">
                Let&apos;s build security that holds.
              </h2>
              <p className="w6-contact-sub w6-reveal">
                Open to Staff &amp; Principal Security Engineer and AI Security
                Engineering roles.
              </p>
              <div className="w6-contact-links w6-reveal">
                <a
                  href="mailto:koushik.kotamraju1610@gmail.com"
                  className="w6-contact-link w6-contact-link--primary"
                >
                  koushik.kotamraju1610@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/koushikkotamraju/"
                  className="w6-contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/koushik1610"
                  className="w6-contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

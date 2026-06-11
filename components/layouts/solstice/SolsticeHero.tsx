"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import "./styles.css";

// ── Content ─────────────────────────────────────────────────────────────────

// Rotating subhead words — morph weight in place (kinetic variable type).
// Geist exposes only the wght axis; width is not animatable here.
const ROTATOR = [
  { word: "Detection.", wght: 820 },
  { word: "IAM.", wght: 560 },
  { word: "AI Security.", wght: 720 },
  { word: "Architecture.", wght: 480 },
] as const;

const ROTATOR_PHRASE =
  "Cloud security engineering across detection, IAM, AI security, and architecture.";

const PULL = {
  value: "2,800+",
  unit: "cloud accounts",
  context:
    "secured across AWS and GCP. A lean team, a vast estate — the math only works if you build the right systems.",
} as const;

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "200+ active signatures at a 0% false-positive rate. CIS-benchmarked baselines and MITRE ATT&CK coverage of real-world techniques, deployed via Terraform.",
    meta: "0% FP",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "An AI-native audit agent traversing 65+ escalation paths across 10 vulnerability classes, with semantic interpretation of transitive privilege chains. 100% GOAT recall.",
    meta: "100% GOAT",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "Multi-agent orchestration across 19 models from 5 providers, riding a 1,700+-node knowledge graph. An agentic SOAR workstation at $1.40 per research run.",
    meta: "19 models",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "CNAPP-class attack-path simulation, AI-augmented CSPM, crown-jewel exposure tracking, and Zero Trust enforcement across 2,800+ cloud accounts.",
    meta: "2,800+ acct",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis multi-cloud attack-path simulation; Antitoxin graph-theoretic CIEM analysis cataloguing 62 toxic IAM combinations with minimum cut-set remediation.",
    meta: "62 combos",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    desc: "Multi-cloud attack-path simulation. GCP SCC and AWS Security Hub unified into an AI-enriched graph layer spanning the estate.",
    metric: "2,800+ accounts",
    tags: ["Python", "GCP SCC", "AWS Security Hub"],
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    desc: "A Boto3 tool-calling agent mapping 65+ escalation paths across 10 vulnerability classes. 100% GOAT recall, 32 of 32.",
    metric: "100% recall",
    tags: ["IAM", "Python", "Boto3"],
  },
  {
    id: "03",
    name: "Autonomous Threat Intel",
    desc: "19 models, 5 providers, a performance-weighted router. Analyst-ready proposals at $1.40 per run versus a $3.20 baseline.",
    metric: "$1.40 / run",
    tags: ["Multi-Agent", "Claude", "GPT"],
  },
  {
    id: "04",
    name: "Detection Engine",
    desc: "200+ active signatures shipped via Terraform. MITRE ATT&CK gap analysis with zero false positives at scale.",
    metric: "200+ signatures",
    tags: ["Python", "Lambda", "Terraform"],
  },
] as const;

// ── Component ───────────────────────────────────────────────────────────────

export default function SolsticeHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const rotEl = rootRef.current?.querySelector<HTMLElement>(".w14-rotator-word");
      const nameEl = rootRef.current?.querySelector<HTMLElement>(".w14-name");

      // ── Reduced motion: settle everything to a complete, static page ───────
      if (prefersReduced) {
        if (rotEl) {
          rotEl.textContent = ROTATOR[0].word;
          rotEl.style.fontVariationSettings = `"wght" ${ROTATOR[0].wght}`;
        }
        if (nameEl) {
          nameEl.style.fontVariationSettings = `"wght" 760`;
          nameEl.style.fontWeight = "760";
        }
        return;
      }

      // ── Masthead entrance ─────────────────────────────────────────────────
      const split = SplitText.create(".w14-name", {
        type: "lines,words",
        mask: "lines",
        aria: "none",
      });
      gsap.from(split.words, {
        yPercent: 120,
        rotate: 1.5,
        duration: 1.05,
        stagger: 0.09,
        ease: "power4.out",
        delay: 0.08,
      });
      gsap.from(".w14-masthead-meta > *", {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      });

      // ── SIGNATURE 1: variable-weight word rotator (morph IN PLACE) ─────────
      if (rotEl) {
        const state = { wght: ROTATOR[0].wght };
        rotEl.textContent = ROTATOR[0].word;
        rotEl.style.fontVariationSettings = `"wght" ${state.wght}`;

        const applyVar = () => {
          rotEl.style.fontVariationSettings = `"wght" ${Math.round(state.wght)}`;
        };

        const tl = gsap.timeline({ repeat: -1, delay: 1.1 });
        ROTATOR.forEach((_, i) => {
          const next = ROTATOR[(i + 1) % ROTATOR.length];
          // breathe down (thin/compress) as the word leaves
          tl.to(state, {
            wght: 320,
            duration: 0.42,
            ease: "power2.in",
            onUpdate: applyVar,
          })
            .to(rotEl, { autoAlpha: 0, duration: 0.18, ease: "power1.in" }, "<0.18")
            .add(() => {
              rotEl.textContent = next.word;
            })
            .to(rotEl, { autoAlpha: 1, duration: 0.2, ease: "power1.out" })
            // breathe up into the new word's target weight/width
            .to(state, {
              wght: next.wght,
              duration: 0.62,
              ease: "power3.out",
              onUpdate: applyVar,
            })
            .to({}, { duration: 1.5 }); // hold
        });
      }

      // ── SIGNATURE 2: scroll-linked weight map on the masthead name ─────────
      if (nameEl) {
        const w = { v: 800 };
        nameEl.style.fontVariationSettings = `"wght" ${w.v}`;
        nameEl.style.fontWeight = `${w.v}`;
        gsap.to(w, {
          v: 400,
          ease: "none",
          scrollTrigger: {
            trigger: ".w14-masthead",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          onUpdate: () => {
            const val = Math.round(w.v);
            nameEl.style.fontVariationSettings = `"wght" ${val}`;
            nameEl.style.fontWeight = `${val}`;
          },
        });
      }

      // ── Pull-quote stat reveal ────────────────────────────────────────────
      gsap.from(".w14-pull-value", {
        autoAlpha: 0,
        scale: 0.94,
        y: 24,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".w14-pull", start: "top 82%", once: true },
      });

      // ── Editorial rules draw in ───────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".w14-rule").forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        });
      });

      // ── Column rows rise ──────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".w14-anim-list").forEach((list) => {
        gsap.from(list.querySelectorAll(".w14-anim-row"), {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: list, start: "top 84%", once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="w14-root" ref={rootRef}>
      <a href="#w14-main" className="w14-skip">
        Skip to main content
      </a>
      <h1 className="w14-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids
      </h1>

      <nav className="w14-nav" aria-label="Primary navigation">
        <span className="w14-nav-logo" aria-hidden="true">
          Koushik Kotamraju
        </span>
        <span className="w14-nav-edition" aria-hidden="true">
          The Broadsheet · No. 14
        </span>
        <span className="w14-nav-status">
          <span className="w14-status-dot" aria-hidden="true" />
          Open to work
        </span>
      </nav>

      <main id="w14-main">
        {/* ── Masthead ─────────────────────────────────────────────────── */}
        <header className="w14-masthead">
          <p className="w14-kicker">
            <span aria-hidden="true">—</span> Sr. Security Engineer · Yahoo
            Paranoids · Est. nine years
          </p>

          <div className="w14-name" aria-hidden="true">
            Koushik
            <br />
            Kotamraju
          </div>

          <div className="w14-masthead-meta">
            {/* Variable-weight word rotator */}
            <p className="w14-rotator" aria-label={ROTATOR_PHRASE}>
              <span className="w14-rotator-static" aria-hidden="true">
                Building&nbsp;
              </span>
              <span className="w14-rotator-word" aria-hidden="true">
                Detection.
              </span>
            </p>
            <p className="w14-lede">
              Cloud security engineer building AI-native security platforms —
              production systems, not prototypes. Nine years across three
              organizations, holding a 2,800+-account estate together.
            </p>
            <div className="w14-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="w14-btn w14-btn--primary">Email me</a>
              <a href="/resume" className="w14-btn w14-btn--ghost">Résumé</a>
            </div>
            <div className="w14-masthead-foot">
              <span className="w14-fileref">Vol. IX — nine years in security</span>
              <span className="w14-fileref">Sunday edition</span>
              <span className="w14-fileref">koushik.io</span>
            </div>
          </div>
        </header>

        <div className="w14-rule w14-rule--accent" aria-hidden="true" />

        {/* ── Editorial body: asymmetric columns wrapping the pull-quote ─── */}
        <section
          id="w14-work"
          className="w14-feature"
          aria-labelledby="w14-feat-head"
        >
          <div className="w14-feature-head">
            <h2 id="w14-feat-head" className="w14-feature-title">
              What I build
            </h2>
            <span className="w14-feature-num" aria-hidden="true">
              Five disciplines
            </span>
          </div>

          <div className="w14-feature-body">
            {/* The pull-quote stat that text wraps around */}
            <aside className="w14-pull" aria-label={`${PULL.value} ${PULL.unit}`}>
              <span className="w14-pull-value" aria-hidden="true">
                {PULL.value}
              </span>
              <span className="w14-pull-unit" aria-hidden="true">
                {PULL.unit}
              </span>
              <span className="w14-pull-context" aria-hidden="true">
                {PULL.context}
              </span>
            </aside>

            <ol className="w14-index w14-anim-list" role="list">
              {EXPERTISE.map((item) => (
                <li key={item.num} className="w14-index-row w14-anim-row">
                  <span className="w14-index-num" aria-hidden="true">
                    {item.num}
                  </span>
                  <div className="w14-index-bodytext">
                    <h3 className="w14-index-name">{item.name}</h3>
                    <p className="w14-index-desc">{item.desc}</p>
                  </div>
                  <span className="w14-index-meta" aria-hidden="true">
                    {item.meta}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="w14-rule" aria-hidden="true" />

        {/* ── Selected Work ────────────────────────────────────────────── */}
        <section
          id="w14-projects"
          className="w14-block"
          aria-labelledby="w14-work-head"
        >
          <div className="w14-feature-head">
            <h2 id="w14-work-head" className="w14-feature-title">
              Selected work
            </h2>
            <span className="w14-feature-num" aria-hidden="true">
              Four systems
            </span>
          </div>
          <ol className="w14-projects w14-anim-list" role="list">
            {PROJECTS.map((proj) => (
              <li
                key={proj.id}
                className="w14-proj-row w14-anim-row"
                aria-label={`Project: ${proj.name}`}
              >
                <span className="w14-proj-id" aria-hidden="true">
                  {proj.id}
                </span>
                <div className="w14-proj-body">
                  <h3 className="w14-proj-name">{proj.name}</h3>
                  <p className="w14-proj-desc">{proj.desc}</p>
                  <div className="w14-proj-tags" aria-label="Technologies">
                    {proj.tags.map((t) => (
                      <span key={t} className="w14-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="w14-proj-metric" aria-hidden="true">
                  {proj.metric}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="w14-rule" aria-hidden="true" />

        {/* ── Contact / Colophon ───────────────────────────────────────── */}
        <section
          id="w14-contact"
          className="w14-colophon"
          aria-labelledby="w14-contact-head"
        >
          <div className="w14-colophon-left">
            <p className="w14-kicker">
              <span aria-hidden="true">—</span> Letters
            </p>
            <h2 id="w14-contact-head" className="w14-colophon-title">
              The next edition: Staff &amp; Principal Security Engineer roles.
            </h2>
            <p className="w14-colophon-note">Corrections, tips, and offers — by wire below.</p>
          </div>
          <div className="w14-colophon-links">
            <a
              href="mailto:koushik.kotamraju1610@gmail.com"
              className="w14-clink"
            >
              <span className="w14-clink-k">Email</span>
              <span className="w14-clink-v">koushik.kotamraju1610@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/koushikkotamraju/"
              className="w14-clink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="w14-clink-k">LinkedIn</span>
              <span className="w14-clink-v">in/koushikkotamraju</span>
            </a>
            <a
              href="https://github.com/koushik1610"
              className="w14-clink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="w14-clink-k">GitHub</span>
              <span className="w14-clink-v">github.com/koushik1610</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

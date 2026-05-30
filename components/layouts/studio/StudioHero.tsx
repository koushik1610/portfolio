"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import type { Theme } from "@/lib/themes";
import CountUp from "@/components/CountUp";
import { getCurrentStats } from "@/lib/stats";

const MARQUEE_TILES = [
  "Detection Engineering",
  "IAM Privilege Analysis",
  "Cloud Security",
  "AI-Augmented Reviews",
  "Attack Path Simulation",
  "MITRE ATT&CK",
];
const TILES_3X = [...MARQUEE_TILES, ...MARQUEE_TILES, ...MARQUEE_TILES];

const BIO =
  "With nine years of security engineering across three organizations, I build AI-native security platforms — agentic systems that run at machine speed across 2,500+ cloud accounts, multi-agent orchestration that scales a 4-engineer team to enterprise coverage, and privilege analysis tools with provable recall.";

const EXPERIENCE = [
  {
    period: "2019 — PRESENT",
    company: "Yahoo",
    role: "Sr. Security Engineer",
    detail: "Agentic security workflows · AI-native security tooling · Detection Engineering · IAM Analysis · 2,500+ cloud accounts · 4-engineer team",
  },
  {
    period: "2016 — 2019",
    company: "Cyr3con",
    role: "Security Engineer",
    detail: "Threat intelligence · Predictive security analytics · ML-based CVE prioritization",
  },
  {
    period: "2014 — 2016",
    company: "Infosys",
    role: "Systems Engineer",
    detail: "Network security architecture · Security operations · Infrastructure hardening",
  },
];

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    tag: "ATTACK PATH SIM",
    detail:
      "Multi-cloud attack path simulation platform. GCP SCC + AWS Security Hub unified into a single AI-enriched data layer. Crown-jewel exposure, toxic combination trends, cross-cloud attack chains.",
  },
  {
    id: "02",
    name: "IAM Escalation Skill",
    tag: "PRIVILEGE ANALYSIS",
    detail:
      "Tool-calling agent covering 65+ escalation paths across 10 vulnerability classes. Static IAM policy graph analysis + LLM semantic interpretation catch transitive chains rule-based tools miss. 100% recall on GOAT benchmark — 32/32 findings, zero false positives.",
  },
  {
    id: "03",
    name: "AI Research Pipeline",
    tag: "AI ORCHESTRATION",
    detail:
      "Autonomous 5-stage threat intelligence pipeline (triage → analyze → decompose → peer review → synthesize) orchestrating 19 foundation models across 5 providers via a dynamic allocation router. $1.40 per sweep. 55% cost reduction vs single-model baseline.",
  },
  {
    id: "04",
    name: "Detection Engine",
    tag: "DETECTION ENG",
    detail:
      "200+ active detection signatures. MITRE ATT&CK gap analysis against 74 real-world techniques. Zero false positives. Deployed across 1,500+ AWS accounts.",
  },
] as const;

// ── Sub-components ────────────────────────────────────────────────────────────

function MagneticPhoto() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  return (
    <div
      className="stu-photo-wrap"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mouseX.set(((e.clientX - cx) / rect.width) * 24);
        mouseY.set(((e.clientY - cy) / rect.height) * 24);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div className="stu-photo-inner" style={{ x: springX, y: springY }}>
        <Image
          src="/profile.jpeg"
          alt="Koushik Kotamraju"
          width={300}
          height={300}
          className="stu-photo"
          priority
        />
      </motion.div>
    </div>
  );
}

function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span className="stu-word" style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
}

function ScrollRevealText({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) {
  const words = text.split(" ");
  return (
    <p className="stu-bio-reveal" aria-label={text}>
      {words.map((word, i) => {
        const start = (i / words.length) * 0.65;
        const end = Math.min(start + (1 / words.length) * 0.65 + 0.02, 1);
        return (
          <RevealWord
            key={i}
            word={word}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div ref={ref} className="stu-marquee-outer" aria-hidden="true">
      <div className="stu-marquee-sticky">
        <motion.div className="stu-marquee-strip" style={{ x }}>
          {TILES_3X.map((tile, i) => (
            <div key={i} className="stu-marquee-tile">
              <span className="stu-tile-dot" />
              <span className="stu-tile-text">{tile}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // scale starts collapsing at 40% through exit; opacity follows at 60% — staggered feel
  const scale = useTransform(scrollYProgress, [0.4, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.5]);

  return (
    <div ref={ref} className="stu-card-outer">
      <motion.article
        className="stu-card-inner"
        style={{ scale, opacity, top: `${5 + index * 1.5}rem` }}
        aria-label={`Project: ${project.name}`}
      >
        <div className="stu-card-header">
          <span className="stu-card-id">{project.id}</span>
          <span className="stu-card-tag">{project.tag}</span>
        </div>
        <h3 className="stu-card-name">{project.name}</h3>
        <p className="stu-card-detail">{project.detail}</p>
      </motion.article>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function StudioHero({ theme }: { theme: Theme }) {
  void theme;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="stu-root">
      {/* NAV */}
      <nav className="stu-nav" aria-label="Primary navigation">
        <span className="stu-nav-logo">KK</span>
        <ul className="stu-nav-links">
          <li><a href="#experience" className="stu-nav-link">Experience</a></li>
          <li><a href="#projects" className="stu-nav-link">Projects</a></li>
          <li><a href="#contact" className="stu-nav-link">Contact</a></li>
        </ul>
      </nav>

      {/* SECTION 1: ABOUT */}
      <section id="about" ref={heroRef} className="stu-hero">
        <div className="stu-hero-photo">
          <MagneticPhoto />
        </div>
        <div className="stu-hero-text">
          <p className="stu-overline">Sr. Security Engineer · Yahoo</p>
          <h1 className="stu-name">
            Koushik<br />Kotamraju
          </h1>
          <p className="stu-tagline">Security. At scale.</p>
          <ScrollRevealText text={BIO} progress={heroProgress} />
          <div className="stu-stats">
            {getCurrentStats().map(({ value, label }) => (
              <div key={label} className="stu-stat">
                <CountUp value={value} className="stu-stat-value" />
                <span className="stu-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeSection />

      {/* SECTION 2: EXPERIENCE */}
      <section id="experience" className="stu-section">
        <h2 className="stu-section-title">Experience</h2>
        <ol className="stu-exp-list">
          {EXPERIENCE.map((item) => (
            <li key={item.company} className="stu-exp-item">
              <span className="stu-exp-period">{item.period}</span>
              <div className="stu-exp-body">
                <div className="stu-exp-company">{item.company}</div>
                <div className="stu-exp-role">{item.role}</div>
                <p className="stu-exp-detail">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SECTION 3: PROJECTS */}
      <section id="projects" className="stu-projects-section">
        <div className="stu-projects-header">
          <h2 className="stu-section-title">Projects</h2>
        </div>
        <div className="stu-cards">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section id="contact" className="stu-contact">
        <p className="stu-contact-label">Let&apos;s talk</p>
        <h2 className="stu-contact-heading">
          Focused on cloud security at scale.
        </h2>
        <div className="stu-contact-links">
          <a
            href="mailto:koushik.kotamraju1610@gmail.com"
            className="stu-contact-link"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/koushikkotamraju/"
            className="stu-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/koushik1610"
            className="stu-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

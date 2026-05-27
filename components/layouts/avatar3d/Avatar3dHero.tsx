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

// ── Content ───────────────────────────────────────────────────────────────────

const BIO =
  "With nine years of security engineering across three organizations, I focus on detection at cloud account scale, IAM privilege analysis, and AI systems that give a small team genuine leverage over a large attack surface. I enjoy building systems that find what others miss.";

const DOMAIN_TILES = [
  "Detection Engineering",
  "IAM Privilege Analysis",
  "Cloud Security",
  "AI-Augmented Reviews",
  "Attack Path Simulation",
  "MITRE ATT&CK",
  "Threat Intelligence",
  "Security Baselines",
  "Multi-Cloud Coverage",
];
const TILES_2X = [...DOMAIN_TILES, ...DOMAIN_TILES];

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "200+ active Python/Lambda signatures across our AWS estate. Runtime error remediation, false positive root-causing, and new control development. CIS-benchmarked baselines grounded in real MITRE ATT&CK technique coverage.",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "65+ privilege escalation paths across 10 vulnerability classes. Static IAM policy graph analysis combined with LLM semantic interpretation. 100% recall on GOAT benchmark — 32/32 findings, zero false positives.",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "Multi-model orchestration pipeline across 19 foundation models from 5 providers. Security review agent backed by a 1,767-node knowledge graph from 1,400+ historical tickets. 123 security reviews across all business units.",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "Multi-cloud coverage across 2,500+ cloud accounts. Cross-cloud attack path simulation unifying GCP SCC and AWS Security Hub into a single AI-enriched data layer with crown-jewel exposure tracking.",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis: attack path simulation platform in active research. Antitoxin: graph-theoretic IAM toxic combination dissolution cataloguing 62 combinations across 8 attack categories with minimum cut-set remediation.",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    category: "ATTACK PATH SIM",
    desc: "Multi-cloud attack path simulation platform. GCP SCC + AWS Security Hub unified into a single AI-enriched data layer. Crown-jewel exposure, toxic combination trends, cross-cloud attack chains.",
    metric: "2,500+",
    metricLabel: "accounts unified",
    tags: ["Python", "GCP SCC", "AWS SHub", "Vertex AI", "BigQuery"],
  },
  {
    id: "02",
    name: "IAM Escalation Skill",
    category: "PRIVILEGE ANALYSIS",
    desc: "65+ privilege escalation paths across 10 vulnerability classes. Static policy graph analysis + LLM semantic interpretation. 100% recall on GOAT benchmark.",
    metric: "100%",
    metricLabel: "GOAT recall",
    tags: ["IAM Analysis", "Graph Theory", "MITRE ATT&CK", "Python"],
  },
  {
    id: "03",
    name: "AI Research Pipeline",
    category: "AI ORCHESTRATION",
    desc: "Self-learning security research pipeline orchestrating 19 foundation models across 5 providers. Performance-weighted router that improves its own model selection over time.",
    metric: "$1.40",
    metricLabel: "per research sweep",
    tags: ["Python", "Claude", "Gemini", "GPT-4", "Multi-model"],
  },
  {
    id: "04",
    name: "Detection Engine",
    category: "DETECTION ENG",
    desc: "200+ active detection signatures. MITRE ATT&CK gap analysis against 74 real-world techniques from AWS CIRT incident data. Zero false positives across 1,500+ AWS accounts.",
    metric: "200+",
    metricLabel: "active signatures",
    tags: ["Python", "Lambda", "AWS", "MITRE ATT&CK", "CIS"],
  },
] as const;

// ── Sub-components ────────────────────────────────────────────────────────────

function MagneticAvatar({ parallaxY }: { parallaxY: MotionValue<number> }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  return (
    <motion.div
      className="avt-avatar-wrap"
      style={{ y: parallaxY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mouseX.set(((e.clientX - cx) / rect.width) * 30);
        mouseY.set(((e.clientY - cy) / rect.height) * 30);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div style={{ x: springX, y: springY }}>
        <Image
          src="/my-3d-avatar.png"
          alt="Koushik Kotamraju 3D avatar"
          width={520}
          height={520}
          className="avt-avatar-img"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

function AnimatedWord({
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
    <motion.span className="avt-anim-word" style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className="avt-bio-text" aria-label={text}>
      {words.map((word, i) => (
        <AnimatedWord
          key={i}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, Math.min((i + 1) / words.length + 0.01, 1)]}
        />
      ))}
    </p>
  );
}

const MARQUEE_SCROLL_RANGE = 2400;

function ScrollMarquee() {
  const { scrollY } = useScroll();
  // Row 1 drifts right, row 2 drifts left as page scrolls
  const row1X = useTransform(scrollY, [0, MARQUEE_SCROLL_RANGE], [-160, 480]);
  const row2X = useTransform(scrollY, [0, MARQUEE_SCROLL_RANGE], [160, -480]);

  return (
    <div className="avt-marquee-section" aria-hidden="true">
      <div className="avt-marquee-row-wrap">
        <motion.div className="avt-marquee-row" style={{ x: row1X }}>
          {TILES_2X.map((tile, i) => (
            <div key={i} className="avt-tile">
              <span className="avt-tile-dot" />
              {tile}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="avt-marquee-row-wrap">
        <motion.div className="avt-marquee-row" style={{ x: row2X }}>
          {TILES_2X.map((tile, i) => (
            <div key={i} className="avt-tile">
              <span className="avt-tile-dot" />
              {tile}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ExpertiseItem({
  item,
  index,
}: {
  item: (typeof EXPERTISE)[number];
  index: number;
}) {
  return (
    <motion.div
      className="avt-exp-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="avt-exp-num">{item.num}</span>
      <div className="avt-exp-body">
        <div className="avt-exp-name">{item.name}</div>
        <p className="avt-exp-desc">{item.desc}</p>
      </div>
    </motion.div>
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
  // scale starts at 40%, opacity at 60%
  const scale = useTransform(scrollYProgress, [0.4, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.5]);

  return (
    <div ref={ref} className="avt-card-outer">
      <motion.article
        className="avt-card"
        style={{ scale, opacity, top: `${7 + index * 1.75}rem` }}
        aria-label={`Project: ${project.name}`}
      >
        <div className="avt-card-top">
          <span className="avt-card-num">{project.id}</span>
          <span className="avt-card-cat">{project.category}</span>
        </div>
        <div className="avt-card-body">
          <div className="avt-card-left">
            <h3 className="avt-card-name">{project.name}</h3>
            <p className="avt-card-desc">{project.desc}</p>
            <div className="avt-card-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="avt-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="avt-card-right">
            <span className="avt-card-metric">{project.metric}</span>
            <span className="avt-card-metric-label">{project.metricLabel}</span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Avatar3dHero({ theme }: { theme: Theme }) {
  void theme;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const headingY = useTransform(heroScroll, [0, 1], [0, -80]);
  const headingOpacity = useTransform(heroScroll, [0, 0.55], [1, 0]);
  const avatarY = useTransform(heroScroll, [0, 1], [0, -40]);

  return (
    <div className="avt-root">
      {/* ── SECTION 1: HERO ────────────────────────────────────────────────── */}
      <section id="about" className="avt-hero" ref={heroRef}>
        {/* Nav */}
        <nav className="avt-nav" aria-label="Primary navigation">
          <a href="#about"      className="avt-nav-link">About</a>
          <a href="#experience" className="avt-nav-link">Experience</a>
          <a href="#projects"   className="avt-nav-link">Projects</a>
          <a href="#contact"    className="avt-nav-link">Contact</a>
        </nav>

        {/* Accessible page title — visually hidden, exposes h1 to assistive tech */}
        <h1 className="avt-sr-only">Koushik Kotamraju — Sr. Security Engineer</h1>

        {/* Giant ghost heading — decorative, behind avatar, parallaxes up on scroll */}
        <motion.div
          className="avt-heading-wrap"
          aria-hidden="true"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          <div className="avt-heading">
            Hi, I&apos;m<br />Koushik
          </div>
        </motion.div>

        {/* Avatar — magnetic, parallaxes slower than heading */}
        <MagneticAvatar parallaxY={avatarY} />

        {/* Bottom bar */}
        <div className="avt-hero-bottom">
          <p className="avt-hero-desc">
            sr. security engineer<br />
            detection · IAM · AI pipelines
          </p>
          <a href="#projects" className="avt-discover-link">
            View Work
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      <ScrollMarquee />

      {/* ── BIO ─────────────────────────────────────────────────────────────── */}
      <section className="avt-bio-section">
        <h2 className="avt-bio-heading">About me</h2>
        <AnimatedText text={BIO} />
        <a href="#contact" className="avt-cta-link">Let&apos;s work together →</a>
      </section>

      {/* ── SECTION 2: EXPERIENCE ───────────────────────────────────────────── */}
      <section id="experience" className="avt-expertise-section">
        <h2 className="avt-expertise-heading">What I Build</h2>
        <div className="avt-expertise-list">
          {EXPERTISE.map((item, i) => (
            <ExpertiseItem key={item.num} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── SECTION 3: PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" className="avt-projects-section">
        <div className="avt-projects-header">
          <h2 className="avt-projects-heading">Projects</h2>
        </div>
        <div className="avt-cards">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── SECTION 4: CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="avt-contact">
        <p className="avt-contact-label">Let&apos;s talk</p>
        <h2 className="avt-contact-heading">
          Open to senior security<br />engineering roles.
        </h2>
        <div className="avt-contact-links">
          <a href="mailto:koushik.kotamraju1610@gmail.com" className="avt-contact-link">Email</a>
          <a href="https://www.linkedin.com/in/koushikkotamraju/" className="avt-contact-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/koushik1610" className="avt-contact-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </section>
    </div>
  );
}

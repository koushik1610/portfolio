"use client";

import { motion } from "motion/react";

const socials = [
  { label: "GitHub", href: "https://github.com/koushik1610", handle: "@koushik1610" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/koushikkotamraju/", handle: "koushikkotamraju" },
  { label: "Email", href: "mailto:koushik.kotamraju1610@gmail.com", handle: "say hello" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "6rem 1.5rem 8rem", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.875rem",
            color: "var(--accent)",
            marginBottom: "1rem",
            letterSpacing: "0.04em",
          }}
        >
          04. What&apos;s Next?
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            color: "var(--text-primary)",
          }}
        >
          Get In Touch
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--text-muted)",
            marginBottom: "2.5rem",
          }}
        >
          I&apos;m always open to talking security architecture, AI infrastructure,
          or new opportunities. Whether you want to collaborate or just say hi, my
          inbox is open.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.3rem",
              padding: "1.1rem 1.4rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              textDecoration: "none",
              minWidth: "130px",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.05em" }}>
              {s.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
              }}
            >
              {s.handle}
            </span>
          </a>
        ))}
      </motion.div>

      <p style={{ fontSize: "0.75rem", color: "var(--border)", fontFamily: "var(--font-geist-mono), monospace" }}>
        Built with Next.js · Deployed on GitHub Pages · koushik.io
      </p>
    </section>
  );
}

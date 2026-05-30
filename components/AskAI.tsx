"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LLMS_URL = "https://koushik.io/llms.txt";

// Key facts are embedded inline so AI tools don't need to fetch a URL.
// Full machine-readable profile is also linked for tools that can fetch it.
const PROMPT = `Here is Koushik Kotamraju's security engineering profile. Please give me a concise recruiter-style summary covering his technical background, key achievements, and what makes him stand out.

== PROFILE ==
Sr. Security Engineer at Yahoo (9 years experience). Member of a 4-person cloud security team securing 2,500+ cloud accounts across AWS and GCP.

KEY ACHIEVEMENTS:
- Detection Engineering: 200+ active Python/Lambda detection signatures, 0% false-positive rate at scale. Authored v6 AWS security baseline: 49 CIS-benchmarked controls, grounded in MITRE ATT&CK gap analysis against 74 real-world attack techniques.
- IAM Privilege Escalation: 65+ escalation paths across 10 vulnerability classes. Benchmarked on GOAT: 32/32 findings, 100% recall, 0 false positives.
- Agentic Security Reviews: Reduced per-review effort 80%. Scaled to 123 reviews with a 4-person team. Built from 1,400+ historical tickets — 1,767 knowledge nodes wired into an autonomous review agent with Jira + Confluence MCP integration.
- AI Research Pipeline: 19 foundation models, 5 providers, performance-weighted router. Output: vetted security proposals at $1.40/run, 55% cheaper than single-model.
- Artemis: CNAPP-class multi-cloud attack path simulation across 2,500+ accounts. Surfaces toxic IAM combos, crown-jewel exposure, MITRE ATT&CK-mapped findings.
- Antitoxin: Graph-theoretic IAM toxic combination framework — 62 combinations, minimum cut-set dissolution for each.

STACK: Python, AWS, GCP, Terraform, FastAPI, Databricks, Amazon Bedrock, MITRE ATT&CK, Splunk, Kubernetes
CERTS: AWS Security Specialty, AWS Solutions Architect Associate
FULL PROFILE: ${LLMS_URL}
== END PROFILE ==`;

// ── Brand icons ────────────────────────────────────────────────────────────────

function ClaudeIcon({ size = 18 }: { size?: number }) {
  // Anthropic A-mark — hollow triangle (evenodd cutout)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97757" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2L1 22h22L12 2zm0 5.8L18.6 20H5.4L12 7.8z"/>
    </svg>
  );
}

function ChatGPTIcon({ size = 18 }: { size?: number }) {
  // Official OpenAI bloom path (Simple Icons CC0)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#10A37F" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  );
}

function GeminiIcon({ size = 18 }: { size?: number }) {
  // Official Google Gemini 4-pointed star
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#4285F4" aria-hidden="true">
      <path d="M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z"/>
    </svg>
  );
}

function PerplexityIcon({ size = 18 }: { size?: number }) {
  // Perplexity starburst / orbital mark
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.8" stroke="#20B2AA" strokeWidth="1.7"/>
      <path d="M12 2v4.5M12 17.5V22M2 12h4.5M17.5 12H22M5.1 5.1l3.2 3.2M15.7 15.7l3.2 3.2M18.9 5.1l-3.2 3.2M8.3 15.7l-3.2 3.2" stroke="#20B2AA" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

// ── Tools ──────────────────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: "Claude",
    description: "Best at reading the profile URL and synthesizing",
    href: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}`,
    accent: "#D97757",
    Icon: ClaudeIcon,
  },
  {
    name: "ChatGPT",
    description: "Great for conversational Q&A about my background",
    href: `https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}`,
    accent: "#10A37F",
    Icon: ChatGPTIcon,
  },
  {
    name: "Gemini",
    description: "Google's AI — good at research and synthesis",
    href: `https://gemini.google.com/app?q=${encodeURIComponent(PROMPT)}`,
    accent: "#4285F4",
    Icon: GeminiIcon,
  },
  {
    name: "Perplexity",
    description: "Searches the web + reads the profile",
    href: `https://www.perplexity.ai/search/?q=${encodeURIComponent(PROMPT)}`,
    accent: "#20B2AA",
    Icon: PerplexityIcon,
  },
] as const;

// ── Floating button ────────────────────────────────────────────────────────────

export function AskAIFloat() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const el = document.querySelector("#ask-ai");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                document.querySelector("#ask-ai")?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Ask AI about Koushik"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.7rem 1.2rem 0.7rem 0.9rem",
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "100px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)",
                fontSize: "0.84rem",
                fontWeight: 600,
                color: "#111",
                letterSpacing: "-0.01em",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                lineHeight: 1,
                pointerEvents: "auto",
              }}
            >
              <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <ClaudeIcon size={18} />
                <ChatGPTIcon size={18} />
                <GeminiIcon size={18} />
                <PerplexityIcon size={18} />
              </span>
              <span>Ask AI about me</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AskAI() {
  return (
    <section
      id="ask-ai"
      style={{ padding: "5rem 1.5rem", maxWidth: "740px", margin: "0 auto", textAlign: "center" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.8rem",
            color: "var(--accent)",
            marginBottom: "0.75rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Ask AI
        </p>
        <h2
          style={{
            fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
            color: "var(--text-primary)",
          }}
        >
          Ask an AI about me
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            maxWidth: "480px",
            margin: "0 auto 2.25rem",
          }}
        >
          Each button opens the AI tool with a pre-loaded prompt pointing to my{" "}
          <a
            href={LLMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            machine-readable profile
          </a>
          . The AI reads it and answers your questions.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}
      >
        {TOOLS.map((tool) => (
          <a
            key={tool.name}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
              padding: "1.1rem 1.4rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              textDecoration: "none",
              minWidth: "148px",
              flex: "1 1 148px",
              maxWidth: "200px",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tool.accent;
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <tool.Icon size={24} />
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: tool.accent,
                  letterSpacing: "0.02em",
                }}
              >
                {tool.name} ↗
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                lineHeight: 1.45,
                textAlign: "left",
              }}
            >
              {tool.description}
            </span>
          </a>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        style={{
          marginTop: "1.75rem",
          fontSize: "0.72rem",
          color: "var(--border)",
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        profile ·{" "}
        <a
          href={LLMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text-muted)", textDecoration: "none" }}
        >
          koushik.io/llms.txt
        </a>
      </motion.p>
    </section>
  );
}

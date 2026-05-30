"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LLMS_URL = "https://koushik.io/llms.txt";

const PROMPT = `I'm looking at Koushik Kotamraju's portfolio (koushik.io). Please read his full profile at ${LLMS_URL} and give me a concise summary of his technical background, key achievements, and what makes him stand out as a cloud security and AI security engineer.`;

// ── Brand icons ────────────────────────────────────────────────────────────────

function ClaudeIcon({ size = 18 }: { size?: number }) {
  // Anthropic A-mark: solid outer triangle + inner triangle cutout (evenodd)
  // Inner stops at y=18 so the bottom 4px form the crossbar/base of the A
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97757" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12 2L2 22h20L12 2zM12 7.5L7.5 18.5h9L12 7.5z"/>
    </svg>
  );
}

function ChatGPTIcon({ size = 18 }: { size?: number }) {
  // OpenAI bloom: 6 overlapping rounded petals arranged in a circle
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <g transform="translate(50,50)">
        {petals.map((deg) => (
          <ellipse
            key={deg}
            cx={0} cy={-19}
            rx={12} ry={21}
            fill="#10A37F"
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
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
  // Perplexity: bold diamond with vertical axis line — matches their geometric brand
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L22 12L12 22L2 12Z" fill="#20B2AA" opacity="0.15" stroke="#20B2AA" strokeWidth="1.6" strokeLinejoin="round"/>
      <line x1="12" y1="2" x2="12" y2="22" stroke="#20B2AA" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="#20B2AA" strokeWidth="1.6" strokeLinecap="round"/>
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
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)",
                fontSize: "0.7rem",
                fontWeight: 500,
                color: "#0a0a0a",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-geist-mono), monospace",
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

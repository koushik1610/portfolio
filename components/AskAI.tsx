"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LLMS_URL = "https://koushik.io/llms.txt";

const PROMPT = `I'm looking at Koushik Kotamraju's portfolio (koushik.io). Please read his full profile at ${LLMS_URL} and give me a concise summary of his technical background, key achievements, and what makes him stand out as a cloud security and AI security engineer.`;

// ── Brand icons ────────────────────────────────────────────────────────────────

function ClaudeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19C2.7 17.1 2 14.9 2 12.5 2 6.7 6.7 2 12.5 2" stroke="#D97757" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M20 19C21.3 17.1 22 14.9 22 12.5 22 6.7 17.3 2 11.5 2" stroke="#D97757" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M7.5 21.5C9 22.2 10.7 22.5 12 22.5c1.3 0 3-.3 4.5-1" stroke="#D97757" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

function ChatGPTIcon({ size = 18 }: { size?: number }) {
  // 6-spoke bloom + center — OpenAI-inspired
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 12 L21 12 M14 15.46 L16.5 19.79 M10 15.46 L7.5 19.79 M8 12 L3 12 M10 8.54 L7.5 4.21 M14 8.54 L16.5 4.21"
        stroke="#10A37F" strokeWidth="2.8" strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.2" fill="#10A37F"/>
    </svg>
  );
}

function GeminiIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z"
        fill="#4285F4"
      />
    </svg>
  );
}

function PerplexityIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,3 21,12 12,21 3,12" stroke="#20B2AA" strokeWidth="1.6" fill="rgba(32,178,170,0.12)"/>
      <line x1="12" y1="3" x2="12" y2="21" stroke="#20B2AA" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="#20B2AA" strokeWidth="1.3" strokeLinecap="round"/>
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
                gap: "0.55rem",
                padding: "0.6rem 1.05rem 0.6rem 0.8rem",
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "100px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#111",
                letterSpacing: "-0.01em",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                lineHeight: 1,
                pointerEvents: "auto",
              }}
            >
              <span style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                <ClaudeIcon size={16} />
                <ChatGPTIcon size={16} />
                <GeminiIcon size={16} />
                <PerplexityIcon size={16} />
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
              <tool.Icon size={22} />
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

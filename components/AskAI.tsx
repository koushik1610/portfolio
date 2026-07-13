"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { GlassWidget, glassSurface, glassPrimaryText, glassSecondaryText } from "./GlassWidget";

const LLMS_URL = "https://koushik.io/llms.txt";

const PROMPT = `I'm looking at Koushik Kotamraju's portfolio (koushik.io). Please read his full profile at ${LLMS_URL} and give me a concise summary of his technical background, key achievements, and what makes him stand out as a cloud security and AI security engineer.`;

// ── Brand icons ────────────────────────────────────────────────────────────────

function ClaudeIcon({ size = 18 }: { size?: number }) {
  // Official Claude AI logo — svgl.app (svgl.app/library/claude-ai-icon.svg)
  return (
    <svg width={size} height={size} viewBox="0 0 256 257" fill="none" aria-hidden="true">
      <path fill="#D97757" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/>
    </svg>
  );
}

function ChatGPTIcon({ size = 18 }: { size?: number }) {
  // Official OpenAI logo — svgl.app (svgl.app/library/openai.svg). OpenAI's
  // current mark is monochrome by brand guideline, but this widget pairs
  // each icon with a colored accent label — filling with the existing
  // recognizable ChatGPT teal keeps the four icons visually consistent
  // rather than one suddenly going flat black among three colored ones.
  return (
    <svg width={size} height={size} viewBox="0 0 256 260" fill="#10A37F" aria-hidden="true">
      <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/>
    </svg>
  );
}

function GeminiIcon({ size = 18 }: { size?: number }) {
  // Official Gemini "spark" mark — svgl.app (svgl.app/library/gemini.svg),
  // outline extracted from their masked gradient version and filled flat
  // with the brand blue used in that same gradient (#3186FF): the full
  // multi-layer blurred-gradient asset doesn't hold up at a 15-18px inline
  // icon size, so this keeps the current official path geometry without
  // the filter/blur rendering that would just look like a muddy blob here.
  return (
    <svg width={size} height={size} viewBox="0 0 296 298" fill="none" aria-hidden="true">
      <path fill="#3186FF" d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z"/>
    </svg>
  );
}

function PerplexityIcon({ size = 18 }: { size?: number }) {
  // Official Perplexity compass mark — svgl.app (svgl.app/library/perplexity.svg)
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path stroke="#20808d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M24 4.5v39M13.73 16.573v-9.99L24 16.573m0 14.5L13.73 41.417V27.01L24 16.573m0 0l10.27-9.99v9.99" />
      <path stroke="#20808d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M13.73 31.396H9.44V16.573h29.12v14.823h-4.29" />
      <path stroke="#20808d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M24 16.573L34.27 27.01v14.407L24 31.073" />
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
    accent: "#3186FF",
    Icon: GeminiIcon,
  },
  {
    name: "Perplexity",
    description: "Searches the web + reads the profile",
    href: `https://www.perplexity.ai/search/?q=${encodeURIComponent(PROMPT)}`,
    accent: "#20808d",
    Icon: PerplexityIcon,
  },
] as const;

// ── Floating button ────────────────────────────────────────────────────────────

export function AskAIFloat({ compact }: { compact?: boolean }) {
  // Themed pages hide the #ask-ai section, so the float owns the interaction:
  // clicking it expands the four AI-tool links in place. Disclosure pattern
  // (trigger + aria-expanded + Escape), deliberately NOT role="menu" — plain
  // links don't need the full menu keyboard contract.
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  // Never collapse mid-interaction — only go compact when the disclosure
  // is closed, so a user who has it open never has it shrink under them.
  const showCompact = compact && !open;

  return (
    <div
      ref={wrapRef}
      style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "stretch" }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          // Return focus to the trigger so it isn't stranded on a removed link.
          wrapRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }}
    >
      <GlassWidget
        onClick={() => setOpen((v) => !v)}
        ariaLabel="Ask AI about Koushik"
        ariaExpanded={open}
        compact={showCompact}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ display: "flex", gap: "3px", alignItems: "center" }} aria-hidden="true">
            <ClaudeIcon size={15} />
            <ChatGPTIcon size={15} />
            <GeminiIcon size={15} />
            <PerplexityIcon size={15} />
          </span>
          <span style={glassPrimaryText}>ASK AI ABOUT ME</span>
        </div>
        {!showCompact && (
          <span style={{ ...glassSecondaryText, paddingLeft: "0.1rem" }}>
            {open ? "click to close" : "click to choose an AI"}
          </span>
        )}
      </GlassWidget>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{ ...glassSurface, cursor: "default", gap: "0.15rem", padding: "0.5rem" }}
            role="group"
            aria-label="Ask an AI about Koushik"
          >
            {TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-widget"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.55rem 0.65rem",
                  minHeight: "44px",
                  width: "100%",
                  borderRadius: "9px",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                <tool.Icon size={16} />
                <span>{tool.name}</span>
                <span aria-hidden="true" style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: "0.7rem" }}>↗</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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

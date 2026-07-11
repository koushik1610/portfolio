"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { GlassWidget, glassSurface, glassPrimaryText, glassSecondaryText } from "./GlassWidget";

const LLMS_URL = "https://koushik.io/llms.txt";

const PROMPT = `I'm looking at Koushik Kotamraju's portfolio (koushik.io). Please read his full profile at ${LLMS_URL} and give me a concise summary of his technical background, key achievements, and what makes him stand out as a cloud security and AI security engineer.`;

// ── Brand icons ────────────────────────────────────────────────────────────────

function ClaudeIcon({ size = 18 }: { size?: number }) {
  // Official Claude logo — Simple Icons (CC0)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97757" aria-hidden="true">
      <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
    </svg>
  );
}

function ChatGPTIcon({ size = 18 }: { size?: number }) {
  // Official OpenAI logo — Simple Icons / jsDelivr CDN (CC0)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#10A37F" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  );
}

function GeminiIcon({ size = 18 }: { size?: number }) {
  // Official Google Gemini logo — Simple Icons (CC0) — brand color #8E75B2
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#8E75B2" aria-hidden="true">
      <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
    </svg>
  );
}

function PerplexityIcon({ size = 18 }: { size?: number }) {
  // Official Perplexity logo — Simple Icons (CC0) — brand color #1FB8CD
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1FB8CD" aria-hidden="true">
      <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/>
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
    accent: "#8E75B2",
    Icon: GeminiIcon,
  },
  {
    name: "Perplexity",
    description: "Searches the web + reads the profile",
    href: `https://www.perplexity.ai/search/?q=${encodeURIComponent(PROMPT)}`,
    accent: "#1FB8CD",
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

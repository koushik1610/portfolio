"use client";

import React from "react";
import { motion } from "motion/react";
import Script from "next/script";

// After creating your agent at https://elevenlabs.io/conversational-ai, paste the agent ID here.
const AGENT_ID = "REPLACE_WITH_YOUR_ELEVENLABS_AGENT_ID";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function TalkToMe() {
  const isConfigured = !AGENT_ID.startsWith("REPLACE");

  return (
    <section
      id="talk-to-me"
      style={{ padding: "5rem 1.5rem", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
    >
      {isConfigured && (
        <Script src="https://elevenlabs.io/convai-widget/index.js" strategy="lazyOnload" />
      )}

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
          Talk to Me
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
          Ask me anything — live
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
          Voice-powered AI trained on my background. Ask about my work in cloud security,
          detection engineering, or AI pipelines — and I&apos;ll answer in real time.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80px" }}
      >
        {isConfigured ? (
          React.createElement("elevenlabs-convai", { "agent-id": AGENT_ID })
        ) : (
          <div
            style={{
              padding: "0.9rem 1.6rem",
              border: "1px dashed var(--border)",
              borderRadius: "10px",
              fontSize: "0.75rem",
              fontFamily: "var(--font-geist-mono), monospace",
              color: "var(--border)",
            }}
          >
            voice agent — set AGENT_ID in TalkToMe.tsx
          </div>
        )}
      </motion.div>
    </section>
  );
}

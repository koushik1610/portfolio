"use client";
import { useEffect, useState } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";
import { incrementOffset } from "@/lib/rotation";

export default function ThemeBadge() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const update = () => setTheme(getCurrentTheme());
    update();
    window.addEventListener("themechange", update);
    return () => window.removeEventListener("themechange", update);
  }, []);

  function rotate() {
    if (spinning) return;
    setSpinning(true);
    incrementOffset();
    setTimeout(() => setSpinning(false), 600);
  }

  if (!theme) return null;

  return (
    <button
      onClick={rotate}
      title="Click to rotate theme"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "12px",
        padding: "0.5rem 1rem",
        fontFamily: "var(--font-geist-mono), monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.18rem",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)",
        cursor: "pointer",
        pointerEvents: "auto",
        userSelect: "none",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent, #818cf8)",
            display: "inline-block",
            boxShadow: "0 0 6px var(--accent, #818cf8)",
            animation: "dot-pulse 2s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "#0a0a0a" }}>
          {theme.name.toUpperCase()}
        </span>
        <span
          style={{
            fontSize: "0.85rem",
            lineHeight: 1,
            color: "#0a0a0a",
            display: "inline-block",
            transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          ↻
        </span>
      </div>
      <span style={{ fontSize: "0.6rem", letterSpacing: "0.08em", color: "#888", paddingLeft: "0.1rem" }}>
        click to rotate ui theme
      </span>
    </button>
  );
}

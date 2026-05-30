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
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--accent)",
        borderRadius: "10px",
        padding: "0.45rem 1rem",
        fontFamily: "var(--font-geist-mono), monospace",
        color: "var(--accent)",
        letterSpacing: "0.12em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.2rem",
        whiteSpace: "nowrap",
        boxShadow: "0 0 20px rgba(0,0,0,0.6), 0 0 0 1px var(--border)",
        cursor: "pointer",
        pointerEvents: "auto",
        userSelect: "none",
        textAlign: "left",
      }}
    >
      {/* Top row: pulse dot + theme name + spin icon */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
            boxShadow: "0 0 8px var(--accent)",
            animation: "dot-pulse 2s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "0.68rem" }}>
          THEME // {theme.name.toUpperCase()}
        </span>
        <span
          style={{
            fontSize: "0.9rem",
            lineHeight: 1,
            display: "inline-block",
            transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          ↻
        </span>
      </div>
      {/* Subtitle hint */}
      <span
        style={{
          fontSize: "0.58rem",
          letterSpacing: "0.1em",
          opacity: 0.55,
          paddingLeft: "0.1rem",
        }}
      >
        CLICK TO ROTATE UI THEME
      </span>
    </button>
  );
}

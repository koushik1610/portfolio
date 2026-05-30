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
      className="widget-shine"
      style={{
        background: "linear-gradient(160deg, rgba(22,22,30,0.97) 0%, rgba(12,12,18,0.95) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "14px",
        padding: "0.65rem 1.1rem",
        fontFamily: "var(--font-geist-mono), monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.25rem",
        whiteSpace: "nowrap",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
        cursor: "pointer",
        pointerEvents: "auto",
        userSelect: "none",
        textAlign: "left",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "var(--accent, #818cf8)",
            display: "inline-block",
            boxShadow: "0 0 8px var(--accent, #818cf8)",
            animation: "dot-pulse 2s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
          {theme.name.toUpperCase()}
        </span>
        <span
          style={{
            fontSize: "0.95rem",
            lineHeight: 1,
            color: "var(--accent, #818cf8)",
            display: "inline-block",
            transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          ↻
        </span>
      </div>
      <span style={{ fontSize: "0.67rem", letterSpacing: "0.07em", color: "rgba(255,255,255,0.38)", paddingLeft: "0.1rem" }}>
        click to rotate ui theme
      </span>
    </button>
  );
}

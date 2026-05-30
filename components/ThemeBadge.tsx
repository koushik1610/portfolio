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
        background: "linear-gradient(155deg, rgba(48,44,66,0.99) 0%, rgba(22,20,36,0.99) 25%, rgba(10,8,18,1) 55%, rgba(20,18,32,0.99) 80%, rgba(36,32,52,0.99) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderRadius: "14px",
        padding: "0.65rem 1.1rem",
        fontFamily: "var(--font-geist-mono), monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.3rem",
        whiteSpace: "nowrap",
        boxShadow: "0 16px 48px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.5)",
        cursor: "pointer",
        pointerEvents: "auto",
        userSelect: "none",
        textAlign: "left",
        width: "100%",
      }}
    >
      {/* Primary action — bigger, on top */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
        <span
          style={{
            fontSize: "1rem",
            lineHeight: 1,
            color: "var(--accent, #818cf8)",
            display: "inline-block",
            transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          ↻
        </span>
        <span style={{ fontSize: "0.82rem", letterSpacing: "0.09em", color: "rgba(255,255,255,0.93)", fontWeight: 600 }}>
          CLICK TO ROTATE UI THEME
        </span>
      </div>
      {/* Current theme — secondary info below */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", paddingLeft: "0.05rem" }}>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent, #818cf8)",
            display: "inline-block",
            boxShadow: "0 0 7px var(--accent, #818cf8)",
            animation: "dot-pulse 2s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "0.67rem", letterSpacing: "0.07em", color: "rgba(255,255,255,0.38)" }}>
          Current Theme: {theme.name}
        </span>
      </div>
    </button>
  );
}

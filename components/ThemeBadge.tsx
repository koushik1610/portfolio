"use client";
import { useEffect, useState } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";
import { incrementOffset } from "@/lib/rotation";
import { GlassWidget, glassPrimaryText, glassSecondaryText } from "./GlassWidget";

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
    <GlassWidget onClick={rotate} title="Click to rotate theme">
      {/* Primary action — bigger, on top */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
        <span
          aria-hidden="true"
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
        <span style={glassPrimaryText}>ROTATE THEME</span>
      </div>
      {/* Current theme — secondary info below */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", paddingLeft: "0.05rem" }}>
        <span
          aria-hidden="true"
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
        <span style={glassSecondaryText}>Current Theme: {theme.name}</span>
      </div>
    </GlassWidget>
  );
}

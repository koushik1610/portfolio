"use client";

import { useState, useEffect } from "react";
import { getCurrentTheme } from "@/lib/themes";
import { incrementOffset } from "@/lib/rotation";

export default function ThemeRotator() {
  const [name, setName] = useState("");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const update = () => setName(getCurrentTheme().name);
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

  if (!name) return null;

  return (
    <button
      onClick={rotate}
      title="Rotate theme"
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.55rem 0.85rem",
        background: "color-mix(in srgb, var(--surface) 88%, transparent)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--border)",
        borderRadius: "3px",
        cursor: "pointer",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.58rem",
        letterSpacing: "0.12em",
        color: "var(--text-muted)",
        textTransform: "uppercase",
        transition: "border-color 0.2s, color 0.2s",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: "0.75rem",
          lineHeight: 1,
          transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
        }}
      >
        ↻
      </span>
      {name}
    </button>
  );
}

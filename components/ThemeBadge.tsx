"use client";
import { useEffect, useState } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";

export default function ThemeBadge() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const update = () => setTheme(getCurrentTheme());
    update();
    window.addEventListener("themechange", update);
    const interval = setInterval(update, 60 * 1000);
    return () => {
      window.removeEventListener("themechange", update);
      clearInterval(interval);
    };
  }, []);

  if (!theme) return null;

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--accent)",
        borderRadius: "100px",
        padding: "0.3rem 1rem",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.62rem",
        color: "var(--accent)",
        letterSpacing: "0.14em",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        whiteSpace: "nowrap",
        boxShadow: "0 0 20px rgba(0,0,0,0.6), 0 0 0 1px var(--border)",
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "var(--accent)",
          display: "inline-block",
          boxShadow: "0 0 8px var(--accent)",
          animation: "dot-pulse 2s ease-in-out infinite",
        }}
      />
      THEME // {theme.name.toUpperCase()}
    </div>
  );
}

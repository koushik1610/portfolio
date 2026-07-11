"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Single source of truth for the top-right widget stack (ThemeBadge +
 * AskAIFloat). Both widgets MUST render through this component so they share
 * one box model and one glass treatment. The surface derives from the active
 * theme's tokens (--background / --border / --text-*) so it adapts to light
 * themes instead of hardcoding a dark-violet gradient.
 */

export const glassSurface: CSSProperties = {
  background: "color-mix(in srgb, var(--background) 78%, transparent)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "0.65rem 1.1rem",
  fontFamily: "var(--font-geist-mono), monospace",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.3rem",
  whiteSpace: "nowrap",
  boxShadow: "0 12px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)",
  cursor: "pointer",
  pointerEvents: "auto",
  userSelect: "none",
  textAlign: "left",
  width: "100%",
  minHeight: "44px",
  color: "var(--text-primary)",
  transition: "padding 0.22s cubic-bezier(0.32, 0.72, 0, 1)",
};

// Compact variant — a smaller footprint once the page has scrolled (see
// WidgetStack.tsx). Same shape, tighter padding; children hide their own
// secondary line when compact, so this alone doesn't need to.
export const glassSurfaceCompact: CSSProperties = {
  ...glassSurface,
  padding: "0.45rem 0.85rem",
};

export const glassPrimaryText: CSSProperties = {
  fontSize: "0.82rem",
  letterSpacing: "0.09em",
  color: "var(--text-primary)",
  fontWeight: 600,
};

export const glassSecondaryText: CSSProperties = {
  fontSize: "0.67rem",
  letterSpacing: "0.07em",
  color: "var(--text-muted)",
};

export function GlassWidget({
  children,
  onClick,
  title,
  ariaLabel,
  ariaExpanded,
  compact,
}: {
  children: ReactNode;
  onClick?: () => void;
  title?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      className="widget-shine glass-widget"
      style={compact ? glassSurfaceCompact : glassSurface}
    >
      {children}
    </button>
  );
}

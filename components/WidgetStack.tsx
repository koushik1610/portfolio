import ThemeBadge from "./ThemeBadge";
import { AskAIFloat } from "./AskAI";

// The fixed top-right widget stack. Both routes (/ and /theme/[name]) must
// render this same component so the badge + Ask-AI float never drift apart.
export default function WidgetStack() {
  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.4rem",
        pointerEvents: "none",
      }}
    >
      <ThemeBadge />
      <AskAIFloat />
    </div>
  );
}

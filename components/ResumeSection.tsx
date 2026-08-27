"use client";

import { jobs, education, certs, stack } from "@/lib/resume";

const mono = { fontFamily: "var(--font-geist-mono), monospace" } as const;

export default function ResumeSection() {
  return (
    <section id="resume" style={{ padding: "6rem 1.5rem 8rem", maxWidth: "860px", margin: "0 auto" }}>
      {/* Section header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ ...mono, fontSize: "0.62rem", color: "var(--accent)", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>RÉSUMÉ</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1 }}>
            Koushik Kotamraju
          </h2>
          <p style={{ ...mono, fontSize: "0.78rem", color: "var(--accent)", marginTop: "0.5rem" }}>Sr. Technical Security Engineer · Yahoo!</p>
        </div>
        <button
          onClick={() => window.print()}
          style={{ padding: "0.65rem 1.5rem", background: "transparent", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: "3px", cursor: "pointer", ...mono, fontSize: "0.72rem", letterSpacing: "0.06em", transition: "background 0.15s, color 0.15s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--background)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
        >
          PRINT / SAVE PDF ↗
        </button>
      </div>

      <div style={{ height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

      {/* Certs & Stack */}
      <div style={{ display: "grid", gridTemplateColumns: certs.length ? "1fr 1fr" : "1fr", gap: "2rem", marginBottom: "3rem" }}>
        {/* Rendered only when non-empty. An empty CERTIFICATIONS heading reads
            worse than no heading at all. */}
        {certs.length > 0 && (
          <div>
            <p style={{ ...mono, fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>CERTIFICATIONS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {certs.map((c) => (
                <p key={c} style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{c}</p>
              ))}
            </div>
          </div>
        )}
        <div>
          <p style={{ ...mono, fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>TECHNICAL STACK</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {stack.map((t) => (
              <span key={t} style={{ ...mono, fontSize: "0.68rem", color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: "3px", padding: "0.15rem 0.5rem" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

      {/* Experience */}
      <p style={{ ...mono, fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "2rem" }}>EXPERIENCE</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {jobs.map((job, i) => (
          <div
            key={job.company}
            style={{ paddingBottom: "2.5rem", marginBottom: "2.5rem", borderBottom: i < jobs.length - 1 ? "1px solid var(--border)" : "none" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {job.company}
                {job.current && (
                  <span style={{ ...mono, fontSize: "0.55rem", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: "2px", padding: "0.1rem 0.35rem", marginLeft: "0.6rem", verticalAlign: "middle", letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", animation: "dot-pulse 2s ease-in-out infinite" }} />
                    CURRENT
                  </span>
                )}
              </h3>
              <span style={{ ...mono, fontSize: "0.65rem", color: "var(--text-muted)" }}>{job.period}</span>
            </div>
            <p style={{ ...mono, fontSize: "0.72rem", color: "var(--accent)", marginBottom: "1rem" }}>{job.title}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {job.bullets.map((b, bi) => (
                <li key={bi} style={{ display: "flex", gap: "0.75rem", fontSize: "0.82rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                  <span style={{ color: "var(--accent)", opacity: 0.6, flexShrink: 0 }}>—</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

      {/* Education */}
      <p style={{ ...mono, fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "1.5rem" }}>EDUCATION</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {education.map((e) => (
          <div key={e.degree} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", padding: "0.75rem 0", borderBottom: "1px solid var(--border)" }}>
            <div>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>{e.degree}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{e.school}</p>
            </div>
            <span style={{ ...mono, fontSize: "0.65rem", color: "var(--text-muted)" }}>{e.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

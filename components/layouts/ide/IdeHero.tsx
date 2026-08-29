"use client";

import { useEffect, useRef, useState } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   IDE · layout variant: ide · class prefix: ide-
   A full VS Code–style shell — the piece of software actually being
   impersonated, not a single editor pane: title bar, file-tree sidebar, a tab
   bar with real open tabs, a syntax-colored editor pane, a status bar. No
   terminal panel in v1 (theme-plans/20-terminal-ide.md's own open question,
   resolved: decorative-only scope/a11y cost, not load-bearing for
   distinctiveness — the click-nav model already carries that).

   Signature move: clicking a sidebar file or a tab SWITCHES the editor
   pane's content in place (state-driven, not a scroll reveal) — the one
   click-navigated theme in the rotation; every sibling is scroll-driven.
   Recruiter-legibility rule (theme-plans/20 — this is exactly what got
   Intercept culled): every fact a hiring manager needs is visible on the
   file open BY DEFAULT (about.md) with zero clicks — sidebar/tabs are a
   navigation upgrade for a curious visitor, never a puzzle gating the basics.

   Palette: near-black editor bg #0d0e14 · ice #eef0f4 · muted #8b93a3
   (7.1:1). Owned accent: violet #9d7bff (6.16:1 on bg) — deliberately NOT
   another blue (glacier #7cb8f7, klein #2743e0, and route's cyan #22d3ee
   already crowd that band); violet reads just as authentically "real code
   editor" via the Dracula-family register, with zero hue collision in the
   current rotation. Radius scale: 4px (tabs, file rows) · 6px (buttons).

   Motion: title bar/sidebar/tabs settle in fast (chrome, not a hero moment,
   <500ms, no stagger drama). about.md's content prints in line-by-line on
   mount (ease:"none", the one load moment, matching Policy's convention).
   Switching files/tabs is a fast opacity-dip + settle, never a per-line
   restagger — kept deliberately distinct from the load moment so there is
   exactly one "print" beat, not a repeating one.

   2026-07-12 asset rework: added a minimap — VS Code's single most
   recognizable feature, and the biggest authenticity gap in a theme that
   otherwise impersonates the whole shell. Not scaled legible text (needs
   real canvas rendering); a lightweight, honest abstraction real minimap
   clones use too — one colored bar per line, width ~proportional to line
   length, tone matched to the editor pane's own token colors. Mirrors
   whichever file is active. Hidden below ~900px (see styles.css) — VS
   Code itself hides the minimap on narrow windows too.
───────────────────────────────────────────────────────────────────────────── */

type LineKind = "heading" | "text" | "bullet" | "blank" | "comment" | "key" | "str" | "kw" | "punct-line";

interface Line {
  kind: LineKind;
  text?: string;
  parts?: ReadonlyArray<{ t: string; k?: "key" | "str" | "num" | "kw" | "punct" | "comment" }>;
  indent?: number;
}

interface FileTab {
  id: string;
  name: string;
  lang: string;
  folder: string;
  lines: ReadonlyArray<Line>;
}

const FILES: ReadonlyArray<FileTab> = [
  {
    id: "about",
    name: "about.md",
    lang: "Markdown",
    folder: "career",
    lines: [
      { kind: "heading", text: "# Koushik Kotamraju" },
      { kind: "text", text: "Sr. Security Engineer · Yahoo Paranoids · 9 years" },
      { kind: "blank" },
      { kind: "text", text: "Cloud security engineer building AI-native security platforms — **production systems, not prototypes.**" },
      { kind: "blank" },
      { kind: "text", text: "A small team. 2,800+ cloud accounts. The math only works if you build the right systems." },
      // No markdown-link CTA bullets here — the button row rendered below
      // for this file already is the CTA; a QA pass found the two doing
      // the same job back to back read as duplicated, not reinforcing.
    ],
  },
  {
    id: "experience",
    name: "experience.json",
    lang: "JSON",
    folder: "career",
    lines: [
      { kind: "punct-line", text: "{" },
      { kind: "text", indent: 1, parts: [{ t: '"role"', k: "key" }, { t: ": ", k: "punct" }, { t: '"Sr. Security Engineer"', k: "str" }, { t: ",", k: "punct" }] },
      { kind: "text", indent: 1, parts: [{ t: '"org"', k: "key" }, { t: ": ", k: "punct" }, { t: '"Yahoo Paranoids"', k: "str" }, { t: ",", k: "punct" }] },
      { kind: "text", indent: 1, parts: [{ t: '"years"', k: "key" }, { t: ": ", k: "punct" }, { t: "9", k: "num" }, { t: ",", k: "punct" }] },
      { kind: "text", indent: 1, parts: [{ t: '"stats"', k: "key" }, { t: ": {", k: "punct" }] },
      { kind: "text", indent: 2, parts: [{ t: '"cloudAccounts"', k: "key" }, { t: ": ", k: "punct" }, { t: '"2,800+"', k: "str" }, { t: ",", k: "punct" }] },
      { kind: "text", indent: 2, parts: [{ t: '"detectionSignatures"', k: "key" }, { t: ": ", k: "punct" }, { t: '"200+"', k: "str" }, { t: ",", k: "punct" }] },
      { kind: "text", indent: 2, parts: [{ t: '"securityReviews"', k: "key" }, { t: ": ", k: "punct" }, { t: '"100+"', k: "str" }, { t: ",", k: "punct" }] },
      { kind: "text", indent: 2, parts: [{ t: '"aiModels"', k: "key" }, { t: ": ", k: "punct" }, { t: "19", k: "num" }] },
      { kind: "text", indent: 1, parts: [{ t: "}", k: "punct" }] },
      { kind: "punct-line", text: "}" },
    ],
  },
  {
    id: "detection",
    name: "detection-engine.py",
    lang: "Python",
    folder: "detection",
    lines: [
      { kind: "comment", text: "# 200+ Python/Lambda signatures evaluating 1,400+ AWS accounts." },
      { kind: "comment", text: "# CIS-benchmarked baselines, MITRE ATT&CK gap analysis, Terraform-deployed." },
      { kind: "blank" },
      { kind: "text", parts: [{ t: "class ", k: "kw" }, { t: "DetectionFleet", k: "key" }, { t: ":", k: "punct" }] },
      { kind: "text", indent: 1, parts: [{ t: "signatures ", k: "key" }, { t: "= ", k: "punct" }, { t: '"200+"', k: "str" }] },
      { kind: "text", indent: 1, parts: [{ t: "accounts_evaluated ", k: "key" }, { t: "= ", k: "punct" }, { t: '"1,400+"', k: "str" }] },
      { kind: "text", indent: 1, parts: [{ t: "new_baselines_v6 ", k: "key" }, { t: "= ", k: "punct" }, { t: '"50+"', k: "str" }] },
      { kind: "blank" },
      { kind: "text", indent: 1, parts: [{ t: "def ", k: "kw" }, { t: "coverage_score", k: "key" }, { t: "(self):", k: "punct" }] },
      { kind: "comment", indent: 2, text: '"""The posture scores the company is measured against."""' },
      { kind: "text", indent: 2, parts: [{ t: "return ", k: "kw" }, { t: "self.signatures", k: "key" }] },
      { kind: "blank" },
      { kind: "text", indent: 1, parts: [{ t: "def ", k: "kw" }, { t: "expand_baseline", k: "key" }, { t: "(self):", k: "punct" }] },
      { kind: "comment", indent: 2, text: '"""The largest control expansion in program history."""' },
      { kind: "text", indent: 2, parts: [{ t: "return ", k: "kw" }, { t: "self.new_baselines_v6", k: "key" }] },
    ],
  },
  {
    id: "iam",
    name: "iam-audit-agent.py",
    lang: "Python",
    folder: "projects",
    lines: [
      { kind: "comment", text: "# AI-native audit agent. The 10 vulnerability classes are mine; the" },
      { kind: "comment", text: "# 65+ path catalogue is DataDog's, fetched and matched against." },
      { kind: "comment", text: "# GOAT was written first: 32 ground-truth findings, then evaluated." },
      { kind: "blank" },
      { kind: "text", parts: [{ t: "class ", k: "kw" }, { t: "IamAuditAgent", k: "key" }, { t: ":", k: "punct" }] },
      { kind: "text", indent: 1, parts: [{ t: "path_catalogue ", k: "key" }, { t: "= ", k: "punct" }, { t: '"pathfinding.cloud (65+)"', k: "str" }] },
      { kind: "text", indent: 1, parts: [{ t: "vulnerability_classes ", k: "key" }, { t: "= ", k: "punct" }, { t: "10", k: "num" }] },
      { kind: "text", indent: 1, parts: [{ t: "goat_benchmarks ", k: "key" }, { t: "= ", k: "punct" }, { t: "32", k: "num" }] },
      { kind: "text", indent: 1, parts: [{ t: "toxic_combinations ", k: "key" }, { t: "= ", k: "punct" }, { t: "62", k: "num" }] },
      { kind: "blank" },
      { kind: "text", indent: 1, parts: [{ t: "def ", k: "kw" }, { t: "dissolve", k: "key" }, { t: "(self, chain):", k: "punct" }] },
      { kind: "comment", indent: 2, text: '"""Antitoxin: the keystone permission whose removal breaks the chain."""' },
      { kind: "text", indent: 2, parts: [{ t: "return ", k: "kw" }, { t: "CATALOGUE", k: "key" }, { t: "[chain].keystone", k: "punct" }] },
    ],
  },
  {
    id: "contact",
    name: "contact.md",
    lang: "Markdown",
    folder: "career",
    lines: [
      { kind: "heading", text: "# Contact" },
      { kind: "blank" },
      { kind: "text", text: "Open to Staff & Principal Security Engineer and AI Security roles." },
      { kind: "blank" },
      { kind: "bullet", text: "Email — koushik.kotamraju1610@gmail.com" },
      { kind: "bullet", text: "LinkedIn — in/koushikkotamraju" },
      { kind: "bullet", text: "GitHub — github.com/koushik1610" },
      { kind: "blank" },
      { kind: "bullet", text: "[Email me](mailto:koushik.kotamraju1610@gmail.com)" },
      { kind: "bullet", text: "[Résumé](/resume)" },
    ],
  },
] as const;

const FOLDER_ORDER = ["career", "detection", "projects"] as const;

/* Renders one markdown "part" as RAW source with syntax coloring — the
   ** and [](...) markers stay visible (like a real editor's markdown mode
   shows the source, not a rendered preview), styled as punctuation and
   aria-hidden so a screen reader hears the clean text, not the marks. */
function MdText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        const boldMatch = p.match(/^\*\*([^*]+)\*\*$/);
        if (boldMatch) {
          return (
            <span key={i}>
              <span className="ide-tok-punct" aria-hidden="true">**</span>
              <strong>{boldMatch[1]}</strong>
              <span className="ide-tok-punct" aria-hidden="true">**</span>
            </span>
          );
        }
        const linkMatch = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          const ext = href.startsWith("http");
          return (
            <span key={i}>
              <span className="ide-tok-punct" aria-hidden="true">[</span>
              <a
                href={href}
                className="ide-md-link"
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {label}
              </a>
              <span className="ide-tok-punct" aria-hidden="true">{"]("}</span>
              <span className="ide-tok-str" aria-hidden="true">{href}</span>
              <span className="ide-tok-punct" aria-hidden="true">)</span>
            </span>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function CodeLine({ line }: { line: Line }) {
  if (line.kind === "blank") return <div className="ide-line ide-line--blank">&nbsp;</div>;
  if (line.kind === "comment") {
    return (
      <div className="ide-line" style={{ paddingLeft: (line.indent ?? 0) * 20 }}>
        <span className="ide-tok-comment">{line.text}</span>
      </div>
    );
  }
  if (line.kind === "punct-line") {
    return <div className="ide-line"><span className="ide-tok-punct">{line.text}</span></div>;
  }
  if (line.parts) {
    return (
      <div className="ide-line" style={{ paddingLeft: (line.indent ?? 0) * 20 }}>
        {line.parts.map((p, i) => (
          <span key={i} className={p.k ? `ide-tok-${p.k}` : undefined}>{p.t}</span>
        ))}
      </div>
    );
  }
  return <div className="ide-line" style={{ paddingLeft: (line.indent ?? 0) * 20 }}>{line.text}</div>;
}

/* The minimap: VS Code's single most recognizable UI feature, and the
   biggest authenticity gap in a theme that otherwise impersonates the
   whole shell. Not scaled-down legible text (that needs real canvas
   rendering) — a lightweight, honest abstraction real minimap clones use
   too: one colored bar per line, width roughly proportional to line
   length, tone matched to the same token colors the editor pane already
   uses. Purely decorative/aria-hidden; mirrors whichever file is active. */
/* Council-caught bug (2026-07-12): sampling `parts[0]` always picked the
   first token, and every JSON line starts with a key — the whole file
   rendered near-monochrome despite the real editor pane showing real
   string/number colors on the same lines. Fix: prefer whichever token
   kind actually reads as most visually distinctive on the line (the
   colorful "content" a glance lands on), not just positional order. */
const TONE_PRIORITY = ["str", "num", "kw", "key", "comment", "punct"] as const;
function minimapTone(line: Line): string {
  if (line.kind === "comment") return "comment";
  if (line.kind === "heading") return "key";
  if (line.kind === "punct-line") return "punct";
  if (line.kind === "bullet") return "text"; // real bullet text renders in default color, not accent
  if (line.parts) {
    for (const kind of TONE_PRIORITY) {
      if (line.parts.some((p) => p.k === kind)) return kind;
    }
  }
  return "text";
}
function minimapLength(line: Line): number {
  if (line.text) return line.text.length;
  if (line.parts) return line.parts.reduce((n, p) => n + p.t.length, 0);
  return 0;
}
function Minimap({ lines }: { lines: ReadonlyArray<Line> }) {
  return (
    <div className="ide-minimap" aria-hidden="true">
      {lines.map((l, i) => {
        if (l.kind === "blank") return <div key={i} className="ide-mm-row" />;
        const len = Math.min(minimapLength(l), 70);
        return (
          <div key={i} className="ide-mm-row">
            <span
              className={`ide-mm-bar ide-mm-tone-${minimapTone(l)}`}
              style={{ width: `${Math.max((len / 70) * 100, 6)}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}

function MdLine({ line }: { line: Line }) {
  if (line.kind === "blank") return <div className="ide-line ide-line--blank">&nbsp;</div>;
  if (line.kind === "heading") {
    const headingText = (line.text ?? "").replace(/^#\s*/, "");
    return (
      <h2 className="ide-line ide-md-heading">
        <span className="ide-tok-punct" aria-hidden="true"># </span>
        {headingText}
      </h2>
    );
  }
  if (line.kind === "bullet") {
    return (
      <p className="ide-line ide-md-bullet">
        <span className="ide-tok-punct" aria-hidden="true">- </span>
        <MdText text={line.text ?? ""} />
      </p>
    );
  }
  return <p className="ide-line ide-md-text"><MdText text={line.text ?? ""} /></p>;
}

export default function IdeHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const isFirstFile = useRef(true);
  const [activeId, setActiveId] = useState<string>(FILES[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = FILES.find((f) => f.id === activeId) ?? FILES[0];
  const isMarkdown = active.lang === "Markdown";

  function openFile(id: string) {
    setSidebarOpen(false); // no-op on desktop, closes the mobile drawer
    if (id === activeId) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !paneRef.current) {
      setActiveId(id);
      return;
    }
    gsap.to(paneRef.current, {
      autoAlpha: 0,
      y: 4,
      duration: 0.12,
      ease: "power1.in",
      onComplete: () => setActiveId(id),
    });
  }

  // Fast opacity-dip + settle on every file switch after the first — kept
  // deliberately distinct from the slower per-line print-in on initial mount
  // (see the useGSAP block below), so there's exactly one "print" beat.
  useEffect(() => {
    if (isFirstFile.current) {
      isFirstFile.current = false;
      return;
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pane = paneRef.current;
    if (prefersReduced || !pane) return;
    const tw = gsap.fromTo(pane, { autoAlpha: 0, y: 4 }, { autoAlpha: 1, y: 0, duration: 0.26, ease: "power2.out" });
    const t = window.setTimeout(() => {
      if (tw.progress() < 1) tw.progress(1);
    }, 2000);
    return () => window.clearTimeout(t);
  }, [activeId]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      // Chrome settles fast — this is UI, not a hero moment. The sidebar is
      // excluded from the `y` tween and only gets autoAlpha: on mobile its
      // `transform` is owned by CSS (the drawer slide) — GSAP leaving a
      // residual inline transform here would silently break that toggle
      // (one animation owner per property/element, per house doctrine).
      const chromeIn = gsap.from(".ide-titlebar, .ide-tabbar", {
        autoAlpha: 0,
        y: 8,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.out",
      });
      settle(chromeIn, 2500);
      const sidebarIn = gsap.from(".ide-sidebar", {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.out",
      });
      settle(sidebarIn, 2500);

      // The ONE print beat: about.md's lines type in on mount.
      const printIn = gsap.from(".ide-pane .ide-line", {
        autoAlpha: 0,
        duration: 0.14,
        stagger: 0.045,
        ease: "none",
        delay: 0.25,
      });
      settle(printIn, 2500);

      return () => settleTimers.forEach((t) => window.clearTimeout(t));
    },
    { scope: rootRef }
  );

  return (
    <div className="ide-root" ref={rootRef}>
      <a href="#ide-main" className="ide-skip">Skip to main content</a>
      <h1 className="ide-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids. Cloud security
        engineer building AI-native security platforms.
      </h1>

      <div className="ide-titlebar" role="navigation" aria-label="Primary navigation">
        <span className="ide-traffic" aria-hidden="true">
          <i className="ide-dot ide-dot--r" /><i className="ide-dot ide-dot--y" /><i className="ide-dot ide-dot--g" />
        </span>
        <button
          type="button"
          className="ide-files-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-expanded={sidebarOpen}
          aria-controls="ide-sidebar"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
          </svg>
          Files
        </button>
        <span className="ide-breadcrumb" aria-hidden="true">
          koushik-kotamraju <span className="ide-crumb-sep">›</span> portfolio <span className="ide-crumb-sep">›</span> {active.name}
        </span>
        <span className="ide-open">
          <span className="ide-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="ide-drawer-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close file list"
        />
      )}

      <div className="ide-shell">
        <aside id="ide-sidebar" className={`ide-sidebar${sidebarOpen ? " ide-sidebar--open" : ""}`} aria-label="Files">
          <p className="ide-sidebar-head" aria-hidden="true">EXPLORER</p>
          <nav className="ide-filenav" aria-label="Portfolio files">
            {FOLDER_ORDER.map((folder) => (
              <div key={folder} className="ide-folder">
                <p className="ide-folder-name" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                  </svg>
                  {folder}/
                </p>
                <ul className="ide-file-list" role="list">
                  {FILES.filter((f) => f.folder === folder).map((f) => (
                    <li key={f.id}>
                      <button
                        type="button"
                        className={`ide-file-row${f.id === activeId ? " ide-file-row--active" : ""}`}
                        onClick={() => openFile(f.id)}
                        aria-current={f.id === activeId ? "true" : undefined}
                      >
                        <span className="ide-file-dot" aria-hidden="true" data-lang={f.lang} />
                        {f.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="ide-editor">
          <div className="ide-tabbar" role="tablist" aria-label="Open files">
            {FILES.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={f.id === activeId}
                className={`ide-tab${f.id === activeId ? " ide-tab--active" : ""}`}
                onClick={() => openFile(f.id)}
              >
                <span className="ide-file-dot" aria-hidden="true" data-lang={f.lang} />
                {f.name}
              </button>
            ))}
          </div>

          <main id="ide-main" className="ide-pane-wrap">
            <div className="ide-pane" ref={paneRef} role="tabpanel">
              {isMarkdown ? (
                active.lines.map((l, i) => <MdLine key={i} line={l} />)
              ) : (
                <div className="ide-code">
                  {active.lines.map((l, i) => (
                    <div key={i} className="ide-code-row">
                      <span className="ide-gutter" aria-hidden="true">{i + 1}</span>
                      <CodeLine line={l} />
                    </div>
                  ))}
                </div>
              )}
              {active.id === "about" && (
                <div className="ide-cta-row">
                  <a href="mailto:koushik.kotamraju1610@gmail.com" className="ide-btn ide-btn--primary">Email me</a>
                  <a href="/resume/" className="ide-btn ide-btn--ghost">Résumé</a>
                </div>
              )}
            </div>
            <Minimap lines={active.lines} />
          </main>

          <div className="ide-statusbar" aria-hidden="true">
            <span className="ide-status-branch">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><path d="M6 8v8M18 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 6h6a4 4 0 0 1 4 4v0" />
              </svg>
              main
            </span>
            <span className="ide-status-pos">Ln 1, Col 1</span>
            <span className="ide-status-lang">{active.lang}</span>
            <span className="ide-status-enc">UTF-8</span>
          </div>
        </div>
      </div>
    </div>
  );
}

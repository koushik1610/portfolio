"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Theme } from "@/lib/themes";

type ResultRow = {
  id: number;
  achievement: string;
  metric: string;
  year: number;
  domain: "iam" | "cloud" | "detection" | "ai";
};

const ROWS: ResultRow[] = [
  { id: 1, achievement: "IAM Escalation Skill",         metric: "100% recall · 32/32 paths",          year: 2024, domain: "iam"       },
  { id: 2, achievement: "Cloud Account Security",       metric: "2,800+ accounts · 0 breaches",        year: 2025, domain: "cloud"     },
  { id: 3, achievement: "Detection Engineering",        metric: "200+ rules · 0 false positives",      year: 2024, domain: "detection" },
  { id: 4, achievement: "Autonomous Threat Intel Pipeline", metric: "$1.40/run · 55% cost reduction · 19 models", year: 2024, domain: "ai" },
  { id: 5, achievement: "AI-Augmented CSPM Platform",   metric: "historical tickets trained · autonomous triage", year: 2024, domain: "ai" },
  { id: 6, achievement: "IAM Toxic Combination Solver", metric: "65+ escalation paths dissolved",     year: 2023, domain: "iam"       },
  { id: 7, achievement: "Attack Path Simulation",       metric: "Artemis — GCP+AWS unified graph",    year: 2023, domain: "detection" },
  { id: 8, achievement: "GOAT Benchmark",               metric: "32/32 verified · 100% recall",       year: 2024, domain: "iam"       },
  { id: 9, achievement: "Agentic Security Reviews",    metric: "80% effort reduction · 120+ reviews · backlog eliminated", year: 2024, domain: "ai" },
];

const ROWS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(ROWS.length / ROWS_PER_PAGE);

const EXPLAIN_PLAN = `QUERY PLAN
─────────────────────────────
Sort  (cost=0.00..9.00)
  Sort Key: impact_score DESC
  →  Seq Scan on career
       Filter: (impact_score >= 90
         AND years_experience >= 9)
       Rows Removed: all others
Planning Time: 9 years
Execution Time: 0.002 ms
─────────────────────────────
-- 1 qualified engineer found`;

export default function OracleHero({ theme }: { theme: Theme }) {
  void theme;
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Database client feel: window title scrambles in from terminal glyphs → final value
    gsap.to(".orc-window-title", {
      duration: 1.2,
      ease: "none",
      scrambleText: {
        text: "psql (16.2) • koushik_portfolio",
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -.:()|",
        revealDelay: 0.25,
        speed: 0.45,
      },
      delay: 0.1,
    });
  }, { scope: containerRef });

  const start = (page - 1) * ROWS_PER_PAGE;
  const pageRows = ROWS.slice(start, start + ROWS_PER_PAGE);

  return (
    <div className="orc-wrap" ref={containerRef}>
      {/* Nav hiding handled via CSS */}

      {/* Terminal window chrome */}
      <motion.div
        className="orc-terminal-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="orc-window-dots" aria-hidden="true">
          <span className="orc-dot orc-dot--red" />
          <span className="orc-dot orc-dot--yellow" />
          <span className="orc-dot orc-dot--green" />
        </div>
        <span className="orc-window-title" aria-hidden="true">psql (16.2) • koushik_portfolio</span>
      </motion.div>

      {/* Main body — split panel */}
      <div className="orc-body">

        {/* Left: query + results */}
        <div className="orc-main">

          {/* SQL query panel */}
          <motion.div
            className="orc-query-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
          >
            <div className="orc-query-prompt">
              <span className="orc-cmt">-- Portfolio Query</span>
            </div>
            <pre className="orc-query-code" aria-label="SQL query">
              <span className="orc-kw">SELECT</span>{" "}
              <span className="orc-tbl">id</span>,{" "}
              <span className="orc-tbl">achievement</span>,{" "}
              <span className="orc-tbl">metric</span>,{" "}
              <span className="orc-tbl">year</span>,{" "}
              <span className="orc-tbl">domain</span>
              {"\n"}
              <span className="orc-kw">FROM</span>{" "}
              <span className="orc-tbl">koushik_kotamraju.career</span>
              {"\n"}
              <span className="orc-kw">WHERE</span>{" "}
              <span className="orc-tbl">impact_score</span> {">="}  <span className="orc-num">90</span>
              {"\n"}{"  "}
              <span className="orc-kw">AND</span>{" "}
              <span className="orc-tbl">years_experience</span> {">="} <span className="orc-num">9</span>
              {"\n"}
              <span className="orc-kw">ORDER BY</span>{" "}
              <span className="orc-tbl">impact_score</span>{" "}
              <span className="orc-kw">DESC</span>;
            </pre>
          </motion.div>

          {/* Divider + meta */}
          <div className="orc-divider" aria-hidden="true" />
          <div className="orc-results-meta" aria-live="polite">
            9 rows returned in 0.002s
          </div>

          {/* Results table */}
          <motion.div
            className="orc-table-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
          >
            <table className="orc-table" role="table">
              <caption className="orc-table-caption">Career achievements query results</caption>
              <thead>
                <tr>
                  <th scope="col" className="orc-th orc-th--id">id</th>
                  <th scope="col" className="orc-th">achievement</th>
                  <th scope="col" className="orc-th">metric</th>
                  <th scope="col" className="orc-th orc-th--year">year</th>
                  <th scope="col" className="orc-th orc-th--domain">domain</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    className={`orc-tr${i % 2 === 1 ? " orc-tr--stripe" : ""}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.25 + i * 0.06, ease: "easeOut" }}
                  >
                    <td className="orc-td orc-td--id">
                      <span className="orc-num">{row.id}</span>
                    </td>
                    <td className="orc-td orc-td--achievement">{row.achievement}</td>
                    <td className="orc-td orc-td--metric">{row.metric}</td>
                    <td className="orc-td orc-td--year">
                      <span className="orc-num">{row.year}</span>
                    </td>
                    <td className="orc-td orc-td--domain">
                      <span
                        className={`orc-badge orc-badge--${row.domain}`}
                        aria-label={`Domain: ${row.domain}`}
                      >
                        {row.domain}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination */}
          <nav className="orc-pagination" aria-label="Query results pagination">
            <span className="orc-cmt">-- Page {page} of {TOTAL_PAGES}</span>
            <div className="orc-pagination-btns">
              <button
                className="orc-page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                {`[<]`}
              </button>
              <button
                className="orc-page-btn"
                onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                disabled={page === TOTAL_PAGES}
                aria-label="Next page"
              >
                {`[>]`}
              </button>
            </div>
          </nav>
        </div>

        {/* Right: EXPLAIN plan */}
        <aside className="orc-explain-panel" aria-label="Query execution plan">
          <pre className="orc-explain-pre">{EXPLAIN_PLAN}</pre>
        </aside>
      </div>

      {/* Status bar */}
      <footer className="orc-statusbar">
        <span className="orc-statusbar-prompt">koushik_portfolio=&gt;&nbsp;</span>
        <a
          className="orc-statusbar-email"
          href="mailto:koushik.kotamraju1610@gmail.com"
          aria-label="Send email to koushik.kotamraju1610@gmail.com"
        >
          koushik.kotamraju1610@gmail.com
        </a>
        <span className="orc-statusbar-sep">·</span>
        <a
          className="orc-statusbar-email"
          href="https://www.linkedin.com/in/koushikkotamraju/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          LinkedIn
        </a>
        <span className="orc-statusbar-sep">·</span>
        <a
          className="orc-statusbar-email"
          href="https://github.com/koushik1610"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}

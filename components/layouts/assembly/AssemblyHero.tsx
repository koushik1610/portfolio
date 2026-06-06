"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Theme } from "@/lib/themes";

type Token = { t: string; c?: string };
type CodeLine = { num: number; tokens: Token[] };

// ── Token class constants ──────────────────────────────────────────────────
const DIR  = "asm-dir";   // section directives — magenta
const LBL  = "asm-lbl";   // labels — yellow
const INST = "asm-inst";  // instructions — blue
const REG  = "asm-reg";   // registers — light blue
const NUM  = "asm-num-t"; // numbers — green  (asm-num-t to avoid conflict with line-num class)
const CNST = "asm-const"; // string constants — orange
const CMT  = "asm-cmt";   // comments — dark green
const HDR  = "asm-hdr";   // section header comments — teal

// Helper constructors
const d  = (t: string): Token => ({ t, c: DIR  });
const l  = (t: string): Token => ({ t, c: LBL  });
const ii = (t: string): Token => ({ t, c: INST });
const r  = (t: string): Token => ({ t, c: REG  });
const n  = (t: string): Token => ({ t, c: NUM  });
const c  = (t: string): Token => ({ t, c: CNST });
const cm = (t: string): Token => ({ t, c: CMT  });
const h  = (t: string): Token => ({ t, c: HDR  });
const tx = (t: string): Token => ({ t });

// ── Assembly listing ───────────────────────────────────────────────────────
const LINES: CodeLine[] = [
  { num:  1, tokens: [h("; =============================================================")]},
  { num:  2, tokens: [h("; koushik_kotamraju.asm — Security Engineer · v9.0")]},
  { num:  3, tokens: [h("; Compiled: 2026-05-21 · Target: Senior Security Engineer")]},
  { num:  4, tokens: [h("; =============================================================")]},
  { num:  5, tokens: [tx("")]},
  { num:  6, tokens: [d("section"), tx(" "), d(".data")]},
  { num:  7, tokens: [tx("    name            "), ii("db"), tx(" "), c('"Koushik Kotamraju"'), tx(", "), n("0")]},
  { num:  8, tokens: [tx("    role            "), ii("db"), tx(" "), c('"Sr. Security Engineer"'), tx(", "), n("0")]},
  { num:  9, tokens: [tx("    organization    "), ii("db"), tx(" "), c('"Yahoo"'), tx(", "), n("0")]},
  { num: 10, tokens: [tx("    years           "), ii("dq"), tx(" "), n("9"), tx("          "), cm("; years of experience")]},
  { num: 11, tokens: [tx("    cloud_accounts  "), ii("dq"), tx(" "), n("2500"), tx("       "), cm("; accounts under management")]},
  { num: 12, tokens: [tx("    team_size       "), ii("dq"), tx(" "), n("4"), tx("          "), cm("; engineers on team")]},
  { num: 13, tokens: [tx("")]},
  { num: 14, tokens: [d("section"), tx(" "), d(".text")]},
  { num: 15, tokens: [tx("    "), ii("global"), tx(" _start")]},
  { num: 16, tokens: [tx("")]},
  { num: 17, tokens: [h("; ─── _experience: ─────────────────────────────────────────────")]},
  { num: 18, tokens: [l("_infosys_2014"), tx(":")]},
  { num: 19, tokens: [tx("    "), cm("; Network security architecture · infrastructure hardening")]},
  { num: 20, tokens: [tx("    "), ii("push"), tx("    "), r("rbp")]},
  { num: 21, tokens: [tx("    "), ii("mov"), tx("     "), r("rbp"), tx(", "), r("rsp")]},
  { num: 22, tokens: [tx("    "), ii("mov"), tx("     "), r("rax"), tx(", "), n("2014"), tx("             "), cm("; start year")]},
  { num: 23, tokens: [tx("    "), ii("mov"), tx("     "), r("rbx"), tx(", "), n("2016"), tx("             "), cm("; end year")]},
  { num: 24, tokens: [tx("    "), ii("ret")]},
  { num: 25, tokens: [tx("")]},
  { num: 26, tokens: [l("_cyr3con_2016"), tx(":")]},
  { num: 27, tokens: [tx("    "), cm("; Threat intelligence · ML-based CVE prioritization")]},
  { num: 28, tokens: [tx("    "), ii("push"), tx("    "), r("rbp")]},
  { num: 29, tokens: [tx("    "), ii("mov"), tx("     "), r("rbp"), tx(", "), r("rsp")]},
  { num: 30, tokens: [tx("    "), ii("lea"), tx("     "), r("rdi"), tx(", [threat_intel]")]},
  { num: 31, tokens: [tx("    "), ii("call"), tx("    analyze_attack_surface")]},
  { num: 32, tokens: [tx("    "), ii("mov"), tx("     "), r("rax"), tx(", PREDICTION_ENGINE")]},
  { num: 33, tokens: [tx("    "), ii("ret")]},
  { num: 34, tokens: [tx("")]},
  { num: 35, tokens: [l("_yahoo_paranoids_2019"), tx(":           "), cm("; CURRENT — principal track")]},
  { num: 36, tokens: [tx("    "), ii("push"), tx("    "), r("rbp")]},
  { num: 37, tokens: [tx("    "), ii("mov"), tx("     "), r("rbp"), tx(", "), r("rsp")]},
  { num: 38, tokens: [tx("    ")]},
  { num: 39, tokens: [tx("    "), cm("; Load scope")]},
  { num: 40, tokens: [tx("    "), ii("mov"), tx("     "), r("rdx"), tx(", "), n("2500"), tx("            "), cm("; cloud accounts")]},
  { num: 41, tokens: [tx("    "), ii("mov"), tx("     "), r("rcx"), tx(", "), n("4"), tx("               "), cm("; team size")]},
  { num: 42, tokens: [tx("    ")]},
  { num: 43, tokens: [tx("    "), cm("; Call detection engineering routine")]},
  { num: 44, tokens: [tx("    "), ii("call"), tx("    deploy_detection_rules   "), cm("; → 200+ rules, 0 false positives")]},
  { num: 45, tokens: [tx("    ")]},
  { num: 46, tokens: [tx("    "), cm("; IAM analysis")]},
  { num: 47, tokens: [tx("    "), ii("call"), tx("    antitoxin            "), cm("; → 65+ escalation paths dissolved")]},
  { num: 48, tokens: [tx("    "), ii("call"), tx("    goat_benchmark       "), cm("; → 100% recall (32/32)")]},
  { num: 49, tokens: [tx("    ")]},
  { num: 50, tokens: [tx("    "), cm("; AI security pipeline")]},
  { num: 51, tokens: [tx("    "), ii("call"), tx("    ai_security_init     "), cm("; → 19 models, 5 providers")]},
  { num: 52, tokens: [tx("    "), ii("mov"), tx("     "), r("rax"), tx(", "), c("COST_PER_RUN"), tx("    "), cm("; → $1.40 (55% below baseline)")]},
  { num: 53, tokens: [tx("    ")]},
  { num: 54, tokens: [tx("    "), cm("; Attack path simulation")]},
  { num: 55, tokens: [tx("    "), ii("call"), tx("    artemis_platform     "), cm("; → GCP+AWS unified graph")]},
  { num: 56, tokens: [tx("    ")]},
  { num: 57, tokens: [tx("    "), ii("ret")]},
  { num: 58, tokens: [tx("")]},
  { num: 59, tokens: [h("; ─── _research: ───────────────────────────────────────────────")]},
  { num: 60, tokens: [d("section"), tx(" "), d(".research")]},
  { num: 61, tokens: [tx("    "), l("artemis"), tx(":    "), cm("; Multi-cloud attack path simulation — production")]},
  { num: 62, tokens: [tx("    "), l("antitoxin"), tx(":  "), cm("; IAM toxic combination dissolution — deployed")]},
  { num: 63, tokens: [tx("    "), l("goat"), tx(":       "), cm("; 100% recall benchmark — verified")]},
  { num: 64, tokens: [tx("    "), l("ai_pipeline"), tx(":"), cm("; Amazon Bedrock · 19 models · 120+ reviews delivered")]},
  { num: 65, tokens: [tx("")]},
  { num: 66, tokens: [h("; ─── _status: ─────────────────────────────────────────────────")]},
  { num: 67, tokens: [d("section"), tx(" "), d(".status")]},
  { num: 68, tokens: [tx("    "), cm("; PRIMARY: Open to senior security engineering roles")]},
  { num: 69, tokens: [tx("    "), cm("; FOCUS: FAANG-adjacent · AI-native security companies")]},
  { num: 70, tokens: [tx("    ")]},
  { num: 71, tokens: [tx("    "), ii("cmp"), tx("     "), r("rax"), tx(", "), c("PRINCIPAL_THRESHOLD"), tx("  "), cm("; check seniority gate")]},
  { num: 72, tokens: [tx("    "), ii("jge"), tx("     "), l(".apply_now"), tx("                "), cm("; meets criteria → proceed")]},
  { num: 73, tokens: [tx("    ")]},
  { num: 74, tokens: [tx("    "), l(".apply_now"), tx(":")]},
  { num: 75, tokens: [tx("        "), ii("mov"), tx("     "), r("rdi"), tx(", "), c("CONTACT_EMAIL"), tx("    "), cm("; koushik.kotamraju1610@gmail.com")]},
  { num: 76, tokens: [tx("        "), ii("mov"), tx("     "), r("rsi"), tx(", "), c("LINKEDIN_URL"), tx("     "), cm("; linkedin.com/in/koushikkotamraju")]},
  { num: 77, tokens: [tx("        "), ii("mov"), tx("     "), r("rdx"), tx(", "), c("GITHUB_URL"), tx("       "), cm("; github.com/koushik1610")]},
  { num: 78, tokens: [tx("        "), ii("call"), tx("    send_signal")]},
  { num: 79, tokens: [tx("    ")]},
  { num: 80, tokens: [tx("        "), cm("; All clear. EOF.")]},
  { num: 81, tokens: [tx("        "), ii("xor"), tx("     "), r("eax"), tx(", "), r("eax")]},
  { num: 82, tokens: [tx("        "), ii("ret")]},
];

// Lines with contact links need special treatment — rendered separately
const LINK_LINES = new Set([75, 76, 77]);

function renderTokens(tokens: Token[], lineNum: number) {
  // Special handling for contact-link lines
  if (lineNum === 75) {
    return (
      <>
        <span className={INST}>mov</span>
        <span>{"     "}</span>
        <span className={REG}>rdi</span>
        <span>{", "}</span>
        <span className={CNST}>CONTACT_EMAIL</span>
        <span>{"    "}</span>
        <span className={CMT}>{";"}&nbsp;</span>
        <a
          href="mailto:koushik.kotamraju1610@gmail.com"
          className="asm-link"
          aria-label="Send email to koushik.kotamraju1610@gmail.com"
        >
          koushik.kotamraju1610@gmail.com
        </a>
      </>
    );
  }
  if (lineNum === 76) {
    return (
      <>
        <span className={INST}>mov</span>
        <span>{"     "}</span>
        <span className={REG}>rsi</span>
        <span>{", "}</span>
        <span className={CNST}>LINKEDIN_URL</span>
        <span>{"     "}</span>
        <span className={CMT}>{";"}&nbsp;</span>
        <a
          href="https://www.linkedin.com/in/koushikkotamraju/"
          className="asm-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile (opens in new tab)"
        >
          linkedin.com/in/koushikkotamraju
        </a>
      </>
    );
  }
  if (lineNum === 77) {
    return (
      <>
        <span className={INST}>mov</span>
        <span>{"     "}</span>
        <span className={REG}>rdx</span>
        <span>{", "}</span>
        <span className={CNST}>GITHUB_URL</span>
        <span>{"       "}</span>
        <span className={CMT}>{";"}&nbsp;</span>
        <a
          href="https://github.com/koushik1610"
          className="asm-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile (opens in new tab)"
        >
          github.com/koushik1610
        </a>
      </>
    );
  }

  return (
    <>
      {tokens.map((tok, i) =>
        tok.c ? (
          <span key={i} className={tok.c} aria-hidden="true">{tok.t}</span>
        ) : (
          <span key={i}>{tok.t}</span>
        )
      )}
    </>
  );
}

const ANIMATE_FIRST = 40; // stagger first 40 lines, rest use whileInView

export default function AssemblyHero({ theme }: { theme: Theme }) {
  void theme;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: "none" } });

    // Binary scramble on window chrome title — feels like a disassembler parsing the binary
    tl.to(".asm-chrome-title", {
      duration: 1.4,
      scrambleText: {
        text: "koushik_kotamraju.asm — Disassembly View",
        chars: "01 ",
        revealDelay: 0.3,
        speed: 0.4,
      },
    });

    // Breadcrumb path resolves slightly after chrome
    tl.to(".asm-toolbar", {
      duration: 1.1,
      scrambleText: {
        text: "_experience › _yahoo_paranoids_2019 › .apply_now",
        chars: "01 ._/>",
        revealDelay: 0.2,
        speed: 0.5,
      },
    }, "-=0.7");
  }, { scope: containerRef });

  return (
    <section id="about" className="asm-wrap" ref={containerRef}>
      {/* Window chrome */}
      <motion.div
        className="asm-window-chrome"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="asm-chrome-dot asm-chrome-dot--red" aria-hidden="true" />
        <span className="asm-chrome-dot asm-chrome-dot--yellow" aria-hidden="true" />
        <span className="asm-chrome-dot asm-chrome-dot--green" aria-hidden="true" />
        <span className="asm-chrome-title">koushik_kotamraju.asm — Disassembly View</span>
      </motion.div>

      {/* Breadcrumb toolbar */}
      <motion.div
        className="asm-toolbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        aria-label="File breadcrumb"
      >
        _experience &rsaquo; _yahoo_paranoids_2019 &rsaquo; .apply_now
      </motion.div>

      {/* Assembly listing */}
      <div
        className="asm-content"
        role="region"
        aria-label="Assembly code listing of Koushik Kotamraju's career"
      >
        <pre className="asm-listing" aria-label="x86-64 assembly career listing">
          {LINES.map((line) => {
            const isLinkLine = LINK_LINES.has(line.num);
            const isEarly    = line.num <= ANIMATE_FIRST;

            const lineContent = (
              <div key={line.num} className="asm-line">
                <span className="asm-line-num" aria-hidden="true">
                  {String(line.num).padStart(2, " ")}
                </span>
                <span className="asm-line-body">
                  {isLinkLine
                    ? renderTokens(line.tokens, line.num)
                    : renderTokens(line.tokens, -1)
                  }
                </span>
              </div>
            );

            if (isEarly) {
              return (
                <motion.div
                  key={line.num}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: line.num * 0.01, duration: 0.15 }}
                >
                  {lineContent}
                </motion.div>
              );
            }

            return (
              <motion.div
                key={line.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
              >
                {lineContent}
              </motion.div>
            );
          })}
        </pre>
      </div>

      {/* Status bar */}
      <div className="asm-statusbar" aria-label="Editor status bar">
        <span>Line 89, Col 1</span>
        <span>x86-64 · UTF-8</span>
      </div>
    </section>
  );
}

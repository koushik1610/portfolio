"use client";

import type { ReactNode } from "react";
import "./styles.css";
import {
  IDENTITY,
  PROJECTS,
  CAREER,
  CONTACT,
  AVAILABILITY,
  PORTRAITS,
  BOUNDARIES,
  TOXIC_COMBINATION_EXAMPLE,
  CONTENT_REVISION,
  decisionById,
  projectById,
  type BuildStatus,
} from "@/lib/profile";
import { STATS, type CanonicalStat } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI } from "@/components/SiteControls";

/* Blueprint: one drawing sheet. The hero is a keylined elevation of the correlation engine's own
   example (one instance, two findings that are low severity alone, one path),
   measured by a dimension string that reads the real count. Everything in the
   drawing is HTML text; only the lines are decoration. The sheet's title block
   carries the photograph, printed as a cyanotype. */

const STATUS: Record<BuildStatus, string> = { shipped: "Shipped", partial: "Partial", research: "Research" };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Dec 2015 – May 2017" to a month index, read from CAREER only. Throws on a
 *  format it does not know, so a change in CAREER fails loudly instead of
 *  drawing a tick at NaN%. */
function startOf(period: string): number {
  const m = /^([A-Z][a-z]{2}) (\d{4})\b/.exec(period);
  const month = m ? MONTHS.indexOf(m[1]) : -1;
  if (!m || month < 0) throw new Error(`BlueprintHero: cannot read the start of CAREER period "${period}"`);
  return Number(m[2]) * 12 + month;
}

/** The en dash range as words, the way the other themes print it. */
const periodText = (p: string) => p.replace(/\s*\u2013\s*/, " to ");

/* The career scale, computed once from CAREER at module load. Its right end is
   the latest role's start plus a fixed allowance, so tick positions depend on
   the data only, never on the day the page is opened. */
const ROLES = [...CAREER].reverse();
const SCALE_START = startOf(ROLES[0].period);
const SCALE_ALLOWANCE_MONTHS = 6;
const SCALE_END = Math.max(...ROLES.map((r) => startOf(r.period))) + SCALE_ALLOWANCE_MONTHS;
const TICKS = ROLES.map((r) => ({ id: r.id, pct: ((startOf(r.period) - SCALE_START) / (SCALE_END - SCALE_START)) * 100 }));
const FIRST_LABEL = periodText(ROLES[0].period).split(" to ")[0];

/* The limits, shown one sentence each, the rest in a native <details>. The
   visible sentence is cut from BOUNDARIES in code, never retyped: for the
   containers limit the sentence that says "that is not me", for the detection
   limit its first sentence. Throws at load if the text no longer has it. */
const sentencesOf = (t: string) => t.split(/(?<=\.)\s+/);
const LIMIT_PICK: Record<string, (sentences: string[]) => string | undefined> = {
  containers: (ss) => ss.find((x) => x.includes("that is not me")),
  detection: (ss) => ss[0],
};
const LIMIT_NOTES = BOUNDARIES.map((b) => {
  const pick = LIMIT_PICK[b.id] ?? ((ss: string[]) => ss[0]);
  const line = pick(sentencesOf(b.text));
  if (!line) throw new Error(`BlueprintHero: no visible sentence for boundary "${b.id}"`);
  return { id: b.id, line, text: b.text };
});

/* The register leaves out the baseline: drawing 02 sits directly above it and
   already carries it. Numbering runs over what is listed, so it stays in sequence. */
const REGISTER = PROJECTS.filter((p) => p.id !== "baseline");

/** A drawing number stamp: legible, keylined, read with its title. */
function Stamp({ n, children }: { n: number; children: ReactNode }) {
  return (
    <>
      <span className="bp-stamp bp-num">{String(n).padStart(2, "0")}</span> <span>{children}</span>
    </>
  );
}

/** A dimension string: the line with a 45 degree tick at each end. Decoration
 *  only; the value it measures is always set as text beside it. */
function Dim({ className }: { className?: string }) {
  return <span className={className ? `bp-dim ${className}` : "bp-dim"} aria-hidden="true" />;
}

function Figure({ stat }: { stat: CanonicalStat }) {
  return (
    <div className="bp-measure">
      <p className="bp-measure-value">
        <span className="bp-num">{stat.value}</span> <span className="bp-measure-label">{stat.label}</span>
      </p>
      <Dim />
      <p className="bp-measure-context">{stat.context}</p>
    </div>
  );
}

export default function BlueprintHero() {
  const toxic-combinations = projectById("toxic-combinations");
  const baseline = projectById("baseline");
  const iam = projectById("iam-review");
  const decision = decisionById("d-05");

  return (
    <div className="bp-root">
      <SkipLink targetId="blueprint-main" />

      <header className="bp-nav">
        <div className="container bp-nav-inner">
          <a className="bp-wordmark" href="#blueprint-main">
            KK<span className="visually-hidden">, {IDENTITY.name}, top of page</span>
          </a>
          <NextThemeButton />
        </div>
      </header>

      <main {...skipTarget("blueprint-main")}>
        {/* ── Hero: the sheet. Ledge posture: the drawing is the tall field,
               the name rests at its base, the title block holds the corner. ── */}
        <section className="bp-hero" aria-labelledby="bp-name">
          <div className="container bp-hero-sheet">
            <div className="bp-hero-name">
              <h1 id="bp-name">{IDENTITY.name}</h1>
              <p className="bp-lede">{IDENTITY.lede}</p>
              <CtaRow />
            </div>

            <figure className="bp-drawing bp-grid" aria-label={`${toxic-combinations.name}: ${toxic-combinations.prose.short}`}>
              <div className="bp-elev">
                <div className="bp-instance">
                  <p className="bp-instance-tag">{TOXIC_COMBINATION_EXAMPLE.resource}</p>
                  <div className="bp-findings">
                    {TOXIC_COMBINATION_EXAMPLE.findings.map((f) => (
                      <p className="bp-finding" key={f}>
                        <span className="bp-finding-name">{f}</span>
                        <span className="bp-finding-sev">{TOXIC_COMBINATION_EXAMPLE.findingNote}</span>
                      </p>
                    ))}
                  </div>
                  <span className="bp-join" aria-hidden="true" />
                  <p className="bp-path">{TOXIC_COMBINATION_EXAMPLE.path}</p>
                </div>
                <div className="bp-span">
                  <Dim className="bp-dim--draw" />
                  <p className="bp-span-value">
                    <span className="bp-num">{STATS.awsToxicCombinations.value}</span> {STATS.awsToxicCombinations.label}
                  </p>
                </div>
              </div>
              <figcaption className="bp-caption">
                <Stamp n={1}>{toxic-combinations.name}, elevation</Stamp>
              </figcaption>
            </figure>

            <aside className="bp-strip" aria-label="Title block">
              <p className="bp-note">
                <b>Note.</b> {toxic-combinations.caveat}
              </p>
              <div className="bp-titleblock">
                <div className="bp-photo">
                  {/* Static export with unoptimized images, so next/image adds nothing here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PORTRAITS.photo.src} alt={PORTRAITS.photo.alt} width={724} height={1086} fetchPriority="high" />
                </div>
                <dl className="bp-tb-cells">
                  <div>
                    <dt>Drawn by</dt>
                    <dd>{IDENTITY.name}</dd>
                  </div>
                  <div>
                    <dt>Title</dt>
                    <dd>{IDENTITY.title}</dd>
                  </div>
                  <div>
                    <dt>Revision</dt>
                    <dd className="bp-num">{CONTENT_REVISION.label}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* ── 02: what he owns ── */}
        <section className="bp-section bp-owns" aria-labelledby="bp-owns-h">
          <div className="container">
            <div className="bp-split-head">
              <h2 id="bp-owns-h">{baseline.name}</h2>
              <p className="lead">{IDENTITY.method}</p>
            </div>
            <figure className="bp-owns-figs">
              <Figure stat={STATS.awsDetectionScope} />
              <Figure stat={STATS.signatures} />
              <figcaption className="bp-caption">
                <Stamp n={2}>{baseline.shortName}, {STATUS[baseline.status].toLowerCase()}</Stamp>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── 03: the register ── */}
        <section className="bp-section bp-work" aria-labelledby="bp-work-h">
          <div className="container">
            <h2 id="bp-work-h">Built, and not yet built</h2>
            <div className="bp-register-wrap">
              <table className="bp-register" aria-labelledby="bp-work-h">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Project</th>
                    <th scope="col">What it is</th>
                    <th scope="col">Status</th>
                    <th scope="col">Caveat</th>
                  </tr>
                </thead>
                <tbody>
                  {REGISTER.map((p, i) => (
                    <tr key={p.id} data-status={p.status}>
                      <td className="bp-num" data-label="No.">{String(i + 1).padStart(2, "0")}</td>
                      <th scope="row" data-label="Project">{p.name}</th>
                      <td data-label="What it is">{p.prose.short}</td>
                      <td data-label="Status">{STATUS[p.status]}</td>
                      <td data-label="Caveat" className={p.caveat ? undefined : "bp-empty"}>
                        {p.caveat ?? <span className="visually-hidden">None</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="bp-caption bp-caption--end" aria-hidden="true">
              <Stamp n={3}>Register of work</Stamp>
            </p>
          </div>
        </section>

        {/* ── 04: review-aws-iam-policies ── */}
        <section className="bp-section bp-iam" aria-labelledby="bp-iam-h">
          <div className="container">
            <div className="bp-split-head">
              <h2 id="bp-iam-h">{iam.shortName}</h2>
              <p className="lead">
                <code className="bp-code">{iam.name}</code>. {iam.prose.short}
              </p>
            </div>
            <figure className="bp-elevation">
              <Figure stat={STATS.escalationClasses} />
              <Figure stat={STATS.goatFindings} />
              <p className="bp-note bp-note--wide">
                <b>Note.</b> {iam.caveat}
              </p>
              <figcaption className="bp-caption">
                <Stamp n={4}>{iam.shortName}, {STATUS[iam.status].toLowerCase()}</Stamp>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── 05: one decision, with what it decided against ── */}
        <section className="bp-section bp-band bp-decision" aria-labelledby="bp-dec-h">
          <div className="container">
            <div className="bp-split-head">
              <h2 id="bp-dec-h">{decision.title}</h2>
              <p className="lead">{decision.problem}</p>
            </div>
            <div className="bp-elevation bp-elevation--text">
              <div>
                <h3>Decided</h3>
                <p>{decision.decided}</p>
              </div>
              <div>
                <h3>Rejected</h3>
                <p>{decision.rejected}</p>
              </div>
            </div>
            <details className="bp-details">
              <summary>The trade-offs</summary>
              <dl>
                <div>
                  <dt>Why it was tempting</dt>
                  <dd>{decision.whyTempting}</dd>
                </div>
                <div>
                  <dt>Cost</dt>
                  <dd>{decision.cost}</dd>
                </div>
                <div>
                  <dt>Limitation</dt>
                  <dd>{decision.limitation}</dd>
                </div>
              </dl>
            </details>
            <p className="bp-caption bp-caption--end">
              <Stamp n={5}>Decision record, {decision.title.toLowerCase()}</Stamp>
            </p>
          </div>
        </section>

        {/* ── 06: career as one dimension string ── */}
        <section className="bp-section bp-career" aria-labelledby="bp-career-h">
          <div className="container">
            <h2 id="bp-career-h">
              {STATS.experience.value} {STATS.experience.label}
            </h2>
            <figure className="bp-timeline">
              <div className="bp-timeline-line" aria-hidden="true">
                <span className="bp-dim" />
                {TICKS.map((t, i) => (
                  <span key={t.id} className="bp-tick" style={{ left: `${t.pct}%` }}>
                    <span className="bp-num">{i + 1}</span>
                  </span>
                ))}
              </div>
              <p className="bp-timeline-ends" aria-hidden="true">
                <span className="bp-num">{FIRST_LABEL}</span>
                <span className="bp-num">now</span>
              </p>
              <ol className="bp-roles">
                {ROLES.map((r) => (
                  <li key={r.id}>
                    <span className="bp-role-title">{r.title}</span>
                    <span className="bp-role-org">{r.org}</span>
                    <span className="bp-num bp-role-period">{periodText(r.period)}</span>
                  </li>
                ))}
              </ol>
              <figcaption className="bp-caption">
                <Stamp n={6}>Career, {FIRST_LABEL} to now</Stamp>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── 07: the limits, as the sheet's notes. No recovery sentence. ── */}
        <section className="bp-section bp-limits" aria-labelledby="bp-limits-h">
          <div className="container">
            <h2 id="bp-limits-h">Limits</h2>
            <ol className="bp-limits-notes">
              {LIMIT_NOTES.map((b) => (
                <li key={b.id}>
                  <div className="bp-limit-body">
                    <p className="bp-limit-line">{b.line}</p>
                    <details className="bp-details bp-limit-details">
                      <summary>The full limit</summary>
                      <p>{b.text}</p>
                    </details>
                  </div>
                </li>
              ))}
            </ol>
            <p className="bp-caption bp-caption--end">
              <Stamp n={7}>Limits, {BOUNDARIES.length} notes</Stamp>
            </p>
          </div>
        </section>

        {/* ── Contact, set as a title block ── */}
        <section className="bp-section bp-band bp-band--deep bp-contact" aria-labelledby="bp-contact-h">
          <div className="container bp-contact-grid">
            <div className="bp-contact-head">
              <h2 id="bp-contact-h">Get in touch</h2>
              <p className="lead">{AVAILABILITY}.</p>
              <CtaRow />
            </div>
            <ul className="bp-contact-cells">
              {CONTACT.map((c) => (
                <li key={c.k}>
                  <span className="bp-cell-label">{c.k}</span>
                  <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {c.v}
                  </a>
                </li>
              ))}
            </ul>
            <AskAI className="bp-ask" />
          </div>
        </section>

        <SrSummary />
      </main>

      <footer className="bp-footer">
        <div className="container bp-footer-inner">
          <p className="bp-footer-name">{IDENTITY.name}</p>
          <p>
            {IDENTITY.title}, {IDENTITY.employer}. <span className="bp-num">{CONTENT_REVISION.label}</span>
          </p>
          <ul className="bp-footer-links">
            <li>
              <a href="/resume/">Résumé</a>
            </li>
            <li>
              <a href="/llms.txt">llms.txt</a>
            </li>
            <li>
              <NextThemeButton />
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

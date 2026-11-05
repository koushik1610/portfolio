"use client";
import "./styles.css";
import { STATS, type CanonicalStat } from "@/lib/stats";
import {
  IDENTITY,
  CONTACT,
  AVAILABILITY,
  PROJECTS,
  CAREER,
  THE_MISS,
  BOUNDARIES,
  projectById,
  decisionById,
  type BuildStatus,
} from "@/lib/profile";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { ContactLabel } from "@/components/icons/SiteIcon";

/* Brutal: a boxed fact sheet. Every fact and every sentence is imported from
   lib/profile.ts and lib/stats.ts; nothing below types a figure. Nothing moves:
   controls flip state in one frame, and only :active presses.

   THE FILL RULE (one rule, page-wide). Yellow marks the single figure a recruiter
   filters on: years. Ink marks work in progress, not built. Everything else
   is paper. Bands (the miss, the footer) are surfaces, not fills. */

const FACTS: ReadonlyArray<{ key: string; stat: CanonicalStat; filter?: true }> = [
  { key: "experience", stat: STATS.experience, filter: true },
  { key: "scope", stat: STATS.awsDetectionScope },
  { key: "signatures", stat: STATS.signatures },
  { key: "reviews", stat: STATS.securityReviews },
];

const STATUS_WORD: Record<BuildStatus, string> = {
  shipped: "Shipped",
  partial: "Partial",
  progress: "In progress",
};

const baseline = projectById("baseline");
/* The baseline has its own section, so the work list starts after it. */
const work = PROJECTS.filter((p) => p.id !== "baseline");

const decision = decisionById("d-04");

/* Boundaries render without a recovery sentence. One of his own sentences is set
   large (verbatim, never reworded); the whole text sits under it in full. */
const sentences = (t: string) => t.match(/[^.]+\.(?=\s|$)/g)?.map((s) => s.trim()) ?? [t];
const BOUNDARY_LEAD: Record<string, (s: string[]) => string> = {
  containers: (s) => s[s.length - 1],
  detection: (s) => s[0],
};
const boundaryLead = (id: string, text: string) => (BOUNDARY_LEAD[id] ?? ((s: string[]) => s[0]))(sentences(text));
const boundaryName = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);

/* lib/profile.ts ranges carry a dash; this page sets them as words. */
const period = (p: string) => p.replace(/\s*[\u2013\u2014-]\s*/, " to ");

export default function BrutalHero() {
  return (
    <div className="br-root">
      <SkipLink targetId="brutal-main" />

      <header className="br-nav">
        <nav className="container br-nav-row" aria-label="Site">
          <a className="br-mark" href="#brutal-main">
            KK<span className="visually-hidden">, {IDENTITY.name}</span>
          </a>
          <ul className="br-nav-links">
            <li>
              <a href="#br-work">Work</a>
            </li>
            <li>
              <a href="#br-contact">Contact</a>
            </li>
          </ul>
          <div className="br-nav-next">
            <NextThemeButton />
          </div>
        </nav>
      </header>

      <main {...skipTarget("brutal-main")} className="br-main">
        {/* 1. Hero: the name fills the top of the sheet. */}
        <section className="br-hero" aria-labelledby="br-name">
          <div className="container br-hero-inner">
            <div className="br-cells br-hero-sheet">
              <div className="br-cell br-hero-name">
                <h1 id="br-name">{IDENTITY.name}</h1>
              </div>
              <div className="br-cell br-hero-lede">
                <p>{IDENTITY.lede}</p>
              </div>
              <div className="br-cell br-hero-cta">
                <CtaRow />
              </div>
            </div>
          </div>
        </section>

        {/* 2. The fact grid: the signature. */}
        <section className="br-sec br-facts" aria-labelledby="br-facts-h">
          <div className="container">
            <h2 id="br-facts-h" className="br-head">The scope</h2>
            <ul className="br-cells br-fact-grid">
              {FACTS.map(({ key, stat, filter }) => (
                <li className="br-fact" key={key}>
                  <div className={filter ? "br-cell br-fact-fig br-fill-accent" : "br-cell br-fact-fig"}>
                    <span className="br-fig num">{stat.value}</span>
                  </div>
                  <div className="br-cell br-fact-text">
                    <h3>{stat.label}</h3>
                    <p>{stat.context}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. What I own. */}
        <section className="br-sec br-own" aria-labelledby="br-own-h">
          <div className="container">
            <h2 id="br-own-h" className="br-head">{baseline.name}</h2>
            <div className="br-cells br-own-grid">
              <div className="br-cell br-own-statement">
                <p>{IDENTITY.method}</p>
              </div>
              <div className="br-cell br-own-status">
                <span className="br-label">Status</span>
                <span className="br-status-text">{STATUS_WORD[baseline.status]}</span>
              </div>
              <div className="br-cell br-own-body">
                <p>{baseline.prose.medium}</p>
                <details className="br-more">
                  <summary>How enforcement works</summary>
                  <p>{baseline.prose.full}</p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* 4. A decision record: problem, decided, rejected at equal weight. */}
        <section className="br-sec br-decision" aria-labelledby="br-dec-h">
          <div className="container">
            <h2 id="br-dec-h" className="br-head">{decision.title}</h2>
            <div className="br-cells br-dec-grid">
              <dl className="br-cell br-dec-field">
                <dt className="br-label">Problem</dt>
                <dd>{decision.problem}</dd>
              </dl>
              <dl className="br-cell br-dec-field">
                <dt className="br-label">Decided</dt>
                <dd>{decision.decided}</dd>
              </dl>
              <dl className="br-cell br-dec-field">
                <dt className="br-label">Rejected</dt>
                <dd>{decision.rejected}</dd>
              </dl>
              <div className="br-cell br-dec-more">
                <details className="br-more">
                  <summary>Trade-offs</summary>
                  <dl className="br-dec-trade">
                    {decision.whyTempting && (
                      <div>
                        <dt className="br-label">Why it was tempting</dt>
                        <dd>{decision.whyTempting}</dd>
                      </div>
                    )}
                    {decision.cost && (
                      <div>
                        <dt className="br-label">What it cost</dt>
                        <dd>{decision.cost}</dd>
                      </div>
                    )}
                    {decision.limitation && (
                      <div>
                        <dt className="br-label">Where it falls short</dt>
                        <dd>{decision.limitation}</dd>
                      </div>
                    )}
                  </dl>
                </details>
                {decision.quote && <p className="br-quote">&ldquo;{decision.quote.text}&rdquo;</p>}
              </div>
            </div>
          </div>
        </section>

        {/* 5. The work and the roles it came from. */}
        <section className="br-sec br-work" id="br-work" aria-labelledby="br-work-h">
          <div className="container">
            <h2 id="br-work-h" className="br-head">The work</h2>
            <ul className="br-cells br-work-list">
              {work.map((p) => (
                <li className="br-work-row" key={p.id}>
                  <div className={p.status === "progress" ? "br-cell br-work-status br-fill-ink" : "br-cell br-work-status"}>
                    <span className="br-status-text">{STATUS_WORD[p.status]}</span>
                  </div>
                  <div className="br-cell br-work-body">
                    <h3>{p.name}</h3>
                    <p>{p.prose.short}</p>
                    {p.caveat && (
                      <p className="br-caveat">
                        <span className="br-label">Caveat</span> {p.caveat}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="br-career" role="group" aria-labelledby="br-career-h">
              <h3 id="br-career-h" className="br-subhead">Career</h3>
              <ol className="br-cells br-career-grid">
                {CAREER.map((r) => (
                  <li className="br-cell br-role" key={r.id}>
                    <span className="br-role-period num">{period(r.period)}</span>
                    <span className="br-role-title">{r.title}</span>
                    <span className="br-role-org">{r.org}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 6. The miss: an ink band. stillExposed renders in full, as written. */}
        <section className="br-band br-miss" aria-labelledby="br-miss-h">
          <div className="container">
            <h2 id="br-miss-h" className="br-head">The miss</h2>
            <div className="br-miss-folds">
              <details className="br-more">
                <summary>Supposed to catch</summary>
                <p>{THE_MISS.supposedToCatch}</p>
              </details>
              <details className="br-more">
                <summary>Why it did not</summary>
                <p>{THE_MISS.whyItDidnt}</p>
              </details>
              <details className="br-more">
                <summary>The fix</summary>
                <p>{THE_MISS.structuralFix}</p>
              </details>
            </div>
            <div className="br-miss-still">
              <p className="br-label">Still exposed</p>
              <p className="br-miss-text">{THE_MISS.stillExposed}</p>
            </div>
          </div>
        </section>

        {/* 7. Boundaries: both, no recovery sentence. */}
        <section className="br-sec br-bounds" aria-labelledby="br-bounds-h">
          <div className="container">
            <h2 id="br-bounds-h" className="br-head">Where I stop</h2>
            <div className="br-cells br-bounds-grid">
              {BOUNDARIES.map((b) => (
                <div className="br-cell br-bound" key={b.id}>
                  <h3>{boundaryName(b.id)}</h3>
                  <p className="br-bound-lead">{boundaryLead(b.id, b.text)}</p>
                  <details className="br-more">
                    <summary>The whole boundary<span className="visually-hidden">: {boundaryName(b.id)}</span></summary>
                    <p>{b.text}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Contact. */}
        <section className="br-sec br-contact" id="br-contact" aria-labelledby="br-contact-h">
          <div className="container">
            <h2 id="br-contact-h" className="br-head">Contact</h2>
            <div className="br-cells br-contact-grid">
              <div className="br-cell br-contact-links">
                <ul>
                  {CONTACT.map((c) => (
                    <li key={c.k}>
                      <span className="br-label"><ContactLabel k={c.k} /></span>
                      <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {c.v}{c.ext ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                      </a>
                    </li>
                  ))}
                </ul>
                <CopyEmail />
                <CtaRow />
              </div>
              <div className="br-cell br-contact-ask">
                <AskAI />
              </div>
            </div>
          </div>
        </section>

        <SrSummary />
      </main>

      {/* 9. Footer: the colophon on ink. */}
      <footer className="br-band br-foot">
        <div className="container br-foot-row">
          <p className="br-foot-name">{IDENTITY.name}</p>
          <p className="br-foot-line">{AVAILABILITY}</p>
        </div>
      </footer>
    </div>
  );
}

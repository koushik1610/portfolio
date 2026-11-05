"use client";

import "./styles.css";
import {
  IDENTITY,
  PROJECTS,
  CAREER,
  CONTACT,
  AVAILABILITY,
  BOUNDARIES,
  THE_MISS,
  CONTENT_REVISION,
  publishedDecisions,
  decisionById,
  projectById,
  type BuildStatus,
} from "@/lib/profile";
import { STATS } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { SiteIcon, ContactLabel, type IconName } from "@/components/icons/SiteIcon";

/* The career as a status page: real components with a real state, one real
   known gap, real changes. There is no uptime data, so there are no uptime bars,
   no history strip and no response-time chart; drawing any of them would be
   Hallmark Floor 8 and PRODUCT.md's "decoration that imitates data". The banner
   is computed below from each project's BuildStatus, so correcting a status in
   lib/profile.ts corrects the headline with it. */

const STATE: Record<BuildStatus, { label: string; icon: IconName; word: string }> = {
  shipped: { label: "Shipped", icon: "check", word: "shipped" },
  partial: { label: "Partly built", icon: "fileDescription", word: "partly built" },
  progress: { label: "In progress", icon: "fileDescription", word: "in progress" },
};

/* The banner and the list read the same array, so the headline can be checked by
   counting the rows beneath it. */
const shippedCount = PROJECTS.filter((p) => p.status === "shipped").length;
const exceptions = PROJECTS.filter((p) => p.status !== "shipped");

const BASELINE = projectById("baseline");
const FIGURES = [STATS.awsDetectionScope, STATS.signatures];

/* Every published record, through the lookup that refuses a held id. The change
   that went wrong leads and is open: it carries an outcome, which is the part of
   a change log worth reading, and its rejected option is then one tap from the nav. */
const OPEN_CHANGE = decisionById("d-10").id;
const CHANGES = publishedDecisions()
  .map((d) => decisionById(d.id))
  .sort((a, b) => Number(b.id === OPEN_CHANGE) - Number(a.id === OPEN_CHANGE));

const period = (p: string) => p.replace(/\s*[\u2013\u2014]\s*/, " to ");

/* Status-page vocabulary over the miss's own fields, deliberately not "incident":
   beside "at Yahoo" that word reads as a live security event at his employer. This
   is a known gap in his own controls. No dates: the record does not carry any, and
   an invented timestamp is the first thing this format would tempt. The open text
   is rendered outside the disclosure and never edited. */
const GAP_DETAILS: ReadonlyArray<{ label: string; text: string }> = [
  { label: "Scope", text: THE_MISS.supposedToCatch },
  { label: "Cause", text: THE_MISS.whyItDidnt },
  { label: "Identified", text: THE_MISS.howFound },
  { label: "Impact", text: THE_MISS.blastRadius },
  { label: "Fixed", text: THE_MISS.structuralFix },
];

export default function StatusHero() {
  return (
    <div className="st-root">
      <SkipLink targetId="status-main" />

      <header className="st-nav">
        <div className="container st-nav__in">
          <a className="st-wordmark" href="#status-main">koushik.io status</a>
          <nav className="st-nav__links" aria-label="Sections">
            <a href="#st-projects">Projects</a>
            <a href="#st-gap">Known gap</a>
            <a href="#st-changes">Changes</a>
            <a href="#st-contact">Contact</a>
          </nav>
          <NextThemeButton />
        </div>
      </header>

      <main {...skipTarget("status-main")} className="st-main">
        <section className="st-hero container" aria-labelledby="st-name">
          <div className="st-hero__who">
            <h1 id="st-name">{IDENTITY.name}</h1>
            <p className="lead">{IDENTITY.lede}</p>
            <CtaRow />
          </div>
          <div className="st-banner">
            <p className="st-banner__figure">
              <span className="num">{shippedCount}</span>
              <span className="st-banner__of"> of {PROJECTS.length} projects shipped</span>
            </p>
            <ul className="st-banner__list">
              {exceptions.map((p) => (
                <li key={p.id}>{p.shortName ?? p.name}: {STATE[p.status].word}.</li>
              ))}
              <li>One known gap open, stated below.</li>
            </ul>
          </div>
        </section>

        <section className="st-own" aria-labelledby="st-own-h">
          <div className="container st-own__in">
            <div>
              <h2 id="st-own-h">{BASELINE.name}</h2>
              <p className="lead">{IDENTITY.method}</p>
            </div>
            <dl className="st-signs">
              {FIGURES.map((s) => (
                <div className="st-sign" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd className="st-sign__value num">{s.value}</dd>
                  <dd className="st-sign__context">{s.context}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="st-projects" className="st-section container" aria-labelledby="st-projects-h">
          <h2 id="st-projects-h">Project status</h2>
          <ul className="st-projects">
            {PROJECTS.map((p) => (
              <li key={p.id} className={`st-sys st-sys--${p.status}`}>
                <details>
                  <summary className="st-sys__row">
                    <h3>{p.name}</h3>
                    <span className="st-sys__state">
                      <SiteIcon name={STATE[p.status].icon} className="st-sys__icon" />
                      {STATE[p.status].label}
                    </span>
                    <span className="st-sys__body">
                      <span>{p.prose.short}</span>
                      {p.caveat ? <span className="st-sys__caveat">{p.caveat}</span> : null}
                    </span>
                    <SiteIcon name="chevron" className="st-sys__chev" />
                  </summary>
                  <div className="st-sys__more">
                    <p>{p.prose.full}</p>
                    <p className="st-sys__stack">{p.stack.join(", ")}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section id="st-gap" className="st-section container" aria-labelledby="st-gap-h">
          <h2 id="st-gap-h">Known gap</h2>
          <article className="st-gapcard">
            <header className="st-gapcard__head">
              <h3>{THE_MISS.title}</h3>
              <p className="st-pill st-pill--open">
                <SiteIcon name="alert" />
                Open
              </p>
            </header>
            <div className="st-gapcard__open">
              <h4>Still exposed</h4>
              <p>{THE_MISS.stillExposed}</p>
            </div>
            <details className="st-more st-gapcard__more">
              <summary>Scope, cause, impact and what was fixed</summary>
              <dl className="st-updates">
                {GAP_DETAILS.map((u) => (
                  <div key={u.label}>
                    <dt>{u.label}</dt>
                    <dd>{u.text}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </article>
        </section>

        <section id="st-changes" className="st-section container" aria-labelledby="st-changes-h">
          <h2 id="st-changes-h">Changes</h2>
          <p className="st-section__note">Each one with the option it was chosen over.</p>
          <div className="st-changes">
            {CHANGES.map((d) => (
              <details key={d.id} className="st-change" open={d.id === OPEN_CHANGE}>
                <summary>
                  <span className="st-change__id num">{d.id}</span>
                  <span className="st-change__title">{d.title}</span>
                </summary>
                <div className="st-change__body">
                  <dl className="st-change__three">
                    <div><dt>Problem</dt><dd>{d.problem}</dd></div>
                    <div><dt>Decided</dt><dd>{d.decided}</dd></div>
                    <div><dt>Rejected</dt><dd>{d.rejected}</dd></div>
                  </dl>
                  <dl className="st-change__three st-change__three--quiet">
                    {d.whyTempting ? <div><dt>Why it was tempting</dt><dd>{d.whyTempting}</dd></div> : null}
                    {d.cost ? <div><dt>Cost</dt><dd>{d.cost}</dd></div> : null}
                    {d.limitation ? <div><dt>Limitation</dt><dd>{d.limitation}</dd></div> : null}
                    {d.outcome ? <div><dt>Outcome</dt><dd>{d.outcome}</dd></div> : null}
                  </dl>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="st-section container st-two" aria-labelledby="st-limits-h">
          <div>
            <h2 id="st-limits-h">Known limitations</h2>
            <ul className="st-limits">
              {BOUNDARIES.map((b) => (
                <li key={b.id}>{b.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="st-career-h">Where I have worked</h2>
            <ol className="st-career" aria-labelledby="st-career-h">
              {CAREER.map((r) => (
                <li key={r.id}>
                  <p className="st-career__when num">{period(r.period)}</p>
                  <h3>{r.title}</h3>
                  <p>{r.org}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="st-contact" className="st-section container st-two" aria-labelledby="st-contact-h">
          <div>
            <h2 id="st-contact-h">Write to me</h2>
            <p className="lead">{AVAILABILITY}.</p>
            <CtaRow />
            <ul className="st-contact">
              {CONTACT.map((c) => (
                <li key={c.k}>
                  <ContactLabel k={c.k} />
                  <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.v}{c.ext ? <span className="visually-hidden"> (opens in a new tab)</span> : null}</a>
                  {c.k === "Email" ? <CopyEmail /> : null}
                </li>
              ))}
            </ul>
          </div>
          <AskAI className="st-ask" headingLevel={2} />
        </section>

        <SrSummary />
      </main>

      <footer className="st-footer">
        <div className="container st-footer__in">
          <p>{IDENTITY.name}</p>
          <p>{CONTENT_REVISION.label}. No uptime figures, because none are measured.</p>
        </div>
      </footer>
    </div>
  );
}

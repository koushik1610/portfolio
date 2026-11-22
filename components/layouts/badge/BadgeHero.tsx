"use client";

import "./styles.css";
import { useState } from "react";
import {
  IDENTITY,
  PORTRAITS,
  PROJECTS,
  CAREER,
  CONTACT,
  AVAILABILITY,
  CONTENT_REVISION,
  decisionById,
  projectById,
} from "@/lib/profile";
import { STATS } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { ContactLabel } from "@/components/icons/SiteIcon";
import { STATUS_LABEL, period } from "@/components/layouts/_shared/format";
import { useLanyard } from "./useLanyard";

/* An access badge on a lanyard. The badge is HTML: the photograph, the name, the
   title, the employer, and an Access list built from the projects whose status
   is "shipped", so the list on the card can be checked against the work section
   below it. No badge number, no barcode, no clearance level: none of them exist.

   The swing is a damped pendulum written by hand: the physics in ./physics.ts, the
   DOM wiring in ./useLanyard.ts. React state here holds only the flip. */

const ACCESS = PROJECTS.filter((p) => p.status === "shipped");
const ORG = CAREER[0].org;
const BASELINE = projectById("baseline");
const DECISION = decisionById("d-05");

/* A break before the @ only, so an address never splits mid-word. */
const breakAt = (v: string) => v.split("@").map((part, i) => (i ? <span key={i}><wbr />@{part}</span> : part));



function Badge() {
  const { rigRef, pendRef, badgeRef, svgRef, pathRef, still } = useLanyard();
  const [turned, setTurned] = useState(false);
  /* Nothing is announced until the first turn. */
  const [announced, setAnnounced] = useState(false);

  return (
    <div className="bd-rig" ref={rigRef}>
      <svg className="bd-strap" ref={svgRef} aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <path ref={pathRef} d="" />
      </svg>
      <div className="bd-pend" ref={pendRef}>
        <div
          className={turned ? "bd-badge is-turned" : "bd-badge"}
          ref={badgeRef}
          tabIndex={0}
          role="group"
          aria-label={turned ? "ID badge, contact side" : "ID badge"}
          aria-describedby={still ? undefined : "bd-hint"}
        >
          <span className="bd-clip" aria-hidden="true">
            <span className="bd-clip__bar" />
            <span className="bd-clip__body" />
            <span className="bd-clip__jaw" />
          </span>
          <div className="bd-card">
            <div className="bd-face bd-face--front">
              <div className="bd-photo">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized */}
                <img src={PORTRAITS.photo.src} alt={PORTRAITS.photo.alt} width={PORTRAITS.photo.width} height={PORTRAITS.photo.height} draggable={false} />
              </div>
              <p className="bd-badge__name">{IDENTITY.name}</p>
              <p className="bd-badge__title">{IDENTITY.title}</p>
              <p className="bd-badge__org">{ORG}</p>
              <div className="bd-access">
                <p className="bd-badge__label" id="bd-access-label">Access</p>
                <ul aria-labelledby="bd-access-label">
                  {ACCESS.map((p) => (
                    <li key={p.id}>{p.shortName ?? p.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bd-face bd-face--back">
              <p className="bd-badge__label">If found, write to</p>
              <ul className="bd-back__links">
                {CONTACT.map((c) => (
                  <li key={c.k}>
                    <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      <ContactLabel k={c.k} />
                      <span className="bd-back__v">
                        {breakAt(c.v)}
                      </span>
                      {c.ext ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="bd-back__note">{AVAILABILITY}.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bd-rig__controls">
        <button type="button" className="bd-turn" aria-pressed={turned} onClick={() => { setAnnounced(true); setTurned((t) => !t); }}>
          Turn the badge
        </button>
        <p className="visually-hidden" role="status">{announced ? (turned ? "Badge turned to contact side" : "Badge turned to front") : ""}</p>
        <p className="bd-hint" id="bd-hint" hidden={still}>
          Drag it to swing it, or focus it and press the arrow keys
        </p>
      </div>
    </div>
  );
}

export default function BadgeHero() {
  return (
    <div className="bd-root">
      <SkipLink targetId="badge-main" />

      <header className="bd-nav">
        <div className="container bd-nav__in">
          <a className="bd-wordmark" href="#badge-main">KK</a>
          <nav className="bd-nav__links" aria-label="Sections">
            <a href="#bd-work">Work</a>
            <a href="#bd-decision">Decision</a>
            <a href="#bd-career">Career</a>
            <a href="#bd-contact">Contact</a>
          </nav>
          <NextThemeButton />
        </div>
      </header>

      <main {...skipTarget("badge-main")} className="bd-main">
        <section className="bd-hero" aria-labelledby="bd-name">
          <div className="container bd-hero__in">
            <div className="bd-hero__who">
              <h1 id="bd-name">{IDENTITY.name}</h1>
              <p className="lead">{IDENTITY.lede}</p>
              <CtaRow />
            </div>
            <Badge />
          </div>
        </section>

        <section className="bd-own" aria-labelledby="bd-own-h">
          <div className="container">
            <div className="bd-head">
              <h2 id="bd-own-h">{BASELINE.name}</h2>
              <p className="lead">{IDENTITY.method}</p>
            </div>
            <dl className="bd-figs">
              {[STATS.awsDetectionScope, STATS.signatures].map((s) => (
                <div className="bd-fig bd-surface" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd className="bd-fig__value num">{s.value}</dd>
                  <dd className="bd-fig__context">{s.context}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="bd-work" className="bd-work" aria-labelledby="bd-work-h">
          <div className="container">
            <div className="bd-head">
              <h2 id="bd-work-h">What I have built</h2>
              <p className="lead">
                {ACCESS.length} of {PROJECTS.length} shipped. The badge lists those, and only those.
              </p>
            </div>
            {/* Set like the access log behind the badge: one entry per project, its
                status in words. Explicit roles keep the table a table when a narrow
                screen restacks its rows. */}
            <div className="bd-logcard bd-surface">
            <table className="bd-entries" role="table">
              <caption className="visually-hidden">Projects and their build status</caption>
              <thead role="rowgroup">
                <tr role="row">
                  <th scope="col" role="columnheader">Project</th>
                  <th scope="col" role="columnheader">What it covers</th>
                  <th scope="col" role="columnheader">Status</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {PROJECTS.map((p) => (
                  <tr key={p.id} role="row" className={`bd-entry bd-entry--${p.status}`}>
                    <th scope="row" role="rowheader" className="bd-entry__name">{p.name}</th>
                    <td role="cell" className="bd-entry__body">
                      <p>{p.prose.short}</p>
                      {p.caveat ? <p className="bd-entry__caveat">{p.caveat}</p> : null}
                    </td>
                    <td role="cell" className="bd-entry__state">{STATUS_LABEL[p.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </section>

        <section id="bd-decision" className="bd-decision" aria-labelledby="bd-decision-h">
          <div className="container">
            <div className="bd-head">
              <h2 id="bd-decision-h">{DECISION.title}</h2>
              <p className="lead">{DECISION.problem}</p>
            </div>
            <dl className="bd-choice">
              <div>
                <dt>Decided</dt>
                <dd>{DECISION.decided}</dd>
              </div>
              <div>
                <dt>Rejected</dt>
                <dd>{DECISION.rejected}</dd>
              </div>
            </dl>
            <details className="bd-more">
              <summary>Why the rejected option was tempting, and what this one costs</summary>
              <dl className="bd-more__body">
                {DECISION.whyTempting ? <div><dt>Why it was tempting</dt><dd>{DECISION.whyTempting}</dd></div> : null}
                {DECISION.cost ? <div><dt>Cost</dt><dd>{DECISION.cost}</dd></div> : null}
                {DECISION.limitation ? <div><dt>Limitation</dt><dd>{DECISION.limitation}</dd></div> : null}
              </dl>
            </details>
          </div>
        </section>

        <section id="bd-career" className="bd-career" aria-labelledby="bd-career-h">
          <div className="container">
            <h2 id="bd-career-h" className="bd-career__h">Where I have worked</h2>
            {/* The badges held before this one, newest first. */}
            <ol className="bd-passes">
              {CAREER.map((r) => (
                <li key={r.id} className={r.current ? "bd-pass bd-surface is-current" : "bd-pass bd-surface"}>
                  <p className="bd-pass__when num">{period(r.period)}</p>
                  <h3>{r.title}</h3>
                  <p className="bd-pass__org">{r.org}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="bd-contact" className="bd-contact" aria-labelledby="bd-contact-h">
          <div className="container bd-contact__in">
            <div className="bd-contact__main">
              <h2 id="bd-contact-h">Write to me</h2>
              <p className="lead">{AVAILABILITY}.</p>
              <CtaRow />
            </div>
            {/* The back of the badge, laid flat. */}
            <div className="bd-pass bd-surface bd-contact__pass">
              <p className="bd-badge__label">If found, write to</p>
              <ul className="bd-links">
                {CONTACT.map((c) => (
                  <li key={c.k}>
                    <ContactLabel k={c.k} />
                    <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {breakAt(c.v)}
                      {c.ext ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                    </a>
                    {c.k === "Email" ? <CopyEmail /> : null}
                  </li>
                ))}
              </ul>
            </div>
            <AskAI className="bd-ask" headingLevel={2} />
          </div>
        </section>

        <SrSummary />
      </main>

      <footer className="bd-footer">
        <div className="container bd-footer__in">
          <p>{IDENTITY.name}</p>
          <p>{CONTENT_REVISION.label}</p>
        </div>
      </footer>
    </div>
  );
}

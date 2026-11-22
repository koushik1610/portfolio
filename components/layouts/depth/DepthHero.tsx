import "./styles.css";
import type { CSSProperties } from "react";
import { TiltHero } from "./TiltHero";
import {
  IDENTITY,
  PROJECTS,
  CAREER,
  CONTACT,
  AVAILABILITY,
  PORTRAITS,
  CONTENT_REVISION,
  decisionById,
  projectById,
} from "@/lib/profile";
import { STATUS_LABEL, period } from "@/components/layouts/_shared/format";
import { STATS } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { ContactLabel } from "@/components/icons/SiteIcon";

/* A red bill with the owner standing in front of his own name. The figure turns
   toward the pointer and the name drifts the other way; both read two custom
   properties that TiltHero.tsx writes on the hero, so at rest (no script,
   reduced motion, or before the first move) the page is the still poster.
   This file has no "use client" and no state: TiltHero.tsx is the client
   boundary, and components/Hero.tsx loads the theme with next/dynamic. */


const [FIRST, ...REST] = IDENTITY.name.split(" ");
const LAST = REST.join(" ");

const BASELINE = projectById("baseline");
const FIGURES = [STATS.awsDetectionScope, STATS.signatures];
const DECISION = decisionById("d-05");
/* The baseline has its own section above, so the list starts with what was built on it. */
const BUILT = PROJECTS.filter((p) => p.id !== BASELINE.id);
const APPROACH = IDENTITY.bio.full.split(" ");


export default function DepthHero() {
  return (
    <div className="dp-root">
      <SkipLink targetId="depth-main" />

      <header className="dp-nav container">
        <a className="dp-wordmark" href="#depth-main">KK</a>
        <nav className="dp-nav__links" aria-label="Sections">
          <a href="#dp-work">Work</a>
          <a href="#dp-decision">Decision</a>
          <a href="#dp-career">Career</a>
          <a href="#dp-contact">Contact</a>
        </nav>
        <NextThemeButton />
      </header>

      <main {...skipTarget("depth-main")} className="dp-main">
        <TiltHero className="dp-hero container" labelledBy="dp-name">
          <h1 id="dp-name" className="dp-name">
            <span className="dp-name__first">{FIRST}</span>{" "}
            <span className="dp-name__last">{LAST}</span>
          </h1>
          <div className="dp-hero__copy">
            <p className="lead">{IDENTITY.lede}</p>
            <CtaRow />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images */}
          <img
            className="dp-figure"
            src={PORTRAITS.cutout.src}
            alt=""
            width={PORTRAITS.cutout.width}
            height={PORTRAITS.cutout.height}
            fetchPriority="high"
            decoding="async"
          />
        </TiltHero>

        <section className="dp-approach container" aria-label="How I work">
          <p className="dp-approach__text">
            {APPROACH.map((w, i) => (
              <span key={i} className="dp-word" style={{ "--p": (i / (APPROACH.length - 1)).toFixed(3) } as CSSProperties}>
                {w}{i < APPROACH.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </section>

        <section className="dp-own container" aria-labelledby="dp-own-h">
          <div className="dp-own__head">
            <div>
              <h2 id="dp-own-h">{BASELINE.name}</h2>
              <p className="dp-own__status">{STATUS_LABEL[BASELINE.status]}</p>
            </div>
            <p className="lead">{IDENTITY.method}</p>
          </div>
          <dl className="dp-figures">
            {FIGURES.map((s) => (
              <div className="dp-fig" key={s.label}>
                <dt>{s.label}</dt>
                <dd className="dp-fig__value num">{s.value}</dd>
                <dd className="dp-fig__context">{s.context}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="dp-work" className="dp-bill" aria-labelledby="dp-work-h">
          <div className="dp-work container">
          <h2 id="dp-work-h">What I have built</h2>
          <ul className="dp-projects">
            {BUILT.map((p) => (
              <li key={p.id} className="dp-proj">
                <h3>{p.name}</h3>
                <p className="dp-proj__status">{STATUS_LABEL[p.status]}</p>
                <div className="dp-proj__body">
                  <p>{p.prose.short}</p>
                  {p.caveat ? <p className="dp-proj__caveat">{p.caveat}</p> : null}
                </div>
              </li>
            ))}
          </ul>
          </div>
        </section>

        <section id="dp-decision" className="dp-decision" aria-labelledby="dp-decision-h">
          <div className="container dp-decision__in">
            <h2 id="dp-decision-h">{DECISION.title}</h2>
            <dl className="dp-decision__three">
              <div><dt>Problem</dt><dd>{DECISION.problem}</dd></div>
              <div><dt>Decided</dt><dd>{DECISION.decided}</dd></div>
              <div><dt>Rejected</dt><dd>{DECISION.rejected}</dd></div>
            </dl>
            <details className="dp-more">
              <summary>Why the rejected option was tempting, and what this one costs</summary>
              <dl className="dp-decision__three">
                {DECISION.whyTempting ? <div><dt>Why it was tempting</dt><dd>{DECISION.whyTempting}</dd></div> : null}
                {DECISION.cost ? <div><dt>Cost</dt><dd>{DECISION.cost}</dd></div> : null}
                {DECISION.limitation ? <div><dt>Limitation</dt><dd>{DECISION.limitation}</dd></div> : null}
              </dl>
            </details>
          </div>
        </section>

        <section id="dp-career" className="dp-bill" aria-labelledby="dp-career-h">
          <div className="dp-career container">
          <h2 id="dp-career-h">Where I have worked</h2>
          <ol className="dp-roles">
            {CAREER.map((r) => (
              <li key={r.id} className="dp-role">
                <p className="dp-role__when num">{period(r.period)}</p>
                <h3>{r.title}</h3>
                <p className="dp-role__org">{r.org}</p>
              </li>
            ))}
          </ol>
          </div>
        </section>

        <section id="dp-contact" className="dp-contact container" aria-labelledby="dp-contact-h">
          <h2 id="dp-contact-h">Write to me</h2>
          <div className="dp-contact__main">
            <p className="lead">{AVAILABILITY}.</p>
            <ul className="dp-links">
              {CONTACT.map((c) => (
                <li key={c.k}>
                  <ContactLabel k={c.k} />
                  <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {c.v}
                    {c.ext ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                  </a>
                  {c.k === "Email" ? <CopyEmail /> : null}
                </li>
              ))}
            </ul>
          </div>
          <AskAI className="dp-ask" />
        </section>

        <SrSummary />
      </main>

      <footer className="dp-footer container">
        <p className="dp-footer__name">{IDENTITY.name}</p>
        <p>{CONTENT_REVISION.label}</p>
      </footer>
    </div>
  );
}

"use client";

import "./styles.css";
import { Fragment, useRef, useState, type CSSProperties } from "react";
import { buildCards, DECISION_ID, STATE } from "./cards";
import { period } from "@/components/layouts/_shared/format";
import { useFanPointer, useOffscreenPause, useOpenFromHash, useReducedMotion, useScramble } from "./behaviours";
import {
  IDENTITY,
  PROJECTS,
  CAPABILITIES,
  CAREER,
  CONTACT,
  AVAILABILITY,
  PORTRAITS,
  CONTENT_REVISION,
  decisionById,
  projectById,
} from "@/lib/profile";
import { STATS } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { SiteIcon, ContactLabel } from "@/components/icons/SiteIcon";

/* Deck: a Swiss poster sheet. The name is set as large as its column takes,
   the photograph hangs in the gap after the first name, and five cards fan out
   beside it. Each card is a link to the part of the page it stands for, so the
   fan is a table of contents you can pick up, not a picture of one. */



const [FIRST, ...REST] = IDENTITY.name.split(" ");
const LAST = REST.join(" ");

const BASELINE = projectById("baseline");
const DECISION = decisionById(DECISION_ID);
const CARDS = buildCards(DECISION);
const FIGURES = [STATS.awsDetectionScope, STATS.signatures];
const SHIPPED = PROJECTS.filter((p) => p.status === "shipped").length;

/* The capabilities as one sentence: names after the first lose their capital
   unless it belongs to an acronym (IAM, AI). */
const lowerFirst = (s: string) => (/^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
const CAP_NAMES = CAPABILITIES.map((c, i) => (i === 0 ? c.name : lowerFirst(c.name)));
const CAP_LINE = `${CAP_NAMES.slice(0, -1).join(", ")}, and ${CAP_NAMES[CAP_NAMES.length - 1]}.`;

const startYear = (p: string) => p.match(/\d{4}/)?.[0] ?? "";

/* Words that settle from scrambled letters, once, when the line scrolls in.
   The real words stay in the DOM the whole time; the scramble is an aria-hidden
   overlay on each word, so the line never changes width and nothing reflows. */
function ScrambleLine({ text, className, reduce }: { text: string; className: string; reduce: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useScramble(ref, reduce);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="dk-w">
            {w}
            <span className="dk-w__s" aria-hidden="true" data-w={w} />
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}

export default function DeckHero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLUListElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  const reduce = useReducedMotion();
  useFanPointer(heroRef, stageRef, deckRef, reduce);
  useOffscreenPause(marqueeRef);
  useOpenFromHash("dk-p-");

  return (
    <div className="dk-root">
      <SkipLink targetId="deck-main" />

      <header className="dk-head">
        <div className="container dk-head__in">
          <a className="dk-mark" href="#deck-main">KK</a>
          <nav className="dk-nav" aria-label="Sections">
            <ul>
              <li><a href="#dk-work">Work</a></li>
              <li><a href="#dk-decision">Decision</a></li>
              <li><a href="#dk-career">Career</a></li>
              <li><a href="#dk-contact">Contact</a></li>
            </ul>
          </nav>
          <NextThemeButton className="dk-next" />
        </div>
      </header>

      <main {...skipTarget("deck-main")} className="dk-main">
        <section ref={heroRef} className="dk-hero" aria-labelledby="dk-name">
          <div className="container dk-hero__in">
            <div className="dk-hero__text">
              <h1 id="dk-name" className="dk-name">
                <span className="dk-name__line">
                  {FIRST}
                  <span className="dk-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images; alt is empty because the name is the heading it sits in */}
                    <img src={PORTRAITS.photo.src} alt="" width={PORTRAITS.photo.width} height={PORTRAITS.photo.height} fetchPriority="high" />
                  </span>
                </span>{" "}
                <span className="dk-name__line">{LAST}</span>
              </h1>
              <p className="dk-lede">{IDENTITY.lede}</p>
              <CtaRow className="dk-cta" />
            </div>

            <div className={open ? "dk-fan is-open" : "dk-fan"}>
              <div ref={stageRef} className="dk-stage">
                <ul ref={deckRef} id="dk-deck" className="dk-deck" aria-label={`${CARDS.length} places to start`}>
                  {CARDS.map((c, i) => (
                    <li key={c.key} className="dk-slot" style={{ "--i": i } as CSSProperties}>
                      <a className={`dk-card dk-card--${c.tone} dk-card--${c.kind}`} href={c.href}>
                        {c.kind === "project" ? (
                          <>
                            <span className="dk-card__name">{c.name}</span>
                            <span className="dk-card__line"><span className="dk-card__k">{c.state}.</span> {c.line}</span>
                          </>
                        ) : c.kind === "decision" ? (
                          <>
                            <span className="dk-card__name"><span className="dk-card__mark" aria-hidden="true" />{c.name}</span>
                            <span className="dk-card__line"><span className="dk-card__k">Rejected:</span> {c.rejected}</span>
                          </>
                        ) : (
                          <>
                            <span className="dk-card__stat">{c.value}</span>
                            <span className="dk-card__label">{c.label}</span>
                            <span className="dk-card__line">{c.line}</span>
                          </>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <button type="button" className="dk-toggle" aria-pressed={open} aria-controls="dk-deck" onClick={() => setOpen((v) => !v)}>
                Spread the cards
              </button>
            </div>
          </div>
        </section>

        <section id="dk-own" className="dk-own" aria-labelledby="dk-own-h">
          <div className="container dk-own__in">
            <h2 id="dk-own-h">{BASELINE.name}</h2>
            <p className="dk-own__method">{IDENTITY.method}</p>
            <dl className="dk-figs">
              {FIGURES.map((s) => (
                <div className="dk-fig" key={s.label}>
                  <dt className="dk-fig__label">{s.label}</dt>
                  <dd className="dk-fig__value">{s.value}</dd>
                  <dd className="dk-fig__ctx">{s.context}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={paused ? "dk-band is-paused" : "dk-band"} aria-labelledby="dk-cap-h">
          <div className="container dk-band__in">
            <h2 id="dk-cap-h" className="visually-hidden">Capabilities</h2>
            <ScrambleLine text={CAP_LINE} className="dk-capline" reduce={reduce} />
            <button type="button" className="dk-toggle dk-pause" aria-pressed={paused} aria-controls="dk-marquee" onClick={() => setPaused((v) => !v)}>
              Pause the list
            </button>
          </div>
          <div className="container">
            <ul className="dk-caps">
              {CAPABILITIES.map((c) => (
                <li key={c.id} className="dk-caps__row">
                  <span className="dk-caps__name">{c.name}</span>
                  <span className="dk-caps__what"><span className="num">{c.stat.value}</span> {c.stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div ref={marqueeRef} id="dk-marquee" className="dk-marquee" aria-hidden="true">
            <div className="dk-marquee__track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="dk-marquee__list">
                  {CAPABILITIES.map((c) => <li key={c.id}>{c.name}</li>)}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section id="dk-work" className="dk-work" aria-labelledby="dk-work-h">
          <div className="container">
            <h2 id="dk-work-h">{PROJECTS.length} projects, {SHIPPED} shipped</h2>
            <ul className="dk-index">
              {PROJECTS.map((p) => (
                <li key={p.id} id={`dk-p-${p.id}`} className={`dk-row dk-row--${p.status}`}>
                  <details>
                    <summary className="dk-row__sum">
                      <span className="dk-row__state">{STATE[p.status]}</span>
                      <h3>{p.name}</h3>
                      <span className="dk-row__cav">{p.caveat ?? ""}</span>
                      <SiteIcon name="chevron" className="dk-row__chev" />
                    </summary>
                    <div className="dk-row__more">
                      <p>{p.prose.full}</p>
                      <p className="dk-row__stack">{p.stack.join(", ")}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="dk-decision" className="dk-decision" aria-labelledby="dk-dec-h">
          <div className="container dk-dec">
            <h2 id="dk-dec-h">{DECISION.title}</h2>
            <p className="dk-dec__problem">{DECISION.problem}</p>
            <dl className="dk-dec__choice">
              <div><dt>Decided</dt><dd>{DECISION.decided}</dd></div>
              <div><dt>Rejected</dt><dd>{DECISION.rejected}</dd></div>
            </dl>
            {DECISION.quote ? <p className="dk-dec__quote">&ldquo;{DECISION.quote.text}&rdquo;</p> : null}
            <details className="dk-dec__more">
              <summary>Why the rejected option tempted, and the cost<SiteIcon name="chevron" className="dk-dec__chev" /></summary>
              <dl>
                {DECISION.whyTempting ? <div><dt>Why it was tempting</dt><dd>{DECISION.whyTempting}</dd></div> : null}
                {DECISION.cost ? <div><dt>Cost</dt><dd>{DECISION.cost}</dd></div> : null}
                {DECISION.limitation ? <div><dt>Limitation</dt><dd>{DECISION.limitation}</dd></div> : null}
              </dl>
            </details>
          </div>
        </section>

        <section id="dk-career" className="dk-career" aria-labelledby="dk-career-h">
          <div className="container">
            <h2 id="dk-career-h">Where I have worked</h2>
            <ol className="dk-roles">
              {CAREER.map((r) => (
                <li key={r.id} className="dk-role">
                  <p className="dk-role__year num" aria-hidden="true">{startYear(r.period)}</p>
                  <div className="dk-role__what">
                    <h3>{r.title}</h3>
                    <p>{r.org}</p>
                  </div>
                  <p className="dk-role__when num">{period(r.period)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="dk-contact" className="dk-contact" aria-labelledby="dk-contact-h">
          <div className="container dk-contact__in">
            <div className="dk-contact__main">
              <h2 id="dk-contact-h">Write to me</h2>
              <p className="dk-contact__line">{AVAILABILITY}.</p>
              <CtaRow className="dk-cta" />
              <ul className="dk-links">
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
            <AskAI className="dk-ask" />
          </div>
        </section>

        <SrSummary />
      </main>

      <footer className="dk-foot">
        <div className="container dk-foot__in">
          <p className="dk-foot__name">{IDENTITY.name}</p>
          <p>{CONTENT_REVISION.label}. Set in Radio Canada Big and Radio Canada.</p>
        </div>
      </footer>
    </div>
  );
}

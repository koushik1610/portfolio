"use client";
import "./styles.css";
import { IDENTITY, PORTRAITS, PROJECTS, CAREER, CONTACT, AVAILABILITY, projectById, decisionById } from "@/lib/profile";
import { STATS } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { ContactLabel } from "@/components/icons/SiteIcon";

/* Darkroom: a print room with the lights off. One photograph (the portrait),
   the figures as an edition, the work as a contact sheet whose frames are
   developed as far as the work is (from project.status, never typed), one
   decision as a print, the career as a collector's sheet. Every fact is imported. */

const EDITION = [STATS.experience, STATS.cloudYears, STATS.securityReviews, STATS.teamLed] as const;
/* The edition's size, said as a word and derived from the list it names. */
const NUMBER_WORDS = ["none", "one", "two", "three", "four", "five", "six", "seven", "eight"] as const;
const editionSize = NUMBER_WORDS[EDITION.length] ?? String(EDITION.length);
const BASELINE = projectById("baseline");
const WORK = PROJECTS.filter((p) => p.id !== "baseline");
/* The brief names d-11; decisionById throws on a held or missing record. */
const PRINT = decisionById("d-11");

const STATUS_TEXT = { shipped: "Shipped", partial: "Partly built", progress: "In progress" } as const;
/* How far each frame is developed, read from status: shipped prints at full
   density, partial is under-exposed below its fold, work in progress stays a negative. */
const DEVELOP = { shipped: "full", partial: "half", progress: "none" } as const;
/* CAREER periods carry an en dash; the copy rules forbid one, so it reads "to". */
const period = (p: string) => p.replace(/\s*–\s*/, " to ");

export default function DarkroomHero() {
  return (
    <div className="dr-root">
      <SkipLink targetId="darkroom-main" />

      <header className="dr-nav">
        <div className="container dr-nav__in">
          <a href="#darkroom-main" className="dr-wordmark">
            {IDENTITY.name}
          </a>
          <NextThemeButton />
        </div>
      </header>

      <main {...skipTarget("darkroom-main")}>
        <section className="dr-hero" aria-labelledby="dr-name">
          <div className="container dr-hero__grid">
            <div className="dr-hero__text">
              <h1 id="dr-name" className="dr-name">{IDENTITY.name}</h1>
              <p className="dr-lede">{IDENTITY.lede}</p>
              <CtaRow className="dr-actions" />
            </div>
            <figure className="dr-plate">
              <div className="dr-plate__print">
                {/* Static export with unoptimized images: next/image adds nothing here. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PORTRAITS.photo.src} alt={PORTRAITS.photo.alt} width={724} height={1086} fetchPriority="high" />
              </div>
              <figcaption className="dr-caption">Portrait, printed in black and white.</figcaption>
            </figure>
          </div>
        </section>

        <section className="dr-edition dr-grained" aria-labelledby="dr-edition-h">
          <div className="container">
            <h2 id="dr-edition-h" className="dr-h2">An edition of {editionSize}</h2>
            <dl className="dr-edition__grid">
              {EDITION.map((s) => (
                <div key={s.label} className="dr-edition__cell">
                  <dt className="dr-edition__label">{s.label}</dt>
                  <dd className="dr-figure">{s.value}</dd>
                  <dd className="dr-edition__ctx">{s.context}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="dr-owns" aria-labelledby="dr-owns-h">
          <div className="container dr-owns__grid">
            <div className="dr-owns__lead">
              <h2 id="dr-owns-h" className="dr-owns__h">What I own</h2>
              <p className="dr-statement">{IDENTITY.method}</p>
            </div>
            <div className="dr-owns__base">
              <h3 className="dr-h3">{BASELINE.name}</h3>
              <p className="dr-owns__status">{STATUS_TEXT[BASELINE.status]}</p>
              <p className="dr-owns__short">{BASELINE.prose.short}</p>
              <dl className="dr-owns__figs">
                {[STATS.awsDetectionScope, STATS.signatures].map((s) => (
                  <div key={s.label} className="dr-owns__fig">
                    <dt className="dr-owns__label">{s.label}</dt>
                    <dd className="dr-figure dr-figure--s">{s.value}</dd>
                    <dd className="dr-owns__ctx">{s.context}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="dr-work" aria-labelledby="dr-work-h">
          <div className="container">
            <div className="dr-work__head">
              <h2 id="dr-work-h" className="dr-h2">My contact sheet</h2>
              <p className="dr-work__line">Developed as far as the work is: shipped prints in full, partial work half, work in progress stays a negative.</p>
            </div>
            <ol className="dr-sheetgrid">
              {WORK.map((p, i) => {
                const dev = DEVELOP[p.status];
                return (
                  <li key={p.id} className={`dr-frame dr-frame--${dev}`}>
                    <div className="dr-frame__print">
                      {dev === "none" ? null : <span className="dr-frame__veil" aria-hidden="true" />}
                      {/* Every frame carries its name. An unexposed negative carries it
                          only as edge print; a developed frame carries the name and one
                          line: the stat when the project has one, else its short line. */}
                      <h3 className={dev === "none" ? "dr-frame__name dr-frame__name--edge" : "dr-frame__name"}>{p.name}</h3>
                      {dev === "none" ? null : p.stat ? (
                        <p className="dr-frame__stat">
                          <span className="dr-frame__value">{p.stat.value}</span>
                          <span className="dr-frame__label">{p.statLabel ?? p.stat.label}</span>
                        </p>
                      ) : (
                        <p className="dr-frame__line">{p.prose.short}</p>
                      )}
                    </div>
                    <div className="dr-frame__cap">
                      <p className="dr-frame__status">Frame {i + 1}. {STATUS_TEXT[p.status]}</p>
                      {dev === "none" || p.stat ? <p className="dr-frame__short">{p.prose.short}</p> : null}
                      {p.caveat ? <p className="dr-frame__caveat">{p.caveat}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="dr-print dr-grained" aria-labelledby="dr-print-h">
          <div className="container">
            <div className="dr-print__head">
              <h2 id="dr-print-h" className="dr-h2">{PRINT.title}</h2>
              {PRINT.quote ? <p className="dr-print__quote">&ldquo;{PRINT.quote.text}&rdquo;</p> : null}
            </div>
            <dl className="dr-print__sheet">
              <div>
                <dt>The problem</dt>
                <dd>{PRINT.problem}</dd>
              </div>
              <div>
                <dt>Decided</dt>
                <dd>{PRINT.decided}</dd>
              </div>
              <div>
                <dt>Rejected</dt>
                <dd>{PRINT.rejected}</dd>
              </div>
            </dl>
            <details className="dr-print__more">
              <summary>Why the rejected option was tempting, and what this cost</summary>
              <dl className="dr-print__sheet dr-print__sheet--more">
                <div>
                  <dt>Why it was tempting</dt>
                  <dd>{PRINT.whyTempting}</dd>
                </div>
                <div>
                  <dt>Cost</dt>
                  <dd>{PRINT.cost}</dd>
                </div>
                <div>
                  <dt>Where it stops</dt>
                  <dd>{PRINT.limitation}</dd>
                </div>
              </dl>
            </details>
          </div>
        </section>

        <section className="dr-career" aria-labelledby="dr-career-h">
          <div className="container dr-career__grid">
            <h2 id="dr-career-h" className="dr-h2">{CAREER.length} roles since {period(CAREER[CAREER.length - 1].period).split(" to ")[0]}</h2>
            <ol className="dr-sheet">
              {CAREER.map((r) => (
                <li key={r.id} className="dr-sheet__row">
                  <span className="dr-sheet__label">{period(r.period)}</span>
                  <span className="dr-sheet__value">{r.title}</span>
                  <span className="dr-sheet__org">{r.org}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="dr-contact" aria-labelledby="dr-contact-h">
          <div className="container dr-contact__grid">
            <div className="dr-contact__main">
              <h2 id="dr-contact-h" className="dr-h2">Write to me</h2>
              <p className="dr-contact__line">{AVAILABILITY}.</p>
              <CtaRow className="dr-actions" />
              <ul className="dr-contact__links">
                {CONTACT.map((c) => (
                  <li key={c.k}>
                    <span className="dr-contact__k"><ContactLabel k={c.k} /></span>
                    <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.v}{c.ext ? <span className="visually-hidden"> (opens in a new tab)</span> : null}</a>
                  </li>
                ))}
              </ul>
              <CopyEmail />
            </div>
            <AskAI className="dr-ask" />
          </div>
        </section>

        <SrSummary />
      </main>

      <footer className="dr-footer">
        <div className="container dr-footer__in">
          <ul className="dr-footer__links">
            <li><a href="/resume/">Résumé</a></li>
            <li><a href="/llms.txt">llms.txt</a></li>
            {CONTACT.filter((c) => c.ext).map((c) => (
              <li key={c.k}><a href={c.href} target="_blank" rel="noopener noreferrer">{c.k}<span className="visually-hidden"> (opens in a new tab)</span></a></li>
            ))}
          </ul>
          <p className="dr-footer__colophon">Set in Sofia Sans Extra Condensed and Barlow. The portrait is the only photograph.</p>
        </div>
      </footer>
    </div>
  );
}

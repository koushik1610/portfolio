import "./styles.css";
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
import { STATS } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { ContactLabel } from "@/components/icons/SiteIcon";
import { STATUS_LABEL, period } from "@/components/layouts/_shared/format";

/* Fold: a closed foldable phone between the two halves of the name. Scrolling
   opens it (CSS scroll-driven animation on a tall sticky stage, styles.css), and
   the open screen holds the hero. There is no JavaScript in the effect: the
   Unfold control is a link to the end of the stage, so it works with a keyboard,
   on touch and with scripting off. Without scroll-timeline support, under
   reduced motion, and under 640px, the page is static. */

const [FIRST, ...REST] = IDENTITY.name.split(" ");
const LAST = REST.join(" ");

/* The lock screen's notifications: real projects with their real state, one
   shipped and one in progress, so the screen shows the range honestly. */
const NOTIFY = [projectById("baseline"), projectById("incident-context")];

const BASELINE = projectById("baseline");
const FIGURES = [STATS.awsDetectionScope, STATS.signatures];
const DECISION = decisionById("d-05");
const NOW = CAREER[0];

export default function FoldHero() {
  return (
    <div className="fd-root">
      <SkipLink targetId="fold-main" />

      <header className="fd-nav">
        <div className="fd-nav__in">
          <a className="fd-wordmark" href="#fold-main">
            KK<span className="visually-hidden"> {IDENTITY.name}</span>
          </a>
          <nav className="fd-nav__links" aria-label="Sections">
            <a href="#fd-work">Work</a>
            <a href="#fd-decision">Decision</a>
            <a href="#fd-career">Career</a>
            <a href="#fd-contact">Contact</a>
          </nav>
          <NextThemeButton />
        </div>
      </header>

      <main {...skipTarget("fold-main")} className="fd-main">
        <section className="fd-hero" aria-labelledby="fd-name">
          <div className="fd-stage">
            <div className="fd-frame">
              <div className="fd-device">
                <div className="fd-text">
                  <div className="fd-group">
                    <h1 id="fd-name" className="fd-name">
                      <span className="fd-name__first">{FIRST}</span>{" "}
                      <span className="fd-name__last">{LAST}</span>
                    </h1>
                    <div className="fd-copy">
                      <p className="lead">{IDENTITY.lede}</p>
                      <CtaRow />
                    </div>
                  </div>
                </div>

                <div className="fd-body">
                  <div className="fd-panel fd-panel--right">
                    <div className="fd-screen fd-screen--photo">
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images */}
                      <img src={PORTRAITS.photo.src} alt={PORTRAITS.photo.alt} width={PORTRAITS.photo.width} height={PORTRAITS.photo.height} className="fd-photo" />
                    </div>
                  </div>
                  <div className="fd-panel fd-panel--left">
                    <div className="fd-face fd-face--inner">
                      <div className="fd-screen" />
                    </div>
                    <div className="fd-face fd-face--cover">
                      <div className="fd-screen fd-lock">
                        {/* eslint-disable-next-line @next/next/no-img-element -- static export; the same file as the portrait, so one request */}
                        <img src={PORTRAITS.photo.src} alt="" width={PORTRAITS.photo.width} height={PORTRAITS.photo.height} className="fd-photo fd-lock__photo" />
                        <div className="fd-lock__top" aria-hidden="true">
                          <p className="fd-lock__title">{IDENTITY.title}</p>
                          <p className="fd-lock__org">{NOW.org}</p>
                        </div>
                        <ul className="fd-lock__notes" aria-hidden="true">
                          {NOTIFY.map((p) => (
                            <li key={p.id} className="fd-note">
                              <span className="fd-note__name">{p.shortName ?? p.name}</span>
                              <span className="fd-note__state">{STATUS_LABEL[p.status]}</span>
                            </li>
                          ))}
                        </ul>
                        {/* Jumps to #fold-open, which styles.css places at the end of the stage, so the scroll timeline reads 100% and the device is open. */}
                        <a className="fd-unfold" href="#fold-open">Unfold</a>
                      </div>
                    </div>
                  </div>
                  <span className="fd-hinge" aria-hidden="true" />
                </div>
              </div>
            </div>
            <span id="fold-open" className="fd-open" aria-hidden="true" />
          </div>
        </section>

        <section className="fd-sec fd-own" aria-labelledby="fd-own-h">
          <div className="container">
            <div className="fd-sheet">
              <div className="fd-own__head">
                <h2 id="fd-own-h">{BASELINE.name}</h2>
                <p className="lead">{IDENTITY.method}</p>
              </div>
              <dl className="fd-figs">
                {FIGURES.map((s) => (
                  <div className="fd-fig" key={s.label}>
                    <dt>{s.label}</dt>
                    <dd className="fd-fig__value num">{s.value}</dd>
                    <dd className="fd-fig__context">{s.context}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="fd-work" className="fd-sec fd-work" aria-labelledby="fd-work-h">
          <div className="container">
            <div className="fd-sheet">
              <h2 id="fd-work-h" className="fd-sheet__wide">Projects, and where each stands</h2>
              <ul className="fd-board">
                {PROJECTS.map((p) => (
                  <li key={p.id} className={`fd-run fd-run--${p.status}`}>
                    <h3 className="fd-run__name">{p.shortName ?? p.name}</h3>
                    <div className="fd-run__body">
                      <p>{p.prose.short}</p>
                      {p.caveat ? <p className="fd-run__caveat">{p.caveat}</p> : null}
                    </div>
                    <p className="fd-run__state">{STATUS_LABEL[p.status]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="fd-decision" className="fd-sec fd-decision" aria-labelledby="fd-decision-h">
          <div className="container">
            <div className="fd-sheet fd-sheet--ink">
              <h2 id="fd-decision-h">{DECISION.title}</h2>
              <div className="fd-decision__body">
                <dl className="fd-record">
                  <div><dt>Problem</dt><dd>{DECISION.problem}</dd></div>
                  <div><dt>Decided</dt><dd>{DECISION.decided}</dd></div>
                  <div><dt>Rejected</dt><dd>{DECISION.rejected}</dd></div>
                </dl>
                <details className="fd-more">
                  <summary>Why the other way was tempting, and the cost</summary>
                  <dl className="fd-record fd-record--quiet">
                    {DECISION.whyTempting ? <div><dt>Why it was tempting</dt><dd>{DECISION.whyTempting}</dd></div> : null}
                    {DECISION.cost ? <div><dt>Cost</dt><dd>{DECISION.cost}</dd></div> : null}
                    {DECISION.limitation ? <div><dt>Limitation</dt><dd>{DECISION.limitation}</dd></div> : null}
                  </dl>
                </details>
                {DECISION.quote ? <p className="fd-quote">&ldquo;{DECISION.quote.text}&rdquo;</p> : null}
              </div>
            </div>
          </div>
        </section>

        <section id="fd-career" className="fd-sec fd-career" aria-labelledby="fd-career-h">
          <div className="container">
            <div className="fd-sheet">
              <h2 id="fd-career-h">Where I have worked</h2>
              <ol className="fd-roles">
                {CAREER.map((r) => (
                  <li key={r.id}>
                    <p className="fd-roles__when num">{period(r.period)}</p>
                    <h3 className="fd-roles__title">{r.title}</h3>
                    <p className="fd-roles__org">{r.org}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="fd-contact" className="fd-sec fd-contact" aria-labelledby="fd-contact-h">
          <div className="container">
            <div className="fd-sheet">
              <div className="fd-contact__main">
                <h2 id="fd-contact-h">Write to me</h2>
                <p className="lead">{AVAILABILITY}.</p>
                <CtaRow />
                <ul className="fd-links">
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
              <AskAI className="fd-ask" headingLevel={2} />
            </div>
          </div>
        </section>

        <SrSummary />
      </main>

      <footer className="fd-footer">
        <div className="container fd-footer__in">
          <p className="fd-footer__name">{IDENTITY.name}</p>
          <p>{CONTENT_REVISION.label}</p>
        </div>
      </footer>
    </div>
  );
}

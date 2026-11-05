"use client";

import { useState, useLayoutEffect, useRef } from "react";
import "./styles.css";
import {
  IDENTITY,
  PROJECTS,
  CAPABILITIES,
  CAREER,
  CONTACT,
  AVAILABILITY,
  projectById,
  decisionById,
  type BuildStatus,
  type Project,
} from "@/lib/profile";
import { STATS, type CanonicalStat } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { ContactLabel } from "@/components/icons/SiteIcon";

/* Ink: a notice printed in plain black. The page is a register of the work,
   and its one colour means "shipped". Partial and in-progress are outlined in ink
   with the caveat set beside them, so the state of each thing is the first
   column a reader meets, not a footnote. */

type Filter = "all" | BuildStatus;

const STATE_LABEL: Record<BuildStatus, string> = {
  shipped: "Shipped",
  partial: "Partial",
  progress: "In progress",
};

const FILTERS: ReadonlyArray<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "shipped", label: "Shipped" },
  { key: "partial", label: "Partial" },
  { key: "progress", label: "In progress" },
];

const countFor = (f: Filter) => (f === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.status === f).length);

/* Each figure appears once on the page. The baseline ledger claims its three
   first (the page contract puts scope and signatures there); a register row or
   a capability shows its figure only when no earlier block has printed that
   value and its own line does not already say it. */
const LEDGER: ReadonlyArray<CanonicalStat> = [STATS.awsDetectionScope, STATS.signatures, STATS.severityTiers];
const SHOWN = new Set<string>(LEDGER.map((s) => s.value));
const figureOnce = (stat: CanonicalStat | undefined, line: string): CanonicalStat | undefined => {
  if (!stat || SHOWN.has(stat.value) || line.includes(stat.value)) return undefined;
  SHOWN.add(stat.value);
  return stat;
};
const ROW_FIG = new Map(PROJECTS.map((p) => [p.id, figureOnce(p.stat, p.prose.short)] as const));
/* The capabilities are a quieter index with no figure column. A capability
   whose short line repeats a figure the page has already printed (the
   signatures, which the ledger owns) is left out, so each number reads once. */
const CAPS = CAPABILITIES.filter((c) => ![...SHOWN].some((v) => c.prose.short.includes(v)));

/* "Oct 2026 – now" becomes two cells, so the timetable reads as from and to
   columns and no dash is ever painted. */
const splitPeriod = (period: string) => {
  const [from, to] = period.split(/\s*[–-]\s*/);
  return { from: from ?? period, to: to ?? "" };
};

/* The state, set in type: teal over a full rule for shipped, ink over a half
   rule for partial, ink over a dashed rule for in progress. No filled chip. */
function State({ status }: { status: BuildStatus }) {
  return <span className={`ink-state ink-state--${status}`}>{STATE_LABEL[status]}</span>;
}

function RegisterRow({ p, hidden }: { p: Project; hidden: boolean }) {
  const fig = ROW_FIG.get(p.id);
  return (
    <li className="ink-row" data-status={p.status} hidden={hidden}>
      <div className="ink-row__state">
        <State status={p.status} />
      </div>
      <div className="ink-row__name">
        <h3>{p.name}</h3>
        <p className="ink-row__stack">{p.stack.join(", ")}</p>
      </div>
      <div className="ink-row__what">
        <p>{p.prose.short}</p>
        {p.caveat ? (
          <p className="ink-row__caveat">
            <span className="ink-row__caveat-k">Caveat.</span> {p.caveat}
          </p>
        ) : null}
        <details className="ink-more">
          <summary>In full<span className="visually-hidden">: {p.name}</span></summary>
          <p>{p.prose.medium}</p>
        </details>
      </div>
      <div className="ink-row__fig">
        {fig ? (
          <>
            <span className="ink-fig">{fig.value}</span>
            <span className="ink-fig__label">{p.statLabel ?? fig.label}</span>
          </>
        ) : null}
      </div>
    </li>
  );
}

export default function InkHero() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = countFor(filter);

  /* A rule slides to the chosen state, measured so it survives the phone's 2x2 grid.
     Width comes from scaleX on a 100px bar: transform is the only animated property. */
  const filterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const group = filterRef.current;
    const bar = barRef.current;
    if (!group || !bar) return;
    const place = () => {
      const on = group.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!on) return;
      bar.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop + on.offsetHeight + 3}px) scaleX(${on.offsetWidth / 100})`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(group);
    return () => ro.disconnect();
  }, [filter]);

  const baseline = projectById("baseline");
  /* d-01: d-03 is console's lead and d-11 is darkroom's. Its quote is trimmed,
     and the caption says so, built from the record's own title and fidelity. */
  const decision = decisionById("d-01");

  return (
    <div className="ink-root">
      <SkipLink targetId="ink-main" />

      <header className="ink-nav">
        <div className="container ink-nav__in">
          <a className="ink-wordmark" href="#ink-main" aria-label="Koushik Kotamraju, top of page">
            {IDENTITY.name}
          </a>
          <NextThemeButton className="ink-next" />
        </div>
      </header>

      <main {...skipTarget("ink-main")}>
        {/* Hero: a banner. The register starts on the first screen. */}
        <section className="ink-hero" aria-labelledby="ink-h1">
          <div className="container ink-hero__in">
            <h1 id="ink-h1">{IDENTITY.name}</h1>
            <div className="ink-hero__side">
              <p className="lead">{IDENTITY.lede}</p>
              <CtaRow />
            </div>
          </div>
        </section>

        {/* The signature: the register, with honest state. */}
        <section className="ink-register" aria-labelledby="ink-work">
          <div className="container">
            <div className="ink-register__head">
              <h2 id="ink-work">How far each project got</h2>
              <div ref={filterRef} className="ink-filter" role="group" aria-label="Show projects by state">
                <span ref={barRef} className="ink-filter__bar" aria-hidden="true" />
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    className={`ink-filter__btn ink-filter__btn--${f.key}`}
                    aria-pressed={filter === f.key}
                    aria-label={`${f.label}, ${countFor(f.key)} ${countFor(f.key) === 1 ? "project" : "projects"}`}
                    onClick={() => setFilter(f.key)}
                  >
                    {f.label}
                    <span className="ink-filter__n">{countFor(f.key)}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="ink-register__status" role="status">
              Showing {shown} of {PROJECTS.length}
            </p>
            <ol className="ink-rows">
              {PROJECTS.map((p) => (
                <RegisterRow key={p.id} p={p} hidden={filter !== "all" && p.status !== filter} />
              ))}
            </ol>
          </div>
        </section>

        {/* What I own: the baseline as a ruled ledger, figure against what it
            counts, on the page's one paper band. */}
        <section className="ink-owns" aria-labelledby="ink-owns">
          <div className="container ink-owns__in">
            <div className="ink-owns__head">
              <h2 id="ink-owns">What I own</h2>
              <p className="lead">{IDENTITY.method}</p>
            </div>
            <div className="ink-ledger__wrap">
            <div className="ink-ledger__cap">
              <h3 id="ink-ledger" className="ink-ledger__name">{baseline.name}</h3>
              <p className="ink-ledger__short">{baseline.prose.short}</p>
            </div>
            <table className="ink-ledger" aria-labelledby="ink-ledger">
              <thead>
                <tr>
                  <th scope="col">Figure</th>
                  <th scope="col">Counts</th>
                  <th scope="col">What it means</th>
                </tr>
              </thead>
              <tbody>
                {LEDGER.map((s) => (
                  <tr key={s.label}>
                    <td className="ink-ledger__value">{s.value}</td>
                    <th scope="row" className="ink-ledger__label">{s.label}</th>
                    <td className="ink-ledger__ctx">{s.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </section>

        {/* Capabilities: a second, quieter index. */}
        <section className="ink-caps" aria-labelledby="ink-caps">
          <div className="container ink-caps__in">
            <h2 id="ink-caps">Where the work sits</h2>
            <ul className="ink-caps__list">
              {CAPS.map((c) => (
                <li key={c.id} className="ink-cap">
                  <h3 className="ink-cap__name">{c.name}</h3>
                  <p className="ink-cap__short">{c.prose.short}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* One published decision record, with what was rejected. */}
        <section className="ink-decision" aria-labelledby="ink-decision">
            <div className="container">
              <h2 id="ink-decision">{decision.title}</h2>
              <dl className="ink-decision__grid">
                <div>
                  <dt>The problem</dt>
                  <dd>{decision.problem}</dd>
                </div>
                <div>
                  <dt>Decided</dt>
                  <dd>{decision.decided}</dd>
                </div>
                <div>
                  <dt>Rejected</dt>
                  <dd>{decision.rejected}</dd>
                </div>
              </dl>
              <details className="ink-more ink-decision__more">
                <summary>Why the rejected option was tempting, and what this cost</summary>
                <dl className="ink-decision__detail">
                  {decision.whyTempting ? (
                    <div>
                      <dt>Why it was tempting</dt>
                      <dd>{decision.whyTempting}</dd>
                    </div>
                  ) : null}
                  {decision.cost ? (
                    <div>
                      <dt>Cost</dt>
                      <dd>{decision.cost}</dd>
                    </div>
                  ) : null}
                  {decision.limitation ? (
                    <div>
                      <dt>Limitation</dt>
                      <dd>{decision.limitation}</dd>
                    </div>
                  ) : null}
                  {decision.outcome ? (
                    <div>
                      <dt>How it went</dt>
                      <dd>{decision.outcome}</dd>
                    </div>
                  ) : null}
                </dl>
              </details>
              {decision.quote ? (
                <figure className="ink-quote">
                  <blockquote>
                    <p>&ldquo;{decision.quote.text}&rdquo;</p>
                  </blockquote>
                  <figcaption>From the record &ldquo;{decision.title}&rdquo;, {decision.quote.fidelity}.</figcaption>
                </figure>
              ) : null}
            </div>
          </section>

        {/* Career as a timetable. */}
        <section className="ink-career" aria-labelledby="ink-career">
          <div className="container ink-career__in">
            <h2 id="ink-career">Where I have worked</h2>
            <table className="ink-table">
              <thead>
                <tr>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Role</th>
                  <th scope="col">Organisation</th>
                </tr>
              </thead>
              <tbody>
                {CAREER.map((r) => {
                  const { from, to } = splitPeriod(r.period);
                  return (
                    <tr key={r.id} className={r.current ? "is-current" : undefined}>
                      <td className="ink-table__date" data-label="From">{from}</td>
                      <td className="ink-table__date" data-label="To">{to}</td>
                      <th scope="row" className="ink-table__role">{r.title}</th>
                      <td className="ink-table__org">{r.org}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact. */}
        <section className="ink-contact" aria-labelledby="ink-contact">
          <div className="container ink-contact__in">
            <div className="ink-contact__main">
              <h2 id="ink-contact">Write to me</h2>
              <p className="lead">{AVAILABILITY}.</p>
              <CtaRow />
              <dl className="ink-links">
                {CONTACT.map((c) => (
                  <div key={c.k}>
                    <dt><ContactLabel k={c.k} /></dt>
                    <dd>
                      <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {c.v}{c.ext ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
              <CopyEmail />
            </div>
            <AskAI className="ink-ask" />
          </div>
        </section>

        <SrSummary />
      </main>

      <footer className="ink-footer">
        <div className="container ink-footer__in">
          <p className="ink-footer__mark">{IDENTITY.name}</p>
          <p className="ink-footer__line">{IDENTITY.title}, {IDENTITY.employer}.</p>
          <a className="ink-footer__top" href="#ink-main">Back to the top</a>
        </div>
      </footer>
    </div>
  );
}

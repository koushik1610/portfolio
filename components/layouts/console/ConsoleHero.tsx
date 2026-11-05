"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import "./styles.css";
import {
  IDENTITY,
  PROJECTS,
  CAREER,
  CONTACT,
  AVAILABILITY,
  THE_MISS,
  publishedDecisions,
  decisionById,
  projectById,
  type Decision,
  type Project,
} from "@/lib/profile";
import { STATS } from "@/lib/stats";
import { SkipLink, skipTarget, CtaRow, SrSummary } from "@/components/layouts/_shared/ThemePrimitives";
import { NextThemeButton, AskAI, CopyEmail } from "@/components/SiteControls";
import { ContactLabel } from "@/components/icons/SiteIcon";

/* Console. A versioned record where the replaced value stays visible: every
   decision is set as a reading, the rejected option struck above the decided
   one, signed by the person who decided. Every string and figure is imported
   from lib/profile.ts and lib/stats.ts; this file only arranges them. */

const MAIN_ID = "console-main";
const SIGNER = IDENTITY.name.split(" ")[0];
const DECISIONS = publishedDecisions();
/* Throws if d-03 is ever held or removed, so the hero can never fall back to
   a different record without anyone noticing. */
const SIGNATURE = decisionById("d-03");
const BASELINE = projectById("baseline");
/* The baseline has its own section above, so the work list starts after it
   and the 200+ figure is said once where it does work. */
const WORK = PROJECTS.filter((p) => p.id !== "baseline");

/* Phones keep the three links a recruiter needs; the rest return at 640px. */
const NAV = [
  { href: "#baseline", label: "Baseline", phone: false },
  { href: "#decisions", label: "Decisions", phone: true },
  { href: "#work", label: "Work", phone: true },
  { href: "#career", label: "Career", phone: false },
  { href: "#contact", label: "Contact", phone: true },
] as const;

const STATUS_TEXT: Record<Project["status"], string> = {
  shipped: "Shipped",
  partial: "Partly built",
  progress: "In progress",
};

/** The first clause of a recorded option, for the one reading on the first
 *  screen. The full text is one link away in the trail. */
function firstClause(s: string): string {
  const i = s.indexOf(", ");
  return i > 0 ? `${s.slice(0, i)}.` : s;
}

/** Periods are stored as a dashed range; this page reads them as words. */
const period = (p: string) => p.replace(/\s*–\s*/, " to ");

export default function ConsoleHero() {
  const [active, setActive] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const summaries = useRef<Record<string, HTMLElement | null>>({});

  const select = (i: number, focus = false) => {
    const n = (i + DECISIONS.length) % DECISIONS.length;
    setActive(n);
    if (focus) tabs.current[n]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const moves: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: DECISIONS.length - 1 };
    if (e.key in moves) {
      e.preventDefault();
      select(moves[e.key], true);
    }
  };

  /* "Read what it cost": show d-03, open its costs, and put focus on the
     disclosure that holds them. The href stays for no-script and new tabs. */
  const openSignature = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    select(DECISIONS.findIndex((d) => d.id === SIGNATURE.id));
    setOpenId(SIGNATURE.id);
    setFocusId(SIGNATURE.id);
  };

  useEffect(() => {
    if (!focusId) return;
    const el = summaries.current[focusId];
    if (el) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.focus({ preventScroll: true });
      el.closest("article")?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
    setFocusId(null);
  }, [focusId, active]);

  return (
    <div className="cn-root">
      <SkipLink targetId={MAIN_ID} />

      <header className="cn-nav">
        <div className="container cn-nav__in">
          <a className="cn-mark" href={`#${MAIN_ID}`}>
            KK<span className="visually-hidden"> {IDENTITY.name}, back to top</span>
          </a>
          <nav className="cn-nav__links" aria-label="Sections">
            <ul>
              {NAV.map((l) => (
                <li key={l.href} className={l.phone ? undefined : "cn-nav__wide"}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <NextThemeButton className="cn-next" />
        </div>
      </header>

      <main {...skipTarget(MAIN_ID)} className="cn-main">
        {/* ── Hero: the name small above the one reading ───────────────── */}
        <section className="cn-hero" aria-labelledby="cn-name">
          <div className="container cn-hero__in">
            <div className="cn-hero__top">
              <div className="cn-hero__text">
                <h1 id="cn-name">{IDENTITY.name}</h1>
                <p className="lead cn-lede">{IDENTITY.lede}</p>
              </div>
              <CtaRow className="cn-hero__cta" />
            </div>

            <figure className="cn-reading" aria-label={`Decision record ${SIGNATURE.id}: ${SIGNATURE.title}`}>
              <p className="cn-reading__title">{SIGNATURE.title}</p>
              <dl className="cn-reading__rows">
                <div className="cn-row cn-row--was">
                  <dt>Rejected</dt>
                  <dd>
                    <s className="cn-struck">{firstClause(SIGNATURE.rejected)}</s>
                  </dd>
                </div>
                <div className="cn-row cn-row--now">
                  <dt>Decided</dt>
                  <dd className="cn-measured cn-measured--lead">{firstClause(SIGNATURE.decided)}</dd>
                </div>
              </dl>
              <div className="cn-cells">
                <p>
                  <span className="cn-label">Signed by</span>
                  <span className="cn-person">{SIGNER}</span>
                </p>
                <p>
                  <span className="cn-label">Record</span>
                  <span className="cn-id">{SIGNATURE.id}</span>
                </p>
                <p className="cn-cells__link">
                  <a href={`#cn-rec-${SIGNATURE.id}`} onClick={openSignature}>
                    Read what it cost
                  </a>
                </p>
              </div>
            </figure>
          </div>
        </section>

        {/* ── What I own ────────────────────────────────────────────────── */}
        <section className="cn-section cn-owns" id="baseline" aria-labelledby="cn-owns-h">
          <div className="container cn-split cn-split--5-7">
            <div className="cn-split__text">
              <h2 id="cn-owns-h">{BASELINE.name}</h2>
              <p className="lead">{IDENTITY.method}</p>
            </div>
            <div className="cn-panels cn-owns__panels">
              {[STATS.awsDetectionScope, STATS.signatures].map((s) => (
                <div className="cn-meter" key={s.label}>
                  <p className="cn-meter__value">
                    <span className="cn-big">{s.value}</span>
                    <span className="cn-meter__unit">{s.label}</span>
                  </p>
                  <p className="cn-meter__context">{s.context}</p>
                </div>
              ))}
              <div className="cn-cells cn-cells--two">
                <p>
                  <span className="cn-label">Owner</span>
                  <span className="cn-person">{SIGNER}</span>
                </p>
                <p>
                  <span className="cn-label">Status</span>
                  <span>{STATUS_TEXT[BASELINE.status]}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── The decision trail: one record at a time ──────────────────── */}
        <section className="cn-section cn-band cn-decisions" id="decisions" aria-labelledby="cn-dec-h">
          <div className="container">
            <div className="cn-head">
              <h2 id="cn-dec-h">What I decided, and against what</h2>
            </div>
            <div className="cn-record-wrap">
              <div className="cn-picker" role="tablist" aria-label="Published decision records">
                {DECISIONS.map((d, i) => (
                  <button
                    key={d.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`cn-tab-${d.id}`}
                    aria-selected={i === active}
                    aria-controls={`cn-rec-${d.id}`}
                    title={d.title}
                    tabIndex={i === active ? 0 : -1}
                    className="cn-ver"
                    onClick={() => select(i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                  >
                    {d.id}
                    <span className="visually-hidden">: {d.title}</span>
                  </button>
                ))}
              </div>
              {DECISIONS.map((d, i) => (
                <Record
                  key={d.id}
                  d={d}
                  hidden={i !== active}
                  open={openId === d.id}
                  onToggle={(o) => setOpenId((cur) => (o ? d.id : cur === d.id ? null : cur))}
                  summaryRef={(el) => {
                    summaries.current[d.id] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── The miss: one reading with no rejected option ─────────────── */}
        <section className="cn-section cn-miss" id="miss" aria-labelledby="cn-miss-h">
          <div className="container cn-split cn-split--4-8">
            <div className="cn-split__text">
              <h2 id="cn-miss-h">What I missed, and what is still open</h2>
            </div>
            <article className="cn-record cn-record--miss" aria-labelledby="cn-miss-h">
              <dl className="cn-reading__rows">
                <div className="cn-row cn-row--now">
                  <dt>Still exposed</dt>
                  <dd className="cn-miss__open">{THE_MISS.stillExposed}</dd>
                </div>
                <div className="cn-row cn-row--sign">
                  <dt>Signed by</dt>
                  <dd className="cn-person">{SIGNER}</dd>
                </div>
              </dl>
              <details className="cn-more">
                <summary>What it was meant to catch, and why it did not</summary>
                <dl className="cn-more__list">
                  {(
                    [
                      ["Meant to catch", THE_MISS.supposedToCatch],
                      ["Why it did not", THE_MISS.whyItDidnt],
                      ["How I found it", THE_MISS.howFound],
                      ["Blast radius", THE_MISS.blastRadius],
                      ["What I fixed", THE_MISS.structuralFix],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </article>
          </div>
        </section>

        {/* ── The work ──────────────────────────────────────────────────── */}
        <section className="cn-section cn-work" id="work" aria-labelledby="cn-work-h">
          <div className="container cn-split cn-split--4-8">
            <div className="cn-split__text">
              <h2 id="cn-work-h">What I built, with its limits</h2>
            </div>
            <ul className="cn-panels cn-work__rows">
              {WORK.map((p) => (
                <li className="cn-work__row" key={p.id}>
                  <div className="cn-work__name">
                    <h3>{p.shortName ?? p.name}</h3>
                    <p className={`cn-status cn-status--${p.status}`}>{STATUS_TEXT[p.status]}</p>
                  </div>
                  <div className="cn-work__what">
                    {p.stat && !p.prose.short.includes(p.stat.value) ? (
                      <p className="cn-work__reading">
                        <span className="cn-mid">{p.stat.value}</span>
                        <span className="cn-meter__unit">{p.statLabel ?? p.stat.label}</span>
                      </p>
                    ) : null}
                    <p className="cn-work__short">{p.prose.short}</p>
                    {p.caveat ? <p className="cn-work__caveat">{p.caveat}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Career, as a trail ────────────────────────────────────────── */}
        <section className="cn-section cn-career" id="career" aria-labelledby="cn-career-h">
          <div className="container cn-split cn-split--4-8">
            <div className="cn-split__text">
              <h2 id="cn-career-h">Where I have worked, newest first</h2>
            </div>
            <ol className="cn-trail">
              {CAREER.map((r) => (
                <li className="cn-trail__entry" key={r.id}>
                  <p className="cn-time">{period(r.period)}</p>
                  <div className="cn-trail__body">
                    <h3>{r.title}</h3>
                    <p className="cn-trail__org">{r.org}</p>
                    <p className="cn-trail__note">{r.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section className="cn-section cn-band cn-contact" id="contact" aria-labelledby="cn-contact-h">
          <div className="container cn-split cn-split--5-7">
            <div className="cn-split__text">
              <h2 id="cn-contact-h">Write to me</h2>
              <p className="lead">{AVAILABILITY}.</p>
            </div>
            <div className="cn-panels cn-contact__panels">
              <dl className="cn-contact__list">
                {CONTACT.map((c) => (
                  <div className="cn-contact__row" key={c.k}>
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
              <AskAI className="cn-ask" />
            </div>
          </div>
        </section>

        <SrSummary />
      </main>

      <footer className="cn-footer">
        <div className="container cn-footer__in">
          <p className="cn-footer__name">{IDENTITY.name}</p>
          <p className="cn-footer__line">Set in Host Grotesk and Atkinson Hyperlegible Mono.</p>
          <a className="cn-footer__top" href={`#${MAIN_ID}`}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}

/** One published decision as a reading: the problem, the rejected option
 *  struck above the decided one, the signature, and the rest behind a
 *  controlled disclosure so the hero's link can open it. */
function Record({
  d,
  hidden,
  open,
  onToggle,
  summaryRef,
}: {
  d: Decision;
  hidden: boolean;
  open: boolean;
  onToggle: (open: boolean) => void;
  summaryRef: (el: HTMLElement | null) => void;
}) {
  const more: Array<[string, string | undefined]> = [
    ["Why it was tempting", d.whyTempting],
    ["What it cost", d.cost],
    ["Where it stops", d.limitation],
    ["What happened", d.outcome],
    ["What I would do first next time", d.wouldRedo],
  ];
  return (
    <article
      className="cn-record"
      role="tabpanel"
      id={`cn-rec-${d.id}`}
      aria-labelledby={`cn-tab-${d.id}`}
      hidden={hidden}
      tabIndex={0}
    >
      <div className="cn-record__head">
        <h3>{d.title}</h3>
        <p className="cn-record__problem">{d.problem}</p>
      </div>
      <dl className="cn-reading__rows">
        <div className="cn-row cn-row--was">
          <dt>Rejected</dt>
          <dd>
            <s className="cn-struck">{d.rejected}</s>
          </dd>
        </div>
        <div className="cn-row cn-row--now">
          <dt>Decided</dt>
          <dd className="cn-measured">{d.decided}</dd>
        </div>
        <div className="cn-row cn-row--sign">
          <dt>Signed by</dt>
          <dd className="cn-person">{SIGNER}</dd>
        </div>
      </dl>
      <details className="cn-more" open={open} onToggle={(e) => onToggle(e.currentTarget.open)}>
        <summary ref={summaryRef}>What it cost<span className="visually-hidden">: {d.title}</span></summary>
        <dl className="cn-more__list">
          {more
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          {d.quote ? (
            <div>
              <dt>As I wrote it</dt>
              <dd>
                <q className="cn-quote">{d.quote.text}</q>
              </dd>
            </div>
          ) : null}
        </dl>
      </details>
    </article>
  );
}

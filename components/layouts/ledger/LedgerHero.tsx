"use client";

import { useEffect, useRef, useState } from "react";
import type { Theme } from "@/lib/themes";
import { motion, useReducedMotion } from "motion/react";
import {
  IDENTITY, CONTACT, EMAIL_HREF, DECISIONS, THE_MISS, BOUNDARIES,
  type Decision,
} from "@/lib/profile";
import { STATS } from "@/lib/stats";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   LEDGER
   Decisions rendered so the rejected option carries the same weight as the taken
   one, argued in its own favour, with the price printed underneath.

   THE CONSTRAINT THAT PRODUCES THE LAYOUT, stated because it has to survive a
   context reset. `Decision.whyTempting` holds an argument in favour of the
   option that LOST. There is nowhere to put that in a single-column record
   without subordinating it, and subordinating it contradicts the field. Two
   panels of identical size is the only honest rendering of that schema. The
   layout is therefore derived from the data, not chosen, which is why it should
   regenerate the same way if this file is ever rewritten from scratch.

   WHAT THE COUNCIL CHANGED, round 1 (CLX), and why each change is structural:

   1. THE FIRST RECORD IS BLIND BY DEFAULT. It was a toggle. A toggle defaults
      off, PRODUCT.md's reader has ninety seconds, and a signature behind a
      control nobody flips is available rather than operated. Ship it blind and
      the mechanic is in the path of every stranger. DWELL_REVEAL_MS releases it
      for anyone who scrolls past without engaging, so nothing is ever withheld.

   2. ALL THIRTEEN RECORDS RENDER IN ID ORDER, held ones in position. Publishing
      the eight cleared records in sequence and collecting the five held ones
      into their own section makes a numbered list, which is a named tell. In id
      order the gaps at 2, 6, 7, 8 and 9 become visible geometry, and that
      geometry is a fact about one employer's sanitization policy that does not
      survive swapping in a different person's career. It is the cheapest fix
      available to the swap test, which CLX failed outright.

   3. NO STICKY RAIL. The rail was the concept's own answer to "make the ratio
      visible", but a sticky rail beside one measure is a property of the
      default this theme actually lands in (see below), and it carried a second
      balance bar that diluted the one element the theme is named for. Change 2
      makes the ratio visible without it.

   THE DEFAULT THIS THEME LANDS IN. Not near-black plus a bright accent, and not
   warm cream plus a serif. CLX named a fourth default that no published list
   carries: light cool ground, large tight grotesk, mono metadata labels, sticky
   rail, one measure, near-zero chrome, ONE restrained accent. That is the house
   style of developer tooling in 2026 and it is invisible from inside. Three
   escape rules against the broadsheet default are also properties of this one,
   so they escape nothing. The two rules that actually cut against it are
   enforced in styles.css and are countable rather than intended:

     - TWO accents of matched luminance, used with equal frequency. The default
       always has one accent over a neutral. Ours are 8.1% apart in luminance
       and neither may be tuned brighter, because the argument is that neither
       branch is louder.
     - ZERO borders and ZERO box-shadows except where WCAG 1.4.11 requires a 3:1
       boundary on an interactive control. Surfaces are raised by ground value
       alone. The default raises cards with a hairline plus a soft shadow.

   ONE ANIMATION, and it is derived rather than stylistic. The balance bar tips.
   Nothing else moves. If the branch panels animated, resized or recoloured, the
   equal-weight claim would become false at the moment of interaction, so the
   prohibition is load-bearing. No GSAP in this theme at all; motion/react owns
   the single transform, which keeps CLAUDE.md 3.3 trivially true.
───────────────────────────────────────────────────────────────────────────── */

/** Releases the blind record for a reader who never engages. Long enough to be
 *  a real read, short enough that nobody is stuck. */
const DWELL_REVEAL_MS = 9000;

const published = DECISIONS.filter((d) => d.published).length;

function Quote({ d }: { d: Decision }) {
  if (!d.quote) return null;
  return (
    <figure className="dl-quote">
      <blockquote>{d.quote.text}</blockquote>
      {/* The fidelity is shown, not hidden. A trimmed quote is trimmed by
          subtraction only, and a reader is entitled to know which. */}
      <figcaption>his words, {d.quote.fidelity}</figcaption>
    </figure>
  );
}

function Aftermath({ d }: { d: Decision }) {
  /* Deliberately NOT always three blocks. Two records carry outcome and
     wouldRedo and most do not, so the count varies between three and five. CLX
     flagged a fixed three-up as the rule-of-three tell wearing a label; the fix
     is to let the real variance show rather than normalising it. */
  const rows: Array<[string, string | undefined]> = [
    ["why the other one was right", d.whyTempting],
    ["what it cost", d.cost],
    ["what it still cannot do", d.limitation],
    ["what actually happened", d.outcome],
    ["what he would do differently", d.wouldRedo],
  ];
  return (
    <div className="dl-after">
      {rows.filter(([, v]) => v).map(([k, v]) => (
        <div className="dl-after-row" key={k}>
          {/* Lowercase mono, not all-caps. All-caps metadata labels are a named
              tell, and the theme had granted itself a carve-out for them. */}
          <p className="dl-after-k">{k}</p>
          <p className="dl-after-v">{v}</p>
        </div>
      ))}
    </div>
  );
}

function Branch({
  side, text, label, blind, onPick, picked,
}: {
  side: "taken" | "alt";
  text: string;
  label: string;
  blind: boolean;
  onPick?: () => void;
  picked: boolean;
}) {
  /* Stays a <button> after the reveal rather than becoming a <div>. Swapping the
     element type would drop focus at exactly the moment a keyboard reader has
     just committed. aria-disabled keeps it focusable and announces that it no
     longer does anything. */
  return (
    <button
      type="button"
      className={`dl-branch dl-branch--${side}${picked ? " is-picked" : ""}`}
      onClick={blind ? onPick : undefined}
      aria-disabled={!blind}
      aria-label={blind ? `Choose this branch: ${text}` : undefined}
    >
      <span className="dl-branch-text">{text}</span>
      <span className={`dl-branch-label dl-branch-label--${blind ? "blind" : side}`}>
        {blind ? "which would you have taken?" : label}
      </span>
    </button>
  );
}

function Record({
  d, blind, onPick, pick,
}: {
  d: Decision;
  blind: boolean;
  onPick?: (side: "taken" | "alt") => void;
  pick?: "taken" | "alt" | null;
}) {
  const reduced = useReducedMotion();

  if (!d.published) {
    return (
      <article className="dl-rec dl-rec--held" aria-labelledby={`${d.id}-t`}>
        <p className="dl-rec-id">{d.id.replace("d-", "")}</p>
        <h3 className="dl-rec-title" id={`${d.id}-t`}>{d.title}</h3>
        <p className="dl-rec-problem">{d.problem}</p>
        {/* Marking the absence rather than filling it. The record exists and is
            withheld for a stated reason, which is itself a judgment signal. */}
        <p className="dl-held">held. the detail is an interview.</p>
      </article>
    );
  }

  /* The bar rests at 50/50 and moves to 58/42 toward the branch you picked.
     scaleX on a left-anchored half rather than a width change: width is a layout
     property and would reflow the record on every tick, and scaleX is the single
     transform this page is allowed. 1.16 of 50% is 58%. */
  const scale = pick ? (pick === "taken" ? 1.16 : 0.84) : 1;

  return (
    <article className="dl-rec" aria-labelledby={`${d.id}-t`}>
      <p className="dl-rec-id">{d.id.replace("d-", "")}</p>
      <h3 className="dl-rec-title" id={`${d.id}-t`}>{d.title}</h3>
      <p className="dl-rec-problem">{d.problem}</p>

      <div className="dl-fork">
        <Branch side="taken" text={d.decided ?? ""} label="he took this"
                blind={blind} picked={pick === "taken"}
                onPick={onPick ? () => onPick("taken") : undefined} />
        <Branch side="alt" text={d.rejected ?? ""} label="he did not"
                blind={blind} picked={pick === "alt"}
                onPick={onPick ? () => onPick("alt") : undefined} />
      </div>

      <div className="dl-bar" aria-hidden="true">
        <motion.span
          className="dl-bar-fill"
          animate={{ scaleX: scale }}
          transition={reduced ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <Aftermath d={d} />
      <Quote d={d} />

      {/* Attached by SOURCE, not by position. It was on index 0, which is the
          experiment-snapshot record and has nothing to do with the benchmark;
          reordering the ledger would have moved it again. */}
      {d.source === "ITEM-5" && (
        <p className="dl-rec-foot">
          {STATS.goatFindings.value} ground-truth findings across 11 synthetic fixtures,
          one of them clean. Counts, not a score.
        </p>
      )}
    </article>
  );
}

export default function LedgerHero({ theme }: { theme: Theme }) {
  void theme;
  const [blind, setBlind] = useState(true);
  const [pick, setPick] = useState<"taken" | "alt" | null>(null);
  const timer = useRef<number | null>(null);

  /* A reader who never engages must not be left with a record whose answer is
     missing. Wall-clock, cleared on unmount, and cleared the moment they pick. */
  useEffect(() => {
    timer.current = window.setTimeout(() => setBlind(false), DWELL_REVEAL_MS);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, []);

  const onPick = (side: "taken" | "alt") => {
    setPick(side);
    setBlind(false);
    if (timer.current) window.clearTimeout(timer.current);
  };

  const first = DECISIONS[0];

  return (
    <div className="dl-root">
      <a href="#dl-main" className="dl-skip">Skip to main content</a>

      <main id="dl-main" tabIndex={-1} className="dl-main">
        <header className="dl-head">
          <p className="dl-eyebrow">{IDENTITY.eyebrow}</p>
          <h1 className="dl-name">Koushik<br />Kotamraju</h1>
          <p className="dl-bio">{IDENTITY.bio.medium}</p>
          <div className="dl-cta">
            <a className="dl-btn dl-btn--fill" href={EMAIL_HREF}>Email me</a>
            <a className="dl-btn dl-btn--ghost" href="/resume/">Résumé</a>
          </div>
        </header>

        <section className="dl-ledger" aria-labelledby="dl-ledger-h">
          <h2 className="dl-h2" id="dl-ledger-h">The ledger</h2>
          <p className="dl-lede">
            {DECISIONS.length + 1} decisions. {published + 1} are published in full. The rest
            are held: the record exists, the detail is an interview. Each one shows what he
            rejected, argued in its own favour, and what the choice cost.
          </p>

          {DECISIONS.map((d, i) => (
            <Record
              key={d.id}
              d={d}
              blind={i === 0 && blind}
              pick={i === 0 ? pick : null}
              onPick={i === 0 && d.id === first.id ? onPick : undefined}
            />
          ))}

          {/* The miss. Its own shape, because it is not a choice between two
              options and forcing it into the fork would mean inventing a
              rejected alternative that never existed. */}
          <article className="dl-rec dl-rec--miss" aria-labelledby="dl-miss-t">
            <p className="dl-rec-id">13</p>
            <h3 className="dl-rec-title" id="dl-miss-t">The detection ran. Its output never arrived.</h3>
            <div className="dl-after">
              {([
                ["what it was supposed to catch", THE_MISS.supposedToCatch],
                ["why it did not", THE_MISS.whyItDidnt],
                ["how it was found", THE_MISS.howFound],
                ["what it cost", THE_MISS.blastRadius],
                ["what changed", THE_MISS.structuralFix],
                ["what is still exposed", THE_MISS.stillExposed],
              ] as const).map(([k, v]) => (
                <div className="dl-after-row" key={k}>
                  <p className="dl-after-k">{k}</p>
                  <p className="dl-after-v">{v}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="dl-not" aria-labelledby="dl-not-h">
          <h2 className="dl-h2" id="dl-not-h">What he is not</h2>
          {BOUNDARIES.map((b) => (
            <p className="dl-not-p" key={b.id}>{b.text}</p>
          ))}
        </section>

        <footer className="dl-foot">
          <ul className="dl-contact">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <span className="dl-contact-k">{c.k}</span>
                <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
                  {c.v}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </main>
    </div>
  );
}

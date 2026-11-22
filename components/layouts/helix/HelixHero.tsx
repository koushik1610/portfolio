"use client";

import "./styles.css";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  IDENTITY,
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
import { STATUS_LABEL, periodParts } from "@/components/layouts/_shared/format";
import {
  REST, AMPLITUDE, WAVE_STEP, PHONE_AMPLITUDE, PHONE_WAVE_STEP, TURN_IMPULSE,
  coast, moving, impulse, scrollImpulse, stillTurn, dragTurn, drag, restAngle, type Spin,
} from "./physics";

/* Helix: a ribbon of tiles twists across the top of the hero, over the name set
   in Oswald capitals across the full width. The ribbon is decoration and is
   aria-hidden and carries only crops of the portrait; the projects are listed,
   with their state, in the work section (council round 2 found project labels on
   turning tiles unreadable, so the ribbon carries no text). The tiles sit on a
   travelling wave, each turned at most 50 degrees from facing the viewer, so the band
   never pinches to an edge-on sliver. A CSS animation moves the wave; dragging,
   scrolling or the Turn button adds phase through one custom property, never React
   state. Pause stops all of it. */


/* The tiles' photograph: PORTRAITS.photo (/profile.jpeg) printed once to black and
   white at build time (grey, contrast 1.35, brightness 1.06), so no tile runs a CSS
   filter and the whole ribbon makes one 23 KB request. */
const RIBBON_PHOTO = "/helix-photo-bw.webp";

/* CROPS: where each photograph tile looks into the portrait (724 x 1086).
   Each entry is [x, y, zoom]: x and y are the CSS background-position in percent
   (0 is the left or top edge of the photo, 100 the right or bottom), zoom is the
   background-size as a percent of the tile's width. A tile is about 3.7 times as
   tall as it is wide, so it sees 1/zoom of the photo's width and about
   3.7 / (1.5 x zoom) of its height. The head spans roughly x 36 to 72 and
   y 31 to 65, so the non-face crops either sit in a side column (x 0 or 100 at
   zoom 340 or more, a window under 30% wide) or at the very top at zoom 700 or more
   (a window under a third of the height): leaves, the top of the hair, the shirt's
   edge against the leaves. */
type Crop = readonly [x: number, y: number, zoom: number];
const FACE_CROPS: ReadonlyArray<Crop> = [
  [50, 47, 280], // the whole face
  [49, 50, 330], // the face, a step closer
  [51, 46, 300], // the face and hair
];
const PLAIN_CROPS: ReadonlyArray<Crop> = [
  [0, 10, 340], [52, 0, 720], [100, 50, 420], [10, 85, 420], [0, 90, 360],
  [100, 10, 380], [100, 85, 420], [0, 50, 400], [100, 92, 380], [5, 70, 500],
  [15, 0, 700],
];
/* The tile run: the plain crops, then the first seven again, with a face crop after
   the 4th, 11th and 18th: 21 tiles, the face on three of them, spread along the
   ribbon. Built as a pure expression; the stage reads the count from TILES.length. */
const FACE_EVERY = 7;
const FACE_FROM = 3;
const TILES: ReadonlyArray<Crop> = [...PLAIN_CROPS, ...PLAIN_CROPS.slice(0, 7)].flatMap((crop, n) => {
  const k = (n - FACE_FROM) / FACE_EVERY;
  return Number.isInteger(k) && k >= 0 && k < FACE_CROPS.length ? [crop, FACE_CROPS[k]] : [crop];
});

/* Each tile's crop, its index, and its resting facing angle (the static pose for
   browsers without CSS sin(); the live wave is computed in CSS from --i). */
const cropStyle = (c: Crop, i: number) =>
  ({ "--i": i, "--hx-a0": `${restAngle(i).toFixed(2)}deg`, "--cx": `${c[0]}%`, "--cy": `${c[1]}%`, "--cz": `${c[2]}%` }) as CSSProperties;

const BASELINE = projectById("baseline");
const FIGURES = [STATS.awsDetectionScope, STATS.signatures];
const DECISION = decisionById("d-05");
const NAME_WORDS = IDENTITY.name.split(" ");

/* Phones show the first PHONE_TILES tiles, set larger. The one place this count lives:
   the stage reads it as --hx-phone-count and each tile past it is marked. */
const PHONE_TILES = 7;

/* The stage's inline custom properties: the tile counts and the wave, from the same
   constants the physics uses, so CSS and JS share one source. */
const STAGE_STYLE = {
  "--hx-tiles": TILES.length,
  "--hx-phone-count": Math.min(PHONE_TILES, TILES.length),
  "--hx-amp": `${AMPLITUDE}deg`,
  "--hx-wave": `${WAVE_STEP}deg`,
  "--hx-amp-phone": `${PHONE_AMPLITUDE}deg`,
  "--hx-wave-phone": `${PHONE_WAVE_STEP}deg`,
} as CSSProperties;

/* The DOM side of the ribbon. The physics is pure, in ./physics.ts; this wires it to
   the pointer, the scroll, the Turn and Pause buttons and the reduced-motion setting,
   and writes one custom property (--hx-boost, a phase in degrees) per frame. */
function useRibbon(paused: boolean) {
  const stageRef = useRef<HTMLDivElement>(null);
  const kick = useRef<(deg: number) => void>(() => {});
  const pausedRef = useRef(paused);
  const halt = useRef<() => void>(() => {});

  /* Pause holds everything: the CSS wave (data-paused) and any coasting boost (halt). */
  useEffect(() => {
    pausedRef.current = paused;
    if (paused) halt.current();
  }, [paused]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let still = query.matches;
    let spin: Spin = REST;
    let raf = 0;
    let last = 0;
    let visible = true;
    let held: { id: number; x: number; y: number; t: number } | null = null;

    const write = () => stage.style.setProperty("--hx-boost", `${spin.phase.toFixed(2)}deg`);
    const blocked = () => !visible || document.hidden || still || pausedRef.current;

    const frame = (t: number) => {
      /* The first frame after a start only sets the clock; motion begins on the next. */
      spin = coast(spin, last ? (t - last) / 1000 : 0);
      last = t;
      write();
      if (moving(spin) && !blocked()) raf = requestAnimationFrame(frame);
      else { spin = { ...spin, vel: 0 }; raf = 0; }
    };
    const run = () => {
      if (raf || blocked()) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; spin = { ...spin, vel: 0 }; };
    halt.current = stop;

    const endDrag = () => {
      if (held && stage.hasPointerCapture(held.id)) stage.releasePointerCapture(held.id);
      held = null;
      stage.classList.remove("is-dragging");
    };

    /* Reduced motion can turn on mid-drag: the drag ends and nothing coasts. */
    const onMotionPref = () => {
      still = query.matches;
      if (still) { endDrag(); stop(); }
    };

    kick.current = (deg: number) => {
      if (pausedRef.current) return;
      if (still) { spin = stillTurn(spin, deg); write(); return; }
      spin = impulse(spin, deg);
      run();
    };

    const onDown = (e: PointerEvent) => {
      if (pausedRef.current) return;
      held = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("is-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!held || e.pointerId !== held.id || pausedRef.current) return;
      const now = performance.now();
      spin = drag(spin, dragTurn(e.clientX - held.x, e.clientY - held.y), (now - held.t) / 1000, still);
      held = { ...held, x: e.clientX, y: e.clientY, t: now };
      write();
    };
    const onUp = (e: PointerEvent) => {
      if (!held || e.pointerId !== held.id) return;
      endDrag();
      run();
    };

    let lastY = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!dy || blocked()) return;
      spin = impulse(spin, scrollImpulse(dy));
      run();
    };

    /* Off screen the CSS wave pauses (class) and any coasting stops. */
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      stage.classList.toggle("is-offscreen", !visible);
      if (!visible) stop();
    });
    io.observe(stage);
    const onVis = () => { if (document.hidden) stop(); };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    query.addEventListener("change", onMotionPref);

    return () => {
      stop();
      endDrag();
      io.disconnect();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      query.removeEventListener("change", onMotionPref);
      kick.current = () => {};
      halt.current = () => {};
    };
  }, []);

  return { stageRef, kick };
}

export default function HelixHero() {
  const [paused, setPaused] = useState(false);
  const { stageRef, kick } = useRibbon(paused);
  const photo = { "--hx-photo": `url(${RIBBON_PHOTO})` } as CSSProperties;

  return (
    <div className="hx-root" style={photo}>
      <SkipLink targetId="helix-main" />

      <header className="hx-nav">
        <div className="container hx-nav__in">
          <a className="hx-wordmark" href="#helix-main">KK</a>
          <nav className="hx-nav__links" aria-label="Sections">
            <a href="#hx-work">Work</a>
            <a href="#hx-decision">Decision</a>
            <a href="#hx-career">Career</a>
            <a href="#hx-contact">Contact</a>
          </nav>
          <NextThemeButton />
        </div>
      </header>

      <main {...skipTarget("helix-main")} className="hx-main">
        <section className="hx-hero" aria-labelledby="hx-name">
          <div
            ref={stageRef}
            className="hx-stage"
            data-paused={paused ? "true" : undefined}
            style={STAGE_STYLE}
            aria-hidden="true"
          >
            <div className="hx-ribbon">
              {TILES.map((crop, i) => (
                <div key={i} className="hx-tile" style={cropStyle(crop, i)} data-phone-hidden={i >= PHONE_TILES ? "" : undefined} />
              ))}
            </div>
          </div>

          <div className="container hx-hero__text">
            <h1 id="hx-name" className="hx-name">
              {NAME_WORDS.map((w, i) => (
                <span key={w}>{i > 0 ? " " : ""}{w}</span>
              ))}
            </h1>
            <div className="hx-hero__row">
              <div className="hx-hero__who">
                <p className="lead">{IDENTITY.lede}</p>
                <CtaRow />
              </div>
              <div className="hx-controls">
                <button type="button" className="hx-ctl" disabled={paused} onClick={() => kick.current(TURN_IMPULSE)}>
                  Turn the ribbon
                </button>
                <button type="button" className="hx-ctl hx-ctl--pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
                  Pause the ribbon
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="hx-statement" aria-label="How I work">
          <div className="container hx-statement__in">
            <p className="hx-statement__line">{IDENTITY.method}</p>
            <p className="hx-statement__side">
              <span className="hx-statement__fig num">{STATS.experience.value}</span> {STATS.experience.label}. {STATS.experience.context}
            </p>
          </div>
        </section>

        <section className="hx-own" aria-labelledby="hx-own-h">
          <div className="container">
            <div className="hx-own__head">
              <h2 id="hx-own-h">{BASELINE.name}</h2>
              <p className="lead">{BASELINE.prose.short}</p>
            </div>
            <dl className="hx-figures">
              {FIGURES.map((s) => (
                <div className="hx-figure" key={s.label}>
                  <dt className="visually-hidden">{s.label}</dt>
                  <dd className="hx-figure__value num">{s.value}</dd>
                  <dd className="hx-figure__label">{s.label}</dd>
                  <dd className="hx-figure__context">{s.context}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="hx-work" className="hx-work" aria-labelledby="hx-work-h">
          <div className="container">
            <h2 id="hx-work-h">The work, and how far each got</h2>
            <ul className="hx-projects">
              {PROJECTS.map((p) => (
                <li key={p.id} className="hx-project">
                  <h3>{p.name}</h3>
                  <p className={`hx-state is-${p.status}`}>{STATUS_LABEL[p.status]}</p>
                  <div className="hx-project__body">
                    <p>{p.prose.short}</p>
                    {p.caveat ? <p className="hx-project__caveat">{p.caveat}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="hx-decision" className="hx-decision" aria-labelledby="hx-decision-h">
          <div className="container">
            <div className="hx-decision__head">
              <h2 id="hx-decision-h">{DECISION.title}</h2>
              <p className="hx-decision__problem">{DECISION.problem}</p>
            </div>
            <div className="hx-plates">
              <div className="hx-plate">
                <h3>Decided</h3>
                <p>{DECISION.decided}</p>
              </div>
              <div className="hx-plate hx-plate--rejected">
                <h3>Rejected</h3>
                <p>{DECISION.rejected}</p>
              </div>
            </div>
            <details className="hx-more">
              <summary>Why it was tempting, what it costs, where it stops</summary>
              <dl className="hx-more__list">
                {DECISION.whyTempting ? <div><dt>Why it was tempting</dt><dd>{DECISION.whyTempting}</dd></div> : null}
                {DECISION.cost ? <div><dt>Cost</dt><dd>{DECISION.cost}</dd></div> : null}
                {DECISION.limitation ? <div><dt>Limitation</dt><dd>{DECISION.limitation}</dd></div> : null}
              </dl>
            </details>
          </div>
        </section>

        <section id="hx-career" className="hx-career" aria-labelledby="hx-career-h">
          <div className="container hx-career__in">
            <h2 id="hx-career-h">Where I have worked</h2>
            <ol className="hx-roles">
              {CAREER.map((r) => {
                const s = periodParts(r.period);
                return (
                  <li key={r.id} className="hx-role">
                    <p className="hx-role__when num">
                      <span>{s.from}</span>
                      <span>{s.to}</span>
                    </p>
                    <h3>{r.title}</h3>
                    <p className="hx-role__org">{r.org}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section id="hx-contact" className="hx-contact" aria-labelledby="hx-contact-h">
          <div className="container hx-contact__in">
            <div className="hx-contact__main">
              <h2 id="hx-contact-h">Write to me</h2>
              <p className="lead">{AVAILABILITY}.</p>
              <CtaRow />
              <ul className="hx-links">
                {CONTACT.map((c) => (
                  <li key={c.k}>
                    <span className="hx-links__k">{c.k}</span>
                    <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {c.v}
                      {c.ext ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                    </a>
                    {c.k === "Email" ? <CopyEmail /> : null}
                  </li>
                ))}
              </ul>
            </div>
            <AskAI className="hx-ask" headingLevel={2} />
          </div>
        </section>

        <SrSummary />
      </main>

      <footer className="hx-footer">
        <div className="container hx-footer__in">
          <p className="hx-footer__mark">{IDENTITY.name}</p>
          <p>{CONTENT_REVISION.label}. The photographs in the ribbon are crops of one portrait.</p>
        </div>
      </footer>
    </div>
  );
}

/* The ribbon's spin physics, as pure functions with no DOM.

   The ribbon is a travelling wave: tile i faces the viewer at
   AMPLITUDE x sin(i x WAVE_STEP + phase). A CSS animation moves the phase slowly;
   on top of it the page adds a "boost" phase, in degrees, from a drag, a scroll or
   the Turn button. This file owns that boost: its speed, how it coasts down, and the
   limits. HelixHero.tsx calls these from requestAnimationFrame and pointer handlers
   and writes the result to one CSS custom property. */

/** Largest turn of a tile away from facing the viewer, in degrees. Under 90, so no
 *  tile is ever seen edge-on or from behind; cos(50deg) keeps 64% of its height. */
export const AMPLITUDE = 50;
/** Phase difference between neighbouring tiles, in degrees: a wave every 15 tiles. */
export const WAVE_STEP = 24;
/** On phones, where fewer and larger tiles ride: a gentler turn and a longer wave. */
export const PHONE_AMPLITUDE = 32;
export const PHONE_WAVE_STEP = 30;
/** What one press of the Turn button adds to the boost speed, in degrees per second. */
export const TURN_IMPULSE = 540;
/** Share of the boost speed left after one second of coasting. */
export const DECAY_PER_SECOND = 0.18;
/** Boost speed added per pixel scrolled, in degrees per second. */
export const SCROLL_GAIN = 2.2;
/** The fastest the boost may run, in degrees per second. */
export const MAX_SPIN = 900;
/** Boost added per pixel dragged, in degrees. */
export const DRAG_GAIN = 0.35;
/** Under this speed, in degrees per second, coasting ends. */
export const STOP_BELOW = 2;
/** Longest frame the integrator accepts, in seconds, so a stalled tab cannot jump. */
export const MAX_FRAME = 0.05;
/** Shortest pointer interval used for a release speed, in seconds. */
export const MIN_DRAG_INTERVAL = 0.008;
/** Weight of the newest pointer sample in the smoothed release speed. */
export const RELEASE_SMOOTHING = 0.4;
/** Under reduced motion a Turn moves the phase by its impulse divided by this, at once. */
export const STILL_STEP = 8;

export interface Spin {
  /** Boost phase, in degrees. */
  phase: number;
  /** Boost speed, in degrees per second. */
  vel: number;
}

export const REST: Spin = { phase: 0, vel: 0 };

export const clampSpeed = (v: number): number => Math.max(-MAX_SPIN, Math.min(MAX_SPIN, v));

/** One frame of coasting. dt is in seconds and is capped at MAX_FRAME. */
export function coast(s: Spin, dt: number): Spin {
  const t = Math.max(0, Math.min(MAX_FRAME, dt));
  return { phase: s.phase + s.vel * t, vel: s.vel * Math.pow(DECAY_PER_SECOND, t) };
}

/** True while the boost still moves enough to keep the frame loop running. */
export const moving = (s: Spin): boolean => Math.abs(s.vel) > STOP_BELOW;

/** A Turn press or a scroll: adds speed, clamped. */
export const impulse = (s: Spin, degPerSecond: number): Spin => ({ phase: s.phase, vel: clampSpeed(s.vel + degPerSecond) });

/** The speed a scroll of dy pixels adds. */
export const scrollImpulse = (dy: number): number => dy * SCROLL_GAIN;

/** A Turn under reduced motion: the phase moves at once, nothing coasts. */
export const stillTurn = (s: Spin, deg: number): Spin => ({ phase: s.phase + deg / STILL_STEP, vel: 0 });

/** How far a pointer move of (dx, dy) pixels turns the ribbon, in degrees.
 *  Right and up both turn it forward. */
export const dragTurn = (dx: number, dy: number): number => (dx - dy) * DRAG_GAIN;

/** Applies a drag step: the phase follows the pointer; with motion allowed the
 *  speed tracks the pointer, smoothed, so a release keeps the throw. */
export function drag(s: Spin, turn: number, seconds: number, still: boolean): Spin {
  const phase = s.phase + turn;
  if (still) return { phase, vel: 0 };
  const sample = turn / Math.max(MIN_DRAG_INTERVAL, seconds);
  return { phase, vel: clampSpeed(s.vel * (1 - RELEASE_SMOOTHING) + sample * RELEASE_SMOOTHING) };
}

/** The resting facing angle of tile i, in degrees, for the static fallback. */
export const restAngle = (i: number): number => AMPLITUDE * Math.sin((i * WAVE_STEP * Math.PI) / 180);

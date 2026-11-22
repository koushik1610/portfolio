/* The depth hero's tilt as a pure state machine: no DOM, no clock, no frames.
   TiltHero.tsx feeds it pointer positions, button presses and the time, and
   writes `now` to the --tilt-x and --tilt-y custom properties each frame.
   Tested by tilt.test.mjs (node --no-warnings components/layouts/depth/tilt.test.mjs). */

export interface Point { x: number; y: number }
export interface Rect { left: number; top: number; width: number; height: number }

export interface Hold {
  /** When the chosen pose stops holding, in the caller's milliseconds. */
  until: number;
  /** Where the pointer was at the press. Null after a keyboard press, until the first move. */
  anchor: Point | null;
}

export interface TiltState {
  /** Where the figure is heading, each axis in -1..1. */
  target: Point;
  /** Where it is now, eased toward the target frame by frame. */
  now: Point;
  /** Index of the last pose the button chose. */
  pose: number;
  hold: Hold | null;
  /** The last pointer position seen over the hero, or null when there is none. */
  last: Point | null;
}

/* The three poses the visible control steps through. The button sits bottom
   left, so the first press turns him away from it, to the right. */
export const POSES: ReadonlyArray<Point> = [
  { x: 1, y: -0.2 },
  { x: -1, y: -0.2 },
  { x: 0, y: 0 },
];

/* A chosen pose holds until the pointer travels this far from the press, or
   until this long has passed, so mouse jitter cannot undo it. */
export const HOLD_DISTANCE = 160;
export const HOLD_MS = 2000;

/** Share of the remaining distance covered each frame. */
export const EASE = 0.1;
/** Below this distance on both axes the figure snaps to the target and stops. */
export const SETTLE = 0.001;

const ORIGIN: Point = { x: 0, y: 0 };
const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/** The resting pose. The first press takes POSES[0], so the index starts one before it. */
export const initial = (): TiltState => ({ target: ORIGIN, now: ORIGIN, pose: POSES.length - 1, hold: null, last: null });

/** A pointer position as a target in -1..1 across the hero's box. */
export const toTarget = (p: Point, r: Rect): Point => ({
  x: clamp(((p.x - r.left) / r.width) * 2 - 1),
  y: clamp(((p.y - r.top) / r.height) * 2 - 1),
});

/** A pointer moved or went down over the hero at time `t`. While a pose holds,
 *  only `last` (and an unset anchor) change; a large move or the timeout ends the hold. */
export const aim = (s: TiltState, p: Point, r: Rect, t: number): TiltState => {
  if (s.hold) {
    const anchor = s.hold.anchor ?? p;
    const far = Math.hypot(p.x - anchor.x, p.y - anchor.y) > HOLD_DISTANCE;
    if (!far && t <= s.hold.until) return { ...s, last: p, hold: { ...s.hold, anchor } };
  }
  return { ...s, last: p, hold: null, target: toTarget(p, r) };
};

/** The pointer left the hero. A mouse returns him to rest unless a pose holds;
 *  any pointer leaving clears `last`, so a later keyboard press anchors afresh. */
export const leave = (s: TiltState, isMouse: boolean): TiltState => {
  if (!isMouse || s.hold) return { ...s, last: null };
  return { ...s, last: null, target: ORIGIN };
};

/** The visible control: the next pose, held from time `t`. */
export const turn = (s: TiltState, t: number): TiltState => {
  const pose = (s.pose + 1) % POSES.length;
  return { ...s, pose, target: POSES[pose], hold: { until: t + HOLD_MS, anchor: s.last } };
};

/** One frame of easing. `settled` says the loop can stop. */
export const step = (s: TiltState): { state: TiltState; settled: boolean } => {
  const x = s.now.x + (s.target.x - s.now.x) * EASE;
  const y = s.now.y + (s.target.y - s.now.y) * EASE;
  const settled = Math.abs(s.target.x - x) <= SETTLE && Math.abs(s.target.y - y) <= SETTLE;
  return { state: { ...s, now: settled ? s.target : { x, y } }, settled };
};

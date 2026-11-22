/* The lanyard's physics: a damped pendulum (the strap) with a sprung badge on its
   clip. Pure functions, no DOM and no imports, so it runs under plain Node.
   Tested by ./physics.test.mjs (run: node --no-warnings components/layouts/badge/physics.test.mjs). */

/** Angles in radians, angular velocities in rad/s, accelerations in rad/s². */
export interface SwingState {
  /** The strap's angle from straight down. Positive is clockwise on screen. */
  theta: number;
  /** The strap's angular velocity. */
  omega: number;
  /** The strap's angular acceleration in the last step. The badge reads it. */
  alpha: number;
  /** The badge's own tilt around its clip, relative to the strap. */
  phi: number;
  /** The badge's angular velocity around its clip. */
  phiV: number;
}

export const REST: SwingState = { theta: 0, omega: 0, alpha: 0, phi: 0, phiV: 0 };

/** Gravity over strap length (g/L), in 1/s². 18 gives a swing period of about 1.5 s. */
export const STRAP_STIFFNESS = 18;
/** Damping on the strap, in 1/s. The swing's envelope falls as e^(-t * STRAP_DAMPING / 2), so
 *  1.6 takes a small hang swing to rest in about 6 s and the hardest throw in about 9 s. */
export const STRAP_DAMPING = 1.6;
/** Spring of the badge on its clip, in 1/s². Stiff, so the badge only trails a little. */
export const CLIP_STIFFNESS = 90;
/** Damping of the badge on its clip, in 1/s. Close to critical, so it does not wobble. */
export const CLIP_DAMPING = 9;
/** How much of the strap's angular acceleration pushes the badge the other way (unitless, 0 to 1). */
export const CLIP_INERTIA = 0.8;
/** The badge never tilts on its clip past this, in rad (about 20 degrees). */
export const CLIP_LIMIT = 0.35;
/** A drag never swings the strap past this, in rad (about 57 degrees). */
export const MAX_SWING = 1.0;
/** One arrow key adds this much angular velocity, in rad/s. */
export const KEY_NUDGE = 1.4;
/** A release never throws faster than this, in rad/s. */
export const MAX_THROW = 8;
/** The integrator's longest sub-step, in s (240 Hz). */
export const SUB_STEP = 1 / 240;

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** One integration step of dt seconds (semi-implicit Euler). With `held`, the strap
 *  follows the pointer instead of gravity, and only the badge on its clip moves. */
export function step(s: SwingState, dt: number, held = false): SwingState {
  let { theta, omega, alpha } = s;
  if (!held) {
    alpha = -STRAP_STIFFNESS * Math.sin(theta) - STRAP_DAMPING * omega;
    omega += alpha * dt;
    theta += omega * dt;
  }
  const phiA = -CLIP_STIFFNESS * s.phi - CLIP_DAMPING * s.phiV - CLIP_INERTIA * alpha;
  const phiV = s.phiV + phiA * dt;
  const phi = clamp(s.phi + phiV * dt, -CLIP_LIMIT, CLIP_LIMIT);
  return { theta, omega, alpha, phi, phiV };
}

/** Advances by dt seconds in sub-steps no longer than SUB_STEP. */
export function advance(s: SwingState, dt: number, held = false): SwingState {
  const n = Math.max(1, Math.ceil(dt / SUB_STEP));
  let next = s;
  for (let i = 0; i < n; i++) next = step(next, dt / n, held);
  return next;
}

/** Rest thresholds: 2e-3 rad is about 0.1 degree, under half a pixel at the badge's clip. */
const REST_ANGLE = 2e-3;
const REST_SPEED = 4e-3;
/** True when nothing visible is still moving. */
export const atRest = (s: SwingState) =>
  Math.abs(s.theta) < REST_ANGLE && Math.abs(s.omega) < REST_SPEED && Math.abs(s.phi) < REST_ANGLE && Math.abs(s.phiV) < REST_SPEED;

/** The strap as an SVG path from the anchor (cx, 0) to the badge's clip, length L px,
 *  bowed sideways a little while it moves. With `lead` > 0 the path starts that many px
 *  back along its own first tangent, above the anchor, so where the anchor is the top
 *  edge of the screen the strap runs on off-screen instead of ending in a cut. */
export function strapPath(s: SwingState, cx: number, L: number, lead = 0): string {
  const sin = Math.sin(s.theta);
  const cos = Math.cos(s.theta);
  const ex = cx - L * sin;
  const ey = L * cos;
  const bend = clamp(-s.omega * 10, -36, 36);
  const qx = (cx + ex) / 2 + cos * bend;
  const qy = ey / 2 + sin * bend;
  const tl = Math.hypot(qx - cx, qy) || 1;
  const sx = cx - ((qx - cx) / tl) * lead;
  const sy = -(qy / tl) * lead;
  const start = lead > 0 ? `M${sx.toFixed(1)} ${sy.toFixed(1)} L${cx.toFixed(1)} 0` : `M${cx.toFixed(1)} 0`;
  return `${start} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

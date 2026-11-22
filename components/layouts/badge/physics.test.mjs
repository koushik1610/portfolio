/* Tests for the badge's pure pendulum physics (./physics.ts). No framework.
   Run from the repo root:
     node --no-warnings components/layouts/badge/physics.test.mjs
   Node 22.18 or later strips the TypeScript types itself (--no-warnings hides its
   note that package.json declares no module type). Exits 1 on a failure. */

import assert from "node:assert/strict";
import { REST, MAX_THROW, advance, atRest, step } from "./physics.ts";

const FRAME = 1 / 60;
let failed = 0;
const test = (name, fn) => {
  try {
    fn();
    console.log(`ok   ${name}`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${name}\n     ${e.message}`);
  }
};

/* Frames until the state is at rest, or Infinity past the limit. */
const settleTime = (s, limitSeconds) => {
  for (let t = 0; t < limitSeconds; t += FRAME) {
    if (atRest(s)) return t;
    s = advance(s, FRAME);
  }
  return Infinity;
};

test("step is deterministic: the same input gives the same output", () => {
  const s = { theta: 0.4, omega: -1.2, alpha: 0, phi: 0.05, phiV: 0.3 };
  assert.deepEqual(step(s, 1 / 240), step(s, 1 / 240));
  assert.deepEqual(advance(s, 0.5), advance(s, 0.5));
});

test("step does not mutate its input", () => {
  const s = { theta: 0.4, omega: -1.2, alpha: 0, phi: 0.05, phiV: 0.3 };
  const copy = { ...s };
  step(s, 1 / 240);
  assert.deepEqual(s, copy);
});

test("rest stays at rest", () => {
  const s = advance(REST, 2);
  for (const [k, v] of Object.entries(s)) assert.ok(v === 0, `${k} moved to ${v}`);
});

test("a release at the fastest throw settles within 10 s", () => {
  const t = settleTime({ ...REST, theta: 1.0, omega: MAX_THROW }, 30);
  assert.ok(t <= 10, `settled after ${t.toFixed(2)} s`);
});

test("a small hang swing settles within 7 s", () => {
  const t = settleTime({ ...REST, omega: 0.9 }, 30);
  assert.ok(t <= 7, `settled after ${t.toFixed(2)} s`);
});

test("the swing loses energy: each peak is lower than the last", () => {
  let s = { ...REST, theta: 0.8 };
  const peaks = [];
  let prev = s.omega;
  for (let i = 0; i < 600; i++) {
    s = advance(s, FRAME);
    if (prev > 0 && s.omega <= 0) peaks.push(Math.abs(s.theta));
    prev = s.omega;
  }
  assert.ok(peaks.length >= 3, `only ${peaks.length} peaks`);
  for (let i = 1; i < peaks.length; i++) assert.ok(peaks[i] < peaks[i - 1], `peak ${i} grew`);
});

test("held: the strap angle does not move, the badge on its clip still settles", () => {
  const s = advance({ ...REST, theta: 0.5, phi: 0.2 }, 3, true);
  assert.equal(s.theta, 0.5);
  assert.ok(Math.abs(s.phi) < 1e-3, `phi ${s.phi}`);
});

if (failed) {
  console.log(`\n${failed} failed`);
  process.exit(1);
}
console.log("\nall passed");

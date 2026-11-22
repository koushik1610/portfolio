/* Tests for the helix ribbon's pure spin physics (./physics.ts). No framework.
   Run from the repo root:
     node --no-warnings components/layouts/helix/physics.test.mjs
   Node 22.18 or later strips the TypeScript types itself. Exits 1 on a failure. */

import assert from "node:assert/strict";
import {
  AMPLITUDE, MAX_SPIN, MAX_FRAME, REST, coast, moving, impulse, scrollImpulse,
  stillTurn, dragTurn, drag, restAngle, clampSpeed,
} from "./physics.ts";

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

test("coast is pure: same input, same output, input untouched", () => {
  const s = { phase: 10, vel: 300 };
  const copy = { ...s };
  assert.deepEqual(coast(s, FRAME), coast(s, FRAME));
  assert.deepEqual(s, copy);
});

test("a throw coasts to a stop within four seconds", () => {
  let s = impulse(REST, 540);
  let t = 0;
  while (moving(s) && t < 10) { s = coast(s, FRAME); t += FRAME; }
  assert.ok(t < 4, `took ${t.toFixed(2)}s`);
  assert.ok(s.phase > 0);
});

test("speed never passes MAX_SPIN, either way", () => {
  assert.equal(impulse(REST, 10 * MAX_SPIN).vel, MAX_SPIN);
  assert.equal(impulse(REST, -10 * MAX_SPIN).vel, -MAX_SPIN);
  assert.equal(clampSpeed(MAX_SPIN + 1), MAX_SPIN);
  assert.ok(Math.abs(drag(REST, 500, 0.001, false).vel) <= MAX_SPIN);
});

test("a stalled frame is capped, so the ribbon cannot jump", () => {
  const s = { phase: 0, vel: MAX_SPIN };
  assert.equal(coast(s, 5).phase, coast(s, MAX_FRAME).phase);
  assert.equal(coast(s, -1).phase, 0);
});

test("reduced motion: a drag moves the phase and leaves no momentum", () => {
  const s = drag({ phase: 0, vel: 400 }, 12, FRAME, true);
  assert.equal(s.phase, 12);
  assert.equal(s.vel, 0);
  assert.deepEqual(stillTurn(REST, 540), { phase: 540 / 8, vel: 0 });
});

test("scrolling down and dragging right both turn forward", () => {
  assert.ok(scrollImpulse(40) > 0);
  assert.ok(dragTurn(10, 0) > 0);
  assert.ok(dragTurn(0, -10) > 0);
});

test("no tile turns edge-on at rest: every facing angle stays under 60 degrees", () => {
  assert.ok(AMPLITUDE < 60);
  for (let i = 0; i < 40; i++) assert.ok(Math.abs(restAngle(i)) <= AMPLITUDE + 1e-9);
});

if (failed) {
  console.log(`\n${failed} failed`);
  process.exit(1);
}
console.log("\nall passed");

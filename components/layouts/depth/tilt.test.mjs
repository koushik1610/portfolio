/* Tests for the depth hero's pure tilt state machine (./tilt.ts). No framework.
   Run from the repo root:
     node --no-warnings components/layouts/depth/tilt.test.mjs
   Node 22.18 or later strips the TypeScript types itself. Exits 1 on a failure. */

import assert from "node:assert/strict";
import { POSES, HOLD_DISTANCE, HOLD_MS, initial, toTarget, aim, leave, turn, step } from "./tilt.ts";

const RECT = { left: 0, top: 0, width: 1000, height: 800 };
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
const settle = (s) => {
  for (let i = 0; i < 500; i++) {
    const r = step(s);
    s = r.state;
    if (r.settled) return s;
  }
  throw new Error("did not settle in 500 frames");
};

test("rest is the origin, with no hold and no pointer", () => {
  const s = initial();
  assert.deepEqual(s.target, { x: 0, y: 0 });
  assert.deepEqual(s.now, { x: 0, y: 0 });
  assert.equal(s.hold, null);
  assert.equal(s.last, null);
});

test("toTarget maps the box to -1..1 and clamps outside it", () => {
  assert.deepEqual(toTarget({ x: 500, y: 400 }, RECT), { x: 0, y: 0 });
  assert.deepEqual(toTarget({ x: 1000, y: 0 }, RECT), { x: 1, y: -1 });
  assert.deepEqual(toTarget({ x: -300, y: 2000 }, RECT), { x: -1, y: 1 });
});

test("functions are pure: the input state is not changed", () => {
  const s = initial();
  const copy = structuredClone(s);
  aim(s, { x: 900, y: 100 }, RECT, 0);
  turn(s, 0);
  leave(s, true);
  step(s);
  assert.deepEqual(s, copy);
});

test("aim sets the target and remembers the pointer", () => {
  const s = aim(initial(), { x: 1000, y: 400 }, RECT, 0);
  assert.deepEqual(s.target, { x: 1, y: 0 });
  assert.deepEqual(s.last, { x: 1000, y: 400 });
});

test("the first press takes POSES[0], then the poses cycle", () => {
  let s = turn(initial(), 0);
  assert.deepEqual(s.target, POSES[0]);
  for (let i = 1; i <= POSES.length; i++) {
    s = turn(s, 0);
    assert.deepEqual(s.target, POSES[i % POSES.length]);
  }
});

test("a pressed pose survives pointer jitter near the press", () => {
  let s = aim(initial(), { x: 100, y: 700 }, RECT, 0);
  s = turn(s, 10);
  const pose = s.target;
  for (let i = 0; i < 20; i++) s = aim(s, { x: 100 + (i % 3) * 5, y: 700 - (i % 2) * 5 }, RECT, 20 + i * 16);
  assert.deepEqual(s.target, pose);
  assert.notEqual(s.hold, null);
});

test("a large move ends the hold and the pointer takes over", () => {
  let s = turn(aim(initial(), { x: 100, y: 700 }, RECT, 0), 0);
  s = aim(s, { x: 100 + HOLD_DISTANCE + 1, y: 700 }, RECT, 50);
  assert.equal(s.hold, null);
  assert.deepEqual(s.target, toTarget({ x: 100 + HOLD_DISTANCE + 1, y: 700 }, RECT));
});

test("the hold times out after HOLD_MS", () => {
  let s = turn(aim(initial(), { x: 100, y: 700 }, RECT, 0), 0);
  s = aim(s, { x: 102, y: 700 }, RECT, HOLD_MS);
  assert.notEqual(s.hold, null);
  s = aim(s, { x: 102, y: 700 }, RECT, HOLD_MS + 1);
  assert.equal(s.hold, null);
});

test("a keyboard press anchors the hold at the first move", () => {
  let s = turn(initial(), 0);
  assert.equal(s.hold.anchor, null);
  s = aim(s, { x: 900, y: 100 }, RECT, 10);
  assert.deepEqual(s.hold.anchor, { x: 900, y: 100 });
  assert.deepEqual(s.target, POSES[0]);
});

test("a mouse leaving returns to rest and clears the pointer", () => {
  let s = aim(initial(), { x: 900, y: 100 }, RECT, 0);
  s = leave(s, true);
  assert.deepEqual(s.target, { x: 0, y: 0 });
  assert.equal(s.last, null);
});

test("leaving during a hold keeps the pose but clears the pointer", () => {
  let s = turn(aim(initial(), { x: 100, y: 700 }, RECT, 0), 0);
  s = leave(s, true);
  assert.deepEqual(s.target, POSES[0]);
  assert.equal(s.last, null);
});

test("a touch leaving keeps the pose", () => {
  let s = aim(initial(), { x: 900, y: 100 }, RECT, 0);
  const target = s.target;
  s = leave(s, false);
  assert.deepEqual(s.target, target);
  assert.equal(s.last, null);
});

test("step eases toward the target and settles exactly on it", () => {
  const s = aim(initial(), { x: 1000, y: 0 }, RECT, 0);
  const one = step(s);
  assert.ok(one.state.now.x > 0 && one.state.now.x < 1);
  assert.equal(one.settled, false);
  assert.deepEqual(settle(s).now, s.target);
});

if (failed) {
  console.log(`\n${failed} failed`);
  process.exit(1);
}
console.log("\nall passed");

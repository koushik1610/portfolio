// Run: node --test components/layouts/deck/behaviours.test.mjs
// Tests the deck's scramble with an injected random source. scramble.ts has no
// imports, so Node's built-in type stripping loads it directly.
import { test } from "node:test";
import assert from "node:assert/strict";
import { scrambleFrame, randomLike, settlesAt } from "./scramble.ts";

/** A small seeded generator (mulberry32), so every run draws the same letters. */
const seeded = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const WORDS = ["Baseline", "ownership,", "IAM", "and", "AI-tooling."];
const fresh = () => WORDS.map((w) => w.split(""));
const lastSettle = Math.max(...WORDS.map((w, i) => settlesAt(i, w.length - 1)));

test("the same seed draws the same frames", () => {
  const a = fresh(), b = fresh();
  const ra = seeded(42), rb = seeded(42);
  for (const t of [0, 55, 110, 165, 220]) {
    scrambleFrame(WORDS, a, t, true, ra);
    scrambleFrame(WORDS, b, t, true, rb);
    assert.deepEqual(a, b);
  }
});

test("the first frame is scrambled, but punctuation and case hold", () => {
  const shown = fresh();
  const settled = scrambleFrame(WORDS, shown, 0, true, seeded(7));
  assert.equal(settled, false);
  assert.notEqual(shown.map((w) => w.join("")).join(" "), WORDS.join(" "));
  WORDS.forEach((w, i) => {
    [...w].forEach((c, j) => {
      if (!/[a-z]/i.test(c)) assert.equal(shown[i][j], c, `"${c}" in ${w} must not scramble`);
      else assert.equal(shown[i][j] === shown[i][j].toUpperCase(), c === c.toUpperCase(), `case of ${w}[${j}]`);
    });
  });
});

test("it settles to the real text", () => {
  const shown = fresh();
  const rng = seeded(3);
  let settled = false;
  for (let t = 0; t <= lastSettle + 55 && !settled; t += 16) settled = scrambleFrame(WORDS, shown, t, true, rng);
  assert.equal(settled, true);
  assert.deepEqual(shown.map((w) => w.join("")), WORDS);
});

test("without a reroll, unsettled letters keep their last draw", () => {
  const shown = fresh();
  scrambleFrame(WORDS, shown, 0, true, seeded(11));
  const before = shown.map((w) => w.join(""));
  scrambleFrame(WORDS, shown, 10, false, () => { throw new Error("rng must not be called"); });
  assert.deepEqual(shown.map((w) => w.join("")), before);
});

test("randomLike keeps case and uses the injected source", () => {
  assert.equal(randomLike("a", () => 0), "a");
  assert.equal(randomLike("Q", () => 0.999), "Z");
});

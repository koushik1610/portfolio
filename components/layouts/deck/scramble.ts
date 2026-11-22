/* The scramble's arithmetic, free of React and the DOM so it can be tested with
   an injected random source. behaviours.ts drives it once per animation frame. */

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

/** Timing, in milliseconds: words start STAGGER apart, after LEAD, one letter
 *  settles every PER_CHAR, and unsettled letters re-roll every STEP. */
export const TIMING = { STAGGER: 45, LEAD: 160, PER_CHAR: 26, STEP: 55 } as const;

/** A letter of the same case as `c`, drawn with `rng` (0 to 1, like Math.random). */
export const randomLike = (c: string, rng: () => number = Math.random): string => {
  const r = LETTERS[Math.floor(rng() * LETTERS.length)];
  return c === c.toUpperCase() ? r.toUpperCase() : r;
};

/** The moment, from the start, at which letter `j` of word `i` settles. */
export const settlesAt = (i: number, j: number): number => i * TIMING.STAGGER + TIMING.LEAD + j * TIMING.PER_CHAR;

/** Advances `shown` (one letter array per word) to `elapsed` ms. Letters past their
 *  settle time take the real letter; punctuation never scrambles; the rest re-roll
 *  only when `reroll` is true. Returns true once every letter has settled. */
export function scrambleFrame(
  finals: ReadonlyArray<string>,
  shown: string[][],
  elapsed: number,
  reroll: boolean,
  rng: () => number = Math.random,
): boolean {
  let settled = true;
  finals.forEach((w, i) => {
    for (let j = 0; j < w.length; j++) {
      const c = w[j];
      if (!/[a-z]/i.test(c) || elapsed >= settlesAt(i, j)) shown[i][j] = c;
      else {
        settled = false;
        if (reroll) shown[i][j] = randomLike(c, rng);
      }
    }
  });
  return settled;
}

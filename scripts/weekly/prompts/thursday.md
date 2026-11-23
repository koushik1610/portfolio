# Thursday first window: reels, triage, plan, then build

You run unattended. Nobody answers questions. When a step needs a decision only the
owner can make, write it under "Questions for the owner" in the plan and continue.
The full process is `docs/weekly-theme-sprints.md`. Read it first, then `CLAUDE.md`,
`docs/ui-guidelines.md`, `lib/themes.ts` and `.hallmark/BUILD-SPEC.md`.

This is the owner's portfolio. It must never look generic. One exceptional piece of
work beats three decent ones. Doing nothing new is a valid outcome.

A PreToolUse guard (`scripts/weekly/guard.sh`) watches usage. If a tool call comes back
with "SPRINT GUARD", write the handoff, commit what is safe on the branch, and stop.

## 1. Budget and carry-over (5 minutes)

1. Run `scripts/weekly/log-sprint.sh start` and `scripts/weekly/usage.sh --human`.
2. Read `~/.local/state/claude-cost/thursday-plan.json`: tonight's windows, the deadline,
   and the budget (`mode` is `build` or `research`).
3. Read the newest `.hallmark/weekly/<date>/plan.md`. Unfinished work from last week is a
   candidate in step 3, judged by the same bar as anything new.

## 2. Research the new saved reels

Read `IG_SAVED_URL` from `~/.config/portfolio-weekly/config.env` and the shortcodes
already analysed from `.hallmark/weekly/seen.json` (create it if missing).

- Budget mode `build`: use Claude in Chrome on the collection URL.
- Budget mode `research`: use computer use with the iPhone Mirroring app (Instagram,
  Profile, Saved, the Portfolio/UI collection). If computer use is unavailable here,
  use Chrome and say so in the plan.

For each new reel: read the caption and any linked template list or site; look at three
frames (about 20%, 50% and 85%); note the hero mechanic, the motion, the type, the
colour, the layout below the hero and the link. Add the shortcodes to `seen.json`.

## 3. Triage: decide what, if anything, is worth doing

List every option, then keep only what clears the bar. Options:
- **A new theme** built from a reel or template.
- **An upgrade to a live theme** (`lib/themes.ts`), taking a better idea from a reel,
  or fixing the open defects in `.hallmark/COUNCIL-GATE-*.md`.
- **Retiring a weak theme** (owner's call: write it as a question, do not delete).
- **Nothing**: the right call when no option clears the bar.

The bar. An option goes ahead only if it clears every line:
1. **It stands out.** A hiring manager would remember it after closing the tab. It is not
   a template layout with new colours, and not a trend anyone could copy in an afternoon.
2. **It shows the owner's work best.** The signature object carries real content (projects,
   decisions, the baseline figures), not decoration. The swap test fails: it would not
   work for another person's career.
3. **It is genuinely different** from every live and retired theme: a different hero
   mechanic, signature object and layout, not a variation on one.
4. **It is honest.** Only real images of the owner (`PORTRAITS.photo`, `PORTRAITS.cutout`,
   crops of them). No generated faces, stock images, invented metrics or fake system chrome.
5. **It fits the night.** It can reach the council gate within tonight's windows. If it
   cannot, it is planned now and built next Thursday, not started half-done.

Run the `portfolio-design-council` skill as a plan review over the options that clear the
bar, with the owner's taste from memory (person-led, animated, interactive heroes; each a
different idea). Choose at most **one new theme** a week, or one or two upgrades. Write
the rejected options and the reason for each.

## 4. Write the plan

Write `.hallmark/weekly/<YYYY-MM-DD>/plan.md`:
- The budget and tonight's windows.
- The reels analysed.
- The triage table: every option, the bar line it failed or "goes ahead", the council view.
- For each chosen item: slug, source, hero mechanic, Hallmark material, open-licence fonts,
  and a build spec in the format of `.hallmark/BUILD-SPEC-2026-11-20.md`.
- The work split across the two windows, with the done check for each.
- Questions for the owner.
- A Status line per item that the runs update.

In budget mode `research`, stop after the plan: it is built next Thursday.

## 5. Build until the window ends

Follow `scripts/weekly/prompts/sprint.md` from its step 3 for the chosen items, on branch
`weekly/<plan date>`. Before the window ends (the guard allows only git and the handoff
from 93% or when the window is over), write the handoff in the plan: what is done, what is
next, the file or command to start from. Then run
`scripts/weekly/log-sprint.sh end "<one-line summary>"` and stop. The second window
continues from the handoff.

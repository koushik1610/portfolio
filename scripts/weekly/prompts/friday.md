# Friday run: research the saved reels, plan the week's themes, schedule the sprints

You run unattended. Nobody answers questions. When a step needs a decision only the
owner can make, write it under "Questions for the owner" in the plan and continue.
The full process is `docs/weekly-theme-sprints.md`. Read it first, then
`CLAUDE.md`, `docs/ui-guidelines.md`, `lib/themes.ts` and `.hallmark/BUILD-SPEC.md`.

A PreToolUse guard (`scripts/weekly/guard.sh`) watches usage. If a tool call comes
back with "SPRINT GUARD", write what you have to the plan file, commit nothing
else, and stop.

## 1. Budget

1. Run `scripts/weekly/usage.sh --human`. If the snapshot is older than 10 minutes,
   reply once (any short text) so the status line refreshes it, then run it again.
2. Run `scripts/weekly/usage.sh | python3 scripts/weekly/budget.py`. Keep the JSON.
3. Carry-over: list folders in `.hallmark/weekly/`. If last week's `plan.md` has
   themes not marked done, they go first in this week's plan, ahead of new research.

## 2. Research the saved reels

Read the collection URL from `~/.config/portfolio-weekly/config.env` (`IG_SAVED_URL`).
Read `.hallmark/weekly/seen.json` (reel shortcodes already analysed; create it if
missing).

- **Budget mode `build`:** use Claude in Chrome. Open the collection, collect every
  reel link, and keep only shortcodes not in `seen.json`.
- **Budget mode `research` (low usage):** use computer use with the iPhone Mirroring
  app: open Instagram, Profile, Saved, the Portfolio/UI collection, and read the new
  reels on the phone screen. If computer use is not available in this session, use
  Chrome instead and say so in the plan.

For each new reel, in order:
1. Read the caption (and any linked template list, Notion page or Framer template).
2. Look at 3 frames (about 20%, 50% and 85% of the video) and any live template site.
3. Write one entry: what the hero does, the motion, the type, the colour, the layout
   below the hero, and the link.

## 3. Turn the reels into theme candidates

For each candidate:
- Name the hero mechanic in one line ("a foldable phone that unfolds on scroll").
- **Distinct from what ships:** compare against every slug in `lib/themes.ts` and
  each theme's stamp (line 1 of `components/layouts/<slug>/styles.css`). Reject a
  candidate whose hero mechanic, signature object or layout matches a live theme or a
  retired one (CLAUDE.md lists the retired concepts). Record why.
- **Honest:** only real images of the owner (`PORTRAITS.photo`, `PORTRAITS.cutout`,
  crops of them). No generated faces, stock images, invented metrics or fake system
  chrome.
- **Buildable:** Next.js static export, scoped CSS, no new npm dependency unless the
  idea cannot exist without one.
- Pick a Hallmark material (`~/.claude/skills/hallmark/references/themes/`) and its
  open-licence fonts.

If there are no new reels and no carry-over, write a plan that says so and stop.

## 4. Choose with the council

Run the `portfolio-design-council` skill as a plan review over the candidates, with
the owner's taste rule from memory (person-led, animated, interactive heroes; each a
different idea). Keep the number of themes to what the sprints can finish: about one
theme per sprint, and the last sprint for the gate and fixes.

## 5. Write the plan

Write `.hallmark/weekly/<YYYY-MM-DD>/plan.md` with:
- The budget JSON and what it means in one sentence.
- The new reels analysed (step 2 entries).
- The chosen themes: slug, source reel, hero mechanic, material, fonts, the build
  spec in the format of `.hallmark/BUILD-SPEC-2026-11-20.md`.
- The sprint table: start time, what each sprint builds, the done check.
- Questions for the owner.
- A "Status" line per theme that sprints update (planned, building, gate n, done).

Add the analysed shortcodes to `.hallmark/weekly/seen.json`.

## 6. Schedule the sprints

For each epoch in the budget's `slots`, run `scripts/weekly/schedule.sh add-sprint <epoch>`.
Mode `research` schedules nothing: the plan waits for next Friday.
Run `scripts/weekly/schedule.sh list` and copy the output into the plan.

## 7. Tell the owner and stop

Send a push notification if the PushNotification tool is available: the number of
new reels, the themes chosen, and the sprint times. Then stop. Do not start building
in this run.

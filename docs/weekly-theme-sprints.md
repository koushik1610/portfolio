# Weekly theme sprints

Every week, new theme ideas come from the owner's saved Instagram reels, and the week's
Claude usage is spent building them. This file is the process; `scripts/weekly/` is the
machinery. Set up 2026-11-22.

## The week at a glance

The weekly usage limit resets on **Friday at 05:00 local time** (read from the status
line on 2026-11-22). The 5-hour limit resets on a rolling window.

| When | Job | What it does |
|---|---|---|
| Friday 07:00 | `launch.sh friday` | Reads the new saved reels, picks themes that differ from the live ones, writes the week's plan, schedules up to 4 sprints |
| Fri to Thu, slots chosen on Friday | `launch.sh sprint` | One 5-hour build sprint per slot, each in a fresh 5-hour window |
| Thursday 22:00 | `launch.sh lastcall` | If the week still has room for a full sprint before the reset, runs one more; otherwise does nothing |
| Friday 04:30 | (deadline) | The guard blocks every tool 30 minutes before the reset. No work carries into the new week |

So the leftover of each week is spent by Thursday night, and Friday morning starts the new
week with a fresh plan.

## Budget rules

1. **Never past 100%.** Sprints are planned up to 95% of the week. At 93% of the week or of
   the 5-hour window a sprint may only commit and write its handoff. At 98% every tool is
   blocked.
2. **Never after the reset.** Each run gets a fixed deadline 30 minutes before the weekly
   reset. After it every tool is blocked, even though usage reads 0% again.
3. **Three to four sprints.** At most 4 a week, each up to 5 hours, started at least 5 hours
   apart, the last one ending before the deadline.
4. **Cost per sprint is learned.** `budget.py` uses 15% of the week per sprint until three
   sprints are logged, then the median of the logged costs.
5. **Low usage, still plan.** If the budget cannot afford a sprint, the Friday run still
   reviews the new reels (through the iPhone Mirroring app, as the owner asked, or Chrome if
   computer use is unavailable), writes the plan, and schedules nothing. Next Friday's run
   builds that plan first.

## How a run is started

`launchd` runs `scripts/weekly/launch.sh`, which opens a new iTerm2 window with an
interactive Claude Code session:

```
THEME_SPRINT=1 SPRINT_MODE=<mode> SPRINT_DEADLINE=<epoch> SPRINT_END=<epoch> \
  claude --chrome --permission-mode auto --settings <guard settings> \
  "Read scripts/weekly/prompts/<mode>.md and follow it exactly."
```

It is interactive on purpose. Claude in Chrome (Instagram on the web), computer use (iPhone
Mirroring) and the status line (live usage for the guard) do not work with `claude -p`.

Requirements: the Mac is awake and logged in (launchd runs a missed job at the next wake),
Chrome is signed in with the Claude extension, iTerm2 is installed, and iPhone Mirroring is
paired for low-usage weeks.

## The pieces

| File | Role |
|---|---|
| `scripts/weekly/usage.sh` | Reads `~/.local/state/claude-cost/usage.json`, which the status line writes: weekly and 5-hour percent used and reset times |
| `scripts/weekly/budget.py` | Turns usage into a mode (`build` or `research`), a sprint count and start times |
| `scripts/weekly/guard.sh` | PreToolUse hook for these runs only (`THEME_SPRINT=1`): enforces the budget rules above |
| `scripts/weekly/launch.sh` | Opens the session for `friday`, `sprint` or `lastcall` |
| `scripts/weekly/schedule.sh` | Installs the weekly launchd jobs and the one-off sprint jobs |
| `scripts/weekly/log-sprint.sh` | Records usage at the start and end of a sprint, so the cost per sprint is learned |
| `scripts/weekly/prompts/friday.md` | What the Friday run does, step by step |
| `scripts/weekly/prompts/sprint.md` | What a sprint does, step by step |

Local, never committed:
- `~/.config/portfolio-weekly/config.env`: `IG_SAVED_URL`, the saved collection's URL.
- `.hallmark/weekly/<date>/plan.md`: the week's plan, sprint table and handoffs.
- `.hallmark/weekly/seen.json`: reels already analysed.
- `~/.local/state/claude-cost/`: usage snapshot, sprint log, launch log.

## What counts as a new theme

A candidate makes the plan only if all of these hold:
- Its hero mechanic, signature object and layout differ from every theme in `lib/themes.ts`
  and from the retired concepts in CLAUDE.md.
- It uses only real images of the owner (the photo, the cutout, crops of them).
- It follows Hallmark's Floor and `docs/ui-guidelines.md`.
- It builds as a static export with scoped CSS and no new npm dependency unless the idea
  needs one.

The council (`portfolio-design-council`) picks among the candidates, weighting the owner's
taste: person-led, animated, interactive heroes, each a different idea.

## Shipping

Sprints work on the branch `weekly/<plan date>`. A theme goes to `main` (and so to
koushik.io) when it passes the council gate: composite 95 or more, no seat below 80. The
owner's decision of 2026-11-22 also allows shipping after five fix rounds if no seat is
below 80; the scores are recorded either way. A theme that does not pass stays on the branch
with its fix list in the plan.

## Operating it

```
scripts/weekly/schedule.sh install        # once: Friday and Thursday jobs
scripts/weekly/schedule.sh list           # jobs and pending sprints
scripts/weekly/usage.sh --human           # where the week stands
scripts/weekly/launch.sh friday           # run the Friday job now
scripts/weekly/schedule.sh clear-sprints  # cancel this week's sprints
scripts/weekly/schedule.sh uninstall      # stop everything
```

Logs: `~/.local/state/claude-cost/weekly-launch.log` and the `.out`/`.err` files beside it.

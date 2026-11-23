# Thursday-night portfolio run

Once a week, new theme ideas come from the owner's saved Instagram reels and the last of the
week's Claude usage is spent on the portfolio. Everything happens on Thursday night, so the
rest of the week's usage stays free for other work. This file is the process;
`scripts/weekly/` is the machinery. Set up 2026-11-22.

## Timing

The weekly usage limit resets on **Friday at 05:00 local time** (read from the status line on
2026-11-22). A 5-hour window starts with the first message sent after the previous window
ends, so its position depends on use. The run anchors its two windows backwards from the
weekly reset:

| Time | What happens |
|---|---|
| Thursday 12:00 | **Check** (no Claude session). Reads usage, works out tonight's windows and how many the week can afford, schedules them, and sends a macOS notification with the times |
| Thursday 18:30 | **First window** (5 hours): research the new reels, triage, plan, then build |
| Thursday 23:30 | **Second window** (5 hours): continue the build from the handoff, gate, ship what passes |
| Friday 04:30 | Deadline, 30 minutes before the reset. Every tool is blocked from here |

The times above are for a 05:00 reset. They move with the reset time the status line reports.

**The owner's own sessions.** A Claude session started after 13:30 on Thursday keeps its
5-hour window open past 18:30. The 12:00 notification names this cut-off. If a window is
still open when a run is due, the run moves itself to the moment that window ends, and the
second run moves 5 hours after that. A run is skipped if less than an hour would remain
before the deadline.

**A thin week.** If the week can afford only one window, the check schedules just the last
one (23:30). If it can afford none, that run reviews the reels and writes the plan only, and
the next Thursday builds it.

## The quality bar

The portfolio must never look generic. One exceptional piece of work beats three decent ones,
and doing nothing new is a valid outcome. Every Thursday, each option (a new theme, an upgrade
to a live theme, retiring a weak one, or nothing) goes ahead only if it clears all of these:

1. **It stands out.** A hiring manager would remember it after closing the tab. Not a template
   layout with new colours, not a trend anyone could copy in an afternoon.
2. **It shows the owner's work best.** The signature object carries real content (projects,
   decisions, the baseline figures), not decoration. It fails the swap test: it would not
   work for another person's career.
3. **It is genuinely different** from every live and retired theme: a different hero
   mechanic, signature object and layout.
4. **It is honest.** Only real images of the owner (the photo, the cutout, crops of them). No
   generated faces, stock images, invented metrics or fake system chrome.
5. **It fits the night.** It can reach the council gate in tonight's windows. Otherwise it is
   planned now and built next Thursday.

At most one new theme a week, or one or two upgrades. The council (`portfolio-design-council`)
reviews the options that clear the bar, weighting the owner's taste: person-led, animated,
interactive heroes, each a different idea. Retiring a theme is always the owner's call.

## Budget rules

1. **Never past 100%.** Windows are planned up to 95% of the week. At 93% of the week or of the
   5-hour window a run may only commit and write its handoff. At 98% every tool is blocked.
2. **Never after the reset.** Each run has a fixed deadline 30 minutes before the weekly reset.
   After it every tool is blocked, even though usage reads 0% again.
3. **Cost per window is learned.** `budget.py` assumes 15% of the week per window until three
   runs are logged, then uses the median of the logged costs.

## How a run is started

`launchd` runs `scripts/weekly/launch.sh`. The check is a plain script. The two windows open a
new iTerm2 window with an interactive Claude Code session:

```
THEME_SPRINT=1 SPRINT_MODE=<first|second> SPRINT_DEADLINE=<epoch> SPRINT_END=<epoch> \
  claude --chrome --permission-mode auto --settings <guard settings> \
  "Read scripts/weekly/prompts/<thursday|sprint>.md and follow it exactly."
```

It is interactive on purpose. Claude in Chrome (Instagram on the web), computer use (iPhone
Mirroring) and the status line (live usage for the guard) do not work with `claude -p`.

Requirements: the Mac is awake and logged in on Thursday night (launchd runs a missed job at
the next wake), Chrome is signed in with the Claude extension, iTerm2 is installed, and iPhone
Mirroring is paired for research-only nights. The first run asks macOS for permission to
control iTerm; approve it once.

## The pieces

| File | Role |
|---|---|
| `scripts/weekly/usage.sh` | Reads `~/.local/state/claude-cost/usage.json`, which the status line writes: weekly and 5-hour percent used and reset times |
| `scripts/weekly/budget.py` | How many of tonight's windows the week can afford, and the mode (`build` or `research`) |
| `scripts/weekly/launch.sh` | `check`, `first` and `second`: plans the windows, moves a run off an open window, opens the session |
| `scripts/weekly/guard.sh` | PreToolUse hook for these runs only (`THEME_SPRINT=1`): enforces the budget rules |
| `scripts/weekly/schedule.sh` | Installs the Thursday 12:00 job and the one-off window runs |
| `scripts/weekly/log-sprint.sh` | Records usage at the start and end of a run, so the cost per window is learned |
| `scripts/weekly/prompts/thursday.md` | First window: reels, triage against the bar, plan, build |
| `scripts/weekly/prompts/sprint.md` | Second window: continue, verify, gate, ship |

Local, never committed:
- `~/.config/portfolio-weekly/config.env`: `IG_SAVED_URL`, the saved collection's URL.
- `.hallmark/weekly/<date>/plan.md`: the week's triage, plan and handoffs.
- `.hallmark/weekly/seen.json`: reels already analysed.
- `~/.local/state/claude-cost/`: usage snapshot, `thursday-plan.json`, run log, launch log.

## Shipping

Runs work on the branch `weekly/<plan date>`. Work goes to `main` (and so to koushik.io) when
it passes the council gate: composite 95 or more, no seat below 80. The owner's decision of
2026-11-22 also allows shipping after five fix rounds if no seat is below 80; the scores are
recorded either way. Anything that does not pass stays on the branch with its fix list.

## Operating it

```
scripts/weekly/schedule.sh install       # once: the Thursday 12:00 check
scripts/weekly/schedule.sh list          # the check and tonight's pending runs
scripts/weekly/usage.sh --human          # where the week stands
scripts/weekly/launch.sh check           # plan tonight's windows now
scripts/weekly/schedule.sh clear-runs    # cancel tonight's runs
scripts/weekly/schedule.sh uninstall     # stop everything
```

Logs: `~/.local/state/claude-cost/weekly-launch.log` and the `.out`/`.err` files beside it.

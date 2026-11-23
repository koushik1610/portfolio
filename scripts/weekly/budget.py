#!/usr/bin/env python3
"""Decide how many 5-hour theme sprints the rest of this usage week can afford.

Reads the usage JSON from scripts/weekly/usage.sh on stdin and the sprint log
(one JSON object per finished sprint) from $SPRINT_LOG, default
~/.local/state/claude-cost/sprints.jsonl. Prints a JSON plan:

  {"mode": "build" | "research", "sprints": n, "per_sprint_pct": x,
   "remaining_pct": y, "deadline": epoch, "slots": [epoch, ...], "reason": "..."}

Rules (docs/weekly-theme-sprints.md, "Budget rules"):
- Never plan past CEILING_PCT of the weekly limit. The guard hook stops work at
  HARD_STOP_PCT, so the gap is the safety margin.
- Every sprint ends at least DEADLINE_MARGIN_S before the weekly reset. No work
  runs after the reset on the old week's plan.
- At most MAX_SPRINTS sprints a week, each SPRINT_HOURS long, started at least
  SPRINT_HOURS apart so each one gets a fresh 5-hour window.
- per_sprint_pct is the median weekly-percent cost of logged sprints, or
  DEFAULT_SPRINT_PCT until three sprints are logged.
"""
import json
import os
import statistics
import sys
import time
from datetime import datetime, timedelta

CEILING_PCT = 95.0
HARD_STOP_PCT = 98.0
DEFAULT_SPRINT_PCT = 15.0
MAX_SPRINTS = 4
SPRINT_HOURS = 5
DEADLINE_MARGIN_S = 30 * 60
# Local hours a sprint may start in. Sprints run unattended, so night starts
# are allowed, but none starts in the last SPRINT_HOURS before the deadline.
EARLIEST_START_HOUR = 8
LATEST_START_HOUR = 22


def per_sprint_pct(log_path: str) -> float:
    costs = []
    if os.path.exists(log_path):
        with open(log_path) as fh:
            for line in fh:
                try:
                    rec = json.loads(line)
                    cost = float(rec["end_week_pct"]) - float(rec["start_week_pct"])
                    if cost > 0:
                        costs.append(cost)
                except (ValueError, KeyError, TypeError):
                    continue
    if len(costs) >= 3:
        return round(statistics.median(costs), 1)
    return DEFAULT_SPRINT_PCT


def slots(now: float, deadline: float, count: int) -> list:
    """Spread `count` start times between now and deadline, SPRINT_HOURS apart,
    inside the allowed start hours. The last one ends before the deadline."""
    out = []
    latest_start = deadline - SPRINT_HOURS * 3600
    if count == 0 or latest_start <= now:
        return out
    gap = max(SPRINT_HOURS * 3600, (latest_start - now) / count)
    t = datetime.fromtimestamp(now + 15 * 60)
    for _ in range(count):
        if t.hour < EARLIEST_START_HOUR:
            t = t.replace(hour=EARLIEST_START_HOUR, minute=0, second=0)
        elif t.hour > LATEST_START_HOUR:
            t = (t + timedelta(days=1)).replace(hour=EARLIEST_START_HOUR, minute=0, second=0)
        if t.timestamp() > latest_start:
            break
        out.append(int(t.timestamp()))
        t = t + timedelta(seconds=gap)
    return out


def main() -> None:
    usage = json.load(sys.stdin)
    log_path = os.environ.get(
        "SPRINT_LOG", os.path.expanduser("~/.local/state/claude-cost/sprints.jsonl"))
    now = float(usage.get("now") or time.time())
    week_pct = usage.get("week_pct")
    reset = usage.get("week_resets_at")
    cost = per_sprint_pct(log_path)
    if week_pct is None or reset is None:
        print(json.dumps({"mode": "research", "sprints": 0, "per_sprint_pct": cost,
                          "reason": "usage snapshot has no weekly figures; plan only"}))
        return
    deadline = float(reset) - DEADLINE_MARGIN_S
    remaining = max(0.0, CEILING_PCT - float(week_pct))
    by_budget = int(remaining // cost)
    by_time = int(max(0.0, deadline - now) // (SPRINT_HOURS * 3600))
    count = min(MAX_SPRINTS, by_budget, by_time)
    planned = slots(now, deadline, count)
    mode = "build" if planned else "research"
    reason = (f"{remaining:.0f}% left under the {CEILING_PCT:.0f}% ceiling buys {by_budget} "
              f"sprint(s) at {cost}% each; {by_time} fit before the reset")
    print(json.dumps({"mode": mode, "sprints": len(planned), "per_sprint_pct": cost,
                      "remaining_pct": round(remaining, 1), "deadline": int(deadline),
                      "slots": planned, "reason": reason}))


if __name__ == "__main__":
    main()

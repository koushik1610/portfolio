#!/usr/bin/env python3
"""Decide how many of Thursday night's 5-hour windows the week can afford.

Reads the usage JSON from scripts/weekly/usage.sh on stdin and the window log
(one JSON object per finished run) from $SPRINT_LOG, default
~/.local/state/claude-cost/sprints.jsonl. Prints:

  {"mode": "build" | "research", "windows": 0..2, "per_window_pct": x,
   "remaining_pct": y, "reason": "..."}

Rules (docs/weekly-theme-sprints.md, "Budget rules"):
- Plan up to CEILING_PCT of the weekly limit. The guard hook stops work at 98%.
- At most MAX_WINDOWS windows, the last two before the weekly reset.
- per_window_pct is the median weekly-percent cost of logged runs, or
  DEFAULT_WINDOW_PCT until three runs are logged.
- With no window affordable the mode is "research": review the reels and plan only.
"""
import json
import os
import statistics
import sys

CEILING_PCT = 95.0
DEFAULT_WINDOW_PCT = 15.0
MAX_WINDOWS = 2


def per_window_pct(log_path: str) -> float:
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
    return DEFAULT_WINDOW_PCT


def main() -> None:
    usage = json.load(sys.stdin)
    log_path = os.environ.get(
        "SPRINT_LOG", os.path.expanduser("~/.local/state/claude-cost/sprints.jsonl"))
    cost = per_window_pct(log_path)
    week_pct = usage.get("week_pct")
    if week_pct is None:
        print(json.dumps({"mode": "research", "windows": 0, "per_window_pct": cost,
                          "reason": "no weekly figure in the usage snapshot; review and plan only"}))
        return
    remaining = max(0.0, CEILING_PCT - float(week_pct))
    windows = min(MAX_WINDOWS, int(remaining // cost))
    mode = "build" if windows else "research"
    reason = (f"{remaining:.0f}% left under the {CEILING_PCT:.0f}% ceiling buys {windows} "
              f"window(s) at about {cost}% each")
    print(json.dumps({"mode": mode, "windows": windows, "per_window_pct": cost,
                      "remaining_pct": round(remaining, 1), "reason": reason}))


if __name__ == "__main__":
    main()

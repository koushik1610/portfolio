#!/usr/bin/env bash
# PreToolUse hook for unattended theme sprints. Loaded only by scripts/weekly/launch.sh
# through `claude --settings`, and active only when THEME_SPRINT=1, so normal
# sessions are never affected.
#
# It enforces the budget rules in docs/weekly-theme-sprints.md:
#   1. Never past the weekly limit: at WRAP_PCT only wrap-up tools are allowed
#      (git, and writes under .hallmark/weekly/); at HARD_PCT every tool is blocked.
#   2. Never past the 5-hour window: the same two thresholds on the 5-hour figure.
#   3. Never after the reset: SPRINT_DEADLINE (epoch) is fixed at launch, before
#      the weekly reset. After it every tool is blocked, even though usage reads
#      0% again once the week resets.
#   4. Never past the sprint length: SPRINT_END (epoch), 5 hours after launch.
# Exit 2 blocks the tool call and shows stderr to Claude.
set -uo pipefail

[ "${THEME_SPRINT:-0}" = "1" ] || exit 0

WRAP_PCT="${WRAP_PCT:-93}"
HARD_PCT="${HARD_PCT:-98}"
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
input=$(cat)
now=$(date +%s)

usage=$("$here/usage.sh" 2>/dev/null) || usage='{}'
week=$(printf '%s' "$usage" | jq -r '.week_pct // 0 | floor')
five=$(printf '%s' "$usage" | jq -r '.five_pct // 0 | floor')

block() { echo "SPRINT GUARD: $1" >&2; exit 2; }

if [ -n "${SPRINT_DEADLINE:-}" ] && [ "$now" -ge "$SPRINT_DEADLINE" ]; then
  block "the weekly reset deadline has passed. Stop now. Do not start new work on the new week."
fi
if [ "$week" -ge "$HARD_PCT" ] || [ "$five" -ge "$HARD_PCT" ]; then
  block "usage is at ${week}% of the week and ${five}% of the 5-hour window. Stop now."
fi

tool=$(printf '%s' "$input" | jq -r '.tool_name // ""')
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')
path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // ""')
wrap_ok=0
case "$tool" in
  Bash) case "$cmd" in git\ *|cd\ *\&\&\ git\ *) wrap_ok=1 ;; esac ;;
  Write|Edit) case "$path" in */.hallmark/weekly/*) wrap_ok=1 ;; esac ;;
esac

over_time=0
[ -n "${SPRINT_END:-}" ] && [ "$now" -ge "$SPRINT_END" ] && over_time=1
if [ "$week" -ge "$WRAP_PCT" ] || [ "$five" -ge "$WRAP_PCT" ] || [ "$over_time" = "1" ]; then
  [ "$wrap_ok" = "1" ] && exit 0
  block "wrap-up time (week ${week}%, 5-hour ${five}%, sprint over: ${over_time}). Only git commits and the handoff note in .hallmark/weekly/ are allowed now. Commit the work, write the handoff, then stop."
fi
exit 0

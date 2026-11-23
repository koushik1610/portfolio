#!/usr/bin/env bash
# The Thursday-night portfolio run (docs/weekly-theme-sprints.md).
#
#   scripts/weekly/launch.sh check    Thursday 12:00. No Claude session: reads usage,
#                                     plans tonight's two windows, schedules them,
#                                     and sends a macOS notification.
#   scripts/weekly/launch.sh first    First window: reel research, triage, plan, build.
#   scripts/weekly/launch.sh second   Second window: continue the build until the deadline.
#
# A 5-hour window starts with the first message sent after the previous window
# ends, so tonight's windows are anchored backwards from the weekly reset:
#   deadline = reset - 30 min (04:30 for a 05:00 reset)
#   second   = deadline - 5 h (23:30)
#   first    = deadline - 10 h (18:30)
# If one of the owner's own windows is still open when a run is due, the run moves
# to the moment that window ends, so it never shares the owner's window.
#
# Runs are interactive iTerm2 sessions: Claude in Chrome (Instagram), computer use
# (iPhone Mirroring) and the status line (live usage for the guard) need one.
set -euo pipefail

mode="${1:?usage: launch.sh check|first|second}"
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo="$(cd "$here/../.." && pwd)"
state="${XDG_STATE_HOME:-$HOME/.local/state}/claude-cost"
mkdir -p "$state"
log="$state/weekly-launch.log"
plan_file="$state/thursday-plan.json"
now=$(date +%s)
WEEK=604800
WINDOW=18000
MIN_RUN=3600   # a run shorter than an hour is not worth starting

say() { echo "$(date '+%a %d %b %H:%M') $mode: $*" >> "$log"; }
notify() { osascript -e "display notification \"$1\" with title \"Portfolio run\"" 2>/dev/null || true; }
at() { date -r "$1" '+%a %H:%M'; }

usage=$("$here/usage.sh" 2>/dev/null || echo '{}')
reset=$(printf '%s' "$usage" | jq -r '.week_resets_at // empty')
# No snapshot yet: assume Friday 05:00 local (observed 2026-11-22).
[ -z "$reset" ] && reset=$(date -v+fri -v5H -v0M -v0S +%s)
# A snapshot written before a reset still holds the old time; roll it forward.
while [ "$reset" -le "$now" ]; do reset=$((reset + WEEK)); done
deadline=$((reset - 1800))
five_end=$(printf '%s' "$usage" | jq -r '.five_resets_at // 0')
open_window=0
[ "$five_end" -gt $((now + 300)) ] && open_window=1

budget=$(printf '%s' "$usage" | python3 "$here/budget.py")
windows=$(printf '%s' "$budget" | jq -r '.windows')
bmode=$(printf '%s' "$budget" | jq -r '.mode')

launch() { # prompt file, end epoch
  local prompt_file="$1" end="$2" settings="$state/sprint-settings.json"
  jq -n --arg guard "$here/guard.sh" \
    '{hooks: {PreToolUse: [{matcher: "*", hooks: [{type: "command", command: $guard}]}]}}' > "$settings"
  local cmd
  cmd="cd $(printf %q "$repo") && THEME_SPRINT=1 SPRINT_MODE=$mode BUDGET_MODE=$bmode SPRINT_DEADLINE=$deadline SPRINT_END=$end claude --chrome --permission-mode auto --settings $(printf %q "$settings") --name portfolio-$mode-$(date +%Y%m%d) $(printf %q "Read $prompt_file and follow it exactly. Run: $mode. Budget mode: $bmode.")"
  say "launching until $(at "$end"), budget $bmode ($windows window(s))"
  if [ "${DRY_RUN:-0}" = "1" ]; then echo "$cmd"; return; fi
  open -ga "Google Chrome" || true
  osascript - "$cmd" <<'APPLESCRIPT'
on run argv
  tell application "iTerm"
    activate
    set w to (create window with default profile)
    tell current session of w to write text (item 1 of argv)
  end tell
end run
APPLESCRIPT
}

case "$mode" in
  check)
    "$here/schedule.sh" clear-runs >/dev/null
    first=$((deadline - 2 * WINDOW)); second=$((deadline - WINDOW))
    if [ "$windows" -le 1 ]; then
      # One window or a research-only night: use the last window before the reset.
      first=$second; second=0
    fi
    [ "$first" -lt "$now" ] && first=$((now + 300))
    "$here/schedule.sh" add-run first "$first" >/dev/null
    [ "$second" -gt 0 ] && "$here/schedule.sh" add-run second "$second" >/dev/null
    cutoff=$((first - WINDOW))
    jq -n --argjson f "$first" --argjson s "$second" --argjson d "$deadline" \
      --argjson c "$cutoff" --argjson b "$budget" \
      '{first:$f, second:$s, deadline:$d, own_window_cutoff:$c, budget:$b}' > "$plan_file"
    msg="Tonight: $(at "$first")"
    [ "$second" -gt 0 ] && msg="$msg and $(at "$second")"
    msg="$msg, stop $(at "$deadline"). $(printf '%s' "$budget" | jq -r '.reason'). A Claude session you start after $(at "$cutoff") delays the first window."
    say "$msg"; notify "$msg"; echo "$msg" ;;
  first|second)
    if [ "$open_window" = "1" ]; then
      # Someone else's window is still open: move to its end, never share it.
      if [ $((five_end + MIN_RUN)) -le "$deadline" ]; then
        "$here/schedule.sh" add-run "$mode" "$five_end" >/dev/null
        if [ "$mode" = "first" ]; then
          "$here/schedule.sh" clear-runs second >/dev/null
          nxt=$((five_end + WINDOW))
          [ $((nxt + MIN_RUN)) -le "$deadline" ] && "$here/schedule.sh" add-run second "$nxt" >/dev/null
        fi
        say "a 5-hour window is open until $(at "$five_end"); moved there"
        notify "Portfolio $mode run moved to $(at "$five_end") (a window was still open)"
      else
        say "a window is open until $(at "$five_end"), too close to the deadline; skipped"
      fi
      exit 0
    fi
    if [ "$now" -ge $((deadline - MIN_RUN)) ]; then say "less than an hour to the deadline; skipped"; exit 0; fi
    if [ "$mode" = "second" ] && [ "$windows" -lt 1 ]; then say "week budget spent; skipped"; exit 0; fi
    end=$((now + WINDOW - 600)); [ "$end" -gt "$deadline" ] && end=$deadline
    if [ "$mode" = "first" ]; then launch "$here/prompts/thursday.md" "$end"
    else launch "$here/prompts/sprint.md" "$end"; fi ;;
  *) echo "unknown mode: $mode" >&2; exit 2 ;;
esac

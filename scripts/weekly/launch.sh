#!/usr/bin/env bash
# Open an unattended Claude Code session in iTerm2 for the weekly theme work.
#
#   scripts/weekly/launch.sh friday    Friday research and planning run
#   scripts/weekly/launch.sh sprint    one 5-hour build sprint
#   scripts/weekly/launch.sh lastcall  Thursday-night run that spends what is left
#                                      of the week, only if a full sprint fits
#
# Why an interactive session and not `claude -p`: Claude in Chrome (Instagram
# on the web), computer use (iPhone Mirroring) and the status line (live usage
# figures for the guard) all need an interactive session.
#
# launchd calls this (scripts/weekly/schedule.sh installs the jobs). The Mac
# must be awake and logged in; launchd runs a missed job at the next wake.
set -euo pipefail

mode="${1:?usage: launch.sh friday|sprint|lastcall}"
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo="$(cd "$here/../.." && pwd)"
state="${XDG_STATE_HOME:-$HOME/.local/state}/claude-cost"
mkdir -p "$state"
log="$state/weekly-launch.log"
now=$(date +%s)
week=604800

usage=$("$here/usage.sh" 2>/dev/null || echo '{}')
reset=$(printf '%s' "$usage" | jq -r '.week_resets_at // empty')
if [ -z "$reset" ]; then
  # No snapshot yet: assume the reset is Friday 05:00 local (observed 2026-11-22).
  reset=$(date -v+fri -v5H -v0M -v0S +%s)
fi
# The snapshot can predate a reset that has since passed; roll it forward.
while [ "$reset" -le "$now" ]; do reset=$((reset + week)); done
deadline=$((reset - 1800))

case "$mode" in
  friday)   prompt_file="$here/prompts/friday.md";  end=$((now + 3 * 3600)) ;;
  sprint)   prompt_file="$here/prompts/sprint.md";  end=$((now + 5 * 3600 - 600)) ;;
  lastcall)
    plan=$(printf '%s' "$usage" | python3 "$here/budget.py")
    if [ "$(printf '%s' "$plan" | jq -r '.sprints')" -lt 1 ]; then
      echo "$(date) lastcall skipped: $(printf '%s' "$plan" | jq -r '.reason')" >> "$log"
      exit 0
    fi
    prompt_file="$here/prompts/sprint.md"; end=$((now + 5 * 3600 - 600))
    [ "$end" -gt "$deadline" ] && end=$deadline ;;
  *) echo "unknown mode: $mode" >&2; exit 2 ;;
esac
[ "$end" -gt "$deadline" ] && end=$deadline
if [ "$now" -ge "$deadline" ]; then
  echo "$(date) $mode skipped: inside the 30 minutes before the weekly reset" >> "$log"
  exit 0
fi

settings="$state/sprint-settings.json"
jq -n --arg guard "$here/guard.sh" '{
  hooks: { PreToolUse: [ { matcher: "*", hooks: [ { type: "command", command: $guard } ] } ] }
}' > "$settings"

echo "$(date) launching $mode: deadline $(date -r "$deadline"), end $(date -r "$end")" >> "$log"

# Claude in Chrome needs Chrome running with the extension signed in.
open -ga "Google Chrome" || true

cmd="cd $(printf %q "$repo") && THEME_SPRINT=1 SPRINT_MODE=$mode SPRINT_DEADLINE=$deadline SPRINT_END=$end claude --chrome --permission-mode auto --settings $(printf %q "$settings") --name weekly-$mode-$(date +%Y%m%d-%H%M) $(printf %q "Read $prompt_file and follow it exactly. Mode: $mode.")"

if [ "${DRY_RUN:-0}" = "1" ]; then echo "$cmd"; exit 0; fi

osascript - "$cmd" <<'APPLESCRIPT'
on run argv
  tell application "iTerm"
    activate
    set w to (create window with default profile)
    tell current session of w to write text (item 1 of argv)
  end tell
end run
APPLESCRIPT

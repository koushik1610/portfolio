#!/usr/bin/env bash
# Print Claude usage as one JSON object, read from the status line snapshot.
#
# The status line (~/.claude/statusline-cost.sh) writes the snapshot on every
# render of an interactive session. It holds the plan limits that Claude Code
# passes to the status line: percent used and reset time (epoch seconds) for the
# 5-hour window and the 7-day window. `claude -p` does not render a status line,
# so the snapshot is fresh only while an interactive session is running.
#
# Usage: scripts/weekly/usage.sh          (JSON on stdout)
#        scripts/weekly/usage.sh --human  (one readable line)
set -euo pipefail

SNAP="${XDG_STATE_HOME:-$HOME/.local/state}/claude-cost/usage.json"
if [ ! -f "$SNAP" ]; then
  echo '{"error":"no usage snapshot; open an interactive claude session first"}'
  exit 1
fi

json=$(jq -c --argjson now "$(date +%s)" '{
  week_pct: (.seven_day_pct | tonumber? // null),
  five_pct: (.five_hour_pct | tonumber? // null),
  week_resets_at: (.seven_day_resets_at | tonumber? // null),
  five_resets_at: (.five_hour_resets_at | tonumber? // null),
  snapshot_age_s: ($now - (.ts // 0)),
  now: $now
}' "$SNAP")

if [ "${1:-}" = "--human" ]; then
  printf '%s' "$json" | jq -r '
    def t: if . == null then "unknown" else (. | strflocaltime("%a %d %b %H:%M")) end;
    "Week \(.week_pct // "?")% used, resets \(.week_resets_at | t). " +
    "5-hour window \(.five_pct // "?")% used, resets \(.five_resets_at | t). " +
    "Snapshot \(.snapshot_age_s)s old."'
else
  printf '%s\n' "$json"
fi

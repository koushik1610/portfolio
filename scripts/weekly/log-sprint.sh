#!/usr/bin/env bash
# Record the weekly usage at the start and end of a sprint, so budget.py can learn
# what one sprint costs. Appends one line to ~/.local/state/claude-cost/sprints.jsonl
# on `end`.
#   scripts/weekly/log-sprint.sh start
#   scripts/weekly/log-sprint.sh end "short summary of what got done"
set -euo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
state="${XDG_STATE_HOME:-$HOME/.local/state}/claude-cost"
mkdir -p "$state"
cur="$state/sprint-current.json"
usage=$("$here/usage.sh")
case "${1:-}" in
  start)
    printf '%s' "$usage" | jq -c --arg mode "${SPRINT_MODE:-sprint}" \
      '{mode:$mode, start:.now, start_week_pct:.week_pct, start_five_pct:.five_pct}' > "$cur"
    cat "$cur" ;;
  end)
    [ -f "$cur" ] || { echo "no sprint started" >&2; exit 1; }
    jq -c --argjson u "$usage" --arg note "${2:-}" \
      '. + {end:$u.now, end_week_pct:$u.week_pct, end_five_pct:$u.five_pct, note:$note}' "$cur" \
      >> "$state/sprints.jsonl"
    rm -f "$cur"
    tail -1 "$state/sprints.jsonl" ;;
  *) echo "usage: log-sprint.sh start|end [note]" >&2; exit 2 ;;
esac

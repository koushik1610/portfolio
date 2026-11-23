#!/usr/bin/env bash
# Manage the launchd jobs for the Thursday-night portfolio run
# (docs/weekly-theme-sprints.md).
#
#   schedule.sh install              Thursday 12:00 check, every week
#   schedule.sh add-run MODE EPOCH   one run (first|second) at that local time;
#                                    the job removes itself after it fires
#   schedule.sh list                 installed jobs and pending runs
#   schedule.sh clear-runs [MODE]    remove pending runs (all, or one mode)
#   schedule.sh uninstall            remove everything
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
agents="$HOME/Library/LaunchAgents"
prefix="io.koushik.portfolio.weekly"
uid=$(id -u)
mkdir -p "$agents" "$HOME/.local/state/claude-cost"

plist() { # label, calendar dict xml, program arguments...
  local label="$1" cal="$2"; shift 2
  local args="" a
  for a in "$@"; do args="$args<string>$a</string>"; done
  cat > "$agents/$label.plist" <<XML
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>$label</string>
  <key>ProgramArguments</key><array>$args</array>
  <key>StartCalendarInterval</key>$cal
  <key>EnvironmentVariables</key><dict>
    <key>PATH</key><string>$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>StandardOutPath</key><string>$HOME/.local/state/claude-cost/$label.out</string>
  <key>StandardErrorPath</key><string>$HOME/.local/state/claude-cost/$label.err</string>
</dict></plist>
XML
  launchctl bootout "gui/$uid/$label" 2>/dev/null || true
  launchctl bootstrap "gui/$uid" "$agents/$label.plist"
}

remove() { launchctl bootout "gui/$uid/$1" 2>/dev/null || true; rm -f "$agents/$1.plist"; }

case "${1:-}" in
  install)
    plist "$prefix.check" '<dict><key>Weekday</key><integer>4</integer><key>Hour</key><integer>12</integer><key>Minute</key><integer>0</integer></dict>' \
      /bin/bash "$here/launch.sh" check
    echo "installed: Thursday 12:00 check" ;;
  add-run)
    mode="${2:?first|second}"; epoch="${3:?epoch}"
    "$0" clear-runs "$mode" >/dev/null
    label="$prefix.run.$mode.$epoch"
    cal="<dict><key>Month</key><integer>$(date -r "$epoch" +%-m)</integer><key>Day</key><integer>$(date -r "$epoch" +%-d)</integer><key>Hour</key><integer>$(date -r "$epoch" +%-H)</integer><key>Minute</key><integer>$(date -r "$epoch" +%-M)</integer></dict>"
    # Remove the plist first, then run: a run may reschedule its own mode.
    plist "$label" "$cal" /bin/bash -c "rm -f '$agents/$label.plist'; '$here/launch.sh' $mode; launchctl bootout gui/$uid/$label"
    echo "$mode run scheduled: $(date -r "$epoch")" ;;
  list)
    launchctl list | grep "$prefix" || echo "no jobs loaded"
    for f in "$agents/$prefix".run.*.plist; do
      [ -e "$f" ] || continue
      b="$(basename "$f" .plist)"; e="${b##*.}"; m="${b%.*}"; m="${m##*.}"
      echo "pending $m run: $(date -r "$e")"
    done ;;
  clear-runs)
    for f in "$agents/$prefix".run.${2:-*}.*.plist; do
      [ -e "$f" ] || continue
      remove "$(basename "$f" .plist)"
    done
    echo "pending runs removed" ;;
  uninstall)
    "$0" clear-runs >/dev/null
    for l in check friday lastcall; do remove "$prefix.$l"; done
    echo "uninstalled" ;;
  *) sed -n '2,12p' "$0"; exit 2 ;;
esac

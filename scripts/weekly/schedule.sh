#!/usr/bin/env bash
# Manage the launchd jobs for the weekly theme work (docs/weekly-theme-sprints.md).
#
#   schedule.sh install          Friday 07:00 research/plan run and Thursday 22:00
#                                last call. Both repeat every week.
#   schedule.sh add-sprint EPOCH one sprint at that local time (removes itself after it fires)
#   schedule.sh list             show the installed jobs
#   schedule.sh clear-sprints    remove every pending one-off sprint
#   schedule.sh uninstall        remove everything
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
agents="$HOME/Library/LaunchAgents"
prefix="io.koushik.portfolio.weekly"
uid=$(id -u)
mkdir -p "$agents"

plist() { # label, calendar dict xml, launch args...
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

case "${1:-}" in
  install)
    mkdir -p "$HOME/.local/state/claude-cost"
    plist "$prefix.friday" '<dict><key>Weekday</key><integer>5</integer><key>Hour</key><integer>7</integer><key>Minute</key><integer>0</integer></dict>' \
      /bin/bash "$here/launch.sh" friday
    plist "$prefix.lastcall" '<dict><key>Weekday</key><integer>4</integer><key>Hour</key><integer>22</integer><key>Minute</key><integer>0</integer></dict>' \
      /bin/bash "$here/launch.sh" lastcall
    echo "installed: Friday 07:00 research and plan, Thursday 22:00 last call" ;;
  add-sprint)
    epoch="${2:?epoch}"
    label="$prefix.sprint.$epoch"
    cal="<dict><key>Month</key><integer>$(date -r "$epoch" +%-m)</integer><key>Day</key><integer>$(date -r "$epoch" +%-d)</integer><key>Hour</key><integer>$(date -r "$epoch" +%-H)</integer><key>Minute</key><integer>$(date -r "$epoch" +%-M)</integer></dict>"
    # The job runs the sprint, then removes its own plist so it never fires again next year.
    plist "$label" "$cal" /bin/bash -c "'$here/launch.sh' sprint; rm -f '$agents/$label.plist'; launchctl bootout gui/$uid/$label"
    echo "sprint scheduled: $(date -r "$epoch")" ;;
  list)
    launchctl list | grep "$prefix" || echo "no jobs installed"
    for f in "$agents/$prefix".sprint.*.plist; do
      [ -e "$f" ] || continue
      e="${f##*.sprint.}"; e="${e%.plist}"; echo "pending sprint: $(date -r "$e")"
    done ;;
  clear-sprints)
    for f in "$agents/$prefix".sprint.*.plist; do
      [ -e "$f" ] || continue
      l="$(basename "$f" .plist)"; launchctl bootout "gui/$uid/$l" 2>/dev/null || true; rm -f "$f"
    done
    echo "pending sprints removed" ;;
  uninstall)
    "$0" clear-sprints
    for l in friday lastcall; do
      launchctl bootout "gui/$uid/$prefix.$l" 2>/dev/null || true; rm -f "$agents/$prefix.$l.plist"
    done
    echo "uninstalled" ;;
  *) sed -n '2,10p' "$0"; exit 2 ;;
esac

#!/usr/bin/env bash
# tell-scan.sh — grep the AI-design tell catalog against theme source.
#
# WHY THIS EXISTS. Three council rounds scored 82.5, 85.4 and 86.7 and none of them found
# either of the two defects the council was created to catch. The documented mechanism is
# that an LLM design critic "tends to predict issues that do not exist" and "converges on
# generic or conservative design patterns" (arxiv 2403.13139, 2412.16829), which is the
# same mean that produced the output being graded. So every round needs at least one gate
# that does not have an opinion.
#
# This is that gate. It is deliberately dumb. It greps. A hit is not automatically a defect:
# a DELIBERATE indigo passes, an autopilot indigo fails, and only a human can tell them
# apart. The rule the catalog is built on is "a tell is an unspecified default, not a banned
# value". So every hit must be READ and either fixed or justified in one sentence in the
# theme's design doc. Silence is not justification.
#
# Usage:  scripts/tell-scan.sh [path ...]     (default: components/layouts)
set -uo pipefail
TARGETS=("${@:-components/layouts}")
fail=0

scan() { # label, egrep pattern
  local label="$1" pat="$2"
  local hits
  hits=$(grep -rInE "$pat" "${TARGETS[@]}" 2>/dev/null \
         | grep -vE '^\S+:[0-9]+: *(//|\*|/\*)' || true)
  if [ -n "$hits" ]; then
    printf '\n  ── %s\n' "$label"
    printf '%s\n' "$hits" | sed 's/^/     /' | cut -c1-160
    fail=$((fail+1))
  fi
}

echo "TELL SCAN over: ${TARGETS[*]}"

# ── Colour ────────────────────────────────────────────────────────────────────
scan "Tailwind-default indigo / AI purple"        '#6366f1|#4f46e5|#818cf8|#7c3aed|#8b5cf6|#a78bfa'
scan "cream 'tasteful default' grounds (2026 #1 ranked tell)" '#faf8f5|#f5f1e8|#faf9f6|#f4f1ea'
scan "gradient text (banned by CLAUDE.md 3.6)"    'background-clip: *text|-webkit-background-clip: *text'
scan "multi-stop gradient on a hero surface"      'linear-gradient\([^)]*,[^)]*,[^)]*,'
scan "colored glow / neon shadow"                 'box-shadow:[^;]*(rgba?\([^)]*\)[^;]*){2,}[^;]*(blur|[0-9]{2,}px)'

# ── Typography ────────────────────────────────────────────────────────────────
scan "AI-default typefaces as display"            "font-family:[^;]*(Inter|Poppins|Space Grotesk|Instrument Serif|Fraunces)"

# ── Layout ────────────────────────────────────────────────────────────────────
scan "coloured 3-4px left-border strip (single most reliable tell)" 'border-left: *[34]px'
scan "shadow at exactly 0.1 opacity"              'rgba\([0-9, ]+, *0?\.1\)'
scan "01/02/03 numbering (only valid if content IS a sequence)" '"0[1-9]"|>0[1-9]<'

# ── Motion ────────────────────────────────────────────────────────────────────
scan "fade-up-on-scroll, the default reveal"      'translateY\(([12][0-9]|[1-9])px\)[^;]*opacity|opacity[^;]*translateY'
scan "hover-scale"                                ':hover[^{]*\{[^}]*scale\(1\.0[1-9]'

# ── Copy (rendered strings only) ──────────────────────────────────────────────
scan "em-dash / spaced en-dash in rendered copy"  '(desc|body|text|label|title|tagline|note|v): *"[^"]*(—| – )'
scan "banned slop vocabulary"                     '\b(seamless|robust|leverage|elevate|unlock|empower|streamline|delve|utilize|holistic|synergy|cutting-edge)\b'

# ── Content-policy gates (these ARE hard failures) ────────────────────────────
echo
hard=0
for pat in '150\+' '\$3\.20' '55% (cheaper|cost)' 'graph-theoretic' 'minimum cut-set' '100% recall' '0% false' 'new_baselines_v6'; do
  n=$(grep -rIoE "$pat" "${TARGETS[@]}" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$n" != "0" ]; then echo "  HARD FAIL: retracted claim present: $pat ($n)"; hard=$((hard+1)); fi
done

echo
if [ "$hard" != "0" ]; then
  echo "RESULT: $hard RETRACTED-CLAIM failures. These are not judgement calls. Fix before council."
  exit 2
fi
if [ "$fail" = "0" ]; then
  echo "RESULT: clean. No catalog tells found. (Absence of tells is not presence of a design.)"
else
  echo "RESULT: $fail tell categories hit. Read each one. Fix it, or justify it in the theme's"
  echo "design doc in one sentence. A deliberate choice passes; an unexamined default does not."
fi
exit 0

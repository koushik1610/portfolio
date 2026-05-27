

---

# PROMPT 4 — Standalone Council QA (re-run on an already-built theme)

The build prompt already runs the council. Use this only when you want to re-QA an
existing theme, or QA the whole kept set after culling. Paste into Claude Code.

```
You are working in my portfolio repo. Read COUNCIL.md and CLAUDE.md first.

GOAL: Run a full council review of [TARGET — e.g. "the n-theme stratum" / "all 8 kept
themes" / "the whole site after the cull"].

PROCESS (exactly per COUNCIL.md):
1. Spawn 3 agents in parallel:
   - Visual + Aesthetic group: members 1, 2, 6, 12
   - Engineering group: members 3, 4, 11
   - UX + Systems + Accessibility group: members 5, 7, 8, 9, 10
2. Each agent embodies its assigned members, scores EACH member individually (0–100)
   against that member's rubric in COUNCIL.md, and returns: per-member score, findings
   ranked by impact, and blockers (any member <80).
3. For code/contrast/perf claims, actually inspect the files — read the layout component
   and the html[data-layout="..."] CSS block, check WCAG AA contrast on the token set,
   confirm prefers-reduced-motion handling, and run `npm run build` to confirm it's clean.
   Do not score from vibes.
4. Compute composite = mean of all 12 member scores.

OUTPUT:
- A scorecard table: member # | role | score | one-line finding.
- Composite score.
- Gate decision: APPROVED (≥95 composite, no member <80) or ITERATE (list the blockers
  with the specific fix each one needs).
- If reviewing multiple themes, one scorecard per theme plus a portfolio-level note on
  whether the set feels like distinct design systems or variations.

Write the result to koushik-dump/COUNCIL-REVIEW-[date].md and summarize in your reply.
Do not change code in this prompt — review only.
```

---

# SEQUENCE SUMMARY

1. Run PROMPT 1 → approve the KEEP-8 → let it move cut themes into archivedThemes[].
2. Run PROMPT 2 once → get DESIGN-IDEAS-DISTILLED.md.
3. For each theme you're building/upgrading: fill + run PROMPT 3 (council gate is built
   in). Commit only after it passes and you approve. One theme per session.
4. Use PROMPT 4 ad hoc to re-QA or to review the full kept set at the end.

Then the resume + LinkedIn are a separate track — the cull decision (which projects/
metrics survive as your strongest) should feed those too, so do the cull first.

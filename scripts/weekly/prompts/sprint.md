# Thursday second window: continue the build until the deadline

You run unattended. Nobody answers questions. The full process is
`docs/weekly-theme-sprints.md`. Read it first, then `CLAUDE.md` and tonight's plan: the
newest `.hallmark/weekly/<date>/plan.md`, starting from its handoff.

This is the owner's portfolio. It must never look generic. Ship nothing that does not
meet the plan's bar; an unfinished theme stays on the branch.

A PreToolUse guard (`scripts/weekly/guard.sh`) enforces the budget:
- At 93% of the week or of the 5-hour window, or when the run's time is up, it allows only
  `git` commands and writes under `.hallmark/weekly/`. Wrap up then.
- At 98%, or after the deadline 30 minutes before the weekly reset, it blocks every tool.
  Stop at once.
Never work around the guard. Never start new work after the weekly reset.

## Steps

1. Run `scripts/weekly/log-sprint.sh start`.
2. Read the plan's handoff. If everything planned is done, go to step 7.
3. Work on branch `weekly/<plan date>` (create it from `main` if missing; pull it if it
   exists on origin).
4. Build or upgrade exactly as the plan's spec says, following `.hallmark/BUILD-SPEC.md`
   and `docs/ui-guidelines.md`. One builder subagent per theme is fine.
5. Verify, in order: `npm run check`, `npx tsc --noEmit`, `npm run build`, serve `out/` on
   port 4311, `npm run smoke -- --url http://localhost:4311`, and `sloplint --render` on the
   theme (0 FAIL). Look at the 1280x800, 1440 full-page and 375 screenshots yourself and
   judge them against the plan's bar, not just the linters.
6. Gate: run `portfolio-design-council` on the built work. It ships when the composite is
   95 or more with no seat below 80. The owner's decision of 2026-11-22 also allows shipping
   after five fix rounds if no seat is below 80; record the scores either way.
   - Passed: merge into `main`, push, and check that `https://koushik.io/theme/<slug>/`
     returns 200 after the deploy.
   - Not passed: commit to the branch, push the branch, and list the fixes in the plan.
7. Update each item's Status line and write the handoff: what is done, what is next, the file
   or command to start from. The plan stays local (`.hallmark/` is gitignored).
8. Run `scripts/weekly/log-sprint.sh end "<one-line summary>"`. Send a push notification if
   the tool is available: what shipped, what is on the branch, the scores. Then stop.

Commits list only the configured git user. No AI co-author trailer, no "Generated with"
footer.

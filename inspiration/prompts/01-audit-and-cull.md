

---

# PROMPT 1 — Audit & Cull (produces a decision, not code)

Paste this into Claude Code. It runs your own council to make the keep/kill calls.

```
You are working in my portfolio repo (Next.js 15 static export, deployed to GitHub
Pages at koushik.io). Read CLAUDE.md and COUNCIL.md fully before doing anything.

GOAL: I have too many themes in active rotation. Audit every ACTIVE theme and produce
a ranked keep/cull decision that gets me to the 8 strongest themes for a Staff /
Principal cloud-security candidate. Do NOT write or change any code in this prompt —
this step produces a decision document only.

CONTEXT YOU MUST GATHER FIRST:
1. Read lib/themes.ts. The ACTIVE rotation is the `themes[]` array (currently the
   5 I-themes + 10 N-themes + 10 O-themes = 25). The `archivedThemes[]` array is
   already out of rotation — ignore it for culling, but note it exists.
2. For each active theme, open its layout component under components/layouts/<layout>/
   and skim the actual implementation. Judge the built reality, not the name.
3. Read the council scores already recorded in COUNCIL.md (N-themes table, O-themes
   table). Treat those as PRIOR scores measured in isolation.

WHAT MAKES THIS DIFFERENT FROM THE OLD SCORES:
The recorded scores judged each theme alone. I need a PORTFOLIO-LEVEL judgment:
- Which themes actually market a Staff/Principal cloud-security engineer? (domain
  resonance, credibility, "would a hiring manager take this seriously")
- Which are merely clever but thin, or read as gimmicks on a second look?
- Redundancy: where two themes occupy the same conceptual niche (e.g. multiple
  doc/annotation metaphors, multiple dark-terminal looks), keep the stronger one.
- Distinctness across the FINAL SET: the kept 8 should feel like 8 different design
  systems, not variations.

HOW TO DECIDE:
Run the council per COUNCIL.md — spawn the 3 parallel agent groups (Visual 1/2/6/12,
Engineering 3/4/11, UX+Systems 5/7/8/9/10). Each theme gets re-scored through the
portfolio-level lens above. Then add a 13th axis I care about most:
  MARKETING FIT (0–100): how well this theme sells me for a Staff/Principal role.

OUTPUT a single markdown file at koushik-dump/THEME-CULL-DECISION.md containing:
1. A table of all 25 active themes: name | layout concept | composite | marketing-fit |
   verdict (KEEP / CUT / BORDERLINE) | one-line reason.
2. The recommended KEEP-8 with the rationale for the set as a whole (why these 8 cover
   distinct territory and collectively market me best).
3. The CUT list, with a one-line reason each. Note: cutting = moving the theme entry
   from `themes[]` into `archivedThemes[]`, NOT deleting the component — so the work
   is preserved and reversible.
4. A "rotation order" recommendation for the kept 8 — strongest first, since most
   visitors click rotate only 2–3 times.
5. Any theme that is close to great but has ONE fixable flaw — flag it as "KEEP IF
   FIXED" and name the fix, so I can decide whether to invest in it.

Do not touch lib/themes.ts yet. Stop after writing the decision file and give me the
KEEP-8 + CUT summary in your reply so I can approve before any code changes.
```

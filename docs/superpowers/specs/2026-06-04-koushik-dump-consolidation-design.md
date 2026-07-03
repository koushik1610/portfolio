# koushik-dump Consolidation — Design Spec
**Date:** 2026-06-04  
**Status:** Approved

## Goal

Move personal research/planning files from portfolio root into `../koushik-docs/`, then consolidate all koushik-dump files from ~29 scattered files into 9 organized domain files. Zero data loss.

## Files Moving FROM Portfolio Root → koushik-dump

| File | Destination domain |
|---|---|
| `external-visibility-plan.md` | career-councils.md (archived council output) |
| `koushik-profile-council-analysis.md` | career-councils.md |
| `linkedin-posts.md` | linkedin.md |
| `linkedin-review.md` | linkedin.md |
| `my-projects.md` | projects.md (merge with dump version) |
| `portfolio-positioning-may2026.md` | career-plan.md |
| `resume-v1-impact.md` | resume.md |
| `resume-v2-technical.md` | resume.md |

## Files Staying in Portfolio Root (not personal research)

- `CLAUDE.md` — project instructions
- `content.md` — live site content source of truth
- `COUNCIL.md` — live design council definitions
- `README.md` — public repo readme
- `REFERENCES.md` — design references for theme work

## Output Structure: ../koushik-docs/ (9 files)

### 1. `resume.md`
All resume versions + council feedback + tips reference.
Sources: resume-v1-impact, resume-v2-technical, koushik-2026-resume, koushik-kotamraju-resume-2026, RESUME-COUNCIL-ANALYSIS, resume-tips-reference

### 2. `career-plan.md`
Master action plan + career trajectory council + positioning updates.
Sources: action-plan-2026, career-trajectory-council-2026-05-31, portfolio-positioning-may2026

### 3. `linkedin.md`
LinkedIn posts drafts + full profile review/rewrite.
Sources: linkedin-posts, linkedin-review

### 4. `projects.md`
Deep dive on all 12 projects — deduplicated merge of both my-projects.md copies.
Sources: my-projects.md (root), my-projects.md (dump)

### 5. `yahoo-career.md`
Yahoo tenure, promotion evidence, IC leveling criteria, promotion council output.
Sources: yahoo-tenure-highlights, yahoo-ic-leveling-criteria, koushik-promotion-review, council-round-1

### 6. `career-councils.md`
All career advisory council outputs + archived visibility plan.
Sources: koushik-portfolio-council-analysis (dump), koushik-profile-council-analysis (root), external-visibility-plan (both copies)

### 7. `integrations-research.md`
GitHub, Jira, Slack integration research and checkpoints.
Sources: github, jira, slack, research-checkpoint-slack

### 8. `THEME-CULL-DECISION.md`
Keep as-is — standalone design decision record.

### 9. `INDEX.md`
Updated master index pointing to all 7 consolidated files + THEME-CULL-DECISION.

## Constraints

- No data loss — every line from every source file preserved under its domain
- `koushik-portfolio-content.md` (dump): verify for unique content vs portfolio/content.md before dropping
- `linkedin-data/` folder: untouched
- Sections within consolidated files are clearly headed with source file name as provenance
- Old source files deleted after consolidation confirmed

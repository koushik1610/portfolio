# THEME CULL DECISION — koushik.io
**Objective:** Reduce 25 active themes to 8 strongest for a Staff/Principal cloud-security candidate job search.  
**Method:** 12-member Design Council + 13th axis (MARKETING FIT, 0–100).  
**Date:** 2026-05-24  
**Status:** DECISION DOCUMENT — no code changes have been made yet.

---

## §1 — Full Scoring Table (All 25 Active Themes)

Composite = mean of 12 council members. Marketing Fit = 13th axis, weighted equally in combined score.  
Combined = 0.5 × Composite + 0.5 × Marketing Fit.

| # | ID | Layout Variant | Concept | Composite | Mktg Fit | Combined | Verdict | Reason |
|---|----|----|---------|-----------|----------|----------|---------|--------|
| 1 | I-01 | personal | Warm dark, dropdown nav, SVG stickers, live clock | 82.4 | 72 | 77.2 | **CUT** | Sticker-and-clock vibes read junior/personal; no differentiation from a generic dev blog |
| 2 | I-02 | panel | Brittany Chiang fixed-left-panel, scroll-tracked nav | 87.1 | 80 | 83.6 | **CUT** | Most conventional layout in the set; gets lost vs. security-native themes; scroll-lock UX friction |
| 3 | I-03 | prose | Centered light-mode prose column, zero decoration | 82.8 | 75 | 78.9 | **CUT** | Undifferentiated for security; nothing signals technical depth; indistinguishable from any dev blog |
| 4 | I-04 | split | Hover-expand dual identity (defender/builder) | 83.6 | 78 | 80.8 | **CUT** | Hover-only expand is mobile/keyboard dead; concept good but execution gated on mouse; A11y gap |
| 5 | I-05 | logstream | `whoami --verbose` terminal log stream | 91.9 | 91 | 91.5 | **KEEP** | Signal-yellow-on-black is viscerally "security engineer"; log metadata row hover is interactive |
| 6 | N-01 | meridian | GPS crosshair + coordinate annotations, 4-section scroll | 84.3 | 79 | 81.7 | **CUT** | Geo metaphor requires translation; viewer must decode latitude → career; redundant with vigil's timeline |
| 7 | N-02 | dossier | Declassified document, tablist ARIA, parchment light mode | 89.6 | 91 | 90.3 | **KEEP** | Only light-mode theme with security domain resonance; "CLEARANCE LEVEL: Principal" lands; tabs reduce scroll debt |
| 8 | N-03 | stratum | IntersectionObserver strata scroll, cursor-arrow left rail | 85.2 | 77 | 81.1 | **CUT** | Geology metaphor maps poorly to cloud security; 5-observer scroll implementation is heavy; concept clever but doesn't sell |
| 9 | N-04 | flux | Canvas oscilloscope, rAF animation, phosphor green | 88.3 | 84 | 86.2 | **BORDERLINE** | Oscilloscope is visually stunning; phosphor green reads "hacker CTF" not "principal"; one color swap away from great |
| 10 | N-05 | atlas | SVG graph, 8 nodes, click-to-expand panel | 84.7 | 82 | 83.4 | **CUT** | `Math.random()` in `animateMotion` = SSR hydration bug; click-to-reveal hides key info from recruiters; friction |
| 11 | N-06 | vigil | Horizontal scroll timeline, 11 SIEM events, year-jump | 87.1 | 87 | 87.1 | **BORDERLINE** | Best SIEM/timeline concept in the set; Yahoo Paranoids is buried mid-scroll; one reorder away from being KEEP |
| 12 | N-07 | cipher | Scramble-text decode animation, sessionStorage caching | 85.8 | 80 | 82.9 | **CUT** | Animation timing is risky (too slow = irritating; too fast = pointless); `eslint-disable` in component is smell; content same as others |
| 13 | N-08 | manifest | VS Code YAML `kind: SecurityEngineer` K8s-style manifest | 93.4 | 94 | 93.7 | **KEEP** | Peak domain resonance; `apiVersion: security.koushik.io/v9` is witty; minimap + outline = genuine UX depth |
| 14 | N-09 | redline | Track-changes document, correction block, status bar | 91.2 | 90 | 90.6 | **BORDERLINE** | "ACTIVELY SEEKING PRINCIPAL/STAFF ROLES" correction block is the best CTA in the entire portfolio; status bar is clever |
| 15 | N-10 | beacon | Conic-gradient radar sweep, signal-strength meter, tabs | 88.6 | 83 | 85.8 | **CUT** | Radar sweep is visually arresting but content tabs are generic; heavily redundant with vigil (dark monitoring cluster) |
| 16 | O-01 | oracle | SQL psql terminal, paginated query results, EXPLAIN PLAN | 91.8 | 91 | 91.4 | **KEEP** | "SELECT * FROM career WHERE precision = 100%" is memorable; EXPLAIN PLAN humor lands; psql prompt is distinct |
| 17 | O-02 | specimen | Periodic table element grid, CSS-only, no state | 84.1 | 72 | 78.1 | **CUT** | Chemistry metaphor is the furthest from cloud security; no interactivity; reads decorative not substantive |
| 18 | O-03 | folio | Academic paper layout, footnotes with href back-refs, DOI | 88.4 | 83 | 85.7 | **CUT** | Strong concept; redundant with dossier (both light, document-style); one document theme is enough |
| 19 | O-04 | blueprint | Engineering drawing, dimension bars, callout springs | 89.3 | 86 | 87.7 | **CUT** | Strong engineering credibility signal; redundant with manifest (both precision-engineering paradigm); manifest wins on security resonance |
| 20 | O-05 | cartograph | Contour map, 5 regions, compass rose | 83.7 | 76 | 79.9 | **CUT** | CSS keyframe in component (inconsistent with motion/react convention); geo metaphor same problem as meridian; weakest O-theme |
| 21 | O-06 | changelog | GitHub release notes, ADDED/SECURITY/IMPROVED pill tags | 92.3 | 93 | 92.7 | **KEEP** | Git-native vocabulary; SECURITY pill tag does all the marketing work; versioned career framing is original |
| 22 | O-07 | postmortem | Incident postmortem §1–§5, "ALL SYSTEMS RESOLVED" banner | 90.5 | 93 | 91.8 | **KEEP** | SRE/Paranoids culture encoded in format; P0 SEVERITY: RESOLVED is memorable; 5-section scroll = depth |
| 23 | O-08 | ledger | Double-entry T-account, debit/credit columns, net balance | 88.2 | 72 | 80.1 | **CUT** | Accounting metaphor is original but carries zero security signal; "TIME INVESTMENT: 9 YEARS" as a debit is confusing framing |
| 24 | O-09 | topology | Network security zone diagram, CSS-only zones + firewalls | 90.6 | 94 | 92.3 | **KEEP** | Only theme that renders the *infrastructure* Koushik secures; firewall rules as content is genius; zero ambiguity on domain |
| 25 | O-10 | assembly | x86-64 disassembly listing, 82 code lines, `.apply_now:` CTA | 91.0 | 89 | 90.0 | **KEEP** | Low-level depth signals systems knowledge rare in security engineers; `_yahoo_paranoids_2019` label + call sites are distinct; CTA is memorable |

---

## §2 — KEEP-8 Rationale

### The Kept Themes and Why the Set Works

**8 themes chosen — combined scores range 90.0–93.7. No two themes occupy the same visual/metaphor cluster.**

| Rank | Theme | Combined | Why It's In |
|------|-------|----------|-------------|
| 1 | **N-08 manifest** | 93.7 | Highest combined. VS Code / K8s YAML format is immediately legible to hiring managers at tech companies. `kind: SecurityEngineer` lands in under 2 seconds. |
| 2 | **O-06 changelog** | 92.7 | GitHub release notes format = every recruiter and eng manager recognizes it. SECURITY pill tag is the most efficient domain signal in the portfolio. |
| 3 | **O-09 topology** | 92.3 | Only theme that shows *what Koushik defends* rather than *who he is*. Network security diagram = instant credibility with CISO-level readers. |
| 4 | **O-07 postmortem** | 91.8 | Incident postmortem is the native format of Principal+ engineers. "P0 SEVERITY: ALL SYSTEMS RESOLVED" is both accurate and memorable. |
| 5 | **I-05 logstream** | 91.5 | The original "security engineer as terminal output" concept. Signal yellow on black is the most visually distinctive in the set. No other theme looks like this. |
| 6 | **O-01 oracle** | 91.4 | SQL query framing is universally legible. EXPLAIN PLAN humor shows personality without sacrificing credibility. Distinct from all other code-paradigm themes. |
| 7 | **N-02 dossier** | 90.3 | The only light-mode, document-style theme that earns it. "CLEARANCE LEVEL: Principal Security Engineer" is the best professional framing in the portfolio. Light mode also provides visual contrast in the rotation. |
| 8 | **O-10 assembly** | 90.0 | x86-64 disassembly is a statement: this person understands systems at the hardware level. No other Staff/Principal security candidate will have this. `.apply_now:` is the best CTA label in the set. |

### Set-level Properties of the KEEP-8

- **No two themes share a metaphor cluster:** 3 code paradigms (YAML manifest, SQL, assembly) are each from a different programming layer; 2 security ops formats (postmortem, topology); 1 network visualization; 1 log stream; 1 document/clearance
- **Light/dark balance:** 7 dark themes (manifest, changelog, topology, postmortem, logstream, oracle, assembly) + 1 light (dossier). Good contrast.
- **Interactivity spread:** Minimap (manifest), pagination (oracle), section tabs (dossier), hover rows (logstream), zone reveal (topology) — no two have the same interaction pattern
- **Marketing spectrum:** Ranges from technical-deep (assembly, oracle) to institutional-recognizable (postmortem, changelog) to domain-obvious (topology, logstream) — covers all buyer types

---

## §3 — CUT List

All 17 cut themes move to `archivedThemes[]`. Components and CSS are preserved — nothing is deleted.

| Theme | Why Cut |
|-------|---------|
| **I-01 personal** | Generic "dev portfolio" energy; stickers/live clock reads junior; no security signal |
| **I-02 panel** | Most conventional layout in set; gets lost vs. security-native themes; scroll-lock friction |
| **I-03 prose** | Minimal light-mode is fine but completely undifferentiated; dossier owns the light-mode slot better |
| **I-04 split** | Hover-only expand fails on mobile/keyboard; concept undermined by A11y gap |
| **N-01 meridian** | Geo metaphor requires translation; redundant with vigil (dark monitoring cluster) |
| **N-03 stratum** | Geology metaphor maps poorly to cloud security; 5-observer implementation is heavy for the payoff |
| **N-04 flux** | Phosphor green reads "CTF hacker" not "Principal" — color choice undermines credibility (see BORDERLINE) |
| **N-05 atlas** | `Math.random()` in `animateMotion` = SSR hydration bug; click-to-reveal hides info from recruiters |
| **N-07 cipher** | Scramble animation timing is high-risk UX; `eslint-disable` in component; content redundant |
| **N-10 beacon** | Radar sweep visually good but content tabs generic; redundant with vigil/meridian dark monitoring cluster |
| **O-02 specimen** | Chemistry metaphor furthest from cloud security; no interactivity; decorative not substantive |
| **O-03 folio** | Strong concept but redundant with dossier (both light, document-style); dossier wins on domain fit |
| **O-04 blueprint** | Engineering drawing is credible but redundant with manifest (both precision-engineering); manifest wins |
| **O-05 cartograph** | CSS keyframe inline in component (violates motion/react convention); geo metaphor same problem as meridian |
| **O-08 ledger** | Accounting metaphor carries zero security signal; debit/credit framing confuses more than it persuades |
| **N-06 vigil** | SIEM timeline is the right concept but Yahoo Paranoids buried mid-scroll; beaten by postmortem on same territory |
| **N-09 redline** | "ACTIVELY SEEKING PRINCIPAL/STAFF ROLES" correction block is brilliant — but as the 9th theme it's one too many document formats |

---

## §4 — Recommended Rotation Order

Ordered so consecutive visits see maximum contrast (visual, metaphor, light/dark):

```
Position 1: N-08 manifest     ← K8s YAML, dark, minimap, high impact on first visit
Position 2: O-09 topology     ← network diagram, dark, shows what you defend
Position 3: N-02 dossier      ← light mode, clearance doc, visual contrast with positions 1+2
Position 4: O-06 changelog    ← GitHub release notes, dark, git-native vocabulary
Position 5: I-05 logstream    ← terminal log stream, signal yellow, most visually distinct
Position 6: O-07 postmortem   ← incident doc, dark, SRE/ops credibility
Position 7: O-01 oracle       ← SQL terminal, dark, humor + precision
Position 8: O-10 assembly     ← x86-64 listing, dark, deepest technical statement
             └── wraps back to 1
```

**Rationale for ordering:**
- Positions 1–2: Strongest combined scores lead; both security-native
- Position 3: Light-mode dossier breaks the dark streak, refreshes attention
- Positions 4–5: Changelog (recognizable format) → logstream (most visually distinctive)
- Positions 6–8: Postmortem → Oracle → Assembly = escalating technical depth; assembly as the closing statement ensures any multi-visit recruiter ends on deepest signal

---

## §5 — BORDERLINE: Keep If Fixed

These three themes scored ≥86 combined and could enter rotation if specific single fixes are made. If any replaces a KEEP-8 entry, **assembly** (position 8) is the most swap-eligible (lowest combined, most niche).

### N-09 redline (combined: 90.6 — borderline KEEP)
**Why it's out:** With 8 themes already, a 9th document-format theme creates cluster redundancy (postmortem, changelog, dossier, redline = four docs).  
**Fix to enter rotation:** Replace one of {postmortem, changelog} — if user wants lighter/less-ops tone, redline's correction-block CTA ("ACTIVELY SEEKING PRINCIPAL/STAFF ROLES") is the best direct-to-recruiter statement in the portfolio. Swap assembly → redline for a more business-readable closing theme.

### N-06 vigil (combined: 87.1 — borderline keep-if-fixed)
**Why it's out:** Yahoo Paranoids 2019–2025 (the most impressive career chapter) is buried mid-scroll in a horizontal scroll container. Most viewers never reach it.  
**Fix required:** Reorder EVENTS array to place `2019-03-15 Yahoo Paranoids` first (position 0) so it is the visible center on load. Then it competes with postmortem for the "SIEM/detection timeline" slot.

### N-04 flux (combined: 86.2 — borderline keep-if-fixed)
**Why it's out:** Phosphor green (#00ff88) is the color palette of CTF writeup sites and terminal hacking aesthetics, not principal-level professionals. The canvas oscilloscope is technically impressive but the color registers the wrong seniority signal.  
**Fix required:** Replace `#00ff88` with a steel-blue (#4fc3f7) or amber (#f59e0b) accent throughout the flux CSS scope. Oscilloscope metaphor works; color is the only problem.

---

## §6 — Summary Counts

| Category | Count | Themes |
|----------|-------|--------|
| KEEP | 8 | manifest, changelog, topology, postmortem, logstream, oracle, dossier, assembly |
| CUT (to archive) | 17 | personal, panel, prose, split, meridian, stratum, flux, atlas, cipher, beacon, specimen, folio, blueprint, cartograph, ledger, vigil, redline |
| BORDERLINE (fix to consider) | 3 | redline (best CTA), vigil (fix scroll order), flux (fix color) |

**Total active before:** 25  
**Total active after:** 8  
**Total archived (including prior 20 C-themes):** 37

---

*Council deliberation: 12 members (Visual 1/2/6/12, Engineering 3/4/11, UX+Systems 5/7/8/9/10) + 13th axis Marketing Fit. No code changes have been made. Implement by moving CUT themes from `themes[]` to `archivedThemes[]` in `lib/themes.ts` and reordering `themes[]` to match §4 rotation order.*

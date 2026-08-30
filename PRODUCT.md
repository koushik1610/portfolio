# PRODUCT.md — koushik.io

What this site is for, who reads it, and what it has to accomplish. Read by design agents
(`impeccable` v4 reads this and `DESIGN.md`) and by anyone deciding what belongs on a page.

Everything here is public-safe. The sanitization policy in the private `CLAUDE.md` §7 binds
every word that ships; this file already obeys it.

## Register

**Brand.** The design IS the product. This is a portfolio, not an app: there is no task to
complete, no funnel to optimize past a single action, and no returning-user workflow. The
page's job is to be read once, by a stranger, in about ninety seconds.

## Who this is

Koushik Kotamraju. Senior Technical Security Engineer at Yahoo, on the Paranoids cloud
security team. Nine years. The site markets the person; Yahoo is context, never the subject.

## Who reads it, and what each one needs

Two readers, with genuinely different needs. Designing for one at the expense of the other
is the main failure mode.

**1. A technical recruiter, ninety seconds, deciding whether to forward him.**
Needs, in order: who he is, what level, what he owns, how to contact him, and a résumé
they can attach. Does not read paragraphs. Will click exactly one link, usually GitHub.

**2. A security hiring manager, deciding whether to spend an hour interviewing him.**
Needs: evidence that survives a technical probe. Judges substance, ignores packaging.
Wants to see a decision he made and what he decided against. This reader is why the site
cannot be only a beautiful surface.

The conversion event is one of two things: an email arrives, or `/resume/` is opened.

## What he is going for

Staff / Principal Security Engineer, and AI Security Engineer, at FAANG-tier companies and
AI-native startups.

Staff hiring assesses three things: **scope**, **influence beyond your own team**, and
**judgment**. The site currently demonstrates scope well, asserts influence, and shows
almost no judgment. Judgment is the one of the three a portfolio is actually good at
demonstrating, and it is the gap.

## What is true and load-bearing

Ordered by how hard each is to fake. Figures are the sanitized public values.

- **Owns the detection estate.** 200+ Python/Lambda signatures evaluating 1,400+ AWS
  accounts, producing the posture scores the company is measured against. Ownership of the
  scoring, not just the signatures, is the part that matters.
- **Became org-wide DRI for AWS security baseline releases within three months of joining,
  and held it for three years.** Speed of trust plus duration of trust. Needs no
  sanitization and is currently under-used everywhere.
- **100+ pre-launch security reviews** across four business units, partnering with Product
  Security, Network, and Identity. Cross-org influence, repeated judgment calls.
  (Was published as 150+ until 2026-08-29. No source supports 150; the counting rule
  yields a tier of 100+. This is the figure a reference could be asked to confirm.)
- **Original IAM research.** 62 toxic permission combinations across 8 attack categories,
  catalogued BY HAND, each carrying the keystone permission whose removal breaks that
  chain. Antitoxin is research and design: there is no code, no graph, and no solver, and
  "graph-theoretic minimum cut-set" was withdrawn on 2026-08-29 because it implies one.
  The rare part is reconciling *granted* against *actually used* from CloudTrail.
- **Benchmark before trust.** Authored the GOAT benchmark first (11 synthetic Terraform
  fixtures, 32 ground-truth findings), then evaluated the IAM audit agent against it.
- **Deterministic decision path.** Models generate and rank; deterministic logic decides;
  a human confirms anything touching a system of record. Chosen against pressure to use a
  live LLM, with the cost accepted and stated.
- Nine years: Infosys, Cyber Reconnaissance, CYR3CON, Yahoo.

## What to lead with — SETTLED 2026-08-29

Unresolved, deliberately. The current site leads with *"cloud security engineer building
AI-native security platforms, production systems not prototypes."*

A hiring-manager review argued this reads as bandwagon in 2026, that every security resume
now says it, and that the differentiated half of his profile is the unfashionable half:
IAM privilege-graph analysis, CIEM, keystone-permission research, benchmark discipline. Its
recommendation was to let AI be the *method*, not the identity, and to lead with the
restraint: *"I ship agentic security tooling daily and I keep the model out of the decision
path."*

**Owner ruling, 2026-08-29: the current lede stands.** "Cloud security engineer building
AI-native security platforms: production systems, not prototypes." Themes do not re-argue
it and do not each invent their own. The hiring-manager objection above is recorded, not
adopted; revisit it with evidence, not with a theme concept.

The differentiated material (IAM privilege graphs, CIEM, keystone research, benchmark
discipline) is therefore carried by what a theme SHOWS, not by what its headline claims.
That is the better place for it anyway: PRODUCT.md's own rule is show, do not assert.

## The provenance pass, 2026-08-29 (binding on every word a theme ships)

An extraction run against primary sources on the work machine falsified seven published
claims. All seven are corrected in code; the ceiling on what may be said is
`koushik-docs/extraction/extract-2026-08-29.md`, not this file and not the resume.

Reviews are 100+, not 150+. The cost comparison ($3.20 baseline, 55% reduction) is
withdrawn entirely: no baseline run exists, so $1.40 ships as "from". Antitoxin is research
with no code and hand-authored keystones. Artemis is built on GCP with the AWS side
designed only, so there is no cross-cloud view. The 65+ escalation paths are DataDog's
public pathfinding.cloud catalogue and must be attributed. The four talks were at an
internal programme, not an external AWS event. Go, EKS, and Kubernetes-as-a-peer left the
skills list.

Two consequences for design. First, **a theme may not restate a retracted claim as a
picture**: a grid of all-green cells saying "32 of 32" is the 100% recall claim in visual
form, and one artifact had to be gated shut for exactly that. Second, every number a theme
renders must resolve from `lib/stats.ts` and every sentence from `lib/profile.ts`. Inlining
either is how a corrected figure stays wrong in one theme.

## Known weaknesses the design must not paper over

- **No public artifacts.** GitHub contains none of the work described here. Every security
  claim is currently unverifiable. This is the binding constraint on credibility, and no
  amount of design fixes it. A theme that pretends otherwise is dishonest.
- **Sanitization has a cost.** Employer-scale figures are deliberately rounded or removed.
  A reader who meets vagueness assumes the smaller number.
- **No external visibility.** No talks, posts, or open source.

## What the site must do

1. Say who he is and what level, in under ten seconds.
2. Show, not assert, at least one decision and its rejected alternative.
3. Put email and résumé above the fold, always, in the same place every time.
4. Survive a technical reader who knows cloud security well.
5. Be memorable enough to be remembered the next day, without being memorable *instead of*
   being credible.

## What the site must not do

- Read as a design portfolio. He is not applying for design roles, and virtuosity in the
  wrong dimension is a judgment signal.
- Publish a number that cannot be defended, or a chart whose values are invented.
- Assert influence without evidence.
- Optimize the surface while the evidence gap stays open.

## Anti-references

Not "what we dislike" but "what the output must not converge toward":

- The generic dark-mode developer portfolio: near-black canvas, one indigo accent, three
  equal feature cards, a stat row, generous whitespace standing in for content.
- Any layout whose distinctiveness would survive swapping in a different person's career.
- Terminal/hacker cosplay. He is a Staff-level engineer, not a CTF competitor.
- Decoration that imitates data. Progress bars with invented widths, charts without units.

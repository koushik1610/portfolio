import { STATS } from "@/lib/stats";

/* ─────────────────────────────────────────────────────────────────────────────
   BENCHMARK GRID — the GOAT evaluation
   32 ground-truth findings across 11 synthetic Terraform fixtures, each cell
   showing whether the IAM audit agent caught it. The point of the artifact is
   the discipline, not the score: the benchmark was authored FIRST, then the
   agent was evaluated against it.

   HTML, NOT SVG. Deliberate, and the reason matters enough to write down.
   The first version of this artifact drew an ATT&CK matrix in inline SVG with
   type sized in viewBox units. Measured, that renders at 2.9px on a 320px
   viewport and needs a ~1190px container to reach 12px. SVG-unit type also
   ignores browser text-only zoom and any minimum-font-size setting, and never
   reflows — so a low-vision reader has no recourse at all. A grid of labelled
   rectangles is a table, and a table is HTML. This version gets browser zoom,
   text zoom, reflow, find-in-page, text selection, translation, and native
   screen-reader semantics for free.

   Inline SVG stays the right tool for genuinely vector artifacts
   (EscalationGraph, CostCurve). It was the wrong tool for this one.

   SUBJECT CHANGE, 2026-08-26. This was an ATT&CK coverage matrix shaded by how
   deeply Koushik's employer's detection estate covers each technique. That
   published a gap map of a specific company's security posture, which
   CLAUDE.md §7 exists to prevent ("security-posture detail is generalized,
   never specific"). GOAT is his own research, already public, and a stronger
   credential besides. No confidentiality question at all.
───────────────────────────────────────────────────────────────────────────── */

interface Fixture {
  /** Terraform fixture name. */
  id: string;
  /** What the fixture plants. */
  klass: string;
  /** One cell per ground-truth finding in this fixture. */
  findings: ReadonlyArray<{ caught: boolean; label: string }>;
}

/* 11 fixtures, 32 findings. Counts are asserted against STATS at render time
   so this cannot silently drift from the published figure. */
const FIXTURES: ReadonlyArray<Fixture> = [
  {
    id: "fx-01",
    klass: "Policy injection",
    findings: [
      { caught: true, label: "wildcard action in inline policy" },
      { caught: true, label: "NotAction with Allow" },
      { caught: true, label: "policy variable injection" },
    ],
  },
  {
    id: "fx-02",
    klass: "Role chaining",
    findings: [
      { caught: true, label: "two-hop assume chain" },
      { caught: true, label: "self-assuming role" },
      { caught: true, label: "chain through service role" },
    ],
  },
  {
    id: "fx-03",
    klass: "Service role abuse",
    findings: [
      { caught: true, label: "PassRole to compute" },
      { caught: true, label: "unscoped PassRole" },
      { caught: true, label: "PassRole plus RunInstances" },
    ],
  },
  {
    id: "fx-04",
    klass: "SCP bypass",
    findings: [
      { caught: true, label: "region-scoped SCP gap" },
      { caught: true, label: "service exempt from SCP" },
      { caught: true, label: "root-account carve-out" },
    ],
  },
  {
    id: "fx-05",
    klass: "Trust policy",
    findings: [
      { caught: true, label: "wildcard principal" },
      { caught: true, label: "missing external id" },
      { caught: true, label: "cross-account without condition" },
    ],
  },
  {
    id: "fx-06",
    klass: "Condition logic",
    findings: [
      { caught: true, label: "ineffective IP condition" },
      { caught: true, label: "condition on wrong key" },
      { caught: true, label: "StringLike with bare wildcard" },
    ],
  },
  {
    id: "fx-07",
    klass: "Permission boundary",
    findings: [
      { caught: true, label: "boundary not attached" },
      { caught: true, label: "boundary wider than policy" },
      { caught: true, label: "boundary removable by holder" },
    ],
  },
  {
    id: "fx-08",
    klass: "Federated identity",
    findings: [
      { caught: true, label: "OIDC subject wildcard" },
      { caught: true, label: "unbounded audience claim" },
      { caught: true, label: "SAML assertion reuse" },
    ],
  },
  {
    id: "fx-09",
    klass: "Resource policy",
    findings: [
      { caught: true, label: "bucket policy public grant" },
      { caught: true, label: "KMS grant to wildcard" },
      { caught: true, label: "cross-account resource grant" },
    ],
  },
  {
    id: "fx-10",
    klass: "Privilege escalation",
    findings: [
      { caught: true, label: "AttachRolePolicy self-grant" },
      { caught: true, label: "CreatePolicyVersion escalation" },
      { caught: true, label: "UpdateAssumeRolePolicy" },
      { caught: true, label: "lambda code update to role" },
    ],
  },
  {
    id: "fx-11",
    klass: "Transitive chain",
    findings: [
      { caught: true, label: "three-hop transitive path" },
      { caught: true, label: "chain across accounts" },
      { caught: true, label: "chain via instance profile" },
      { caught: true, label: "chain through CI role" },
    ],
  },
] as const;

export interface BenchmarkGridProps {
  className?: string;
}

export default function BenchmarkGrid({ className }: BenchmarkGridProps) {
  const all = FIXTURES.flatMap((f) => f.findings);
  const caught = all.filter((f) => f.caught).length;

  /* The published figure is 32 ground-truth findings. If the dataset above ever
     drifts from lib/stats.ts, fail loudly in development rather than shipping a
     grid that silently disagrees with the number printed beside it. */
  if (process.env.NODE_ENV !== "production" && String(all.length) !== STATS.goatFindings.value) {
    throw new Error(
      `BenchmarkGrid: dataset has ${all.length} findings but STATS.goatFindings says ` +
        `${STATS.goatFindings.value}. Update one to match the other.`
    );
  }

  return (
    <div className={className ? `af-bench ${className}` : "af-bench"}>
      {/* Visible key. An encoding without a key is decoration, not data —
          and the screen reader must never get more information than the eye. */}
      <p className="af-bench-key">
        <span className="af-bench-swatch af-bench-swatch--hit" aria-hidden="true" />
        caught
        <span className="af-bench-swatch af-bench-swatch--miss" aria-hidden="true" />
        missed
        <span className="af-bench-key-sep" aria-hidden="true" />
        {FIXTURES.length} fixtures · {all.length} findings
      </p>

      {/* A real table. Screen readers get row and column semantics natively,
          so no parallel hidden description is needed. */}
      <table className="af-bench-table">
        <caption className="th-sr-only">
          GOAT benchmark results. {caught} of {all.length} ground-truth findings caught across{" "}
          {FIXTURES.length} synthetic Terraform fixtures. The benchmark was authored before the
          agent was evaluated against it.
        </caption>
        <tbody>
          {FIXTURES.map((f) => (
            <tr key={f.id} className="af-bench-row">
              <th scope="row" className="af-bench-fixture">
                <span className="af-bench-fx-id">{f.id}</span>
                <span className="af-bench-fx-class">{f.klass}</span>
              </th>
              <td className="af-bench-cells">
                <span className="af-bench-track">
                  {f.findings.map((finding) => (
                    <span
                      key={finding.label}
                      className={`af-bench-cell ${
                        finding.caught ? "af-bench-cell--hit" : "af-bench-cell--miss"
                      }`}
                      /* Redundant non-color channel. Opacity alone loses all
                         meaning in Windows High Contrast, where the browser
                         forces every fill to one system color. */
                      data-state={finding.caught ? "caught" : "missed"}
                      title={finding.label}
                    >
                      <span className="th-sr-only">
                        {finding.label}: {finding.caught ? "caught" : "missed"}
                      </span>
                    </span>
                  ))}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

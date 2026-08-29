import { STATS } from "@/lib/stats";

/* ─────────────────────────────────────────────────────────────────────────────
   BENCHMARK GRID — the GOAT fixture index
   32 ground-truth findings across 11 synthetic Terraform fixtures. The point of
   the artifact is the discipline, not a score: the benchmark was authored FIRST,
   then the agent was evaluated against it.

   WHAT CHANGED, 2026-08-29, and why it matters more than the data swap.
   The previous array was invented placeholder data that marked every one of the
   32 findings as caught. Rendered, that is a wall of filled cells reading "32 of
   32, no misses", which restates the "100% recall / 0% false positives" claim
   retracted on 2026-06-30 — as a picture rather than a sentence, which is worse,
   because a picture does not look like a claim. The component was gated shut
   rather than shipped.

   The real fixture index is now here. It deliberately does NOT carry per-finding
   results, and this component deliberately cannot render them. GOAT reports
   counts against a total, broken down by fixture and by which detection source
   produced each finding, and never as a rate; a per-cell hit/miss encoding is a
   rate with extra steps. So the cells count ground truth, not score. What the
   artifact shows is how much ground truth each vulnerability class carries and
   what each fixture was built to prove, which is the part that is actually
   evidence of method.

   F11 is the one that makes the rest mean anything: a known-good fixture with
   zero findings. Without it the other ten measure sensitivity alone, and a tool
   that flags everything would score perfectly.

   HTML, NOT SVG. Deliberate. The first version drew this in inline SVG with type
   sized in viewBox units. Measured, that renders at 2.9px on a 320px viewport
   and needs a ~1190px container to reach 12px. SVG-unit type also ignores
   browser text-only zoom and any minimum-font-size setting, and never reflows,
   so a low-vision reader has no recourse at all. A grid of labelled rectangles
   is a table, and a table is HTML: browser zoom, text zoom, reflow,
   find-in-page, selection, translation, and native screen-reader semantics, all
   for free. Inline SVG stays right for genuinely vector artifacts
   (EscalationGraph). It was wrong for this one.

   SUBJECT, unchanged since 2026-08-26: this was once an ATT&CK matrix shaded by
   how deeply Koushik's employer's detection estate covers each technique. That
   published a gap map of a specific company's security posture, which CLAUDE.md
   §7 exists to prevent. GOAT is his own research, already public, and a stronger
   credential besides.
───────────────────────────────────────────────────────────────────────────── */

interface Fixture {
  /** Fixture identifier in the ground-truth file. */
  id: string;
  /** The vulnerability class the fixture encodes. */
  klass: string;
  /** The escalation primitive under test, in one short phrase. */
  primitive: string;
  /** Ground-truth findings planted in this fixture. */
  findings: number;
}

/* Eleven fixtures, 32 ground-truth findings. Ten encode known-bad
   configurations; F11 encodes known-good ones for false-positive testing. This
   index records what each fixture PROVES and nothing about what it contains. */
const FIXTURES: ReadonlyArray<Fixture> = [
  { id: "F01", klass: "Critically permissive policies", primitive: "direct grant of administrative action space", findings: 4 },
  { id: "F02", klass: "Role assumption chains", primitive: "transitive assumption across intermediate roles", findings: 4 },
  { id: "F03", klass: "Compute-to-data escalation", primitive: "execution role reachable by a lower-privileged caller", findings: 4 },
  { id: "F04", klass: "Unused access", primitive: "dormant principals retaining live permission", findings: 3 },
  { id: "F05", klass: "Long-lived credentials", primitive: "static credential material", findings: 3 },
  { id: "F06", klass: "Cross-account confused deputy", primitive: "trust without a caller-supplied correlation value", findings: 4 },
  { id: "F07", klass: "Federated trust misconfiguration", primitive: "token-subject condition too permissive", findings: 3 },
  { id: "F08", klass: "Identity persistence", primitive: "attacker-controlled trust anchor or provider", findings: 3 },
  { id: "F09", klass: "AI and ML service escalation", primitive: "managed model-hosting execution context", findings: 2 },
  { id: "F10", klass: "Logging and monitoring evasion", primitive: "tampering with the services that produce the evidence", findings: 2 },
  { id: "F11", klass: "Known-good baseline", primitive: "none, by design: the false-positive control", findings: 0 },
] as const;

export interface BenchmarkGridProps {
  className?: string;
}

export default function BenchmarkGrid({ className }: BenchmarkGridProps) {
  const total = FIXTURES.reduce((n, f) => n + f.findings, 0);

  /* The published figure is 32 ground-truth findings. If this index ever drifts
     from lib/stats.ts, fail loudly in development rather than shipping a grid
     that silently disagrees with the number printed beside it. */
  if (process.env.NODE_ENV !== "production" && String(total) !== STATS.goatFindings.value) {
    throw new Error(
      `BenchmarkGrid: index sums to ${total} findings but STATS.goatFindings says ` +
        `${STATS.goatFindings.value}. Update one to match the other.`
    );
  }

  return (
    <div className={className ? `af-bench ${className}` : "af-bench"}>
      {/* An encoding without a key is decoration, not data. */}
      <p className="af-bench-key">
        <span className="af-bench-swatch af-bench-swatch--hit" aria-hidden="true" />
        one ground-truth finding
        <span className="af-bench-key-sep" aria-hidden="true" />
        {FIXTURES.length} fixtures · {total} findings
      </p>

      {/* A real table. Screen readers get row and column semantics natively, so
          no parallel hidden description is needed. */}
      <table className="af-bench-table">
        <caption className="th-sr-only">
          The GOAT benchmark fixture index. {total} ground-truth findings planted across{" "}
          {FIXTURES.length} synthetic Terraform fixtures, written before the IAM audit agent was
          evaluated against them. Ten fixtures encode known-bad configurations; F11 encodes
          known-good ones, so that a tool which flags everything cannot score well. Counts are
          ground truth, not results: the benchmark reports counts against the total, never a rate.
        </caption>
        <tbody>
          {FIXTURES.map((f) => (
            <tr key={f.id} className="af-bench-row">
              <th scope="row" className="af-bench-fixture">
                <span className="af-bench-fx-id">{f.id}</span>
                <span className="af-bench-fx-class">{f.klass}</span>
                <span className="af-bench-fx-prim">{f.primitive}</span>
              </th>
              <td className="af-bench-cells">
                <span className="af-bench-track">
                  {Array.from({ length: f.findings }, (_, i) => (
                    <span key={i} className="af-bench-cell af-bench-cell--hit" />
                  ))}
                  {/* The clean fixture has no cells, and an empty row reads as
                      missing data rather than as the point. Say it instead. */}
                  {f.findings === 0 && (
                    <span className="af-bench-zero">no findings by design</span>
                  )}
                </span>
                <span className="th-sr-only">
                  {f.findings === 0
                    ? "no ground-truth findings, by design"
                    : `${f.findings} ground-truth findings`}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

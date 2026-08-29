import { STATS } from "@/lib/stats";

/* ─────────────────────────────────────────────────────────────────────────────
   ESCALATION GRAPH
   One IAM privilege-escalation path: a low-privilege entry point reaching a
   privileged role through hops that are each individually legitimate. Two
   branches converge on a cross-account deploy role, and a single permission is
   the cut that disconnects both. The cut is the point of the artifact, because
   the keystone permission is the unit the CIEM catalogue is organised around.

   WHAT THIS DOES AND DOES NOT CLAIM, corrected 2026-08-29. An earlier version of
   this header said the cut "is what the Antitoxin work actually computes". It is
   not. Antitoxin is research and design with no implementation, and every
   keystone in its 62-entry catalogue was determined by hand. This drawing
   computes the cut of its own five-edge graph, and it does so for a narrow
   reason that has nothing to do with Antitoxin: a caption that asserts a cut
   drifts away from the picture the moment an edge moves, and this one already
   did exactly that once. Computing it keeps the two in agreement. Read the
   artifact as an illustration of what a keystone permission is, not as a
   screenshot of a running solver.

   CORRECTION, 2026-08-26. The first version flagged `iam:PassRole` as the
   keystone and claimed removing it collapsed the chain. It did not: the
   parallel Lambda branch still reached Administrator, so the real minimum cut
   was the single `role-b -> admin` edge all along. The caption also derived its
   hop count from EDGES.length (5), which is the edge count of a forked graph,
   not the length of a path (3). Both were wrong in exactly the way a reviewer
   who knows CIEM would notice. The cut is now computed from the graph rather
   than asserted, so it cannot drift from the drawing again.

   UNIT CONVENTION: 1 user unit = 1 CSS px at the 760px design width. The
   viewBox matches the aspect ratio exactly (a mismatched viewBox letterboxes,
   and percentage-placed nodes then do NOT land on their stated coordinates).
   The artifact caps at 760px so it scales down but never up, which keeps every
   font-size below a real px value instead of a viewBox unit that renders at
   3px on a phone.
───────────────────────────────────────────────────────────────────────────── */

const W = 760;
const H = 360;

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  sub: string;
  terminal?: boolean;
}

interface Edge {
  from: string;
  to: string;
  /** The IAM action, shown on the edge. */
  action: string;
  /** Service prefix. Lives in the text equivalent, not on the edge: the fully
      qualified form (`lambda:UpdateFunctionCode`) measures 188px against a
      108px node box, and no perpendicular offset clears that. Measured, not
      guessed — three of five labels were overprinting node boxes. */
  service: string;
}

/* Coordinates solved numerically, not placed by eye. At a perpendicular label
   offset of 32 every label clears every node box, and the ink centres in the
   frame. Re-run the collision check if any of these move. */
const NODES: ReadonlyArray<Node> = [
  { id: "ec2", x: 95, y: 132, label: "EC2 instance", sub: "profile" },
  { id: "role-a", x: 305, y: 84, label: "AppRole", sub: "service" },
  { id: "lambda", x: 305, y: 276, label: "Lambda", sub: "exec role" },
  { id: "role-b", x: 515, y: 180, label: "DeployRole", sub: "x-account" },
  { id: "admin", x: 665, y: 180, label: "Administrator", sub: "privileged", terminal: true },
] as const;

const EDGES: ReadonlyArray<Edge> = [
  { from: "ec2", to: "role-a", service: "sts", action: "AssumeRole" },
  { from: "ec2", to: "lambda", service: "lambda", action: "UpdateFunctionCode" },
  { from: "role-a", to: "role-b", service: "iam", action: "PassRole" },
  { from: "lambda", to: "role-b", service: "sts", action: "AssumeRole" },
  { from: "role-b", to: "admin", service: "iam", action: "AttachRolePolicy" },
] as const;

/** Fully-qualified form, for the text equivalent. */
const qualified = (e: Edge) => `${e.service}:${e.action}`;

const BOX_W = 108;
const BOX_H = 44;

const byId = (id: string) => NODES.find((n) => n.id === id)!;

/**
 * The minimum cut: every edge that, removed alone, disconnects the source from
 * the terminal node. Computed, not asserted — the previous version hardcoded
 * the wrong edge and the caption confidently described a graph it was not
 * drawing.
 */
function minimumCut(sourceId: string, targetId: string): Edge[] {
  const reaches = (without: Edge | null): boolean => {
    const seen = new Set<string>([sourceId]);
    const queue = [sourceId];
    while (queue.length) {
      const cur = queue.shift()!;
      if (cur === targetId) return true;
      for (const e of EDGES) {
        if (e === without) continue;
        if (e.from === cur && !seen.has(e.to)) {
          seen.add(e.to);
          queue.push(e.to);
        }
      }
    }
    return false;
  };
  return EDGES.filter((e) => !reaches(e));
}

/** Longest path length in hops, for an honest caption. */
function longestPath(sourceId: string, targetId: string): number {
  let best = 0;
  const walk = (at: string, depth: number) => {
    if (at === targetId) { best = Math.max(best, depth); return; }
    for (const e of EDGES) if (e.from === at) walk(e.to, depth + 1);
  };
  walk(sourceId, 0);
  return best;
}

/** Where a ray from `from` toward `to` crosses the box edge of `to`. */
function edgeStop(from: Node, to: Node, inset: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const hw = BOX_W / 2 + inset;
  const hh = BOX_H / 2 + inset;
  // Scale the ray until it first touches either the vertical or horizontal face.
  const t = Math.min(hw / Math.abs(dx || 1e-6), hh / Math.abs(dy || 1e-6));
  return { x: to.x - dx * t, y: to.y - dy * t };
}

export default function EscalationGraph({ className }: { className?: string }) {
  const cut = minimumCut("ec2", "admin");
  const hops = longestPath("ec2", "admin");
  const cutVia = cut.map(qualified).join(" and ");

  return (
    <div className={className ? `af-svg-root ${className}` : "af-svg-root"} style={{ maxWidth: W }}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        {EDGES.map((e) => {
          const a = byId(e.from);
          const b = byId(e.to);
          const isCut = cut.includes(e);
          const start = edgeStop(b, a, 0);
          const end = edgeStop(a, b, 9);

          // Offset the label perpendicular to the edge. Centering it on the
          // midpoint put four of five labels through a node box; an offset of
          // 11 still left three colliding. 32 is the measured clearance.
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const len = Math.hypot(dx, dy) || 1;
          const off = 32; // solved: 26 still collides, 32 clears all five
          const mx = (start.x + end.x) / 2 + (-dy / len) * off;
          const my = (start.y + end.y) / 2 + (dx / len) * off;

          return (
            <g key={`${e.from}-${e.to}`}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="var(--accent)"
                strokeOpacity={isCut ? 1 : 0.42}
                strokeWidth={isCut ? 2.5 : 1.25}
              />
              {/* Arrowhead drawn inline rather than as a marker: markerUnits
                  defaults to strokeWidth, so a marker on a 2.5-wide cut edge
                  rendered twice the size of one on a 1.25-wide edge, and the
                  size difference read as a bug rather than as emphasis. */}
              <path
                d={`M0,-4 L8,0 L0,4 Z`}
                fill="var(--accent)"
                fillOpacity={isCut ? 1 : 0.42}
                transform={`translate(${end.x} ${end.y}) rotate(${
                  (Math.atan2(dy, dx) * 180) / Math.PI
                })`}
              />
              <text
                x={mx}
                y={my}
                textAnchor="middle"
                dominantBaseline="middle"
                /* paint-order puts the halo behind the glyphs so the label
                   stays readable where it crosses its own edge. */
                paintOrder="stroke"
                stroke="var(--background)"
                strokeWidth={3.5}
                strokeLinejoin="round"
                style={{
                  fontSize: "var(--af-fs-1)",
                  fill: "var(--text-primary)",
                  fillOpacity: isCut ? 1 : 0.62,
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                }}
              >
                {e.action}
              </text>
            </g>
          );
        })}

        {NODES.map((n) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            <rect
              x={-BOX_W / 2}
              y={-BOX_H / 2}
              width={BOX_W}
              height={BOX_H}
              fill={n.terminal ? "var(--accent)" : "var(--background)"}
              stroke={n.terminal ? "var(--accent)" : "var(--border-strong)"}
              strokeWidth={1.25}
            />
            <text
              y={-2}
              textAnchor="middle"
              style={{
                fontSize: "var(--af-fs-2)",
                fontWeight: 500,
                fill: n.terminal ? "var(--on-accent)" : "var(--text-primary)",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              }}
            >
              {n.label}
            </text>
            <text
              y={14}
              textAnchor="middle"
              style={{
                fontSize: "var(--af-fs-0)",
                fill: n.terminal ? "var(--on-accent)" : "var(--text-muted)",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
              }}
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>

      {/* Visible key. Solid-vs-faint is an encoding, and an encoding without a
          key is decoration. */}
      <p className="af-bench-key">
        <span className="af-bench-swatch af-bench-swatch--hit" aria-hidden="true" />
        the cut
        <span className="af-bench-swatch af-bench-swatch--miss" aria-hidden="true" />
        other hops
      </p>

      <p className="th-sr-only">
        An IAM privilege-escalation graph. An EC2 instance profile reaches an Administrator role
        in {hops} hops, along two branches that converge on a cross-account deploy role. Every hop
        is individually legitimate: {EDGES.map(qualified).join(", ")}. The cut is{" "}
        {cutVia}; removing that one permission disconnects both branches from Administrator
        without disturbing the others. That permission is the keystone, and the keystone is the
        unit {STATS.toxicCombinations.value} toxic permission combinations were catalogued around,
        by hand, across 8 attack categories. Paths of this shape are matched against
        pathfinding.cloud, DataDog&rsquo;s public catalogue of {STATS.escalationPaths.value}{" "}
        documented escalation paths.
      </p>
    </div>
  );
}

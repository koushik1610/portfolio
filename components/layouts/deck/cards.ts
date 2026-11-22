import { projectById, type Decision, type Project } from "@/lib/profile";
import { STATUS_LABEL } from "@/components/layouts/_shared/format";
import { STATS, type CanonicalStat } from "@/lib/stats";

/* The card model for the hero deck. Every card is built from lib/ through a
   typed factory, so a card can only say what profile.ts and stats.ts say. */

export { STATUS_LABEL as STATE } from "@/components/layouts/_shared/format";

/** Card fills. The ultramarine field is kept for the decision section, and the
 *  red for Email, so the deck uses paper and ink only. */
export type CardTone = "paper" | "ink2" | "ink";

interface CardBase { key: string; href: string; tone: CardTone }
export type ProjectCard = CardBase & { kind: "project"; name: string; state: string; line: string };
export type StatCard = CardBase & { kind: "stat"; value: string; label: string; line: string };
export type DecisionCard = CardBase & { kind: "decision"; name: string; rejected: string };
export type Card = ProjectCard | StatCard | DecisionCard;

export const projectCard = (p: Project, tone: CardTone): ProjectCard => ({
  kind: "project",
  key: p.id,
  href: `#dk-p-${p.id}`,
  tone,
  name: p.shortName ?? p.name,
  state: STATUS_LABEL[p.status],
  line: p.prose.short,
});

export const statCard = (key: string, href: string, stat: CanonicalStat, scope: CanonicalStat, tone: CardTone): StatCard => ({
  kind: "stat",
  key,
  href,
  tone,
  value: stat.value,
  label: stat.label,
  line: `Across ${scope.value} ${scope.label}.`,
});

export const decisionCard = (d: Decision & { rejected: string }, href: string, tone: CardTone): DecisionCard => ({
  kind: "decision",
  key: d.id,
  href,
  tone,
  name: d.title,
  rejected: d.rejected,
});

/* Three projects, one of each status, so the deck cannot read as all-shipped. */
const FAN_PROJECTS: ReadonlyArray<[string, CardTone]> = [
  ["toxic-combinations", "paper"],
  ["attack-path-analysis", "ink2"],
  ["incident-context", "paper"],
];

const BASELINE = projectById("baseline");

/** The published record the deck and the decision section share. */
export const DECISION_ID = "d-05";

/** The five cards, back of the deck first. The decision comes in from the
 *  caller, which resolves it through decisionById. */
export const buildCards = (decision: Decision & { rejected: string }): ReadonlyArray<Card> => [
  ...FAN_PROJECTS.map(([id, tone]) => projectCard(projectById(id), tone)),
  statCard("baseline-figure", "#dk-own", BASELINE.stat ?? STATS.signatures, STATS.awsDetectionScope, "ink"),
  decisionCard(decision, "#dk-decision", "paper"),
];

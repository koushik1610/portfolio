// Rotating stat sets — council-reviewed, cringe-free.
// Rotate on the same 12h cycle as themes (themeIndex % 4).
// Each set tells a coherent story; none lead with "9 years" or raw model counts.

export interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

// Set 1 — Precision Proof: benchmark validation as credibility signal
const SET_PRECISION: StatItem[] = [
  { value: "100%", label: "IAM Escalation Recall",  sub: "GOAT benchmark"     },
  { value: "0",    label: "False Positives",         sub: "On benchmark"       },
  { value: "32",   label: "Fixtures Caught",         sub: "Ground-truth"       },
  { value: "2,500+",label: "Cloud Accounts",         sub: "AWS · GCP"          },
];

// Set 2 — Research Depth: IAM expertise at catalogue scale
const SET_RESEARCH: StatItem[] = [
  { value: "65+",  label: "Escalation Paths",        sub: "Catalogued"         },
  { value: "62",   label: "IAM Toxic Combinations",  sub: "8 attack categories"},
  { value: "2,500+",label: "Accounts in Scope",      sub: "AWS · GCP"          },
  { value: "49",   label: "Baselines Shipped",       sub: "CIS · MITRE-mapped" },
];

// Set 3 — Force Multiplier: AI tooling as team leverage
const SET_LEVERAGE: StatItem[] = [
  { value: "1,400+",label: "Tickets Indexed",        sub: "→ knowledge graph"  },
  { value: "123",  label: "Security Reviews",        sub: "4-person team"      },
  { value: "$1.40",label: "Per Research Run",        sub: "vs $3.20 baseline"  },
  { value: "55%",  label: "Cost Reduction",          sub: "vs single model"    },
];

// Set 4 — Scale + Signal: enterprise scope with precision proof
const SET_SCALE: StatItem[] = [
  { value: "2,500+",label: "Cloud Accounts",         sub: "AWS · GCP"          },
  { value: "200+",  label: "Detection Signatures",    sub: "Python / Lambda"    },
  { value: "65+",  label: "Escalation Paths",        sub: "IAM research"       },
  { value: "100%", label: "Recall Rate",             sub: "Zero misses"        },
];

export const statSets: StatItem[][] = [
  SET_PRECISION,
  SET_RESEARCH,
  SET_LEVERAGE,
  SET_SCALE,
];

// Aligned with 12h theme rotation: same cycle, 4-set modulo
import { getThemeIndex } from "@/lib/rotation";

export function getCurrentStats(): StatItem[] {
  return statSets[getThemeIndex(statSets.length)];
}

// Rotating stat sets — council-reviewed, cringe-free.
// Rotate on the same 12h cycle as themes (themeIndex % 4).
// Each set tells a coherent story; none lead with "9 years" or raw model counts.

export interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

// Set 1 — Benchmark Discipline: built the evaluation before trusting the tool
const SET_PRECISION: StatItem[] = [
  { value: "32",   label: "GOAT Benchmarks",         sub: "Ground-truth findings" },
  { value: "65+",  label: "Escalation Paths",        sub: "10 vulnerability classes" },
  { value: "200+", label: "Detection Signatures",    sub: "Python / Lambda"    },
  { value: "1,400+",label: "AWS Accounts",           sub: "CSPM detection scope" },
];

// Set 2 — Research Depth: IAM expertise at catalogue scale
const SET_RESEARCH: StatItem[] = [
  { value: "65+",  label: "Escalation Paths",        sub: "Catalogued"         },
  { value: "62",   label: "IAM Toxic Combinations",  sub: "8 attack categories"},
  { value: "2,800+",label: "Accounts in Scope",      sub: "AWS · GCP"          },
  { value: "19",   label: "AI Models Orchestrated",  sub: "5 providers"        },
];

// Set 3 — Force Multiplier: AI tooling as team leverage
const SET_LEVERAGE: StatItem[] = [
  { value: "1,700+",label: "Knowledge Nodes",        sub: "from review tickets"},
  { value: "150+", label: "Security Reviews",        sub: "small team"         },
  { value: "$1.40",label: "Per Research Run",        sub: "vs $3.20 baseline"  },
  { value: "55%",  label: "Cost Reduction",          sub: "vs single model"    },
];

// Set 4 — Scale + Signal: enterprise scope with program ownership
const SET_SCALE: StatItem[] = [
  { value: "2,800+",label: "Cloud Accounts",         sub: "AWS · GCP"          },
  { value: "200+",  label: "Detection Signatures",    sub: "Python / Lambda"    },
  { value: "50+",  label: "New Baselines",           sub: "v6.0, largest release" },
  { value: "150+", label: "Security Reviews",        sub: "every business unit" },
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

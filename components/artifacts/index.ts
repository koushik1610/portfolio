/* Barrel for the artifact layer. Importing any artifact through this module
   also pulls in the shared scales in artifacts.css, so a theme cannot render an
   artifact without its type scale, spacing scale, and forced-colors handling. */
import "./artifacts.css";

export { default as BenchmarkGrid } from "./BenchmarkGrid";
export { default as EscalationGraph } from "./EscalationGraph";
export type { ArtifactProps } from "./types";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Single registration point — theme components import from "@/lib/gsap" and
// must NOT call gsap.registerPlugin themselves.
gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin, ScrollTrigger);

export { gsap, useGSAP, SplitText, ScrambleTextPlugin, ScrollTrigger };

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin);

export { gsap, useGSAP, SplitText, ScrambleTextPlugin };

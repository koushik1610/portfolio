/* Icon paths from itshover (https://github.com/itshover/itshover), Copyright 2026
   itshover, Apache-2.0; licence in ./LICENSE-itshover.txt, shipped with the site at /licenses/itshover.txt. Modified: the upstream
   components animate with `motion`, which this site does not ship, so only the
   path data is kept and the movement is CSS on the .ic classes in app/globals.css.
   Paths carry pathLength=1 so a check can draw itself with one stroke-dashoffset. */

import type { ContactLink } from "@/lib/profile";

const PATHS = {
  refresh: ["M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4", "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"],
  linkedin: ["M8 11v5", "M8 8v.01", "M12 16v-5", "M16 16v-3a2 2 0 1 0 -4 0", "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"],
  github: ["M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"],
  mail: ["M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z", "M3 7l9 6l9 -6"],
  copy: ["M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1", "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"],
  chevron: ["M6 9l6 6l6 -6"],
  check: ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M9 12l2 2l4 -4"],
  alert: ["m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", "M12 9v4", "M12 17h.01"],
  fileDescription: ["M14 3v4a1 1 0 0 0 1 1h4", "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z", "M9 17h6", "M9 13h6"],
} as const;

export type IconName = keyof typeof PATHS;

/** Decorative by default: the text beside it carries the meaning. */
export function SiteIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className ? `ic ${className}` : "ic"} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {PATHS[name].map((d) => <path key={d} d={d} pathLength={1} />)}
    </svg>
  );
}

const CONTACT_ICONS: Record<ContactLink["k"], IconName> = { Email: "mail", LinkedIn: "linkedin", GitHub: "github" };

/** A contact key with its mark, for each theme's contact list. */
export function ContactLabel({ k }: { k: ContactLink["k"] }) {
  return <span className="ic-label"><SiteIcon name={CONTACT_ICONS[k]} />{k}</span>;
}

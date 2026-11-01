import type { Metadata } from "next";
import Link from "next/link";
import { basics, summary, jobs, projects, skills, education, certs } from "@/lib/resume";
import { CONTACT } from "@/lib/profile";
import { SITE_DESCRIPTION } from "@/lib/stats";
import PrintButton from "./PrintButton";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé, Koushik Kotamraju",
  description: SITE_DESCRIPTION,
};

/* One neutral, print-first sheet shared by every theme. Content is generated
   from the Ascend master (lib/resume.ts); this file only lays it out. The
   rotation script pins data-theme="resume" on this route. */
export default function ResumePage() {
  return (
    <div className="rs-root">
      <a href="#rs-main" className="th-skip">Skip to main content</a>
      <header className="rs-bar container">
        <Link href="/" className="rs-back">Back to koushik.io</Link>
        <div className="rs-bar-actions">
          <PrintButton />
          <a href={CONTACT[0].href} className="th-btn th-btn--primary">Email me</a>
        </div>
      </header>

      <main id="rs-main" tabIndex={-1} className="rs-sheet container">
        <section className="rs-head" aria-labelledby="rs-name">
          <h1 id="rs-name">{basics.name}</h1>
          <p className="rs-label">{jobs[0].title}, Yahoo</p>
          <ul className="rs-contact">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.v}</a>
              </li>
            ))}
          </ul>
          <p className="rs-where">{basics.location.replace(" · ", ", ")}</p>
          <p className="rs-summary">{summary}</p>
        </section>

        <section aria-labelledby="rs-exp">
          <h2 id="rs-exp">Experience</h2>
          {jobs.map((job) => (
            <article key={`${job.company}-${job.title}`} className="rs-job">
              <div className="rs-job-head">
                <h3>{job.title}</h3>
                <p className="rs-period">{job.period}</p>
              </div>
              <p className="rs-org">
                {job.company}
                {job.location ? <span className="rs-loc">, {job.location}</span> : null}
              </p>
              <ul className="rs-bullets">
                {job.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <section aria-labelledby="rs-proj">
          <h2 id="rs-proj">Personal research</h2>
          <ul className="rs-bullets">
            {projects.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </section>

        <div className="rs-two">
          <section aria-labelledby="rs-skills">
            <h2 id="rs-skills">Skills</h2>
            <ul className="rs-plain">
              {skills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </section>
          <section aria-labelledby="rs-edu">
            <h2 id="rs-edu">Education</h2>
            <ul className="rs-plain">
              {education.map((e) => (
                <li key={e.degree}>{e.degree}, {e.school} <span className="rs-period">{e.period}</span></li>
              ))}
            </ul>
            <h2 id="rs-certs" className="rs-h2-follow">Certifications</h2>
            <ul className="rs-plain">
              {certs.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

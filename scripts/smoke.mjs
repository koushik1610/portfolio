#!/usr/bin/env node
/* Render smoke test. check-themes reads source text, so a theme can pass it and
   still render a blank page. This loads every slug from a served static export
   and asserts what a visitor must get: exactly one h1, equal to IDENTITY.name,
   the Email me control, no horizontal scroll at 375px, and no page errors.

   Usage (after `npm run build`):
     python3 -m http.server 4311 --directory out &
     HALLMARK_PUPPETEER=$HOME/Code/vendor/hallmark-tools node scripts/smoke.mjs [--url http://localhost:4311] [slug ...]

   puppeteer-core is not a dependency of this repo; it is resolved from
   $HALLMARK_PUPPETEER (the same tools folder sloplint uses) and drives the
   system Chrome. */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = new URL("..", import.meta.url).pathname;
const args = process.argv.slice(2);
const urlFlag = args.indexOf("--url");
const base = (urlFlag >= 0 ? args.splice(urlFlag, 2)[1] : "http://localhost:4311").replace(/\/$/, "");

const themesTs = readFileSync(join(root, "lib/themes.ts"), "utf8");
const allSlugs = JSON.parse(themesTs.match(/THEME_SLUGS = (\[[^\]]+\])/)[1]);
const slugs = args.length ? args : allSlugs;
const name = readFileSync(join(root, "lib/profile.ts"), "utf8").match(/name:\s*"([^"]+)"/)[1];

const tools = process.env.HALLMARK_PUPPETEER;
if (!tools) { console.error("smoke: set HALLMARK_PUPPETEER to the folder holding puppeteer-core"); process.exit(2); }
const puppeteer = (await import(pathToFileURL(createRequire(join(tools, "noop.js")).resolve("puppeteer-core")).href)).default;
const chrome = ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", process.env.CHROME_PATH].find((p) => p && existsSync(p));
if (!chrome) { console.error("smoke: no Chrome found (set CHROME_PATH)"); process.exit(2); }

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const failures = [];
try {
  for (const slug of slugs) {
    for (const width of [1280, 375]) {
      const page = await browser.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e.message || e)));
      await page.setViewport({ width, height: width === 375 ? 812 : 800 });
      await page.goto(`${base}/theme/${slug}/`, { waitUntil: "networkidle0", timeout: 30000 });
      await page.waitForSelector("main h1", { timeout: 10000 }).catch(() => {});
      const r = await page.evaluate(() => ({
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
        theme: document.documentElement.dataset.theme,
        email: [...document.querySelectorAll("a")].some((a) => a.textContent.trim() === "Email me"),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }));
      const where = `${slug} @${width}`;
      if (r.theme !== slug) failures.push(`${where}: data-theme is ${r.theme}`);
      if (r.h1.length !== 1) failures.push(`${where}: ${r.h1.length} h1 elements`);
      else if (r.h1[0] !== name) failures.push(`${where}: h1 is "${r.h1[0]}"`);
      if (!r.email) failures.push(`${where}: no "Email me" control`);
      if (r.overflow > 1) failures.push(`${where}: horizontal scroll of ${r.overflow}px`);
      for (const e of errors) failures.push(`${where}: page error: ${e.slice(0, 120)}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
if (failures.length) {
  console.error(failures.map((f) => `FAIL ${f}`).join("\n"));
  console.error(`\nsmoke: ${failures.length} problem(s) across ${slugs.length} theme(s)`);
  process.exit(1);
}
console.log(`smoke: ${slugs.length} themes render (one h1 = name, Email me present, no overflow at 375)`);

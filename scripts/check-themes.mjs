#!/usr/bin/env node
/* Enforces the rules that keep the themes from leaking into each other, so a
   scope mistake fails `npm run check` instead of waiting for a review:

   1. Every selector in components/layouts/<slug>/styles.css starts with
      [data-theme="<slug>"] (theme CSS stays loaded after a rotation, so an
      unscoped rule in theme N restyles theme N+1).
   2. No colour or font-family literal in a theme's styles.css (Hallmark Floor 1:
      every colour and face goes through tokens.css).
   3. Line 1 of every theme's styles.css is a Hallmark stamp (Floor 15).
   4. Every theme renders a published decision record (through the throwing
      decisionById, so a held or missing record fails loudly), the CTA row, the
      site controls, and the SrSummary (the council's per-theme content contract).
   5. Every theme's tokens.css is one block scoped to :root[data-theme="<slug>"]. */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const layouts = join(root, "components/layouts");
const slugs = readdirSync(layouts).filter((d) => !d.startsWith("_"));
const errors = [];

const COLOR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color-mix)\(|\b(?:white|black)\b/i;

for (const slug of slugs) {
  const dir = join(layouts, slug);
  const cssPath = join(dir, "styles.css");
  if (!existsSync(cssPath)) { errors.push(`${slug}: no styles.css`); continue; }
  const css = readFileSync(cssPath, "utf8");
  const first = css.split("\n").find((l) => l.trim() !== "");
  if (!first || !first.startsWith("/* Hallmark ·")) errors.push(`${slug}/styles.css:1 is not a Hallmark stamp`);

  const body = css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  const lines = body.split("\n");
  const scope = `[data-theme="${slug}"]`;
  let depth = 0;
  let atDepth = []; // stack of booleans: is this block a nested-selector context (@media/@supports)?
  let buf = "";
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === "{") {
      const sel = buf.trim();
      const line = body.slice(0, i).split("\n").length;
      const inRule = atDepth.length && atDepth[atDepth.length - 1] === "rule";
      if (sel.startsWith("@")) {
        atDepth.push(/^@(media|supports|container|layer)/.test(sel) ? "group" : "other");
      } else if (inRule || atDepth.includes("other")) {
        atDepth.push("rule"); // nested rule or keyframe step
      } else {
        for (const part of sel.split(",")) {
          const p = part.trim();
          if (p && !p.startsWith(scope)) errors.push(`${slug}/styles.css:${line} selector not scoped: ${p.slice(0, 80)}`);
        }
        atDepth.push("rule");
      }
      buf = "";
      depth++;
    } else if (ch === "}") {
      atDepth.pop();
      depth--;
      buf = "";
    } else if (ch === ";" && atDepth[atDepth.length - 1] === "rule") {
      buf = "";
    } else {
      buf += ch;
    }
  }
  lines.forEach((l, i) => {
    const decl = l.split(";").map((d) => d.trim()).filter((d) => /^[a-z-]+\s*:/.test(d) || d.includes(":"));
    for (const d of decl) {
      const [prop, ...rest] = d.split(":");
      const val = rest.join(":");
      if (!prop || /^\s*--/.test(prop)) continue;
      if (/\[data-theme|\.[a-z]/.test(prop)) continue; // selector, not declaration
      if (COLOR.test(val)) errors.push(`${slug}/styles.css:${i + 1} colour literal: ${d.slice(0, 80)}`);
      if (/^\s*font-family\s*$/.test(prop) && !/^\s*var\(/.test(val) && !/inherit/.test(val)) {
        errors.push(`${slug}/styles.css:${i + 1} font-family literal: ${d.slice(0, 80)}`);
      }
    }
  });

  const tsx = readdirSync(dir).filter((f) => f.endsWith(".tsx")).map((f) => readFileSync(join(dir, f), "utf8")).join("\n");
  const tokPath = join(dir, "tokens.css");
  if (!existsSync(tokPath)) errors.push(`${slug}: no tokens.css`);
  else {
    const tok = readFileSync(tokPath, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    const sels = [...tok.matchAll(/([^{}]+)\{/g)].map((m) => m[1].trim());
    for (const sel of sels) if (sel !== `:root[data-theme="${slug}"]`) errors.push(`${slug}/tokens.css: block not scoped to :root[data-theme="${slug}"]: ${sel.slice(0, 60)}`);
  }

  {
    if (!/decisionById\(/.test(tsx)) errors.push(`${slug}: renders no decision record through decisionById()`);
    if (!/<CtaRow/.test(tsx)) errors.push(`${slug}: no <CtaRow />`);
    if (!/<SrSummary/.test(tsx)) errors.push(`${slug}: no <SrSummary />`);
    if (!/<NextThemeButton/.test(tsx)) errors.push(`${slug}: no <NextThemeButton />`);
    if (!/<AskAI/.test(tsx)) errors.push(`${slug}: no <AskAI />`);
    if (/—/.test(tsx + css)) errors.push(`${slug}: contains an em dash`);
  }
}

if (errors.length) {
  console.error(errors.map((e) => `FAIL ${e}`).join("\n"));
  console.error(`\ncheck-themes: ${errors.length} problem(s) across ${slugs.length} theme(s)`);
  process.exit(1);
}
console.log(`check-themes: ${slugs.length} themes clean`);

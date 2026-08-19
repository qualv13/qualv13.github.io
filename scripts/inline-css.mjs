/**
 * Folds the built stylesheet into dist/index.html.
 *
 * The bundle is one <link rel="stylesheet"> away from the HTML, so the browser
 * cannot paint until a second round trip finishes — ~310 ms of the render-block
 * budget on GitHub Pages, almost all of it latency rather than bytes (56 KiB,
 * 10 KiB over the wire). Inlining costs the same bytes but no extra request.
 *
 * The .css file is left in place on purpose: an already-cached copy of the old
 * HTML still points at it, and a 404 there would leave that visitor unstyled.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";
const htmlPath = join(DIST, "index.html");

const html = await readFile(htmlPath, "utf8");
const link = html.match(/<link[^>]+rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/);

if (!link) {
  console.log("inline-css: no local stylesheet link in dist/index.html, nothing to do");
  process.exit(0);
}

const css = await readFile(join(DIST, link[1]), "utf8");
await writeFile(htmlPath, html.replace(link[0], `<style>${css}</style>`));

console.log(`inline-css: inlined ${link[1]} (${(css.length / 1024).toFixed(1)} KiB)`);

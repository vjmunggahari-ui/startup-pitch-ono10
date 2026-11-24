// Ridiculous at First Glance, Real by the Second — make.fun entry (v2)
// Writes one sentence pitching a bizarre startup that actually sells:
// tiny funerals for dead houseplants. Deterministic: the winning line
// was ranked first among 14 new candidates against the v1 line by Groq
// (gpt-oss-120b, qwen3.8-27b) head-to-head judging in both orders.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "We stage tiny funerals for dead houseplants, because the guilt of killing a prized monstera is real, and collectors pay $150 for a eulogy and a rare cutting to try again.";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file on disk must be exactly the line, no
// trailing newline, no extra bytes, and inside the 1..200 character gate.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the chosen line byte-for-byte");
}
if (back.length < 1 || back.length > 200) {
  throw new Error(`entry length ${back.length} outside the 1..200 gate`);
}
if (back.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (back.includes("\n") || back.includes("\r")) {
  throw new Error("entry must be a single line with no newline characters");
}
if (!back.endsWith(".")) {
  throw new Error("entry must end with its punch on a full stop");
}
if (!/prized monstera/.test(back) || !/\$150/.test(back)) {
  throw new Error("entry lost its concrete hook (the prized monstera, the $150 ticket)");
}
console.log(`wrote ${outPath} (${back.length} chars)`);

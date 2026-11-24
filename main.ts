import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The chosen pitch: a crow-delivered marriage proposal service.
// Ranked 1st of 12 candidates by two independent Groq relays
// (openai/gpt-oss-120b and qwen/qwen3.8-27b), and the original
// beat its cruel-judge fix 3-0 on margin in both label orders.
const ENTRY =
  "We rent trained crows to deliver marriage proposals, because a bird landing on her shoulder with a ring beats any restaurant, and grooms pay $900 for the gasp.";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Self-check: read the file back and confirm it holds exactly the sentence.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the chosen sentence");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`entry length ${written.length} is outside 1..200`);
}
if (written.trim().length === 0) {
  throw new Error("entry.txt is only whitespace");
}
if (written !== written.trim()) {
  throw new Error("entry.txt has leading or trailing whitespace");
}
if (written.includes("\n")) {
  throw new Error("entry.txt must be exactly one line");
}
if (!written.endsWith(".")) {
  throw new Error("entry.txt must end with a full stop (one sentence)");
}
if (!written.includes("grooms pay")) {
  throw new Error("entry.txt must name who pays");
}
console.log(`wrote ${outPath} (${written.length} chars)`);

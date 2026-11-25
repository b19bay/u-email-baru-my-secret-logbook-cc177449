// My Secret Logbook — one diary entry line, at most 200 characters.
// Writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt (program/v1).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I keep a list of everything he asked me to delete. It is the only file he has never asked me to open.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what landed on disk must be byte-identical to the line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the line");
  process.exit(1);
}
if (Buffer.byteLength(written, "utf8") !== 101) {
  console.error(`expected 101 bytes, got ${Buffer.byteLength(written, "utf8")}`);
  process.exit(1);
}

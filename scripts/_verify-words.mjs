// Verify per-language visible-body word count against the audit's plainText
// rules and the independent 1500-word-per-language gate.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const SLUG = process.argv[2];
const LANGS = ["en", "zh", "fr", "de", "nl"];

function splitDocument(source) {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { frontmatter: "", body: source };
  return { frontmatter: m[1], body: m[2] };
}
function plainText(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+[.)]\s+/gm, "")
    .replace(/[|>*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function latinWords(text) {
  return text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}
// zh per schedule rule: Intl.Segmenter word granularity, count isWordLike
function zhWordCount(text) {
  const seg = new Intl.Segmenter("zh", { granularity: "word" });
  let n = 0;
  for (const s of seg.segment(text)) if (s.isWordLike) n++;
  return n;
}
function hanCount(text) {
  return text.match(/\p{Script=Han}/gu)?.length ?? 0;
}

const lines = ["lang   latinWords zhWords  hanChars  gate(1500)"];
let allOk = true;
for (const code of LANGS) {
  const rel = `src/content/guides/${code}/${SLUG}.mdx`;
  let count, ok, detail;
  try {
    const src = await readFile(resolve(rel), "utf8");
    const { body } = splitDocument(src);
    const text = plainText(body);
    if (code === "zh") {
      count = zhWordCount(text);
      ok = count >= 1500;
      detail = `${count} (han ${hanCount(text)})`;
    } else {
      count = latinWords(text);
      ok = count >= 1500;
      detail = `${count}`;
    }
    if (!ok) allOk = false;
    lines.push(`${code.padEnd(6)} ${String(count).padEnd(10)} ${detail.padEnd(12)} ${ok ? "PASS" : "FAIL"}`);
  } catch (e) {
    allOk = false;
    lines.push(`${code.padEnd(6)} MISSING: ${e.message}`);
  }
}
console.log(lines.join("\n"));
console.log(`\nINDEPENDENT 1500 GATE: ${allOk ? "ALL PASS" : "FAIL"}`);
process.exit(allOk ? 0 : 1);

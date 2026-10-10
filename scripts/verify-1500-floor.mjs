// Independent schedule-floor verification: each of en/zh/fr/de/nl visible body >= 1500 words.
// en/fr/de/nl: latin word count (same regex as audit-guide-delivery).
// zh: Intl.Segmenter('zh', {granularity:'word'}) isWordLike token count (word segmentation, NOT Han chars).
// Excludes frontmatter, code blocks, URLs. Mirrors audit plainText() for fair comparison.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const slug = process.argv[2] || "multi-front-defense";
const FLOOR = 1500;
const LANGS = ["en", "zh", "fr", "de", "nl"];

function splitDocument(source) {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  return m ? { frontmatter: m[1], body: m[2] } : { frontmatter: "", body: source };
}
function plainText(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
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
function latinWords(t) { return t.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0; }
function hanChars(t) { return t.match(/\p{Script=Han}/gu)?.length ?? 0; }
const zhSeg = new Intl.Segmenter("zh", { granularity: "word" });
function zhWordCount(t) {
  let n = 0;
  for (const s of zhSeg.segment(t)) if (s.isWordLike) n++;
  return n;
}

let allPass = true;
console.log(`Schedule floor check (>= ${FLOOR} words each) for ${slug}\n`);
console.log("lang   latinWords  zhSegWords  hanChars   verdict");
for (const lang of LANGS) {
  const rel = `src/content/guides/${lang}/${slug}.mdx`;
  const { body } = splitDocument(await readFile(resolve(rel), "utf8"));
  const text = plainText(body);
  const lw = latinWords(text);
  const zw = zhWordCount(text);
  const hc = hanChars(text);
  // Schedule floor metric: zh uses Intl.Segmenter words, others use latin word count.
  const metric = lang === "zh" ? zw : lw;
  const pass = metric >= FLOOR;
  if (!pass) allPass = false;
  console.log(
    [lang.padEnd(5), String(lw).padEnd(11), String(zw).padEnd(11), String(hc).padEnd(10),
      `${metric >= FLOOR ? "PASS" : "FAIL"} (${metric}/${FLOOR})`]
      .join(" "),
  );
}
console.log(`\nOverall schedule floor: ${allPass ? "PASS" : "FAIL"}`);
process.exitCode = allPass ? 0 : 1;

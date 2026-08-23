import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const LANGUAGES = [
  { code: "en", minimum: 1_000, unit: "words" },
  { code: "zh", minimum: 1_500, unit: "Han characters" },
  { code: "fr", minimum: 750, unit: "words" },
  { code: "de", minimum: 750, unit: "words" },
  { code: "nl", minimum: 750, unit: "words" },
];

function argument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? "" : (process.argv[index + 1] ?? "");
}

function splitDocument(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: "", body: source };
  return { frontmatter: match[1], body: match[2] };
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+[.)]\s+/gm, "")
    .replace(/[|>*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function latinWordCount(text) {
  return text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function hanCharacterCount(text) {
  return text.match(/\p{Script=Han}/gu)?.length ?? 0;
}

function uniqueUrls(markdown) {
  return [...new Set(markdown.match(/https?:\/\/[^\s)>\]]+/g) ?? [])];
}

function hostname(value) {
  try {
    return new URL(value).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

const slug = argument("--slug");
const sourcePack = argument("--source-pack");

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !sourcePack) {
  console.error(
    "Usage: pnpm guide:audit -- --slug <slug> --source-pack <markdown-path>",
  );
  process.exit(2);
}

const results = [];
for (const language of LANGUAGES) {
  const relative = `src/content/guides/${language.code}/${slug}.mdx`;
  try {
    const source = await readFile(resolve(relative), "utf8");
    const { frontmatter, body } = splitDocument(source);
    const text = plainText(body);
    const count =
      language.code === "zh" ? hanCharacterCount(text) : latinWordCount(text);
    const headings = body.match(/^#{2,4}\s+.+$/gm)?.length ?? 0;
    const tables =
      body.match(/^\s*\|?(?:\s*:?-{3,}:?\s*\|){2,}\s*$/gm)?.length ?? 0;
    const internalLinks =
      body.match(/\[[^\]]+\]\(\/(?!\/)[^)]+\)/g)?.length ?? 0;
    const hasDeliveryMetadata =
      /^updatedDate:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(frontmatter) &&
      /^version:\s*v\d+/m.test(frontmatter) &&
      /^freshnessSummary:\s*.+$/m.test(frontmatter);
    results.push({
      ...language,
      relative,
      count,
      headings,
      tables,
      internalLinks,
      hasDeliveryMetadata,
      passes:
        count >= language.minimum &&
        headings >= 8 &&
        tables >= 1 &&
        internalLinks >= 2 &&
        hasDeliveryMetadata,
    });
  } catch (error) {
    results.push({
      ...language,
      relative,
      count: 0,
      headings: 0,
      tables: 0,
      internalLinks: 0,
      hasDeliveryMetadata: false,
      passes: false,
      error: error.message,
    });
  }
}

let research;
try {
  const source = await readFile(resolve(sourcePack), "utf8");
  const urls = uniqueUrls(source);
  const reddit = urls.filter((url) => {
    const host = hostname(url);
    return host === "reddit.com" || host.endsWith(".reddit.com");
  });
  const youtube = urls.filter((url) => {
    const host = hostname(url);
    return (
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtu.be"
    );
  });
  const official = urls.filter((url) => {
    const host = hostname(url);
    return (
      (host === "github.com" || host === "raw.githubusercontent.com") &&
      /openfrontio\/openfrontio/i.test(url)
    );
  });
  const notesWords = latinWordCount(plainText(source));
  research = {
    reddit: reddit.length,
    youtube: youtube.length,
    official: official.length,
    notesWords,
    passes:
      reddit.length >= 3 &&
      youtube.length >= 3 &&
      official.length >= 1 &&
      notesWords >= 600,
  };
} catch (error) {
  research = {
    reddit: 0,
    youtube: 0,
    official: 0,
    notesWords: 0,
    passes: false,
    error: error.message,
  };
}

console.log(`Guide delivery audit: ${slug}`);
console.log(
  "lang  count/min              h2-h4  tables  links  metadata  status",
);
for (const result of results) {
  console.log(
    [
      result.code.padEnd(5),
      `${result.count}/${result.minimum} ${result.unit}`.padEnd(22),
      String(result.headings).padEnd(6),
      String(result.tables).padEnd(7),
      String(result.internalLinks).padEnd(6),
      (result.hasDeliveryMetadata ? "yes" : "no").padEnd(9),
      result.passes ? "PASS" : "FAIL",
    ].join(" "),
  );
  if (result.error) console.log(`      ${result.error}`);
}

console.log("\nResearch source pack");
console.log(
  `Reddit ${research.reddit}/3 | YouTube ${research.youtube}/3 | official ${research.official}/1 | notes ${research.notesWords}/600 words | ${research.passes ? "PASS" : "FAIL"}`,
);
if (research.error) console.log(research.error);

console.log("\nGuide routes");
for (const language of LANGUAGES) {
  const prefix = language.code === "en" ? "" : `/${language.code}`;
  console.log(`${prefix}/guides/${slug}/`);
}

if (results.some((result) => !result.passes) || !research.passes)
  process.exitCode = 1;

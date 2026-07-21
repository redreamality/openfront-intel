import { createSign } from 'node:crypto';
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const DEFAULT_SITE = 'sc-domain:openfront.fyi';
const DEFAULT_DAYS = 7;
const DEFAULT_LAG_DAYS = 2;
const DEFAULT_OUTPUT = '.cache/gsc/top-queries.json';
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_GSC_CLI_DIR = resolve(SCRIPT_DIR, '../../gsc-cli');
const GSC_CLI_BRIDGE = resolve(SCRIPT_DIR, 'fetch-search-console-via-gsc-cli.py');
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const API_ROOT = 'https://www.googleapis.com/webmasters/v3';
const ROW_LIMIT = 25_000;
const execFileAsync = promisify(execFile);

function parseArgs(argv) {
  const options = {
    site: process.env.GSC_SITE_URL ?? DEFAULT_SITE,
    days: Number(process.env.GSC_DAYS ?? DEFAULT_DAYS),
    lagDays: Number(process.env.GSC_LAG_DAYS ?? DEFAULT_LAG_DAYS),
    output: process.env.GSC_OUTPUT ?? DEFAULT_OUTPUT,
    gscCliDir: process.env.GSC_CLI_DIR ?? DEFAULT_GSC_CLI_DIR,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--') continue;
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--site') options.site = argv[++index];
    else if (arg === '--days') options.days = Number(argv[++index]);
    else if (arg === '--lag-days') options.lagDays = Number(argv[++index]);
    else if (arg === '--output') options.output = argv[++index];
    else if (arg === '--gsc-cli-dir') options.gscCliDir = argv[++index];
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isInteger(options.days) || options.days < 1 || options.days > 90) {
    throw new Error('--days must be an integer between 1 and 90');
  }
  if (!Number.isInteger(options.lagDays) || options.lagDays < 0 || options.lagDays > 10) {
    throw new Error('--lag-days must be an integer between 0 and 10');
  }
  if (!/\.json$/i.test(options.output)) {
    throw new Error('--output must end in .json so the JSON and Markdown reports stay separate');
  }
  return options;
}

function printHelp() {
  console.log(`Fetch Search Console query opportunities without committing private metrics.

Usage:
  pnpm gsc:queries -- [options]

Options:
  --site <property>   Search Console property (default: ${DEFAULT_SITE})
  --days <number>     Number of data days (default: ${DEFAULT_DAYS})
  --lag-days <number> Skip newest days while data settles (default: ${DEFAULT_LAG_DAYS})
  --output <path>     Private JSON output (default: ${DEFAULT_OUTPUT})
  --gsc-cli-dir <dir> OAuth CLI directory (default: ${DEFAULT_GSC_CLI_DIR})

Authentication (first available wins):
  GSC_ACCESS_TOKEN
  GSC_SERVICE_ACCOUNT_JSON
  GOOGLE_APPLICATION_CREDENTIALS
  GSC_CLIENT_EMAIL + GSC_PRIVATE_KEY
  Existing OAuth token from gsc-cli (GSC_CLI_DIR)`);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange(days, lagDays) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const end = new Date(today);
  end.setUTCDate(end.getUTCDate() - lagDays);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  return { startDate: formatDate(start), endDate: formatDate(end) };
}

function base64Url(value) {
  return Buffer.from(value).toString('base64url');
}

async function readServiceAccount() {
  if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const file = await readFile(resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS), 'utf8');
    return JSON.parse(file);
  }
  if (process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY) {
    return {
      client_email: process.env.GSC_CLIENT_EMAIL,
      private_key: process.env.GSC_PRIVATE_KEY.replaceAll('\\n', '\n'),
      token_uri: TOKEN_URL,
    };
  }
  return null;
}

async function exchangeServiceAccountToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64Url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: SCOPE,
    aud: serviceAccount.token_uri ?? TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(serviceAccount.private_key, 'base64url')}`;

  const response = await fetch(serviceAccount.token_uri ?? TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google OAuth token exchange failed (${response.status}): ${detail}`);
  }
  const token = await response.json();
  return token.access_token;
}

async function getAccessToken() {
  if (process.env.GSC_ACCESS_TOKEN) return process.env.GSC_ACCESS_TOKEN;
  const serviceAccount = await readServiceAccount();
  if (!serviceAccount?.client_email || !serviceAccount?.private_key) {
    throw new Error(
      'Search Console authentication is missing. Set GSC_ACCESS_TOKEN, ' +
      'GSC_SERVICE_ACCOUNT_JSON, GOOGLE_APPLICATION_CREDENTIALS, or ' +
      'GSC_CLIENT_EMAIL + GSC_PRIVATE_KEY.',
    );
  }
  return exchangeServiceAccountToken(serviceAccount);
}

function hasNativeAuthentication() {
  return Boolean(
    process.env.GSC_ACCESS_TOKEN ||
    process.env.GSC_SERVICE_ACCOUNT_JSON ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    (process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY),
  );
}

function getGscCliPython(gscCliDir) {
  const configured = process.env.GSC_PYTHON;
  const candidates = configured
    ? [resolve(configured)]
    : process.platform === 'win32'
      ? [resolve(gscCliDir, '.venv/Scripts/python.exe')]
      : [resolve(gscCliDir, '.venv/bin/python')];
  const python = candidates.find((candidate) => existsSync(candidate));
  if (!python) {
    throw new Error(
      `gsc-cli Python was not found under ${gscCliDir}. ` +
      'Set GSC_PYTHON or create the CLI virtual environment with uv.',
    );
  }
  return python;
}

async function querySearchConsoleViaCli({ site, startDate, endDate, gscCliDir }) {
  const cliScript = resolve(gscCliDir, 'gsc_cli.py');
  if (!existsSync(cliScript)) {
    throw new Error(`gsc-cli was not found: ${cliScript}`);
  }
  const python = getGscCliPython(gscCliDir);
  try {
    const { stdout } = await execFileAsync(python, [
      GSC_CLI_BRIDGE,
      '--gsc-cli-dir', gscCliDir,
      '--site', site,
      '--start-date', startDate,
      '--end-date', endDate,
    ], {
      cwd: resolve(SCRIPT_DIR, '..'),
      env: { ...process.env, GSC_DATA_STATE: 'final' },
      maxBuffer: 50 * 1024 * 1024,
      windowsHide: true,
    });
    return JSON.parse(stdout);
  } catch (error) {
    const detail = error?.stderr?.trim() || error?.message || String(error);
    throw new Error(`gsc-cli bridge failed: ${detail}`);
  }
}

async function querySearchConsole({ site, startDate, endDate, accessToken }) {
  const endpoint = `${API_ROOT}/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const allRows = [];

  for (let startRow = 0; ; startRow += ROW_LIMIT) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        dataState: 'final',
        rowLimit: ROW_LIMIT,
        startRow,
      }),
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Search Console API failed (${response.status}): ${detail}`);
    }
    const body = await response.json();
    const rows = body.rows ?? [];
    allRows.push(...rows);
    if (rows.length < ROW_LIMIT) break;
  }
  return allRows;
}

function round(value, digits = 4) {
  return Number(value.toFixed(digits));
}

function normalizeRows(rows) {
  return rows.map((row) => ({
    query: row.keys?.[0] ?? '',
    page: row.keys?.[1] ?? '',
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: round(row.ctr ?? 0),
    position: round(row.position ?? 0, 2),
  }));
}

function aggregateQueries(rows) {
  const queries = new Map();
  for (const row of rows) {
    const current = queries.get(row.query) ?? {
      query: row.query,
      clicks: 0,
      impressions: 0,
      weightedPosition: 0,
      pages: new Set(),
      pageImpressions: new Map(),
    };
    current.clicks += row.clicks;
    current.impressions += row.impressions;
    current.weightedPosition += row.position * row.impressions;
    if (row.page) {
      current.pages.add(row.page);
      current.pageImpressions.set(
        row.page,
        (current.pageImpressions.get(row.page) ?? 0) + row.impressions,
      );
    }
    queries.set(row.query, current);
  }

  return [...queries.values()]
    .map((item) => {
      const pages = [...item.pages].sort(
        (a, b) => (item.pageImpressions.get(b) ?? 0) - (item.pageImpressions.get(a) ?? 0),
      );
      return {
        query: item.query,
        clicks: item.clicks,
        impressions: item.impressions,
        ctr: item.impressions ? round(item.clicks / item.impressions) : 0,
        position: item.impressions ? round(item.weightedPosition / item.impressions, 2) : 0,
        topPage: pages[0] ?? null,
        pages,
      };
    })
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
}

function expectedCtr(position) {
  if (position <= 1.5) return 0.28;
  if (position <= 2.5) return 0.15;
  if (position <= 3.5) return 0.11;
  if (position <= 5.5) return 0.075;
  if (position <= 10.5) return 0.04;
  if (position <= 20.5) return 0.02;
  return 0.01;
}

function buildOpportunities(queries) {
  return queries
    .filter((item) => (
      item.impressions >= 3 &&
      item.position >= 1 &&
      item.position <= 30 &&
      expectedCtr(item.position) > item.ctr
    ))
    .map((item) => {
      const ctrGap = expectedCtr(item.position) - item.ctr;
      const rankWeight = Math.max(0.25, (31 - item.position) / 30);
      return {
        ...item,
        opportunity: item.position <= 3 ? 'title-ctr' : item.position <= 10 ? 'quick-win' : 'content-gap',
        estimatedClickUpside: round(item.impressions * ctrGap, 2),
        score: round(item.impressions * ctrGap * rankWeight, 2),
      };
    })
    .sort((a, b) => b.score - a.score || b.impressions - a.impressions)
    .slice(0, 200);
}

function escapeCell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function toMarkdown(report) {
  const rows = report.opportunities.slice(0, 100).map((item) => (
    `| ${escapeCell(item.query)} | ${item.impressions} | ${item.clicks} | ` +
    `${round(item.ctr * 100, 1)}% | ${item.position} | ${item.opportunity} | ` +
    `${escapeCell(item.topPage)} |`
  ));
  return [
    '# Search Console 长尾机会',
    '',
    `- 站点：\`${report.site}\``,
    `- 数据源：\`${report.source}\``,
    `- 数据范围：${report.startDate} 至 ${report.endDate}`,
    `- 生成时间：${report.generatedAt}`,
    `- Query 数：${report.summary.queryCount}`,
    `- Query × Page 行数：${report.summary.queryPageRowCount}`,
    '',
    '机会类型：`title-ctr` 优先改标题/摘要；`quick-win` 补精准段落与内链；`content-gap` 扩写或新建专题。',
    '',
    '| Query | 展现 | 点击 | CTR | 排名 | 机会 | 主要落地页 |',
    '|---|---:|---:|---:|---:|---|---|',
    ...rows,
    '',
  ].join('\n');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const { startDate, endDate } = getDateRange(options.days, options.lagDays);
  let rawRows;
  let source;
  if (hasNativeAuthentication()) {
    const accessToken = await getAccessToken();
    rawRows = await querySearchConsole({
      site: options.site,
      startDate,
      endDate,
      accessToken,
    });
    source = 'native-api-auth';
  } else {
    rawRows = await querySearchConsoleViaCli({
      site: options.site,
      startDate,
      endDate,
      gscCliDir: resolve(options.gscCliDir),
    });
    source = 'gsc-cli-oauth';
  }
  const queryPageRows = normalizeRows(rawRows);
  const topQueries = aggregateQueries(queryPageRows);
  const report = {
    generatedAt: new Date().toISOString(),
    site: options.site,
    source,
    startDate,
    endDate,
    summary: {
      queryCount: topQueries.length,
      queryPageRowCount: queryPageRows.length,
      clicks: round(queryPageRows.reduce((sum, item) => sum + item.clicks, 0), 2),
      impressions: round(queryPageRows.reduce((sum, item) => sum + item.impressions, 0), 2),
    },
    topQueries,
    opportunities: buildOpportunities(topQueries),
    queryPageRows,
  };

  const output = resolve(options.output);
  const markdownOutput = output.replace(/\.json$/i, '.md');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(markdownOutput, toMarkdown(report), 'utf8');
  console.log(`Search Console report: ${output}`);
  console.log(`Editorial opportunity list: ${markdownOutput}`);
  console.log(`Data source: ${source}`);
  console.log(`Date range: ${startDate} to ${endDate}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

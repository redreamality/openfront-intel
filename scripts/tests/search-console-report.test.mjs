import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildSearchConsoleReport, searchConsoleMarkdown } from '../search-console-report.mjs';

test('property counts and best position survive repeated page and fragment results', () => {
  const query = [{ keys: ['openfront shortcuts'], clicks: 47, impressions: 100, ctr: 0.47, position: 1.31 }];
  const queryPage = [
    { keys: ['openfront shortcuts', 'https://openfront.fyi/shortcuts/'], clicks: 47, impressions: 99, ctr: 47 / 99, position: 1.24 },
    { keys: ['openfront shortcuts', 'https://openfront.fyi/guides/hotkeys/'], clicks: 1, impressions: 100, ctr: 0.01, position: 5.47 },
    { keys: ['openfront shortcuts', 'https://openfront.fyi/guides/hotkeys/#training'], clicks: 50, impressions: 200, ctr: 0.25, position: 6 },
  ];
  const report = buildSearchConsoleReport({
    site: 'sc-domain:openfront.fyi', source: 'fixture', startDate: '2026-09-09', endDate: '2026-10-06',
    totals: [{ clicks: 80, impressions: 150, ctr: 80 / 150, position: 2 }], query, queryPage,
  });
  assert.equal(report.summary.clicks, 80);
  assert.equal(report.summary.impressions, 150);
  assert.equal(report.summary.namedQueryClicks, 47);
  assert.equal(report.topQueries[0].impressions, 100);
  assert.equal(report.topQueries[0].position, 1.31);
  assert.equal(report.topQueries[0].ctr, 0.47);
  assert.equal(report.topQueries[0].topPageByClicks, 'https://openfront.fyi/shortcuts/');
  assert.equal(report.topQueries[0].topPageByImpressions, 'https://openfront.fyi/guides/hotkeys/');
  assert.equal(report.topQueries[0].fragmentLinks.length, 1);
  assert.equal(report.opportunities.length, 1); // High CTR still permits an intent check.
  assert.equal(report.opportunities[0].estimatedClickUpside, undefined);
  assert.match(searchConsoleMarkdown(report), /点击最多页.*展现最多页/);
});

test('zero clicks, no page results and an empty property stay explicit', () => {
  const report = buildSearchConsoleReport({
    site: 'test', source: 'fixture', startDate: '2026-09-09', endDate: '2026-10-06', totals: [],
    query: [{ keys: ['openfront mirv cost'], clicks: 0, impressions: 25, ctr: 0, position: 3.44 }], queryPage: [],
  });
  assert.equal(report.summary.namedQueryClickCoverage, null);
  assert.equal(report.topQueries[0].topPage, null);
  assert.equal(report.opportunities[0].lowSample, true);
  assert.doesNotMatch(searchConsoleMarkdown(report), /NaN|Infinity/);
});

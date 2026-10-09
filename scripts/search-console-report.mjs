// Property metrics must come from the API, never from summed page rows.
const round = (value, digits = 4) => Number(value.toFixed(digits));
const metrics = (row = {}) => ({
  clicks: row.clicks ?? 0,
  impressions: row.impressions ?? 0,
  ctr: row.ctr ?? 0,
  position: row.position ?? null,
});

export function buildSearchConsoleReport({ site, source, startDate, endDate, totals, query, queryPage }) {
  const queryPageRows = queryPage.map((row) => {
    const page = row.keys?.[1] ?? '';
    return { query: row.keys?.[0] ?? '', page, ...metrics(row), isFragment: page.includes('#') };
  });
  const pagesByQuery = new Map();
  for (const row of queryPageRows) {
    const pages = pagesByQuery.get(row.query) ?? [];
    pages.push(row);
    pagesByQuery.set(row.query, pages);
  }
  const topQueries = query.map((row) => {
    const name = row.keys?.[0] ?? '';
    const allPages = pagesByQuery.get(name) ?? [];
    const pages = allPages.filter((page) => !page.isFragment);
    const byClicks = [...pages].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions || a.page.localeCompare(b.page));
    const byImpressions = [...pages].sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks || a.page.localeCompare(b.page));
    return {
      query: name,
      ...metrics(row),
      topPage: byClicks[0]?.page ?? null,
      topPageByClicks: byClicks[0]?.page ?? null,
      topPageByImpressions: byImpressions[0]?.page ?? null,
      pages: byClicks.map((page) => page.page),
      pageMetrics: byClicks,
      fragmentLinks: allPages.filter((page) => page.isFragment),
    };
  }).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
  const total = metrics(totals[0]);
  const namedQueryClicks = topQueries.reduce((sum, row) => sum + row.clicks, 0);
  const namedQueryImpressions = topQueries.reduce((sum, row) => sum + row.impressions, 0);
  const opportunities = topQueries.filter((row) => row.impressions >= 3 && row.position >= 1 && row.position <= 30)
    .map((row) => ({
      ...row,
      opportunity: row.position <= 3 ? 'snippet-check' : row.position <= 10 ? 'answer-improvement' : 'relevance-check',
      lowSample: row.impressions < 30,
      navigationalCandidate: /^(?:open\s*front\s*(?:\.?\s*io)?|openfront\.io)$/i.test(row.query.trim()),
    })).sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks).slice(0, 200);
  return {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(), site, source, startDate, endDate,
    searchType: 'web', dataState: 'final',
    aggregation: { summary: 'byProperty', topQueries: 'byProperty', queryPageRows: 'byPage' },
    summary: {
      ...total,
      queryCount: topQueries.length, queryPageRowCount: queryPageRows.length,
      fragmentRowCount: queryPageRows.filter((row) => row.isFragment).length,
      namedQueryClicks, namedQueryImpressions,
      namedQueryClickCoverage: total.clicks ? round(namedQueryClicks / total.clicks) : null,
    },
    topQueries, opportunities, queryPageRows,
  };
}

const escapeCell = (value) => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');

export function searchConsoleMarkdown(report) {
  return [
    '# Search Console 查询与落地检查', '',
    `- 站点：${report.site}`,
    `- 数据源：${report.source}；web / final`,
    `- 数据范围：${report.startDate} 至 ${report.endDate}`,
    `- 全站：${report.summary.clicks} 点击 / ${report.summary.impressions} 展现（byProperty）`,
    `- 可见查询：${report.summary.queryCount}；点击覆盖率：${report.summary.namedQueryClickCoverage == null ? '无点击' : round(report.summary.namedQueryClickCoverage * 100, 1) + '%'}`,
    `- 页面行：${report.summary.queryPageRowCount}（byPage）；其中锚点行：${report.summary.fragmentRowCount}`,
    '',
    '查询表使用站点级 API 指标。展现不是全网搜索量，平均排名不是固定名次。匿名查询和明细保留限制会使可见词合计小于总数。',
    '页面行只定位承接页，不累加为查询指标。锚点单独保留。点击最多页与展现最多页均排除锚点；无点击时前者按展现排序，不能当作唯一主答案。',
    'snippet-check：检查真实搜索标题/摘要；answer-improvement：检查答案与入口；relevance-check：核对相关性和意图。分类是排查提示，不以通用 CTR 曲线判失败或估算新增点击。',
    '',
    '| Query | 展现 | 点击 | CTR | 平均排名 | 检查 | 样本/意图提示 | 点击最多页 | 展现最多页 |',
    '|---|---:|---:|---:|---:|---|---|---|---|',
    ...report.opportunities.slice(0, 100).map((row) => [
      '|', escapeCell(row.query), '|', row.impressions, '|', row.clicks, '|',
      round(row.ctr * 100, 2) + '%', '|', round(row.position, 2), '|', row.opportunity, '|',
      [row.lowSample ? '小样本' : '', row.navigationalCandidate ? '可能找官网/进入游戏' : ''].filter(Boolean).join('；'), '|',
      escapeCell(row.topPageByClicks), '|', escapeCell(row.topPageByImpressions), '|',
    ].join(' ')), '',
  ].join('\n');
}

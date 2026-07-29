const githubIssuesUrl = 'https://github.com/redreamality/openfront-intel/issues/new/choose';

function normalizeFeedlogUrl(value: string | undefined): URL | null {
  const raw = value?.trim();
  if (!raw) return null;

  const url = new URL(raw);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('PUBLIC_FEEDLOG_URL must use http:// or https://');
  }

  url.search = '';
  url.hash = '';
  url.pathname = `${url.pathname.replace(/\/+$/, '')}/`;
  return url;
}

const feedlogBaseUrl = normalizeFeedlogUrl(import.meta.env.PUBLIC_FEEDLOG_URL);

export const feedbackIntegration = {
  enabled: feedlogBaseUrl !== null,
  provider: feedlogBaseUrl ? 'feedlog' : 'github',
  feedbackUrl: feedlogBaseUrl?.toString() ?? githubIssuesUrl,
  roadmapUrl: feedlogBaseUrl ? new URL('roadmap', feedlogBaseUrl).toString() : null,
} as const;

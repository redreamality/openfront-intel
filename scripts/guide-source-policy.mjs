export function sourcePackPasses({ reddit, youtube, official, notesWords, maintenance, existingTranslations }) {
  if (official < 1 || notesWords < 600) return false;
  if (maintenance) return existingTranslations === true;
  return reddit >= 3 && youtube >= 3;
}

export function sectionsPass({ maintenance, h2Counts, h3Counts = [] }) {
  return h2Counts.length >= (maintenance ? 1 : 8)
    && [...h2Counts, ...h3Counts].every(count => count >= 401);
}

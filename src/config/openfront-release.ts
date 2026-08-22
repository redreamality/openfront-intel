export interface OpenFrontRelease {
  series: `v${number}`;
  tag: `v0.${number}.${number}`;
  displayVersion: `v${number}.${number}`;
  releaseUrl: `https://github.com/openfrontio/OpenFrontIO/releases/tag/${string}`;
}

function defineOpenFrontRelease(tag: `v0.${number}.${number}`): OpenFrontRelease {
  const match = /^v0\.(\d+)\.(\d+)$/.exec(tag);
  if (!match) throw new Error(`Invalid OpenFront release tag: ${tag}`);

  const [, series, patch] = match;
  return {
    series: `v${Number(series)}`,
    tag,
    displayVersion: `v${Number(series)}.${Number(patch)}`,
    releaseUrl: `https://github.com/openfrontio/OpenFrontIO/releases/tag/${tag}`,
  };
}

export const latestOpenFrontRelease = defineOpenFrontRelease('v0.33.7');

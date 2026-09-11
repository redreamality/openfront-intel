export interface OpenFrontRelease {
  series: `v${number}`;
  tag: `v0.${number}.${number}` | `v0.${number}.${number}-${string}`;
  displayVersion: string;
  releaseUrl: `https://github.com/openfrontio/OpenFrontIO/releases/tag/${string}`;
}

function defineOpenFrontRelease(
  tag: `v0.${number}.${number}` | `v0.${number}.${number}-${string}`,
): OpenFrontRelease {
  const match = /^v0\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(tag);
  if (!match) throw new Error(`Invalid OpenFront release tag: ${tag}`);

  const [, series, patch, suffix] = match;
  return {
    series: `v${Number(series)}`,
    tag,
    displayVersion: `v${Number(series)}.${Number(patch)}${suffix ? `-${suffix}` : ''}`,
    releaseUrl: `https://github.com/openfrontio/OpenFrontIO/releases/tag/${tag}`,
  };
}

export const latestOpenFrontRelease = defineOpenFrontRelease('v0.34.0-beta1');

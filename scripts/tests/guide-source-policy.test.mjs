import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sourcePackPasses, sectionsPass } from '../guide-source-policy.mjs';

const base = { reddit: 0, youtube: 0, official: 1, notesWords: 600, maintenance: false, existingTranslations: true };
test('maintenance preserves every section minimum without requiring new-topic section count', () => {
  assert.equal(sectionsPass({ maintenance: true, h2Counts: [401, 500, 450] }), true);
  assert.equal(sectionsPass({ maintenance: true, h2Counts: [] }), false);
  assert.equal(sectionsPass({ maintenance: true, h2Counts: [400, 900] }), false);
  assert.equal(sectionsPass({ maintenance: true, h2Counts: [900], h3Counts: [400] }), false);
  assert.equal(sectionsPass({ maintenance: false, h2Counts: [401, 500, 450] }), false);
  assert.equal(sectionsPass({ maintenance: false, h2Counts: Array(8).fill(401), h3Counts: [401] }), true);
});
test('new guides still require both community source sets', () => {
  assert.equal(sourcePackPasses(base), false);
  assert.equal(sourcePackPasses({ ...base, reddit: 3, youtube: 2 }), false);
  assert.equal(sourcePackPasses({ ...base, reddit: 3, youtube: 3 }), true);
});
test('maintenance requires an existing guide and adequate primary-source notes', () => {
  assert.equal(sourcePackPasses({ ...base, maintenance: true }), true);
  assert.equal(sourcePackPasses({ ...base, maintenance: true, existingTranslations: false }), false);
  assert.equal(sourcePackPasses({ ...base, maintenance: true, official: 0 }), false);
  assert.equal(sourcePackPasses({ ...base, maintenance: true, notesWords: 599 }), false);
});

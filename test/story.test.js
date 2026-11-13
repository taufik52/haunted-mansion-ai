// Tests for the deterministic story engine.
// Maps to requirements.md Req 1 (acceptance criteria 1-7).
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../lib/story.js');

test('Req 1.1: story has exactly 5 chapters', () => {
  const s = E.generateStory({ setting: 'mansion', monster: 'ghost', twist: 'mirror', seed: 13 });
  assert.equal(s.chapters.length, 5);
  assert.deepEqual(s.chapters.map((c) => c.n), [1, 2, 3, 4, 5]);
});

test('Req 1.4: chapters 1-4 have exactly 2 choices; chapter 5 has none', () => {
  const s = E.generateStory({ setting: 'forest', monster: 'witch', twist: 'loop', seed: 7 });
  for (let i = 0; i < 4; i++) assert.equal(s.chapters[i].choices.length, 2);
  assert.equal(s.chapters[4].choices, null);
});

test('Req 1.2: same seed input produces identical story text (determinism)', () => {
  const a = E.generateStory({ setting: 'graveyard', monster: 'vampire', twist: 'candy', seed: 42 });
  const b = E.generateStory({ setting: 'graveyard', monster: 'vampire', twist: 'candy', seed: 42 });
  assert.deepEqual(a, b);
});

test('Req 1.2 (property): determinism holds over 50 random seeds', () => {
  for (let seed = 0; seed < 50; seed++) {
    const a = E.generateStory({ setting: 'carnival', monster: 'pumpkin', twist: 'invitation', seed });
    const b = E.generateStory({ setting: 'carnival', monster: 'pumpkin', twist: 'invitation', seed });
    assert.deepEqual(a, b, `seed ${seed} must be deterministic`);
  }
});

test('Req 1.3: changing only the numeric seed changes the story text', () => {
  const a = E.generateStory({ setting: 'mansion', monster: 'ghost', twist: 'mirror', seed: 1 });
  const b = E.generateStory({ setting: 'mansion', monster: 'ghost', twist: 'mirror', seed: 2 });
  assert.notDeepEqual(
    a.chapters.map((c) => c.text),
    b.chapters.map((c) => c.text)
  );
});

test('Req 1.6 (property): ending is always one of Escape/Haunted/Tricked across all 64 combos', () => {
  const allowed = new Set(['Escape', 'Haunted', 'Tricked']);
  for (const setting of E.SETTINGS) {
    for (const monster of E.MONSTERS) {
      for (const twist of E.TWISTS) {
        const s = E.generateStory({ setting: setting.id, monster: monster.id, twist: twist.id, seed: 13 });
        assert.equal(s.chapters.length, 5);
        // all-brave -> Escape, all-cautious -> Tricked, mixed -> Haunted
        assert.equal(E.endingForChoices([0, 0, 0, 0]).name, 'Escape');
        assert.equal(E.endingForChoices([1, 1, 1, 1]).name, 'Tricked');
        assert.equal(E.endingForChoices([0, 1, 0, 1]).name, 'Haunted');
        assert.ok(allowed.has(E.endingForChoices([0, 0, 1, 1]).name));
      }
    }
  }
});

test('Req 1.6: courage thresholds', () => {
  assert.equal(E.computeEnding(2), 'Escape');
  assert.equal(E.computeEnding(4), 'Escape');
  assert.equal(E.computeEnding(-2), 'Tricked');
  assert.equal(E.computeEnding(-4), 'Tricked');
  assert.equal(E.computeEnding(0), 'Haunted');
  assert.equal(E.computeEnding(1), 'Haunted');
  assert.equal(E.computeEnding(-1), 'Haunted');
});

test('Req 1: unknown ids fall back to the first option instead of crashing', () => {
  const s = E.generateStory({ setting: 'nope', monster: 'nope', twist: 'nope', seed: 0 });
  assert.equal(s.chapters.length, 5);
  assert.equal(s.setting.id, 'mansion');
});

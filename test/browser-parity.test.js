// Browser-parity test: the file the browser actually loads
// (public/js/story-engine.js) must behave identically to lib/story.js.
// Loads it in a vm context with a fake window, no DOM needed.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const libEngine = require('../lib/story.js');

const src = fs.readFileSync(path.join(__dirname, '../public/js/story-engine.js'), 'utf8');
const sandbox = { window: {}, console };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const browserEngine = sandbox.window.HauntedEngine;

test('browser parity: same seed -> same story in browser file and lib', () => {
  for (const seed of [0, 13, 42, 999]) {
    const a = libEngine.generateStory({ setting: 'mansion', monster: 'ghost', twist: 'mirror', seed });
    const b = browserEngine.generateStory({ setting: 'mansion', monster: 'ghost', twist: 'mirror', seed });
    assert.deepEqual(JSON.parse(JSON.stringify(b)), JSON.parse(JSON.stringify(a)));
  }
});

test('browser parity: endings agree', () => {
  assert.equal(browserEngine.endingForChoices([0, 0, 0, 0]).name, 'Escape');
  assert.equal(browserEngine.endingForChoices([1, 1, 1, 1]).name, 'Tricked');
});

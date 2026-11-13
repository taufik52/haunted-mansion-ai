// Server tests (Req 5): / -> 200 with app title, /healthz -> JSON ok, unknown -> 404.
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { server } = require('../server.js');

function get(port, path) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port, path }, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; });
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    }).on('error', reject);
  });
}

test('server: / returns 200 and contains the app title', async (t) => {
  await new Promise((r) => server.listen(0, r));
  t.after(() => server.close());
  const port = server.address().port;
  const res = await get(port, '/');
  assert.equal(res.status, 200);
  assert.match(res.body, /Haunted Mansion AI/);
  assert.match(res.body, /Story Generator/);
  assert.match(res.body, /Mansion Explorer/);
  assert.match(res.body, /Trick-or-Treat Map/);
});

test('server: /healthz returns {"status":"ok"}', async (t) => {
  await new Promise((r) => server.listen(0, r));
  t.after(() => server.close());
  const port = server.address().port;
  const res = await get(port, '/healthz');
  assert.equal(res.status, 200);
  assert.deepEqual(JSON.parse(res.body), { status: 'ok' });
});

test('server: static JS/CSS served; unknown path returns 404', async (t) => {
  await new Promise((r) => server.listen(0, r));
  t.after(() => server.close());
  const port = server.address().port;
  const js = await get(port, '/js/story-engine.js');
  assert.equal(js.status, 200);
  assert.match(js.body, /mulberry32/);
  const css = await get(port, '/css/style.css');
  assert.equal(css.status, 200);
  const missing = await get(port, '/no-such-file.html');
  assert.equal(missing.status, 404);
});

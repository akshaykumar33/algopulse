const { execSync } = require('child_process');
const F = 'node contests/codeforces/2026-11-06/theoremOfTwoCans.js';
const R = k => Math.floor(Math.random() * k);
for (let round = 0; round < 30; round++) {
  const tests = [];
  let tot = 0;
  while (tot < 900) { const n = 3 + R(R(3) ? 6 : 40); tot += n; let s = ''; const mode = R(4); for (let i = 0; i < n - 1; i++) s += mode === 0 ? '0' : mode === 1 ? '1' : R(2); tests.push([n, s]); }
  const out = execSync(F, { input: `first\n${tests.length}\n` + tests.map(([n, s]) => `${n}\n${s}`).join('\n') }).toString().trim().split(/\r?\n/);
  let p = 0;
  const graphs = tests.map(([n]) => {
    const m = +out[p++]; const E = new Set();
    for (let i = 0; i < m; i++) { const [u, v] = out[p++].split(' ').map(Number); E.add(Math.min(u, v) + ',' + Math.max(u, v)); }
    const key = (u, v) => Math.min(u, v) + ',' + Math.max(u, v);
    for (let op = 0; op < 300; op++) {
      const adj = Array.from({ length: n + 1 }, () => []);
      for (const e of E) { const [u, v] = e.split(',').map(Number); adj[u].push(v); adj[v].push(u); }
      const path = [1 + R(n)], seen = new Set(path);
      const L = 2 * (2 + R(3));
      while (path.length < L) { const c = adj[path[path.length - 1]].filter(x => !seen.has(x)); if (!c.length) break; const x = c[R(c.length)]; path.push(x); seen.add(x); }
      if (path.length % 2 || path.length < 4) continue;
      const i = R(path.length - 1);
      E.delete(key(path[i], path[i + 1]));
      E.add(key(path[0], path[path.length - 1]));
    }
    const arr = [...E].map(e => { const [u, v] = e.split(','); return R(2) ? `${u} ${v}` : `${v} ${u}`; }).sort(() => Math.random() - 0.5);
    return `${n} ${arr.length}\n` + arr.join('\n');
  });
  const order = tests.map((_, i) => i).sort(() => Math.random() - 0.5);
  const res = execSync(F, { input: `second\n${tests.length}\n` + order.map(i => graphs[i]).join('\n') }).toString().trim().split(/\r?\n/);
  order.forEach((i, j) => { if (res[j] !== tests[i][1]) { console.log('FAIL', tests[i], res[j]); process.exit(1); } });
}
console.log('ok');

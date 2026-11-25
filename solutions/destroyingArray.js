'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const a = new Float64Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(tok[ptr++], 10);
  const p = new Int32Array(n);
  for (let i = 0; i < n; i++) p[i] = parseInt(tok[ptr++], 10) - 1;

  const parent = new Int32Array(n);
  const sz = new Int32Array(n);
  const segSum = new Float64Array(n);
  const active = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    sz[i] = 1;
  }

  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }

  function unite(x, y) {
    let rx = find(x);
    let ry = find(y);
    if (rx === ry) return rx;
    if (sz[rx] < sz[ry]) {
      const tmp = rx;
      rx = ry;
      ry = tmp;
    }
    parent[ry] = rx;
    sz[rx] += sz[ry];
    segSum[rx] += segSum[ry];
    return rx;
  }

  const out = new Array(n);
  let curMax = 0;
  out[n - 1] = 0;
  for (let i = n - 1; i >= 1; i--) {
    const pos = p[i];
    active[pos] = 1;
    segSum[pos] = a[pos];
    if (pos > 0 && active[pos - 1]) unite(pos, pos - 1);
    if (pos + 1 < n && active[pos + 1]) unite(pos, pos + 1);
    const root = find(pos);
    if (segSum[root] > curMax) curMax = segSum[root];
    out[i - 1] = curMax;
  }
  console.log(out.join('\n'));
}

solve();

'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const m = parseInt(tok[ptr++], 10);
  const k = parseInt(tok[ptr++], 10);
  const c = new Int32Array(n);
  for (let i = 0; i < n; i++) c[i] = parseInt(tok[ptr++], 10);

  const parent = new Int32Array(n);
  const sz = new Int32Array(n);
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

  for (let i = 0; i < m; i++) {
    const u = find(parseInt(tok[ptr++], 10) - 1);
    const v = find(parseInt(tok[ptr++], 10) - 1);
    if (u !== v) {
      if (sz[u] < sz[v]) {
        parent[u] = v;
        sz[v] += sz[u];
      } else {
        parent[v] = u;
        sz[u] += sz[v];
      }
    }
  }

  const head = new Int32Array(n).fill(-1);
  const nxt = new Int32Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    const r = find(i);
    nxt[i] = head[r];
    head[r] = i;
  }

  const freq = new Int32Array(k + 1);
  const touched = [];
  let ans = 0;
  for (let r = 0; r < n; r++) {
    if (head[r] === -1) continue;
    let cnt = 0;
    let maxF = 0;
    for (let u = head[r]; u !== -1; u = nxt[u]) {
      const col = c[u];
      if (freq[col] === 0) touched.push(col);
      freq[col]++;
      if (freq[col] > maxF) maxF = freq[col];
      cnt++;
    }
    ans += cnt - maxF;
    for (let j = 0; j < touched.length; j++) freq[touched[j]] = 0;
    touched.length = 0;
  }

  console.log(ans);
}

solve();

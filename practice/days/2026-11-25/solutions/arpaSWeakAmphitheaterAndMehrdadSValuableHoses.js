'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const m = parseInt(tok[ptr++], 10);
  const wMax = parseInt(tok[ptr++], 10);
  const w = new Int32Array(n);
  const b = new Int32Array(n);
  for (let i = 0; i < n; i++) w[i] = parseInt(tok[ptr++], 10);
  for (let i = 0; i < n; i++) b[i] = parseInt(tok[ptr++], 10);

  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;
  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }
  for (let i = 0; i < m; i++) {
    const u = parseInt(tok[ptr++], 10) - 1;
    const v = parseInt(tok[ptr++], 10) - 1;
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) parent[rv] = ru;
  }

  const comps = new Map();
  for (let i = 0; i < n; i++) {
    const r = find(i);
    if (!comps.has(r)) comps.set(r, []);
    comps.get(r).push(i);
  }

  const dp = new Float64Array(wMax + 1);
  for (const members of comps.values()) {
    let sumW = 0;
    let sumB = 0;
    const opts = [];
    for (let i = 0; i < members.length; i++) {
      const idx = members[i];
      sumW += w[idx];
      sumB += b[idx];
      if (w[idx] <= wMax) opts.push([w[idx], b[idx]]);
    }
    if (members.length > 1 && sumW <= wMax) opts.push([sumW, sumB]);
    for (let j = wMax; j >= 0; j--) {
      for (let k = 0; k < opts.length; k++) {
        const wt = opts[k][0];
        if (wt <= j) {
          const cand = dp[j - wt] + opts[k][1];
          if (cand > dp[j]) dp[j] = cand;
        }
      }
    }
  }

  console.log(dp[wMax]);
}

solve();

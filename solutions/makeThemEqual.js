'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;

  const MAXB = 1000;
  const dist = new Int32Array(MAXB + 1).fill(-1);
  dist[1] = 0;
  const q = [1];
  let head = 0;
  while (head < q.length) {
    const u = q[head++];
    const d = dist[u];
    for (let x = 1; x <= u; x++) {
      const v = u + Math.floor(u / x);
      if (v <= MAXB && dist[v] === -1) {
        dist[v] = d + 1;
        q.push(v);
      }
    }
  }

  const t = parseInt(tok[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tok[ptr++], 10);
    const k = parseInt(tok[ptr++], 10);
    const w = new Int32Array(n);
    const c = new Int32Array(n);
    let sumW = 0;
    let sumC = 0;
    for (let i = 0; i < n; i++) {
      const b = parseInt(tok[ptr++], 10);
      w[i] = dist[b];
      sumW += w[i];
    }
    for (let i = 0; i < n; i++) {
      c[i] = parseInt(tok[ptr++], 10);
      sumC += c[i];
    }
    if (k >= sumW) {
      out.push(sumC);
      continue;
    }
    const dp = new Float64Array(k + 1);
    for (let i = 0; i < n; i++) {
      const wi = w[i];
      const ci = c[i];
      for (let j = k; j >= wi; j--) {
        const cand = dp[j - wi] + ci;
        if (cand > dp[j]) dp[j] = cand;
      }
    }
    out.push(dp[k]);
  }
  console.log(out.join('\n'));
}

solve();

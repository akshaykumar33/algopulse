'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const x = parseInt(tok[ptr++], 10);
  const l = new Int32Array(n);
  const r = new Int32Array(n);
  const cost = new Float64Array(n);
  const byL = new Int32Array(n);
  const byR = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    l[i] = parseInt(tok[ptr++], 10);
    r[i] = parseInt(tok[ptr++], 10);
    cost[i] = parseInt(tok[ptr++], 10);
    byL[i] = i;
    byR[i] = i;
  }

  byL.sort((a, b) => l[a] - l[b]);
  byR.sort((a, b) => r[a] - r[b]);

  const minCost = new Float64Array(x + 1);
  minCost.fill(Infinity);
  let ans = Infinity;
  let p = 0;
  for (let i = 0; i < n; i++) {
    const id = byL[i];
    const curL = l[id];
    while (p < n && r[byR[p]] < curL) {
      const pid = byR[p++];
      const len = r[pid] - l[pid] + 1;
      if (len < x && cost[pid] < minCost[len]) minCost[len] = cost[pid];
    }
    const curLen = r[id] - curL + 1;
    if (curLen < x) {
      const need = x - curLen;
      if (minCost[need] < Infinity) {
        const cand = cost[id] + minCost[need];
        if (cand < ans) ans = cand;
      }
    }
  }

  console.log(ans === Infinity ? -1 : ans);
}

solve();

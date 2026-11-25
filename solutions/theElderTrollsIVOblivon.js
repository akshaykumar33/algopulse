'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  const dims = [
    parseInt(tok[0], 10) - 1,
    parseInt(tok[1], 10) - 1,
    parseInt(tok[2], 10) - 1
  ];
  dims.sort((a, b) => a - b);
  const k = parseInt(tok[3], 10);
  const total = dims[0] + dims[1] + dims[2];
  const rem = k < total ? k : total;
  const a = Math.min(dims[0], Math.floor(rem / 3));
  const rem2 = rem - a;
  const b = Math.min(dims[1], Math.floor(rem2 / 2));
  const c = Math.min(dims[2], rem2 - b);
  const ans = BigInt(a + 1) * BigInt(b + 1) * BigInt(c + 1);
  console.log(ans.toString());
}

solve();

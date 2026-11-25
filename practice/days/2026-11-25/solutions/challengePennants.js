'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const n = BigInt(raw.split(/\s+/)[0]);
  const c5 = (n * (n + 1n) * (n + 2n) * (n + 3n) * (n + 4n)) / 120n;
  const c3 = (n * (n + 1n) * (n + 2n)) / 6n;
  console.log((c5 * c3).toString());
}

solve();

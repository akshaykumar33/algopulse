'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  const a = parseInt(tok[0], 10);
  const b = parseInt(tok[1], 10);
  if (a < b) {
    console.log(0);
    return;
  }
  if (a === b) {
    console.log('infinity');
    return;
  }
  const d = a - b;
  let cnt = 0;
  for (let i = 1; i * i <= d; i++) {
    if (d % i === 0) {
      if (i > b) cnt++;
      const j = d / i;
      if (j !== i && j > b) cnt++;
    }
  }
  console.log(cnt);
}

solve();

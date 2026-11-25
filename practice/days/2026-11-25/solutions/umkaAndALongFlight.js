'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tok[ptr++], 10);
  const fib = new Array(46);
  fib[0] = 1;
  fib[1] = 1;
  for (let i = 2; i <= 45; i++) fib[i] = fib[i - 1] + fib[i - 2];

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    let n = parseInt(tok[ptr++], 10);
    let x = parseInt(tok[ptr++], 10);
    let y = parseInt(tok[ptr++], 10);
    let ok = true;
    while (n > 0) {
      if (y <= fib[n - 1]) {
        const nx = y;
        const ny = x;
        x = nx;
        y = ny;
        n--;
      } else if (y > fib[n]) {
        const nx = y - fib[n];
        const ny = x;
        x = nx;
        y = ny;
        n--;
      } else {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();

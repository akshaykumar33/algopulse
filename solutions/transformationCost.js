const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let has101 = false;
    let s = 0;
    for (let b = 30; b >= 0; b--) {
      const bit = (n >> b) & 1;
      if (s === 0 && bit === 1) s = 1;
      else if (s === 1 && bit === 0) s = 2;
      else if (s === 2 && bit === 1) { has101 = true; break; }
    }
    if (!has101) {
      out.push(0);
      continue;
    }
    let minCost = Infinity;
    for (let p = 0; p <= 32; p++) {
      for (let q = 0; q <= p; q++) {
        const val = Math.pow(2, p + 1) - Math.pow(2, q);
        if (val >= n) {
          const diff = val - n;
          if (diff < minCost) minCost = diff;
        }
      }
    }
    out.push(minCost);
  }
  console.log(out.join('\n'));
}

solve();

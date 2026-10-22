const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    let minVal = Infinity;
    const a = [];
    for (let j = 0; j < n; j++) {
      const val = parseInt(input[ptr++], 10);
      a.push(val);
      if (val < minVal) minVal = val;
    }
    let g = 0;
    for (let j = 0; j < n; j++) {
      g = gcd(g, a[j] - minVal);
    }
    out.push(g === 0 ? -1 : g);
  }
  console.log(out.join('\n'));
}

solve();

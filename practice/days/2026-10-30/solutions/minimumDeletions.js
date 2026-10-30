const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let g = 0;
    for (let i = 0; i < n; i++) {
      const a = parseInt(input[ptr++], 10);
      g = gcd(g, a);
    }

    if (g === 1) {
      out.push(0);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();

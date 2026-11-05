const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
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
    const cnt = new Array(30).fill(0);
    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      for (let b = 0; b < 30; b++) {
        if ((val & (1 << b)) !== 0) {
          cnt[b]++;
        }
      }
    }

    let g = 0;
    for (let b = 0; b < 30; b++) {
      if (cnt[b] > 0) {
        g = gcd(g, cnt[b]);
      }
    }

    const res = [];
    if (g === 0) {
      for (let k = 1; k <= n; k++) res.push(k);
    } else {
      for (let k = 1; k <= n; k++) {
        if (g % k === 0) {
          res.push(k);
        }
      }
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();


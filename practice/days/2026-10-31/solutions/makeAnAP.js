const fs = require('fs');

function gcd(a, b) {
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(tokens[ptr++], 10));
    }

    if (n <= 1) {
      out.push(0);
      continue;
    }

    let g = a[1] - a[0];
    for (let i = 2; i < n; i++) {
      g = gcd(g, a[i] - a[i - 1]);
    }

    const total = Math.floor((a[n - 1] - a[0]) / g) + 1;
    out.push(total - n);
  }

  console.log(out.join('\n'));
}

solve();

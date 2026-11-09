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
    const s = tokens[ptr++];

    const mp = new Map();
    let d = 0;
    let k = 0;
    const res = [];

    for (let i = 0; i < n; i++) {
      if (s[i] === 'D') d++;
      else k++;

      const g = gcd(d, k);
      const key = `${d / g}_${k / g}`;
      const val = (mp.get(key) || 0) + 1;
      mp.set(key, val);
      res.push(val);
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();


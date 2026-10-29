const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const map = new Map();
    let maxVal = -1;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v > maxVal) maxVal = v;
      const rem = ((v % m) + m) % m;
      if (!map.has(rem) || map.get(rem) < v) {
        map.set(rem, v);
      }
    }

    const distinct = Array.from(map.values());
    let best = 2 * maxVal;

    for (let i = 0; i < distinct.length; i++) {
      const x = distinct[i];
      for (let j = 0; j < distinct.length; j++) {
        const y = distinct[j];
        const mod = ((x - y) % m + m) % m;
        const cand = x + y + mod;
        if (cand > best) best = cand;
      }
    }

    out.push(best.toString());
  }
  console.log(out.join('\n'));
}

solve();

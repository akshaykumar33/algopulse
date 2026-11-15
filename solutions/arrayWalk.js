const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const z = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

    const pref = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + a[i];

    let maxScore = 0;
    for (let left = 0; left <= z; left++) {
      const right = k - 2 * left;
      if (right < 0) continue;
      const reach = right + 1;
      let maxPair = 0;
      for (let i = 0; i < reach; i++) {
        if (i + 1 < n) {
          const pair = a[i] + a[i + 1];
          if (pair > maxPair) maxPair = pair;
        }
      }
      const score = pref[reach] + left * maxPair;
      if (score > maxScore) maxScore = score;
    }
    out.push(maxScore);
  }
  console.log(out.join('\n'));
}

solve();

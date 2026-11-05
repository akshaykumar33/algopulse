const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    const pos = [];
    for (let i = 0; i < n; i++) {
      if (s[i] === '*') {
        pos.push(i);
      }
    }

    const k = pos.length;
    if (k <= 1) {
      out.push(0);
      continue;
    }

    const y = new Array(k);
    for (let i = 0; i < k; i++) {
      y[i] = pos[i] - i;
    }

    const med = y[Math.floor(k / 2)];
    let ans = 0;
    for (let i = 0; i < k; i++) {
      ans += Math.abs(y[i] - med);
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();


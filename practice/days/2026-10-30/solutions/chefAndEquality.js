const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const freq = new Map();
    let maxFreq = 0;

    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      const count = (freq.get(val) || 0) + 1;
      freq.set(val, count);
      if (count > maxFreq) {
        maxFreq = count;
      }
    }

    out.push(n - maxFreq);
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const freq = new Map();

    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      freq.set(val, (freq.get(val) || 0) + 1);
    }

    let maxKept = 0;
    for (const [val, count] of freq.entries()) {
      const pairedVal = val ^ 1;
      const total = count + (freq.get(pairedVal) || 0);
      if (total > maxKept) {
        maxKept = total;
      }
    }

    out.push(n - maxKept);
  }

  console.log(out.join('\n'));
}

solve();

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
    const k = parseInt(tokens[ptr++], 10);
    const freq = new Map();

    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      freq.set(val, (freq.get(val) || 0) + 1);
    }

    let sum = 0;
    let found = false;
    for (const [val, cnt] of freq) {
      if (cnt === k) {
        sum += val;
        found = true;
      }
    }

    out.push(found ? sum : -1);
  }

  console.log(out.join('\n'));
}

solve();

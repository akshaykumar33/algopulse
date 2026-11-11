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
    const chef = parseInt(tokens[ptr++], 10);
    let left = -1;
    let right = 1000000001;

    for (let i = 1; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      if (val < chef && val > left) left = val;
      if (val > chef && val < right) right = val;
    }

    const low = left === -1 ? 1 : Math.max(1, Math.floor((left + chef + 1) / 2));
    const high = right === 1000000001 ? 1000000 : Math.min(1000000, Math.floor((chef + right) / 2));
    out.push(high >= low ? high - low + 1 : 0);
  }

  console.log(out.join('\n'));
}

solve();

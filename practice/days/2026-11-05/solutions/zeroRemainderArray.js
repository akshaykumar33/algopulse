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

    const map = new Map();
    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      const rem = val % k;
      if (rem !== 0) {
        const need = k - rem;
        map.set(need, (map.get(need) || 0) + 1);
      }
    }

    if (map.size === 0) {
      out.push(0);
      continue;
    }

    let maxX = 0;
    for (const [need, cnt] of map.entries()) {
      const curX = need + (cnt - 1) * k;
      if (curX > maxX) {
        maxX = curX;
      }
    }

    out.push(maxX + 1);
  }

  console.log(out.join('\n'));
}

solve();

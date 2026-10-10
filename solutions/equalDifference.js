const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  let idx = 1;
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[idx++], 10);
    const a = input[idx++].trim().split(/\s+/).map(Number);
    const map = new Map();
    for (let i = 0; i < n; i++) {
      const v = a[i] - i;
      map.set(v, (map.get(v) || 0) + 1);
    }
    let pairs = 0;
    for (const cnt of map.values()) {
      if (cnt > 1) {
        pairs += (cnt * (cnt - 1)) / 2;
      }
    }
    out.push(pairs);
  }
  console.log(out.join('\n'));
}

solve();

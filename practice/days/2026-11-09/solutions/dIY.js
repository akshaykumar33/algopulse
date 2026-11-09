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
    const cnt = new Map();
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      cnt.set(v, (cnt.get(v) || 0) + 1);
    }

    const pairs = [];
    for (const [val, count] of cnt.entries()) {
      const p = Math.floor(count / 2);
      for (let k = 0; k < p; k++) {
        pairs.push(val);
      }
    }

    if (pairs.length < 4) {
      out.push('NO');
      continue;
    }

    pairs.sort((a, b) => a - b);
    const sz = pairs.length;
    const v0 = BigInt(pairs[0]);
    const v1 = BigInt(pairs[1]);
    const vm2 = BigInt(pairs[sz - 2]);
    const vm1 = BigInt(pairs[sz - 1]);

    const areaA = (vm1 - v0) * (vm2 - v1);
    const areaB = (vm2 - v0) * (vm1 - v1);

    let x1, y1, x2, y2;
    if (areaB >= areaA) {
      x1 = pairs[0];
      x2 = pairs[sz - 2];
      y1 = pairs[1];
      y2 = pairs[sz - 1];
    } else {
      x1 = pairs[0];
      x2 = pairs[sz - 1];
      y1 = pairs[1];
      y2 = pairs[sz - 2];
    }

    out.push('YES');
    out.push(`${x1} ${y1} ${x1} ${y2} ${x2} ${y1} ${x2} ${y2}`);
  }

  console.log(out.join('\n'));
}

solve();

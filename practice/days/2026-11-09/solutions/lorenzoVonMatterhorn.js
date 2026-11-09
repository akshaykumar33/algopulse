const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const q = parseInt(input[ptr++], 10);
  const map = new Map();
  const out = [];

  for (let i = 0; i < q; i++) {
    const type = parseInt(input[ptr++], 10);
    if (type === 1) {
      let u = BigInt(input[ptr++]);
      let v = BigInt(input[ptr++]);
      const w = BigInt(input[ptr++]);
      while (u !== v) {
        if (u > v) {
          const key = u.toString();
          map.set(key, (map.get(key) || 0n) + w);
          u /= 2n;
        } else {
          const key = v.toString();
          map.set(key, (map.get(key) || 0n) + w);
          v /= 2n;
        }
      }
    } else {
      let u = BigInt(input[ptr++]);
      let v = BigInt(input[ptr++]);
      let sum = 0n;
      while (u !== v) {
        if (u > v) {
          const key = u.toString();
          sum += map.get(key) || 0n;
          u /= 2n;
        } else {
          const key = v.toString();
          sum += map.get(key) || 0n;
          v /= 2n;
        }
      }
      out.push(sum.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();

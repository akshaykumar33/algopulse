const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const k = BigInt(input[ptr++]);
    const a = new BigInt64Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = BigInt(input[ptr++]);
    }
    let baseSum = 0n;
    let maxB = 0n;
    for (let i = 0; i < n; i++) {
      const b = BigInt(input[ptr++]);
      baseSum += a[i] * b;
      const absB = b < 0n ? -b : b;
      if (absB > maxB) maxB = absB;
    }
    const ans = baseSum + k * maxB;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

function main() {}

solve();

const fs = require('fs');

function pop30(x) {
  let c = 0;
  while (x > 0) {
    x &= x - 1;
    c++;
  }
  return c;
}

function popcount(x) {
  const base = 1073741824;
  return pop30(x % base) + pop30(Math.floor(x / base));
}

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const facts = [];
  let f = 2;
  for (let d = 3; d <= 14; d++) {
    f *= d;
    facts.push(f);
  }

  const m = facts.length;
  const totalMasks = 1 << m;
  const subSum = new Float64Array(totalMasks);
  const subCnt = new Int32Array(totalMasks);

  for (let mask = 1; mask < totalMasks; mask++) {
    const lsb = mask & -mask;
    const bit = Math.clz32(lsb) ^ 31;
    const prev = mask ^ lsb;
    subSum[mask] = subSum[prev] + facts[bit];
    subCnt[mask] = subCnt[prev] + 1;
  }

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let ans = popcount(n);
    for (let mask = 1; mask < totalMasks; mask++) {
      if (subSum[mask] <= n) {
        const cur = subCnt[mask] + popcount(n - subSum[mask]);
        if (cur < ans) ans = cur;
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

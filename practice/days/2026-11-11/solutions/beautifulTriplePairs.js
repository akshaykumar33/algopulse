const fs = require('fs');

function countEq(arr) {
  const m = arr.length;
  if (m < 2) return 0;
  arr.sort();
  let res = 0;
  let run = 1;
  for (let i = 1; i < m; i++) {
    if (arr[i] === arr[i - 1]) {
      run++;
    } else {
      res += (run * (run - 1)) / 2;
      run = 1;
    }
  }
  res += (run * (run - 1)) / 2;
  return res;
}

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    const m = n - 2;
    const p12 = new Float64Array(m);
    const p13 = new Float64Array(m);
    const p23 = new Float64Array(m);
    const p123 = new BigUint64Array(m);

    for (let i = 0; i < m; i++) {
      const x = a[i];
      const y = a[i + 1];
      const z = a[i + 2];
      p12[i] = x * 1048576 + y;
      p13[i] = x * 1048576 + z;
      p23[i] = y * 1048576 + z;
      p123[i] = (BigInt(x) << 40n) | (BigInt(y) << 20n) | BigInt(z);
    }

    const ans = countEq(p12) + countEq(p13) + countEq(p23) - 3 * countEq(p123);
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

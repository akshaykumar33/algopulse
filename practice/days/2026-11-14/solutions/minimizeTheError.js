const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 4) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k1 = parseInt(input[ptr++], 10);
  const k2 = parseInt(input[ptr++], 10);
  let k = k1 + k2;

  const a = [];
  for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));
  const b = [];
  for (let i = 0; i < n; i++) b.push(parseInt(input[ptr++], 10));

  const d = [];
  for (let i = 0; i < n; i++) d.push(Math.abs(a[i] - b[i]));

  while (k > 0) {
    let maxIdx = 0;
    for (let i = 1; i < n; i++) {
      if (d[i] > d[maxIdx]) maxIdx = i;
    }
    if (d[maxIdx] === 0) {
      d[maxIdx] = k % 2;
      k = 0;
      break;
    }
    d[maxIdx]--;
    k--;
  }

  let ans = 0n;
  for (let i = 0; i < n; i++) {
    const val = BigInt(d[i]);
    ans += val * val;
  }
  console.log(ans.toString());
}

solve();

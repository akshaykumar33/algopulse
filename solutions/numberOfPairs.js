const fs = require('fs');

function countPairs(a, n, maxVal) {
  let cnt = 0n;
  let l = 0;
  let r = n - 1;
  while (l < r) {
    if (a[l] + a[r] <= maxVal) {
      cnt += BigInt(r - l);
      l++;
    } else {
      r--;
    }
  }
  return cnt;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const l = parseInt(input[ptr++], 10);
    const r = parseInt(input[ptr++], 10);

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
    a.sort();

    const ans = countPairs(a, n, r) - countPairs(a, n, l - 1);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

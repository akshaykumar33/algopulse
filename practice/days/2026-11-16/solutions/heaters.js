const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const r = parseInt(input[ptr++], 10);
  const a = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) a[i] = parseInt(input[ptr++], 10);

  let cur = 1;
  let ans = 0;

  while (cur <= n) {
    let best = -1;
    const right = Math.min(n, cur + r - 1);
    const left = Math.max(1, cur - r + 1);
    for (let j = right; j >= left; j--) {
      if (a[j] === 1) {
        best = j;
        break;
      }
    }
    if (best === -1) {
      console.log(-1);
      return;
    }
    ans++;
    cur = best + r;
  }
  console.log(ans);
}

solve();

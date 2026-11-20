const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  const MOD = 998244353;

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const cnt = new Int32Array(n);
    let validValues = true;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v >= 0 && v < n) cnt[v]++;
      else validValues = false;
    }

    if (!validValues) {
      out.push(0);
      continue;
    }

    let ans = 1;
    let possible = true;
    const half = n >> 1;
    for (let i = 0; i < half; i++) {
      if (cnt[i] + cnt[n - 1 - i] !== 2) {
        possible = false;
        break;
      }
      ans = (ans * 2) % MOD;
    }

    if (n % 2 === 1 && cnt[half] !== 1) {
      possible = false;
    }

    out.push(possible ? ans : 0);
  }
  console.log(out.join('\n'));
}
solve();

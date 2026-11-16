const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = BigInt(input[ptr++]);
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = BigInt(input[ptr++]);
  const b = new Array(n);
  for (let i = 0; i < n; i++) b[i] = BigInt(input[ptr++]);

  let low = 0n;
  let high = 2000000005n;
  let ans = 0n;

  while (low <= high) {
    const mid = (low + high) / 2n;
    let needed = 0n;
    let ok = true;
    for (let i = 0; i < n; i++) {
      const req = mid * a[i];
      if (req > b[i]) {
        needed += req - b[i];
        if (needed > k) {
          ok = false;
          break;
        }
      }
    }
    if (ok && needed <= k) {
      ans = mid;
      low = mid + 1n;
    } else {
      high = mid - 1n;
    }
  }
  console.log(ans.toString());
}

solve();

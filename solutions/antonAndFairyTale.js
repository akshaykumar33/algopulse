const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const parts = input.split(/\s+/);
  const n = BigInt(parts[0]);
  const m = BigInt(parts[1]);

  if (m >= n) {
    console.log(n.toString());
    return;
  }

  const target = n - m;
  let low = 0n, high = 2000000000n, bestK = high;

  while (low <= high) {
    const mid = (low + high) / 2n;
    const sum = (mid * (mid + 1n)) / 2n;
    if (sum >= target) {
      bestK = mid;
      high = mid - 1n;
    } else {
      low = mid + 1n;
    }
  }

  const ans = m + bestK;
  console.log(ans.toString());
}

solve();

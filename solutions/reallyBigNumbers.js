const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = BigInt(tokens[0]);
  const s = BigInt(tokens[1]);
  function sumDigits(x) {
    let sum = 0n;
    while (x > 0n) {
      sum += x % 10n;
      x /= 10n;
    }
    return sum;
  }
  let low = 1n;
  let high = n;
  let firstBig = -1n;
  while (low <= high) {
    const mid = (low + high) / 2n;
    if (mid - sumDigits(mid) >= s) {
      firstBig = mid;
      high = mid - 1n;
    } else {
      low = mid + 1n;
    }
  }
  if (firstBig === -1n) {
    console.log('0');
  } else {
    console.log((n - firstBig + 1n).toString());
  }
}

solve();

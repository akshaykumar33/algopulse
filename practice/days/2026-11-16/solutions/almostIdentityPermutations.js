const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const n = BigInt(input[0]);
  const k = parseInt(input[1], 10);

  let ans = 1n;
  if (k >= 2) {
    ans += n * (n - 1n) / 2n;
  }
  if (k >= 3) {
    ans += (n * (n - 1n) * (n - 2n) / 6n) * 2n;
  }
  if (k >= 4) {
    ans += (n * (n - 1n) * (n - 2n) * (n - 3n) / 24n) * 9n;
  }
  console.log(ans.toString());
}

solve();

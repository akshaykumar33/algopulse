const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = BigInt(input[0]);
  const k = BigInt(input[1]);
  if (k >= 43n) {
    console.log('No');
    return;
  }
  for (let i = 1n; i <= k; i++) {
    if (n % i !== i - 1n) {
      console.log('No');
      return;
    }
  }
  console.log('Yes');
}
solve();
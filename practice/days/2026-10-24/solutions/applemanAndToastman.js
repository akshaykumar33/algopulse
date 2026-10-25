const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || !input[0]) return;
  const n = parseInt(input[0], 10);
  if (n === 1) {
    console.log(input[1].trim());
    return;
  }
  const arr = input[1].trim().split(/\s+/).map(BigInt);
  arr.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  let ans = 0n;
  for (let i = 0; i < n - 1; i++) {
    ans += arr[i] * BigInt(i + 2);
  }
  ans += arr[n - 1] * BigInt(n);

  console.log(ans.toString());
}

solve();

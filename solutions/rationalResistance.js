const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 2) return;
  let a = BigInt(input[0]);
  let b = BigInt(input[1]);
  let ans = 0n;
  while (b > 0n) {
    ans += a / b;
    const rem = a % b;
    a = b;
    b = rem;
  }
  console.log(ans.toString());
}

solve();

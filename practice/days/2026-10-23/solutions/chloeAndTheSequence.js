const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let n = parseInt(input[0], 10);
  let k = BigInt(input[1]);

  let ans = 1;
  while (k % 2n === 0n) {
    ans++;
    k /= 2n;
  }

  console.log(ans);
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let n = BigInt(input[0]);

  if ((n & 1n) === 0n) {
    console.log((n / 2n).toString());
    return;
  }

  let d = 0n;
  for (let i = 3n; i * i <= n; i += 2n) {
    if (n % i === 0n) {
      d = i;
      break;
    }
  }

  if (d === 0n) {
    console.log('1');
    return;
  }

  const ans = 1n + (n - d) / 2n;
  console.log(ans.toString());
}

solve();

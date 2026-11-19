const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const N = parseInt(input[0], 10);
  if (N < 13) {
    console.log(0);
    return;
  }
  const M = BigInt(Math.floor((N - 1) / 2));
  if (M < 6n) {
    console.log(0);
    return;
  }
  const MOD = 1000000007n;
  const inv720 = 301388891n;

  let num = (M * (M - 1n)) % MOD;
  num = (num * (M - 2n)) % MOD;
  num = (num * (M - 3n)) % MOD;
  num = (num * (M - 4n)) % MOD;
  num = (num * (M - 5n)) % MOD;

  const ans = (num * inv720) % MOD;
  console.log(ans.toString());
}

solve();

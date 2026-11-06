const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;

  const MOD = 1000000007n;
  let ans = 1n;
  let cur = 0n;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === 'a') {
      cur++;
    } else if (ch === 'b') {
      if (cur > 0n) {
        ans = (ans * (cur + 1n)) % MOD;
        cur = 0n;
      }
    }
  }

  if (cur > 0n) {
    ans = (ans * (cur + 1n)) % MOD;
  }

  ans = (ans - 1n + MOD) % MOD;
  console.log(ans.toString());
}

solve();


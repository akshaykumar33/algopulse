const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const l = parseInt(input[1], 10);
  const r = parseInt(input[2], 10);
  const MOD = 1000000007n;

  function countMod(rem) {
    if (l > r) return 0n;
    const countR = Math.floor((r - rem) / 3) - Math.floor((rem === 0 ? 0 : -1));
    const totalR = Math.floor(r / 3) + (rem > 0 && r % 3 >= rem ? 1 : 0);
    const totalL = Math.floor((l - 1) / 3) + (rem > 0 && (l - 1) % 3 >= rem ? 1 : 0);
    return BigInt(totalR - totalL);
  }

  const c0 = countMod(0);
  const c1 = countMod(1);
  const c2 = countMod(2);

  let dp = [1n, 0n, 0n];
  for (let i = 0; i < n; i++) {
    const nextDp = [0n, 0n, 0n];
    nextDp[0] = (dp[0] * c0 + dp[1] * c2 + dp[2] * c1) % MOD;
    nextDp[1] = (dp[0] * c1 + dp[1] * c0 + dp[2] * c2) % MOD;
    nextDp[2] = (dp[0] * c2 + dp[1] * c1 + dp[2] * c0) % MOD;
    dp = nextDp;
  }

  console.log(dp[0].toString());
}

solve();

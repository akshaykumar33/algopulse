const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;

  const s0 = input[0];
  const s1 = input[1];
  const n = s0.length;

  if (n <= 1) {
    console.log(0);
    return;
  }

  let dp = [-1, -1, -1, -1];
  const base0 = (s0[0] === 'X' ? 1 : 0) | (s1[0] === 'X' ? 2 : 0);
  dp[base0] = 0;

  for (let i = 0; i < n - 1; i++) {
    const nextDp = [-1, -1, -1, -1];
    const nextBase = (s0[i + 1] === 'X' ? 1 : 0) | (s1[i + 1] === 'X' ? 2 : 0);

    for (let cur = 0; cur < 4; cur++) {
      if (dp[cur] === -1) continue;
      const val = dp[cur];

      if (val > nextDp[nextBase]) {
        nextDp[nextBase] = val;
      }

      if (!(cur & 1) && nextBase === 0) {
        if (val + 1 > nextDp[3]) {
          nextDp[3] = val + 1;
        }
      }

      if (!(cur & 2) && nextBase === 0) {
        if (val + 1 > nextDp[3]) {
          nextDp[3] = val + 1;
        }
      }

      if (cur === 0 && !(nextBase & 1)) {
        const m = nextBase | 1;
        if (val + 1 > nextDp[m]) {
          nextDp[m] = val + 1;
        }
      }

      if (cur === 0 && !(nextBase & 2)) {
        const m = nextBase | 2;
        if (val + 1 > nextDp[m]) {
          nextDp[m] = val + 1;
        }
      }
    }
    dp = nextDp;
  }

  let ans = 0;
  for (let i = 0; i < 4; i++) {
    if (dp[i] > ans) ans = dp[i];
  }

  console.log(ans);
}

solve();

const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  const better = (a, b) => {
    if (a.sum !== b.sum) return a.sum > b.sum ? a : b;
    return a.swaps < b.swaps ? a : b;
  };

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = BigInt(input[ptr++]);
    const m = Math.floor(n / 2);
    if (m === 0) {
      out.push('0 0');
      continue;
    }

    const getVals = (i, s) => {
      const l = s === 0 ? a[i - 1] : a[n - i];
      const r = s === 0 ? a[n - i] : a[i - 1];
      return [l, r];
    };

    const absDiff = (x, y) => x >= y ? x - y : y - x;

    let dp = [
      { sum: 0n, swaps: 0 },
      { sum: 0n, swaps: 1 }
    ];

    for (let i = 2; i <= m; i++) {
      const nextDp = [null, null];
      for (let curS = 0; curS < 2; curS++) {
        const [curL, curR] = getVals(i, curS);
        let best = null;
        for (let prevS = 0; prevS < 2; prevS++) {
          const [prevL, prevR] = getVals(i - 1, prevS);
          const cost = absDiff(curL, prevL) + absDiff(curR, prevR);
          const cand = {
            sum: dp[prevS].sum + cost,
            swaps: dp[prevS].swaps + (curS === 1 ? 1 : 0)
          };
          best = best ? better(best, cand) : cand;
        }
        nextDp[curS] = best;
      }
      dp = nextDp;
    }

    let ans = null;
    for (let s = 0; s < 2; s++) {
      const [l, r] = getVals(m, s);
      let centerCost = 0n;
      if (n % 2 === 0) {
        centerCost = absDiff(l, r);
      } else {
        const mid = a[m];
        centerCost = absDiff(l, mid) + absDiff(mid, r);
      }
      const cand = {
        sum: dp[s].sum + centerCost,
        swaps: dp[s].swaps
      };
      ans = ans ? better(ans, cand) : cand;
    }
    out.push(ans.sum.toString() + ' ' + ans.swaps);
  }
  console.log(out.join('\n'));
}
solve();
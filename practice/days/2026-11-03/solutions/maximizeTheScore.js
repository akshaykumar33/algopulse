const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) {
      pos++;
    }
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const len = 2 * n;
    const a = new Int32Array(len);
    const occ = new Int32Array(n + 1);
    occ.fill(-1);
    const lp = new Int32Array(len);

    for (let i = 0; i < len; i++) {
      const val = nextInt();
      a[i] = val;
      if (occ[val] !== -1) {
        lp[i] = occ[val];
      } else {
        occ[val] = i;
        lp[i] = -1;
      }
    }

    const dp = new Float64Array(len);
    dp[0] = 1;
    for (let i = 1; i < len; i++) {
      let best = dp[i - 1] + 1;
      const l = lp[i];
      if (l !== -1) {
        const segLen = i - l + 1;
        const cand = (l === 0 ? 0 : dp[l - 1]) + segLen * segLen;
        if (cand > best) {
          best = cand;
        }
      }
      dp[i] = best;
    }

    out.push(dp[len - 1]);
  }

  console.log(out.join('\n'));
}

solve();

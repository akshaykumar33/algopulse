const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const pref = new Float64Array(n + 1);
    for (let i = 1; i <= n; i++) {
      pref[i] = pref[i - 1] + nextInt();
    }

    const q = nextInt();
    const res = [];

    for (let qi = 0; qi < q; qi++) {
      const l = nextInt();
      const u = nextInt();

      function getScore(r) {
        if (r < l || r > n) return -10000000000000000000n;
        const S = BigInt(Math.round(pref[r] - pref[l - 1]));
        const U = BigInt(u);
        return S * U - (S * (S - 1n)) / 2n;
      }

      const target = u + 0.5 + pref[l - 1];

      let low = l, high = n, bestR = l;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (pref[mid] <= target) {
          bestR = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      let ans = Math.max(l, bestR);
      let maxScore = getScore(ans);

      if (ans + 1 <= n) {
        const sc1 = getScore(ans + 1);
        if (sc1 > maxScore) {
          ans = ans + 1;
        }
      }

      res.push(ans);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

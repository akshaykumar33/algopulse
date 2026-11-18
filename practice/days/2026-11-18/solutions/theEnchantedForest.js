const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const nBig = nextInt();
    const kBig = nextInt();
    const n = Number(nBig);
    const k = kBig;

    const pref = new Array(n + 1);
    pref[0] = 0n;
    for (let i = 1; i <= n; i++) {
      pref[i] = pref[i - 1] + nextInt();
    }

    if (k < nBig) {
      const kNum = Number(k);
      let maxWin = 0n;
      for (let i = kNum; i <= n; i++) {
        const cur = pref[i] - pref[i - kNum];
        if (cur > maxWin) maxWin = cur;
      }
      const ans = maxWin + (k * (k - 1n)) / 2n;
      out.push(ans.toString());
    } else {
      const total = pref[n];
      const ans = total + k * nBig - (nBig * (nBig + 1n)) / 2n;
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();

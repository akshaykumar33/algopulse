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
    const k = BigInt(nextInt());

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    const pref = new BigInt64Array(n + 1);
    for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + BigInt(a[i]);

    let maxCoins = -1000000000000000000n;

    for (let i = 0; i <= n; i++) {
      let cur = pref[i] - BigInt(i) * k;
      const limit = Math.min(n, i + 31);
      for (let j = i + 1; j <= limit; j++) {
        const shifts = j - i;
        const val = a[j - 1] >> shifts;
        cur += BigInt(val);
      }
      if (cur > maxCoins) maxCoins = cur;
    }

    out.push(maxCoins.toString());
  }

  console.log(out.join('\n'));
}

solve();

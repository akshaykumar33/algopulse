const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) {
      pos++;
    }
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();

    const cnt = new Array(40).fill(0n);
    let temp = n;
    let s = 0n;
    let p = 0;
    while (temp > 0n) {
      const d = temp % 3n;
      cnt[p] = d;
      s += d;
      temp /= 3n;
      p++;
    }

    if (s > k) {
      out.push('-1');
      continue;
    }

    let rem = k - s;

    for (let x = 39; x >= 1; x--) {
      if (cnt[x] > 0n && rem >= 2n) {
        const maxSplits = rem / 2n;
        const take = cnt[x] < maxSplits ? cnt[x] : maxSplits;
        cnt[x] -= take;
        cnt[x - 1] += take * 3n;
        rem -= take * 2n;
      }
    }

    let totalCost = 0n;
    let p3 = 1n;
    for (let x = 0; x < 40; x++) {
      if (cnt[x] > 0n) {
        let costX;
        if (x === 0) {
          costX = 3n;
        } else {
          costX = p3 * 3n + BigInt(x) * (p3 / 3n);
        }
        totalCost += cnt[x] * costX;
      }
      p3 *= 3n;
    }

    out.push(totalCost.toString());
  }

  console.log(out.join('\n'));
}

solve();

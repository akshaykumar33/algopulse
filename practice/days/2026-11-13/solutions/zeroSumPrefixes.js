const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let ans = 0;
    let seenZero = false;
    let maxFreq = 0;
    const curMap = new Map();
    let pref = 0n;

    for (let i = 0; i < n; i++) {
      const val = nextInt();
      if (val === 0) {
        if (seenZero) {
          ans += maxFreq;
        }
        seenZero = true;
        maxFreq = 0;
        curMap.clear();
      }
      pref += BigInt(val);
      if (seenZero) {
        const c = (curMap.get(pref) || 0) + 1;
        curMap.set(pref, c);
        if (c > maxFreq) {
          maxFreq = c;
        }
      } else {
        if (pref === 0n) {
          ans++;
        }
      }
    }

    if (seenZero) {
      ans += maxFreq;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

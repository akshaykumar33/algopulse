const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1n;
    if (buf[pos] === 45) {
      sign = -1n;
      pos++;
    }
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(nextInt());
    const posArr = [];
    const negArr = [];

    for (let i = 0; i < n; i++) {
      const v = nextInt();
      if (v >= 0n) posArr.push(v);
      else negArr.push(v);
    }

    let p = BigInt(posArr.length);
    let s = 0n;
    for (let i = 0; i < posArr.length; i++) {
      s += posArr[i];
    }

    negArr.sort((u, v) => (u < v ? 1 : -1));

    let idx = 0;
    while (idx < negArr.length) {
      const nextP = p + 1n;
      const nextS = s + negArr[idx];
      if (nextP * nextS >= p * s + negArr[idx]) {
        p = nextP;
        s = nextS;
        idx++;
      } else {
        break;
      }
    }

    let total = p * s;
    while (idx < negArr.length) {
      total += negArr[idx++];
    }

    out.push(total.toString());
  }

  console.log(out.join('\n'));
}

solve();

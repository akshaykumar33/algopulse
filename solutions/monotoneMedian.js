const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let x = 0;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10 + buf[ptr] - 48;
    ptr++;
  }
  return x;
}

const out = [];

function solve() {
  const t = nextInt();
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const pos = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      pos[nextInt()] = i;
    }
    const k = (n + 1) >> 1;
    const loArr = new Int32Array(k + 1);
    const hiArr = new Int32Array(k + 1);
    let minP = pos[1];
    let maxP = pos[1];
    loArr[1] = pos[1];
    hiArr[1] = pos[1];
    let ok = true;
    for (let i = 2; i <= k; i++) {
      if (pos[i] < minP) minP = pos[i];
      if (pos[i] > maxP) maxP = pos[i];
      const lenM1 = 2 * i - 2;
      const nLo = Math.max(loArr[i - 1] - 2, 1, maxP - lenM1);
      const nHi = Math.min(hiArr[i - 1], n - lenM1, minP);
      if (nLo > nHi) {
        ok = false;
        break;
      }
      loArr[i] = nLo;
      hiArr[i] = nHi;
    }
    if (!ok) {
      out.push(-1);
    } else {
      const ansL = new Int32Array(k + 1);
      ansL[k] = loArr[k];
      for (let i = k - 1; i >= 1; i--) {
        ansL[i] = Math.max(loArr[i], ansL[i + 1]);
      }
      for (let i = 1; i <= k; i++) {
        out.push(`${ansL[i]} ${ansL[i] + 2 * i - 2}`);
      }
    }
  }
}

solve();
console.log(out.join('\n'));

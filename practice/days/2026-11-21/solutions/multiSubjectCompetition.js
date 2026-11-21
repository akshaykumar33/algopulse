const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return sign * res;
  }
  const n = nextInt();
  if (n === null) return;
  const m = nextInt();
  const subjs = new Map();
  for (let i = 0; i < n; i++) {
    const s = nextInt();
    const r = nextInt();
    if (!subjs.has(s)) subjs.set(s, []);
    subjs.get(s).push(r);
  }
  const sumK = new Int32Array(n + 1);
  for (const list of subjs.values()) {
    list.sort((a, b) => b - a);
    let curSum = 0;
    for (let k = 1; k <= list.length; k++) {
      curSum += list[k - 1];
      if (curSum > 0) {
        sumK[k] += curSum;
      }
    }
  }
  let maxAns = 0;
  for (let k = 1; k <= n; k++) {
    if (sumK[k] > maxAns) maxAns = sumK[k];
  }
  console.log(maxAns);
}
solve();
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
    const childCnt = new Int32Array(n + 1);
    for (let i = 2; i <= n; i++) {
      const p = nextInt();
      childCnt[p]++;
    }
    const groups = [1];
    for (let i = 1; i <= n; i++) {
      if (childCnt[i] > 0) groups.push(childCnt[i]);
    }
    groups.sort((a, b) => b - a);
    const m = groups.length;
    let low = m;
    let high = n + 1;
    let ans = high;
    while (low <= high) {
      const mid = (low + high) >> 1;
      let needed = 0;
      for (let i = 0; i < m; i++) {
        const left = mid - i;
        if (left <= 0) needed += groups[i];
        else needed += Math.max(0, groups[i] - left);
      }
      const freeSlots = mid > m ? mid - m : 0;
      if (needed <= freeSlots) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();

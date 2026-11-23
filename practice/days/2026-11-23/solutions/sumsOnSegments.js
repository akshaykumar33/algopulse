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
    const a = new Int32Array(n);
    let p = -1;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      if (a[i] !== 1 && a[i] !== -1) p = i;
    }
    function getRange(l, r) {
      if (l > r) return [0, 0];
      let minS = 0, maxS = 0, curMin = 0, curMax = 0;
      for (let i = l; i <= r; i++) {
        curMin = Math.min(0, curMin + a[i]);
        minS = Math.min(minS, curMin);
        curMax = Math.max(0, curMax + a[i]);
        maxS = Math.max(maxS, curMax);
      }
      return [minS, maxS];
    }
    let [min1, max1] = getRange(0, p === -1 ? n - 1 : p - 1);
    let [min2, max2] = p === -1 ? [0, 0] : getRange(p + 1, n - 1);
    let range1 = [Math.min(min1, min2), Math.max(max1, max2)];
    let ranges = [range1];
    if (p !== -1) {
      let lMin = 0, lMax = 0, cur = 0;
      for (let i = p - 1; i >= 0; i--) {
        cur += a[i];
        lMin = Math.min(lMin, cur);
        lMax = Math.max(lMax, cur);
      }
      let rMin = 0, rMax = 0; cur = 0;
      for (let i = p + 1; i < n; i++) {
        cur += a[i];
        rMin = Math.min(rMin, cur);
        rMax = Math.max(rMax, cur);
      }
      ranges.push([a[p] + lMin + rMin, a[p] + lMax + rMax]);
    }
    ranges.sort((x, y) => x[0] - y[0]);
    const merged = [];
    for (const [l, r] of ranges) {
      if (merged.length === 0 || merged[merged.length - 1][1] < l - 1) {
        merged.push([l, r]);
      } else {
        merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], r);
      }
    }
    let count = 0;
    for (const [l, r] of merged) count += (r - l + 1);
    const res = [];
    for (const [l, r] of merged) {
      for (let v = l; v <= r; v++) res.push(v);
    }
    out.push(count + '\n' + res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

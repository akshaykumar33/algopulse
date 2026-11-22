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
  const n = nextInt();
  if (n === null) return;
  const V = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) V[i] = nextInt();
  const T = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) T[i] = nextInt();
  const prefT = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) prefT[i] = prefT[i - 1] + T[i];
  const diff = new Int32Array(n + 2);
  const partial = new Float64Array(n + 2);
  for (let i = 1; i <= n; i++) {
    const target = prefT[i - 1] + V[i];
    let low = i, high = n, best = i - 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (prefT[mid] <= target) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    diff[i]++;
    diff[best + 1]--;
    if (best + 1 <= n) {
      partial[best + 1] += target - prefT[best];
    }
  }
  const out = [];
  let active = 0;
  for (let i = 1; i <= n; i++) {
    active += diff[i];
    const totalMelt = active * T[i] + partial[i];
    out.push(Math.round(totalMelt));
  }
  console.log(out.join(' '));
}
solve();
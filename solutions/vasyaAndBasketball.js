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

  const nVal = nextInt();
  if (nVal === null) return;
  const n = nVal;

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();

  const m = nextInt();
  const b = new Int32Array(m);
  for (let i = 0; i < m; i++) b[i] = nextInt();

  a.sort();
  b.sort();

  function upperBound(arr, target) {
    let low = 0, high = arr.length - 1, best = arr.length;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (arr[mid] > target) {
        best = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return best;
  }

  let best1 = 3 * n;
  let best2 = 3 * m;
  let maxDiff = best1 - best2;

  const candidates = [];
  candidates.push(0);
  for (let i = 0; i < n; i++) candidates.push(a[i]);
  for (let i = 0; i < m; i++) candidates.push(b[i]);

  for (let i = 0; i < candidates.length; i++) {
    const d = candidates[i];
    const cntA = upperBound(a, d);
    const cntB = upperBound(b, d);
    const s1 = 2 * cntA + 3 * (n - cntA);
    const s2 = 2 * cntB + 3 * (m - cntB);
    const diff = s1 - s2;

    if (diff > maxDiff || (diff === maxDiff && s1 > best1)) {
      maxDiff = diff;
      best1 = s1;
      best2 = s2;
    }
  }

  console.log(`${best1}:${best2}`);
}

solve();

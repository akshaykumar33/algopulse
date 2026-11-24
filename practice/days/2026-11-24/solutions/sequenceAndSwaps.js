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
  function isSorted(arr, n) {
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  }
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let x = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    if (isSorted(a, n)) {
      out.push(0);
      continue;
    }
    let ops = 0;
    let ok = false;
    for (let step = 0; step < n; step++) {
      let idx = -1;
      for (let i = 0; i < n; i++) {
        if (a[i] > x) {
          idx = i;
          break;
        }
      }
      if (idx === -1) break;
      const tmp = a[idx];
      a[idx] = x;
      x = tmp;
      ops++;
      if (isSorted(a, n)) {
        ok = true;
        break;
      }
    }
    if (ok) out.push(ops);
    else out.push(-1);
  }
  console.log(out.join('\n'));
}

solve();

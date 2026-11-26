'use strict';
const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextToken() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('ascii', start, pos);
  }

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const k = nextInt();
  const q = nextInt();

  const cols = Array.from({ length: k }, () => new Int32Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < k; j++) {
      const val = nextInt();
      if (i === 0) cols[j][0] = val;
      else cols[j][i] = cols[j][i - 1] | val;
    }
  }

  const out = [];

  for (let qi = 0; qi < q; qi++) {
    const m = nextInt();
    let l = 1;
    let r = n;

    for (let mi = 0; mi < m; mi++) {
      const reg = nextInt() - 1;
      const op = nextToken();
      const c = nextInt();

      const arr = cols[reg];
      if (op === '>') {
        let low = 0;
        let high = n - 1;
        let idx = n;
        while (low <= high) {
          const mid = (low + high) >> 1;
          if (arr[mid] > c) {
            idx = mid;
            high = mid - 1;
          } else {
            low = mid + 1;
          }
        }
        const reqL = idx + 1;
        if (reqL > l) l = reqL;
      } else {
        let low = 0;
        let high = n - 1;
        let idx = n;
        while (low <= high) {
          const mid = (low + high) >> 1;
          if (arr[mid] >= c) {
            idx = mid;
            high = mid - 1;
          } else {
            low = mid + 1;
          }
        }
        const reqR = idx;
        if (reqR < r) r = reqR;
      }
    }

    if (l <= r) out.push(l);
    else out.push(-1);
  }

  console.log(out.join('\n'));
}

solve();

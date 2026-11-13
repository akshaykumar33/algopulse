const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const a = new Int32Array(n);
    let sorted = true;
    let maxA = 0;
    for (let i = 0; i < n; i++) {
      a[i] = Number(input[ptr++]);
      if (i > 0 && a[i] < a[i - 1]) sorted = false;
      if (a[i] > maxA) maxA = a[i];
    }
    if (sorted) {
      out.push('-1');
      continue;
    }
    let lo = 1;
    let hi = maxA;
    const b = new Float64Array(n);
    while (lo < hi) {
      const mid = Math.floor((lo + hi + 1) / 2);
      let s = 0;
      for (let i = 0; i < n; i++) {
        b[i] = a[i];
      }
      for (let i = 0; i < n; i++) {
        if (b[i] >= mid) {
          s += b[i] - mid;
          b[i] = mid;
        } else {
          const add = Math.min(s, mid - b[i]);
          b[i] += add;
          s -= add;
        }
      }
      let ok = true;
      for (let i = 1; i < n; i++) {
        if (b[i] < b[i - 1]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        lo = mid;
      } else {
        hi = mid - 1;
      }
    }
    out.push(lo.toString());
  }
  console.log(out.join('\n'));
}

function main() {}

solve();

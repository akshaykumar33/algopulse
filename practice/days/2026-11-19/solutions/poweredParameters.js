const fs = require('fs');

function getMaxBase(j, target) {
  if (target < 2) return 1;
  if (j === 1) return target;
  let low = 2;
  let high = Math.min(target, Math.floor(Math.pow(target, 1 / j)) + 2);
  let ans = 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    let ok = true;
    let p = 1;
    for (let step = 0; step < j; step++) {
      if (p > target / mid) {
        ok = false;
        break;
      }
      p *= mid;
    }
    if (ok && p <= target) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
}

function countLe(b, v) {
  let low = 0;
  let high = b.length - 1;
  let res = 0;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (b[mid] <= v) {
      res = mid + 1;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
      if (a[i] === 1) c1++;
    }

    const b = new Int32Array(n - c1);
    let bIdx = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] > 1) {
        b[bIdx++] = a[i];
      }
    }
    b.sort();

    let total = c1 * n;
    const maxJ = Math.min(n, 29);
    for (let j = 1; j <= maxJ; j++) {
      const target = a[j - 1];
      const v = getMaxBase(j, target);
      if (v >= 2) {
        total += countLe(b, v);
      }
    }

    out.push(total);
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  function lowerBound(arr, val) {
    let l = 0;
    let r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid] >= val) r = mid;
      else l = mid + 1;
    }
    return l;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    const a = new Int32Array(n);
    const b = new Int32Array(n);
    const cands = [];

    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      a[i] = val;
      cands.push(val);
    }
    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      b[i] = val;
      cands.push(val);
    }

    a.sort();
    b.sort();
    cands.sort((x, y) => x - y);

    let maxRev = 0n;
    let prev = -1;

    for (let i = 0; i < cands.length; i++) {
      const p = cands[i];
      if (p === prev) continue;
      prev = p;

      const totalBuyers = n - lowerBound(b, p);
      const happyBuyers = n - lowerBound(a, p);
      const negativeReviews = totalBuyers - happyBuyers;

      if (negativeReviews <= k) {
        const rev = BigInt(p) * BigInt(totalBuyers);
        if (rev > maxRev) {
          maxRev = rev;
        }
      }
    }

    out.push(maxRev.toString());
  }

  console.log(out.join('\n'));
}

solve();

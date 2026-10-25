const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const m = n + 2;
    const b = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      b[i] = parseInt(input[ptr++], 10);
    }
    b.sort();

    let sumN1 = 0n;
    for (let i = 0; i < n + 1; i++) {
      sumN1 += BigInt(b[i]);
    }

    const target1 = BigInt(b[n + 1]);
    const rem1 = sumN1 - target1;
    let foundIdx = -1;

    if (rem1 >= 0n && rem1 <= 2000000000n) {
      const remNum = Number(rem1);
      let low = 0;
      let high = n;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (b[mid] === remNum) {
          foundIdx = mid;
          break;
        } else if (b[mid] < remNum) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
    }

    if (foundIdx !== -1) {
      const res = [];
      for (let i = 0; i < n + 1; i++) {
        if (i !== foundIdx) res.push(b[i]);
      }
      out.push(res.join(' '));
      continue;
    }

    let sumN = sumN1 - BigInt(b[n]);
    if (sumN === BigInt(b[n])) {
      const res = [];
      for (let i = 0; i < n; i++) {
        res.push(b[i]);
      }
      out.push(res.join(' '));
      continue;
    }

    out.push(-1);
  }

  console.log(out.join('\n'));
}

solve();

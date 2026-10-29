const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const a = new Int32Array(n);
  const counts = new Map();
  let totalSum = 0n;

  for (let i = 0; i < n; i++) {
    const v = parseInt(input[ptr++], 10);
    a[i] = v;
    counts.set(v, (counts.get(v) || 0) + 1);
    totalSum += BigInt(v);
  }

  const indices = [];
  for (let i = 0; i < n; i++) {
    const v = a[i];
    const rem = totalSum - BigInt(v);
    if ((rem & 1n) === 0n) {
      const target = Number(rem / 2n);
      const cnt = counts.get(target) || 0;
      if (target === v) {
        if (cnt >= 2) indices.push(i + 1);
      } else {
        if (cnt >= 1) indices.push(i + 1);
      }
    }
  }

  console.log(indices.length);
  if (indices.length > 0) {
    console.log(indices.join(' '));
  }
}

solve();

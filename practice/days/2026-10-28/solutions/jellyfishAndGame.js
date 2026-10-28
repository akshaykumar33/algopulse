const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  function op(x, y) {
    let minIdx = 0;
    for (let i = 1; i < x.length; i++) {
      if (x[i] < x[minIdx]) minIdx = i;
    }
    let maxIdx = 0;
    for (let i = 1; i < y.length; i++) {
      if (y[i] > y[maxIdx]) maxIdx = i;
    }
    if (x[minIdx] < y[maxIdx]) {
      const tmp = x[minIdx];
      x[minIdx] = y[maxIdx];
      y[maxIdx] = tmp;
    }
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(BigInt(input[ptr++]));
    const b = [];
    for (let i = 0; i < m; i++) b.push(BigInt(input[ptr++]));

    op(a, b);
    if (k > 1) {
      op(b, a);
      if (k % 2 === 1) {
        op(a, b);
      }
    }

    let sum = 0n;
    for (let i = 0; i < n; i++) sum += a[i];
    out.push(sum.toString());
  }

  console.log(out.join('\n'));
}

solve();


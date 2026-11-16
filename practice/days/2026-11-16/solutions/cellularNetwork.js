const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
  const b = new Int32Array(m);
  for (let i = 0; i < m; i++) b[i] = parseInt(input[ptr++], 10);

  let r = 0;
  let j = 0;

  for (let i = 0; i < n; i++) {
    while (j + 1 < m && Math.abs(b[j + 1] - a[i]) <= Math.abs(b[j] - a[i])) {
      j++;
    }
    const dist = Math.abs(b[j] - a[i]);
    if (dist > r) r = dist;
  }
  console.log(r);
}

solve();

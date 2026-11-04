const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) a[i] = parseInt(input[ptr++], 10);

    if (n % 2 !== 0) {
      out.push(-1);
      continue;
    }

    const segs = [];
    for (let i = 1; i <= n; i += 2) {
      if (a[i] === a[i + 1]) {
        segs.push(`${i} ${i + 1}`);
      } else {
        segs.push(`${i} ${i}`);
        segs.push(`${i + 1} ${i + 1}`);
      }
    }

    out.push(segs.length);
    for (let i = 0; i < segs.length; i++) {
      out.push(segs[i]);
    }
  }

  console.log(out.join('\n'));
}

solve();

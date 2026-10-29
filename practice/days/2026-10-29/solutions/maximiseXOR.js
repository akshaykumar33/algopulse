const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = input[ptr++];
    const b = input[ptr++];
    const n = a.length;

    let c0 = 0;
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] === '0') c0++; else c1++;
      if (b[i] === '0') c0++; else c1++;
    }

    const ones = Math.min(c0, c1);
    const zeros = n - ones;
    out.push('1'.repeat(ones) + '0'.repeat(zeros));
  }
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(BigInt(input[ptr++]));
    }
    const b = [];
    for (let i = 0; i < m; i++) {
      b.push(BigInt(input[ptr++]));
    }

    if (n < 4 || m < 4 || n + m < 11) {
      out.push('-1');
      continue;
    }

    a.sort((x, y) => (x > y ? -1 : x < y ? 1 : 0));
    b.sort((x, y) => (x > y ? -1 : x < y ? 1 : 0));

    let sum = 0n;
    for (let i = 0; i < 4; i++) sum += a[i];
    for (let i = 0; i < 4; i++) sum += b[i];

    const rem = [];
    for (let i = 4; i < n; i++) rem.push(a[i]);
    for (let i = 4; i < m; i++) rem.push(b[i]);
    rem.sort((x, y) => (x > y ? -1 : x < y ? 1 : 0));

    for (let i = 0; i < 3; i++) {
      sum += rem[i];
    }
    out.push(sum.toString());
  }
  console.log(out.join('\n'));
}

solve();

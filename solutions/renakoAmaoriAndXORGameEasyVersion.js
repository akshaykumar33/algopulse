const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Uint8Array(n);
    const b = new Uint8Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
    for (let i = 0; i < n; i++) b[i] = parseInt(input[ptr++], 10);

    let diffXor = 0;
    let lastDiff = -1;
    for (let i = 0; i < n; i++) {
      diffXor ^= (a[i] ^ b[i]);
      if (a[i] !== b[i]) {
        lastDiff = i + 1;
      }
    }

    if (diffXor === 0) {
      out.push('Tie');
    } else {
      if (lastDiff % 2 === 1) {
        out.push('Ajisai');
      } else {
        out.push('Mai');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();

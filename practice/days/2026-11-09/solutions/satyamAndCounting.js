const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const has0 = new Uint8Array(n + 3);
    const has1 = new Uint8Array(n + 3);
    const xs = new Int32Array(n);

    for (let i = 0; i < n; i++) {
      const x = parseInt(tokens[ptr++], 10);
      const y = parseInt(tokens[ptr++], 10);
      xs[i] = x;
      if (y === 0) {
        has0[x] = 1;
      } else {
        has1[x] = 1;
      }
    }

    let ans = 0n;
    for (let x = 0; x <= n; x++) {
      if (has0[x] === 1 && has1[x] === 1) {
        ans += BigInt(n - 2);
      }
      if (x >= 1 && x + 1 <= n) {
        if (has1[x] === 1 && has0[x - 1] === 1 && has0[x + 1] === 1) {
          ans += 1n;
        }
        if (has0[x] === 1 && has1[x - 1] === 1 && has1[x + 1] === 1) {
          ans += 1n;
        }
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

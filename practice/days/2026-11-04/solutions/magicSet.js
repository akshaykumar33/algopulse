const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      if (val % m === 0) {
        cnt++;
      }
    }
    const ans = (1n << BigInt(cnt)) - 1n;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();


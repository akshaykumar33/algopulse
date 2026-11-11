const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let n = BigInt(tokens[ptr++]);
    let ans = 0n;
    while (n > 0n) {
      ans += n;
      n >>= 1n;
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

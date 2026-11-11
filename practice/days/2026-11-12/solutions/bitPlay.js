const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 1000000007;
  const ways = [3, 0, 1, 2, 1, 2, 1, 2];
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let ans = 1;
    for (let i = 0; i < n - 1; i += 2) {
      const a = s.charCodeAt(i) - 48;
      const b = s.charCodeAt(i + 1) - 48;
      const c = s.charCodeAt(i + 2) - 48;
      const w = ways[(a << 2) | (b << 1) | c];
      if (w === 0) {
        ans = 0;
        break;
      }
      ans = (ans * w) % MOD;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const mod = 1000000007n;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      freq.set(v, (freq.get(v) || 0) + 1);
    }
    let ans = 1n;
    for (const cnt of freq.values()) {
      ans = (ans * BigInt(cnt + 1)) % mod;
    }
    ans = (ans - 1n + mod) % mod;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();

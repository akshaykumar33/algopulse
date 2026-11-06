const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const MOD = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const s = input[ptr++];
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      const ch = s[i];
      freq.set(ch, (freq.get(ch) || 0n) + 1n);
    }

    let prod = 1n;
    for (const count of freq.values()) {
      prod = (prod * (count + 1n)) % MOD;
    }

    let ans = (prod - 1n + MOD) % MOD;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();


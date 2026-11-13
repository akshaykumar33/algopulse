const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const mod = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      const v = Number(input[ptr++]);
      freq.set(v, (freq.get(v) || 0) + 1);
    }

    let ans = 0n;
    let prod = 1n;
    for (let k = 1; k <= n; k++) {
      const cnt = freq.get(k);
      if (!cnt) break;
      prod = (prod * BigInt(cnt)) % mod;
      ans = (ans + prod) % mod;
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

function main() {}

solve();

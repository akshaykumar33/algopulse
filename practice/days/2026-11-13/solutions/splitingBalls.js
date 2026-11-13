const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const mod = 1000000007;
  const maxVal = 1000005;
  const fact = new Int32Array(maxVal);
  fact[0] = 1;
  for (let i = 1; i < maxVal; i++) {
    fact[i] = Number((BigInt(fact[i - 1]) * BigInt(i)) % 1000000007n);
  }

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let ans = 0;
    for (let i = 0; i < n; i++) {
      const x = Number(input[ptr++]);
      ans = (ans + fact[x]) % mod;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

function main() {}

solve();

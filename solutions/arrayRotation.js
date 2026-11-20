const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const MOD = 1000000007n;
  let sum = 0n;
  for (let i = 0; i < n; i++) {
    sum = (sum + BigInt(input[ptr++])) % MOD;
  }
  if (sum < 0n) sum = (sum + MOD) % MOD;
  const q = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < q; i++) {
    ptr++;
    sum = (sum * 2n) % MOD;
    out.push(sum.toString());
  }
  console.log(out.join('\n'));
}
solve();
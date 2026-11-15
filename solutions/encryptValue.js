const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const MOD = 1000000007n;
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const A = [];
  for (let i = 0; i < n; i++) {
    A.push(parseInt(input[ptr++], 10));
  }
  A.sort((a, b) => a - b);

  let S = BigInt(A[0]);
  for (let i = 1; i < n; i++) {
    const val = BigInt(A[i]);
    if (S <= 1n || val <= 1n) {
      S = (S + val) % MOD;
    } else {
      S = (S * val) % MOD;
    }
  }
  out.push(Number(S % MOD));
}
console.log(out.join('\n'));

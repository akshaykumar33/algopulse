const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const MOD = 1000000007;
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  let evens = 0;
  for (let i = 0; i < n; i++) {
    const val = parseInt(input[ptr++], 10);
    if (val % 2 === 0) evens++;
  }

  let ans = 1;
  for (let i = 0; i < evens; i++) {
    ans = (ans * 2) % MOD;
  }
  if (evens === n) {
    ans = (ans - 1 + MOD) % MOD;
  }
  out.push(ans);
}
console.log(out.join('\n'));

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  
  const t = parseInt(input[0], 10);
  const MOD = 1000000007n;
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    if (i >= input.length) break;
    const n = BigInt(input[i]);
    let res = 1n;
    let base = 2n;
    let exp = n;
    
    while (exp > 0n) {
      if (exp % 2n === 1n) {
        res = (res * base) % MOD;
      }
      base = (base * base) % MOD;
      exp /= 2n;
    }
    
    out.push(res.toString());
  }
  
  console.log(out.join('\n'));
}

solve();

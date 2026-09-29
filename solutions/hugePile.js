const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split(/\s+/);
let idx = 0;
const nextInt = () => parseInt(input[idx++], 10);

const t = nextInt();
const out = [];

for (let i = 0; i < t; i++) {
  const n = nextInt();
  const k = nextInt();
  
  if (n < k) {
    out.push(-1);
    continue;
  }
  
  if (n === k) {
    out.push(0);
    continue;
  }
  
  let found = -1;
  
  for (let steps = 1; steps <= 60; steps++) {
    const pow2t = 1n << BigInt(steps);
    const kBig = BigInt(k);
    const nBig = BigInt(n);
    
    const term1 = kBig * pow2t;
    const term2 = pow2t - 1n;
    
    const low = term1 - term2;
    const high = term1 + term2;
    
    if (nBig >= low && nBig <= high) {
      found = steps;
      break;
    }
    
    if (low > nBig) break;
  }
  
  out.push(found);
}

console.log(out.join('\n'));
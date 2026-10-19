const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let ptr = 0;
  const t = parseInt(lines[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[ptr++], 10);
    const arr = lines[ptr++].split(' ').map(Number);
    
    let sum = 0n;
    for (let j = 0; j < n; j++) {
      sum += BigInt(arr[j]);
    }
    
    const bn = BigInt(n);
    if (sum % bn !== 0n) {
      out.push("Impossible");
      continue;
    }
    
    const target = sum / bn;
    let ans = -1;
    for (let j = 0; j < n; j++) {
      if (BigInt(arr[j]) === target) {
        ans = j + 1;
        break;
      }
    }
    
    if (ans === -1) {
      out.push("Impossible");
    } else {
      out.push(ans);
    }
  }
  
  console.log(out.join('\n'));
}

solve();

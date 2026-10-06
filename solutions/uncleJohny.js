const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    const arr = input[ptr++].trim().split(/\s+/).map(Number);
    const k = parseInt(input[ptr++], 10);
    
    const target = arr[k - 1];
    arr.sort((a, b) => a - b);
    const ans = arr.indexOf(target) + 1;
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();

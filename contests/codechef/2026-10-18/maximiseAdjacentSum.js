const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    const arr = [];
    let sum = 0;
    
    for (let j = 0; j < n; j++) {
      const val = parseInt(input[ptr++], 10);
      arr.push(val);
      sum += val;
    }
    
    arr.sort((a, b) => a - b);
    const ans = 2 * sum - arr[0] - arr[1];
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();

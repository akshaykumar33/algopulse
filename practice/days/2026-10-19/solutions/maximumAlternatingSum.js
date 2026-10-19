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
    for (let j = 0; j < n; j++) {
      arr.push(parseInt(input[ptr++], 10));
    }
    
    arr.sort((a, b) => a - b);
    
    const m = Math.floor(n / 2);
    let sum = 0;
    
    for (let j = 0; j < m; j++) {
      sum -= arr[j];
    }
    for (let j = m; j < n; j++) {
      sum += arr[j];
    }
    
    out.push(sum);
  }
  
  console.log(out.join('\n'));
}

solve();

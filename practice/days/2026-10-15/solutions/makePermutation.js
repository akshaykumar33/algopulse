const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
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
    
    let ok = true;
    for (let j = 0; j < n; j++) {
      if (arr[j] > j + 1) {
        ok = false;
        break;
      }
    }
    
    out.push(ok ? 'YES' : 'NO');
  }
  
  console.log(out.join('\n'));
}

solve();

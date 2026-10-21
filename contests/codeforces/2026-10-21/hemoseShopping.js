const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const x = parseInt(input[ptr++], 10);
    
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }
    
    const sorted = [...a].sort((u, v) => u - v);
    
    let ok = true;
    for (let i = 0; i < n; i++) {
      if (a[i] !== sorted[i]) {
        if (i - x < 0 && i + x >= n) {
          ok = false;
          break;
        }
      }
    }
    
    out.push(ok ? "YES" : "NO");
  }
  
  console.log(out.join('\n'));
}

solve();

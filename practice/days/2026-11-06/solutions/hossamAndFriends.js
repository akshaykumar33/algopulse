const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    
    const minV = new Int32Array(n + 1);
    minV.fill(n + 1);
    
    for (let i = 0; i < m; i++) {
      let u = parseInt(input[ptr++], 10);
      let v = parseInt(input[ptr++], 10);
      if (u > v) {
        const tmp = u;
        u = v;
        v = tmp;
      }
      if (v < minV[u]) {
        minV[u] = v;
      }
    }
    
    let curLimit = n;
    let ans = 0;
    
    for (let a = n; a >= 1; a--) {
      if (minV[a] - 1 < curLimit) {
        curLimit = minV[a] - 1;
      }
      ans += curLimit - a + 1;
    }
    
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();


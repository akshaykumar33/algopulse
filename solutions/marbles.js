const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  let t = parseInt(lines[0], 10);
  let idx = 1;
  let out = [];
  
  while (t > 0 && idx < lines.length) {
    const parts = lines[idx++].trim().split(/\s+/);
    if (parts.length < 2) continue;
    let n = parseInt(parts[0], 10);
    let k = parseInt(parts[1], 10);
    
    let N = n - 1;
    let K = k - 1;
    if (K > N - K) {
      K = N - K;
    }
    
    let res = 1n;
    for (let i = 1; i <= K; i++) {
      res = (res * BigInt(N - i + 1)) / BigInt(i);
    }
    
    out.push(res.toString());
    t--;
  }
  
  console.log(out.join('\n'));
}

solve();

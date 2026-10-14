const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(input[lineIdx++], 10);
    const arr = input[lineIdx++].split(/\s+/).map(Number);
    
    const freq = new Map();
    let maxFreq = 0;
    
    for (let j = 0; j < n; j++) {
      const val = arr[j];
      const cnt = (freq.get(val) || 0) + 1;
      freq.set(val, cnt);
      if (cnt > maxFreq) {
        maxFreq = cnt;
      }
    }
    
    out.push(n - maxFreq);
  }
  
  console.log(out.join('\n'));
}

solve();

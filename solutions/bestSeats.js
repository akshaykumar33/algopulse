const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let t = parseInt(input[0], 10);
  let lineIdx = 1;
  const out = [];
  
  while (t--) {
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++], 10);
    const arr = input[lineIdx++].trim().split(/\s+/).map(Number);
    
    let bestVal = -1;
    let bestIdx = 1;
    
    for (let i = 0; i < n; i++) {
      if (arr[i] > bestVal) {
        bestVal = arr[i];
        bestIdx = i + 1;
      }
    }
    
    out.push(bestIdx);
  }
  
  console.log(out.join('\n'));
}

solve();

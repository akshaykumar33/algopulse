const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  
  let t = parseInt(input[0], 10);
  let lineIdx = 1;
  let out = [];
  
  for (let i = 0; i < t; i++) {
    if (lineIdx >= input.length) break;
    const parts = input[lineIdx++].trim().split(/\s+/);
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);
    const x = parseInt(parts[2], 10);
    const y = parseInt(parts[3], 10);
    
    const ans = a * b * Math.min(x, y);
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();

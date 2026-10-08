const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  let t = parseInt(lines[0], 10);
  let lineIdx = 1;
  let out = [];
  
  for (let i = 0; i < t; i++) {
    if (lineIdx >= lines.length) break;
    let n = parseInt(lines[lineIdx++], 10);
    let arr = lines[lineIdx++].split(/\s+/).map(Number);
    
    if (n < 2) {
      out.push("NO");
      continue;
    }
    
    let evens = 0;
    for (let j = 0; j < n; j++) {
      if (arr[j] % 2 === 0) {
        evens++;
      }
    }
    
    if (evens === 1) {
      out.push("NO");
    } else {
      out.push("YES");
    }
  }
  
  console.log(out.join('\n'));
}

solve();

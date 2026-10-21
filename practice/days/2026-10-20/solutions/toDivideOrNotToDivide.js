const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  const t = parseInt(lines[0], 10);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    const [a, b, n] = lines[i].split(/\s+/).map(Number);
    
    if (a % b === 0) {
      out.push(-1);
      continue;
    }
    
    let start = Math.ceil(n / a) * a;
    if (start % b !== 0) {
      out.push(start);
    } else {
      out.push(start + a);
    }
  }
  
  console.log(out.join('\n'));
}

solve();

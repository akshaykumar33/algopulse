const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  
  const t = parseInt(input[0], 10);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    if (i >= input.length) break;
    const parts = input[i].trim().split(/\s+/);
    if (parts.length < 2) continue;
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);
    
    if (a === b) {
      out.push('Alice');
    } else {
      out.push('Bob');
    }
  }
  
  console.log(out.join('\n'));
}

solve();

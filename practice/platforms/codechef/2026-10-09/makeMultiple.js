const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  const t = parseInt(lines[0], 10);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    if (i >= lines.length) break;
    const parts = lines[i].trim().split(/\s+/);
    if (parts.length < 2) continue;
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);
    
    if (b >= a && b % a === 0) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  
  console.log(out.join('\n'));
}

solve();

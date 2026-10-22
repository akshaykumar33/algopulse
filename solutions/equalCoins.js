const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  const t = parseInt(lines[0], 10);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    const [x, y] = lines[i].split(' ').map(Number);
    if (x % 2 !== 0) {
      out.push('NO');
    } else {
      if (x === 0 && y % 2 !== 0) {
        out.push('NO');
      } else {
        out.push('YES');
      }
    }
  }
  
  console.log(out.join('\n'));
}

solve();

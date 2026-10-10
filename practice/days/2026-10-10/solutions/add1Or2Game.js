const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  const t = parseInt(lines[0], 10);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    if (!lines[i]) continue;
    const n = parseInt(lines[i], 10);
    if (n % 3 === 0) {
      out.push('BOB');
    } else {
      out.push('ALICE');
    }
  }
  
  console.log(out.join('\n'));
}

solve();

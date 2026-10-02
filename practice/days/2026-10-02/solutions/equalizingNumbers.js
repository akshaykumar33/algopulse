const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(input[0]);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    if (Math.abs(a - b) % 3 === 0) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }
  
  console.log(out.join('\n'));
}

solve();

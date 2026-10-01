const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(input[0], 10);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    const [a, b] = input[i].split(/\s+/).map(Number);
    let x = a;
    let y = b;
    
    while (x % 2 === 0) x /= 2;
    while (y % 2 === 0) y /= 2;
    
    if (x === y) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }
  
  console.log(out.join('\n'));
}

solve();

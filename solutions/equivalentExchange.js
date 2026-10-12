const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  const t = parseInt(lines[0], 10);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    const [x, y] = lines[i].split(/\s+/).map(Number);
    if (Math.abs(x - y) % 5 === 0) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }
  
  console.log(out.join('\n'));
}

solve();

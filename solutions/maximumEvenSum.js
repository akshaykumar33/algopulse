const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++]);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const [a, b] = input[lineIdx++].split(' ').map(Number);
    let ans = -1;
    if (b % 2 === 0) {
      ans = Math.max(ans, a + b);
    }
    if (a % 2 === 0) {
      ans = Math.max(ans, a + b);
    }
    if (a % 2 !== 0 && b % 2 !== 0) {
      ans = Math.max(ans, a + b);
    }
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();

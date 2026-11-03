const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    if (n % 4 !== 0) {
      out.push('NO');
    } else {
      out.push('YES');
      const a = [];
      const b = [];
      let left = 1;
      let right = n;
      let turn = 0;
      
      for (let j = 0; j < n / 2; j++) {
        if (turn === 0) {
          a.push(left);
          a.push(right);
        } else {
          b.push(left);
          b.push(right);
        }
        left++;
        right--;
        turn = 1 - turn;
      }
      
      out.push(a.join(' '));
      out.push(b.join(' '));
    }
  }
  
  console.log(out.join('\n'));
}

solve();

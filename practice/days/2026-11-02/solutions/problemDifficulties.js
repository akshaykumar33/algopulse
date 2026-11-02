const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const arr = [];
    for (let j = 0; j < 4; j++) {
      arr.push(parseInt(tokens[ptr++], 10));
    }
    arr.sort((a, b) => a - b);
    
    const freq = {};
    for (const x of arr) {
      freq[x] = (freq[x] || 0) + 1;
    }
    
    const keys = Object.keys(freq).length;
    
    if (keys === 4) {
      out.push(2);
    } else if (keys === 3) {
      out.push(2);
    } else if (keys === 2) {
      const counts = Object.values(freq);
      if (counts.includes(3)) {
        out.push(1);
      } else {
        out.push(2);
      }
    } else {
      out.push(0);
    }
  }
  
  console.log(out.join('\n'));
}

solve();

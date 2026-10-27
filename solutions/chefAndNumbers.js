const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(tokens[ptr++], 10));
    }
    
    const groups = new Map();
    let i = 0;
    while (i < n) {
      let j = i;
      while (j < n && arr[j] === arr[i]) {
        j++;
      }
      const len = j - i;
      const val = arr[i];
      if (!groups.has(val)) {
        groups.set(val, []);
      }
      groups.get(val).push(len);
      i = j;
    }
    
    let bestVal = Infinity;
    let maxScore = -1;
    
    for (const [val, lens] of groups.entries()) {
      let score = 0;
      for (const len of lens) {
        score += Math.ceil(len / 2);
      }
      if (score > maxScore) {
        maxScore = score;
        bestVal = val;
      } else if (score === maxScore) {
        if (val < bestVal) {
          bestVal = val;
        }
      }
    }
    
    out.push(bestVal);
  }
  
  console.log(out.join('\n'));
}

solve();

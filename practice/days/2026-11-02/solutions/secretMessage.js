const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const p = tokens[ptr++];
    
    let ans = 0;
    for (let j = 0; j <= n - m; j++) {
      let match = true;
      for (let k = 0; k < m; k++) {
        if (s[j + k] !== p[k]) {
          match = false;
          break;
        }
      }
      if (match) ans++;
    }
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();

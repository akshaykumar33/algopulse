const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    const b = [];
    for (let j = 0; j < n; j++) {
      a.push(parseInt(tokens[ptr++], 10));
    }
    for (let j = 0; j < n; j++) {
      b.push(parseInt(tokens[ptr++], 10));
    }
    
    let ok = true;
    for (let j = 0; j < n; j++) {
      if (b[j] % a[j] !== 0) {
        ok = false;
        break;
      }
    }
    
    if (ok) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }
  
  console.log(out.join('\n'));
}

solve();

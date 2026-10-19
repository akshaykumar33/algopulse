const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let e = parseInt(input[ptr++], 10);
    
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }
    
    const b = [];
    for (let i = 0; i < n; i++) {
      b.push(parseInt(input[ptr++], 10));
    }
    
    let wins = 0;
    const costs = [];
    
    for (let i = 0; i < n; i++) {
      if (a[i] > b[i]) {
        wins++;
      } else {
        costs.push(b[i] - a[i] + 1);
      }
    }
    
    costs.sort((x, y) => x - y);
    
    for (let i = 0; i < costs.length; i++) {
      if (wins > Math.floor(n / 2)) break;
      if (e >= costs[i]) {
        e -= costs[i];
        wins++;
      } else {
        break;
      }
    }
    
    if (wins > Math.floor(n / 2)) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }

  console.log(out.join('\n'));
}

solve();

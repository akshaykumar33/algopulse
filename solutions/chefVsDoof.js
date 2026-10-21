const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let ptr = 0;
  const t = parseInt(lines[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[ptr++], 10);
    const arr = lines[ptr++].split(/\s+/).map(Number);
    let hasEven = false;
    for (let j = 0; j < n; j++) {
      if (arr[j] % 2 === 0) {
        hasEven = true;
        break;
      }
    }
    if (hasEven) {
      out.push("NO");
    } else {
      out.push("YES");
    }
  }
  
  console.log(out.join('\n'));
}

solve();

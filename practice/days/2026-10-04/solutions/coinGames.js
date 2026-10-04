const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(lines[0], 10);
  let ptr = 1;
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[ptr++], 10);
    const s = lines[ptr++];
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      if (s[j] === 'U') cnt++;
    }
    if (cnt % 2 === 1) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let ptr = 0;
  const t = parseInt(lines[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[ptr++], 10);
    const arr = lines[ptr++].split(' ').map(Number);
    let ans = arr[0];
    for (let j = 1; j < n; j++) {
      ans &= arr[j];
    }
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();

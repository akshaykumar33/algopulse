const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let count = 0;
    while (n > 0) {
      let s = Math.floor(Math.sqrt(n));
      if (s === 0) break;
      count++;
      n -= s * s;
    }
    out.push(count);
  }
  console.log(out.join('\n'));
}

solve();

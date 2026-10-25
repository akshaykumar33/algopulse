const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let x = parseInt(input[ptr++], 10);
    let a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }
    a.sort((p, q) => q - p);
    let sum = 0;
    let count = 0;
    let ok = false;
    for (let i = 0; i < n; i++) {
      sum += a[i];
      count++;
      if (sum >= x) {
        ok = true;
        break;
      }
    }
    out.push(ok ? count : -1);
  }
  console.log(out.join('\n'));
}

solve();

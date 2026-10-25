const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let k = parseInt(input[ptr++], 10);
    let a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }
    a.sort((x, y) => x - y);
    if (n === 2) {
      out.push(a[0] + a[1]);
    } else {
      out.push(Math.max(a[0] + a[1], a[n - 1]));
    }
  }
  console.log(out.join('\n'));
}

solve();

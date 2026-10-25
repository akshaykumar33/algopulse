const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }
    a.sort((x, y) => x - y);
    let ops = 0;
    for (let i = 0; i < n; i++) {
      ops += Math.abs(a[i] - i);
    }
    out.push(ops);
  }
  console.log(out.join('\n'));
}

solve();

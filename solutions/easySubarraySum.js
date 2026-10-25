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
    let firstPos = -1;
    let lastPos = -1;
    for (let i = 0; i < n; i++) {
      let v = parseInt(input[ptr++], 10);
      a.push(v);
      if (v > 0) {
        if (firstPos === -1) firstPos = i;
        lastPos = i;
      }
    }
    if (firstPos === -1) {
      out.push(0);
    } else {
      let count = 0;
      for (let i = firstPos; i <= lastPos; i++) {
        if (a[i] < 0) count++;
      }
      out.push(count);
    }
  }
  console.log(out.join('\n'));
}

solve();

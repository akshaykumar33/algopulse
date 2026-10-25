const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let y = parseInt(input[ptr++], 10);
    let o = 0;
    for (let i = 0; i < n; i++) {
      o |= parseInt(input[ptr++], 10);
    }
    if ((o & y) !== o) {
      out.push(-1);
    } else {
      out.push(y ^ o);
    }
  }
  console.log(out.join('\n'));
}

solve();

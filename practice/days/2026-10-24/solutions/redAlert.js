const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let d = parseInt(input[ptr++], 10);
    let h = parseInt(input[ptr++], 10);
    let w = 0;
    let alert = false;
    for (let i = 0; i < n; i++) {
      let a = parseInt(input[ptr++], 10);
      if (a > 0) {
        w += a;
      } else {
        w = Math.max(0, w - d);
      }
      if (w > h) alert = true;
    }
    out.push(alert ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();

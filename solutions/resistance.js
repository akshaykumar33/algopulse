const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    let p = 1, q = 1;
    for (let i = 2; i <= n; i++) {
      const nextP = (p + q) % m;
      const nextQ = (nextP + q) % m;
      p = nextP;
      q = nextQ;
    }
    out.push(p + '/' + q);
  }
  console.log(out.join('\n'));
}
solve();
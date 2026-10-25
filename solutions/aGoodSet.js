const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const res = [];
    for (let i = 0; i < n; i++) {
      res.push(2 * i + 1);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

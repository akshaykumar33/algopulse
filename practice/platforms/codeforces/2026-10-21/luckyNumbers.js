const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const n = parseInt(input[0], 10);

  const ans = Math.pow(2, n + 1) - 2;

  const out = [];
  out.push(ans);
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const ans = Math.floor((n + 2) / 2) * Math.floor((n + 1) / 2);
  console.log(ans);
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(n + i);
  }
  console.log(res.join(' '));
}

solve();

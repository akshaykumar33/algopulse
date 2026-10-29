const fs = require('fs');

function solve() {
  console.log(3);
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const y = parseInt(input[0], 10);
  const z = 6 - 3 - y;
  console.log(z);
}

solve();

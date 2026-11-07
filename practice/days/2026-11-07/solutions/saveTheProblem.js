const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const a = parseInt(input, 10);
  console.log(`${2 * a - 1} 2\n1 2`);
}

solve();


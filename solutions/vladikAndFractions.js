const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);
  if (n === 1) {
    console.log(-1);
    return;
  }
  console.log(`${n} ${n + 1} ${n * (n + 1)}`);
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const x = Math.abs(parseInt(input, 10));

  let k = 0;
  let sum = 0;
  while (sum < x || (sum - x) % 2 !== 0) {
    k++;
    sum += k;
  }

  console.log(k);
}

solve();

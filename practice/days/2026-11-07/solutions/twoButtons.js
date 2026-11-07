const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  let n = parseInt(input[0], 10);
  let m = parseInt(input[1], 10);
  let ops = 0;
  while (m > n) {
    if (m % 2 === 0) {
      m /= 2;
    } else {
      m += 1;
    }
    ops++;
  }
  ops += (n - m);
  console.log(ops);
}

solve();


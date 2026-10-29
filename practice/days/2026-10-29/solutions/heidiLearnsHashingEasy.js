const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const r = BigInt(input[0]);
  if (r > 3n && (r % 2n === 1n)) {
    const y = (r - 3n) / 2n;
    console.log(`1 ${y.toString()}`);
  } else {
    console.log('NO');
  }
}

solve();

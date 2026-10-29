const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const a = BigInt(input[0]);
  const rem = a % 6n;

  if (rem === 0n || rem === 1n || rem === 3n) {
    console.log('yes');
  } else {
    console.log('no');
  }
}

solve();


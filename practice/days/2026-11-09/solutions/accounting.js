const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const a = BigInt(tokens[0]);
  const b = BigInt(tokens[1]);
  const n = BigInt(tokens[2]);

  for (let x = -1000; x <= 1000; x++) {
    const bx = BigInt(x);
    if (a * (bx ** n) === b) {
      console.log(x);
      return;
    }
  }

  console.log('No solution');
}

solve();

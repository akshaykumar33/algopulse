const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const a = BigInt(tokens[0]);
  const b = BigInt(tokens[1]);

  if (a === b) {
    console.log('Equal');
    return;
  }

  const g = gcd(a, b);
  let ca = b / g;
  let cb = a / g;

  if (ca > cb) cb++;
  else ca++;

  if (ca > cb) console.log('Dasha');
  else if (ca === cb) console.log('Equal');
  else console.log('Masha');
}

solve();

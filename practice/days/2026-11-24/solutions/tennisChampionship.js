const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = BigInt(tokens[0]);
  if (n < 3n) {
    console.log(1);
    return;
  }
  let f1 = 2n;
  let f2 = 3n;
  let wins = 2;
  while (f1 + f2 <= n) {
    const nextF = f1 + f2;
    f1 = f2;
    f2 = nextF;
    wins++;
  }
  console.log(wins);
}

solve();

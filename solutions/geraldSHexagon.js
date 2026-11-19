const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 6) return;

  const a1 = Number(input[0]);
  const a2 = Number(input[1]);
  const a3 = Number(input[2]);
  const a4 = Number(input[3]);
  const a5 = Number(input[4]);
  const a6 = Number(input[5]);

  const L = a1 + a2 + a3;
  const ans = L * L - a1 * a1 - a3 * a3 - a5 * a5;

  console.log(ans);
}

solve();

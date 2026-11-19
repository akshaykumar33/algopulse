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
  const ans = L * L - a2 * a2 - a4 * a4 - a6 * a6;

  console.log(ans);
}

solve();

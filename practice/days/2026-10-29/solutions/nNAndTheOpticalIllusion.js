const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const r = parseFloat(input[1]);

  const sinVal = Math.sin(Math.PI / n);
  const R = (r * sinVal) / (1 - sinVal);
  console.log(R.toFixed(7));
}

solve();

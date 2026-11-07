const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);

  const totalInches = Math.floor((n + 1) / 3);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;

  console.log(feet + ' ' + inches);
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  const n = parseInt(tokens[0], 10);
  const m = parseInt(tokens[1], 10);

  const same = Math.max(n, m) - 1;
  const diff = Math.min(n, m);

  console.log(`${same} ${diff}`);
}

solve();


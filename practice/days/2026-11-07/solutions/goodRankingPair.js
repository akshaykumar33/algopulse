const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);

  const p1 = [];
  const p2 = [];
  for (let i = 1; i <= n; i++) {
    p1.push(i);
    p2.push(n - i + 1);
  }

  const out = [
    2,
    p1.join(' '),
    p2.join(' ')
  ];

  console.log(out.join('\n'));
}

solve();

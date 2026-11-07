const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const d = parseInt(tokens[0], 10);

  if (d % 2 === 1) {
    console.log(-1);
    return;
  }

  const k = d / 2;
  const out = [
    '0 ' + k,
    k + ' 0',
    '0 -' + k,
    '-' + k + ' 0'
  ];

  console.log(out.join('\n'));
}

solve();

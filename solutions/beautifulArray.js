const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const a = parseInt(tokens[0], 10);
  const b = parseInt(tokens[1], 10);
  const out = [];
  if (a === b) {
    out.push('1');
    out.push(a.toString());
  } else {
    out.push('3');
    const c = 3 * a - 2 * b;
    const arr = [b, b, c].sort((x, y) => x - y);
    out.push(arr.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

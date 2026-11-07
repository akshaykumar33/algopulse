const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 3 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const x = Number(tokens[1]);
  const y = Number(tokens[2]);

  if (y < n) {
    console.log(-1);
    return;
  }

  const last = y - (n - 1);
  const sumSq = (n - 1) + last * last;

  if (sumSq < x) {
    console.log(-1);
    return;
  }

  const out = [];
  for (let i = 0; i < n - 1; i++) {
    out.push(1);
  }
  out.push(last);
  console.log(out.join('\n'));
}

solve();

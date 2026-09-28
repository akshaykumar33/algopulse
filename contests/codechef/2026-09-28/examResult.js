const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let idx = 0;
  const output = [];

  while (idx + 4 < tokens.length) {
    const C = parseInt(tokens[idx++], 10);
    const M = parseInt(tokens[idx++], 10);
    const W = parseInt(tokens[idx++], 10);
    const P = parseInt(tokens[idx++], 10);
    const R = parseInt(tokens[idx++], 10);

    const score = C * M - W * P;
    output.push(score >= R ? 'YES' : 'NO');
  }

  if (output.length > 0) {
    console.log(output.join('\n'));
  }
}

solve();

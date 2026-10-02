const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    out.push(Math.abs(a - b) % 2 === 0 ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();

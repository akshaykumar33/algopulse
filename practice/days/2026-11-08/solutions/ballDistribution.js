const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    let sum = 0;

    for (let i = 0; i < m; i++) {
      sum += parseInt(tokens[ptr++], 10);
    }

    const need = sum - n * (m - 1);
    out.push(need > 0 ? need : 0);
  }

  console.log(out.join('\n'));
}

solve();

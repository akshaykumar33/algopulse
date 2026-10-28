const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseFloat(tokens[ptr++]));
    }

    a.sort((x, y) => y - x);

    let curr = a[0];
    for (let i = 1; i < n; i++) {
      curr = (curr + a[i]) / 2;
    }

    out.push(curr.toFixed(8));
  }

  console.log(out.join('\n'));
}

solve();


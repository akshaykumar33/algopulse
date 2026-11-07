const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x1 = parseInt(tokens[ptr++], 10);
    const y1 = parseInt(tokens[ptr++], 10);
    const x2 = parseInt(tokens[ptr++], 10);
    const y2 = parseInt(tokens[ptr++], 10);

    const direct = Math.abs(x2 - x1) + Math.abs(y2 - y1);
    const b1 = Math.min(x1, n - x1 + 1, y1, n - y1 + 1);
    const b2 = Math.min(x2, n - x2 + 1, y2, n - y2 + 1);
    out.push(Math.min(direct, b1 + b2));
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a1 = parseInt(tokens[ptr++], 10);
    const b1 = parseInt(tokens[ptr++], 10);
    const a2 = parseInt(tokens[ptr++], 10);
    const b2 = parseInt(tokens[ptr++], 10);

    const v1 = 5 * a1 + b1;
    const v2 = 5 * a2 + b2;

    if (v1 >= v2 && (v1 - v2) % 6 === 0) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

solve();

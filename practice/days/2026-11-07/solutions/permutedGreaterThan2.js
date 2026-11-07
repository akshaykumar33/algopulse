const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    const z = parseInt(tokens[ptr++], 10);

    if (x === 0) {
      out.push('YES');
    } else if (z < x - 1) {
      out.push('NO');
    } else if (z === x - 1) {
      out.push(y === 0 ? 'YES' : 'NO');
    } else {
      out.push('YES');
    }
  }

  console.log(out.join('\n'));
}

solve();

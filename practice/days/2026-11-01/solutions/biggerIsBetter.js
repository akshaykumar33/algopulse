const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = tokens[ptr++];
    if (a === 'z'.repeat(n)) {
      out.push('-1');
    } else {
      out.push('z'.repeat(n));
    }
  }
  console.log(out.join('\n'));
}

solve();

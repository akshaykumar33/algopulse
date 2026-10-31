const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const s = tokens[ptr++];
    if (s[0] === '1') {
      out.push('10' + s.slice(1));
    } else {
      out.push('1' + s);
    }
  }
  console.log(out.join('\n'));
}

solve();

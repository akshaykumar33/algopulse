const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let sunny = 0;
    for (let i = 0; i < 7; i++) {
      if (tokens[ptr++] === '1') sunny++;
    }
    out.push(sunny > 3 ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

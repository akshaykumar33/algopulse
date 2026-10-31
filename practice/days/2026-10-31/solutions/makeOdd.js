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
    const b = tokens[ptr++];

    let forcedOnes = 0;
    let choices = 0;

    for (let i = 0; i < n; i++) {
      const c1 = a[i];
      const c2 = b[i];
      if (c1 === '1' && c2 === '1') {
        forcedOnes++;
      } else if (c1 !== c2) {
        choices++;
      }
    }

    if (choices > 0 || forcedOnes % 2 === 1) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

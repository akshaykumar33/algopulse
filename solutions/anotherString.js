const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = tokens[ptr++];
    const b = tokens[ptr++];

    let c1 = 0;
    let c2 = 0;
    for (let j = 0; j < n; j++) {
      if (a[j] === '1') c1++;
      if (b[j] === '1') c2++;
    }

    if ((c1 % 2) === (c2 % 2)) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

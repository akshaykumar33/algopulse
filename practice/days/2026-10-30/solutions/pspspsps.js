const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++].split('');
    if (s[0] === 's') s[0] = '.';
    if (s[n - 1] === 'p') s[n - 1] = '.';

    let countS = 0;
    let countP = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === 's') countS++;
      if (s[i] === 'p') countP++;
    }

    if (countS > 0 && countP > 0) {
      out.push('NO');
    } else {
      out.push('YES');
    }
  }
  console.log(out.join('\n'));
}

solve();

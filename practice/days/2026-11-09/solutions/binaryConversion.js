const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const target = tokens[ptr++];

    let wa = 0;
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0' && target[i] === '1') wa++;
      if (s[i] === '1') cnt++;
      if (target[i] === '1') cnt--;
    }

    if (cnt !== 0) {
      out.push('NO');
      continue;
    }

    if (n === 2) {
      if (k % 2 === 0) {
        out.push(s === target ? 'YES' : 'NO');
      } else {
        const rev = s[1] + s[0];
        out.push(rev === target ? 'YES' : 'NO');
      }
      continue;
    }

    if (k >= wa) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

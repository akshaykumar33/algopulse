const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let a = parseInt(tokens[ptr++], 10);
    let b = parseInt(tokens[ptr++], 10);
    let c = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    const res = new Array(n).fill('');
    let wins = 0;

    for (let i = 0; i < n; i++) {
      const ch = s[i];
      if (ch === 'R' && b > 0) {
        res[i] = 'P';
        b--;
        wins++;
      } else if (ch === 'P' && c > 0) {
        res[i] = 'S';
        c--;
        wins++;
      } else if (ch === 'S' && a > 0) {
        res[i] = 'R';
        a--;
        wins++;
      }
    }

    for (let i = 0; i < n; i++) {
      if (res[i] === '') {
        if (a > 0) {
          res[i] = 'R';
          a--;
        } else if (b > 0) {
          res[i] = 'P';
          b--;
        } else if (c > 0) {
          res[i] = 'S';
          c--;
        }
      }
    }

    const needed = Math.ceil(n / 2);
    if (wins >= needed) {
      out.push('YES');
      out.push(res.join(''));
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

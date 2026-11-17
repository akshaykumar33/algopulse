const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n0 = parseInt(tokens[ptr++], 10);
    const n1 = parseInt(tokens[ptr++], 10);
    const n2 = parseInt(tokens[ptr++], 10);

    if (n1 === 0) {
      if (n0 > 0) {
        out.push('0'.repeat(n0 + 1));
      } else {
        out.push('1'.repeat(n2 + 1));
      }
      continue;
    }

    let res = '';
    if (n2 > 0) res += '1'.repeat(n2 + 1);
    if (n0 > 0) {
      if (res.length > 0) {
        res += '0'.repeat(n0 + 1);
        let cur = '1';
        for (let i = 0; i < n1 - 1; i++) {
          res += cur;
          cur = cur === '1' ? '0' : '1';
        }
      } else {
        res += '0'.repeat(n0 + 1);
        let cur = '1';
        for (let i = 0; i < n1; i++) {
          res += cur;
          cur = cur === '1' ? '0' : '1';
        }
      }
    } else {
      if (res.length === 0) res = '1';
      let cur = '0';
      for (let i = 0; i < n1; i++) {
        res += cur;
        cur = cur === '1' ? '0' : '1';
      }
    }
    out.push(res);
  }

  console.log(out.join('\n'));
}

solve();

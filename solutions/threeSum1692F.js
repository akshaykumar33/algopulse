const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const count = new Int32Array(10);
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      count[val % 10]++;
    }

    const v = [];
    for (let d = 0; d < 10; d++) {
      const take = Math.min(count[d], 3);
      for (let j = 0; j < take; j++) v.push(d);
    }

    let found = false;
    const len = v.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        for (let k = j + 1; k < len; k++) {
          if ((v[i] + v[j] + v[k]) % 10 === 3) {
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }

    out.push(found ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();

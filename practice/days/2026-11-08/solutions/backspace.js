const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const q = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    const s = tokens[ptr++];
    const t = tokens[ptr++];

    let i = s.length - 1;
    let j = t.length - 1;

    while (i >= 0 && j >= 0) {
      if (s[i] === t[j]) {
        i--;
        j--;
      } else {
        i -= 2;
      }
    }

    out.push(j < 0 ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

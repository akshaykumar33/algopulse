const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = tokens[ptr++];
    const b = tokens[ptr++];

    const setA = new Set();
    for (let i = 0; i < a.length; i++) setA.add(a[i]);

    let common = false;
    for (let i = 0; i < b.length; i++) {
      if (setA.has(b[i])) {
        common = true;
        break;
      }
    }

    out.push(common ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();


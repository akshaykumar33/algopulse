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
    const n = a.length;

    let hasZero = false;
    let hasOne = false;
    let c01 = 0;
    let c10 = 0;

    for (let i = 0; i < n; i++) {
      if (a.charCodeAt(i) === 48) {
        hasZero = true;
      } else {
        hasOne = true;
      }

      if (a.charCodeAt(i) === 48 && b.charCodeAt(i) === 49) {
        c01++;
      } else if (a.charCodeAt(i) === 49 && b.charCodeAt(i) === 48) {
        c10++;
      }
    }

    if (!hasZero || !hasOne) {
      out.push('Unlucky Chef');
    } else {
      out.push('Lucky Chef');
      out.push(c01 > c10 ? c01 : c10);
    }
  }

  console.log(out.join('\n'));
}

solve();

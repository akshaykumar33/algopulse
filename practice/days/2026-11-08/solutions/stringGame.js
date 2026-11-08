const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let c0 = 0;
    let c1 = 0;

    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 48) {
        c0++;
      } else {
        c1++;
      }
    }

    const moves = c0 < c1 ? c0 : c1;
    if ((moves & 1) === 1) {
      out.push('Zlatan');
    } else {
      out.push('Ramos');
    }
  }

  console.log(out.join('\n'));
}

solve();

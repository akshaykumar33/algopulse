const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let ax = 0;
    let ay = 0;
    let ok = false;

    for (let i = 1; i <= n; i++) {
      const ch = s[i - 1];
      if (ch === 'R') ax++;
      else if (ch === 'L') ax--;
      else if (ch === 'U') ay++;
      else if (ch === 'D') ay--;

      const dist = Math.abs(x - ax) + Math.abs(y - ay);
      if (dist <= i && ((i - dist) & 1) === 0) {
        ok = true;
        break;
      }
    }

    out.push(ok ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();

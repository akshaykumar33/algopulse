const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);

    let totalDigits = 0;
    const zeros = [];

    for (let i = 0; i < n; i++) {
      const s = tokens[ptr++];
      totalDigits += s.length;
      let tz = 0;
      for (let j = s.length - 1; j >= 0 && s[j] === '0'; j--) {
        tz++;
      }
      zeros.push(tz);
    }

    zeros.sort((a, b) => b - a);

    for (let i = 0; i < n; i += 2) {
      totalDigits -= zeros[i];
    }

    out.push(totalDigits >= m + 1 ? 'Sasha' : 'Anna');
  }

  console.log(out.join('\n'));
}

solve();

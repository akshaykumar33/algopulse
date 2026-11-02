const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const n = s.length;

    let cL = 0, cT = 0, cI = 0, cM = 0, cE = 0;
    for (let i = 0; i < n; i++) {
      const ch = s[i];
      if (ch === 'L') cL++;
      else if (ch === 'T') cT++;
      else if (ch === 'I') cI++;
      else if (ch === 'M') cM++;
      else if (ch === 'E') cE++;
    }

    if (n < 9) {
      out.push('NO');
    } else if (n === 9) {
      if (cL >= 2 && cT >= 2 && cI >= 2 && cM >= 2 && cE >= 1) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    } else {
      if (cL >= 2 && cT >= 2 && cI >= 2 && cM >= 2 && cE >= 2) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();


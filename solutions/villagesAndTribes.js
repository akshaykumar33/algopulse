const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let countA = 0;
    let countB = 0;
    let lastTribe = null;
    let dotCount = 0;

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === 'A') {
        countA++;
        if (lastTribe === 'A') {
          countA += dotCount;
        }
        lastTribe = 'A';
        dotCount = 0;
      } else if (ch === 'B') {
        countB++;
        if (lastTribe === 'B') {
          countB += dotCount;
        }
        lastTribe = 'B';
        dotCount = 0;
      } else {
        if (lastTribe !== null) {
          dotCount++;
        }
      }
    }

    out.push(`${countA} ${countB}`);
  }

  console.log(out.join('\n'));
}

solve();


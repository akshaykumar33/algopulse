const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let diff1 = 0;
    let diff2 = 0;

    for (let i = 0; i < s.length; i++) {
      const expected1 = i % 2 === 0 ? '-' : '+';
      const expected2 = i % 2 === 0 ? '+' : '-';
      if (s[i] !== expected1) diff1++;
      if (s[i] !== expected2) diff2++;
    }

    out.push(Math.min(diff1, diff2));
  }

  console.log(out.join('\n'));
}

solve();


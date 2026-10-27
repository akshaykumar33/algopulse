const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let maxGap = 0;
    let days = 0;
    let curGap = 0;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === '.') {
        curGap++;
      } else {
        if (curGap > 0) {
          if (curGap > maxGap) {
            days++;
            maxGap = curGap;
          }
          curGap = 0;
        }
      }
    }
    out.push(days);
  }
  console.log(out.join('\n'));
}

solve();

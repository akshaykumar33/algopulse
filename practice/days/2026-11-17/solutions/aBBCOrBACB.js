const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let hasBB = s.includes('BB');
    let startsOrEndsWithB = s[0] === 'B' || s[s.length - 1] === 'B';
    const aBlocks = [];
    let cur = 0;
    let totalA = 0;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === 'A') {
        cur++;
        totalA++;
      } else {
        aBlocks.push(cur);
        cur = 0;
      }
    }
    aBlocks.push(cur);

    if (hasBB || startsOrEndsWithB) {
      out.push(totalA);
    } else {
      let minA = aBlocks[0];
      for (let i = 1; i < aBlocks.length; i++) {
        if (aBlocks[i] < minA) {
          minA = aBlocks[i];
        }
      }
      out.push(totalA - minA);
    }
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    let r = 0, c = 0;
    let minR = 0, maxR = 0, minC = 0, maxC = 0;
    let bestR = 1, bestC = 1;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === 'L') c--;
      else if (ch === 'R') c++;
      else if (ch === 'U') r--;
      else if (ch === 'D') r++;
      const newMinR = Math.min(minR, r);
      const newMaxR = Math.max(maxR, r);
      const newMinC = Math.min(minC, c);
      const newMaxC = Math.max(maxC, c);
      if (newMaxR - newMinR + 1 > n || newMaxC - newMinC + 1 > m) {
        break;
      }
      minR = newMinR;
      maxR = newMaxR;
      minC = newMinC;
      maxC = newMaxC;
      bestR = 1 - minR;
      bestC = 1 - minC;
    }
    out.push(bestR + ' ' + bestC);
  }
  console.log(out.join('\n'));
}
solve();
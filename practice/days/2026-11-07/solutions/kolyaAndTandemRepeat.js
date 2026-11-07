const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const s = tokens[0];
  const k = parseInt(tokens[1], 10);

  const n = s.length;
  const total = n + k;
  let maxLen = 0;

  for (let len = 1; len * 2 <= total; len++) {
    const twoL = len * 2;
    for (let i = 0; i + twoL <= total; i++) {
      let ok = true;
      for (let j = 0; j < len; j++) {
        const p1 = i + j;
        const p2 = i + len + j;
        if (p1 < n && p2 < n) {
          if (s[p1] !== s[p2]) {
            ok = false;
            break;
          }
        }
      }
      if (ok) {
        if (twoL > maxLen) maxLen = twoL;
      }
    }
  }

  console.log(maxLen);
}

solve();

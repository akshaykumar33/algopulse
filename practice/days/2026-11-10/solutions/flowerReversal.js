const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    const s = tokens[pos++];

    let initB = 0;
    for (let i = 0; i < n - 1; i++) {
      if (s.charCodeAt(i) === s.charCodeAt(i + 1)) initB++;
    }

    let c01 = 0;
    let c10 = 0;
    for (let i = 0; i < n - 1; i++) {
      if (s.charCodeAt(i) === 48 && s.charCodeAt(i + 1) === 49) c01++;
      else if (s.charCodeAt(i) === 49 && s.charCodeAt(i + 1) === 48) c10++;
    }

    if (c01 >= 2 || c10 >= 2) {
      out.push(initB + 2);
      continue;
    }

    let canPlus1 = false;
    const firstChar = s.charCodeAt(0);
    for (let r = 0; r < n - 1; r++) {
      if (s.charCodeAt(r) !== s.charCodeAt(r + 1) && firstChar === s.charCodeAt(r + 1)) {
        canPlus1 = true;
        break;
      }
    }

    if (!canPlus1) {
      const lastChar = s.charCodeAt(n - 1);
      for (let l = 1; l < n; l++) {
        if (s.charCodeAt(l - 1) !== s.charCodeAt(l) && s.charCodeAt(l - 1) === lastChar) {
          canPlus1 = true;
          break;
        }
      }
    }

    out.push(canPlus1 ? initB + 1 : initB);
  }

  console.log(out.join('\n'));
}

solve();

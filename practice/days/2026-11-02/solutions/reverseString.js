const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const q = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    const s = tokens[ptr++];
    const t = tokens[ptr++];
    const n = s.length;
    const m = t.length;

    let found = false;
    for (let i = 0; i < n && !found; i++) {
      for (let j = i; j < n && !found; j++) {
        const rightLen = j - i + 1;
        if (rightLen > m) continue;
        const leftLen = m - rightLen;
        if (j - leftLen < 0) continue;

        let ok = true;
        for (let k = 0; k < rightLen; k++) {
          if (s[i + k] !== t[k]) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;

        for (let k = 0; k < leftLen; k++) {
          if (s[j - 1 - k] !== t[rightLen + k]) {
            ok = false;
            break;
          }
        }

        if (ok) found = true;
      }
    }

    out.push(found ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();


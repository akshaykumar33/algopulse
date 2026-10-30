const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const s = [];
  for (let i = 0; i < n; i++) s.push(tokens[ptr++]);

  const m = s[0].length;
  let minTotal = Infinity;

  for (let shift = 0; shift < m; shift++) {
    const target = s[0].slice(shift) + s[0].slice(0, shift);
    let currentTotal = shift;
    let ok = true;

    for (let i = 1; i < n; i++) {
      const doubleStr = s[i] + s[i];
      const idx = doubleStr.indexOf(target);
      if (idx === -1 || idx >= m) {
        ok = false;
        break;
      }
      currentTotal += idx;
    }

    if (ok && currentTotal < minTotal) {
      minTotal = currentTotal;
    }
  }

  console.log(minTotal === Infinity ? -1 : minTotal);
}

solve();

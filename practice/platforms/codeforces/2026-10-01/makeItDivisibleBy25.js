const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const targets = ['00', '25', '50', '75'];
  const out = [];

  for (let c = 1; c <= t; c++) {
    const s = input[c]?.trim();
    if (!s) continue;
    let minDeletions = Infinity;

    for (const target of targets) {
      const [d1, d2] = target;
      let j = -1;
      for (let k = s.length - 1; k >= 0; k--) {
        if (s[k] === d2) {
          j = k;
          break;
        }
      }
      if (j === -1) continue;

      let i = -1;
      for (let k = j - 1; k >= 0; k--) {
        if (s[k] === d1) {
          i = k;
          break;
        }
      }
      if (i === -1) continue;

      const deletions = s.length - 2 - i;
      if (deletions < minDeletions) {
        minDeletions = deletions;
      }
    }
    out.push(minDeletions.toString());
  }

  console.log(out.join('\n'));
}

solve();

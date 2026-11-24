const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const a = parseInt(tokens[0], 10);
  const b = parseInt(tokens[1], 10);
  for (let x1 = 1; x1 < a; x1++) {
    const rem1 = a * a - x1 * x1;
    const y1 = Math.round(Math.sqrt(rem1));
    if (y1 * y1 !== rem1 || y1 <= 0) continue;
    for (let x2 = 1; x2 < b; x2++) {
      const rem2 = b * b - x2 * x2;
      const y2 = Math.round(Math.sqrt(rem2));
      if (y2 * y2 !== rem2 || y2 <= 0) continue;
      if (x1 * x2 === y1 * y2) {
        const cx1 = x1;
        const cy1 = y1;
        const cx2 = -x2;
        const cy2 = y2;
        if (cx1 !== cx2 && cy1 !== cy2) {
          console.log(`YES\n0 0\n${cx1} ${cy1}\n${cx2} ${cy2}`);
          return;
        }
      }
    }
  }
  console.log('NO');
}

solve();

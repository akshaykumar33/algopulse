const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 24) return;
  const color = tokens.slice(0, 24).map(x => parseInt(x, 10));

  function isSolved(c) {
    for (let i = 0; i < 24; i += 4) {
      if (c[i] !== c[i + 1] || c[i] !== c[i + 2] || c[i] !== c[i + 3]) {
        return false;
      }
    }
    return true;
  }

  const moves = [
    { from: [1, 3, 5, 7, 9, 11, 22, 20], to: [5, 7, 9, 11, 22, 20, 1, 3] },
    { from: [1, 3, 5, 7, 9, 11, 22, 20], to: [22, 20, 1, 3, 5, 7, 9, 11] },
    { from: [12, 13, 4, 5, 16, 17, 20, 21], to: [4, 5, 16, 17, 20, 21, 12, 13] },
    { from: [12, 13, 4, 5, 16, 17, 20, 21], to: [20, 21, 12, 13, 4, 5, 16, 17] },
    { from: [2, 3, 16, 18, 9, 8, 15, 13], to: [15, 13, 2, 3, 16, 18, 9, 8] },
    { from: [2, 3, 16, 18, 9, 8, 15, 13], to: [16, 18, 9, 8, 15, 13, 2, 3] }
  ];

  for (const m of moves) {
    const next = color.slice();
    for (let i = 0; i < 8; i++) {
      next[m.from[i]] = color[m.to[i]];
    }
    if (isSolved(next)) {
      console.log('YES');
      return;
    }
  }

  console.log('NO');
}

solve();

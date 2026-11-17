const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const x = parseInt(tokens[ptr++], 10);

  const grid = [];
  for (let i = 0; i < n; i++) {
    grid.push(tokens[ptr++]);
  }
  const q = parseInt(tokens[ptr++], 10);
  const text = tokens[ptr++];

  const pos = Array.from({ length: 26 }, () => []);
  const shifts = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      const ch = grid[r][c];
      if (ch === 'S') {
        shifts.push([r, c]);
      } else {
        pos[ch.charCodeAt(0) - 97].push([r, c]);
      }
    }
  }

  const x2 = x * x;
  const canOneHand = new Uint8Array(26);
  for (let d = 0; d < 26; d++) {
    if (pos[d].length === 0 || shifts.length === 0) continue;
    let ok = false;
    for (const [pr, pc] of pos[d]) {
      for (const [sr, sc] of shifts) {
        if ((pr - sr) * (pr - sr) + (pc - sc) * (pc - sc) <= x2) {
          ok = true;
          break;
        }
      }
      if (ok) break;
    }
    if (ok) canOneHand[d] = 1;
  }

  let ans = 0;
  for (let i = 0; i < q; i++) {
    const code = text.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      if (shifts.length === 0) {
        console.log('-1');
        return;
      }
      const d = code - 65;
      if (pos[d].length === 0) {
        console.log('-1');
        return;
      }
      if (!canOneHand[d]) ans++;
    } else {
      const d = code - 97;
      if (pos[d].length === 0) {
        console.log('-1');
        return;
      }
    }
  }

  console.log(ans);
}

solve();

const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const vals = { Q: 9, R: 5, B: 3, N: 3, P: 1, K: 0, q: 9, r: 5, b: 3, n: 3, p: 1, k: 0 };
  let w = 0;
  let b = 0;
  for (let i = 0; i < 8; i++) {
    const row = lines[i];
    for (let j = 0; j < 8; j++) {
      const ch = row[j];
      if (ch === '.') continue;
      if (ch >= 'A' && ch <= 'Z') {
        w += vals[ch];
      } else {
        b += vals[ch];
      }
    }
  }
  if (w > b) {
    console.log("White");
  } else if (b > w) {
    console.log("Black");
  } else {
    console.log("Draw");
  }
}

solve();

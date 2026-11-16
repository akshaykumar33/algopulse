const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push(input[2 + i]);
  }

  const resolved = new Uint8Array(n);
  let removed = 0;

  for (let c = 0; c < m; c++) {
    let bad = false;
    for (let r = 0; r < n - 1; r++) {
      if (!resolved[r] && a[r].charCodeAt(c) > a[r + 1].charCodeAt(c)) {
        bad = true;
        break;
      }
    }
    if (bad) {
      removed++;
    } else {
      for (let r = 0; r < n - 1; r++) {
        if (!resolved[r] && a[r].charCodeAt(c) < a[r + 1].charCodeAt(c)) {
          resolved[r] = 1;
        }
      }
    }
  }
  console.log(removed);
}

solve();

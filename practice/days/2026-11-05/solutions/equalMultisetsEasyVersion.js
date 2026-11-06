const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      b[i] = parseInt(tokens[ptr++], 10);
    }

    const L = n - k + 1;
    const R = k;

    let possible = true;

    if (L > R) {
      for (let i = 0; i < n; i++) {
        if (b[i] !== -1 && b[i] !== a[i]) {
          possible = false;
          break;
        }
      }
    } else {
      for (let i = 0; i < n; i++) {
        const idx = i + 1;
        if (idx < L || idx > R) {
          if (b[i] !== -1 && b[i] !== a[i]) {
            possible = false;
            break;
          }
        }
      }

      if (possible) {
        const allowed = new Set();
        for (let i = L - 1; i < R; i++) {
          allowed.add(a[i]);
        }

        const seen = new Set();
        for (let i = L - 1; i < R; i++) {
          if (b[i] !== -1) {
            if (!allowed.has(b[i]) || seen.has(b[i])) {
              possible = false;
              break;
            }
            seen.add(b[i]);
          }
        }
      }
    }

    out.push(possible ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const a = Array.from({ length: n }, () => new Int32Array(m));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        a[i][j] = parseInt(input[ptr++], 10);
      }
    }

    let ans = 0;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        let maxL = Math.min(r, n - 1 - r, c, m - 1 - c);
        for (let l = 0; l <= maxL; l++) {
          if (a[r - l][c] === a[r + l][c] && a[r][c - l] === a[r][c + l]) {
            ans++;
          } else {
            break;
          }
        }
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();

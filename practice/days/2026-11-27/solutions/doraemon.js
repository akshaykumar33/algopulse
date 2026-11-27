const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const grid = [];
    for (let i = 0; i < n; i++) {
      const row = new Int32Array(m);
      for (let j = 0; j < m; j++) row[j] = parseInt(tokens[ptr++], 10);
      grid.push(row);
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let maxL = Math.min(i, n - 1 - i, j, m - 1 - j);
        for (let l = 0; l <= maxL; l++) {
          if (grid[i - l][j] === grid[i + l][j] && grid[i][j - l] === grid[i][j + l]) {
            ans++;
          } else break;
        }
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const r = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);
    const grid = [];
    for (let i = 0; i < r; i++) {
      grid.push(tokens[ptr++]);
    }

    let ans = 0;
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (grid[i][j] !== '^') continue;

        let up = 0;
        for (let ni = i - 1; ni >= 0 && grid[ni][j] === '^'; ni--) up++;
        let down = 0;
        for (let ni = i + 1; ni < r && grid[ni][j] === '^'; ni++) down++;
        let left = 0;
        for (let nj = j - 1; nj >= 0 && grid[i][nj] === '^'; nj--) left++;
        let right = 0;
        for (let nj = j + 1; nj < c && grid[i][nj] === '^'; nj++) right++;

        if (up >= 2 && down >= 2 && left >= 2 && right >= 2) {
          ans++;
        }
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const k = parseInt(input[1], 10);

  const grid = Array.from({ length: 4 }, () => new Array(n).fill('.'));
  const mid = Math.floor(n / 2);

  if (k % 2 === 0) {
    let rem = k;
    for (let i = 1; i <= Math.floor((n - 2) / 2) && rem >= 2; i++) {
      grid[1][i] = '#';
      grid[1][n - 1 - i] = '#';
      rem -= 2;
    }
    for (let i = 1; i <= Math.floor((n - 2) / 2) && rem >= 2; i++) {
      grid[2][i] = '#';
      grid[2][n - 1 - i] = '#';
      rem -= 2;
    }
    if (rem === 2) {
      grid[1][mid] = '#';
      grid[2][mid] = '#';
      rem = 0;
    }
  } else {
    if (k <= n - 2) {
      grid[1][mid] = '#';
      for (let i = 1; i <= (k - 1) / 2; i++) {
        grid[1][mid - i] = '#';
        grid[1][mid + i] = '#';
      }
    } else {
      for (let j = 1; j <= n - 2; j++) {
        grid[1][j] = '#';
      }
      const rem = k - (n - 2);
      for (let i = 1; i <= rem / 2; i++) {
        grid[2][i] = '#';
        grid[2][n - 1 - i] = '#';
      }
    }
  }

  const out = ['YES'];
  for (let i = 0; i < 4; i++) out.push(grid[i].join(''));
  console.log(out.join('\n'));
}

solve();

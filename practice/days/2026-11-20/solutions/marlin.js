const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  let k = parseInt(input[1], 10);

  const grid = Array.from({ length: 4 }, () => new Array(n).fill('.'));

  if (k % 2 === 1) {
    const mid = Math.floor(n / 2);
    grid[1][mid] = '#';
    k--;
    for (let j = 1; j < mid && k > 0; j++) {
      grid[1][j] = '#';
      grid[1][n - 1 - j] = '#';
      k -= 2;
    }
    for (let j = 1; j < mid && k > 0; j++) {
      grid[2][j] = '#';
      grid[2][n - 1 - j] = '#';
      k -= 2;
    }
  } else {
    for (let j = 1; j < n - 1 && k > 0; j++) {
      grid[1][j] = '#';
      grid[2][j] = '#';
      k -= 2;
    }
  }

  console.log('YES');
  for (let i = 0; i < 4; i++) {
    console.log(grid[i].join(''));
  }
}

solve();

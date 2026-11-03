const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);

  if (n === 1) {
    console.log('a\na\nb\nb');
    return;
  }

  const grid = [new Array(n), new Array(n), new Array(n), new Array(n)];

  if (n % 2 === 0) {
    for (let c = 0; c < n; c += 2) {
      const ch = (c / 2) % 2 === 0 ? 'a' : 'b';
      grid[0][c] = ch;
      grid[0][c + 1] = ch;
    }
    grid[1][0] = 'c';
    grid[2][0] = 'c';
    for (let c = 1; c < n - 1; c += 2) {
      const ch1 = ((c - 1) / 2) % 2 === 0 ? 'd' : 'e';
      const ch2 = ((c - 1) / 2) % 2 === 0 ? 'g' : 'h';
      grid[1][c] = ch1;
      grid[1][c + 1] = ch1;
      grid[2][c] = ch2;
      grid[2][c + 1] = ch2;
    }
    grid[1][n - 1] = 'f';
    grid[2][n - 1] = 'f';
    for (let c = 0; c < n; c += 2) {
      const ch = (c / 2) % 2 === 0 ? 'i' : 'j';
      grid[3][c] = ch;
      grid[3][c + 1] = ch;
    }
  } else {
    grid[0][0] = 'a';
    grid[1][0] = 'a';
    for (let c = 1; c < n; c += 2) {
      const ch0 = ((c - 1) / 2) % 2 === 0 ? 'b' : 'c';
      const ch1 = ((c - 1) / 2) % 2 === 0 ? 'd' : 'e';
      grid[0][c] = ch0;
      grid[0][c + 1] = ch0;
      grid[1][c] = ch1;
      grid[1][c + 1] = ch1;
    }
    for (let c = 0; c < n - 1; c += 2) {
      const ch2 = (c / 2) % 2 === 0 ? 'f' : 'g';
      const ch3 = (c / 2) % 2 === 0 ? 'i' : 'j';
      grid[2][c] = ch2;
      grid[2][c + 1] = ch2;
      grid[3][c] = ch3;
      grid[3][c + 1] = ch3;
    }
    grid[2][n - 1] = 'h';
    grid[3][n - 1] = 'h';
  }

  const out = [
    grid[0].join(''),
    grid[1].join(''),
    grid[2].join(''),
    grid[3].join('')
  ];

  console.log(out.join('\n'));
}

solve();

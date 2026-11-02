const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const h = parseInt(tokens[ptr++], 10);
  const w = parseInt(tokens[ptr++], 10);

  const g = [];
  for (let i = 0; i < h; i++) {
    g.push(tokens[ptr++].split(''));
  }

  let centerR = -1;
  let centerC = -1;
  let centers = 0;

  for (let i = 1; i < h - 1; i++) {
    for (let j = 1; j < w - 1; j++) {
      if (
        g[i][j] === '*' &&
        g[i - 1][j] === '*' &&
        g[i + 1][j] === '*' &&
        g[i][j - 1] === '*' &&
        g[i][j + 1] === '*'
      ) {
        centerR = i;
        centerC = j;
        centers++;
      }
    }
  }

  if (centers !== 1) {
    console.log('NO');
    return;
  }

  g[centerR][centerC] = '.';

  let r = centerR - 1;
  while (r >= 0 && g[r][centerC] === '*') {
    g[r][centerC] = '.';
    r--;
  }

  r = centerR + 1;
  while (r < h && g[r][centerC] === '*') {
    g[r][centerC] = '.';
    r++;
  }

  let c = centerC - 1;
  while (c >= 0 && g[centerR][c] === '*') {
    g[centerR][c] = '.';
    c--;
  }

  c = centerC + 1;
  while (c < w && g[centerR][c] === '*') {
    g[centerR][c] = '.';
    c++;
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (g[i][j] === '*') {
        console.log('NO');
        return;
      }
    }
  }

  console.log('YES');
}

solve();


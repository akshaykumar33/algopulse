const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const grid = [];
  for (let i = 0; i < n; i++) grid.push(input[2 + i]);

  const right = Array.from({ length: n }, () => new Int16Array(m));
  for (let i = 0; i < n; i++) {
    let cur = 0;
    for (let j = m - 1; j >= 0; j--) {
      if (grid[i].charCodeAt(j) === 49) {
        cur++;
      } else {
        cur = 0;
      }
      right[i][j] = cur;
    }
  }

  let maxArea = 0;
  const count = new Int32Array(m + 1);

  for (let j = 0; j < m; j++) {
    count.fill(0);
    for (let i = 0; i < n; i++) {
      count[right[i][j]]++;
    }
    let rows = 0;
    for (let w = m; w >= 1; w--) {
      rows += count[w];
      const area = rows * w;
      if (area > maxArea) maxArea = area;
    }
  }
  console.log(maxArea);
}

solve();

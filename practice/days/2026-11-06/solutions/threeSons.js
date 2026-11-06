const fs = require('fs');

function solve() {
  let input = '';
  try {
    input = fs.readFileSync(0, 'utf-8');
  } catch (e) {}
  if (!input || input.trim().length === 0) {
    try {
      input = fs.readFileSync('input.txt', 'utf-8');
    } catch (e) {}
  }

  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  const m = nextInt();
  if (n === null || m === null) return;

  const grid = [];
  for (let i = 0; i < n; i++) {
    const row = new Int32Array(m);
    for (let j = 0; j < m; j++) {
      row[j] = nextInt();
    }
    grid.push(row);
  }

  const target = [nextInt(), nextInt(), nextInt()].sort((a, b) => a - b);

  const rowSums = new Int32Array(n);
  const colSums = new Int32Array(m);

  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = 0; j < m; j++) {
      s += grid[i][j];
      colSums[j] += grid[i][j];
    }
    rowSums[i] = s;
  }

  const prefRow = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    prefRow[i + 1] = prefRow[i] + rowSums[i];
  }

  const prefCol = new Int32Array(m + 1);
  for (let j = 0; j < m; j++) {
    prefCol[j + 1] = prefCol[j] + colSums[j];
  }

  let ans = 0;

  for (let r1 = 1; r1 < n; r1++) {
    for (let r2 = r1 + 1; r2 < n; r2++) {
      const s1 = prefRow[r1];
      const s2 = prefRow[r2] - prefRow[r1];
      const s3 = prefRow[n] - prefRow[r2];
      const cur = [s1, s2, s3].sort((a, b) => a - b);
      if (cur[0] === target[0] && cur[1] === target[1] && cur[2] === target[2]) {
        ans++;
      }
    }
  }

  for (let c1 = 1; c1 < m; c1++) {
    for (let c2 = c1 + 1; c2 < m; c2++) {
      const s1 = prefCol[c1];
      const s2 = prefCol[c2] - prefCol[c1];
      const s3 = prefCol[m] - prefCol[c2];
      const cur = [s1, s2, s3].sort((a, b) => a - b);
      if (cur[0] === target[0] && cur[1] === target[1] && cur[2] === target[2]) {
        ans++;
      }
    }
  }

  try {
    fs.writeFileSync('output.txt', ans + '\n');
  } catch (e) {}

  console.log(ans);
}

solve();

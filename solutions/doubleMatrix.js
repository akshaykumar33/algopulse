const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const [n, m] = input[0].trim().split(/\s+/).map(Number);
  let lineIdx = 1;

  const a = [];
  for (let i = 0; i < n; i++) {
    a.push(input[lineIdx++].trim().split(/\s+/).map(Number));
  }

  const b = [];
  for (let i = 0; i < n; i++) {
    b.push(input[lineIdx++].trim().split(/\s+/).map(Number));
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (a[i][j] > b[i][j]) {
        const tmp = a[i][j];
        a[i][j] = b[i][j];
        b[i][j] = tmp;
      }
    }
  }

  let ok = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (j > 0) {
        if (a[i][j] <= a[i][j - 1] || b[i][j] <= b[i][j - 1]) ok = false;
      }
      if (i > 0) {
        if (a[i][j] <= a[i - 1][j] || b[i][j] <= b[i - 1][j]) ok = false;
      }
    }
  }

  console.log(ok ? 'Possible' : 'Impossible');
}

solve();


const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = [];
  for (let i = 0; i < n; i++) a.push(parseInt(tokens[ptr++], 10));
  const m = parseInt(tokens[ptr++], 10);
  const b = [];
  for (let i = 0; i < m; i++) b.push(parseInt(tokens[ptr++], 10));

  a.sort((x, y) => x - y);
  b.sort((x, y) => x - y);

  let i = 0, j = 0, ans = 0;
  while (i < n && j < m) {
    if (Math.abs(a[i] - b[j]) <= 1) {
      ans++;
      i++;
      j++;
    } else if (a[i] < b[j]) {
      i++;
    } else {
      j++;
    }
  }

  console.log(ans);
}

solve();


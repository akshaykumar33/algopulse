const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  let k = parseInt(tokens[1], 10);

  if (k > n * n) {
    console.log(-1);
    return;
  }

  const mat = Array.from({ length: n }, () => new Uint8Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        if (i === j) {
          if (k >= 1) {
            mat[i][i] = 1;
            k--;
          }
        } else {
          if (k >= 2) {
            mat[i][j] = 1;
            mat[j][i] = 1;
            k -= 2;
          }
        }
      }
    }
  }

  if (k > 0) {
    console.log(-1);
    return;
  }

  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(mat[i].join(' '));
  }
  console.log(out.join('\n'));
}

solve();

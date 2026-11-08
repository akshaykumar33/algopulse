const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);

  const a = [];
  for (let i = 0; i < n; i++) {
    a.push(tokens[1 + i]);
  }

  const b = [];
  for (let i = 0; i < n; i++) {
    b.push(tokens[1 + n + i]);
  }

  function rotate(mat) {
    const res = [];
    for (let r = 0; r < n; r++) {
      let row = '';
      for (let c = 0; c < n; c++) {
        row += mat[n - 1 - c][r];
      }
      res.push(row);
    }
    return res;
  }

  function reflect(mat) {
    const res = [];
    for (let r = 0; r < n; r++) {
      let row = '';
      for (let c = 0; c < n; c++) {
        row += mat[r][n - 1 - c];
      }
      res.push(row);
    }
    return res;
  }

  function equals(m1, m2) {
    for (let i = 0; i < n; i++) {
      if (m1[i] !== m2[i]) return false;
    }
    return true;
  }

  let curr = a;
  for (let r = 0; r < 4; r++) {
    if (equals(curr, b)) {
      console.log('Yes');
      return;
    }
    curr = rotate(curr);
  }

  curr = reflect(a);
  for (let r = 0; r < 4; r++) {
    if (equals(curr, b)) {
      console.log('Yes');
      return;
    }
    curr = rotate(curr);
  }

  console.log('No');
}

solve();

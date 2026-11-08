const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  const stack = new Int32Array(n + 1);
  let top = 0;
  let expected = 1;
  let ans = 0;

  for (let i = 0; i < 2 * n; i++) {
    const op = tokens[ptr++];
    if (op === 'add') {
      const x = parseInt(tokens[ptr++], 10);
      stack[++top] = x;
    } else {
      if (top > 0) {
        if (stack[top] === expected) {
          top--;
        } else {
          ans++;
          top = 0;
        }
      }
      expected++;
    }
  }

  console.log(ans);
}

solve();

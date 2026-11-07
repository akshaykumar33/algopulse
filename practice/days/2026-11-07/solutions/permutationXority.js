const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);

    if (n === 2) {
      out.push(-1);
    } else if (n % 2 === 1) {
      const arr = [];
      for (let i = 1; i <= n; i++) arr.push(i);
      out.push(arr.join(' '));
    } else {
      const arr = [2, 3, 1];
      for (let i = 4; i <= n; i++) arr.push(i);
      out.push(arr.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();

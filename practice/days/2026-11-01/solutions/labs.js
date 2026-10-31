const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const ans = Array.from({ length: n }, () => []);
  let val = 1;
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < n; j++) {
        ans[j].push(val++);
      }
    } else {
      for (let j = n - 1; j >= 0; j--) {
        ans[j].push(val++);
      }
    }
  }
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(ans[i].join(' '));
  }
  console.log(out.join('\n'));
}

solve();

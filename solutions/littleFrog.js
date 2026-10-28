const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  let l = 1;
  let r = n;
  const ans = [];
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      ans.push(l++);
    } else {
      ans.push(r--);
    }
  }
  console.log(ans.join(' '));
}

solve();

const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let j = 0; j < n; j++) {
      a.push(parseInt(tokens[ptr++], 10));
    }
    a.sort((x, y) => x - y);
    let ans = 0;
    for (let j = 0; j < n; j++) {
      if (a[j] <= j + 1) {
        ans = j + 1;
      } else {
        break;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();

const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const count = [0, 0, 0];
  for (let i = 0; i < n; i++) {
    const num = parseInt(tokens[ptr++], 10);
    count[num % 3]++;
  }
  let ans = Math.floor(count[0] / 2) + Math.min(count[1], count[2]);
  console.log(ans);
}
solve();

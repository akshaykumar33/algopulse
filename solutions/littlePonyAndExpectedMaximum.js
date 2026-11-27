const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  const m = parseInt(tokens[0], 10);
  const n = parseInt(tokens[1], 10);
  let ans = m;
  for (let i = 1; i < m; i++) {
    ans -= Math.pow(i / m, n);
  }
  console.log(ans.toFixed(12));
}

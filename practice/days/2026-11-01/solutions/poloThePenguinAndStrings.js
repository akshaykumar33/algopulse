const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const k = parseInt(tokens[1], 10);

  if (k > n || (k === 1 && n > 1)) {
    console.log('-1');
    return;
  }

  if (k === 1 && n === 1) {
    console.log('a');
    return;
  }

  const res = [];
  for (let i = 0; i < n - k + 2; i++) {
    if (i % 2 === 0) {
      res.push('a');
    } else {
      res.push('b');
    }
  }

  for (let i = 2; i < k; i++) {
    res.push(String.fromCharCode(97 + i));
  }

  console.log(res.join(''));
}
solve();

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const k = parseInt(tokens[1], 10);
  const s = tokens[2];

  let openNeed = k / 2;
  let closeNeed = k / 2;
  const res = [];

  for (let i = 0; i < n; i++) {
    if (s[i] === '(' && openNeed > 0) {
      res.push('(');
      openNeed--;
    } else if (s[i] === ')' && closeNeed > openNeed) {
      res.push(')');
      closeNeed--;
    }
  }

  console.log(res.join(''));
}

solve();


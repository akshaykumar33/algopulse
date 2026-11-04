const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const s = input[1];

  const res = [];
  for (let i = 0; i < n; i++) {
    const ch = s[i];
    if (res.length % 2 === 0) {
      res.push(ch);
    } else {
      if (ch !== res[res.length - 1]) {
        res.push(ch);
      }
    }
  }

  if (res.length % 2 !== 0) {
    res.pop();
  }

  const deleted = n - res.length;
  console.log(deleted);
  console.log(res.join(''));
}

solve();


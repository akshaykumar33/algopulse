const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const k = parseInt(input[1], 10);

  const path = [];
  for (let i = 0; i < k; i++) {
    path.push(i);
    for (let j = i + 1; j < k; j++) {
      path.push(i);
      path.push(j);
    }
  }

  const res = [];
  const pLen = path.length;
  for (let i = 0; i < n; i++) {
    res.push(String.fromCharCode(97 + path[i % pLen]));
  }

  console.log(res.join(''));
}

solve();

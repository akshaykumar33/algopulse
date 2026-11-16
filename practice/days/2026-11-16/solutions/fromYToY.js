const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let k = parseInt(input[0], 10);

  if (k === 0) {
    console.log('a');
    return;
  }

  let chCode = 97;
  const res = [];

  while (k > 0) {
    let c = 2;
    while ((c * (c + 1)) / 2 <= k) {
      c++;
    }
    k -= (c * (c - 1)) / 2;
    const ch = String.fromCharCode(chCode++);
    for (let i = 0; i < c; i++) res.push(ch);
  }
  console.log(res.join(''));
}

solve();

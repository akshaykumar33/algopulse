const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let line = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = input[line++].trim().split(/\s+/).map(Number);
    const b = input[line++].trim().split(/\s+/).map(Number);
    let aWins = 0;
    if (a[0] > b[0]) aWins++;
    if (a[1] > b[1]) aWins++;
    if (a[2] > b[2]) aWins++;
    out.push(aWins >= 2 ? 'A' : 'B');
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const [n, c] = lines[lineIdx++].split(' ').map(Number);
    const arr = lines[lineIdx++].split(' ').map(Number);
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += arr[j];
    }
    if (sum <= c) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }
  console.log(out.join('\n'));
}

solve();

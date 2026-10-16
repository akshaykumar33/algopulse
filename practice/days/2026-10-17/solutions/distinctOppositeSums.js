const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  const t = parseInt(lines[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const n = parseInt(lines[i], 10);
    const arr = [];
    let l = 1;
    let r = n;
    for (let j = 0; j < n; j++) {
      if (j % 2 === 0) {
        arr.push(l);
        l++;
      } else {
        arr.push(r);
        r--;
      }
    }
    out.push(arr.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

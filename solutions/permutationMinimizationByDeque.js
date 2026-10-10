const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || lines[0] === '') return;
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    const n = parseInt(lines[lineIdx++], 10);
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    const a = lines[lineIdx++].trim().split(/\s+/).map(Number);
    const front = [];
    const back = [];
    let min = a[0];
    front.push(a[0]);
    for (let i = 1; i < n; i++) {
      if (a[i] < min) {
        front.push(a[i]);
        min = a[i];
      } else {
        back.push(a[i]);
      }
    }
    front.reverse();
    out.push(front.concat(back).join(' '));
  }

  console.log(out.join('\n'));
}

solve();

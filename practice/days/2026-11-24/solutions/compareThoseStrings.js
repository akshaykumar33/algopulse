const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\r?\n/);
  let lineIdx = 0;
  while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
  if (lineIdx >= lines.length) return;
  const T = parseInt(lines[lineIdx++].trim(), 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++].trim(), 10);
    const a = lines[lineIdx++].trim();
    const b = lines[lineIdx++].trim();
    let ans = 0;
    let nextOk = false;
    for (let i = n - 1; i >= 0; i--) {
      if (a[i] < b[i]) {
        nextOk = true;
        ans++;
      } else if (a[i] > b[i]) {
        nextOk = false;
      } else {
        if (nextOk) ans++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();

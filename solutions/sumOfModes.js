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
    const s = lines[lineIdx++].trim();
    const offset = n;
    const freq = new Int32Array(2 * n + 1);
    let cur = offset;
    freq[cur]++;
    let equalCount = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') cur++;
      else cur--;
      equalCount += freq[cur];
      freq[cur]++;
    }
    const totalSubstrings = Math.floor((n * (n + 1)) / 2);
    out.push(totalSubstrings + equalCount);
  }
  console.log(out.join('\n'));
}

solve();

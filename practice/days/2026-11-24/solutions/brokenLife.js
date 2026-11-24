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
    const lenParts = lines[lineIdx++].trim().split(/\s+/);
    const n = parseInt(lenParts[0], 10);
    const m = parseInt(lenParts[1], 10);
    const s = lines[lineIdx++].trim();
    const a = lines[lineIdx++].trim();
    let j = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] !== '?') {
        if (s[i] === a[j]) {
          j++;
          if (j === m) break;
        }
      }
    }
    if (j === m) {
      out.push('-1');
      continue;
    }
    const res = [];
    j = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] !== '?') {
        res.push(s[i]);
        if (j < m && s[i] === a[j]) j++;
      } else {
        const target = j < m ? a[j] : 'z';
        const pick = target === 'a' ? 'e' : 'a';
        res.push(pick);
      }
    }
    out.push(res.join(''));
  }
  console.log(out.join('\n'));
}

solve();

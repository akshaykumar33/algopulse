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
    const s = lines[lineIdx++].trim();
    const len = s.length;
    const cnt = new Int32Array(26);
    for (let i = 0; i < len; i++) {
      cnt[s.charCodeAt(i) - 65]++;
    }
    cnt.sort();
    cnt.reverse();
    let minOps = len;
    for (let k = 1; k <= 26; k++) {
      if (len % k === 0) {
        const target = Math.floor(len / k);
        let match = 0;
        for (let i = 0; i < k; i++) {
          match += Math.min(cnt[i], target);
        }
        const ops = len - match;
        if (ops < minOps) minOps = ops;
      }
    }
    out.push(minOps);
  }
  console.log(out.join('\n'));
}

solve();

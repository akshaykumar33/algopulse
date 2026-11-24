const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\r?\n/);
  let lineIdx = 0;
  const out = [];
  while (lineIdx < lines.length) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++].trim(), 10);
    if (isNaN(n) || n === 0) break;
    let K = 0;
    for (let i = 0; i < n; i++) {
      while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
      if (lineIdx >= lines.length) break;
      const parts = lines[lineIdx++].trim().split(/\s+/);
      const vote = parts[0];
      const score = parseInt(parts[1], 10);
      const p = vote === 'P' ? 1 : -1;
      const O = score - p;
      const absO = Math.abs(O);
      if (K < absO) K = absO;
      if ((K - absO) % 2 !== 0) K++;
    }
    out.push(K);
  }
  console.log(out.join('\n'));
}

solve();

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
    const parts = lines[lineIdx++].trim().split(/\s+/);
    const n = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const bitmask = new Int32Array(n);
    for (let i = 0; i < m; i++) {
      while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
      if (lineIdx >= lines.length) break;
      const sParts = lines[lineIdx++].trim().split(/\s+/);
      const v = parseInt(sParts[0], 10);
      for (let j = 1; j <= v; j++) {
        const x = parseInt(sParts[j], 10);
        bitmask[x] |= 1 << i;
      }
    }
    bitmask.sort();
    let distinct = 0;
    for (let i = 0; i < n; i++) {
      if (i === 0 || bitmask[i] !== bitmask[i - 1]) distinct++;
    }
    out.push(distinct);
  }
  console.log(out.join('\n'));
}

solve();

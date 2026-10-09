const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || lines[0] === '') return;

  let lineIdx = 0;
  let t = parseInt(lines[lineIdx++], 10);
  const out = [];

  while (t-- > 0) {
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++], 10);
    const [a1, b1] = lines[lineIdx++].trim().split(/\s+/).map(Number);
    let y = b1;

    for (let i = 1; i < n; i++) {
      const [ai, bi] = lines[lineIdx++].trim().split(/\s+/).map(Number);
      if (y < ai) y = ai;
      else if (y > bi) y = bi;
    }

    out.push(y);
  }

  console.log(out.join('\n'));
}

solve();

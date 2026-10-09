const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || lines[0] === '') return;

  let lineIdx = 0;
  let t = parseInt(lines[lineIdx++], 10);
  const out = [];

  while (t-- > 0) {
    if (lineIdx >= lines.length) break;
    const [n, a, b] = lines[lineIdx++].trim().split(/\s+/).map(Number);
    const faces = lines[lineIdx++].trim().split(/\s+/).map(Number);

    let cntA = 0;
    let cntB = 0;
    for (let i = 0; i < n; i++) {
      if (faces[i] === a) cntA++;
      if (faces[i] === b) cntB++;
    }

    const prob = (cntA * cntB) / (n * n);
    out.push(prob.toFixed(10));
  }

  console.log(out.join('\n'));
}

solve();

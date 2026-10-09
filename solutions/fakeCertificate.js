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
    const s = lines[lineIdx++].trim();

    let totalOnes = 0;
    let maxZeros = 0;
    let curZeros = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        totalOnes++;
        curZeros = 0;
      } else {
        curZeros++;
        if (curZeros > maxZeros) {
          maxZeros = curZeros;
        }
      }
    }

    out.push(totalOnes + maxZeros);
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let totalOnes = 0;
    const diag = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const row = tokens[ptr++];
      for (let j = 0; j < n; j++) {
        if (row.charCodeAt(j) === 49) {
          totalOnes++;
          const d = (i - j + n) % n;
          diag[d]++;
        }
      }
    }
    let maxDiag = 0;
    for (let i = 0; i < n; i++) {
      if (diag[i] > maxDiag) maxDiag = diag[i];
    }
    out.push(n + totalOnes - 2 * maxDiag);
  }
  console.log(out.join('\n'));
}

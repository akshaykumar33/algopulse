const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  function solveCase(n, x) {
    if (x > n) return -1n;
    if (x === n) return n;
    let diff = -1;
    for (let b = 61n; b >= 0n; b--) {
      const bitN = (n >> b) & 1n;
      const bitX = (x >> b) & 1n;
      if (bitX === 1n && bitN === 0n) return -1n;
      if (bitX === 0n && bitN === 1n) {
        if (diff === -1) diff = b;
      }
      if (diff !== -1 && bitX === 1n) return -1n;
    }
    if (diff === -1) return n;
    const p = diff;
    const mask = (1n << (p + 1n)) - 1n;
    const m = ((n >> (p + 1n)) + 1n) << (p + 1n);
    let andVal = 0n;
    for (let b = 61n; b >= 0n; b--) {
      const bitN = (n >> b) & 1n;
      const bitM = (m >> b) & 1n;
      if (bitN === bitM) {
        if (bitN === 1n) andVal |= (1n << b);
      } else break;
    }
    if (andVal === x) return m;
    return -1n;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(tokens[ptr++]);
    const x = BigInt(tokens[ptr++]);
    const ans = solveCase(n, x);
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

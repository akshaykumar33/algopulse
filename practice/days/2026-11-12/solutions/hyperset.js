const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const lo = new Int32Array(n);
  const hi = new Int32Array(n);
  const limLo = k < 15 ? k : 15;
  for (let i = 0; i < n; i++) {
    const s = tokens[ptr++];
    let vLo = 0;
    let vHi = 0;
    for (let j = 0; j < limLo; j++) {
      const ch = s.charCodeAt(j);
      const d = ch === 83 ? 0 : ch === 69 ? 1 : 2;
      vLo |= d << (j * 2);
    }
    for (let j = 15; j < k; j++) {
      const ch = s.charCodeAt(j);
      const d = ch === 83 ? 0 : ch === 69 ? 1 : 2;
      vHi |= d << ((j - 15) * 2);
    }
    lo[i] = vLo;
    hi[i] = vHi;
  }
  const M = 4096;
  const MASK = M - 1;
  const hLo = new Int32Array(M).fill(-1);
  const hHi = new Int32Array(M).fill(-1);
  const M1 = 0x15555555;
  let ans = 0;
  for (let j = 0; j < n; j++) {
    const xLo = lo[j];
    const xHi = hi[j];
    for (let p = j + 1; p < n; p++) {
      const yLo = lo[p];
      const yHi = hi[p];
      const dLo = xLo ^ yLo;
      const dHi = xHi ^ yHi;
      const mLo = ((dLo | (dLo >> 1)) & M1) * 3;
      const mHi = ((dHi | (dHi >> 1)) & M1) * 3;
      const zLo = (xLo & ~mLo) | (dLo ^ mLo);
      const zHi = (xHi & ~mHi) | (dHi ^ mHi);
      let h = (Math.imul(zLo, 0x9e3779b1) ^ Math.imul(zHi, 0x85ebca6b)) & MASK;
      while (hLo[h] !== -1) {
        if (hLo[h] === zLo && hHi[h] === zHi) {
          ans++;
          break;
        }
        h = (h + 1) & MASK;
      }
    }
    let h = (Math.imul(xLo, 0x9e3779b1) ^ Math.imul(xHi, 0x85ebca6b)) & MASK;
    while (hLo[h] !== -1) h = (h + 1) & MASK;
    hLo[h] = xLo;
    hHi[h] = xHi;
  }
  console.log(ans);
}

solve();

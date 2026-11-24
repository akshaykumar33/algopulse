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
    const n = parseInt(lines[lineIdx++].trim(), 10);
    const a = lines[lineIdx++].trim().split(/\s+/).map(Number);
    const s = lines[lineIdx++].trim();
    let m = 0;
    for (let i = 0; i < n; i++) if (a[i] > m) m = a[i];
    const maxPos = [];
    for (let i = 0; i < n; i++) if (a[i] === m) maxPos.push(i);
    let checkPos = [];
    if (maxPos.length <= 4) {
      checkPos = maxPos;
    } else {
      checkPos = [maxPos[0], maxPos[1], maxPos[maxPos.length - 2], maxPos[maxPos.length - 1]];
    }
    let best = 0;
    for (let pIdx = 0; pIdx < checkPos.length; pIdx++) {
      const pos = checkPos[pIdx];
      const unrolledA = new Int32Array(n - 1);
      const unrolledS = [];
      for (let k = 1; k < n; k++) {
        const idx = (pos + k) % n;
        unrolledA[k - 1] = a[idx];
        unrolledS.push(s[idx]);
      }
      for (let c = 0; c <= 1; c++) {
        const charC = c === 0 ? '0' : '1';
        let firstL = -1;
        let lastR = -1;
        for (let L = 0; L < n - 1; L++) {
          const origL = (pos + 1 + L) % n;
          const prev = (origL - 1 + n) % n;
          if (unrolledS[L] === charC && s[prev] !== s[origL]) {
            firstL = L;
            break;
          }
        }
        for (let R = n - 2; R >= 0; R--) {
          const origR = (pos + 1 + R) % n;
          const next = (origR + 1) % n;
          if (unrolledS[R] === charC && s[origR] !== s[next]) {
            lastR = R;
            break;
          }
        }
        if (firstL !== -1 && lastR !== -1 && firstL <= lastR) {
          let subMax = 0;
          for (let k = firstL; k <= lastR; k++) {
            if (unrolledA[k] > subMax) subMax = unrolledA[k];
          }
          if (m + subMax > best) best = m + subMax;
        }
      }
      if (best === 2 * m) break;
    }
    out.push(best);
  }
  console.log(out.join('\n'));
}

solve();

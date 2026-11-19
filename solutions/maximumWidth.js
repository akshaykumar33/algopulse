const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 4) return;

  const n = Number(input[0]);
  const m = Number(input[1]);
  const s = input[2];
  const t = input[3];

  const L = new Int32Array(m);
  let sIdx = 0;
  for (let i = 0; i < m; i++) {
    while (s[sIdx] !== t[i]) {
      sIdx++;
    }
    L[i] = sIdx;
    sIdx++;
  }

  const R = new Int32Array(m);
  sIdx = n - 1;
  for (let i = m - 1; i >= 0; i--) {
    while (s[sIdx] !== t[i]) {
      sIdx--;
    }
    R[i] = sIdx;
    sIdx--;
  }

  let maxW = 0;
  for (let i = 0; i < m - 1; i++) {
    const w = R[i + 1] - L[i];
    if (w > maxW) maxW = w;
  }

  console.log(maxW);
}

solve();

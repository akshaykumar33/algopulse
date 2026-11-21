const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const p = new Array(n + 1);
    const isFixed = new Uint8Array(n + 1);
    let origFixed = 0;
    for (let i = 1; i <= n; i++) {
      p[i] = parseInt(input[ptr++], 10);
      if (p[i] === i) {
        origFixed++;
        isFixed[i] = 1;
      }
    }

    const prefFixed = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      prefFixed[i] = prefFixed[i - 1] + isFixed[i];
    }

    const byS = new Map();
    for (let i = 1; i <= n; i++) {
      if (p[i] !== i) {
        const S = i + p[i];
        if (!byS.has(S)) byS.set(S, []);
        byS.get(S).push(Math.min(i, p[i]));
      }
    }

    let maxFixed = origFixed;

    for (const [S, lefts] of byS.entries()) {
      lefts.sort((a, b) => b - a);
      let gain = 0;
      for (let k = 0; k < lefts.length; k++) {
        gain++;
        const L = lefts[k];
        const R = S - L;
        const fixedInside = prefFixed[R] - prefFixed[L - 1];
        let lost = fixedInside;
        if (S % 2 === 0) {
          const mid = S / 2;
          if (mid >= L && mid <= R && isFixed[mid]) lost--;
        }
        const total = origFixed + gain - lost;
        if (total > maxFixed) maxFixed = total;
      }
    }
    out.push(maxFixed);
  }
  console.log(out.join('\n'));
}
solve();
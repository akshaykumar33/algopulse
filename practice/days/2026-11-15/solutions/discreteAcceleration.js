const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const L = parseInt(input[ptr++], 10);
    const a = [0];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));
    a.push(L);

    const t1 = new Float64Array(n + 2);
    for (let i = 1; i <= n + 1; i++) {
      t1[i] = t1[i - 1] + (a[i] - a[i - 1]) / i;
    }

    const t2 = new Float64Array(n + 2);
    for (let i = n; i >= 0; i--) {
      const v = n + 1 - i;
      t2[i] = t2[i + 1] + (a[i + 1] - a[i]) / v;
    }

    let ans = 0;
    for (let i = 0; i <= n; i++) {
      if (t1[i] <= t2[i] && t2[i + 1] <= t1[i + 1]) {
        const vA = i + 1;
        const vB = n - i + 1;
        const D = a[i + 1] - a[i];
        const tA = t1[i];
        const tB = t2[i + 1];
        if (tA <= tB) {
          ans = tB + (D - (tB - tA) * vA) / (vA + vB);
        } else {
          ans = tA + (D - (tA - tB) * vB) / (vA + vB);
        }
        break;
      }
    }
    out.push(ans.toFixed(15));
  }
  console.log(out.join('\n'));
}

solve();

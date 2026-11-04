const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }
    const d = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      d[i] = parseInt(input[ptr++], 10);
    }

    let best = -1;
    for (let i = 0; i < n; i++) {
      const left = (i - 1 + n) % n;
      const right = (i + 1) % n;
      const totalAttack = a[left] + a[right];
      if (d[i] > totalAttack) {
        if (d[i] > best) {
          best = d[i];
        }
      }
    }
    out.push(best);
  }

  console.log(out.join('\n'));
}

solve();


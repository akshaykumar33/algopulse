const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }

    let minDiff = Infinity;
    let count = 0;

    for (let i = 0; i < n; i++) {
      const ai = a[i];
      for (let j = i + 1; j < n; j++) {
        const diff = Math.abs(ai + a[j] - k);
        if (diff < minDiff) {
          minDiff = diff;
          count = 1;
        } else if (diff === minDiff) {
          count++;
        }
      }
    }

    out.push(`${minDiff} ${count}`);
  }

  console.log(out.join('\n'));
}

solve();

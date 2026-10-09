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
    const v = new Int32Array(n);
    const a = new Int32Array(n);

    for (let i = 0; i < n; i++) {
      const parts = lines[lineIdx++].trim().split(/\s+/);
      v[i] = parseInt(parts[0], 10);
      a[i] = parseInt(parts[1], 10);
    }

    let maxPower = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const power = a[i] * v[j] + v[i] * a[j];
        if (power > maxPower) {
          maxPower = power;
        }
      }
    }

    out.push(maxPower);
  }

  console.log(out.join('\n'));
}

solve();

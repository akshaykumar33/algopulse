const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let idx = 0;
  const n = parseInt(input[idx++], 10);
  const q = parseInt(input[idx++], 10);

  const pos = new Int32Array(51);
  for (let i = 1; i <= n; i++) {
    const col = parseInt(input[idx++], 10);
    if (pos[col] === 0) {
      pos[col] = i;
    }
  }

  const out = [];
  for (let j = 0; j < q; j++) {
    const t = parseInt(input[idx++], 10);
    const p = pos[t];
    out.push(p);
    for (let c = 1; c <= 50; c++) {
      if (pos[c] > 0 && pos[c] < p) {
        pos[c]++;
      }
    }
    pos[t] = 1;
  }

  console.log(out.join(' '));
}

solve();

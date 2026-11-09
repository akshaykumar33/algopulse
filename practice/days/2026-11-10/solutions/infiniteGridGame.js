const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const phi = (1 + Math.sqrt(5)) / 2;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const m = parseInt(tokens[ptr++], 10);
    const n = parseInt(tokens[ptr++], 10);
    const p = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);

    const dx = m - p;
    const dy = n - q;
    const x = Math.min(dx, dy);
    const y = Math.max(dx, dy);

    const k = y - x;
    const pPos = Math.floor(k * phi);

    if (x === pPos) {
      out.push('Bob');
    } else {
      out.push('Alice');
    }
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const p = parseFloat(input[ptr++]);
    const s = parseFloat(input[ptr++]);
    const disc = p * p - 24 * s;
    const a = (p - Math.sqrt(Math.max(0, disc))) / 12;
    const c = p / 4 - 2 * a;
    const vol = a * a * c;
    out.push(vol.toFixed(2));
  }

  console.log(out.join('\n'));
}

solve();


const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let i = 0; i < t; i++) {
    const x1 = Number(input[ptr++]);
    const y1 = Number(input[ptr++]);
    let z1 = Number(input[ptr++]);
    const x2 = Number(input[ptr++]);
    let y2 = Number(input[ptr++]);
    const z2 = Number(input[ptr++]);

    const p = Math.min(z1, y2);
    let ans = 2 * p;
    z1 -= p;
    y2 -= p;

    const neg = Math.max(0, z2 - z1 - x1);
    ans -= 2 * neg;

    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
